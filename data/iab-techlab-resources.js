/**
 * IAB TechLab GitHub Resources — Structured content from the IAB Europe
 * Transparency and Consent Framework technical specifications (TCFv2).
 * Source: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/tree/master/TCFv2
 */
window.IAB_TECHLAB_RESOURCES = {
    source: 'IAB TechLab GitHub',
    sourceUrl: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/tree/master/TCFv2',
    documents: [
        {
            id: 'techlab-cmp-api',
            title: 'CMP API v2',
            url: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md',
            sections: [
                {
                    id: 'cmp-api-overview',
                    title: 'CMP API Overview',
                    text: 'The CMP API defines the interface a Consent Management Provider provides for callers (web and in-app) to access information regarding transparency and consent disclosed and obtained from the end user. CMPs provide a user interface to establish transparency, obtain consent or register objections, and capture preferences in Signals packaged as a TC String.',
                    tags: ['cmp', 'api', 'consent', 'transparency', 'interface']
                },
                {
                    id: 'cmp-api-function',
                    title: 'CMP API Function — __tcfapi',
                    text: 'Every consent manager MUST provide the following API function: __tcfapi(command, version, callback, parameter). The function __tcfapi must always be a function and cannot be any other type, even if only temporarily on initialization. The API must be able to handle calls at all times. CMPs must also provide a proxy for postMessage events targeted to the __tcfapi interface sent from within nested iframes.',
                    tags: ['__tcfapi', 'cmp', 'api', 'function', 'postMessage', 'iframe']
                },
                {
                    id: 'cmp-api-ping',
                    title: 'CMP API Command: ping',
                    text: 'The ping command invokes the callback immediately without any asynchronous logic and returns a PingReturn object for determining whether or not the main CMP script has loaded yet and whether GDPR applies. This is the only command required to be on the page in a stub before the rest of the commands are implemented. PingReturn contains: gdprApplies, cmpLoaded, cmpStatus, displayStatus, apiVersion, cmpVersion, cmpId, gvlVersion, tcfPolicyVersion.',
                    tags: ['ping', 'cmp', 'PingReturn', 'cmpLoaded', 'gdprApplies', 'stub']
                },
                {
                    id: 'cmp-api-addeventlistener',
                    title: 'CMP API Command: addEventListener',
                    text: 'Registers a callback function with a CMP. The callback will be invoked with the TCData object whenever the TC String is changed and a new one is available. The eventStatus property shall be one of: tcloaded (CMP loaded with valid TC String, not intending to surface UI), cmpuishown (UI surfaced, TC String available with transparency rendered), useractioncomplete (user confirmed choices, CMP ready to respond with TC String).',
                    tags: ['addEventListener', 'TCData', 'eventStatus', 'tcloaded', 'cmpuishown', 'useractioncomplete', 'callback']
                },
                {
                    id: 'cmp-api-removeeventlistener',
                    title: 'CMP API Command: removeEventListener',
                    text: 'Removes a previously registered callback function using the listenerId assigned by the CMP. The callback shall be called with false as the success parameter if the listener could not be removed.',
                    tags: ['removeEventListener', 'listenerId', 'callback']
                },
                {
                    id: 'cmp-api-tcdata',
                    title: 'TCData Object',
                    text: 'The TCData object contains both the encoded and unencoded values of the TC String as well as information about the CMP eventStatus and whether GDPR applies. Properties include: tcString, tcfPolicyVersion, cmpId, cmpVersion, gdprApplies, eventStatus, cmpStatus, listenerId, isServiceSpecific, useNonStandardTexts, publisherCC, purposeOneTreatment, purpose.consents, purpose.legitimateInterests, vendor.consents, vendor.legitimateInterests, vendor.disclosedVendors, specialFeatureOptins, publisher.consents, publisher.legitimateInterests, publisher.customPurpose, publisher.restrictions.',
                    tags: ['TCData', 'tcString', 'consent', 'legitimateInterests', 'vendor', 'purpose', 'publisher']
                },
                {
                    id: 'cmp-api-getvendorlist',
                    title: 'CMP API Command: getVendorList',
                    text: 'Optional command that returns a GlobalVendorList object. The caller may specify a GVL version number with the vendorListVersion parameter. If no version is specified, the GVL version returned shall be the same as encoded in the current TC String. Pass LATEST to explicitly receive the latest GVL version.',
                    tags: ['getVendorList', 'GlobalVendorList', 'GVL', 'vendorListVersion']
                },
                {
                    id: 'cmp-api-getinapptcdata',
                    title: 'CMP API Command: getInAppTCData',
                    text: 'A mobile in-app CMP that uses a web-based UI in a mobile web view may implement this command for retrieving the TC String and pre-parsed TC signals from that web-based UI for storing them in NSUserDefaults (iOS) or SharedPreferences (Android).',
                    tags: ['getInAppTCData', 'mobile', 'in-app', 'NSUserDefaults', 'SharedPreferences', 'iOS', 'Android']
                },
                {
                    id: 'cmp-api-stub',
                    title: 'CMP Stub API Script',
                    text: 'A CMP-provided synchronous stub script must be added by the publisher to their page before any other scripts that rely on __tcfapi. The stub defines a queuing function named __tcfapi at Window scope, enqueues all arguments, defines postMessage handler for cross-origin iframe requests, adds event listener for message events, and creates an iframe named __tcfapiLocator. When the main CMP loads, it redefines __tcfapi and dequeues calls in FIFO order.',
                    tags: ['stub', '__tcfapi', '__tcfapiLocator', 'postMessage', 'queue', 'iframe']
                },
                {
                    id: 'cmp-api-inapp-structure',
                    title: 'CMP In-App Internal Structure',
                    text: 'NSUserDefaults (iOS) or SharedPreferences (Android) shall be used to store pre-parsed TC data and the TC string. Key names include: IABTCF_CmpSdkID, IABTCF_CmpSdkVersion, IABTCF_PolicyVersion, IABTCF_gdprApplies, IABTCF_PublisherCC, IABTCF_PurposeOneTreatment, IABTCF_UseNonStandardTexts, IABTCF_TCString, IABTCF_VendorConsents, IABTCF_VendorLegitimateInterests, IABTCF_PurposeConsents, IABTCF_PurposeLegitimateInterests, IABTCF_SpecialFeaturesOptIns.',
                    tags: ['in-app', 'IABTCF', 'NSUserDefaults', 'SharedPreferences', 'mobile', 'keys', 'storage']
                },
                {
                    id: 'cmp-api-ctv',
                    title: 'CTV (Connected TV) Support',
                    text: 'CTV applications determine storage locations and naming based on context. Web Runtime environments follow Web Storage specification. Native CTV apps should support both GPP section key names and TCF key names. Data storage options include Application Preferences (Registry) and Private Storage. Supported platforms include Android TV, Apple TV, and Roku.',
                    tags: ['CTV', 'connected tv', 'Android TV', 'Apple TV', 'Roku', 'GPP', 'native']
                },
                {
                    id: 'cmp-api-gdprapplies',
                    title: 'gdprApplies Value Meaning',
                    text: 'gdprApplies is a boolean that may be undefined. A CMP shall determine whether GDPR applies in its current context. A publisher may determine GDPR applies to all traffic, or a CMP may invoke a geo-tagging service. When gdprApplies=1 vendors shall always consider GDPR applies. When gdprApplies=0 vendors may put in place additional measures to verify. If undefined, scripts shall assume CMP is still pending determination.',
                    tags: ['gdprApplies', 'GDPR', 'geo-tagging', 'territorial scope']
                },
                {
                    id: 'cmp-api-iframe',
                    title: 'Calling CMP API from Iframes',
                    text: 'The only way to request TC Data from a parent or ancestor frame is using postMessage. To locate an ancestor frame capable of responding, search for an ancestor frame that has a child frame named __tcfapiLocator. CMPs shall create an event listener to handle postMessage requests via the CMP stub API script. The sent message includes __tcfapiCall with command, parameter, version, and callId. The response includes __tcfapiReturn with returnValue, success, and callId.',
                    tags: ['iframe', 'postMessage', '__tcfapiLocator', 'cross-origin', 'nested']
                },
                {
                    id: 'cmp-api-ping-status',
                    title: 'CMP Ping Status Codes',
                    text: 'cmpStatus codes: stub (CMP not yet loaded, stub in place), loading (deprecated), loaded (CMP finished loading), error (CMP in error state, shall not respond to other requests). displayStatus codes: visible (UI currently displayed), hidden (UI not yet or no longer displayed), disabled (UI will not show, e.g. GDPR does not apply or TC data is current).',
                    tags: ['cmpStatus', 'displayStatus', 'stub', 'loaded', 'error', 'visible', 'hidden', 'disabled']
                }
            ]
        },
        {
            id: 'techlab-tc-string',
            title: 'Consent String and Vendor List Formats v2',
            url: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md',
            sections: [
                {
                    id: 'tc-string-purpose',
                    title: 'TC String Purpose and Scope',
                    text: 'A TC String\'s primary purpose is to encapsulate and encode all the information disclosed to a user and the expression of their preferences for personal data processing under the GDPR. Using a CMP, information is captured into an encoded and compact HTTP-transferable string enabling communication of transparency and consent information to vendors who process personal data. Vendors decode a TC String to determine whether they have the necessary legal bases.',
                    tags: ['TC String', 'consent', 'encoding', 'GDPR', 'transparency', 'vendors']
                },
                {
                    id: 'tc-string-contents',
                    title: 'TC String Information Contents',
                    text: 'A TC String contains: 1) General metadata (encoding version, last updated, creation date, GVL version, CMP used). 2) User consent per Purpose and per Vendor. 3) Legitimate interest transparency and Right to Object signals. 4) Publisher restrictions on vendor data processing. 5) Publisher transparency and consent for own legal bases. 6) Specific jurisdiction disclosures (PublisherCC and PurposeOneTreatment).',
                    tags: ['TC String', 'metadata', 'consent', 'legitimate interest', 'publisher restrictions', 'jurisdiction']
                },
                {
                    id: 'tc-string-creation',
                    title: 'TC String Creation Rules',
                    text: 'A TC String may only be created by an IAB Europe TCF registered CMP using its assigned CMP ID. Vendors or third-party service providers must neither create nor alter TC Strings. A TC String with positive consent signals must not be created before clear affirmative action by a user. A TC String may be created with only legitimate interest signals providing transparency has been established.',
                    tags: ['TC String', 'creation', 'CMP', 'affirmative action', 'consent']
                },
                {
                    id: 'tc-string-scope',
                    title: 'TC String Scope — Service-Specific',
                    text: 'CMPs must operate in a service-specific or group-specific configuration. A TC String is applicable only on the site(s) or app(s) on which the CMP is running. One is created for every user on a given site/app or group. They may contain Publisher Restrictions and a Publisher TC segment. Global scope and Out-of-Band were deprecated on June 22nd 2021 and TC strings with global-scope are considered invalid since Sept 1st 2021.',
                    tags: ['service-specific', 'group-specific', 'global scope', 'deprecated', 'OOB']
                },
                {
                    id: 'tc-string-format',
                    title: 'TC String Format and Segments',
                    text: 'A TC String has 3 distinct segments joined on a dot character: The Core String (vendor transparency and consent details), Disclosed Vendors (mandatory segment listing vendors disclosed to user), and Publisher Purposes Transparency and Consent (optional). The Core String comes first. Subsequent segments may appear in any order because each includes a segment ID.',
                    tags: ['TC String', 'segments', 'Core String', 'Disclosed Vendors', 'Publisher TC', 'format']
                },
                {
                    id: 'tc-string-core-fields',
                    title: 'TC String Core Fields',
                    text: 'Core String fields stored in big-endian format: Version (6 bits), Created (36 bits epoch timestamp), LastUpdated (36 bits), CmpId (12 bits), CmpVersion (12 bits), ConsentScreen (6 bits), ConsentLanguage (12 bits ISO 639-1), VendorListVersion (12 bits), TcfPolicyVersion (6 bits), IsServiceSpecific (1 bit, must be 1), UseNonStandardTexts (1 bit), SpecialFeatureOptIns (12 bits), PurposesConsent (24 bits), PurposesLITransparency (24 bits).',
                    tags: ['Core String', 'fields', 'bits', 'encoding', 'Version', 'CmpId', 'PurposesConsent', 'big-endian']
                },
                {
                    id: 'tc-string-vendor-consent',
                    title: 'Vendor Consent and Legitimate Interest Sections',
                    text: 'The Vendor Consent Section and Vendor Legitimate Interest Section use either BitField or Range encoding. MaxVendorId (16 bits) indicates the last ID. IsRangeEncoding (1 bit) selects the scheme. BitField encodes one bit per vendor ID. Range Section uses NumEntries and RangeEntry (IsARange, StartOrOnlyVendorId, EndVendorId) to efficiently encode groups of vendor IDs.',
                    tags: ['vendor consent', 'legitimate interest', 'BitField', 'Range', 'encoding', 'MaxVendorId']
                },
                {
                    id: 'tc-string-publisher-restrictions',
                    title: 'Publisher Restrictions in TC String',
                    text: 'Publisher restrictions allow publishers to restrict vendor data processing. RestrictionType: 0 = Purpose Flatly Not Allowed (regardless of vendor declarations), 1 = Require Consent (if vendor declared LI and flexible), 2 = Require Legitimate Interest (if vendor declared consent and flexible). Vendors must always respect a 0 restriction. Purpose 1 always requires consent and cannot be flexible per Policy.',
                    tags: ['publisher restrictions', 'RestrictionType', 'consent', 'legitimate interest', 'flexible', 'Purpose 1']
                },
                {
                    id: 'tc-string-disclosed-vendors',
                    title: 'Disclosed Vendors Segment (Mandatory)',
                    text: 'The Disclosed Vendors segment records which vendors have been disclosed to a user by a CMP. This is a mandatory segment in TCF 2.3. SegmentType = 1. Uses MaxVendorId, IsRangeEncoding, and either BitField or Range encoding. Made mandatory to resolve ambiguity regarding vendors declaring only special purposes — if a vendor appears in disclosed vendors, it has been presented to the user.',
                    tags: ['Disclosed Vendors', 'mandatory', 'TCF 2.3', 'segment', 'special purposes', 'CMP']
                },
                {
                    id: 'tc-string-publisher-tc',
                    title: 'Publisher Purposes Transparency and Consent Segment',
                    text: 'Publishers may establish transparency and consent for their own data processing purposes. SegmentType = 3. Fields include PubPurposesConsent (24 bits), PubPurposesLITransparency (24 bits), NumCustomPurposes (6 bits), CustomPurposesConsent, and CustomPurposesLITransparency. Custom purposes are defined by the publisher and displayed in the CMP UI. Vendors should not rely on this segment unless in agreement with the publisher.',
                    tags: ['Publisher TC', 'custom purposes', 'publisher consent', 'SegmentType 3']
                },
                {
                    id: 'tc-string-url-macros',
                    title: 'URL-Based TC String Passing (Macros)',
                    text: 'Services called via URL use macros: &gdpr=${GDPR} (0=not apply, 1=applies) and &gdpr_consent=${GDPR_CONSENT_XXXXX} (XXXXX is numeric Vendor ID). The service making the call must replace macros with appropriate values. TC Strings must always be propagated as-is and not modified. The gdpr_pd macro has been deprecated in TCF v2.2.',
                    tags: ['URL', 'macros', 'GDPR', 'GDPR_CONSENT', 'pixel', 'redirect', 'ad tag']
                },
                {
                    id: 'tc-string-jurisdiction',
                    title: 'Jurisdiction-Specific Consent Handling',
                    text: 'Some jurisdictions do not require consent for Purpose 1 (store/access information on device). PublisherCC field represents the publisher\'s country code (ISO 3166-1 alpha-2). PurposeOneTreatment flag: 0 = Purpose 1 disclosed normally as consent, 1 = Purpose 1 was not disclosed. Vendors use these fields to determine if they have sufficient legal bases in that jurisdiction.',
                    tags: ['jurisdiction', 'PublisherCC', 'PurposeOneTreatment', 'Purpose 1', 'country code', 'ePrivacy']
                },
                {
                    id: 'tc-string-created-lastupdated',
                    title: 'Created and LastUpdated Fields',
                    text: 'The Created and LastUpdated fields have been updated to have the same value corresponding to the day-level timestamp of when the TC String was last updated. Previously they were decisecond timestamps. This change considers practical guidance from DPAs relating to evidence of consent validity and the limited relevance of the Created field for publishers to fulfill requirements of remaining users of their choices at least every 13 months.',
                    tags: ['Created', 'LastUpdated', 'timestamp', 'day-level', 'DPA', '13 months']
                },
                {
                    id: 'tc-string-li-deprecated',
                    title: 'Legitimate Interest Deprecation for Purposes 3-6',
                    text: 'With TCF v2.2, support for legitimate interest for purpose 3 (create personalised ads profile), purpose 4 (select personalised ads), purpose 5 (create personalised content profile), and purpose 6 (select personalised content) has been deprecated. Bits 2 to 5 in PurposesLITransparency are required to be set to 0.',
                    tags: ['legitimate interest', 'deprecated', 'purpose 3', 'purpose 4', 'purpose 5', 'purpose 6', 'TCF v2.2']
                },
                {
                    id: 'tc-string-policy-version',
                    title: 'Managing TC String and Policy Versions',
                    text: 'TCF v2.2 introduced policy version 4. Post 30 September 2023, a TC String with policy version less than 4 is deemed invalid. TC Strings with policy version 3 created until 30 September 2023 may still be returned by CMP API. Post 30 September 2020, v1.x strings were considered invalid. If both v1.x and v2.0 strings are present, CMP should remove the v1.x string.',
                    tags: ['policy version', 'TcfPolicyVersion', 'invalid', 'version 4', 'migration']
                }
            ]
        },
        {
            id: 'techlab-gvl',
            title: 'Global Vendor List (GVL)',
            url: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md',
            sections: [
                {
                    id: 'gvl-overview',
                    title: 'Global Vendor List Overview',
                    text: 'The Global Vendor List (GVL) is a technical document that CMPs download from a domain managed by IAB Europe. It lists all registered and approved Vendors, standard Purposes, Special Purposes, Features, Special Features, Stacks, and Categories of data. The information is used for determining what legal disclosures must be made to the user. Current version: https://vendor-list.consensu.org/v3/vendor-list.json',
                    tags: ['GVL', 'Global Vendor List', 'vendors', 'purposes', 'features', 'IAB Europe']
                },
                {
                    id: 'gvl-contents',
                    title: 'GVL Contents',
                    text: 'The GVL contains: GVL Specification Version, Vendor List version, TCF Policy Version, Last Updated Date, list of Purposes, Special Purposes, Features, Special Features, Stacks, Categories of data. Each vendor entry includes: numeric ID, name, purposes (consent), legIntPurposes, flexiblePurposes, specialPurposes, features, specialFeatures, dataDeclaration, dataRetention, urls (privacy/legIntClaim per language), deletedDate, overflow httpGetLimit.',
                    tags: ['GVL', 'contents', 'vendor entry', 'purposes', 'legIntPurposes', 'flexiblePurposes', 'dataRetention']
                },
                {
                    id: 'gvl-vendor-fields-planet49',
                    title: 'Vendor Device Storage Fields (Planet49)',
                    text: 'Vendor fields for Planet49 ruling compliance: usesCookies (boolean, whether vendor uses cookie storage), cookieMaxAgeSeconds (integer, longest potential duration; null when usesCookies=false; negative/0 means session), cookieRefresh (boolean, whether cookies are refreshed after initial set), usesNonCookieAccess (boolean, use of localStorage, indexDB, mobile ad IDs etc.), deviceStorageDisclosureUrl (secure URL to vendor-hosted JSON with detailed disclosures).',
                    tags: ['Planet49', 'usesCookies', 'cookieMaxAgeSeconds', 'cookieRefresh', 'usesNonCookieAccess', 'deviceStorageDisclosureUrl', 'device storage']
                },
                {
                    id: 'gvl-access-caching',
                    title: 'GVL Access and Caching Requirements',
                    text: 'All requests for the GVL must be server-side (no client-side CORS). Server-side applications must cache using max-age from cache-control headers. CMPs must not load GVL directly from vendor-list.consensu.org on client-side — must load via CMP server and pass to client. Vendors must request compressed versions (Accept-Encoding: gzip, deflate, br). Volume is monitored and non-compliant entities will be blocked.',
                    tags: ['GVL', 'caching', 'server-side', 'cache-control', 'max-age', 'compressed', 'Accept-Encoding']
                },
                {
                    id: 'gvl-updates',
                    title: 'GVL Update Frequency',
                    text: 'Changes to the Global Vendor List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time. Previous versions available at: https://vendor-list.consensu.org/v3/archives/vendor-list-v{version}.json. Purpose translations available at: https://vendor-list.consensu.org/v3/purposes-{language}.json.',
                    tags: ['GVL', 'update', 'weekly', 'Thursday', 'archives', 'translations']
                },
                {
                    id: 'gvl-cmps-usage',
                    title: 'CMPs Using the GVL',
                    text: 'CMPs must use the latest available GVL version whenever the interface is surfaced for transparency or consent. This applies to first-time and renewal interactions. Exceptions: penultimate version may be used for caching delays; last cached version for lack of connectivity (must update when restored). CMP must compare latest GVL with archived version in TC String to determine if resurfacing is needed.',
                    tags: ['CMP', 'GVL', 'latest version', 'resurfacing', 'renewal', 'caching']
                },
                {
                    id: 'gvl-vendors-usage',
                    title: 'Vendors Using the GVL',
                    text: 'Vendors must use the version of the GVL encoded in the TC String to: determine if they have the necessary legal bases, and determine if any vendor they pass personal data to also has necessary legal bases. Vendor server-side applications must cache per cache-control headers. GVL resources must be requested with Accept-Encoding headers.',
                    tags: ['vendor', 'GVL', 'legal bases', 'downstream', 'cache', 'TC String version']
                },
                {
                    id: 'gvl-policy-updates',
                    title: 'GVL and TCF Policy Updates',
                    text: 'When TCF Policy changes require re-establishing legal bases, a CMP must discard the current TC String and resurface the UI for new disclosures and consent without migrating old values. CMPs compare TcfPolicyVersion in TC String with TcfPolicyVersion in latest GVL. Policy changes are infrequent but must be handled under the timeline provided by the Managing Organisation.',
                    tags: ['policy update', 'TcfPolicyVersion', 'resurface', 'discard', 'migration']
                }
            ]
        },
        {
            id: 'techlab-gcl',
            title: 'Global CMP List (GCL)',
            url: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md',
            sections: [
                {
                    id: 'gcl-overview',
                    title: 'Global CMP List Overview',
                    text: 'The Global CMP List (GCL) is a JSON document listing all CMPs registered with TCF. Used by vendors to determine which CMPs are compliant and active, to ascertain whether a CMP ID in a consent string is valid. CMPs with deletedDate set must be considered invalid and TC Strings from them must be discarded immediately. URL: https://cmplist.consensu.org/v2/cmp-list.json.',
                    tags: ['GCL', 'Global CMP List', 'CMP', 'registration', 'deletedDate', 'validation']
                },
                {
                    id: 'gcl-contents',
                    title: 'GCL Contents and Format',
                    text: 'The GCL contains: Last Updated Date, list of CMPs with numeric ID, name, isCommercial boolean, environments array (web, native app mobile, native app CTV, other), and optional deletedDate. Updated weekly at 5:00 PM CET on Thursdays. All requests must honour cache-control headers. Must request compressed version with Accept-Encoding headers.',
                    tags: ['GCL', 'contents', 'isCommercial', 'environments', 'weekly', 'cache-control']
                }
            ]
        },
        {
            id: 'techlab-implementation-guidelines',
            title: 'TCF Implementation Guidelines',
            url: 'https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/TCF-Implementation-Guidelines.md',
            sections: [
                {
                    id: 'impl-publisher-cmp',
                    title: 'Publisher CMP Implementation',
                    text: 'A publisher may implement a CMP in two ways: 1) Build an in-house CMP meeting IAB Europe technical requirements and register at register.consensu.org/cmp. 2) Outsource to a registered CMP from the official list at iabeurope.eu/cmp-list. Publishers can restrict vendors using publisher restrictions in the TC String. Publishers can ask partners to register on the GVL.',
                    tags: ['publisher', 'CMP', 'build', 'outsource', 'register', 'implementation']
                },
                {
                    id: 'impl-publisher-controls',
                    title: 'Publisher Controls and Restrictions',
                    text: 'Starting with TC String v2, publishers can define restrictions. When a vendor declares flexible legal basis for a purpose, the publisher can change the default. For instance, if a vendor declares flexible with default legitimate interest, the publisher can restrict to require consent. The Global Vendor List is maintained at vendor-list.consensu.org/v2/vendor-list.json.',
                    tags: ['publisher controls', 'restrictions', 'flexible', 'legal basis', 'consent', 'legitimate interest']
                },
                {
                    id: 'impl-vendor-find-tc',
                    title: 'How Vendors Find the TC String',
                    text: 'Server-side (openRTB): read from TC data payload per openRTB specs. Client-side (redirect, prebid): use TCF API through CMP — __tcfapi method from top parent page, or postMessage from iframes. Use addEventListener callback to retrieve the most up-to-date TC data object. If CMP is not present or fails to respond, vendors should assume no consent and no LI transparency in GDPR contexts.',
                    tags: ['vendor', 'TC String', 'openRTB', 'client-side', 'server-side', '__tcfapi', 'addEventListener']
                },
                {
                    id: 'impl-vendor-send-tc',
                    title: 'How Vendors Send the TC String',
                    text: 'Server-side: use openRTB specs. Client-side: validate TC data by checking cmpStatus is loaded and eventStatus is tcloaded or useractioncomplete. These statuses confirm the CMP has loaded and user has engaged. Then pass TC String using URL-passing macro solution (${GDPR} and ${GDPR_CONSENT_XXXXX}).',
                    tags: ['vendor', 'send', 'openRTB', 'cmpStatus', 'eventStatus', 'validate', 'macros']
                },
                {
                    id: 'impl-vendor-legal-basis',
                    title: 'Determining Legal Bases from TC String',
                    text: 'Vendors must: 1) Evaluate publisher restrictions first — check if publisher disallowed processing or restricted legal basis. 2) Apply default legal basis if no restriction. 3) If restriction present and vendor declared flexible, apply publisher-defined basis. 4) Check purpose legal basis signal AND vendor legal basis signal — both must be positive. Only then may the vendor process for that purpose.',
                    tags: ['legal basis', 'vendor', 'publisher restrictions', 'consent', 'legitimate interest', 'flexible', 'purpose']
                },
                {
                    id: 'impl-vendor-data-transmission',
                    title: 'Determining if Data May Be Transmitted',
                    text: 'A vendor may choose not to transmit data to another vendor for any reason, but must not transmit without justified basis for relying on that vendor\'s legal basis. If a vendor has personal data and no legal basis, it should cease collection and storage and refrain from passing data on, even if receiving parties have legal basis.',
                    tags: ['data transmission', 'vendor', 'legal basis', 'personal data', 'downstream', 'cease']
                },
                {
                    id: 'impl-vendor-no-string',
                    title: 'What If No TC String Is Received',
                    text: 'If transparency or consent information is unavailable in situations where TCF applies, the vendor may not be able to process the user\'s data. Vendors should assume no consent and no legitimate interest transparency established when GDPR applies and no TC String is received.',
                    tags: ['no TC String', 'unavailable', 'no consent', 'vendor', 'GDPR applies']
                },
                {
                    id: 'impl-cmp-collecting',
                    title: 'CMP: Collecting Consent from Users',
                    text: 'The TCF defines standard purposes and features vendors can act on. Vendors provide up-to-date information on purposes and legal bases in the GVL. For a given publisher, a CMP must collect user consent for all purposes and vendors declared/chosen by the publisher. Requirements on presentation, collection, and storage are in the TCF Policy.',
                    tags: ['CMP', 'collecting consent', 'purposes', 'vendors', 'publisher', 'GVL']
                },
                {
                    id: 'impl-cmp-sharing',
                    title: 'CMP: Sharing Consent with Vendors',
                    text: 'CMPs must: 1) Collect consent compliant with TCF Technical Specifications and Policy. 2) Generate an encoded TC String containing user preferences. 3) Share the TC String with vendors through available APIs. The TCF defines standard APIs and formats for communication between CMPs and vendors embedded on websites or in mobile applications.',
                    tags: ['CMP', 'sharing', 'TC String', 'API', 'vendors', 'encoding']
                },
                {
                    id: 'impl-cmp-storing',
                    title: 'CMP: Storing Consent',
                    text: 'Storage mechanism is up to the CMP including non-cookie methods. Common methods: Cookies (easy, fast, but short-lived and may be deleted), Server-side storage (long-lived, proof of consent, but can be slow), Mobile internal storage/shared preferences (easy, fast, but cannot be shared across apps). Consider TC String size if publisher restrictions are exhaustive.',
                    tags: ['CMP', 'storage', 'cookies', 'server-side', 'SharedPreferences', 'mobile', 'non-cookie']
                },
                {
                    id: 'impl-cmp-pub-restrictions-encoding',
                    title: 'Encoding Publisher Restrictions Efficiently',
                    text: 'To reduce TC String size: no need to store restrictions for vendors not disclosed to user (both consent and LI can be left undefined). No need for restrictions on deselected vendors (no consent and no LI already means vendor cannot process). Purpose restrictions only needed if vendor was disclosed and registered for that purpose. Legal basis restrictions only if vendor declared flexibility for that purpose.',
                    tags: ['publisher restrictions', 'encoding', 'optimization', 'TC String size', 'flexible']
                },
                {
                    id: 'impl-withdrawal',
                    title: 'Withdrawal of Consent',
                    text: 'Vendors must support withdrawal of consent. Since consent choices are transmitted on each transaction, the publisher or CMP should provide a mechanism for users to withdraw consent. This may be as simple as an easily accessible link/setting or floating icon to allow users to withdraw consent as easily as it was to give it.',
                    tags: ['withdrawal', 'consent', 'right to withdraw', 'user rights', 'GDPR']
                },
                {
                    id: 'impl-ad-tags',
                    title: 'How Ad Tags Work with TCF',
                    text: 'Tag-based demand uses macros for TC String passing. Recommended macros: ${GDPR} (1=applies, 0=not apply, unset=unknown) and ${GDPR_CONSENT_XXXX} (encoded TC String where XXXX is numeric Vendor ID of receiving vendor). The vendor ID allows the calling service to verify legal basis before forwarding personal data. Values align with IAB OpenRTB GDPR Advisory.',
                    tags: ['ad tags', 'macros', 'GDPR', 'GDPR_CONSENT', 'OpenRTB', 'vendor ID', 'creative']
                },
                {
                    id: 'impl-multiple-signals',
                    title: 'Handling Multiple TC Strings',
                    text: 'Sometimes two or more TC Strings contain different preferences for different vendors. The most recent signal received for a vendor should be understood as the current preference despite previous signals. For example, if consent was given for vendor 3 but later rejected, the rejection is the valid signal.',
                    tags: ['multiple signals', 'TC String', 'most recent', 'conflict resolution', 'preference']
                },
                {
                    id: 'impl-gdpr-consent-macro',
                    title: 'GDPR_CONSENT_XXXX Macro Clarification',
                    text: 'The numeric Vendor ID in ${GDPR_CONSENT_XXXX} must be included because personal data (IP addresses, cookies) may be passed with the request. In piggybacking scenarios: Vendor 789 (receiving) gives URL with ${GDPR_CONSENT_789} to Vendor 456 (intermediary), who gives URL with ${GDPR_CONSENT_456} to Vendor 123 (initiating). Each checks the next vendor\'s legal basis before forwarding.',
                    tags: ['GDPR_CONSENT', 'macro', 'vendor ID', 'piggybacking', 'personal data', 'forwarding']
                }
            ]
        }
    ]
};
