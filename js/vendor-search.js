/* ============================================================
   Vendor Search — TCF Policy Tool
   Searches IAB GVL and Additional Vendor Information List
   Sources:
   - https://vendor-list.consensu.org/v3/vendor-list.json
   - https://vendor-list.consensu.org/v2/additional-vendor-information-list.json
   ============================================================ */
window.VendorSearch = (function () {
    'use strict';

    // Data loaded from bundled <script> tags (window.__GVL_DATA / window.__AVI_DATA)
    // These are set by data/gvl-vendor-list.js and data/avi-list.js
    var gvlData = window.__GVL_DATA || null;
    var aviData = window.__AVI_DATA || null;
    var loading = false;
    var loaded = !!(gvlData || aviData);
    var loadCallbacks = [];

    /* ---- Load data (already available from script tags, or fetch as fallback) ---- */
    function loadData(callback) {
        if (loaded) { callback(null); return; }
        if (loading) { loadCallbacks.push(callback); return; }

        loading = true;
        loadCallbacks.push(callback);

        var done = 0;
        var errors = [];

        function checkDone() {
            done++;
            if (done === 2) {
                loading = false;
                loaded = !!(gvlData || aviData);
                var err = errors.length === 2 ? errors.join('; ') : null;
                loadCallbacks.forEach(function (cb) { cb(err); });
                loadCallbacks = [];
            }
        }

        // Fallback: fetch from remote if script-tag data wasn't available
        function doFetch(remoteUrl, onSuccess) {
            fetch(remoteUrl)
                .then(function (r) {
                    if (!r.ok) throw new Error('HTTP ' + r.status);
                    return r.json();
                })
                .then(function (data) { onSuccess(data); checkDone(); })
                .catch(function (e) {
                    errors.push(remoteUrl.split('/').pop() + ': ' + e.message);
                    checkDone();
                });
        }

        if (!gvlData) {
            doFetch('https://vendor-list.consensu.org/v3/vendor-list.json', function (data) { gvlData = data; });
        } else { checkDone(); }
        if (!aviData) {
            doFetch('https://vendor-list.consensu.org/v2/additional-vendor-information-list.json', function (data) { aviData = data; });
        } else { checkDone(); }
    }

    /* ---- Get vendor name by ID (used by TC decoder) ---- */
    function getVendorName(id) {
        if (gvlData && gvlData.vendors && gvlData.vendors[id]) {
            return gvlData.vendors[id].name;
        }
        if (aviData && aviData.vendors && aviData.vendors[id]) {
            return aviData.vendors[id].name;
        }
        return null;
    }

    function isLoaded() { return loaded; }

    /* ---- Replace cached data with freshly fetched data (used by live data refresh) ---- */
    function setData(gvl, avi) {
        if (gvl) gvlData = gvl;
        if (avi) aviData = avi;
        loaded = !!(gvlData || aviData);
    }

    /* ---- Search ---- */
    function search(query, callback) {
        loadData(function (err) {
            if (err && !gvlData && !aviData) {
                callback({ error: 'Failed to load vendor data: ' + err + '. Try running refresh-vendor-data.ps1 to download the data files.' });
                return;
            }
            var results = performSearch(query);
            callback(results);
        });
    }

    function performSearch(query) {
        var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
        if (terms.length === 0) return { vendors: [], purposes: [] };

        var vendorMatches = [];
        var purposeMatches = [];

        // Search GVL purposes
        if (gvlData && gvlData.purposes) {
            Object.keys(gvlData.purposes).forEach(function (key) {
                var p = gvlData.purposes[key];
                var searchText = (p.name + ' ' + p.description + ' ' + (p.illustrations || []).join(' ')).toLowerCase();
                var matchCount = 0;
                terms.forEach(function (t) { if (searchText.indexOf(t) !== -1) matchCount++; });
                if (matchCount > 0) {
                    purposeMatches.push({ purpose: p, score: matchCount });
                }
            });
            purposeMatches.sort(function (a, b) { return b.score - a.score; });
        }

        // Search GVL vendors
        if (gvlData && gvlData.vendors) {
            Object.keys(gvlData.vendors).forEach(function (key) {
                var v = gvlData.vendors[key];
                var searchText = (v.name || '').toLowerCase();
                var matchCount = 0;
                terms.forEach(function (t) { if (searchText.indexOf(t) !== -1) matchCount++; });
                if (matchCount > 0) {
                    vendorMatches.push({ vendor: v, score: matchCount * 10, source: 'gvl' });
                }
            });
        }

        // Search AVI vendors
        if (aviData && aviData.vendors) {
            Object.keys(aviData.vendors).forEach(function (key) {
                var v = aviData.vendors[key];
                var searchText = ((v.name || '') + ' ' + (v.serviceTypes || []).join(' ')).toLowerCase();
                var matchCount = 0;
                terms.forEach(function (t) { if (searchText.indexOf(t) !== -1) matchCount++; });
                if (matchCount > 0) {
                    // Check if already in vendorMatches from GVL
                    var existing = null;
                    for (var i = 0; i < vendorMatches.length; i++) {
                        if (vendorMatches[i].vendor.id === v.id) {
                            existing = vendorMatches[i];
                            break;
                        }
                    }
                    if (existing) {
                        existing.avi = v;
                        existing.score += matchCount * 5;
                    } else {
                        vendorMatches.push({ vendor: v, avi: v, score: matchCount * 5, source: 'avi' });
                    }
                }
            });
        }

        // Enrich vendor matches with AVI data if not already
        if (aviData && aviData.vendors) {
            vendorMatches.forEach(function (m) {
                if (!m.avi && aviData.vendors[m.vendor.id]) {
                    m.avi = aviData.vendors[m.vendor.id];
                }
            });
        }

        // Enrich vendor matches with GVL data if came from AVI only
        if (gvlData && gvlData.vendors) {
            vendorMatches.forEach(function (m) {
                if (m.source === 'avi' && gvlData.vendors[m.vendor.id]) {
                    m.vendor = gvlData.vendors[m.vendor.id];
                    m.source = 'both';
                }
            });
        }

        vendorMatches.sort(function (a, b) { return b.score - a.score; });

        return {
            vendors: vendorMatches.slice(0, 30),
            purposes: purposeMatches.slice(0, 11)
        };
    }

    /* ---- Render results ---- */
    function renderResults(results, query) {
        if (results.error) {
            return '<div class="no-results"><strong>Error:</strong> ' + escHtml(results.error) + '</div>';
        }

        var totalCount = results.vendors.length + results.purposes.length;
        if (totalCount === 0) {
            return '<div class="no-results">No vendor or purpose matches found for "<strong>' + escHtml(query) + '</strong>".<br><span style="font-size:13px;">Try a vendor name or purpose keyword (e.g. "advertising", "analytics", "Microsoft").</span></div>';
        }

        var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
        var html = '';

        // Tabs: Vendors | Purposes
        var activeTab = results.vendors.length > 0 ? 'vendors' : 'purposes';
        html += '<div class="search-tabs">';
        html += '<button class="search-tab' + (activeTab === 'vendors' ? ' active' : '') + (results.vendors.length === 0 ? ' disabled' : '') + '" data-tab="gvl-vendors">Vendors<span class="tab-count">' + results.vendors.length + '</span></button>';
        html += '<button class="search-tab' + (activeTab === 'purposes' ? ' active' : '') + (results.purposes.length === 0 ? ' disabled' : '') + '" data-tab="gvl-purposes">Purposes<span class="tab-count">' + results.purposes.length + '</span></button>';
        html += '</div>';

        // Vendors tab
        html += '<div class="search-tab-content" id="tab-gvl-vendors"' + (activeTab !== 'vendors' ? ' hidden' : '') + '>';
        if (results.vendors.length === 0) {
            html += '<div class="no-results">No vendor matches.</div>';
        } else {
            results.vendors.forEach(function (m, idx) {
                html += renderVendor(m, terms, idx);
            });
            html += '<div class="tab-source-link">Sources: <a href="https://vendor-list.consensu.org/v3/vendor-list.json" target="_blank" rel="noopener">IAB GVL v3</a> · <a href="https://vendor-list.consensu.org/v2/additional-vendor-information-list.json" target="_blank" rel="noopener">Additional Vendor Information List</a></div>';
        }
        html += '</div>';

        // Purposes tab
        html += '<div class="search-tab-content" id="tab-gvl-purposes"' + (activeTab !== 'purposes' ? ' hidden' : '') + '>';
        if (results.purposes.length === 0) {
            html += '<div class="no-results">No purpose matches.</div>';
        } else {
            results.purposes.forEach(function (m) {
                html += renderPurpose(m, terms);
            });
            html += '<div class="tab-source-link">Source: <a href="https://vendor-list.consensu.org/v3/vendor-list.json" target="_blank" rel="noopener">IAB Global Vendor List v3</a></div>';
        }
        html += '</div>';

        return html;
    }

    /* ---- Render a vendor match (collapsible) ---- */
    function renderVendor(match, terms, idx) {
        var v = match.vendor;
        var avi = match.avi;
        var uid = 'vendor-detail-' + v.id + '-' + idx;

        // Header row (always visible)
        var html = '<div class="result-item vendor-result vendor-collapsible">';
        html += '<button class="vendor-collapse-toggle" data-target="' + uid + '" aria-expanded="false">';
        html += '<span class="vendor-collapse-name">' + highlight(v.name || '(Unknown)', terms) + ' <span class="vendor-collapse-arrow">▾</span></span>';
        html += '<span class="vendor-collapse-meta">';
        html += '<span class="vendor-id">ID: ' + v.id + '</span>';
        // Summary chips
        if (v.purposes && v.purposes.length > 0) {
            html += '<span class="vendor-chip">' + v.purposes.length + ' purpose' + (v.purposes.length !== 1 ? 's' : '') + '</span>';
        }
        if (v.legIntPurposes && v.legIntPurposes.length > 0) {
            html += '<span class="vendor-chip leg-int">' + v.legIntPurposes.length + ' leg. int.</span>';
        }
        if (v.dataRetention && v.dataRetention.stdRetention != null) {
            html += '<span class="vendor-chip retention">' + v.dataRetention.stdRetention + 'd retention</span>';
        }
        html += '</span>';
        html += '</button>';

        // Detail body (hidden by default)
        html += '<div class="vendor-collapse-body" id="' + uid + '" hidden>';

        // Purposes (consent-based)
        if (v.purposes && v.purposes.length > 0) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Consent Purposes</div>';
            html += '<div class="vendor-detail-list">';
            v.purposes.forEach(function (pid) {
                var pName = getPurposeName(pid);
                html += '<div class="vendor-purpose-row"><span class="vendor-tag">' + pid + '</span><span>' + escHtml(pName || 'Purpose ' + pid) + '</span></div>';
            });
            html += '</div></div>';
        }

        // Legitimate Interest Purposes
        if (v.legIntPurposes && v.legIntPurposes.length > 0) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Legitimate Interest Purposes</div>';
            html += '<div class="vendor-detail-list">';
            v.legIntPurposes.forEach(function (pid) {
                var pName = getPurposeName(pid);
                html += '<div class="vendor-purpose-row"><span class="vendor-tag leg-int">' + pid + '</span><span>' + escHtml(pName || 'Purpose ' + pid) + '</span></div>';
            });
            html += '</div></div>';
        }

        // Special Purposes
        if (v.specialPurposes && v.specialPurposes.length > 0) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Special Purposes</div>';
            html += '<div class="vendor-detail-list">';
            v.specialPurposes.forEach(function (pid) {
                html += '<div class="vendor-purpose-row"><span class="vendor-tag special">' + pid + '</span><span>Special Purpose ' + pid + '</span></div>';
            });
            html += '</div></div>';
        }

        // Data Retention
        if (v.dataRetention) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Data Retention</div>';
            html += '<div class="vendor-detail-list">';
            if (v.dataRetention.stdRetention != null) {
                html += '<div class="vendor-purpose-row"><span class="vendor-tag retention">std</span><span>' + v.dataRetention.stdRetention + ' days</span></div>';
            }
            if (v.dataRetention.purposes) {
                Object.keys(v.dataRetention.purposes).forEach(function (pid) {
                    html += '<div class="vendor-purpose-row"><span class="vendor-tag">P' + pid + '</span><span>' + v.dataRetention.purposes[pid] + ' days</span></div>';
                });
            }
            if (v.dataRetention.specialPurposes) {
                Object.keys(v.dataRetention.specialPurposes).forEach(function (pid) {
                    html += '<div class="vendor-purpose-row"><span class="vendor-tag special">SP' + pid + '</span><span>' + v.dataRetention.specialPurposes[pid] + ' days</span></div>';
                });
            }
            html += '</div></div>';
        }

        // Cookies & Storage
        html += '<div class="vendor-detail-section">';
        html += '<div class="vendor-detail-label">Storage</div>';
        html += '<div class="vendor-detail-list">';
        if (v.usesCookies !== undefined) {
            html += '<div class="vendor-purpose-row"><span>Cookies:</span><span>' + (v.usesCookies ? 'Yes' : 'No');
            if (v.cookieMaxAgeSeconds != null) {
                html += ' (max ' + Math.round(v.cookieMaxAgeSeconds / 86400) + ' days)';
            }
            html += '</span></div>';
        }
        if (v.usesNonCookieAccess !== undefined) {
            html += '<div class="vendor-purpose-row"><span>Non-Cookie Access:</span><span>' + (v.usesNonCookieAccess ? 'Yes' : 'No') + '</span></div>';
        }
        html += '</div></div>';

        // Features
        if ((v.features && v.features.length > 0) || (v.specialFeatures && v.specialFeatures.length > 0)) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Features</div>';
            html += '<div class="vendor-detail-list">';
            if (v.features && v.features.length > 0) {
                html += '<div class="vendor-purpose-row"><span>Features:</span><span>' + v.features.join(', ') + '</span></div>';
            }
            if (v.specialFeatures && v.specialFeatures.length > 0) {
                html += '<div class="vendor-purpose-row"><span>Special Features:</span><span>' + v.specialFeatures.join(', ') + '</span></div>';
            }
            html += '</div></div>';
        }

        // Privacy Policy URL
        if (v.urls && v.urls.length > 0) {
            var enUrl = v.urls.find(function (u) { return u.langId === 'en'; }) || v.urls[0];
            if (enUrl && enUrl.privacy) {
                html += '<div class="vendor-detail-section">';
                html += '<div class="vendor-detail-label">Links</div>';
                html += '<div class="vendor-detail-list">';
                html += '<div class="vendor-purpose-row"><span>Privacy Policy:</span><span><a href="' + escHtml(enUrl.privacy) + '" target="_blank" rel="noopener">' + escHtml(enUrl.privacy) + '</a></span></div>';
                if (enUrl.legIntClaim) {
                    html += '<div class="vendor-purpose-row"><span>Leg. Int. Claim:</span><span><a href="' + escHtml(enUrl.legIntClaim) + '" target="_blank" rel="noopener">View</a></span></div>';
                }
                html += '</div></div>';
            }
        }

        // AVI data
        if (avi) {
            html += '<div class="vendor-detail-section">';
            html += '<div class="vendor-detail-label">Additional Information</div>';
            html += '<div class="vendor-detail-list">';
            if (avi.legalAddress) {
                html += '<div class="vendor-purpose-row"><span>Legal Address:</span><span>' + escHtml(avi.legalAddress) + '</span></div>';
            }
            if (avi.contact) {
                html += '<div class="vendor-purpose-row"><span>Contact:</span><span>' + escHtml(avi.contact) + '</span></div>';
            }
            if (avi.serviceTypes && avi.serviceTypes.length > 0) {
                html += '<div class="vendor-purpose-row"><span>Service Types:</span><span>' + avi.serviceTypes.map(function (s) {
                    return '<span class="vendor-tag">' + escHtml(s) + '</span>';
                }).join(' ') + '</span></div>';
            }
            if (avi.territorialScope && avi.territorialScope.length > 0) {
                html += '<div class="vendor-purpose-row"><span>Territorial Scope:</span><span>' + avi.territorialScope.join(', ') + '</span></div>';
            }
            if (avi.internationalTransfers !== undefined) {
                html += '<div class="vendor-purpose-row"><span>Int\'l Transfers:</span><span>' + (avi.internationalTransfers ? 'Yes' : 'No');
                if (avi.transferMechanisms && avi.transferMechanisms.length > 0) {
                    html += ' (' + avi.transferMechanisms.join(', ') + ')';
                }
                html += '</span></div>';
            }
            html += '</div></div>';
        }

        html += '</div>'; // vendor-collapse-body
        html += '</div>'; // vendor-result
        return html;
    }

    /* ---- Render a purpose match ---- */
    function renderPurpose(match, terms) {
        var p = match.purpose;
        var html = '<div class="result-item">';
        html += '<div class="result-section-header">TCF Purpose</div>';
        html += '<div class="result-title">Purpose ' + p.id + ': ' + highlight(p.name, terms) + '</div>';
        html += '<div class="result-excerpt">' + highlight(p.description, terms) + '</div>';

        if (p.illustrations && p.illustrations.length > 0) {
            html += '<div class="vendor-detail" style="margin-top:8px;"><strong>Illustrations:</strong><ul style="margin:4px 0 0 16px;">';
            p.illustrations.forEach(function (ill) {
                html += '<li>' + highlight(ill, terms) + '</li>';
            });
            html += '</ul></div>';
        }

        // Show vendors that use this purpose
        if (gvlData && gvlData.vendors) {
            var vendorsUsing = [];
            Object.keys(gvlData.vendors).forEach(function (key) {
                var v = gvlData.vendors[key];
                if ((v.purposes && v.purposes.indexOf(p.id) !== -1) || (v.legIntPurposes && v.legIntPurposes.indexOf(p.id) !== -1)) {
                    vendorsUsing.push(v.name);
                }
            });
            if (vendorsUsing.length > 0) {
                var shown = vendorsUsing.slice(0, 10);
                html += '<div class="vendor-detail" style="margin-top:8px;"><strong>Used by ' + vendorsUsing.length + ' vendors</strong>';
                if (vendorsUsing.length > 10) {
                    html += ' (showing first 10)';
                }
                html += ': ' + shown.map(function (n) { return escHtml(n); }).join(', ');
                if (vendorsUsing.length > 10) html += ', …';
                html += '</div>';
            }
        }

        html += '</div>';
        return html;
    }

    /* ---- Helpers ---- */
    function getPurposeName(id) {
        if (!gvlData || !gvlData.purposes || !gvlData.purposes[id]) return '';
        return gvlData.purposes[id].name;
    }

    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function highlight(text, terms) {
        var esc = escHtml(text);
        terms.forEach(function (term) {
            var re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            esc = esc.replace(re, '<mark>$1</mark>');
        });
        return esc;
    }

    /* ---- Delegated click handler for vendor expand/collapse ---- */
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest('.vendor-collapse-toggle');
        if (!toggle) return;

        var targetId = toggle.getAttribute('data-target');
        var body = document.getElementById(targetId);
        if (!body) return;

        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        body.hidden = expanded;
        var arrow = toggle.querySelector('.vendor-collapse-arrow');
        if (arrow) arrow.textContent = expanded ? '▾' : '▴';
    });

    return {
        search: search,
        renderResults: renderResults,
        loadData: loadData,
        getVendorName: getVendorName,
        isLoaded: isLoaded,
        setData: setData
    };
})();
