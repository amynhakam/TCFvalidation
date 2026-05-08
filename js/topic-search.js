/* ============================================================
   Topic Search — TCF Policy Tool
   Searches across 3 sources with tabbed results:
   1. TCF Framework Policies
   2. IAB Checklist (Controls Catalogue)
   3. MCG QA Playbook
   ============================================================ */
window.TopicSearch = (function () {
    'use strict';

    var index = [];
    var playbookByPolicyRef = {};  // policyId -> [playbook steps]
    var playbookByControlRef = {}; // controlId -> [playbook steps]
    var playbookStepMap = {};      // stepId -> step data with fullText

    /* ---- Build cross-reference maps ---- */
    function buildCrossRefMaps() {
        playbookByPolicyRef = {};
        playbookByControlRef = {};
        playbookStepMap = {};

        if (!window.TCF_PLAYBOOK || !window.TCF_PLAYBOOK.steps) return;

        window.TCF_PLAYBOOK.steps.forEach(function (step) {
            var fullText = step.summary;
            if (step.instructions) {
                fullText += '\n\n' + step.instructions.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n');
            }
            if (step.expectedResults) {
                fullText += '\n\nExpected Results:\n' + step.expectedResults.map(function (r) { return '• ' + r; }).join('\n');
            }
            if (step.subScenarios) {
                step.subScenarios.forEach(function (sub) {
                    fullText += '\n\n' + sub.title + ':\n' + sub.instructions.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n');
                });
            }

            var stepInfo = {
                id: step.id,
                letter: step.letter,
                title: step.title,
                summary: step.summary,
                fullText: fullText
            };
            playbookStepMap[step.id] = stepInfo;

            (step.policyRefs || []).forEach(function (ref) {
                if (!playbookByPolicyRef[ref]) playbookByPolicyRef[ref] = [];
                playbookByPolicyRef[ref].push(stepInfo);
            });
            (step.controlRefs || []).forEach(function (ref) {
                if (!playbookByControlRef[ref]) playbookByControlRef[ref] = [];
                playbookByControlRef[ref].push(stepInfo);
            });
        });
    }

    /* ---- Build search index ---- */
    function buildIndex() {
        index = [];
        buildCrossRefMaps();

        // 1. Index TCF Framework Policies
        if (window.TCF_POLICIES && window.TCF_POLICIES.chapters) {
            window.TCF_POLICIES.chapters.forEach(function (ch) {
                index.push({
                    type: 'policy',
                    id: ch.id,
                    title: 'Chapter ' + ch.number + ': ' + ch.title,
                    text: ch.title,
                    weight: 3
                });

                if (!ch.sections) return;
                ch.sections.forEach(function (sec) {
                    var sectionTitle = (sec.section ? sec.section + ' ' : '') + sec.title;
                    var fullSectionText = '';
                    if (sec.paragraphs) {
                        fullSectionText = sec.paragraphs.map(function (p) {
                            return (p.num ? p.num + '. ' : '') + p.text;
                        }).join('\n\n');
                    }

                    index.push({
                        type: 'policy',
                        id: sec.id,
                        title: sectionTitle,
                        text: sectionTitle,
                        chapter: 'Chapter ' + ch.number,
                        fullText: fullSectionText,
                        weight: 2
                    });

                    if (!sec.paragraphs) return;
                    sec.paragraphs.forEach(function (p) {
                        index.push({
                            type: 'policy',
                            id: p.id,
                            title: (p.num || sec.section || '') + ' — ' + sectionTitle,
                            text: p.text,
                            tags: p.tags || [],
                            chapter: 'Chapter ' + ch.number,                            sectionHeader: 'Chapter ' + ch.number + ': ' + ch.title + ' \u203a ' + sectionTitle,                            fullText: p.text,
                            sectionFullText: fullSectionText,
                            weight: 1
                        });
                    });
                });
            });
        }

        // Also index purposes as policy-related
        if (window.TCF_PURPOSES) {
            if (window.TCF_PURPOSES.purposes) {
                window.TCF_PURPOSES.purposes.forEach(function (p) {
                    index.push({
                        type: 'policy',
                        id: p.id,
                        title: 'Purpose ' + p.number + ': ' + p.name,
                        text: p.name + ' ' + (p.userFriendlyText || '') + ' ' + (p.illustrations ? p.illustrations.join(' ') : ''),
                        tags: p.tags || [],
                        fullText: (p.userFriendlyText || '') + (p.illustrations ? '\n\n' + p.illustrations.join('\n') : ''),
                        weight: 2
                    });
                });
            }
            if (window.TCF_PURPOSES.specialPurposes) {
                window.TCF_PURPOSES.specialPurposes.forEach(function (sp) {
                    index.push({ type: 'policy', id: sp.id, title: 'Special Purpose ' + sp.number + ': ' + sp.name, text: sp.name + ' ' + (sp.userFriendlyText || ''), fullText: sp.userFriendlyText || '', weight: 2 });
                });
            }
            if (window.TCF_PURPOSES.features) {
                window.TCF_PURPOSES.features.forEach(function (f) {
                    index.push({ type: 'policy', id: f.id, title: 'Feature ' + f.number + ': ' + f.name, text: f.name + ' ' + (f.userFriendlyText || ''), fullText: f.userFriendlyText || '', weight: 1 });
                });
            }
            if (window.TCF_PURPOSES.specialFeatures) {
                window.TCF_PURPOSES.specialFeatures.forEach(function (sf) {
                    index.push({ type: 'policy', id: sf.id, title: 'Special Feature ' + sf.number + ': ' + sf.name, text: sf.name + ' ' + (sf.userFriendlyText || ''), fullText: sf.userFriendlyText || '', weight: 2 });
                });
            }
        }

        // 2. Index IAB Checklist (Controls Catalogue)
        if (window.TCF_CONTROLS) {
            if (window.TCF_CONTROLS.enforcementProcedures) {
                window.TCF_CONTROLS.enforcementProcedures.forEach(function (ep) {
                    var fullText = ep.title + '\n\n' + ep.steps.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n');
                    index.push({
                        type: 'checklist',
                        id: ep.id,
                        title: 'Enforcement: ' + ep.title,
                        text: ep.title + ' ' + ep.steps.join(' '),
                        tags: ep.tags || [],
                        category: 'Enforcement Procedures',
                        sectionHeader: 'Enforcement Procedures',
                        fullText: fullText,
                        weight: 2
                    });
                });
            }

            if (window.TCF_CONTROLS.cmpChecklist && window.TCF_CONTROLS.cmpChecklist.categories) {
                window.TCF_CONTROLS.cmpChecklist.categories.forEach(function (cat) {
                    if (!cat.items) return;
                    cat.items.forEach(function (item) {
                        index.push({
                            type: 'checklist',
                            id: item.id,
                            title: item.text,
                            text: item.text + ' ' + (item.description || ''),
                            category: cat.title,
                            sectionHeader: 'CMP Checklist \u203a ' + cat.title,
                            tags: item.tags || [],
                            fullText: item.text + (item.description ? '\n\n' + item.description : ''),
                            weight: 2
                        });
                    });
                });
            }

            if (window.TCF_CONTROLS.vendorChecklist && window.TCF_CONTROLS.vendorChecklist.categories) {
                window.TCF_CONTROLS.vendorChecklist.categories.forEach(function (cat) {
                    if (!cat.items) return;
                    cat.items.forEach(function (item) {
                        index.push({
                            type: 'checklist',
                            id: item.id,
                            title: item.text,
                            text: item.text + ' ' + (item.description || ''),
                            category: cat.title,
                            sectionHeader: 'Vendor Checklist \u203a ' + cat.title,
                            tags: item.tags || [],
                            fullText: item.text + (item.description ? '\n\n' + item.description : ''),
                            weight: 2
                        });
                    });
                });
            }
        }

        // 3. Index MCG QA Playbook
        if (window.TCF_PLAYBOOK && window.TCF_PLAYBOOK.steps) {
            window.TCF_PLAYBOOK.steps.forEach(function (step) {
                var fullText = step.summary;
                if (step.instructions) {
                    fullText += '\n\n' + step.instructions.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n');
                }
                if (step.expectedResults) {
                    fullText += '\n\nExpected Results:\n' + step.expectedResults.map(function (r) { return '• ' + r; }).join('\n');
                }
                if (step.subScenarios) {
                    step.subScenarios.forEach(function (sub) {
                        fullText += '\n\n' + sub.title + ':\n' + sub.instructions.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n');
                    });
                }

                index.push({
                    type: 'playbook',
                    id: step.id,
                    title: step.letter.toUpperCase() + '. ' + step.title,
                    text: step.summary + ' ' + (step.instructions ? step.instructions.join(' ') : '') + ' ' + (step.tags || []).join(' '),
                    tags: step.tags || [],
                    category: step.category,
                    sectionHeader: 'QA Playbook \u203a ' + (step.category ? step.category.charAt(0).toUpperCase() + step.category.slice(1) : 'General'),
                    fullText: fullText,
                    weight: 2
                });
            });
        }
    }

    /* ---- Search ---- */
    function search(query) {
        if (!query || !query.trim()) return [];
        if (index.length === 0) buildIndex();

        var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
        if (terms.length === 0) return [];

        var scored = [];

        index.forEach(function (doc) {
            var textLower = doc.text.toLowerCase();
            var titleLower = doc.title.toLowerCase();
            var tagStr = (doc.tags || []).join(' ').toLowerCase();
            var matchCount = 0;
            var score = 0;

            terms.forEach(function (term) {
                var inTitle = titleLower.indexOf(term) !== -1;
                var inText = textLower.indexOf(term) !== -1;
                var inTags = tagStr.indexOf(term) !== -1;

                if (inTitle || inText || inTags) {
                    matchCount++;
                    if (inTitle) score += 10 * doc.weight;
                    if (inText) score += 3;
                    if (inTags) score += 5;
                }
            });

            if (matchCount > 0) {
                if (matchCount === terms.length) score *= 2;
                scored.push({ doc: doc, score: score, matchCount: matchCount });
            }
        });

        scored.sort(function (a, b) {
            return b.score - a.score || b.matchCount - a.matchCount;
        });

        return scored.slice(0, 50).map(function (s) {
            return {
                type: s.doc.type,
                id: s.doc.id,
                title: s.doc.title,
                text: s.doc.text,
                category: s.doc.category || s.doc.chapter || null,
                sectionHeader: s.doc.sectionHeader || null,
                fullText: s.doc.fullText || null,
                sectionFullText: s.doc.sectionFullText || null,
                score: s.score
            };
        });
    }

    /* ---- Render tabbed results ---- */
    function renderResults(results, query) {
        if (results.length === 0) {
            return '<div class="no-results">No results found for "<strong>' + escHtml(query) + '</strong>".<br><span style="font-size:13px;">Try different keywords.</span></div>';
        }

        var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

        // Split by type
        var policyResults = results.filter(function (r) { return r.type === 'policy'; });
        var checklistResults = results.filter(function (r) { return r.type === 'checklist'; });
        var playbookResults = results.filter(function (r) { return r.type === 'playbook'; });

        var tabs = [
            { key: 'policy', label: 'TCF Framework Policies', count: policyResults.length, results: policyResults },
            { key: 'checklist', label: 'IAB Checklist', count: checklistResults.length, results: checklistResults },
            { key: 'playbook', label: 'MCG QA Playbook', count: playbookResults.length, results: playbookResults }
        ];

        // Find first tab with results
        var activeTab = 'policy';
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].count > 0) { activeTab = tabs[i].key; break; }
        }

        var html = '';

        // Tab bar
        html += '<div class="search-tabs">';
        tabs.forEach(function (tab) {
            var cls = 'search-tab' + (tab.key === activeTab ? ' active' : '') + (tab.count === 0 ? ' disabled' : '');
            html += '<button class="' + cls + '" data-tab="' + tab.key + '">' + escHtml(tab.label);
            html += '<span class="tab-count">' + tab.count + '</span>';
            html += '</button>';
        });
        html += '</div>';

        // Tab content
        tabs.forEach(function (tab) {
            html += '<div class="search-tab-content" id="tab-' + tab.key + '"' + (tab.key !== activeTab ? ' hidden' : '') + '>';

            if (tab.count === 0) {
                html += '<div class="no-results">No matches in this source.</div>';
            } else {
                tab.results.forEach(function (r) {
                    html += renderItem(r, terms, tab.key);
                });

                // Source reference
                if (tab.key === 'policy') {
                    html += '<div class="tab-source-link">Source: <a href="https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/" target="_blank" rel="noopener">IAB Europe TCF v2.2 Policies</a></div>';
                } else if (tab.key === 'checklist') {
                    html += '<div class="tab-source-link">Source: <a href="https://iabeurope.eu/wp-content/uploads/Controls-Catalogue-TCFv2.2.pdf" target="_blank" rel="noopener">Controls Catalogue — TCF v2.2</a></div>';
                } else if (tab.key === 'playbook') {
                    html += '<div class="tab-source-link">Source: MCG QA Playbook — GDPR Checklist</div>';
                }
            }

            html += '</div>';
        });

        return html;
    }

    /* ---- Render a single result item ---- */
    function renderItem(r, terms, tabKey) {
        var html = '<div class="result-item">';

        // Section header from source
        if (r.sectionHeader) {
            html += '<div class="result-section-header">' + escHtml(r.sectionHeader) + '</div>';
        }

        // Title
        html += '<div class="result-title">' + highlight(r.title, terms) + '</div>';

        // Category
        if (r.category) {
            html += '<div class="result-meta">' + escHtml(r.category) + '</div>';
        }

        // Excerpt
        var excerpt = getExcerpt(r.text, terms, 200);
        html += '<div class="result-excerpt">' + highlight(excerpt, terms) + '</div>';

        // Expandable full section text
        var expandText = r.sectionFullText || r.fullText;
        if (expandText && expandText.length > 0) {
            var uid = 'expand-' + tabKey + '-' + r.id.replace(/[^a-zA-Z0-9-]/g, '_');
            html += '<button class="expand-toggle" data-target="' + uid + '">View full section ▾</button>';
            html += '<div class="expand-content" id="' + uid + '" hidden>';
            html += '<div class="full-section-text">' + formatFullText(expandText, terms) + '</div>';
            html += '</div>';
        }

        // Cross-reference to MCG QA Playbook (for policy and checklist tabs)
        if (tabKey === 'policy' || tabKey === 'checklist') {
            var refMap = tabKey === 'policy' ? playbookByPolicyRef : playbookByControlRef;
            var relatedSteps = refMap[r.id] || [];
            if (relatedSteps.length > 0) {
                html += '<div class="playbook-crossref">';
                html += '<span class="crossref-label">MCG QA Playbook:</span>';
                relatedSteps.forEach(function (step) {
                    var stepUid = 'xref-' + tabKey + '-' + r.id.replace(/[^a-zA-Z0-9-]/g, '_') + '-' + step.id;
                    html += '<button class="crossref-link expand-toggle" data-target="' + stepUid + '">Step ' + step.letter.toUpperCase() + ' — ' + escHtml(step.title) + ' ▾</button>';
                    html += '<div class="expand-content crossref-content" id="' + stepUid + '" hidden>';
                    html += '<div class="full-section-text">' + formatFullText(step.fullText, terms) + '</div>';
                    html += '</div>';
                });
                html += '</div>';
            }
        }

        html += '</div>';
        return html;
    }

    /* ---- Helpers ---- */
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

    function getExcerpt(text, terms, maxLen) {
        if (text.length <= maxLen) return text;

        var lower = text.toLowerCase();
        var bestPos = 0;
        var bestScore = -1;

        for (var i = 0; i < text.length - 40; i += 20) {
            var chunk = lower.substring(i, i + maxLen);
            var score = 0;
            terms.forEach(function (t) {
                var idx = 0;
                while ((idx = chunk.indexOf(t, idx)) !== -1) {
                    score++;
                    idx += t.length;
                }
            });
            if (score > bestScore) {
                bestScore = score;
                bestPos = i;
            }
        }

        var start = Math.max(0, bestPos);
        var end = Math.min(text.length, start + maxLen);
        var excerpt = text.substring(start, end);

        if (start > 0) excerpt = '…' + excerpt;
        if (end < text.length) excerpt = excerpt + '…';

        return excerpt;
    }

    function formatFullText(text, terms) {
        var paragraphs = text.split(/\n\n+/);
        return paragraphs.map(function (p) {
            return '<p>' + highlight(p.trim(), terms) + '</p>';
        }).join('');
    }

    // Delegated click handlers
    document.addEventListener('click', function (e) {
        // Expand toggle
        if (e.target.classList.contains('expand-toggle')) {
            var targetId = e.target.getAttribute('data-target');
            var content = document.getElementById(targetId);
            if (!content) return;
            var isHidden = content.hidden;
            content.hidden = !isHidden;
            e.target.textContent = isHidden ? 'Hide full section ▴' : 'View full section ▾';
            return;
        }

        // Tab switching
        var tabBtn = e.target.closest('.search-tab');
        if (tabBtn && !tabBtn.classList.contains('disabled')) {
            var tabKey = tabBtn.getAttribute('data-tab');
            var container = tabBtn.closest('.results-content') || document;

            // Toggle active tab button
            var allTabs = container.querySelectorAll('.search-tab');
            allTabs.forEach(function (t) { t.classList.remove('active'); });
            tabBtn.classList.add('active');

            // Toggle tab content
            var allPanes = container.querySelectorAll('.search-tab-content');
            allPanes.forEach(function (p) { p.hidden = true; });
            var pane = container.querySelector('#tab-' + tabKey);
            if (pane) pane.hidden = false;
        }
    });

    return {
        init: buildIndex,
        search: search,
        renderResults: renderResults
    };
})();
