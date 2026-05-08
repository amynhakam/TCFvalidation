# QA Playbook - Validating Identity and Consent Logic

---

## Table of Contents

- [Check for GDPR Functionality](#check-for-gdpr-functionality)
  - [a. Spoof/VPN for a GDPR Region](#a-spoofvpn-for-a-gdpr-region)
  - [b. Check GDPR Value and CMP Gate – Accepted State](#b-check-gdpr-value-and-cmp-gate--accepted-state)
  - [c. Validate Consent String – Accepted State](#c-validate-consent-string--accepted-state)
  - [d. Test for Ad Sync Pixel Functionality – Accepted/Calling Sync Pixel](#d-test-for-ad-sync-pixel-functionality--acceptedcalling-sync-pixel)
  - [e. Test for MCGID presence on Ad Sync Page – Accepted State](#e-test-for-mcgid-presence-on-ad-sync-page--accepted-state)
  - [f. Check for DNT Status, MCGID, MUID and ANID Presence, Consent String In-Game, ext_inv_code, and LiveRamp ID – Accepted State](#f-check-for-dnt-status-mcgid-muid-and-anid-presence-consent-string-in-game-ext_inv_code-and-liveramp-id--accepted-state)
  - [g. Advanced Settings Check – Decline from Accepted State](#g-advanced-settings-check--decline-from-accepted-state)
  - [h. GDPR Data Usage Settings – Change to Decline State from Accepted State](#h-gdpr-data-usage-settings--change-to-decline-state-from-accepted-state)
  - [i. Check GDPR Value and CMP Gate – Declined State](#i-check-gdpr-value-and-cmp-gate--declined-state)
  - [j. Validate Consent String – Declined State](#j-validate-consent-string--declined-state)
  - [k. Test for Ad Sync Pixel Functionality – Declined/Blocking Sync Pixel](#k-test-for-ad-sync-pixel-functionality--declinedblocking-sync-pixel)
  - [l. Test for MCGID presence on Ad Sync Page – Declined State](#l-test-for-mcgid-presence-on-ad-sync-page--declined-state)
  - [m. Check for DNT Status, Consent String, ext_inv_code, and NO MCGID, MUID, ANID, and LiveRamp ID – Declined State](#m-check-for-dnt-status-consent-string-ext_inv_code-and-no-mcgid-muid-anid-and-liveramp-id--declined-state)
  - [n. Advanced Settings Check – Accept from Declined State](#n-advanced-settings-check--accept-from-declined-state)
  - [o. GDPR Data Usage Settings – Change to Accept State from Declined State](#o-gdpr-data-usage-settings--change-to-accept-state-from-declined-state)

---

## Check for GDPR Functionality

Please see Check for MCGID in MSX SDK, Check for ext_inv_code, Check for LiveRamp ID, Check for GDPR Functionality - Accepted State, and Check for GDPR Functionality - Declined State in the associated Diagrams section towards the end of this document, which illustrates the following QA checks.

This section will allow you to emulate and verify GDPR user behavior, ensuring that you see the Consent Management Platform (CMP) gate, and that dynamic Ad Sync page pixel logic functions as intended.

> **Please note:** for all intents and purposes, Brazil and Canada are treated as GDPR.

---

### a. Spoof/VPN for a GDPR Region

VPN is needed as IP address is utilized to determine user location, where MCG has applied logic to:

- Gate users with the CMP and collect consent decision, when determined to be in a GDPR region.
- Transitively, when full consent is declined, logic is applied to block sync pixels.

Below are the steps to set this up:

1. Delete your existing consent file to ensure a new one will be created once you allow or decline consent.
2. Uninstall and then reinstall game (do not launch yet).
3. Spoof for a GDPR region via VPN (e.g. France).
   - Please see the VPN Guide for instructions on how to configure and spoof different regions.

---

### b. Check GDPR Value and CMP Gate – Accepted State

1. Launch Fiddler and ensure it is capturing traffic.
2. Launch the game – If functioning correctly you will be gated by the CMP.
3. Select "<span style="color:#70AD47">**Accept & Continue**</span>" consent option at this CMP gate.
4. Search the "raw" Fiddler Inspectors tab for the following POST call: `https://consentaudit.microsoftcasualgames.com/api/logconsent1`
5. Ensure that in the Request JSON there is a value for consentString, isAcceptAll=True, and your MCGID is populated.
6. For in-game calls, navigate to a section of the game where an ad is served and confirm that you are considered true for GDPR by searching for the ut/v3 call, and finding **consent_required=true**, and a value following the **consent_string** field, shown below:

---

### c. Validate Consent String – Accepted State

In this step you will confirm that you have a valid consentString by following these validation steps:

1. Navigate to your consent file by pasting below path into File Explorer:
   `%LOCALAPPDATA%\Publishers\8wekyb3d8bbwe\mcg`
2. Paste the string into the TCF tab of this tool: [IAB GPP Encoder / Decoder](https://iabgpp.com/)
3. Ensure that the IAB TCF tool is able to parse and validate your string by translating it.
4. Confirm that all Purpose Consents are shown and highlighted in gray.
5. Check that the **Vendors Disclosed** section displays all the vendors you were shown in the CMP and ensure they are populated in the "Included" section.
6. Verify that the vendors consented to in the CMP are showing as consented in the IAB TCF tool's **Vendor Consents** section. Consented Vendors appear in the "Included" section.

---

### d. Test for Ad Sync Pixel Functionality – Accepted/Calling Sync Pixel

In this step you will confirm that the ad sync pixel gets <span style="color:#70AD47">**FIRED**</span> as intended (since CMP was <span style="color:#70AD47">accepted</span>), by doing the following:

1. After having launched the app, wait for the Ad Sync page to pop.
   - If never popped, close app, and relaunch.
2. In Fiddler, hold down and drag the Any Process tool to target the browser where Ad Sync page loaded.
3. Refresh Ad Sync browser page.
4. In Fiddler, look for the following call: `https://m.adnxs.com/mapuid?member=280&user=[YOUR MUID VALUE]`
   - This pixel allows MCG to send user MUID to Xandr.
5. Be sure to compare this to your actual MUID to ensure the correct value is being called (from in-game).
6. Keep the Ad Sync browser page open as it will be necessary for the next step.

---

### e. Test for MCGID presence on Ad Sync Page – Accepted State

In this step you will confirm that your MCGID is being passed to the Ad Sync page by doing the following:

1. Your ad sync page should still be open from the previous step. If not, please refer to this step: 1. Check for Ad Sync Page & Sync Pixel
2. Grab the referrerID= value from the URL that was loaded.
3. You can also paste the entire URL into Notepad to make it easier to find the referrerID. The highlighted value is your MCGID.

---

### f. Check for DNT Status, MCGID, MUID and ANID Presence, Consent String In-Game, ext_inv_code, and LiveRamp ID – Accepted State

In this step you will be confirming that the presence of IDs and Do Not Track status correspond with the consent state of accepted:

1. Ensure Fiddler is running and launch the app.
2. Find the idmapper call and copy your MUID and MCGID from the "JSON" tab of the Response section.
3. The ut/v3 call should have the device id present. Check that the device_id.ifa value is the MCGID you copied from the idmapper earlier.
4. Also, in the ut/v3 call check that your MUID populated in the Request section under eids.id.
5. Also in the ut/v3, verify your ANID is present in the eids section.
6. Scroll to the bottom of the Request section in the ut/v3 call to check that your MUID populated under user.external_uid.
7. To check for the LiveRamp ID, find the idmapper call and check the JSON tab in the response section to first make sure liveramp.com=true under sendIndustryIds. If true, check the industryIDs array for your LiveRamp ID. Note: You will only see this if you have ad synced with your "opt-in" browser profile, or authenticated into Windows or Xbox Live (on a non-domain joined) account.
8. If you did see both liveramp.com=true AND your LiveRamp ID in the idmapper call, check the ut/v3 call to verify that the LiveRamp ID exists and is populated. Again, this will only show if a user 1) ad syncs with the "opt-in" browser profile, 2) signs into Windows, or 3) signs into Xbox Windows App.

> **Please Note:** The omission of the LiveRamp ID in the ut/v3 call is a ship blocker.

9. While still in the ut/v3 call, check that user.dnt (Do Not Track) is false.
10. In the ut/v3 call, copy the shown consent string and check that it matches the consent string you previously validated.
11. While in the ut/v3 call, find the ext_inv_code. It should display the country you have spoofed via VPN.

---

### g. Advanced Settings Check – Decline from Accepted State

After having accepted consent on the first layer of the CMP, do the following - making sure selections beyond the first layer of consent are reflected in the consent string.

1. Remain in spoofed/VPN'd into a GDPR region.
2. Maintain any existing consent string/decision.
3. Go to About > Data Usage Settings > Advanced settings.
4. Choose a scenario below and follow the respective steps in that subsection:
   - Toggle OFF consent for a Purpose
   - Toggle OFF consent for a vendor part of the IAB TCF

#### Toggle <span style="color:#EE0000">**OFF**</span> consent for a Purpose:

1. Under Advertiser Settings, scroll to Purposes.
2. Expand a purpose, and toggle off consent. Click "Save Settings & Continue".
3. In Fiddler, find the respective consent audit call, `https://consentaudit.microsoftcasualgames.com/api/logconsent1`, and copy the consentString value from the JSON tab.
4. Go to [IAB GPP Encoder / Decoder](https://iabgpp.com/) and paste consentString value into TCF tab. Click the Decode button.
5. Scroll to "Purpose Consents" and see if the purpose you toggled off is no longer highlighted gray.

#### Toggle <span style="color:#EE0000">**OFF**</span> consent for a vendor part of the IAB TCF:

1. Under Vendor List, scroll to "Vendors who are part of the IAB TCF".
2. Select and expand a vendor of your choice. Toggle off consent. Click "Save Settings & Continue".
3. In Fiddler, find the respective consent audit call, `https://consentaudit.microsoftcasualgames.com/api/logconsent1`, and copy the consentString value from the JSON tab.
4. Go to [IAB GPP Encoder / Decoder](https://iabgpp.com/) and paste consentString value into TCF tab. Click the Decode button.
5. Scroll to "Vendor Consents" and ctrl-F the vendor name. Check if the Vendor you toggled off is no longer listed in the "Included" section and only listed in the "Available" section.
6. In Fiddler, check the ut/v3 request for the following:
7. Verify consent_required=True and verify that the consent_string value is the same as the full string in the previous step.
8. The ext_inv_code displays the country you have spoofed via VPN.

---

### h. GDPR Data Usage Settings – Change to Decline State from Accepted State

1. Remain in spoofed/VPN'd into a GDPR region.
2. Maintain any existing consent string/decision.
3. Navigate to and open "Data Usage Settings" in the game (About > Data Usage Settings).
4. Select "<span style="color:#EE0000">**Decline All & Continue**</span>".
5. Check the Consent Audit Log:
   - In Fiddler, look for the POST call to: `https://consentaudit.microsoftcasualgames.com/api/logconsent1`
   - Verify that the JSON request includes:
     - isAcceptAll=False
     - ConsentString value
     - MCGID value
6. Copy the full consent string value.
7. Paste the string into the TCF tab of this tool: [IAB GPP Encoder / Decoder](https://iabgpp.com/)
8. Confirm that there are no vendors included under Vendor Consents. The "Included" section should be blank.
9. Confirm that no Purpose Consents are highlighted in gray.
10. Confirm that no Legitimate Interests are highlighted in gray, and the Vendor Legitimate Interests "Included" section is empty.
11. Consent Screen should be "0". The value of "0" indicates that consent was provided on the initial layer of the CMP.
12. Vendors Disclosed section displays all the vendors you were shown in the CMP and ensure they are populated in the "Included" section.
13. In Fiddler, check the ut/v3 request for the following:
14. The device_id.ifa value is no longer present.
15. Verify consent_required=True and verify that the consent_string value is the same as the full string in the previous step.
16. The ext_inv_code displays the country you have spoofed via VPN.
17. User dnt (Do Not Track) is true.

---

### i. Check GDPR Value and CMP Gate – Declined State

1. Delete your consent file (location of stored file shown in previous steps).
2. Uninstall the selected game.
3. Reinstall the selected game (don't launch yet).
   - This is to ensure you get the Ad Sync page to pop with different logic.
4. Spoof for a GDPR region via VPN (If not already having done so.)
5. Launch Fiddler and ensure it is capturing traffic.
6. Launch the game – If functioning correctly you will be gated by CMP.
7. Select "<span style="color:#EE0000">**Decline All & Continue**</span>" consent option at this CMP gate.
8. Search the "raw" Fiddler Inspectors tab for the following POST call: `https://consentaudit.microsoftcasualgames.com/api/logconsent1`
9. Ensure that in the Request JSON there is a value for consentString, isAcceptAll=False, and your MCGID is populated.
10. Navigate to a section of the game where an ad is served and confirm that you are considered true for GDPR by searching for the ut/v3 call, and finding **consent_required**=true, and a value following the **consent_string** field, shown below:

---

### j. Validate Consent String – Declined State

In this step you will confirm that you have a valid consentString by following these validation steps:

1. Navigate to your consent file by pasting below path into File Explorer:
   `%LOCALAPPDATA%\Publishers\8wekyb3d8bbwe\mcg`
2. Paste the string into the TCF tab of this tool: [IAB GPP Encoder / Decoder](https://iabgpp.com/)
3. Ensure that the IAB TCF tool is able to parse and validate your string by translating it.
4. Confirm that no purpose consents are highlighted in gray.
5. Check that the Vendors Disclosed section displays all the vendors you were shown in the CMP and ensure they are populated in the "Included" section.
6. Ensure that no Vendor Consents are present. The "Included" section should be blank.

---

### k. Test for Ad Sync Pixel Functionality – Declined/Blocking Sync Pixel

In this step you will confirm that the ad sync pixel is <span style="color:#EE0000">**BLOCKED**</span> (since CMP was <span style="color:#EE0000">declined</span>), by doing the following:

1. After having launched the app, wait for the Ad Sync page to pop.
   - If never popped, close app, and relaunch.
2. In Fiddler, hold down and drag the Any Process tool to target the browser where Ad Sync page loaded.
3. Refresh Ad Sync browser page.
4. In Fiddler, confirm that declining consent at the CMP has worked:
   - This should block ALL sync pixels such as the Xandr mapuid pixel. (Note: you will still see the c.bing.com pixel).
5. Ensure the following Xandr mapuid call is NOT present: `https://m.adnxs.com/mapuid?member=280&user=[YOUR MUID VALUE]`
6. If any sync pixel calls are present, ensure that the "isAcceptAll" field in the consent file is NOT set to true. If it is true, repeat steps for testing in decline state, ensure "isAcceptAll" is set to false, and pixels do not fire.
7. Keep the Ad Sync browser page open as it will be necessary for the next step.

---

### l. Test for MCGID presence on Ad Sync Page – Declined State

In this step you will confirm that your MCGID is being passed to the Ad Sync page even though you declined consent:

1. Your ad sync page should still be open from the previous step. If not, please refer to this step: 1. Check for Ad Sync Page & Sync Pixel
2. Grab the referrerID= value from the URL that was loaded.
3. You can also paste the entire URL into Notepad to make it easier to find the referrerID. The highlighted value is your MCGID.

---

### m. Check for DNT Status, Consent String, ext_inv_code, and NO MCGID, MUID, ANID, and LiveRamp ID – Declined State

In this step, you will be confirming that the presence of IDs and Do Not Track status correspond with the consent state of declined:

1. Ensure Fiddler is running and launch the app.
2. Find the idmapper call and verify your MCGID in the "JSON" tab of the Response section. Please Note: MUID and ANID will still be included so that opt out statuses can be gathered, and your LiveRamp ID should not appear.
3. Find the ut/v3 call and confirm that the device_id.ifa value is no longer present, and that eids.id no longer contains your MUID or ANID.
4. Also verify that the eids section does not contain your LiveRamp ID.
5. While still in the ut/v3 call, check that user.dnt (Do Not Track) is true, and that user.external_uid no longer exists in the user section.
6. In the ut/v3 call, copy the shown consent string and check that it matches the consent string you previously validated.
7. While in the ut/v3 call, find the ext_inv_code. It should display the country you have spoofed via VPN.

---

### n. Advanced Settings Check – Accept from Declined State

After having declined consent on the first layer of the CMP, do the following - making sure selections beyond the first layer of consent are reflected in the consent string.

1. Remain in spoofed/VPN'd into a GDPR region.
2. Maintain any existing consent string/decision.
3. Go to About > Data Usage Settings > Advanced settings.
4. Choose a scenario below and follow the respective steps in that subsection:
   - Toggle ON consent for a Purpose
   - Toggle ON consent for a vendor part of the IAB TCF

#### Toggle <span style="color:#70AD47">**ON**</span> consent for a Purpose:

1. Go to Advance Settings > Advertising Settings. Toggle <span style="color:#70AD47">**ON**</span> consent to the purpose previously toggled OFF.
2. In Fiddler, find the respective consent audit call, `https://consentaudit.microsoftcasualgames.com/api/logconsent1`, and copy the consentString value from the JSON tab.
3. Go to [IAB GPP Encoder / Decoder](https://iabgpp.com/) and paste the value into the TCF tab. Click the Decode button.
4. Scroll down to "Purpose Consents" and check the purpose toggled on is now highlighted gray.

#### Toggle <span style="color:#70AD47">**ON**</span> consent for a vendor part of the IAB TCF:

1. Under Vendor List, scroll to "Vendors who are part of the IAB TCF".
2. Select and expand a vendor of your choice. Toggle on consent. Click "Save Settings & Continue".
3. In Fiddler, find the respective consent audit call, `https://consentaudit.microsoftcasualgames.com/api/logconsent1`, and copy the consentString value from the JSON tab.
4. Go to [IAB GPP Encoder / Decoder](https://iabgpp.com/) and paste consentString value into TCF tab. Click the Decode button.
5. Scroll to "Vendor Consents" and ctrl-F the vendor name. Check if the Vendor you toggled on is listed in the "Included" section and no longer listed in the "Available" section.
6. In Fiddler, check the ut/v3 request for the following:
7. Verify consent_required=True and verify that the consent_string value is the same as the full string in the previous step.
8. The ext_inv_code displays the country you have spoofed via VPN.

---

### o. GDPR Data Usage Settings – Change to Accept State from Declined State

1. Remain spoofed/VPN'd into a GDPR region.
2. Maintain any existing consent string / decision.
3. Navigate to and open "Data Usage Settings" in the game (About > Data Usage Settings).
4. Select "<span style="color:#70AD47">**Accept & Continue**</span>".
5. Check the Consent Audit Log:
   - In Fiddler, look for the POST call to: `https://consentaudit.microsoftcasualgames.com/api/logconsent1`
   - Verify that the JSON request includes:
     - isAcceptAll=True
     - ConsentString value
     - MCGID value
6. Copy the full consent string value.
7. Paste the string into the TCF tab of this tool: [IAB GPP Encoder / Decoder](https://iabgpp.com/)
8. Verify that the vendors consented to in the CMP are showing as consented in the IAB TCF tool's Vendor Consents section. Consented Vendors appear in the "Included" section.
9. Confirm that all Purpose Consents are shown and selected purposes are highlighted in gray.
10. Confirm that Legitimate Interests are highlighted, and the Vendor Legitimate Interests are listed in the "Included" section.
11. Confirm that Consent Screen = "0". The value of "0" indicates that consent was provided on the initial layer of the CMP.
12. Vendors Disclosed displays all the vendors you were shown in the CMP and ensure they are populated in the "Included" section.
13. In Fiddler, check the ut/v3 request for the following:
14. The device_id.ifa is present.
15. Verify consent_required=True and verify that the consent_string value is the same as the full string in the previous step.
16. The ext_inv_code displays the country you have spoofed via VPN.
17. User dnt (Do Not Track) is false.
