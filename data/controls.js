window.TCF_CONTROLS = {
    version: "TCF v2.2",
    enforcementProcedures: [
        {
            id: "enforce-1",
            number: 1,
            title: "Tampering of TC Strings (CMPs & Vendors)",
            appliesTo: ["cmp", "vendor"],
            severity: "critical",
            steps: [
                "Formal suspension notice issued via email",
                "Immediate suspension from the GVL or CMP list for a minimum of 4 weeks and until the issue is resolved",
                "Public notification of non-compliance to the TCF Community (facts and reasoning)",
                "On the 4th occurrence within 12 months: permanent suspension from the GVL or CMP list"
            ],
            tags: ["enforcement", "tc-string", "tampering", "suspension"]
        },
        {
            id: "enforce-2",
            number: 2,
            title: "Other Material Breach of TCF Policies",
            appliesTo: ["cmp", "vendor"],
            severity: "critical",
            steps: [
                "Formal suspension warning via email",
                "Remediation period: CMPs: 10 business days; Vendors: 20 business days",
                "If unresolved after deadline: Suspension notice via email",
                "Suspension from the GVL or CMP list until resolved",
                "On the 4th occurrence within 12 months: Immediate suspension for a minimum of 2 weeks, until all issues are resolved"
            ],
            tags: ["enforcement", "material-breach", "remediation", "suspension"]
        },
        {
            id: "enforce-3",
            number: 3,
            title: "Inaccurate or Incomplete GVL Registration Information",
            appliesTo: ["vendor"],
            severity: "important",
            steps: [
                "Vendor is notified of deficiencies",
                "Vendor must correct information within the required remediation window",
                "Failure to remediate may result in suspension from the GVL"
            ],
            tags: ["enforcement", "gvl", "registration", "accuracy"]
        }
    ],
    cmpChecklist: {
        id: "cmp-checklist",
        title: "CMP Checklist",
        appliesTo: ["cmp"],
        categories: [
            {
                id: "cmp-technical",
                title: "Technical Checks",
                items: [
                    {
                        id: "cmp-tech-1",
                        text: "Proper TC String generation",
                        description: "CMP generates valid TC Strings according to the IAB TCF Specifications. Strings must correctly encode all purpose consents, vendor consents, legitimate interests, vendors disclosed, and publisher restrictions.",
                        severity: "critical",
                        policyRefs: ["ch2-4-1", "ch2-4-3", "ch2-4-4", "ch2-5-3"],
                        playbookRefs: ["step-c", "step-j"],
                        tags: ["tc-string", "generation", "encoding"]
                    },
                    {
                        id: "cmp-tech-2",
                        text: "Accurate vendor signal propagation",
                        description: "CMP accurately propagates vendor signals, ensuring Legal Basis status is correctly communicated to all vendors. Signals must not be extended, modified, or supplemented beyond what the Specifications allow.",
                        severity: "critical",
                        policyRefs: ["ch2-4-3", "ch2-5-2", "ch2-5-8"],
                        playbookRefs: ["step-f", "step-m"],
                        tags: ["signal", "vendor", "propagation"]
                    },
                    {
                        id: "cmp-tech-3",
                        text: "Valid consent signaling across all layers",
                        description: "Consent signals correctly reflect user choices made on both the Initial Layer (accept/decline all) and Secondary Layers (granular purpose and vendor toggles). Changes on any layer must be reflected in the TC String.",
                        severity: "critical",
                        policyRefs: ["ch2-5-3", "ch2-5-4", "ch2-5-5"],
                        playbookRefs: ["step-b", "step-g", "step-h", "step-n", "step-o"],
                        tags: ["signal", "consent", "layers", "granular"]
                    }
                ]
            },
            {
                id: "cmp-policy-initial",
                title: "Policy Checks — Initial Layer",
                items: [
                    {
                        id: "cmp-pol-1",
                        text: "Clear purpose descriptions",
                        description: "Initial Layer displays the list of distinct and separate Purposes using at least the standardised names and/or Stack names as defined in Appendix A.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-IV", "appB-B-b"],
                        tags: ["ui", "initial-layer", "purposes", "stacks"]
                    },
                    {
                        id: "cmp-pol-2",
                        text: "Visibility of vendor list access",
                        description: "Initial Layer includes the number of third-party Vendors and a link to the list of named third parties.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-III"],
                        tags: ["ui", "initial-layer", "vendor-count", "vendor-list"]
                    },
                    {
                        id: "cmp-pol-3",
                        text: "No pre-selected consents",
                        description: "When a user accesses granular consent controls, the default choice must be 'no consent', 'no opt-in' or 'off'. No purposes or vendors may be pre-selected.",
                        severity: "critical",
                        policyRefs: ["appB-C-d"],
                        tags: ["ui", "default-off", "no-pre-selection", "granular"]
                    },
                    {
                        id: "cmp-pol-4",
                        text: "Device storage/access information present",
                        description: "Initial Layer includes information about the fact that information is stored on and/or accessed from the user's device.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-I"],
                        tags: ["ui", "initial-layer", "device-storage"]
                    },
                    {
                        id: "cmp-pol-5",
                        text: "Personal data processing information present",
                        description: "Initial Layer includes information about the fact that personal data is processed and the nature of the personal data processed.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-II"],
                        tags: ["ui", "initial-layer", "personal-data"]
                    },
                    {
                        id: "cmp-pol-6",
                        text: "Special Features information present",
                        description: "Initial Layer includes information about the Special Features used by the Vendors when processing data.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-V"],
                        tags: ["ui", "initial-layer", "special-features"]
                    },
                    {
                        id: "cmp-pol-7",
                        text: "Consent scope information present",
                        description: "Initial Layer includes information about the scope of the consent choice (service-specific or group-specific).",
                        severity: "critical",
                        policyRefs: ["appB-C-b-VII"],
                        tags: ["ui", "initial-layer", "consent-scope"]
                    },
                    {
                        id: "cmp-pol-8",
                        text: "Consent withdrawal information present",
                        description: "Initial Layer includes information that the user can withdraw consent at any time and how to resurface the UI to do so.",
                        severity: "critical",
                        policyRefs: ["appB-C-b-VIII"],
                        tags: ["ui", "initial-layer", "consent-withdrawal", "resurface"]
                    },
                    {
                        id: "cmp-pol-9",
                        text: "Accept CTA present",
                        description: "Initial Layer includes a call to action for the user to express their consent (e.g. 'Accept', 'Accept & Continue').",
                        severity: "critical",
                        policyRefs: ["appB-C-b-X"],
                        tags: ["ui", "initial-layer", "cta", "accept"]
                    },
                    {
                        id: "cmp-pol-10",
                        text: "Customize CTA present",
                        description: "Initial Layer includes a call to action for the user to customise their choices (e.g. 'Advanced Settings', 'Customise Choices').",
                        severity: "critical",
                        policyRefs: ["appB-C-b-XI"],
                        tags: ["ui", "initial-layer", "cta", "customize"]
                    },
                    {
                        id: "cmp-pol-11",
                        text: "CTA contrast and text treatment",
                        description: "CTAs must not be invisible, illegible, or appear disabled. They must have matching text treatment (font, font size, font style) and a minimum contrast ratio of 5:1.",
                        severity: "critical",
                        policyRefs: ["appB-C-g"],
                        tags: ["ui", "cta", "contrast-ratio", "accessibility"]
                    },
                    {
                        id: "cmp-pol-12",
                        text: "Legitimate interest information (should)",
                        description: "Initial Layer should include information that some Vendors process data on legitimate interest basis, the user has a right to object, and a link to the LI layer.",
                        severity: "important",
                        policyRefs: ["appB-C-b-IX"],
                        tags: ["ui", "initial-layer", "legitimate-interest"]
                    },
                    {
                        id: "cmp-pol-13",
                        text: "Consequences information (should)",
                        description: "Initial Layer should include information about the consequences of consenting or not consenting.",
                        severity: "advisory",
                        policyRefs: ["appB-C-b-VI"],
                        tags: ["ui", "initial-layer", "consequences"]
                    },
                    {
                        id: "cmp-pol-14",
                        text: "Modal/banner covers content",
                        description: "The Framework UI must be displayed prominently and separately in a modal or banner that covers all or substantially all of the content.",
                        severity: "critical",
                        policyRefs: ["appB-C-a"],
                        tags: ["ui", "initial-layer", "modal", "prominent"]
                    }
                ]
            },
            {
                id: "cmp-policy-secondary",
                title: "Policy Checks — Secondary Layers",
                items: [
                    {
                        id: "cmp-sec-1",
                        text: "Granular per-purpose consent controls",
                        description: "Secondary layer allows granular and specific consent choices with respect to each Purpose.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-III"],
                        playbookRefs: ["step-g", "step-n"],
                        tags: ["ui", "secondary-layer", "granular", "purpose"]
                    },
                    {
                        id: "cmp-sec-2",
                        text: "Granular per-vendor consent controls",
                        description: "Secondary layer allows granular and specific consent choices with respect to each Vendor.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-III"],
                        playbookRefs: ["step-g", "step-n"],
                        tags: ["ui", "secondary-layer", "granular", "vendor"]
                    },
                    {
                        id: "cmp-sec-3",
                        text: "Special Feature opt-in controls",
                        description: "Secondary layer allows granular and specific opt-in choices with respect to each Special Feature.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-IV"],
                        tags: ["ui", "secondary-layer", "special-feature", "opt-in"]
                    },
                    {
                        id: "cmp-sec-4",
                        text: "Named vendor list with privacy policy links",
                        description: "Secondary layer shows the list of named Vendors with a link to each Vendor's privacy policy, their Purposes, Legal Bases, retention periods, Features, Special Features, and data categories.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-I"],
                        tags: ["ui", "secondary-layer", "vendor-list", "privacy-policy"]
                    },
                    {
                        id: "cmp-sec-5",
                        text: "Full purpose details with user-friendly text",
                        description: "Secondary layer shows Purposes, Special Purposes, Features, and Special Features with their standard name, full user-friendly text, illustrations, and the number of Vendors for each.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-II"],
                        tags: ["ui", "secondary-layer", "purpose-details"]
                    },
                    {
                        id: "cmp-sec-6",
                        text: "Legitimate interest distinguished from consent",
                        description: "Where applicable, secondary layer includes information about legitimate interest processing and a link to the LI layer where the right to object can be exercised.",
                        severity: "critical",
                        policyRefs: ["appB-C-c-V"],
                        tags: ["ui", "secondary-layer", "legitimate-interest"]
                    },
                    {
                        id: "cmp-sec-7",
                        text: "Storage duration information",
                        description: "Secondary layer shows Vendors' maximum device storage duration and whether it may be refreshed.",
                        severity: "important",
                        policyRefs: ["appB-C-c-VII"],
                        tags: ["ui", "secondary-layer", "storage-duration"]
                    },
                    {
                        id: "cmp-sec-8",
                        text: "Default is 'off' for granular controls",
                        description: "When a user accesses granular consent or opt-in controls, the default choice must be 'no consent' / 'no opt-in' / 'off'.",
                        severity: "critical",
                        policyRefs: ["appB-C-d"],
                        tags: ["ui", "secondary-layer", "default-off"]
                    }
                ]
            },
            {
                id: "cmp-policy-li",
                title: "Policy Checks — Legitimate Interest Layer",
                items: [
                    {
                        id: "cmp-li-1",
                        text: "Personal data processing info on LI layer",
                        description: "LI layer shows information about the fact that personal data is processed and the nature of the data.",
                        severity: "critical",
                        policyRefs: ["appB-D-c-I"],
                        tags: ["ui", "li-layer", "personal-data"]
                    },
                    {
                        id: "cmp-li-2",
                        text: "Scope information on LI layer",
                        description: "LI layer includes scope of LI processing and any objection (service-specific or group-specific).",
                        severity: "critical",
                        policyRefs: ["appB-D-c-II"],
                        tags: ["ui", "li-layer", "scope"]
                    },
                    {
                        id: "cmp-li-3",
                        text: "Object controls available on LI layer",
                        description: "LI layer provides controls to object to processing on the basis of legitimate interest.",
                        severity: "critical",
                        policyRefs: ["appB-D-c-III"],
                        playbookRefs: ["step-h", "step-o"],
                        tags: ["ui", "li-layer", "right-to-object", "controls"]
                    },
                    {
                        id: "cmp-li-4",
                        text: "Per-vendor and per-purpose object controls",
                        description: "LI layer allows objecting per Vendor and per Purpose separately.",
                        severity: "critical",
                        policyRefs: ["appB-D-c-V"],
                        tags: ["ui", "li-layer", "granular", "right-to-object"]
                    },
                    {
                        id: "cmp-li-5",
                        text: "Vendor details on LI layer",
                        description: "LI layer shows named Vendors with privacy policy links, Purposes, Legal Bases, LI explanation links, retention periods, Features, Special Features, and data categories.",
                        severity: "critical",
                        policyRefs: ["appB-D-c-VI"],
                        tags: ["ui", "li-layer", "vendor-list", "li-explanation"]
                    },
                    {
                        id: "cmp-li-6",
                        text: "Purpose list with full text on LI layer",
                        description: "LI layer shows Purposes and Special Purposes with standard name, full user-friendly text, illustrations, and number of Vendors per Purpose processing under LI.",
                        severity: "critical",
                        policyRefs: ["appB-D-c-IV"],
                        tags: ["ui", "li-layer", "purpose-details"]
                    }
                ]
            },
            {
                id: "cmp-policy-resurface",
                title: "Policy Checks — UI Resurfacing",
                items: [
                    {
                        id: "cmp-res-1",
                        text: "Consent UI resurfaced at appropriate intervals",
                        description: "The Framework UI is resurfaced when required, including when new Vendors are added, when Vendors change declared purposes or legal bases, or when the MO indicates policy changes require re-establishing legal bases.",
                        severity: "critical",
                        policyRefs: ["ch2-5-7", "ch4-21-8", "ch4-21-11"],
                        tags: ["ui", "resurface", "new-vendor"]
                    },
                    {
                        id: "cmp-res-2",
                        text: "User choice persistence respected",
                        description: "User consent/objection choices are persisted and respected across sessions. The consent file correctly stores the user's decision.",
                        severity: "critical",
                        policyRefs: ["ch2-5-3", "ch2-5-4"],
                        playbookRefs: ["step-c", "step-j"],
                        tags: ["persistence", "consent-file", "desktop-app"]
                    },
                    {
                        id: "cmp-res-3",
                        text: "Easy access to resurface UI",
                        description: "User can resurface the Framework UI from an easily accessible link or call to action, such as top-level app settings. If 'Accept All' was provided, a 'Withdraw All' must also be available.",
                        severity: "critical",
                        policyRefs: ["appB-C-f"],
                        playbookRefs: ["step-g", "step-h", "step-n", "step-o"],
                        tags: ["ui", "resurface", "consent-withdrawal", "desktop-app"]
                    }
                ]
            }
        ]
    },
    vendorChecklist: {
        id: "vendor-checklist",
        title: "Vendor Checklist",
        appliesTo: ["vendor"],
        categories: [
            {
                id: "vendor-technical",
                title: "Technical Checks",
                items: [
                    {
                        id: "vendor-tech-1",
                        text: "Correct use of TC String signals",
                        description: "Vendor correctly reads and respects TC String signals, including purpose consents, vendor consents, legitimate interests, and publisher restrictions. Must respect signals in real-time.",
                        severity: "critical",
                        policyRefs: ["ch3-12-3", "ch3-12-4", "ch3-12-5"],
                        tags: ["tc-string", "signal", "real-time"]
                    },
                    {
                        id: "vendor-tech-2",
                        text: "Alignment with declared purposes and features",
                        description: "Vendor's actual data processing aligns with its declared Purposes, Special Purposes, Features, and Special Features on the GVL. No processing beyond declared purposes.",
                        severity: "critical",
                        policyRefs: ["ch3-14-8", "ch3-14-9", "ch3-9-5"],
                        tags: ["gvl", "purposes", "alignment"]
                    },
                    {
                        id: "vendor-tech-3",
                        text: "No TC String tampering",
                        description: "Vendor does not create, modify, extend, or supplement TC Strings. Only transmits signals as received from a CMP or forwarded by another Vendor.",
                        severity: "critical",
                        policyRefs: ["ch3-12-6"],
                        tags: ["tc-string", "tampering", "enforcement"]
                    },
                    {
                        id: "vendor-tech-4",
                        text: "Signal forwarding to vendor-partners",
                        description: "Where applicable, Vendor forwards TC String signals to its vendor-partners in accordance with Specifications.",
                        severity: "important",
                        policyRefs: ["ch3-13-6"],
                        tags: ["signal", "forwarding", "vendor-partner"]
                    },
                    {
                        id: "vendor-tech-5",
                        text: "Default deny when signal unreadable",
                        description: "If Vendor cannot read or process a Signal, it assumes no permission to store/access information or process personal data.",
                        severity: "critical",
                        policyRefs: ["ch3-12-4", "ch3-12-5"],
                        tags: ["signal", "default-deny"]
                    }
                ]
            },
            {
                id: "vendor-registration",
                title: "Registration Checks",
                items: [
                    {
                        id: "vendor-reg-1",
                        text: "Complete and accurate GVL registration fields",
                        description: "Vendor has provided complete and accurate information for GVL inclusion: Purposes, Special Purposes, Legal Bases, retention periods, Features, Special Features, data categories, device storage requirements.",
                        severity: "critical",
                        policyRefs: ["ch3-9-5"],
                        tags: ["gvl", "registration", "accuracy"]
                    },
                    {
                        id: "vendor-reg-2",
                        text: "Consistency between declared processing and actual behavior",
                        description: "Vendor's actual processing activities match its GVL declarations. No undeclared purposes or features are used.",
                        severity: "critical",
                        policyRefs: ["ch3-9-5", "ch3-14-8"],
                        tags: ["gvl", "consistency", "processing"]
                    },
                    {
                        id: "vendor-reg-3",
                        text: "Public attestation of compliance",
                        description: "Vendor has a public attestation including: participation in TCF, compliance with Policies and Specifications, and its Vendor ID.",
                        severity: "important",
                        policyRefs: ["ch3-10-2"],
                        tags: ["attestation", "privacy-policy", "vendor-id"]
                    },
                    {
                        id: "vendor-reg-4",
                        text: "Privacy policy with required disclosures",
                        description: "Vendor has all legally-required disclosures in a prominent, public-facing privacy policy on its website.",
                        severity: "important",
                        policyRefs: ["ch3-9-3"],
                        tags: ["privacy-policy", "disclosure"]
                    }
                ]
            }
        ]
    }
};
