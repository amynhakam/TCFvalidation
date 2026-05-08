window.TCF_CROSSREF = {
    version: "1.0",

    // Maps policy section IDs to related controls, playbook steps, and purposes
    policyToControls: {
        "ch2-4-1": ["cmp-tech-1"],
        "ch2-4-3": ["cmp-tech-1", "cmp-tech-2"],
        "ch2-4-4": ["cmp-tech-1"],
        "ch2-5-2": ["cmp-tech-2"],
        "ch2-5-3": ["cmp-tech-1", "cmp-tech-3", "cmp-res-2"],
        "ch2-5-4": ["cmp-tech-3", "cmp-sec-1", "cmp-sec-2"],
        "ch2-5-5": ["cmp-tech-3"],
        "ch2-5-7": ["cmp-res-1"],
        "ch2-5-8": ["cmp-tech-2"],
        "ch3-9-3": ["vendor-reg-4"],
        "ch3-9-5": ["vendor-tech-2", "vendor-reg-1", "vendor-reg-2"],
        "ch3-10-2": ["vendor-reg-3"],
        "ch3-12-3": ["vendor-tech-1"],
        "ch3-12-4": ["vendor-tech-1", "vendor-tech-5"],
        "ch3-12-5": ["vendor-tech-1", "vendor-tech-5"],
        "ch3-12-6": ["vendor-tech-3"],
        "ch3-13-6": ["vendor-tech-4"],
        "ch3-14-8": ["vendor-tech-2", "vendor-reg-2"],
        "ch3-14-9": ["vendor-tech-2"],
        "ch4-21-8": ["cmp-res-1"],
        "ch4-21-11": ["cmp-res-1"],
        "appB-B-b": ["cmp-pol-1"],
        "appB-C-a": ["cmp-pol-14"],
        "appB-C-b-I": ["cmp-pol-4"],
        "appB-C-b-II": ["cmp-pol-5"],
        "appB-C-b-III": ["cmp-pol-2"],
        "appB-C-b-IV": ["cmp-pol-1"],
        "appB-C-b-V": ["cmp-pol-6"],
        "appB-C-b-VI": ["cmp-pol-13"],
        "appB-C-b-VII": ["cmp-pol-7"],
        "appB-C-b-VIII": ["cmp-pol-8"],
        "appB-C-b-IX": ["cmp-pol-12"],
        "appB-C-b-X": ["cmp-pol-9"],
        "appB-C-b-XI": ["cmp-pol-10"],
        "appB-C-c-I": ["cmp-sec-4"],
        "appB-C-c-II": ["cmp-sec-5"],
        "appB-C-c-III": ["cmp-sec-1", "cmp-sec-2"],
        "appB-C-c-IV": ["cmp-sec-3"],
        "appB-C-c-V": ["cmp-sec-6"],
        "appB-C-c-VII": ["cmp-sec-7"],
        "appB-C-d": ["cmp-pol-3", "cmp-sec-8"],
        "appB-C-f": ["cmp-res-3"],
        "appB-C-g": ["cmp-pol-11"],
        "appB-D-c-I": ["cmp-li-1"],
        "appB-D-c-II": ["cmp-li-2"],
        "appB-D-c-III": ["cmp-li-3"],
        "appB-D-c-IV": ["cmp-li-6"],
        "appB-D-c-V": ["cmp-li-4"],
        "appB-D-c-VI": ["cmp-li-5"]
    },

    // Maps control IDs to related playbook step IDs
    controlToPlaybook: {
        "cmp-tech-1": ["step-c", "step-j"],
        "cmp-tech-2": ["step-d", "step-f", "step-k", "step-m"],
        "cmp-tech-3": ["step-b", "step-g", "step-h", "step-n", "step-o"],
        "cmp-pol-9": ["step-b", "step-i"],
        "cmp-pol-14": ["step-b", "step-i"],
        "cmp-sec-1": ["step-g", "step-n"],
        "cmp-sec-2": ["step-g", "step-n"],
        "cmp-res-2": ["step-c", "step-h", "step-j", "step-o"],
        "cmp-res-3": ["step-g", "step-h", "step-n", "step-o"],
        "cmp-li-3": ["step-h", "step-o"]
    },

    // Maps playbook steps to related policy section IDs
    playbookToPolicy: {
        "step-b": ["appB-C-a", "appB-C-b-X"],
        "step-c": ["ch2-4-1", "ch2-4-3", "ch2-5-3"],
        "step-f": ["ch2-4-3", "ch2-5-8"],
        "step-g": ["appB-C-c-III", "ch2-5-4"],
        "step-h": ["appB-C-b-X", "ch2-5-3", "ch2-5-4"],
        "step-i": ["appB-C-a", "appB-C-b-X"],
        "step-j": ["ch2-4-1", "ch2-4-3", "ch2-5-3"],
        "step-n": ["appB-C-c-III", "ch2-5-4"],
        "step-o": ["appB-C-b-X", "ch2-5-3", "ch2-5-4"]
    },

    // Maps purposes to relevant policy sections and controls
    purposeToPolicy: {
        "purpose-1": ["ch2-4-1", "appB-C-b-I"],
        "purpose-2": ["appB-C-b-IV"],
        "purpose-3": ["appB-C-b-IV"],
        "purpose-4": ["appB-C-b-IV"],
        "purpose-5": ["appB-C-b-IV"],
        "purpose-6": ["appB-C-b-IV"],
        "purpose-7": ["appB-C-b-IV"],
        "purpose-8": ["appB-C-b-IV"],
        "purpose-9": ["appB-C-b-IV"],
        "purpose-10": ["appB-C-b-IV"],
        "purpose-11": ["appB-C-b-IV"]
    },

    // Topic clusters for search relevance
    topicClusters: {
        "consent-string": {
            label: "TC String & Consent Signals",
            policies: ["ch2-4-1", "ch2-4-3", "ch2-4-4", "ch2-5-3"],
            controls: ["cmp-tech-1", "cmp-tech-2", "cmp-tech-3"],
            playbook: ["step-c", "step-j"],
            purposes: []
        },
        "initial-layer": {
            label: "Initial Layer / First Layer UI",
            policies: ["appB-C-a", "appB-C-b-I", "appB-C-b-II", "appB-C-b-III", "appB-C-b-IV", "appB-C-b-V", "appB-C-b-VI", "appB-C-b-VII", "appB-C-b-VIII", "appB-C-b-IX", "appB-C-b-X", "appB-C-b-XI"],
            controls: ["cmp-pol-1", "cmp-pol-2", "cmp-pol-3", "cmp-pol-4", "cmp-pol-5", "cmp-pol-6", "cmp-pol-7", "cmp-pol-8", "cmp-pol-9", "cmp-pol-10", "cmp-pol-11", "cmp-pol-12", "cmp-pol-13", "cmp-pol-14"],
            playbook: ["step-b", "step-i"],
            purposes: []
        },
        "secondary-layer": {
            label: "Secondary Layer / Granular Controls",
            policies: ["appB-C-c-I", "appB-C-c-II", "appB-C-c-III", "appB-C-c-IV", "appB-C-c-V", "appB-C-c-VII", "appB-C-d"],
            controls: ["cmp-sec-1", "cmp-sec-2", "cmp-sec-3", "cmp-sec-4", "cmp-sec-5", "cmp-sec-6", "cmp-sec-7", "cmp-sec-8"],
            playbook: ["step-g", "step-n"],
            purposes: []
        },
        "legitimate-interest": {
            label: "Legitimate Interest & Right to Object",
            policies: ["appB-C-b-IX", "appB-D-c-I", "appB-D-c-II", "appB-D-c-III", "appB-D-c-IV", "appB-D-c-V", "appB-D-c-VI"],
            controls: ["cmp-li-1", "cmp-li-2", "cmp-li-3", "cmp-li-4", "cmp-li-5", "cmp-li-6"],
            playbook: ["step-h", "step-o"],
            purposes: []
        },
        "consent-withdrawal": {
            label: "Consent Withdrawal & State Changes",
            policies: ["appB-C-b-VIII", "appB-C-f", "ch2-5-4", "ch2-5-7"],
            controls: ["cmp-res-1", "cmp-res-2", "cmp-res-3"],
            playbook: ["step-g", "step-h", "step-n", "step-o"],
            purposes: []
        },
        "vendor-compliance": {
            label: "Vendor Compliance & GVL",
            policies: ["ch3-9-3", "ch3-9-5", "ch3-10-2", "ch3-12-3", "ch3-12-4", "ch3-12-5", "ch3-12-6", "ch3-13-6", "ch3-14-8", "ch3-14-9"],
            controls: ["vendor-tech-1", "vendor-tech-2", "vendor-tech-3", "vendor-tech-4", "vendor-tech-5", "vendor-reg-1", "vendor-reg-2", "vendor-reg-3", "vendor-reg-4"],
            playbook: [],
            purposes: []
        },
        "enforcement": {
            label: "Enforcement & Suspension",
            policies: [],
            controls: ["enforce-1", "enforce-2", "enforce-3"],
            playbook: [],
            purposes: []
        },
        "sync-pixel": {
            label: "Ad Sync Pixel & ID Mapping",
            policies: [],
            controls: ["cmp-tech-2"],
            playbook: ["step-d", "step-e", "step-f", "step-k", "step-l", "step-m"],
            purposes: []
        }
    },

    // Helper: get all related items for a given ID
    getRelated: function(id) {
        const result = { policies: [], controls: [], playbook: [], purposes: [] };

        // Check policyToControls
        if (this.policyToControls[id]) {
            result.controls = [...new Set(this.policyToControls[id])];
        }

        // Check controlToPlaybook
        if (this.controlToPlaybook[id]) {
            result.playbook = [...new Set(this.controlToPlaybook[id])];
        }

        // Check playbookToPolicy
        if (this.playbookToPolicy[id]) {
            result.policies = [...new Set(this.playbookToPolicy[id])];
        }

        // Check purposeToPolicy
        if (this.purposeToPolicy[id]) {
            result.policies = [...new Set(this.purposeToPolicy[id])];
        }

        // Reverse lookups
        for (const [policyId, controlIds] of Object.entries(this.policyToControls)) {
            if (controlIds.includes(id)) {
                result.policies.push(policyId);
            }
        }
        for (const [controlId, playbookIds] of Object.entries(this.controlToPlaybook)) {
            if (playbookIds.includes(id)) {
                result.controls.push(controlId);
            }
        }

        // Deduplicate
        result.policies = [...new Set(result.policies)];
        result.controls = [...new Set(result.controls)];
        result.playbook = [...new Set(result.playbook)];
        result.purposes = [...new Set(result.purposes)];

        return result;
    },

    // Helper: get topic clusters containing this ID
    getClusters: function(id) {
        const clusters = [];
        for (const [key, cluster] of Object.entries(this.topicClusters)) {
            if (cluster.policies.includes(id) || cluster.controls.includes(id) ||
                cluster.playbook.includes(id) || cluster.purposes.includes(id)) {
                clusters.push({ key, ...cluster });
            }
        }
        return clusters;
    }
};
