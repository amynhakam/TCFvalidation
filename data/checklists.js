window.TCF_CHECKLISTS = {
    version: "1.0",

    layerTypes: [
        {
            id: "initial-layer",
            name: "Initial Layer (First Layer)",
            description: "The first screen users see — the consent banner/modal. Must contain required disclosures and CTAs.",
            items: [
                {
                    id: "il-1",
                    text: "Banner/modal covers content prominently",
                    description: "The Framework UI is displayed in a modal or banner that covers all or substantially all of the content, preventing interaction until acted upon.",
                    severity: "critical",
                    policyRef: "appB-C-a",
                    controlRef: "cmp-pol-14",
                    aiPromptHint: "Check if a modal/banner overlay is covering the page content"
                },
                {
                    id: "il-2",
                    text: "Device storage/access information present",
                    description: "Information about storing and/or accessing information on the user's device is displayed.",
                    severity: "critical",
                    policyRef: "appB-C-b-I",
                    controlRef: "cmp-pol-4",
                    aiPromptHint: "Look for text about storing or accessing information on the device, cookies, or similar storage"
                },
                {
                    id: "il-3",
                    text: "Personal data processing information present",
                    description: "Information about personal data being processed and the nature of the data is displayed.",
                    severity: "critical",
                    policyRef: "appB-C-b-II",
                    controlRef: "cmp-pol-5",
                    aiPromptHint: "Look for text about personal data processing or the type of data collected"
                },
                {
                    id: "il-4",
                    text: "Number of vendors and link to vendor list",
                    description: "The number of third-party Vendors is shown along with a link to the full list of named third parties.",
                    severity: "critical",
                    policyRef: "appB-C-b-III",
                    controlRef: "cmp-pol-2",
                    aiPromptHint: "Look for a number of partners/vendors and a link or button to see the full vendor list"
                },
                {
                    id: "il-5",
                    text: "Purposes listed using standard names or stacks",
                    description: "Purposes are displayed using at least the standardised Purpose names and/or Stack names from Appendix A.",
                    severity: "critical",
                    policyRef: "appB-C-b-IV",
                    controlRef: "cmp-pol-1",
                    aiPromptHint: "Look for purpose names like 'Store and/or access information', 'Select personalised advertising', etc., or stack descriptions"
                },
                {
                    id: "il-6",
                    text: "Special Features information present",
                    description: "Information about Special Features used by Vendors (e.g. precise geolocation, device scanning) is displayed.",
                    severity: "critical",
                    policyRef: "appB-C-b-V",
                    controlRef: "cmp-pol-6",
                    aiPromptHint: "Look for mentions of precise geolocation or device scanning/fingerprinting"
                },
                {
                    id: "il-7",
                    text: "Consent scope information",
                    description: "Information about the scope of consent (service-specific or group-specific) is present.",
                    severity: "critical",
                    policyRef: "appB-C-b-VII",
                    controlRef: "cmp-pol-7",
                    aiPromptHint: "Look for text indicating whether consent applies to this site/app only or a group of sites/apps"
                },
                {
                    id: "il-8",
                    text: "Consent withdrawal information and resurface method",
                    description: "Information that consent can be withdrawn at any time and how to resurface the UI to do so.",
                    severity: "critical",
                    policyRef: "appB-C-b-VIII",
                    controlRef: "cmp-pol-8",
                    aiPromptHint: "Look for text about withdrawing consent and instructions on how to change preferences later"
                },
                {
                    id: "il-9",
                    text: "Accept CTA button present",
                    description: "A call-to-action button for accepting consent (e.g. 'Accept', 'Accept & Continue') is visible.",
                    severity: "critical",
                    policyRef: "appB-C-b-X",
                    controlRef: "cmp-pol-9",
                    aiPromptHint: "Look for an Accept button or similar affirmative action button"
                },
                {
                    id: "il-10",
                    text: "Customize/Settings CTA present",
                    description: "A call-to-action for customizing choices (e.g. 'Advanced Settings', 'Manage Preferences') is visible.",
                    severity: "critical",
                    policyRef: "appB-C-b-XI",
                    controlRef: "cmp-pol-10",
                    aiPromptHint: "Look for a Settings, Customize, or Manage Preferences button/link"
                },
                {
                    id: "il-11",
                    text: "CTAs have proper contrast and matching text treatment",
                    description: "All CTAs are visible, legible, not appearing disabled, have matching font/size/style, and minimum 5:1 contrast ratio.",
                    severity: "critical",
                    policyRef: "appB-C-g",
                    controlRef: "cmp-pol-11",
                    aiPromptHint: "Check if buttons have similar visual weight, readable text, and adequate contrast. Look for any button that appears grayed out or hard to read"
                },
                {
                    id: "il-12",
                    text: "Legitimate interest information (recommended)",
                    description: "Information about legitimate interest processing, right to object, and link to LI settings. Recommended but not strictly required.",
                    severity: "recommended",
                    policyRef: "appB-C-b-IX",
                    controlRef: "cmp-pol-12",
                    aiPromptHint: "Look for mentions of legitimate interest and a way to manage it"
                },
                {
                    id: "il-13",
                    text: "Consequences information (recommended)",
                    description: "Information about consequences of consenting or not consenting. Recommended but not strictly required.",
                    severity: "recommended",
                    policyRef: "appB-C-b-VI",
                    controlRef: "cmp-pol-13",
                    aiPromptHint: "Look for text explaining what happens if consent is given or refused"
                }
            ]
        },
        {
            id: "secondary-layer",
            name: "Secondary Layer (Purpose/Vendor Details)",
            description: "The detailed settings screen where users can make granular consent choices per purpose and vendor.",
            items: [
                {
                    id: "sl-1",
                    text: "Named vendor list with privacy policy links",
                    description: "Lists named Vendors with links to each Vendor's privacy policy, their Purposes, Legal Bases, retention periods, Features, Special Features, and data categories.",
                    severity: "critical",
                    policyRef: "appB-C-c-I",
                    controlRef: "cmp-sec-4",
                    aiPromptHint: "Look for a list of vendor names with links to their privacy policies"
                },
                {
                    id: "sl-2",
                    text: "Full purpose details with user-friendly text",
                    description: "Purposes, Special Purposes, Features, and Special Features shown with standard name, full user-friendly text, illustrations, and number of Vendors for each.",
                    severity: "critical",
                    policyRef: "appB-C-c-II",
                    controlRef: "cmp-sec-5",
                    aiPromptHint: "Look for purpose names with expanded descriptions and vendor counts"
                },
                {
                    id: "sl-3",
                    text: "Granular per-purpose consent toggles",
                    description: "Individual toggle/checkbox controls for each Purpose allowing granular consent choices.",
                    severity: "critical",
                    policyRef: "appB-C-c-III",
                    controlRef: "cmp-sec-1",
                    aiPromptHint: "Look for individual on/off toggles or checkboxes next to each purpose"
                },
                {
                    id: "sl-4",
                    text: "Granular per-vendor consent toggles",
                    description: "Individual toggle/checkbox controls for each Vendor allowing granular consent choices.",
                    severity: "critical",
                    policyRef: "appB-C-c-III",
                    controlRef: "cmp-sec-2",
                    aiPromptHint: "Look for individual on/off toggles or checkboxes next to each vendor"
                },
                {
                    id: "sl-5",
                    text: "Special Feature opt-in controls",
                    description: "Granular opt-in controls for each Special Feature.",
                    severity: "critical",
                    policyRef: "appB-C-c-IV",
                    controlRef: "cmp-sec-3",
                    aiPromptHint: "Look for toggles/checkboxes for special features like geolocation or device scanning"
                },
                {
                    id: "sl-6",
                    text: "Legitimate interest distinguished from consent",
                    description: "LI processing is visually distinguished from consent, with a link to the LI layer for right-to-object controls.",
                    severity: "critical",
                    policyRef: "appB-C-c-V",
                    controlRef: "cmp-sec-6",
                    aiPromptHint: "Look for separate sections or labels distinguishing consent from legitimate interest"
                },
                {
                    id: "sl-7",
                    text: "Default state is OFF for all toggles",
                    description: "When first accessing granular controls, all consent/opt-in toggles default to 'off' or 'no consent'.",
                    severity: "critical",
                    policyRef: "appB-C-d",
                    controlRef: "cmp-sec-8",
                    aiPromptHint: "Check if all toggles appear in the OFF/unchecked position by default"
                },
                {
                    id: "sl-8",
                    text: "Storage duration information",
                    description: "Vendors' maximum device storage duration and whether it may be refreshed.",
                    severity: "important",
                    policyRef: "appB-C-c-VII",
                    controlRef: "cmp-sec-7",
                    aiPromptHint: "Look for information about cookie/storage duration for each vendor"
                }
            ]
        },
        {
            id: "li-layer",
            name: "Legitimate Interest Layer",
            description: "The layer where users can exercise their right to object to processing based on legitimate interest.",
            items: [
                {
                    id: "li-1",
                    text: "Personal data processing information",
                    description: "Information about the fact that personal data is processed and the nature of the data.",
                    severity: "critical",
                    policyRef: "appB-D-c-I",
                    controlRef: "cmp-li-1",
                    aiPromptHint: "Look for text about personal data being processed under legitimate interest"
                },
                {
                    id: "li-2",
                    text: "Scope information for LI processing",
                    description: "Information about the scope of LI processing and any objection (service-specific or group-specific).",
                    severity: "critical",
                    policyRef: "appB-D-c-II",
                    controlRef: "cmp-li-2",
                    aiPromptHint: "Look for scope information about legitimate interest processing"
                },
                {
                    id: "li-3",
                    text: "Object controls available",
                    description: "Controls to object to processing on the basis of legitimate interest are present and functional.",
                    severity: "critical",
                    policyRef: "appB-D-c-III",
                    controlRef: "cmp-li-3",
                    aiPromptHint: "Look for toggles or buttons to object to legitimate interest processing"
                },
                {
                    id: "li-4",
                    text: "Purpose details with user-friendly text",
                    description: "Purposes and Special Purposes shown with standard name, full user-friendly text, illustrations, and number of Vendors per Purpose under LI.",
                    severity: "critical",
                    policyRef: "appB-D-c-IV",
                    controlRef: "cmp-li-6",
                    aiPromptHint: "Look for purpose names and descriptions in the legitimate interest section"
                },
                {
                    id: "li-5",
                    text: "Per-vendor and per-purpose object controls",
                    description: "Ability to object per Vendor and per Purpose separately.",
                    severity: "critical",
                    policyRef: "appB-D-c-V",
                    controlRef: "cmp-li-4",
                    aiPromptHint: "Look for individual object toggles for each vendor and purpose under legitimate interest"
                },
                {
                    id: "li-6",
                    text: "Vendor details with privacy policy and LI explanation links",
                    description: "Named Vendors with privacy policy links, Purposes, Legal Bases, LI explanation links, retention periods, Features, Special Features, and data categories.",
                    severity: "critical",
                    policyRef: "appB-D-c-VI",
                    controlRef: "cmp-li-5",
                    aiPromptHint: "Look for vendor names with links to privacy policies and legitimate interest explanations"
                }
            ]
        },
        {
            id: "resurface-ui",
            name: "Resurface / Preference Management",
            description: "How users access consent settings after initial consent, and how the UI is re-presented.",
            items: [
                {
                    id: "ru-1",
                    text: "Easy access to resurface consent UI",
                    description: "An easily accessible link or call to action (e.g. in top-level settings) to resurface the consent UI.",
                    severity: "critical",
                    policyRef: "appB-C-f",
                    controlRef: "cmp-res-3",
                    aiPromptHint: "Look for a privacy/consent settings link in the app menu or settings area"
                },
                {
                    id: "ru-2",
                    text: "Previous choices correctly pre-populated",
                    description: "When resurfacing, the user's previous consent choices are correctly reflected in the UI state.",
                    severity: "critical",
                    policyRef: "ch2-5-3",
                    controlRef: "cmp-res-2",
                    aiPromptHint: "Check if toggles reflect the user's previously saved consent state"
                },
                {
                    id: "ru-3",
                    text: "Withdraw All option available if Accept All was provided",
                    description: "If an 'Accept All' CTA was provided initially, a corresponding 'Withdraw All' or 'Decline All' must be available on resurface.",
                    severity: "critical",
                    policyRef: "appB-C-f",
                    controlRef: "cmp-res-3",
                    aiPromptHint: "Look for a Decline All or Withdraw All button alongside the Accept All option"
                }
            ]
        },
        {
            id: "tc-string",
            name: "TC String Validation",
            description: "Validating the generated TC String against expected values using the IAB GPP decoder.",
            items: [
                {
                    id: "tc-1",
                    text: "TC String is valid and parseable",
                    description: "The TC String can be decoded by the IAB GPP Encoder/Decoder tool without errors.",
                    severity: "critical",
                    policyRef: "ch2-4-1",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Check if a decoded TC String is shown with all fields populated"
                },
                {
                    id: "tc-2",
                    text: "Purpose Consents match user selections",
                    description: "Purpose Consents in the decoded TC String match what the user selected in the CMP UI.",
                    severity: "critical",
                    policyRef: "ch2-5-3",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Compare highlighted purpose consents with what the user selected"
                },
                {
                    id: "tc-3",
                    text: "Vendor Consents match user selections",
                    description: "Vendor Consents in the decoded TC String match what the user selected in the CMP UI.",
                    severity: "critical",
                    policyRef: "ch2-5-3",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Check the Vendor Consents Included/Available sections against user selections"
                },
                {
                    id: "tc-4",
                    text: "Vendors Disclosed includes all CMP vendors",
                    description: "The Vendors Disclosed section includes all vendors that were shown to the user in the CMP.",
                    severity: "critical",
                    policyRef: "ch2-4-3",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Check that the Vendors Disclosed Included section has all vendors from the CMP"
                },
                {
                    id: "tc-5",
                    text: "Legitimate Interests match consent state",
                    description: "Vendor Legitimate Interests in the decoded TC String correctly reflect the consent state (populated when accepted, empty when declined).",
                    severity: "critical",
                    policyRef: "ch2-5-3",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Check that Legitimate Interest section matches the overall consent decision"
                },
                {
                    id: "tc-6",
                    text: "Consent Screen value is correct",
                    description: "Consent Screen = 0 indicates consent was provided on the initial layer of the CMP.",
                    severity: "important",
                    policyRef: "ch2-4-4",
                    controlRef: "cmp-tech-1",
                    aiPromptHint: "Check the Consent Screen field value in the decoded TC String"
                }
            ]
        }
    ],

    // Get checklist by layer type ID
    getChecklist: function(layerTypeId) {
        return this.layerTypes.find(lt => lt.id === layerTypeId) || null;
    },

    // Get all checklist items across all layers
    getAllItems: function() {
        return this.layerTypes.flatMap(lt => lt.items.map(item => ({ ...item, layerType: lt.id, layerName: lt.name })));
    },

    // Get items by severity
    getItemsBySeverity: function(severity) {
        return this.getAllItems().filter(item => item.severity === severity);
    }
};
