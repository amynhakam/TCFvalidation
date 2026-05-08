// TCF v2.2 Policies — Structured Data
// Source: IAB Europe TCF Policies Version 2025-01-16.5.0.a

window.TCF_POLICIES = {
    version: "2025-01-16.5.0.a",
    chapters: [
        // ========================================================
        // Chapter I: Definitions
        // ========================================================
        {
            id: "ch1",
            number: "I",
            title: "Definitions",
            appliesTo: ["cmp", "vendor", "publisher"],
            sections: [
                {
                    id: "ch1-1", section: 1, title: "Definitions", appliesTo: ["cmp", "vendor", "publisher"],
                    paragraphs: [
                        { id: "ch1-1-1", num: 1, text: "\"Transparency and Consent Framework\" (the \"Framework\", or the \"TCF\") means the Framework comprising the various parts defined under these Policies. It has the objective to help all parties in the digital environment to comply with the EU's General Data Protection Regulation (\"GDPR\") and ePrivacy Directive (\"ePD\") when processing personal data and/or accessing and/or storing information on a user's device.", tags: ["definition", "framework"] },
                        { id: "ch1-1-2", num: 2, text: "\"Interactive Advertising Bureau Europe aisbl\" (\"IAB Europe\", the \"Managing Organization\", or the \"MO\") means the entity that manages and governs the Framework, including the Policies, Specifications, and the GVL. IAB Europe may update these Policies from time to time as it reasonably determines is necessary to ensure the ongoing success of the Framework.", tags: ["definition", "iao-europe", "mo"] },
                        { id: "ch1-1-3", num: 3, text: "\"Framework Policies\" (the \"Policies\") means this or any other official policy documentation disseminated by IAB Europe and updated from time to time, that defines the requirements for compliant participation in, and use of, the Framework, including, but not limited to, Appendix A and Appendix B of these Policies, and any associated policy guidance, or publicly communicated, enforcement actions.", tags: ["definition", "policies"] },
                        { id: "ch1-1-4", num: 4, text: "\"Framework Specifications\" (the \"Specifications\") means any official technical documentation disseminated by IAB Europe in concert with IAB Tech Lab or future designated technical body, and updated from time to time, that defines the technical implementation of the Framework, including, but not limited to, the Transparency and Consent String with Global Vendor List Format specification, the Consent Management Platform API specification, and any associated implementation guidance.", tags: ["definition", "specifications", "tc-string"] },
                        { id: "ch1-1-5", num: 5, text: "\"Global Vendor List\" (the \"GVL\", or the \"Vendor List\") means the list of Vendors who have registered with IAB Europe for participating in the Framework. The list is managed and maintained by IAB Europe, and is referenced by CMPs, Publishers and individual Vendors. Its structure and content shall be defined by the Specifications.", tags: ["definition", "gvl", "vendor-list"] },
                        { id: "ch1-1-6", num: 6, text: "\"Transparency and Consent Management Platform\" (\"Consent Management Platform\", or \"CMP\") means the company or organisation that centralises and manages transparency for, and consent and objections of the end user. The CMP can read and update the Legal Basis status of Vendors on the GVL, and acts as an intermediary between a Publisher, an end user, and Vendors to provide transparency, help Vendors and Publishers establish Legal Bases for processing, acquire user consent as needed and manage user objections, and communicate Legal Basis, consent or and/or objection status to the ecosystem. A CMP may be the party that surfaces, usually on behalf of the publisher, the UI to a user, though that may also be another party. CMPs may be private or commercial. A private CMP means a Publisher that implements its own CMP for its own purposes. A commercial CMP offers CMP services to other parties. Unless specifically noted otherwise, these policies apply to both private and commercial CMPs.", tags: ["definition", "cmp", "consent-management"] },
                        { id: "ch1-1-7", num: 7, text: "\"Vendor\" means a company that participates in the delivery of digital advertising or other online activities within a Publisher's website, app, or other digital content, to the extent that company is not acting as a Publisher or CMP, and that either accesses an end user's device or processes personal data about end users visiting the Publisher's content and adheres to the Policies. A Vendor may be considered under the GDPR to be a Controller, a Processor, or both, depending on specific circumstances.", tags: ["definition", "vendor"] },
                        { id: "ch1-1-8", num: 8, text: "\"Publisher\" means an operator of a Digital Property and who is primarily responsible for ensuring the Framework UI is presented to users and that Legal Bases, including consent, are established with respect to Vendors that may process personal data based on users' visits to the Publisher's content.", tags: ["definition", "publisher"] },
                        { id: "ch1-1-9", num: 9, text: "\"Digital Property\" means a website, app, or other content or service delivery mechanism where digital ads and/or content are displayed, or information is collected and/or used for any Purpose or Special Purpose.", tags: ["definition", "digital-property"] },
                        { id: "ch1-1-10", num: 10, text: "\"Framework UI\" (\"UI\") means the user interface or user experience defined by the Specifications for presentation to a user in order to establish Legal Bases for GVL Vendors as part of their compliance with European privacy and data protection laws. The Policies and Specifications define requirements for the UI along with aspects that are configurable by Publishers.", tags: ["definition", "ui", "framework-ui"] },
                        { id: "ch1-1-11", num: 11, text: "\"Initial Layer\" refers to information that must be made visible to the user in the UI prior to the user being able to give his or her consent. For the avoidance of doubt, the use of the term \"visible\" should not be understood as excluding other forms of information presentation used, for example, for assisted internet access, or on devices with non-visual user interfaces.", tags: ["definition", "initial-layer", "ui"] },
                        { id: "ch1-1-12", num: 12, text: "\"Purpose\" means one of the defined purposes for processing of data, including users' personal data, by participants in the Framework that are defined in the Policies or the Specifications for which Vendors declare a Legal Basis in the GVL and for which the user is given choice, i.e. to consent or to object depending on the Legal Basis for the processing, by a CMP.", tags: ["definition", "purpose"] },
                        { id: "ch1-1-13", num: 13, text: "\"Special Purpose\" means one of the defined purposes for processing of data, including users' personal data, by participants in the Framework that are defined in the Policies or the Specifications for which Vendors declare a Legal Basis in the GVL and for which the user is not given choice by a CMP.", tags: ["definition", "special-purpose"] },
                        { id: "ch1-1-14", num: 14, text: "\"Feature\" means one of the features of processing personal data used by participants in the Framework that are defined in the Policies or the Specifications used in pursuit of one or several Purposes for which the user is not given choice separately to the choice afforded regarding the Purposes for which they are used.", tags: ["definition", "feature"] },
                        { id: "ch1-1-15", num: 15, text: "\"Special Feature\" means one of the features of processing personal data used by participants in the Framework that are defined in the Policies or the Specifications used in pursuit of one or several Purposes for which the user is given the choice to opt-in separately from the choice afforded regarding the Purposes which they support.", tags: ["definition", "special-feature"] },
                        { id: "ch1-1-16", num: 16, text: "\"Stack\" means one of the combinations of Purposes and/or Special Features of processing personal data used by participants in the Framework that may be used to substitute or supplement more granular Purpose and/or Special Feature descriptions in the Initial Layer of a UI.", tags: ["definition", "stack"] },
                        { id: "ch1-1-17", num: 17, text: "\"Category of data\" means one of the categories of data collected and processed by Framework participants in pursuit of one or several Purposes and that are defined in the Policies or the Specifications.", tags: ["definition", "data-category"] },
                        { id: "ch1-1-18", num: 18, text: "\"Signal\" means any signal defined by the Policies or Specifications sent by a CMP, usually on behalf of a Publisher, to Vendors that includes, amongst others, information about the transparency, consent, and/or objection status of a Vendor and/or Purpose, the opt-in status of a Special Feature, and Publisher restrictions.", tags: ["definition", "signal", "tc-string"] },
                        { id: "ch1-1-19", num: 19, text: "\"Precise Geolocation Data\" means information about a user's geographic location accurate to up to 500 metres and/or latitude and longitude data beyond two decimal points.", tags: ["definition", "geolocation"] },
                        { id: "ch1-1-20", num: 20, text: "\"Legal Basis\" means a lawful ground for processing defined in Article 6 GDPR and supported by the Framework, which are consent in accordance with Article 6(1)(a) GDPR and legitimate interests in accordance with Article 6(1)(f) GDPR. Legal Bases in the Framework can be established with (a) Service-specific scope, which means a Legal Basis is applicable only on the service on which the Legal Basis is obtained and managed; or (b) Group-specific scope, which means a Legal Basis is applicable only on a pre-defined group of Digital Properties that belong to or are otherwise under the control of the same organisation.", tags: ["definition", "legal-basis", "consent", "legitimate-interest", "scope"] },
                        { id: "ch1-1-21", num: 21, text: "\"Device\" means electronic equipment, such as a computer, tablet, phone, TV, watch, that is capable of accessing the internet, including any software run on the electronic equipment to connect to the internet, such as a browser or app.", tags: ["definition", "device", "desktop-app"] }
                    ]
                }
            ]
        },
        // ========================================================
        // Chapter II: Policies for CMPs
        // ========================================================
        {
            id: "ch2",
            number: "II",
            title: "Policies for CMPs",
            appliesTo: ["cmp"],
            sections: [
                {
                    id: "ch2-2", section: 2, title: "Applying and Registering", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-2-1", num: 1, text: "CMPs must apply to IAB Europe for participation in the Framework. IAB Europe shall take reasonable steps to vet and approve a CMP's application according to procedures adopted, and updated from time to time, by the MO.", tags: ["registration", "application"] },
                        { id: "ch2-2-2", num: 2, text: "CMPs must provide all information requested by IAB Europe that is required to fulfil IAB Europe's CMP application and approval procedures.", tags: ["registration", "information"] },
                        { id: "ch2-2-3", num: 3, text: "IAB Europe shall not approve a CMP's application unless or until IAB Europe can verify to its satisfaction the identity of the party or parties controlling the CMP, as well as the CMP's ability to maintain its service and adhere to the Policies and Specifications.", tags: ["registration", "verification"] }
                    ]
                },
                {
                    id: "ch2-3", section: 3, title: "Adherence to Framework Policies", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-3-1", num: 1, text: "A CMP must adhere to all Policies applicable to CMPs that are disseminated by the MO in the Policies or in documentation that implements the Policies, such as in operating policies and procedures, guidance, and enforcement decisions.", tags: ["compliance", "adherence"] },
                        { id: "ch2-3-2", num: 2, text: "A CMP must make a public attestation of compliance with the Policies in a prominent disclosure, such as in a privacy policy. This attestation must at minimum include: (i) an affirmation of the CMP's participation in the IAB Europe Transparency & Consent Framework; (ii) an affirmation of its compliance with the Policies and Specifications of the Transparency & Consent Framework; (ii) the IAB Europe-assigned ID of the CMP.", tags: ["attestation", "privacy-policy", "cmp-id"] }
                    ]
                },
                {
                    id: "ch2-4", section: 4, title: "Adherence to the Specifications", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-4-1", num: 1, text: "In addition to implementing the Framework according to the Specifications, a CMP must support the full Specifications, unless the Specifications expressly state that a feature is optional, in which case a CMP may choose to implement the optional feature but need not to do so.", tags: ["specifications", "implementation"] },
                        { id: "ch2-4-2", num: 2, text: "A private CMP need only implement the Specifications to the extent necessary to support the needs of the Vendors, Purposes, and Special Features selected by its Publisher owner.", tags: ["specifications", "private-cmp"] },
                        { id: "ch2-4-3", num: 3, text: "A CMP must disclose Vendors' GVL information, including Legal Bases, as declared, and update Vendors' GVL information, including Legal Bases status in the Framework, wherever stored, according to the Specifications, without extension, modification, or supplementation, except as expressly allowed for in the Specifications.", tags: ["gvl", "vendor-information", "legal-basis"] },
                        { id: "ch2-4-4", num: 4, text: "A CMP must not read, write, or communicate any Vendor's Legal Bases except according to and as provided for under the Specifications.", tags: ["specifications", "legal-basis", "tc-string"] }
                    ]
                },
                {
                    id: "ch2-5", section: 5, title: "Managing Purposes and Legal Bases", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-5-1", num: 1, text: "A CMP will remind the user of their right to withdraw consent and/or right to object to processing with respect to any Vendor or Purpose in accordance with the requirements laid down by the relevant Authorities.", tags: ["consent-withdrawal", "right-to-object"] },
                        { id: "ch2-5-2", num: 2, text: "A CMP must resolve conflicts in Signals or merge Signals before transmitting it in accordance with the Policies and Specifications.", tags: ["signal", "conflict-resolution"] },
                        { id: "ch2-5-3", num: 3, text: "A CMP must only generate a positive consent Signal on the basis of a clear affirmative action taken by a user that unambiguously signifies that user's agreement on the basis of appropriate information in accordance with the law.", tags: ["consent", "signal", "affirmative-action", "tc-string"] },
                        { id: "ch2-5-4", num: 4, text: "A CMP must only generate a positive legitimate interest Signal on the basis of the provision of transparency by the CMP about processing on the basis of a legitimate interest and must always generate a negative legitimate interest Signal if the user has indicated an objection to such processing on the basis of a legitimate interest.", tags: ["legitimate-interest", "signal", "right-to-object"] },
                        { id: "ch2-5-5", num: 5, text: "A CMP must only generate a positive opt-in Signal for Special Features on the basis of a clear affirmative action taken by a user that unambiguously signifies that user's agreement on the basis of appropriate information.", tags: ["special-feature", "opt-in", "signal"] },
                        { id: "ch2-5-6", num: 6, text: "A CMP will establish Legal Bases only in accordance with the declarations made by Vendors in the GVL and using the definitions of the Purposes and/or their translations found in the GVL, without extension, modification, or supplementation, except as expressly allowed for in the Policies.", tags: ["legal-basis", "gvl", "purpose-definitions"] },
                        { id: "ch2-5-7", num: 7, text: "A CMP must resurface the Framework UI if the MO indicates, in accordance with the Policies and Specifications, that changes to the Policies are of such a nature as to require re-establishing Legal Bases.", tags: ["resurface", "ui", "policy-changes"] },
                        { id: "ch2-5-8", num: 8, text: "A CMP may be instructed by its Publisher which Purposes, Special Features, and/or Vendors to disclose. If a Publisher instructs a CMP not to disclose a Purpose, Special Feature, and/or a Vendor, the Signals the CMP generates must appropriately reflect in the Signal that no Legal Bases and/or opt-ins have been established for the respective Purposes, Special Features, and/or Vendors. For the avoidance of doubt: Special Purposes, and Features must always be disclosed if at least one of the Vendors disclosed has declared itself using them.", tags: ["publisher-instructions", "vendor-selection", "signal"] },
                        { id: "ch2-5-9", num: 9, text: "A CMP must implement any Publisher restrictions, such as a restriction of Purposes per Vendors, by making appropriate changes in the User Interface to reflect such restrictions, and by creating the appropriate Signals containing the Publisher restrictions in accordance with the Policies and Specifications.", tags: ["publisher-restrictions", "ui", "signal"] },
                        { id: "ch2-5-11", num: 11, text: "A CMP may be instructed by its Publisher to establish, record and transmit information about Legal Bases applicable to data processing performed by the Publisher, including Legal Bases for purposes that are not standardised by the Framework.", tags: ["publisher-purposes", "legal-basis"] }
                    ]
                },
                {
                    id: "ch2-6", section: 6, title: "Working with Vendors", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-6-1", num: 1, text: "If a CMP works with Vendors who are not participating in the Framework and published on the GVL, the CMP must make it possible for users to distinguish between those Vendors who are participating in the Framework, on the one hand, and those who are not, on the other. CMPs must not misrepresent Vendors who are not registered with IAB Europe as participating in the Framework and published on the GVL.", tags: ["non-gvl-vendors", "transparency"] },
                        { id: "ch2-6-2", num: 2, text: "If a Publisher or Vendor operates a CMP, the Policies for CMPs shall apply only to the extent of that party's CMP operation.", tags: ["publisher-cmp", "vendor-cmp"] },
                        { id: "ch2-6-3", num: 3, text: "In any interaction with the Framework, a CMP may not exclude, discriminate against, or give preferential treatment to a Vendor except pursuant to explicit instructions from the Publisher involved in that interaction and in accordance with the Specifications and the Policies. A commercial CMP shall allow the Publisher using its CMP to make choices with respect to each Vendor appearing on its sites or apps and may not impose a list of Vendors.", tags: ["non-discrimination", "vendor-selection"] },
                        { id: "ch2-6-4", num: 4, text: "If a Vendor also operates a CMP, it may require a Publisher to whom it provides the CMP service to work with its Vendor-owner and Vendor-partners as part of the terms and conditions of using the CMP. Such a requirement shall not constitute preferential treatment in the meaning of Policy 6(3).", tags: ["vendor-cmp", "terms"] },
                        { id: "ch2-6-5", num: 5, text: "If a CMP reasonably believes that a Vendor is not in compliance with the Specifications and/or the Policies, it must promptly notify IAB Europe according to MO procedures and may, as provided for by MO procedures, pause working with the Vendor while the matter is addressed.", tags: ["non-compliance", "reporting"] }
                    ]
                },
                {
                    id: "ch2-7", section: 7, title: "Working with Publishers", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-7-1", num: 1, text: "A CMP shall only work with Publishers within the Framework that are in full compliance with the Policies, including but not limited to the requirement to make an attestation of compliance in a prominent location, such as a privacy policy.", tags: ["publisher-compliance", "attestation"] },
                        { id: "ch2-7-2", num: 2, text: "A CMP is responsible for ensuring that its UIs and Signals comply with the Policies and Specifications. Where a commercial CMP is not able to ensure such compliance, for example because it offers Publishers the option to customise aspects that may impact compliance, the Publisher using such customisation options must assume responsibility for compliance with the Policies for CMPs, register a private CMP within the Framework, and use the commercial CMPs offering in association with the Publisher's assigned private CMP ID.", tags: ["ui-compliance", "customisation", "private-cmp"] },
                        { id: "ch2-7-3", num: 3, text: "If a CMP reasonably believes that a Publisher using its CMP is not in compliance with the Specifications and/or the Policies, it must promptly notify IAB Europe according to MO procedures and may, as provided for by MO procedures, pause working with the Publisher while the matter is addressed. For the avoidance of doubt, where a commercial CMP receives an instruction from a Publisher that is in violation of these Policies, the CMP shall not act on the instruction.", tags: ["non-compliance", "publisher", "reporting"] },
                        { id: "ch2-7-4", num: 4, text: "The MO may prevent a Publisher from participation in the Framework for violations of Framework Policies that are willful and/or severe according to MO procedures. The MO may enact a suspension or block of a Publisher by notifying CMPs that the Publisher is not in full compliance.", tags: ["enforcement", "suspension"] }
                    ]
                },
                {
                    id: "ch2-8", section: 8, title: "Accountability", appliesTo: ["cmp"],
                    paragraphs: [
                        { id: "ch2-8-1", num: 1, text: "IAB Europe shall take reasonable steps to periodically review and verify a CMP's compliance with the Policies and/or the Specifications according to procedures adopted, and updated from time to time, by the MO. A CMP will provide, without undue delay, any information reasonably requested by IAB Europe to verify compliance (which, for the avoidance of doubt, does not include information that might be related to users).", tags: ["accountability", "compliance-review"] },
                        { id: "ch2-8-2", num: 2, text: "IAB Europe may suspend a CMP from participation in the Framework for any failure to comply with the Policies and/or the Specifications until the CMP comes into full compliance and demonstrates its intention and ability to remain so to the MO's satisfaction. The MO may expel a CMP from participation in the Framework for violations of Policies that are willful and/or severe.", tags: ["enforcement", "suspension", "expulsion"] },
                        { id: "ch2-8-3", num: 3, text: "Additionally, IAB Europe may, at its discretion and according to MO procedures, take additional actions in response to a CMP's non-compliance, including publicly communicating the CMP's non-compliance and reporting the non-compliance to data protection authorities.", tags: ["enforcement", "public-disclosure", "dpa"] }
                    ]
                }
            ]
        },
        // ========================================================
        // Chapter III: Policies for Vendors
        // ========================================================
        {
            id: "ch3",
            number: "III",
            title: "Policies for Vendors",
            appliesTo: ["vendor"],
            sections: [
                {
                    id: "ch3-9", section: 9, title: "Applying and Registering", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-9-1", num: 1, text: "Vendors must apply to IAB Europe for participation in the Framework. IAB Europe shall take reasonable steps to vet and approve a Vendor's application according to procedures adopted, and updated from time to time, by the MO.", tags: ["registration", "application"] },
                        { id: "ch3-9-2", num: 2, text: "Vendors must provide all information requested by the MO that is reasonably required to fulfil the MO's application and approval procedures.", tags: ["registration", "information"] },
                        { id: "ch3-9-3", num: 3, text: "Vendors must have all legally-required disclosures in a prominent, public-facing privacy policy on their websites.", tags: ["privacy-policy", "disclosure"] },
                        { id: "ch3-9-4", num: 4, text: "The MO will not approve a Vendor's application unless or until the MO can verify to its satisfaction the identity of the party or parties controlling the Vendor, as well as the Vendor's ability to maintain its service and adhere to the Framework policies.", tags: ["registration", "verification"] },
                        { id: "ch3-9-5", num: 5, text: "A Vendor will provide to the MO, and maintain as complete and accurate, all information required for inclusion in the GVL, according to the GVL Specifications. This includes the Purposes and Special Purposes for which it collects and processes personal data, the Legal Bases it relies on for processing personal data for each Purpose and Special Purpose and, where applicable, a link to an explanation of its legitimate interest(s) at stake, the retention period of data processed for each Purpose and Special Purpose, the Features and Special Features it relies on in pursuit of such Purposes and Special Purposes, the categories of data it collects and processes in pursuit of the Purposes and Special Purposes it has declared, and its requirements regarding storing and/or accessing information on users' devices.", tags: ["gvl", "registration", "purposes", "legal-basis", "retention"] }
                    ]
                },
                {
                    id: "ch3-10", section: 10, title: "Adherence to Framework Policies", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-10-1", num: 1, text: "A Vendor must adhere to all policies applicable to Vendors that are disseminated by the MO in this document or in documentation that implements the Policies, such as in operating policies and procedures, guidance, and enforcement decisions.", tags: ["compliance", "adherence"] },
                        { id: "ch3-10-2", num: 2, text: "A Vendor must make a public attestation of compliance with the Policies in a prominent disclosure, such as in a privacy policy. This language must at a minimum include: (i) participation in the IAB Europe Transparency & Consent Framework; (ii) compliance with the Policies and Specifications with the Transparency & Consent Framework; (ii) the IAB Europe assigned ID that the Vendor uses.", tags: ["attestation", "privacy-policy", "vendor-id"] }
                    ]
                },
                {
                    id: "ch3-11", section: 11, title: "Adherence to the Specifications", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-11-1", num: 1, text: "In addition to implementing the Framework only according to the Specifications, a Vendor must support the full Specifications, including being able to retrieve and/or pass on Signals in the technical formats required by the Specifications and in accordance with Policies, when available.", tags: ["specifications", "signal", "tc-string"] }
                    ]
                },
                {
                    id: "ch3-12", section: 12, title: "Working with CMPs", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-12-1", num: 1, text: "A Vendor shall work with a CMP within the Framework only if the CMP is in full compliance with the Policies, including but not limited to the requirements to register with IAB Europe, and to make a public attestation of compliance.", tags: ["cmp-compliance"] },
                        { id: "ch3-12-2", num: 2, text: "If a Vendor reasonably believes that a CMP is not in compliance with the Specifications and/or the Policies, it must promptly notify IAB Europe according to MO procedures and may, as provided for by MO procedures, pause working with the CMP while the matter is addressed.", tags: ["non-compliance", "reporting"] },
                        { id: "ch3-12-3", num: 3, text: "A Vendor must respect Signals communicated by a CMP or received from a Vendor who forwarded the Signal originating from a CMP in accordance with the Specifications and Policies, and act accordingly. A Vendor must respect Signals on an individual basis in real-time and must not rely on a stored version of a previously received Signal to store and/or access information on a device, or to process personal data for any Purpose and/or use any Special Feature where a more recent Signal has been received by that Vendor.", tags: ["signal", "real-time", "tc-string"] },
                        { id: "ch3-12-4", num: 4, text: "If a Vendor is unable to read or process the contents of a received Signal, the Vendor must assume that it does not have permission to store and/or access information on a device, or to process personal data for any Purpose and/or Special Purpose.", tags: ["signal", "default-deny"] },
                        { id: "ch3-12-5", num: 5, text: "If a Vendor is unable to act in accordance with the contents of a received Signal, the Vendor must not store and/or access information on a device, or process personal data for any Purpose and/or Special Purpose.", tags: ["signal", "enforcement"] },
                        { id: "ch3-12-6", num: 6, text: "A Vendor must not create Signals where no CMP has communicated a Signal, and shall only transmit Signals communicated by a CMP or received from a Vendor who forwarded a Signal originating from a CMP without extension, modification, or supplementation, except as expressly allowed for in the Policies and/or Specifications.", tags: ["signal", "tc-string-tampering"] },
                        { id: "ch3-12-7", num: 7, text: "A Vendor must not obtain a Signal from a CMP except according to and as provided for under the Specifications and, where applicable, using the API provided by a CMP according to the Specifications.", tags: ["signal", "api", "specifications"] }
                    ]
                },
                {
                    id: "ch3-13", section: 13, title: "Working with Publishers", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-13-1", num: 1, text: "A Vendor shall work with a Publisher within the Framework only if the Publisher is in full compliance with the Policies, including but not limited to the requirement to make a public attestation of compliance.", tags: ["publisher-compliance"] },
                        { id: "ch3-13-2", num: 2, text: "If a Vendor reasonably believes that a Publisher is not in compliance with the Specifications and/or the Policies, it must promptly notify IAB Europe according to MO procedures and may, as provided for by MO procedures, pause working with the Publisher while the matter is addressed.", tags: ["non-compliance", "reporting"] },
                        { id: "ch3-13-3", num: 3, text: "For the avoidance of doubt, contractual obligations that a Vendor is subject to with respect to the use of data override more permissive Signals for that Vendor about permissions to that data.", tags: ["contractual-obligations", "signal"] },
                        { id: "ch3-13-4", num: 4, text: "A Vendor must update its software for use by its Publisher- and Vendor-partners, such as scripts and tags that result in personal data processing or the storing and/or accessing of information on user devices, to ensure compliance with the Specifications, and/or the Policies. In particular, the requirement to not process personal data prior to verifiably establishing a Legal Basis for processing personal data as communicated by the appropriate Signal in accordance with the Policies and Specifications, and not storing and/or accessing information on a user's device that is not exempted from the obligation to obtain consent, prior to verifiably having obtained consent as communicated by the appropriate Signal.", tags: ["software-update", "legal-basis", "signal", "consent"] },
                        { id: "ch3-13-5", num: 5, text: "A Vendor shall update software provided by its Vendor-partners present on its services, such as scripts and tags that result in personal data processing or the storing and/or accessing of information on user devices, if the Vendor-partner has provided updated software for the purpose of complying with the Specifications and/or the Policies.", tags: ["vendor-partner", "software-update"] },
                        { id: "ch3-13-6", num: 6, text: "Where applicable, a Vendor must forward the Signal communicated by a CMP or received from a Vendor who forwarded a Signal originating from a CMP, in accordance with the Specifications and Policies to its Vendor-partners present on its services.", tags: ["signal-forwarding"] }
                    ]
                },
                {
                    id: "ch3-14", section: 14, title: "Purposes, Special Purposes and Legal Bases, Special Features and Opt-Ins", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-14-1", num: 1, text: "A Vendor must not store information or access information on a user's device without consent, unless the law exempts such storage of information or accessing of information on a user's device from an obligation to obtain consent.", tags: ["consent", "device-access", "eprivacy"] },
                        { id: "ch3-14-2", num: 2, text: "A Vendor shall indicate on the global vendor list if it seeks consent for storing information or accessing information on a user's device where such consent is necessary. A Vendor must not store information or access information on a user's device without consent where such consent is necessary.", tags: ["gvl", "device-access", "consent"] },
                        { id: "ch3-14-2b", num: "2bis", text: "A Vendor shall indicate on the GVL the maximum duration of information stored on a user's device, including whether such duration may be refreshed. A Vendor must, in addition, provide more detailed and purpose-specific storage and access information in accordance with the Specifications.", tags: ["storage-duration", "gvl"] },
                        { id: "ch3-14-3", num: 3, text: "A Vendor must not process personal data relating to a user without a Legal Basis to do so.", tags: ["legal-basis", "personal-data"] },
                        { id: "ch3-14-8", num: 8, text: "Where a situation falls within the Framework, a Vendor wishing to rely on the user's consent for the processing of his or her personal data will only do so if it can verify by way of the appropriate Signal in accord with the Specifications and Policies that the user has given his or her appropriate consent before any information is stored and/or accessed on the user's device or any personal data is processed.", tags: ["consent", "signal", "verification"] },
                        { id: "ch3-14-9", num: 9, text: "Where a situation falls within the Framework, a Vendor wishing to rely on its legitimate interest for the processing of personal data will only do so if: (a) it can verify by way of the appropriate Signal that the appropriate information has been provided to the user at the time that the processing starts; (b) the user has not exercised his or her right to object to such processing as indicated in the appropriate Signal.", tags: ["legitimate-interest", "signal", "right-to-object"] },
                        { id: "ch3-14-15", num: 15, text: "A Vendor must not transmit personal data to another Vendor unless the Framework's Signals show that the receiving Vendor has a Legal Basis for the processing of the personal data.", tags: ["data-transmission", "legal-basis", "vendor-to-vendor"] },
                        { id: "ch3-14-16", num: 16, text: "A Vendor must not transmit a user's personal data to an entity outside of the Framework unless it has a justified basis for relying on that entity's having a Legal Basis for processing the personal data in question.", tags: ["data-transmission", "non-framework"] },
                        { id: "ch3-14-17", num: 17, text: "If a Vendor receives a user's personal data without having a Legal Basis for the processing of that data, the Vendor must quickly cease processing the personal data and must not further transmit the personal data to any other party.", tags: ["no-legal-basis", "cease-processing"] },
                        { id: "ch3-14-18", num: 18, text: "If a Vendor is unable to receive and respect Signals in real-time, it must put in place reasonable measures to regularly verify the validity of the Signal it relies upon and put in place a limited retention period to mechanically cease processing of user's personal data when the Signal cannot be verified.", tags: ["real-time", "signal", "retention"] }
                    ]
                },
                {
                    id: "ch3-15", section: 15, title: "Accountability", appliesTo: ["vendor"],
                    paragraphs: [
                        { id: "ch3-15-1", num: 1, text: "The MO may adopt procedures for periodically reviewing and verifying a Vendor's compliance with the Policies. A Vendor will provide, without undue delay, any information reasonably requested by the MO to verify compliance.", tags: ["accountability", "compliance-review"] },
                        { id: "ch3-15-2", num: 2, text: "The MO may suspend a Vendor from participation in the Framework for its failure to comply with the Policies until the Vendor comes into full compliance. The MO may expel a Vendor from participation in the Framework for violations of the Policies that are willful and/or severe.", tags: ["enforcement", "suspension"] },
                        { id: "ch3-15-3", num: 3, text: "Additionally, the MO may, at its discretion and according to MO procedures, take additional actions in response to a Vendor's non-compliance, including publicly communicating the Vendor's non-compliance and reporting the non-compliance to data protection authorities.", tags: ["enforcement", "public-disclosure"] }
                    ]
                }
            ]
        },
        // ========================================================
        // Chapter IV: Policies for Publishers
        // ========================================================
        {
            id: "ch4",
            number: "IV",
            title: "Policies for Publishers",
            appliesTo: ["publisher"],
            sections: [
                {
                    id: "ch4-16", section: 16, title: "Participation", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-16-1", num: 1, text: "A Publisher may adopt and use the Framework in association with its content as long as it adheres to the Policies and the Specifications.", tags: ["participation"] },
                        { id: "ch4-16-2", num: 2, text: "Publishers must have and maintain all legally-required disclosures in a public-facing privacy policy prominently linked to from the content in association with which they are using the Framework.", tags: ["privacy-policy", "disclosure"] }
                    ]
                },
                {
                    id: "ch4-17", section: 17, title: "Adherence to Framework Policies", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-17-1", num: 1, text: "In addition to implementing the Framework only according to the Specifications, a Publisher must adhere to all policies applicable to Publishers that are disseminated by the MO.", tags: ["compliance", "adherence"] },
                        { id: "ch4-17-2", num: 2, text: "A Publisher must make a public attestation of compliance with the Policies in a prominent disclosure, such as in a privacy policy. This language must at a minimum include: (i) an affirmation of its participation in the IAB Europe Transparency & Consent Framework; (ii) an affirmation of its compliance with the Policies and Specifications with the Transparency & Consent Framework; (ii) the IAB Europe assigned ID of the CMP that the publisher uses.", tags: ["attestation", "privacy-policy", "cmp-id"] }
                    ]
                },
                {
                    id: "ch4-18", section: 18, title: "Adherence to the Specifications", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-18-1", num: 1, text: "A Publisher must support and adhere to the full Specifications, without extension, modification, or supplementation except as expressly allowed for in the Specifications.", tags: ["specifications"] }
                    ]
                },
                {
                    id: "ch4-19", section: 19, title: "Working with CMPs", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-19-1", num: 1, text: "A Publisher will work with a CMP within the Framework only if the CMP is in full compliance with the Policies and the Specifications, including but not limited to the requirement for the CMP to register with the MO.", tags: ["cmp-compliance"] },
                        { id: "ch4-19-2", num: 2, text: "If a Publisher reasonably believes that a CMP is not in compliance with the Specifications and/or the Policies, it must promptly notify the MO according to MO procedures and may, as provided for by MO procedures, pause working with the CMP while the matter is addressed.", tags: ["non-compliance", "reporting"] },
                        { id: "ch4-19-3", num: 3, text: "A Publisher may operate a private CMP. A Publisher's private CMP is subject to the Policies for CMPs just as a commercial CMP is, unless expressly stated otherwise in the Framework Policies or the Specifications.", tags: ["private-cmp"] }
                    ]
                },
                {
                    id: "ch4-20", section: 20, title: "Working with Vendors", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-20-1", num: 1, text: "A Publisher may choose the Vendors for which it wishes to provide transparency and help establish Legal Bases within the Framework. A Publisher may further specify the individual Purposes for which it wishes to help establish Legal Bases for each Vendor. WARNING: Publishers should consider the number of Vendors they work with, and put in place a selection process. Providing transparency and helping to establish Legal Bases within the Framework for an unjustifiably large number of Vendors may impact users' ability to make informed choices and increase Publisher and Vendor legal risk.", tags: ["vendor-selection", "vendor-count", "warning"] },
                        { id: "ch4-20-2", num: 2, text: "A Publisher will, in accordance with the Specifications and Policies, and considering and respecting each Vendor's declarations on the GVL, signal, or instruct to Vendors which Legal Basis it has established on behalf of each Vendor.", tags: ["legal-basis", "signal"] },
                        { id: "ch4-20-6", num: 6, text: "If a Publisher reasonably believes that a Vendor is not in compliance with the Specifications and/or the Policies, it must promptly notify the MO according to MO procedures and may, as provided for by those procedures, pause working with the Vendor while the matter is addressed.", tags: ["non-compliance", "reporting"] },
                        { id: "ch4-20-7", num: 7, text: "A Publisher will undertake to update software present on its services of its Vendor-partners, such as scripts and tags that result in personal data processing or the storing and/or accessing of information on user devices, if the Vendor has provided updated software for the purpose of complying with the Specifications and/or the Policies.", tags: ["software-update", "vendor-partner"] },
                        { id: "ch4-20-8", num: 8, text: "Where applicable, a Publisher must forward the Signal communicated by a CMP in accordance with the Specifications and Policies to its Vendor-partners present on its services.", tags: ["signal-forwarding"] }
                    ]
                },
                {
                    id: "ch4-21", section: 21, title: "Managing Purposes and Legal Bases", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-21-1", num: 1, text: "The Framework does not dictate how Publishers respond to a user's acceptance or rejection of Purposes, Special Features, and/or Vendors.", tags: ["publisher-discretion"] },
                        { id: "ch4-21-2", num: 2, text: "A Publisher using the Framework is required to help establish transparency, Legal Bases and/or opt-ins for the specific Purposes, Special Purposes, Features, and Special Features that Vendors claim, in accord with the Policies and Specifications.", tags: ["transparency", "legal-basis"] },
                        { id: "ch4-21-3", num: 3, text: "A Publisher may choose which Purposes, Special Features, and/or Vendors to disclose. If a Publisher chooses not to disclose a Purpose, Special Feature, and/or a Vendor, the Signals must appropriately reflect that no Legal Bases and/or opt-ins have been established. Special Purposes and Features must always be disclosed if at least one of the Vendors disclosed has declared to be using them.", tags: ["purpose-selection", "signal", "special-purposes"] },
                        { id: "ch4-21-4", num: 4, text: "A Publisher may restrict certain Purposes for specific Vendors, these restrictions must be implemented by the CMP, which shall reflect Publisher restrictions in both the User Interface and the Signals in accordance with the Policies and Specifications.", tags: ["publisher-restrictions", "ui", "signal"] },
                        { id: "ch4-21-5", num: 5, text: "A Publisher must not modify, or instruct its CMP to modify the Purpose, Special Purpose, Feature, or Special Feature names, definitions and/or their translations, or Stack names or their translations.", tags: ["purpose-definitions", "no-modification"] },
                        { id: "ch4-21-8", num: 8, text: "If a Vendor that was not included in a prior use of the Framework UI is added by the Publisher, the Publisher must resurface or instruct its CMP to resurface the Framework UI to establish that Vendor's Legal Bases before signalling that the Vendor's Legal Bases have been established.", tags: ["resurface", "new-vendor", "ui"] },
                        { id: "ch4-21-9", num: 9, text: "Publishers should remind users, or instruct their CMPs to do so, of their right to object to processing or withdraw consent, as applicable, in accordance with the requirements laid down by relevant authorities.", tags: ["consent-withdrawal", "right-to-object"] },
                        { id: "ch4-21-11", num: 11, text: "A Publisher must resurface the Framework UI, or instruct its CMP to do so, if the MO notifies participants that changes to the Framework are of such a nature as to require re-establishing Legal Bases.", tags: ["resurface", "policy-changes"] },
                        { id: "ch4-21-12", num: 12, text: "A Publisher may use the Specification to manage and store, or instruct its CMP to do so, its own Legal Bases in conjunction with its own processing or for processing conducted on its behalf by a Vendor who is acting as its processor under the law, including Legal Bases for purposes that are not standardised by the Framework.", tags: ["publisher-purposes", "processor"] }
                    ]
                },
                {
                    id: "ch4-22", section: 22, title: "Accountability", appliesTo: ["publisher"],
                    paragraphs: [
                        { id: "ch4-22-1", num: 1, text: "The MO may adopt procedures for periodically reviewing and verifying a Publisher's compliance with Framework Policies. A Publisher will provide, without undue delay, any information reasonably requested by the MO to verify compliance.", tags: ["accountability", "compliance-review"] },
                        { id: "ch4-22-2", num: 2, text: "The MO may suspend a Publisher from participation in the Framework for its failure to comply with Framework Policies until the Publisher comes into full compliance. The MO may block a Publisher from participation in the Framework for violations of Framework Policies that are wilful and/or severe.", tags: ["enforcement", "suspension"] },
                        { id: "ch4-22-3", num: 3, text: "Additionally, the MO may, at its discretion and according to MO procedures, take additional actions in response to a Publisher's non-compliance, including publicly communicating the Publisher's non-compliance and reporting the non-compliance to data protection authorities.", tags: ["enforcement", "public-disclosure"] }
                    ]
                }
            ]
        },
        // ========================================================
        // Chapter V: Interacting with Users
        // ========================================================
        {
            id: "ch5",
            number: "V",
            title: "Interacting with Users",
            appliesTo: ["cmp", "publisher"],
            sections: [
                {
                    id: "ch5-int", section: 0, title: "Interacting with Users", appliesTo: ["cmp", "publisher"],
                    paragraphs: [
                        { id: "ch5-int-1", num: 1, text: "Chapter II (Policies for CMPs), Chapter IV (Policies for Publishers), Appendix A (Purposes and Features Definitions), and Appendix B (User Interface Requirements) set out requirements for interacting with users. CMPs and/or Publishers are responsible for interacting with users in accordance with these Policies and the Specifications.", tags: ["user-interaction", "ui"] }
                    ]
                }
            ]
        },
        // ========================================================
        // Appendix B: User Interface Requirements
        // ========================================================
        {
            id: "appB",
            number: "B",
            title: "Appendix B: User Interface Requirements",
            appliesTo: ["cmp", "publisher"],
            sections: [
                {
                    id: "appB-A", section: "A", title: "Scope", appliesTo: ["cmp", "publisher"],
                    paragraphs: [
                        { id: "appB-A-a", num: "a", text: "This Appendix applies to any party deploying a user interface in connection with the Framework (\"Framework UI\"). Typically this is the first party in the interaction with the user, such as a Publisher operating its own private CMP, or relying on the services of a commercial CMP. Both the Publisher and the CMP are responsible to ensure that these requirements are met.", tags: ["ui", "scope", "responsibility"] },
                        { id: "appB-A-b", num: "b", text: "A Publisher and/or CMP is responsible for determining when the Framework UI will be shown in accord with the Framework Policies and the Specifications, consistent with legal requirements to support the transparent and lawful storing and/or accessing of information on user devices and/or processing of users' personal data by Vendors.", tags: ["ui", "timing", "display"] },
                        { id: "appB-A-c", num: "c", text: "The Framework Policies and the Specifications establish minimum requirements for language, design, and other elements in the Framework UI. These minimum requirements are intended to align with legal requirements of EU privacy and data protection law. In the event of a conflict between applicable EU law and Appendix B, the law prevails. Unless stated otherwise, nothing in Appendix B is intended to prevent the creation of Framework UIs that go beyond these minimum requirements.", tags: ["ui", "minimum-requirements"] }
                    ]
                },
                {
                    id: "appB-B", section: "B", title: "General Rules and Requirements for Framework UIs", appliesTo: ["cmp", "publisher"],
                    paragraphs: [
                        { id: "appB-B-a", num: "a", text: "When providing transparency and/or consent choices to users, the Framework UI may make use of a so-called layered approach that provides key information immediately in an Initial Layer and makes more detailed information available elsewhere in additional layers for those users who are interested in it.", tags: ["ui", "layered-approach", "initial-layer"] },
                        { id: "appB-B-b", num: "b", text: "When providing transparency about Purposes and Features, the Framework UI must do so only on the basis of the standard Purpose, Special Purpose, Feature, and Special Feature names and definitions of Appendix A as they are published on the Global Vendor List or using Stacks in accordance with the Policies and Specifications. UIs must make available the standard user-friendly text, and where applicable the standard illustrations, for each Purpose, Special Purpose, Feature, Special Feature and Category of data of Appendix A.", tags: ["ui", "standardised-text", "purposes", "gvl"] },
                        { id: "appB-B-c", num: "c", text: "Where the Framework UI uses a language other than English, the Framework UI must do so only on the basis of official translations of the standard Purpose, Special Purpose, Feature, Special Feature and Category of data names and definitions of Appendix A as they are published on the Global Vendor List.", tags: ["ui", "translations"] },
                        { id: "appB-B-d", num: "d", text: "When providing transparency about Vendors, the Framework UI must do so only on the basis of the information provided, and declarations made by Vendors as they are published on the Global Vendor List.", tags: ["ui", "vendor-information", "gvl"] },
                        { id: "appB-B-e", num: "e", text: "For the avoidance of doubt, Framework UIs may be used to also provide transparency, and request consent, for purposes and/or vendors, that are not covered by the Framework. However, users must not be misled to believe that any non-Framework purpose and/or vendor are part of the Framework or subject to its Policies. If the Framework UI includes non-Framework purposes and/or vendors the Framework UI must make it possible for users to distinguish between Vendors registered with the Framework, and Purposes defined by the Framework, and those who are not.", tags: ["ui", "non-framework", "transparency"] },
                        { id: "appB-B-f", num: "f", text: "The Framework UI must inform users that their Vendor choices are limited to Purposes and Special Features and that it does not enable them to object to disclosed Vendors processing personal data for Special Purposes and that Special Features may be used for Special Purpose 1 (Ensure security, prevent and detect fraud, and fix errors) regardless of the user's choice about Special Features.", tags: ["ui", "special-purposes", "user-information"] }
                    ]
                },
                {
                    id: "appB-C", section: "C", title: "Specific Requirements for Framework UIs in Connection with Requesting a User's Consent", appliesTo: ["cmp", "publisher"],
                    paragraphs: [
                        { id: "appB-C-a", num: "a", text: "When providing transparency about Purposes, Features and Vendors in connection with requesting a user's consent for the same, the Framework UI's must be displayed prominently and separately from other information, such as the general terms and conditions or the privacy policy, in a modal or banner that covers all or substantially all of the content of the website or app.", tags: ["ui", "initial-layer", "modal", "banner", "prominent"] },
                        { id: "appB-C-b-I", num: "b.I", text: "The Initial Layer must include information about the fact that information is stored on and/or accessed from the user's device (e.g. use of cookies, device identifiers, or other device data).", tags: ["ui", "initial-layer", "device-storage", "cookies"] },
                        { id: "appB-C-b-II", num: "b.II", text: "The Initial Layer must include information about the fact that personal data is processed, and the nature of the personal data processed (e.g. unique identifiers, browsing data).", tags: ["ui", "initial-layer", "personal-data"] },
                        { id: "appB-C-b-III", num: "b.III", text: "The Initial Layer must include information about the fact that third party Vendors will be storing and/or accessing information from the user's device and processing their personal data, the number of third party Vendors (which may also include Vendors not participating in the Framework); and a link to the list of named third parties.", tags: ["ui", "initial-layer", "vendor-count", "vendor-list-link"] },
                        { id: "appB-C-b-IV", num: "b.IV", text: "The Initial Layer must include the list of the distinct and separate Purposes for which the Vendors are processing data, using at least the standardised names and/or Stack names as defined in Appendix A.", tags: ["ui", "initial-layer", "purpose-list", "stacks"] },
                        { id: "appB-C-b-V", num: "b.V", text: "The Initial Layer must include information about the Special Features used by the Vendors when processing data.", tags: ["ui", "initial-layer", "special-features"] },
                        { id: "appB-C-b-VI", num: "b.VI", text: "The Initial Layer should include information about the consequences (if any) of consenting or not consenting (including withdrawing consent).", tags: ["ui", "initial-layer", "consequences", "should"] },
                        { id: "appB-C-b-VII", num: "b.VII", text: "The Initial Layer must include information about the scope of the consent choice, i.e. service-specific consent, or group-specific consent. If group-specific consent, a link with information about the group.", tags: ["ui", "initial-layer", "scope", "consent-scope"] },
                        { id: "appB-C-b-VIII", num: "b.VIII", text: "The Initial Layer must include information about the fact that the user can withdraw their consent at any time, and how to resurface the Framework UI in order to do so.", tags: ["ui", "initial-layer", "consent-withdrawal", "resurface"] },
                        { id: "appB-C-b-IX", num: "b.IX", text: "The Initial Layer should include information about the fact that some Vendors (if any) are not requesting consent, but processing the user's data on the basis of their legitimate interest; the fact that the user has a right to object to such processing; and a link to the relevant layer of the Framework UI dealing with processing on the basis of legitimate interests where more information can be found.", tags: ["ui", "initial-layer", "legitimate-interest", "right-to-object", "should"] },
                        { id: "appB-C-b-X", num: "b.X", text: "The Initial Layer must include a call to action for the user to express their consent (for example \"Accept\", \"Okay\", \"Approve\", etc.).", tags: ["ui", "initial-layer", "cta", "accept-button"] },
                        { id: "appB-C-b-XI", num: "b.XI", text: "The Initial Layer must include a call to action for the user to customise their choices (for example \"Advanced Settings\", \"Customise Choices\", etc.).", tags: ["ui", "initial-layer", "cta", "customize-button"] },
                        { id: "appB-C-c-I", num: "c.I", text: "A secondary layer must allow the user to review: the list of named Vendors and a link to each Vendor's privacy policy, their Purposes, Special Purposes, associated Legal Bases and corresponding retention period, their Features and Special Features and the categories of data collected and processed.", tags: ["ui", "secondary-layer", "vendor-list", "privacy-policy-links", "retention"] },
                        { id: "appB-C-c-II", num: "c.II", text: "A secondary layer must allow the user to review the list of Purposes, Special Purposes, Features, and Special Features including their standard name, their full standard user-friendly text and where applicable their illustrations, as defined in Appendix A, the number of Vendors seeking consent for each of the Purposes (which may also include Vendors not participating in the Framework), and have a way to see those Vendors.", tags: ["ui", "secondary-layer", "purpose-details", "vendor-count"] },
                        { id: "appB-C-c-III", num: "c.III", text: "A secondary layer must allow the user to make granular and specific consent choices with respect to each Vendor, and, separately, each Purpose for which the Publisher chooses to obtain consent on behalf of or more Vendors.", tags: ["ui", "secondary-layer", "granular-consent", "per-vendor", "per-purpose"] },
                        { id: "appB-C-c-IV", num: "c.IV", text: "A secondary layer must allow the user to make granular and specific opt-in choices with respect to each Special Feature for which the Publisher chooses to obtain opt-ins on behalf of one or more Vendors.", tags: ["ui", "secondary-layer", "special-feature", "opt-in"] },
                        { id: "appB-C-c-V", num: "c.V", text: "Where applicable and not disclosed in a 1st layer, a secondary layer must allow the user to view information about the fact that some Vendors are not requesting consent, but processing the user's data on the basis of their legitimate interest; the fact that the user has a right to object to such processing; and a link to the relevant layer of the Framework UI dealing with processing on the basis of legitimate interests.", tags: ["ui", "secondary-layer", "legitimate-interest", "right-to-object"] },
                        { id: "appB-C-c-VI", num: "c.VI", text: "Where not disclosed in a 1st layer, a secondary layer must allow the user to view information about the consequences (if any) of consenting or not consenting (including withdrawing consent).", tags: ["ui", "secondary-layer", "consequences"] },
                        { id: "appB-C-c-VII", num: "c.VII", text: "Where applicable, a secondary layer must allow the user to review Vendors' maximum device storage duration and whether Vendors refresh such duration, as well as any additional purpose specific storage and access information provided by a Vendor in accordance with the Specifications.", tags: ["ui", "secondary-layer", "storage-duration"] },
                        { id: "appB-C-d", num: "d", text: "When a user accesses a layer allowing them to make granular and specific consent choices with respect to each Purpose, and/or to make granular and specific opt-in choices with respect to each Special Feature, the default choice must be \"no consent\", \"no opt-in\" or \"off\".", tags: ["ui", "secondary-layer", "default-off", "no-pre-selection"] },
                        { id: "appB-C-e", num: "e", text: "If a UI displays Vendors who are not registered with IAB Europe for participation in the Framework, the UI must make it possible for users to distinguish between Vendors registered with the Framework, and those who are not. The UI must not mislead others as to the Framework participation of any of the Vendors who are not registered with the MO.", tags: ["ui", "non-gvl-vendors", "distinction"] },
                        { id: "appB-C-f", num: "f", text: "A user must be able to resurface the Framework UI from an easily accessible link or call to action, such as a floating icon or a footer link available on each webpage of the Publisher's website, or from the top-level settings of the Publisher's app as to allow them to withdraw their consent as easily as it was to give it. If a call to action for the user to express their consent for all Purposes and Vendors was provided in the Initial Layer (for example \"Consent to all\"), an equivalent call to action for the user to withdraw their consent for all Purposes and Vendors must be provided in the Framework UI that the user resurfaces (for example \"Withdraw consent to all\").", tags: ["ui", "resurface", "consent-withdrawal", "easy-access", "desktop-app"] },
                        { id: "appB-C-g", num: "g", text: "Calls to action in a Framework UI must not be invisible, illegible, or appear disabled. While calls to action do not need to be identical, to ensure they are clearly visible, they must have matching text treatment (font, font size, font style) and, for the text of each, a minimum contrast ratio of 5 to 1. To the extent that an Initial Layer has more than two calls to action, this policy only applies to the two primary calls to action.", tags: ["ui", "cta", "contrast-ratio", "text-treatment", "accessibility"] },
                        { id: "appB-C-h", num: "h", text: "By way of derogation from Appendix B, Policies C(c)(iii) and (iv) and C(d), a Publisher shall not be required to allow a user to make granular and specific consent or opt-in choices if the Publisher implements a way for the user to access its content without consenting through other means, for example by offering paid access that does not require consenting to any Purposes.", tags: ["ui", "derogation", "paid-access", "granular-consent"] }
                    ]
                },
                {
                    id: "appB-D", section: "D", title: "Specific Requirements for Framework UIs in Connection with Legitimate Interests", appliesTo: ["cmp", "publisher"],
                    paragraphs: [
                        { id: "appB-D-a", num: "a", text: "When providing transparency about Purposes, Special Purposes, Features, Special Features, and Vendors in connection with a legitimate interest for the same, transparency must be provided at least through an easily accessible link to the relevant layer of the Framework UI dealing with processing on the basis of legitimate interests.", tags: ["ui", "legitimate-interest", "transparency", "link"] },
                        { id: "appB-D-b", num: "b", text: "When providing transparency about Purposes, Special Purposes, Features, Special Features, and Vendors in connection with both requesting a user's consent for the same and a legitimate interest, Policy C(a) applies, and the easily accessible link to the relevant layer of the Framework UI dealing with processing on the basis of legitimate interests required under Policy D(a) must be included in the Initial Layer of the Framework UI presented in line with Policy C(a).", tags: ["ui", "legitimate-interest", "consent", "initial-layer"] },
                        { id: "appB-D-c-I", num: "c.I", text: "A single secondary layer for legitimate interests must allow the user to see information about the fact that personal data is processed, and the nature of the personal data processed (e.g. unique identifiers, browsing data).", tags: ["ui", "li-layer", "personal-data"] },
                        { id: "appB-D-c-II", num: "c.II", text: "The legitimate interest layer must include information about the scope of the legitimate interest processing and scope of any objection to such processing, i.e. service-specific scope, or group-specific scope.", tags: ["ui", "li-layer", "scope"] },
                        { id: "appB-D-c-III", num: "c.III", text: "The legitimate interest layer must provide access to controls within the Framework UI to object to processing of their personal data on the basis of a legitimate interest.", tags: ["ui", "li-layer", "right-to-object", "controls"] },
                        { id: "appB-D-c-IV", num: "c.IV", text: "The legitimate interest layer must allow the user to review the list of Purposes and Special Purposes including their standard name and their full standard user-friendly text and where applicable their illustrations, as defined in Appendix A, the number of Vendors processing their data for each of the Purposes on the basis of legitimate interest, and have a way to see those Vendors.", tags: ["ui", "li-layer", "purpose-list", "vendor-count"] },
                        { id: "appB-D-c-V", num: "c.V", text: "The legitimate interest layer must allow the user to exercise their right to object with respect to processing under a legitimate interest for each Vendor, and, separately, each Purpose for which the Publisher chooses to help establish Vendors transparency.", tags: ["ui", "li-layer", "right-to-object", "per-vendor", "per-purpose", "granular"] },
                        { id: "appB-D-c-VI", num: "c.VI", text: "The legitimate interest layer must allow the user to review: the list of named Vendors and a link to each Vendor's privacy policy, their Purposes, Special Purposes, associated Legal Bases (and a link to each Vendor's explanation of its legitimate interest(s) at stake) and corresponding retention period, their Features, Special Features and the categories of data collected and processed.", tags: ["ui", "li-layer", "vendor-list", "privacy-policy-links", "li-explanation"] },
                        { id: "appB-D-c-VII", num: "c.VII", text: "The legitimate interest layer must allow the user to review where applicable the storage and access information relating to the CMP's recording of Signals, including the maximum device storage duration.", tags: ["ui", "li-layer", "storage-duration"] }
                    ]
                }
            ]
        }
    ]
};
