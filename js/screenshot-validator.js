/* ============================================================
   Screenshot Validator — TCF Policy Tool
   Upload, checklist, and optional AI analysis.
   ============================================================ */
window.ScreenshotValidator = (function () {
    'use strict';

    var imageData = null; // base64 data URL

    /* ---- Controls Catalogue text for AI prompt context ---- */
    function getControlsCatalogueText() {
        return [
            'Controls Catalogue — TCF v2.2',
            '',
            'CMP Checklist — Initial Layer:',
            '- Clear purpose descriptions displayed',
            '- Visibility of vendor list access (number of vendors + link)',
            '- No pre-selected consents (default off)',
            '- Device storage/access information present',
            '- Personal data processing information present',
            '- Special Features information present',
            '- Consent scope information present',
            '- Consent withdrawal information and method to resurface UI',
            '- Accept CTA present and visible',
            '- Customize/Settings CTA present and visible',
            '- CTAs have matching text treatment and minimum 5:1 contrast',
            '- Legitimate interest information (recommended)',
            '- Modal/banner covers content prominently',
            '',
            'CMP Checklist — Secondary Layers:',
            '- Granular per-purpose consent controls',
            '- Granular per-vendor consent controls',
            '- Special Feature opt-in controls',
            '- Named vendor list with privacy policy links',
            '- Full purpose details with user-friendly text',
            '- Legitimate interest distinguished from consent',
            '- Default state is OFF for all toggles',
            '- Storage duration information',
            '',
            'CMP Checklist — Legitimate Interest Layer:',
            '- Personal data processing information',
            '- Scope information for LI processing',
            '- Object controls available',
            '- Per-vendor and per-purpose object controls',
            '- Vendor details with privacy policy and LI explanation links',
            '',
            'CMP Checklist — UI Resurfacing:',
            '- Easy access to resurface consent UI',
            '- Previous choices correctly pre-populated',
            '- Withdraw All option available if Accept All was provided'
        ].join('\n');
    }

    /* ---- Load checklist for layer type ---- */
    function getChecklist(layerType) {
        if (window.TCF_CHECKLISTS && window.TCF_CHECKLISTS.getChecklist) {
            return window.TCF_CHECKLISTS.getChecklist(layerType);
        }
        return null;
    }

    /* ---- Render checklist HTML ---- */
    function renderChecklist(layerType) {
        var checklist = getChecklist(layerType);
        if (!checklist) {
            return '<div class="no-results">No checklist available for this layer type.</div>';
        }

        var html = '';

        // Catalogue reference header
        html += '<div style="margin-bottom:16px;font-size:13px;color:var(--text-secondary);">';
        html += 'From <strong>Controls Catalogue — TCF v2.2</strong> → ' + escHtml(checklist.name);
        html += '</div>';

        // Progress bar
        html += '<div class="checklist-progress">';
        html += '<div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div>';
        html += '<span class="progress-text" id="progressText">0 / ' + checklist.items.length + '</span>';
        html += '</div>';

        // Items
        checklist.items.forEach(function (item, idx) {
            html += '<div class="check-item">';
            html += '<input type="checkbox" id="chk-' + idx + '" data-check-idx="' + idx + '">';
            html += '<div class="check-text">';
            html += '<strong>' + escHtml(item.text) + '</strong>';
            html += '<p>' + escHtml(item.description) + '</p>';
            if (item.policyRef) {
                html += '<span class="result-meta">Policy ref: ' + escHtml(item.policyRef) + '</span>';
            }
            html += '</div>';
            html += '<span class="severity-badge severity-' + (item.severity || 'important') + '">' + escHtml(item.severity || 'check') + '</span>';
            html += '</div>';
        });

        return html;
    }

    /* ---- Update progress ---- */
    function updateProgress(container) {
        var checks = container.querySelectorAll('input[type="checkbox"]');
        var total = checks.length;
        var checked = 0;
        checks.forEach(function (cb) { if (cb.checked) checked++; });

        var fill = container.querySelector('#progressFill');
        var text = container.querySelector('#progressText');
        if (fill) fill.style.width = (total > 0 ? (checked / total * 100) : 0) + '%';
        if (text) text.textContent = checked + ' / ' + total;

        if (checked === total && total > 0) {
            if (fill) fill.style.background = 'var(--green)';
        } else {
            if (fill) fill.style.background = 'var(--accent)';
        }
    }

    /* ---- AI Analysis ---- */
    function aiAnalyze(layerType, onResult) {
        var provider = localStorage.getItem('tcf_ai_provider') || 'github';

        var apiKey, fetchUrl, headers, model;

        if (provider === 'github') {
            apiKey = localStorage.getItem('tcf_github_token');
            if (!apiKey) {
                onResult({ error: 'No GitHub token configured. Add your Personal Access Token in Settings.' });
                return;
            }
            fetchUrl = 'https://models.inference.ai.azure.com/chat/completions';
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            };
            model = 'gpt-4o';
        } else if (provider === 'azure') {
            apiKey = localStorage.getItem('tcf_azure_key');
            var endpoint = localStorage.getItem('tcf_azure_endpoint');
            var deployment = localStorage.getItem('tcf_azure_deployment') || 'gpt-4o';
            if (!apiKey || !endpoint) {
                onResult({ error: 'Azure OpenAI not configured. Add your endpoint and API key in Settings.' });
                return;
            }
            // Strip trailing slash
            endpoint = endpoint.replace(/\/+$/, '');
            fetchUrl = endpoint + '/openai/deployments/' + encodeURIComponent(deployment) + '/chat/completions?api-version=2024-10-21';
            headers = {
                'Content-Type': 'application/json',
                'api-key': apiKey
            };
            model = null; // Not needed in Azure — deployment specifies the model
        } else {
            apiKey = localStorage.getItem('tcf_api_key');
            if (!apiKey) {
                onResult({ error: 'No API key configured. Add your OpenAI API key in Settings.' });
                return;
            }
            fetchUrl = 'https://api.openai.com/v1/chat/completions';
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            };
            model = 'gpt-4o';
        }

        if (!imageData) {
            onResult({ error: 'No screenshot uploaded.' });
            return;
        }

        var checklist = getChecklist(layerType);
        var checklistText = '';
        if (checklist) {
            checklistText = checklist.items.map(function (item, i) {
                return (i + 1) + '. ' + item.text + ': ' + item.description;
            }).join('\n');
        }

        var prompt = 'You are a TCF (Transparency & Consent Framework) v2.2 compliance auditor.\n\n' +
            'The user has uploaded a screenshot of a CMP (Consent Management Platform) UI — specifically the "' + (checklist ? checklist.name : layerType) + '".\n\n' +
            'Reference: Controls Catalogue — TCF v2.2\n\n' +
            getControlsCatalogueText() + '\n\n' +
            'Checklist items to evaluate:\n' + checklistText + '\n\n' +
            'For each checklist item, respond with:\n' +
            '- PASS if the requirement appears to be met in the screenshot\n' +
            '- FAIL if the requirement is clearly not met\n' +
            '- UNCLEAR if you cannot determine from the screenshot\n' +
            'Include a brief one-sentence explanation for each.\n\n' +
            'Also state which section of the Controls Catalogue this screenshot corresponds to.\n\n' +
            'Format your response as JSON: { "catalogueSection": "...", "items": [{ "index": 1, "status": "PASS|FAIL|UNCLEAR", "explanation": "..." }] }';

        var body = {
            messages: [{
                role: 'user',
                content: [
                    { type: 'text', text: prompt },
                    { type: 'image_url', image_url: { url: imageData } }
                ]
            }],
            max_tokens: 2000
        };
        if (model) body.model = model;

        fetch(fetchUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(function (res) {
                if (!res.ok) throw new Error('API error: ' + res.status);
                return res.json();
            })
            .then(function (data) {
                var text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
                if (!text) throw new Error('No response from AI');

                // Try to parse JSON from response
                var jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        var parsed = JSON.parse(jsonMatch[0]);
                        onResult({ success: true, data: parsed, raw: text });
                        return;
                    } catch (e) { /* fall through to raw */ }
                }
                onResult({ success: true, data: null, raw: text });
            })
            .catch(function (err) {
                onResult({ error: err.message || 'AI analysis failed.' });
            });
    }

    /* ---- Render AI results ---- */
    function renderAiResults(result, layerType) {
        if (result.error) {
            return '<div class="ai-result"><p style="color:var(--red)">' + escHtml(result.error) + '</p></div>';
        }

        var checklist = layerType ? getChecklist(layerType) : null;
        var html = '<div class="ai-result"><h4>AI Analysis</h4>';

        if (result.data && result.data.catalogueSection) {
            html += '<p style="margin-bottom:10px;font-size:13px;">Controls Catalogue section: <strong>' + escHtml(result.data.catalogueSection) + '</strong></p>';
        }

        if (result.data && result.data.items) {
            result.data.items.forEach(function (item, i) {
                var cls = item.status === 'PASS' ? 'ai-pass' : item.status === 'FAIL' ? 'ai-fail' : 'ai-unclear';
                html += '<div class="ai-item"><strong class="' + cls + '">' + escHtml(item.status) + '</strong> — ' + escHtml(item.explanation || '');

                // "Learn more" for non-PASS items
                if (item.status !== 'PASS' && checklist && checklist.items) {
                    var idx = (item.index || (i + 1)) - 1;
                    var chkItem = checklist.items[idx];
                    if (chkItem) {
                        var detailId = 'ai-detail-' + i;
                        html += ' <a class="ai-learn-more" data-detail="' + detailId + '">learn more ▾</a>';
                        html += '<div class="ai-detail" id="' + detailId + '">';
                        html += '<strong>' + escHtml(chkItem.text) + '</strong><br>';
                        html += escHtml(chkItem.description);
                        if (chkItem.policyRef || chkItem.controlRef) {
                            html += '<div class="ai-detail-meta">';
                            if (chkItem.policyRef) html += 'Policy: ' + escHtml(chkItem.policyRef);
                            if (chkItem.policyRef && chkItem.controlRef) html += ' · ';
                            if (chkItem.controlRef) html += 'Control: ' + escHtml(chkItem.controlRef);
                            html += '</div>';
                        }
                        html += '</div>';
                    }
                }

                html += '</div>';
            });
        } else if (result.raw) {
            html += '<pre style="white-space:pre-wrap;font-size:13px;line-height:1.5;font-family:var(--font);color:var(--text);">' + escHtml(result.raw) + '</pre>';
        }

        html += '</div>';
        return html;
    }

    /* ---- Image handling ---- */
    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            imageData = e.target.result;
            showPreview();
        };
        reader.readAsDataURL(file);
    }

    function showPreview() {
        var preview = document.getElementById('screenshotPreview');
        var img = document.getElementById('previewImg');
        var zone = document.getElementById('uploadZone');
        var controls = document.getElementById('screenshotControls');
        var aiBtn = document.getElementById('aiAnalyzeBtn');

        if (img) img.src = imageData;
        if (preview) preview.hidden = false;
        if (zone) zone.hidden = true;
        if (controls) controls.hidden = false;

        // Show AI button if any AI provider is configured
        var hasAI = localStorage.getItem('tcf_github_token') || localStorage.getItem('tcf_azure_key') || localStorage.getItem('tcf_api_key');
        if (aiBtn && hasAI) {
            aiBtn.hidden = false;
        }
    }

    function clearImage() {
        imageData = null;
        var preview = document.getElementById('screenshotPreview');
        var zone = document.getElementById('uploadZone');
        var controls = document.getElementById('screenshotControls');
        if (preview) preview.hidden = true;
        if (zone) zone.hidden = false;
        if (controls) controls.hidden = true;
    }

    function getImageData() {
        return imageData;
    }

    /* ---- Helpers ---- */
    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    /* ---- Init ---- */
    function init() {
        var zone = document.getElementById('uploadZone');
        var fileInput = document.getElementById('fileInput');
        var removeBtn = document.getElementById('removeImg');

        if (zone) {
            zone.addEventListener('click', function () { if (fileInput) fileInput.click(); });

            zone.addEventListener('dragover', function (e) {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', function () {
                zone.classList.remove('drag-over');
            });
            zone.addEventListener('drop', function (e) {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', function () {
                if (fileInput.files.length) handleFile(fileInput.files[0]);
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', clearImage);
        }

        // Clipboard paste
        document.addEventListener('paste', function (e) {
            var items = e.clipboardData && e.clipboardData.items;
            if (!items) return;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    handleFile(items[i].getAsFile());
                    break;
                }
            }
        });

        // Delegated click for "learn more" toggles in AI results
        document.addEventListener('click', function (e) {
            var link = e.target.closest('.ai-learn-more');
            if (!link) return;
            e.preventDefault();
            var detailId = link.getAttribute('data-detail');
            var detail = document.getElementById(detailId);
            if (detail) {
                detail.classList.toggle('open');
                link.textContent = detail.classList.contains('open') ? 'learn more ▴' : 'learn more ▾';
            }
        });
    }

    return {
        init: init,
        renderChecklist: renderChecklist,
        updateProgress: updateProgress,
        aiAnalyze: aiAnalyze,
        renderAiResults: renderAiResults,
        getImageData: getImageData,
        clearImage: clearImage
    };
})();
