/* ============================================================
   TC String Decoder — TCF v2.x
   Pure JS decoder, no dependencies.
   Spec: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework
   ============================================================ */
window.TCDecoder = (function () {
    'use strict';

    // Purpose names (TCF v2.2)
    const PURPOSE_NAMES = {
        1: 'Store and/or access information on a device',
        2: 'Use limited data to select advertising',
        3: 'Create profiles for personalised advertising',
        4: 'Use profiles to select personalised advertising',
        5: 'Create profiles to personalise content',
        6: 'Use profiles to select personalised content',
        7: 'Measure advertising performance',
        8: 'Measure content performance',
        9: 'Understand audiences through statistics or combinations of data from different sources',
        10: 'Develop and improve services',
        11: 'Use limited data to select content'
    };

    const SPECIAL_FEATURE_NAMES = {
        1: 'Use precise geolocation data',
        2: 'Actively scan device characteristics for identification'
    };

    const SPECIAL_PURPOSE_NAMES = {
        1: 'Ensure security, prevent and detect fraud, and fix errors',
        2: 'Deliver and present advertising and content',
        3: 'Save and communicate privacy choices'
    };

    /* ---- Bit reader ---- */
    function BitReader(base64url) {
        // base64url → standard base64
        let b64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';

        // Decode to byte array
        const raw = atob(b64);
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

        let pos = 0;

        return {
            readBits: function (n) {
                let val = 0;
                for (let i = 0; i < n; i++) {
                    const byteIdx = (pos + i) >> 3;
                    const bitIdx = 7 - ((pos + i) & 7);
                    if (byteIdx < bytes.length) {
                        val = (val << 1) | ((bytes[byteIdx] >> bitIdx) & 1);
                    } else {
                        val = val << 1;
                    }
                }
                pos += n;
                return val;
            },
            readBool: function () {
                return this.readBits(1) === 1;
            },
            readDateDs: function () {
                // 36 bits → deciseconds → ms
                const hi = this.readBits(18);
                const lo = this.readBits(18);
                return new Date((hi * 262144 + lo) * 100);
            },
            readLetter: function () {
                return String.fromCharCode(this.readBits(6) + 65);
            },
            readLang: function () {
                return this.readLetter() + this.readLetter();
            },
            readBitfield: function (n) {
                const set = new Set();
                for (let i = 1; i <= n; i++) {
                    if (this.readBool()) set.add(i);
                }
                return set;
            },
            readVendors: function () {
                const maxId = this.readBits(16);
                const isRange = this.readBool();
                const set = new Set();
                if (isRange) {
                    const numEntries = this.readBits(12);
                    for (let i = 0; i < numEntries; i++) {
                        const isARange = this.readBool();
                        const startId = this.readBits(16);
                        if (isARange) {
                            const endId = this.readBits(16);
                            for (let v = startId; v <= endId; v++) set.add(v);
                        } else {
                            set.add(startId);
                        }
                    }
                } else {
                    for (let v = 1; v <= maxId; v++) {
                        if (this.readBool()) set.add(v);
                    }
                }
                return { maxId: maxId, set: set };
            },
            readPubRestrictions: function () {
                const num = this.readBits(12);
                const restrictions = [];
                for (let i = 0; i < num; i++) {
                    const purposeId = this.readBits(6);
                    const restrictionType = this.readBits(2);
                    const numEntries = this.readBits(12);
                    const vendors = [];
                    for (let j = 0; j < numEntries; j++) {
                        const isRange = this.readBool();
                        const startId = this.readBits(16);
                        if (isRange) {
                            vendors.push({ start: startId, end: this.readBits(16) });
                        } else {
                            vendors.push({ start: startId, end: startId });
                        }
                    }
                    restrictions.push({
                        purposeId: purposeId,
                        restrictionType: restrictionType,
                        vendors: vendors
                    });
                }
                return restrictions;
            },
            position: function () { return pos; },
            bitsLeft: function () { return bytes.length * 8 - pos; }
        };
    }

    /* ---- Decode core segment ---- */
    function decodeCore(reader) {
        const core = {};
        core.version = reader.readBits(6);
        core.created = reader.readDateDs();
        core.lastUpdated = reader.readDateDs();
        core.cmpId = reader.readBits(12);
        core.cmpVersion = reader.readBits(12);
        core.consentScreen = reader.readBits(6);
        core.consentLanguage = reader.readLang();
        core.vendorListVersion = reader.readBits(12);
        core.tcfPolicyVersion = reader.readBits(6);
        core.isServiceSpecific = reader.readBool();
        core.useNonStandardStacks = reader.readBool();
        core.specialFeatureOptins = reader.readBitfield(12);
        core.purposeConsents = reader.readBitfield(24);
        core.purposeLegitimateInterests = reader.readBitfield(24);
        core.purposeOneTreatment = reader.readBool();
        core.publisherCC = reader.readLang();

        const vc = reader.readVendors();
        core.vendorConsents = vc.set;
        core.maxVendorConsentId = vc.maxId;

        const vli = reader.readVendors();
        core.vendorLegitimateInterests = vli.set;
        core.maxVendorLIId = vli.maxId;

        core.publisherRestrictions = reader.readPubRestrictions();

        return core;
    }

    /* ---- Decode additional segments ---- */
    function decodeSegment(reader) {
        const type = reader.readBits(3);
        if (type === 1 || type === 2) {
            // Disclosed Vendors (1) or Allowed Vendors (2)
            const v = reader.readVendors();
            return { type: type, vendors: v.set, maxId: v.maxId };
        } else if (type === 3) {
            // Publisher TC
            const ptc = {};
            ptc.type = 3;
            ptc.purposeConsents = reader.readBitfield(24);
            ptc.purposeLegitimateInterests = reader.readBitfield(24);
            const numCustom = reader.readBits(6);
            ptc.customPurposeConsents = reader.readBitfield(numCustom);
            ptc.customPurposeLegitimateInterests = reader.readBitfield(numCustom);
            return ptc;
        }
        return { type: type };
    }

    /* ---- Main decode function ---- */
    function decode(tcString) {
        if (!tcString || typeof tcString !== 'string') {
            return { error: 'No TC String provided.' };
        }

        const trimmed = tcString.trim();
        if (!trimmed) {
            return { error: 'Empty TC String.' };
        }

        try {
            const segments = trimmed.split('.');
            const coreReader = BitReader(segments[0]);
            const result = decodeCore(coreReader);

            if (result.version < 2) {
                return { error: 'TC String version ' + result.version + ' is not supported. Only TCF v2.x strings are supported.' };
            }

            result.disclosedVendors = null;
            result.allowedVendors = null;
            result.publisherTC = null;

            for (let i = 1; i < segments.length; i++) {
                try {
                    const segReader = BitReader(segments[i]);
                    const seg = decodeSegment(segReader);
                    if (seg.type === 1) {
                        result.disclosedVendors = seg.vendors;
                        result.maxDisclosedVendorId = seg.maxId;
                    } else if (seg.type === 2) {
                        result.allowedVendors = seg.vendors;
                        result.maxAllowedVendorId = seg.maxId;
                    } else if (seg.type === 3) {
                        result.publisherTC = seg;
                    }
                } catch (e) {
                    // Skip malformed optional segments
                }
            }

            result.valid = true;
            return result;
        } catch (e) {
            return { error: 'Failed to decode TC String: ' + e.message };
        }
    }

    /* ---- Render results as HTML ---- */
    function renderResults(result) {
        if (result.error) {
            return '<div class="decode-error">' + escHtml(result.error) + '</div>';
        }

        let html = '';

        // Validity
        html += '<div class="decode-valid">✓ Valid TC String (TCF v' + result.version + ')</div>';

        // Metadata
        html += '<div class="decode-section"><h3>String Metadata</h3><div class="decode-meta">';
        html += metaCard('Version', result.version);
        html += metaCard('Created', fmtDate(result.created));
        html += metaCard('Last Updated', fmtDate(result.lastUpdated));
        html += metaCard('CMP ID', result.cmpId);
        html += metaCard('CMP Version', result.cmpVersion);
        html += metaCard('Consent Screen', result.consentScreen);
        html += metaCard('Consent Language', result.consentLanguage);
        html += metaCard('Vendor List Version', result.vendorListVersion);
        html += metaCard('TCF Policy Version', result.tcfPolicyVersion);
        html += metaCard('Service Specific', result.isServiceSpecific ? 'Yes' : 'No');
        html += metaCard('Publisher Country', result.publisherCC);
        html += metaCard('Purpose 1 Treatment', result.purposeOneTreatment ? 'Yes' : 'No');
        html += '</div></div>';

        // Purpose Consents
        html += '<div class="decode-section"><h3>Purpose Consents</h3>';
        html += purposeBlock(result.purposeConsents, 'Consent', PURPOSE_NAMES, 11);
        html += '</div>';

        // Purpose Legitimate Interests
        html += '<div class="decode-section"><h3>Purpose Legitimate Interests</h3>';
        html += purposeBlock(result.purposeLegitimateInterests, 'Leg. Interest', PURPOSE_NAMES, 11);
        html += '</div>';

        // Special Feature Opt-Ins
        html += '<div class="decode-section"><h3>Special Feature Opt-Ins</h3>';
        html += specialFeatureBlock(result.specialFeatureOptins);
        html += '</div>';

        // Vendor Consents
        html += '<div class="decode-section"><h3>Vendor Consents</h3>';
        html += vendorBlock(result.vendorConsents, result.maxVendorConsentId, 'Consented');
        html += '</div>';

        // Vendor Legitimate Interests
        html += '<div class="decode-section"><h3>Vendor Legitimate Interests</h3>';
        html += vendorBlock(result.vendorLegitimateInterests, result.maxVendorLIId, 'LI Established');
        html += '</div>';

        // Disclosed Vendors
        if (result.disclosedVendors) {
            html += '<div class="decode-section"><h3>Vendors Disclosed</h3>';
            html += vendorBlock(result.disclosedVendors, result.maxDisclosedVendorId, 'Disclosed');
            html += '</div>';
        }

        // Allowed Vendors
        if (result.allowedVendors) {
            html += '<div class="decode-section"><h3>Vendors Allowed</h3>';
            html += vendorBlock(result.allowedVendors, result.maxAllowedVendorId, 'Allowed');
            html += '</div>';
        }

        // Publisher Restrictions
        if (result.publisherRestrictions && result.publisherRestrictions.length > 0) {
            html += '<div class="decode-section"><h3>Publisher Restrictions</h3>';
            html += pubRestrictionsTable(result.publisherRestrictions);
            html += '</div>';
        }

        // Publisher TC
        if (result.publisherTC) {
            html += '<div class="decode-section"><h3>Publisher TC Segment</h3>';
            html += '<p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">Publisher-specific purpose consents and legitimate interests.</p>';
            html += purposeBlock(result.publisherTC.purposeConsents, 'Consent', PURPOSE_NAMES, 11);
            html += '</div>';
        }

        return html;
    }

    /* ---- Helpers ---- */
    function escHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function fmtDate(d) {
        if (!(d instanceof Date) || isNaN(d)) return '—';
        return d.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC');
    }

    function metaCard(label, value) {
        return '<div class="meta-item"><span class="meta-label">' + escHtml(label) + '</span><span class="meta-value">' + escHtml(String(value)) + '</span></div>';
    }

    function purposeBlock(set, colName, nameMap, maxId) {
        var consentedCount = 0;
        var totalCount = maxId || 11;
        for (var i = 1; i <= totalCount; i++) {
            if (set.has(i)) consentedCount++;
        }
        var uid = 'plist-' + colName.replace(/\s+/g, '') + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);

        var html = '<div class="vendor-summary"><strong>' + consentedCount + '</strong> of ' + totalCount + ' purposes with ' + colName.toLowerCase() + '</div>';
        html += '<button class="vendor-expand-toggle" data-target="' + uid + '" data-purpose-expand="1">Show details ▾</button>';
        html += '<div class="vendor-list-expandable" id="' + uid + '" hidden>';
        html += '<table class="purpose-table"><thead><tr><th>#</th><th>Purpose</th><th>' + escHtml(colName) + '</th></tr></thead><tbody>';
        for (var j = 1; j <= totalCount; j++) {
            var has = set.has(j);
            html += '<tr><td>' + j + '</td><td>' + escHtml((nameMap && nameMap[j]) || 'Purpose ' + j) + '</td>';
            html += '<td class="' + (has ? 'status-yes' : 'status-no') + '">' + (has ? '✓ Yes' : '✗ No') + '</td></tr>';
        }
        html += '</tbody></table></div>';
        return html;
    }

    function specialFeatureBlock(set) {
        var consentedCount = 0;
        for (var i = 1; i <= 2; i++) {
            if (set.has(i)) consentedCount++;
        }
        var uid = 'sflist-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);

        var html = '<div class="vendor-summary"><strong>' + consentedCount + '</strong> of 2 special features opted in</div>';
        html += '<button class="vendor-expand-toggle" data-target="' + uid + '" data-purpose-expand="1">Show details ▾</button>';
        html += '<div class="vendor-list-expandable" id="' + uid + '" hidden>';
        html += '<table class="purpose-table"><thead><tr><th>#</th><th>Special Feature</th><th>Opt-In</th></tr></thead><tbody>';
        for (var j = 1; j <= 2; j++) {
            var has = set.has(j);
            html += '<tr><td>' + j + '</td><td>' + escHtml(SPECIAL_FEATURE_NAMES[j] || 'Special Feature ' + j) + '</td>';
            html += '<td class="' + (has ? 'status-yes' : 'status-no') + '">' + (has ? '✓ Yes' : '✗ No') + '</td></tr>';
        }
        html += '</tbody></table></div>';
        return html;
    }

    function vendorBlock(set, maxId, label) {
        const count = set.size;
        let html = '<div class="vendor-summary"><strong>' + count + '</strong> vendor' + (count !== 1 ? 's' : '') + ' ' + label.toLowerCase();
        if (maxId > 0) html += ' (max ID: ' + maxId + ')';
        html += '</div>';

        if (count > 0) {
            const ids = Array.from(set).sort(function (a, b) { return a - b; });
            const uid = 'vlist-' + label.replace(/\s+/g, '') + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
            html += '<button class="vendor-expand-toggle" data-target="' + uid + '" data-vendor-ids="' + escHtml(JSON.stringify(ids)) + '">Show ' + count + ' vendor' + (count !== 1 ? 's' : '') + ' ▾</button>';
            html += '<div class="vendor-list-expandable" id="' + uid + '" hidden></div>';
        }
        return html;
    }

    // Resolve vendor name directly from the bundled GVL data (loaded via <script> tag)
    function resolveVendorName(id) {
        // Try VendorSearch module first (it reads from window.__GVL_DATA)
        if (window.VendorSearch && window.VendorSearch.isLoaded()) {
            var name = window.VendorSearch.getVendorName(id);
            if (name) return name;
        }
        // Direct fallback to the global data
        if (window.__GVL_DATA && window.__GVL_DATA.vendors && window.__GVL_DATA.vendors[id]) {
            return window.__GVL_DATA.vendors[id].name;
        }
        return null;
    }

    function renderVendorList(ids) {
        var listId = 'vnl-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        var html = '<input type="text" class="vendor-list-search" placeholder="Filter vendors\u2026" data-list="' + listId + '" autocomplete="off">';
        html += '<div class="vendor-name-list" id="' + listId + '">';
        ids.forEach(function (id) {
            var name = resolveVendorName(id);
            var displayName = name || 'Vendor ' + id;
            html += '<div class="vendor-name-row" data-search-text="' + escHtml((id + ' ' + displayName).toLowerCase()) + '"><span class="vendor-id-num">' + id + '</span>';
            html += '<span class="vendor-name-text">' + escHtml(displayName) + '</span></div>';
        });
        html += '</div>';
        return html;
    }

    // Delegated input handler for vendor list search
    document.addEventListener('input', function (e) {
        if (!e.target.classList.contains('vendor-list-search')) return;
        var listId = e.target.getAttribute('data-list');
        var list = document.getElementById(listId);
        if (!list) return;
        var term = e.target.value.toLowerCase().trim();
        var rows = list.querySelectorAll('.vendor-name-row');
        rows.forEach(function (row) {
            var text = row.getAttribute('data-search-text') || '';
            row.style.display = (!term || text.indexOf(term) !== -1) ? '' : 'none';
        });
    });

    // Delegated click handler for vendor/purpose expand toggles
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest('.vendor-expand-toggle');
        if (!toggle) return;

        var targetId = toggle.getAttribute('data-target');
        var container = document.getElementById(targetId);
        if (!container) return;

        var isHidden = container.hidden;
        var isPurposeToggle = toggle.hasAttribute('data-purpose-expand');

        if (isPurposeToggle) {
            // Purpose/Special Feature toggle — content already in DOM
            container.hidden = !isHidden;
            toggle.textContent = isHidden ? 'Hide details ▴' : 'Show details ▾';
            return;
        }

        if (isHidden) {
            // Populate list on first expand
            if (!container.dataset.loaded) {
                var ids;
                try { ids = JSON.parse(toggle.getAttribute('data-vendor-ids')); } catch (_) { return; }

                function showList() {
                    container.innerHTML = renderVendorList(ids);
                    container.dataset.loaded = '1';
                    container.hidden = false;
                    toggle.textContent = 'Hide vendor list ▴';
                }

                // Data is already available from script tags — show immediately
                showList();
            } else {
                container.hidden = false;
                toggle.textContent = 'Hide vendor list ▴';
            }
        } else {
            container.hidden = true;
            var ids2;
            try { ids2 = JSON.parse(toggle.getAttribute('data-vendor-ids')); } catch (_) { ids2 = []; }
            toggle.textContent = 'Show ' + ids2.length + ' vendor' + (ids2.length !== 1 ? 's' : '') + ' ▾';
        }
    });

    function pubRestrictionsTable(restrictions) {
        const typeNames = ['Not Allowed', 'Require Consent', 'Require Legitimate Interest', 'Undefined'];
        let html = '<table class="purpose-table"><thead><tr><th>Purpose</th><th>Restriction</th><th>Vendors</th></tr></thead><tbody>';
        restrictions.forEach(function (r) {
            const vendorStr = r.vendors.map(function (v) {
                return v.start === v.end ? String(v.start) : v.start + '-' + v.end;
            }).join(', ');
            html += '<tr><td>' + r.purposeId + '</td><td>' + escHtml(typeNames[r.restrictionType] || 'Unknown') + '</td><td style="font-family:var(--font-mono);font-size:12px">' + escHtml(vendorStr) + '</td></tr>';
        });
        html += '</tbody></table>';
        return html;
    }

    return {
        decode: decode,
        renderResults: renderResults,
        PURPOSE_NAMES: PURPOSE_NAMES,
        SPECIAL_FEATURE_NAMES: SPECIAL_FEATURE_NAMES,
        SPECIAL_PURPOSE_NAMES: SPECIAL_PURPOSE_NAMES
    };
})();
