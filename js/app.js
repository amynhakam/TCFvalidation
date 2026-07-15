/* ============================================================
   App — TCF Policy Tool
   Wires together: TopicSearch, ScreenshotValidator, TCDecoder
   ============================================================ */
(function () {
    'use strict';

    var resultsArea, resultsContent, resultsTitle;

    /* ---- Show / hide results ---- */
    function showResults(title, html) {
        resultsTitle.textContent = title;
        resultsContent.innerHTML = html;
        resultsArea.hidden = false;
        resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideResults() {
        resultsArea.hidden = true;
        resultsContent.innerHTML = '';
    }

    function resetToHome() {
        hideResults();

        // Clear all text inputs in the tool cards
        var inputs = document.querySelectorAll('.tool-card .tool-input');
        inputs.forEach(function (el) { el.value = ''; });

        // Clear screenshot preview
        if (window.ScreenshotValidator) window.ScreenshotValidator.clearImage();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ---- Theme ---- */
    function initTheme() {
        var theme = localStorage.getItem('tcf_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);

        document.getElementById('themeToggle').addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('tcf_theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        var light = document.getElementById('themeIconLight');
        var dark = document.getElementById('themeIconDark');
        if (light) light.hidden = theme === 'dark';
        if (dark) dark.hidden = theme === 'light';
    }

    /* ---- Settings modal ---- */
    function initSettings() {
        var modal = document.getElementById('settingsModal');
        var btn = document.getElementById('settingsBtn');
        var close = document.getElementById('settingsClose');

        // Provider toggle
        var providerSelect = document.getElementById('aiProvider');
        var azureSection = document.getElementById('azureSettings');
        var openaiSection = document.getElementById('openaiSettings');
        var githubSection = document.getElementById('githubSettings');

        // Azure fields
        var azureEndpoint = document.getElementById('azureEndpoint');
        var azureDeployment = document.getElementById('azureDeployment');
        var azureApiKey = document.getElementById('azureApiKey');
        var azureKeyToggle = document.getElementById('azureKeyToggle');

        // OpenAI fields
        var apiInput = document.getElementById('apiKeyInput');
        var toggle = document.getElementById('apiKeyToggle');

        // GitHub fields
        var githubToken = document.getElementById('githubToken');
        var githubTokenToggle = document.getElementById('githubTokenToggle');

        function updateProviderUI() {
            var provider = providerSelect.value;
            azureSection.hidden = provider !== 'azure';
            openaiSection.hidden = provider !== 'openai';
            githubSection.hidden = provider !== 'github';
        }

        providerSelect.addEventListener('change', function () {
            localStorage.setItem('tcf_ai_provider', providerSelect.value);
            updateProviderUI();
        });

        btn.addEventListener('click', function () {
            // Load saved values
            providerSelect.value = localStorage.getItem('tcf_ai_provider') || 'github';
            if (azureEndpoint) azureEndpoint.value = localStorage.getItem('tcf_azure_endpoint') || '';
            if (azureDeployment) azureDeployment.value = localStorage.getItem('tcf_azure_deployment') || '';
            if (azureApiKey) azureApiKey.value = localStorage.getItem('tcf_azure_key') || '';
            if (apiInput) apiInput.value = localStorage.getItem('tcf_api_key') || '';
            if (githubToken) githubToken.value = localStorage.getItem('tcf_github_token') || '';
            updateProviderUI();
            modal.showModal();
        });

        close.addEventListener('click', function () { modal.close(); });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.close();
        });

        // Auto-save all fields on change
        var saveTimer;
        function autoSave(el, key) {
            if (!el) return;
            el.addEventListener('input', function () {
                clearTimeout(saveTimer);
                saveTimer = setTimeout(function () {
                    var val = el.value.trim();
                    if (val) { localStorage.setItem(key, val); }
                    else { localStorage.removeItem(key); }
                }, 400);
            });
        }

        autoSave(azureEndpoint, 'tcf_azure_endpoint');
        autoSave(azureDeployment, 'tcf_azure_deployment');
        autoSave(azureApiKey, 'tcf_azure_key');
        autoSave(apiInput, 'tcf_api_key');
        autoSave(githubToken, 'tcf_github_token');

        // Toggle visibility buttons
        function wireToggle(input, btn) {
            if (!input || !btn) return;
            btn.addEventListener('click', function () {
                var isPass = input.type === 'password';
                input.type = isPass ? 'text' : 'password';
                btn.textContent = isPass ? 'Hide' : 'Show';
            });
        }
        wireToggle(azureApiKey, azureKeyToggle);
        wireToggle(apiInput, toggle);
        wireToggle(githubToken, githubTokenToggle);
    }

    /* ---- Topic Search ---- */
    function initSearch() {
        var input = document.getElementById('searchInput');
        var btn = document.getElementById('searchBtn');

        function doSearch() {
            var query = input.value.trim();
            if (!query) return;
            var results = window.TopicSearch.search(query);
            var html = window.TopicSearch.renderResults(results, query);
            showResults('Search Results', html);
        }

        btn.addEventListener('click', doSearch);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doSearch();
        });
    }

    /* ---- Screenshot Validator ---- */
    function initScreenshot() {
        var validateBtn = document.getElementById('validateBtn');
        var aiBtn = document.getElementById('aiAnalyzeBtn');
        var layerSelect = document.getElementById('layerType');

        validateBtn.addEventListener('click', function () {
            var layerType = layerSelect.value;
            if (!layerType) {
                alert('Please select a UI layer type.');
                return;
            }
            var html = window.ScreenshotValidator.renderChecklist(layerType);
            showResults('Compliance Checklist — Controls Catalogue', html);

            // Wire up checkboxes for progress
            resultsContent.addEventListener('change', function (e) {
                if (e.target.type === 'checkbox') {
                    window.ScreenshotValidator.updateProgress(resultsContent);
                }
            });
        });

        aiBtn.addEventListener('click', function () {
            var layerType = layerSelect.value;
            if (!layerType) {
                alert('Please select a UI layer type.');
                return;
            }
            if (!window.ScreenshotValidator.getImageData()) {
                alert('Please upload a screenshot first.');
                return;
            }

            aiBtn.classList.add('btn-loading');
            aiBtn.disabled = true;

            window.ScreenshotValidator.aiAnalyze(layerType, function (result) {
                aiBtn.classList.remove('btn-loading');
                aiBtn.disabled = false;

                // If results area already has checklist, append AI results
                var aiHtml = window.ScreenshotValidator.renderAiResults(result, layerType);
                var existing = resultsContent.querySelector('.ai-result');
                if (existing) existing.remove();

                resultsContent.insertAdjacentHTML('beforeend', aiHtml);

                // Auto-check items that AI marked as PASS
                if (result.data && result.data.items) {
                    result.data.items.forEach(function (item) {
                        if (item.status === 'PASS') {
                            var cb = resultsContent.querySelector('#chk-' + (item.index - 1));
                            if (cb) cb.checked = true;
                        }
                    });
                    window.ScreenshotValidator.updateProgress(resultsContent);
                }

                if (resultsArea.hidden) {
                    showResults('AI Analysis — Controls Catalogue', aiHtml);
                }
            });
        });
    }

    /* ---- TC String Decoder ---- */
    function initDecoder() {
        var input = document.getElementById('tcStringInput');
        var btn = document.getElementById('decodeBtn');

        btn.addEventListener('click', function () {
            var tcString = input.value.trim();
            if (!tcString) return;
            var result = window.TCDecoder.decode(tcString);
            var html = window.TCDecoder.renderResults(result);
            showResults('TC String Decoded', html);
        });
    }

    /* ---- Vendor Search ---- */
    function initVendorSearch() {
        var input = document.getElementById('vendorSearchInput');
        var btn = document.getElementById('vendorSearchBtn');

        function doSearch() {
            var query = input.value.trim();
            if (!query) return;

            btn.classList.add('btn-loading');
            btn.disabled = true;

            window.VendorSearch.search(query, function (results) {
                btn.classList.remove('btn-loading');
                btn.disabled = false;
                var html = window.VendorSearch.renderResults(results, query);
                showResults('Purpose & Vendor Details', html);
            });
        }

        btn.addEventListener('click', doSearch);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') doSearch();
        });
    }

    /* ---- Data Freshness ---- */
    function initDataFreshness() {
        var el = document.getElementById('dataFreshness');
        if (!el) return;

        if (window.__VENDOR_DATA_LIVE) {
            var fetchedAt = new Date(window.__VENDOR_DATA_REFRESHED);
            var timeStr = fetchedAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
            var gvlVersionLive = (window.__GVL_DATA && window.__GVL_DATA.vendorListVersion) ? ' · GVL v' + window.__GVL_DATA.vendorListVersion : '';
            el.innerHTML = '<span class="freshness-dot fresh"></span>' +
                '<span>Live data' + gvlVersionLive + '</span>' +
                '<span class="freshness-date">Fetched directly from IAB at ' + timeStr + '</span>';
            return;
        }

        var ts = window.__VENDOR_DATA_REFRESHED;
        if (!ts) {
            el.innerHTML = '<span class="freshness-dot stale"></span> No vendor data found. Run <code>refresh-vendor-data.ps1</code>';
            return;
        }

        var refreshed = new Date(ts);
        var now = new Date();
        var daysAgo = Math.floor((now - refreshed) / (1000 * 60 * 60 * 24));

        var dotClass, label;
        if (daysAgo <= 7) {
            dotClass = 'fresh';
            label = 'Up to date';
        } else if (daysAgo <= 21) {
            dotClass = 'aging';
            label = daysAgo + ' days old';
        } else {
            dotClass = 'stale';
            label = daysAgo + ' days old — consider refreshing';
        }

        // Next update = 7 days from last refresh
        var nextUpdate = new Date(refreshed);
        nextUpdate.setDate(nextUpdate.getDate() + 7);
        var nextDateStr = nextUpdate.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

        var dateStr = refreshed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        var gvlVersion = (window.__GVL_DATA && window.__GVL_DATA.vendorListVersion) ? ' · GVL v' + window.__GVL_DATA.vendorListVersion : '';

        el.innerHTML = '<span class="freshness-dot ' + dotClass + '"></span>' +
            '<span>' + label + gvlVersion + '</span>' +
            '<span class="freshness-date">Updated ' + dateStr + '</span>' +
            '<span class="freshness-date">Next update: ' + nextDateStr + '</span>';
    }

    /* ---- Live Vendor Data Refresh ----
       Best-effort: fetch the GVL and AVI lists directly from IAB at runtime so hosted
       deployments (GitHub Pages, Vibehub) always show current data without needing a
       redeploy. Falls back silently to the bundled snapshot when fetch fails (offline,
       CORS-blocked, or opened via file://). ---- */
    function refreshLiveVendorData() {
        var gvlUrl = 'https://vendor-list.consensu.org/v3/vendor-list.json';
        var aviUrl = 'https://vendor-list.consensu.org/v2/additional-vendor-information-list.json';

        Promise.all([
            fetch(gvlUrl).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
            fetch(aviUrl).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        ]).then(function (results) {
            var gvl = results[0];
            var avi = results[1];

            window.__GVL_DATA = gvl;
            window.__AVI_DATA = avi;
            window.__VENDOR_DATA_REFRESHED = new Date().toISOString();
            window.__VENDOR_DATA_LIVE = true;

            if (window.VendorSearch && typeof window.VendorSearch.setData === 'function') {
                window.VendorSearch.setData(gvl, avi);
            }

            initDataFreshness();
            console.log('Live vendor data loaded from IAB (GVL v' + gvl.vendorListVersion + ').');
        }).catch(function (err) {
            console.log('Live vendor data fetch unavailable, using bundled snapshot:', err.message || err);
        });
    }

    /* ---- Init ---- */
    document.addEventListener('DOMContentLoaded', function () {
        resultsArea = document.getElementById('resultsArea');
        resultsContent = document.getElementById('resultsContent');
        resultsTitle = document.getElementById('resultsTitle');

        initTheme();
        initSettings();

        // Init modules
        if (window.TopicSearch) window.TopicSearch.init();
        if (window.ScreenshotValidator) window.ScreenshotValidator.init();

        initSearch();
        initScreenshot();
        initDecoder();
        if (window.VendorSearch) initVendorSearch();
        initDataFreshness();
        refreshLiveVendorData();

        // Close results
        document.getElementById('closeResults').addEventListener('click', hideResults);

        // Home button (TCF brand mark)
        var homeBtn = document.getElementById('homeBtn');
        if (homeBtn) {
            homeBtn.addEventListener('click', resetToHome);
            homeBtn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); resetToHome(); }
            });
        }

        // Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !resultsArea.hidden) {
                hideResults();
            }
        });
    });
})();
