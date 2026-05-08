window.TCF_PLAYBOOK = {
    title: "QA Playbook - Validating Identity and Consent Logic",
    context: {
        platform: "Windows Desktop (UWP + Win32)",
        cmpId: 198,
        vendorCount: 925,
        consentFilePath: "%LOCALAPPDATA%\\Publishers\\8wekyb3d8bbwe\\mcg",
        consentAuditEndpoint: "https://consentaudit.microsoftcasualgames.com/api/logconsent1",
        tcStringValidator: "https://iabgpp.com/",
        note: "Brazil and Canada are treated as GDPR regions"
    },
    steps: [
        {
            id: "step-a",
            letter: "a",
            title: "Spoof/VPN for a GDPR Region",
            category: "setup",
            consentState: null,
            summary: "Set up VPN to spoof a GDPR region to trigger CMP gate and consent logic",
            instructions: [
                "Delete your existing consent file to ensure a new one will be created once you allow or decline consent.",
                "Uninstall and then reinstall game (do not launch yet).",
                "Spoof for a GDPR region via VPN (e.g. France). Please see the VPN Guide for instructions."
            ],
            notes: ["VPN is needed as IP address is used to determine user location.", "MCG applies logic to gate users with the CMP and collect consent in GDPR regions.", "When full consent is declined, logic blocks sync pixels."],
            policyRefs: [],
            controlRefs: [],
            tags: ["setup", "vpn", "gdpr-region", "prerequisite"]
        },
        {
            id: "step-b",
            letter: "b",
            title: "Check GDPR Value and CMP Gate – Accepted State",
            category: "accepted",
            consentState: "accepted",
            summary: "Verify CMP gate appears and Accept & Continue triggers correct consent audit log",
            instructions: [
                "Launch Fiddler and ensure it is capturing traffic.",
                "Launch the game – If functioning correctly you will be gated by the CMP.",
                "Select 'Accept & Continue' consent option at this CMP gate.",
                "Search the 'raw' Fiddler Inspectors tab for the POST call: https://consentaudit.microsoftcasualgames.com/api/logconsent1",
                "Ensure that in the Request JSON there is a value for consentString, isAcceptAll=True, and your MCGID is populated.",
                "Navigate to an ad-serving section and confirm consent_required=true and a consent_string value in the ut/v3 call."
            ],
            expectedResults: ["CMP gate blocks content until user acts", "isAcceptAll=True in consent audit log", "MCGID present in request", "consent_required=true in ut/v3"],
            policyRefs: ["appB-C-a", "appB-C-b-X"],
            controlRefs: ["cmp-pol-14", "cmp-pol-9"],
            tags: ["cmp-gate", "accept", "consent-audit", "fiddler"]
        },
        {
            id: "step-c",
            letter: "c",
            title: "Validate Consent String – Accepted State",
            category: "accepted",
            consentState: "accepted",
            summary: "Validate TC String from consent file using IAB GPP decoder after accepting consent",
            instructions: [
                "Navigate to consent file: %LOCALAPPDATA%\\Publishers\\8wekyb3d8bbwe\\mcg",
                "Paste the string into the TCF tab of the IAB GPP Encoder/Decoder: https://iabgpp.com/",
                "Ensure the tool parses and validates your string by translating it.",
                "Confirm that all Purpose Consents are shown and highlighted in gray.",
                "Check that the Vendors Disclosed section displays all vendors shown in the CMP (populated in 'Included').",
                "Verify that vendors consented to in the CMP show as consented in the Vendor Consents section."
            ],
            expectedResults: ["TC String is valid and parseable", "All Purpose Consents highlighted", "Vendors Disclosed matches CMP vendors", "Vendor Consents match user selections"],
            policyRefs: ["ch2-4-1", "ch2-4-3", "ch2-5-3"],
            controlRefs: ["cmp-tech-1", "cmp-res-2"],
            tags: ["tc-string", "validation", "consent-file", "accepted"]
        },
        {
            id: "step-d",
            letter: "d",
            title: "Test Ad Sync Pixel – Accepted State",
            category: "accepted",
            consentState: "accepted",
            summary: "Confirm ad sync pixel fires correctly when consent is accepted",
            instructions: [
                "After launching the app, wait for the Ad Sync page to pop (relaunch if needed).",
                "In Fiddler, use the Any Process tool to target the Ad Sync browser.",
                "Refresh Ad Sync browser page.",
                "Look for the call: https://m.adnxs.com/mapuid?member=280&user=[YOUR MUID VALUE]",
                "Compare the MUID in the call to your actual MUID from in-game.",
                "Keep the Ad Sync browser page open for the next step."
            ],
            expectedResults: ["Xandr mapuid pixel fires", "MUID value matches in-game MUID"],
            policyRefs: [],
            controlRefs: ["cmp-tech-2"],
            tags: ["sync-pixel", "xandr", "muid", "accepted"]
        },
        {
            id: "step-e",
            letter: "e",
            title: "Test MCGID on Ad Sync Page – Accepted State",
            category: "accepted",
            consentState: "accepted",
            summary: "Confirm MCGID is passed to Ad Sync page via referrerID parameter",
            instructions: [
                "Ad sync page should still be open from previous step.",
                "Grab the referrerID= value from the loaded URL.",
                "Paste the URL into Notepad to find the referrerID value – this is your MCGID."
            ],
            expectedResults: ["referrerID in URL matches your MCGID"],
            policyRefs: [],
            controlRefs: [],
            tags: ["mcgid", "ad-sync", "referrer-id", "accepted"]
        },
        {
            id: "step-f",
            letter: "f",
            title: "Check DNT, IDs, Consent String, ext_inv_code, LiveRamp – Accepted State",
            category: "accepted",
            consentState: "accepted",
            summary: "Verify all ID presence and DNT=false correspond with accepted consent state",
            instructions: [
                "Ensure Fiddler is running and launch the app.",
                "Find idmapper call – copy MUID and MCGID from the JSON Response tab.",
                "In ut/v3 call: verify device_id.ifa equals your MCGID.",
                "In ut/v3 call: verify MUID in eids.id.",
                "In ut/v3 call: verify ANID in eids section.",
                "In ut/v3 call: verify MUID under user.external_uid.",
                "Check idmapper for liveramp.com=true under sendIndustryIds. If true, check industryIDs for LiveRamp ID.",
                "If LiveRamp ID found in idmapper, verify it exists in ut/v3 eids. (Only if user ad-synced with opt-in browser, signed into Windows, or Xbox Live.)",
                "Verify user.dnt is false in ut/v3.",
                "Copy consent string from ut/v3 and verify it matches previously validated string.",
                "Find ext_inv_code – should display the VPN-spoofed country."
            ],
            expectedResults: ["MCGID in device_id.ifa", "MUID in eids and external_uid", "ANID present in eids", "LiveRamp ID present (if applicable)", "user.dnt=false", "Consent string matches", "ext_inv_code shows VPN country"],
            notes: ["Omission of LiveRamp ID in ut/v3 call is a ship blocker."],
            policyRefs: ["ch2-4-3", "ch2-5-8"],
            controlRefs: ["cmp-tech-2"],
            tags: ["dnt", "mcgid", "muid", "anid", "liveramp", "ext-inv-code", "accepted"]
        },
        {
            id: "step-g",
            letter: "g",
            title: "Advanced Settings – Decline from Accepted State",
            category: "granular",
            consentState: "accepted-to-partial",
            summary: "Toggle OFF individual purposes or vendors and verify TC String reflects granular changes",
            instructions: [
                "Remain VPN'd into a GDPR region with existing consent.",
                "Go to About > Data Usage Settings > Advanced settings.",
                "Choose scenario: Toggle OFF a Purpose or Toggle OFF a Vendor."
            ],
            subScenarios: [
                {
                    id: "step-g-purpose",
                    title: "Toggle OFF consent for a Purpose",
                    instructions: [
                        "Under Advertiser Settings, scroll to Purposes.",
                        "Expand a purpose and toggle off consent. Click 'Save Settings & Continue'.",
                        "In Fiddler, find consent audit call and copy consentString.",
                        "Paste into IAB GPP decoder and click Decode.",
                        "Verify the toggled-off purpose is no longer highlighted gray in Purpose Consents."
                    ],
                    expectedResults: ["Toggled-off purpose no longer highlighted in decoder"]
                },
                {
                    id: "step-g-vendor",
                    title: "Toggle OFF consent for a Vendor",
                    instructions: [
                        "Under Vendor List, scroll to 'Vendors who are part of the IAB TCF'.",
                        "Expand a vendor, toggle off consent, click 'Save Settings & Continue'.",
                        "In Fiddler, find consent audit call and copy consentString.",
                        "Paste into IAB GPP decoder and click Decode.",
                        "Verify the vendor is no longer in 'Included' under Vendor Consents.",
                        "In ut/v3: verify consent_required=True and consent_string matches.",
                        "Verify ext_inv_code displays VPN country."
                    ],
                    expectedResults: ["Vendor removed from Included list", "consent_string in ut/v3 matches decoded string"]
                }
            ],
            policyRefs: ["appB-C-c-III", "ch2-5-4"],
            controlRefs: ["cmp-sec-1", "cmp-sec-2", "cmp-res-3"],
            tags: ["granular", "purpose-toggle", "vendor-toggle", "advanced-settings", "decline-partial"]
        },
        {
            id: "step-h",
            letter: "h",
            title: "Data Usage Settings – Change to Decline from Accepted",
            category: "state-change",
            consentState: "accepted-to-declined",
            summary: "Decline all consent from accepted state and verify TC String, vendor consents cleared, DNT=true",
            instructions: [
                "Remain VPN'd in GDPR region with existing consent.",
                "Navigate to About > Data Usage Settings.",
                "Select 'Decline All & Continue'.",
                "In Fiddler, find POST to consent audit endpoint.",
                "Verify: isAcceptAll=False, ConsentString value, MCGID value.",
                "Copy full consent string and paste into IAB GPP decoder.",
                "Confirm no vendors in Vendor Consents 'Included' section.",
                "Confirm no Purpose Consents highlighted in gray.",
                "Confirm no Legitimate Interests highlighted and Vendor LI 'Included' is empty.",
                "Confirm Consent Screen = '0' (initial layer consent).",
                "Verify Vendors Disclosed still populated.",
                "In ut/v3: device_id.ifa no longer present.",
                "In ut/v3: consent_required=True and consent_string matches.",
                "Verify ext_inv_code shows VPN country.",
                "Verify user.dnt = true."
            ],
            expectedResults: ["isAcceptAll=False in audit log", "No Vendor Consents", "No Purpose Consents", "No Legitimate Interests", "Consent Screen=0", "Vendors Disclosed still populated", "device_id.ifa absent", "user.dnt=true"],
            policyRefs: ["appB-C-b-X", "ch2-5-3", "ch2-5-4"],
            controlRefs: ["cmp-tech-1", "cmp-tech-3", "cmp-res-2", "cmp-li-3"],
            tags: ["state-change", "decline-all", "consent-withdrawal", "dnt"]
        },
        {
            id: "step-i",
            letter: "i",
            title: "Check GDPR Value and CMP Gate – Declined State",
            category: "declined",
            consentState: "declined",
            summary: "Fresh install with Decline All – verify CMP gate and consent audit log",
            instructions: [
                "Delete your consent file.",
                "Uninstall and reinstall the game (don't launch yet).",
                "Spoof for a GDPR region via VPN if not already.",
                "Launch Fiddler and ensure capturing.",
                "Launch the game – verify CMP gate appears.",
                "Select 'Decline All & Continue'.",
                "Find POST call to consent audit endpoint.",
                "Verify: consentString present, isAcceptAll=False, MCGID populated.",
                "Navigate to ad section, confirm consent_required=true and consent_string in ut/v3."
            ],
            expectedResults: ["CMP gate blocks content", "isAcceptAll=False", "MCGID present", "consent_required=true in ut/v3"],
            policyRefs: ["appB-C-a", "appB-C-b-X"],
            controlRefs: ["cmp-pol-14", "cmp-pol-9"],
            tags: ["cmp-gate", "decline", "consent-audit", "fresh-install"]
        },
        {
            id: "step-j",
            letter: "j",
            title: "Validate Consent String – Declined State",
            category: "declined",
            consentState: "declined",
            summary: "Validate TC String from consent file after declining consent",
            instructions: [
                "Navigate to consent file: %LOCALAPPDATA%\\Publishers\\8wekyb3d8bbwe\\mcg",
                "Paste string into IAB GPP decoder.",
                "Ensure tool parses and validates the string.",
                "Confirm no Purpose Consents are highlighted in gray.",
                "Verify Vendors Disclosed section shows all CMP vendors.",
                "Ensure no Vendor Consents present – 'Included' section should be blank."
            ],
            expectedResults: ["TC String valid", "No Purpose Consents highlighted", "Vendors Disclosed populated", "No Vendor Consents"],
            policyRefs: ["ch2-4-1", "ch2-4-3", "ch2-5-3"],
            controlRefs: ["cmp-tech-1", "cmp-res-2"],
            tags: ["tc-string", "validation", "consent-file", "declined"]
        },
        {
            id: "step-k",
            letter: "k",
            title: "Test Ad Sync Pixel – Declined State",
            category: "declined",
            consentState: "declined",
            summary: "Confirm ad sync pixel is BLOCKED when consent is declined",
            instructions: [
                "After launching app, wait for Ad Sync page to pop (relaunch if needed).",
                "In Fiddler, target the Ad Sync browser.",
                "Refresh Ad Sync browser page.",
                "Confirm ALL sync pixels are blocked (c.bing.com pixel may still appear).",
                "Ensure Xandr mapuid call is NOT present: https://m.adnxs.com/mapuid?member=280&user=[MUID]",
                "If sync pixels fire, verify isAcceptAll is NOT true in consent file.",
                "Keep Ad Sync browser page open."
            ],
            expectedResults: ["Xandr mapuid pixel does NOT fire", "All sync pixels blocked (except c.bing.com)"],
            policyRefs: [],
            controlRefs: ["cmp-tech-2"],
            tags: ["sync-pixel", "blocked", "xandr", "declined"]
        },
        {
            id: "step-l",
            letter: "l",
            title: "Test MCGID on Ad Sync Page – Declined State",
            category: "declined",
            consentState: "declined",
            summary: "Confirm MCGID is still passed to Ad Sync page even when declined",
            instructions: [
                "Ad sync page should still be open from previous step.",
                "Grab the referrerID= value from the URL.",
                "Verify referrerID matches your MCGID."
            ],
            expectedResults: ["MCGID present in referrerID even when declined"],
            policyRefs: [],
            controlRefs: [],
            tags: ["mcgid", "ad-sync", "referrer-id", "declined"]
        },
        {
            id: "step-m",
            letter: "m",
            title: "Check DNT, IDs, Consent String – Declined State",
            category: "declined",
            consentState: "declined",
            summary: "Verify DNT=true, IDs absent, and consent string matches in declined state",
            instructions: [
                "Ensure Fiddler is running and launch the app.",
                "Find idmapper call – verify MCGID present. Note: MUID and ANID still included for opt-out status. LiveRamp ID should NOT appear.",
                "In ut/v3: confirm device_id.ifa is absent, eids.id does NOT contain MUID or ANID.",
                "Verify eids does NOT contain LiveRamp ID.",
                "Verify user.dnt=true and user.external_uid does not exist.",
                "Copy consent string from ut/v3 and verify it matches previously validated string.",
                "Find ext_inv_code – should display VPN country."
            ],
            expectedResults: ["MCGID in idmapper", "device_id.ifa absent", "No MUID/ANID in eids", "No LiveRamp ID", "user.dnt=true", "No external_uid", "Consent string matches", "ext_inv_code correct"],
            policyRefs: ["ch2-4-3"],
            controlRefs: ["cmp-tech-2"],
            tags: ["dnt", "no-ids", "declined", "ext-inv-code"]
        },
        {
            id: "step-n",
            letter: "n",
            title: "Advanced Settings – Accept from Declined State",
            category: "granular",
            consentState: "declined-to-partial",
            summary: "Toggle ON individual purposes or vendors from declined state and verify TC String reflects changes",
            instructions: [
                "Remain VPN'd in GDPR region with existing declined consent.",
                "Go to About > Data Usage Settings > Advanced settings.",
                "Choose scenario: Toggle ON a Purpose or Toggle ON a Vendor."
            ],
            subScenarios: [
                {
                    id: "step-n-purpose",
                    title: "Toggle ON consent for a Purpose",
                    instructions: [
                        "Go to Advance Settings > Advertising Settings.",
                        "Toggle ON consent for a previously off purpose.",
                        "In Fiddler, find consent audit call and copy consentString.",
                        "Paste into IAB GPP decoder and click Decode.",
                        "Verify toggled-on purpose is now highlighted gray in Purpose Consents."
                    ],
                    expectedResults: ["Toggled-on purpose now highlighted in decoder"]
                },
                {
                    id: "step-n-vendor",
                    title: "Toggle ON consent for a Vendor",
                    instructions: [
                        "Under Vendor List, find 'Vendors who are part of the IAB TCF'.",
                        "Expand a vendor, toggle on consent, click 'Save Settings & Continue'.",
                        "In Fiddler, find consent audit call and copy consentString.",
                        "Paste into IAB GPP decoder and click Decode.",
                        "Verify vendor is now in 'Included' under Vendor Consents.",
                        "In ut/v3: verify consent_required=True and consent_string matches.",
                        "Verify ext_inv_code displays VPN country."
                    ],
                    expectedResults: ["Vendor now in Included list", "consent_string in ut/v3 matches"]
                }
            ],
            policyRefs: ["appB-C-c-III", "ch2-5-4"],
            controlRefs: ["cmp-sec-1", "cmp-sec-2", "cmp-res-3"],
            tags: ["granular", "purpose-toggle", "vendor-toggle", "advanced-settings", "accept-partial"]
        },
        {
            id: "step-o",
            letter: "o",
            title: "Data Usage Settings – Change to Accept from Declined",
            category: "state-change",
            consentState: "declined-to-accepted",
            summary: "Accept all consent from declined state and verify TC String, vendor consents restored, DNT=false",
            instructions: [
                "Remain VPN'd in GDPR region with existing declined consent.",
                "Navigate to About > Data Usage Settings.",
                "Select 'Accept & Continue'.",
                "In Fiddler, find POST to consent audit endpoint.",
                "Verify: isAcceptAll=True, ConsentString value, MCGID value.",
                "Copy full consent string and paste into IAB GPP decoder.",
                "Verify vendors consented show in Vendor Consents 'Included' section.",
                "Confirm all Purpose Consents highlighted in gray.",
                "Confirm Legitimate Interests highlighted and Vendor LI in 'Included'.",
                "Confirm Consent Screen = '0'.",
                "Verify Vendors Disclosed populated.",
                "In ut/v3: device_id.ifa is present.",
                "In ut/v3: consent_required=True and consent_string matches.",
                "Verify ext_inv_code shows VPN country.",
                "Verify user.dnt = false."
            ],
            expectedResults: ["isAcceptAll=True", "Vendor Consents restored", "Purpose Consents highlighted", "LI highlighted", "Consent Screen=0", "Vendors Disclosed populated", "device_id.ifa present", "user.dnt=false"],
            policyRefs: ["appB-C-b-X", "ch2-5-3", "ch2-5-4"],
            controlRefs: ["cmp-tech-1", "cmp-tech-3", "cmp-res-2", "cmp-li-3"],
            tags: ["state-change", "accept-all", "consent-grant", "dnt"]
        }
    ]
};
