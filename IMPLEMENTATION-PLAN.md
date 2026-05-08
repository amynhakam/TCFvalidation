# TCF Compliance Reference Tool — Implementation Plan

**Version:** 1.0  
**Date:** May 6, 2026  
**Based on:** PRODUCT-REQUIREMENTS.md v1.0  

---

## Architecture Overview

```
TCF Requirements Tool/
├── index.html                  # Single-page application entry point
├── css/
│   └── styles.css              # All styles (light + dark mode)
├── js/
│   ├── app.js                  # App initialization, routing, state management
│   ├── search.js               # Full-text search engine (client-side index)
│   ├── navigation.js           # Sidebar navigation & section rendering
│   ├── screenshot.js           # Screenshot upload, checklist, AI integration
│   └── settings.js             # Settings panel (API key, dark mode, bookmarks)
├── data/
│   ├── policies.js             # TCF v2.2 Policies (structured JSON)
│   ├── controls.js             # Controls Catalogue (structured JSON)
│   ├── playbook.js             # QA Playbook (structured JSON)
│   ├── purposes.js             # Purposes 1-11, Special Purposes, Features, Special Features, Stacks
│   ├── checklists.js           # Screenshot validation checklists (Initial Layer, Secondary Layer, etc.)
│   └── crossref.js             # Cross-reference mappings (policy → control → QA step)
├── Controls-Catalogue-TCFv2.2.md   # Source reference (existing)
├── GDPR_Checklist.md               # Source reference (existing)
├── PRODUCT-REQUIREMENTS.md         # PRD (existing)
└── IMPLEMENTATION-PLAN.md          # This file
```

**Tech stack:** Vanilla HTML5, CSS3, JavaScript (ES6+). No frameworks, no build step, no dependencies. Opens directly in browser from filesystem.

---

## Phase 1: Foundation & Data Layer

**Goal:** Build the app shell, data structures, and navigation skeleton.

### Task 1.1 — HTML Shell & CSS Foundation
- [ ] Create `index.html` with semantic layout: header, sidebar, main content area, settings modal
- [ ] Create `css/styles.css` with:
  - CSS custom properties for theming (light/dark)
  - Sidebar layout (collapsible, scrollable)
  - Main content area with max-width for readability
  - Search bar styling
  - Typography scale for policy text hierarchy (chapters, sections, subsections)
  - Print media query for report export
- [ ] Dark mode toggle using `data-theme` attribute and `prefers-color-scheme` detection
- [ ] Responsive breakpoints (desktop primary, tablet acceptable)

### Task 1.2 — Data Structuring: TCF Policies
- [ ] Create `data/policies.js` — transform the full TCF v2.2 Policies text into structured JSON:
  ```js
  {
    id: "policy-5-3",
    chapter: "II",
    chapterTitle: "Policies for CMPs",
    section: 5,
    sectionTitle: "Managing Purposes and Legal Bases",
    paragraph: 3,
    text: "A CMP must only generate a positive consent Signal...",
    appliesTo: ["cmp"],
    tags: ["consent", "signal", "affirmative-action"],
    relatedControls: ["cmp-tc-string-generation"],
    relatedPlaybook: ["b", "c", "g"]
  }
  ```
- [ ] Cover all chapters: I (Definitions), II (CMPs), III (Vendors), IV (Publishers), V (User Interaction)
- [ ] Cover Appendix B (UI Requirements): sections A–D with all sub-items

### Task 1.3 — Data Structuring: Purposes, Features, Stacks
- [ ] Create `data/purposes.js` — structured data for:
  - Purposes 1–11 (number, name, user-friendly text, illustrations, vendor guidance, allowable legal bases)
  - Special Purposes 1–3
  - Features 1–3
  - Special Features 1–2
  - Stacks 1–45 (number, name, description, included purposes/features)
  - Example Stack Combinations 1–4
  - Categories of Data 1–11

### Task 1.4 — Data Structuring: Controls Catalogue
- [ ] Create `data/controls.js` — structured data for:
  - Enforcement Procedures 1–3 (steps, timelines, consequences)
  - CMP Checklist: Technical Checks, Policy Checks (Initial Layer, Secondary Layers, UI Resurfacing)
  - Vendor Checklist: Technical Checks, Registration Checks
  - Cross-reference to policy section IDs

### Task 1.5 — Data Structuring: QA Playbook
- [ ] Create `data/playbook.js` — structured data for each QA step (a through o):
  - Step ID, title, consent state (accepted/declined/transitioning)
  - Ordered procedure steps
  - Expected results / validation criteria
  - Tools needed (Fiddler, IAB GPP decoder, VPN)
  - URLs and file paths referenced
  - Cross-reference to policy section IDs and control IDs

### Task 1.6 — Cross-Reference Index
- [ ] Create `data/crossref.js` — bidirectional mappings:
  - Policy section → related Controls Catalogue items
  - Policy section → related QA Playbook steps
  - Controls Catalogue item → related Policy sections
  - QA Playbook step → related Policy sections
  - Topic tags → all related items across sources
- [ ] Mapping categories: TC String, Signal Propagation, UI/UX Initial Layer, UI/UX Secondary Layer, Legitimate Interest, Consent, Vendor Management, Publisher Attestation, DNT, Sync Pixels, ID Management

---

## Phase 2: Navigation & Content Rendering

**Goal:** Build the sidebar navigation and render all content sections.

### Task 2.1 — Sidebar Navigation
- [ ] Create `js/navigation.js`
- [ ] Render collapsible tree navigation from data structure:
  - Dashboard (landing/overview)
  - Policies (expandable by chapter → section)
  - Purposes & Features (expandable by type)
  - UI Requirements (Appendix B sections)
  - Controls Catalogue (CMP/Vendor checklists, enforcement)
  - QA Playbook (Accept Flow, Decline Flow, State Transitions, etc.)
  - Compliance Assessment
  - Screenshot Validator
  - Edge Cases & Guidance
- [ ] Active section highlighting in sidebar
- [ ] Breadcrumb trail in main content area
- [ ] URL hash-based routing (`#policies/cmp/5-3`) for deep linking and back button support

### Task 2.2 — Content Rendering Engine
- [ ] Build template renderer for each content type:
  - **Policy sections:** chapter/section header, paragraph text, "Applies to" badge (CMP/Vendor/Publisher), related items panel
  - **Purposes/Features:** structured card layout (number, name, user-friendly text, illustrations, vendor guidance, legal bases)
  - **Stacks:** card with included purposes list
  - **Controls:** checklist-style with status indicators
  - **QA Playbook:** step-by-step procedure with expected results, collapsible detail
- [ ] "Related" sidebar panel on each section showing:
  - Cross-referenced policy sections
  - Cross-referenced controls
  - Cross-referenced QA steps
- [ ] Copy-to-clipboard for policy text snippets

### Task 2.3 — Dashboard / Landing Page
- [ ] Overview card showing:
  - Quick stats (total policy sections, checklist items, QA steps)
  - Quick links to most-used sections
  - Last assessment results summary (from localStorage)
  - Recent bookmarks
- [ ] "Getting Started" guidance for each persona (Developer, Product, Compliance)

### Task 2.4 — Edge Cases & Guidance Section
- [ ] Dedicated content section with structured guidance for:
  - Granular consent after initial accept/decline (with policy refs: Appendix B C(c)(III), C(d))
  - Legitimate interest on secondary layer (with policy refs: Appendix B D(a)–D(c))
  - Consent state transitions: Accept → partial toggle → re-accept (QA steps g, h, n, o)
  - Desktop app specifics: consent file at `%LOCALAPPDATA%`, non-cookie persistence
  - Consent audit logging to `consentaudit.microsoftcasualgames.com`
  - DNT ↔ GDPR consent state interaction
  - Sync pixel blocking/firing by consent state
  - MCGID/MUID/ANID/LiveRamp ID presence rules per consent state
  - Brazil and Canada as GDPR regions
  - 925 vendor GVL management
  - CTA design: contrast ratio ≥ 5:1, matching text treatment (Appendix B C(g))

---

## Phase 3: Search

**Goal:** Implement fast, full-text search across all content.

### Task 3.1 — Search Index Builder
- [ ] Create `js/search.js`
- [ ] Build inverted index at app initialization from all data sources
- [ ] Index fields: title, body text, tags, section IDs, purpose names/numbers
- [ ] Normalize text: lowercase, strip punctuation, handle TCF-specific terms (e.g., "TC String" = "TCString" = "consent string")
- [ ] Support quoted phrase search (`"legitimate interest"`)
- [ ] Support category filters (e.g., `in:policies`, `in:playbook`, `role:cmp`)

### Task 3.2 — Search UI
- [ ] Persistent search bar in header (keyboard shortcut: Ctrl+K or /)
- [ ] Instant results dropdown as user types (debounced 150ms)
- [ ] Results grouped by source (Policies, Controls, QA Playbook, Purposes)
- [ ] Each result shows: title, snippet with highlighted match, source badge
- [ ] Click result → navigate to section with search term highlighted in content
- [ ] Search history in localStorage (last 10 searches)

### Task 3.3 — Filtering & Faceted Browse
- [ ] Filter panel (toggleable):
  - By role: CMP, Publisher, Vendor
  - By compliance area: UI/UX, TC String, Signal Propagation, LI, Vendor Mgmt, Attestation
  - By content source: Policies, Controls Catalogue, QA Playbook
  - By purpose number (1–11)
- [ ] Active filter badges showing current filters
- [ ] Bookmark/favorite toggle on any section (persisted to localStorage)
- [ ] Bookmarks accessible from sidebar and dashboard

---

## Phase 4: Screenshot Validator

**Goal:** Build the screenshot upload and validation UI.

### Task 4.1 — Screenshot Upload UI
- [ ] Create `js/screenshot.js`
- [ ] Upload interface:
  - Drag-and-drop zone or file picker
  - Paste from clipboard (Ctrl+V)
  - Screenshot type selector: Initial Layer / Secondary Layer / Privacy Policy / TC String Output / Data Usage Settings
- [ ] Image preview with zoom/pan
- [ ] Side-by-side layout: screenshot on left, checklist on right

### Task 4.2 — Validation Checklists
- [ ] Create `data/checklists.js` — context-aware checklists per screenshot type:

  **Initial Layer Checklist** (mapped to Appendix B.C.b):
  - [ ] Info about device storage/access (cookies, identifiers) — B.C.b.I
  - [ ] Info about personal data processing — B.C.b.II
  - [ ] Third-party vendor info + count + link to named list — B.C.b.III
  - [ ] Purpose list using standardized names or stacks — B.C.b.IV
  - [ ] Special Features information — B.C.b.V
  - [ ] Consequences of consenting/not consenting — B.C.b.VI (should)
  - [ ] Scope info (service-specific or group-specific) — B.C.b.VII
  - [ ] Consent withdrawal info + how to resurface UI — B.C.b.VIII
  - [ ] LI mention with link to LI layer — B.C.b.IX (should)
  - [ ] Accept/consent CTA — B.C.b.X
  - [ ] Customize/advanced settings CTA — B.C.b.XI
  - [ ] No pre-selected consents — Controls Catalogue
  - [ ] Modal/banner covers all/substantially all content — B.C.a
  - [ ] CTAs visible, legible, not appearing disabled — B.C.g
  - [ ] CTA text treatment matches (font, size, style) — B.C.g
  - [ ] CTA contrast ratio ≥ 5:1 — B.C.g

  **Secondary Layer Checklist** (mapped to Appendix B.C.c):
  - [ ] Named vendor list with privacy policy links — B.C.c.I
  - [ ] Vendor purposes, special purposes, legal bases, retention periods — B.C.c.I
  - [ ] Vendor features, special features — B.C.c.I
  - [ ] Vendor data categories — B.C.c.I
  - [ ] Purpose/SP/Feature/SF list with full user-friendly text + illustrations — B.C.c.II
  - [ ] Number of vendors per purpose shown — B.C.c.II
  - [ ] Granular per-vendor consent controls — B.C.c.III
  - [ ] Granular per-purpose consent controls — B.C.c.III
  - [ ] Granular per-special-feature opt-in controls — B.C.c.IV
  - [ ] Default choice = "no consent" / "off" — B.C.d
  - [ ] LI info visible or linked — B.C.c.V
  - [ ] Consequences info — B.C.c.VI
  - [ ] Storage duration info per vendor — B.C.c.VII

  **Legitimate Interest Layer Checklist** (mapped to Appendix B.D.c):
  - [ ] Personal data processing info — B.D.c.I
  - [ ] Scope info (service/group) — B.D.c.II
  - [ ] Object controls available — B.D.c.III
  - [ ] Purpose/SP list with full text + illustrations — B.D.c.IV
  - [ ] Number of vendors per LI purpose — B.D.c.IV
  - [ ] Per-vendor and per-purpose object controls — B.D.c.V
  - [ ] Named vendor list with privacy policies, purposes, LI links, retention, features, data categories — B.D.c.VI
  - [ ] CMP storage/access duration info — B.D.c.VII

  **Privacy Policy / Attestation Checklist**:
  - [ ] Participation in IAB Europe TCF affirmed — Ch.IV §17.2
  - [ ] Compliance with Policies & Specifications affirmed — Ch.IV §17.2
  - [ ] CMP ID 198 referenced — Ch.IV §17.2
  - [ ] Privacy policy prominently linked from app — Ch.IV §16.2

  **TC String Output Checklist** (from QA Playbook):
  - [ ] String successfully parses in IAB GPP decoder
  - [ ] Purpose consents match expected state (all on for accept, all off for decline)
  - [ ] Vendor consents match expected state
  - [ ] Vendors disclosed populated with all shown vendors
  - [ ] Legitimate interest bits correct
  - [ ] Consent screen value correct (0 = initial layer)
  - [ ] Vendor legitimate interests match expected state

- [ ] Each checklist item: checkbox, policy reference link, severity indicator
- [ ] Progress indicator (X of Y items checked)
- [ ] Summary: pass count, fail count, unchecked count

### Task 4.3 — AI-Enhanced Analysis (Optional)
- [ ] Settings panel: API key input for OpenAI, stored in localStorage
- [ ] "AI Analyze" button (only shown when API key configured)
- [ ] On click:
  1. Convert screenshot to base64
  2. Send to OpenAI GPT-4 Vision API with system prompt:
     - Include the relevant checklist items as context
     - Ask model to evaluate each item visible in the screenshot
     - Request structured JSON response with item ID, pass/fail/unclear, reasoning
  3. Map AI response to checklist items as suggestions (highlighted, not auto-checked)
  4. Show AI confidence and reasoning per item
- [ ] Error handling: rate limits, invalid key, network errors
- [ ] Privacy notice: "Screenshot will be sent to OpenAI API for analysis"
- [ ] Graceful degradation: tool fully functional without AI

---

## Phase 5: Settings, Bookmarks & Polish

**Goal:** Settings panel, bookmarks, accessibility, final polish.

### Task 5.1 — Settings Panel
- [ ] Settings modal accessible from header gear icon:
  - Dark mode toggle
  - OpenAI API key input (with show/hide toggle)
  - Clear all saved data (assessments, bookmarks, search history)
  - About / version info

### Task 5.2 — Bookmarks
- [ ] Star/bookmark icon on every section heading
- [ ] Bookmarks list in sidebar (collapsible)
- [ ] Bookmarks persisted to localStorage

### Task 5.3 — Keyboard Navigation & Accessibility
- [ ] Skip-to-content link
- [ ] All interactive elements keyboard-focusable
- [ ] ARIA labels on navigation, search, modals
- [ ] Focus management on modal open/close
- [ ] Ctrl+K or / to focus search

### Task 5.4 — Print & Export
- [ ] Print stylesheet: hide sidebar, navigation, settings; show content cleanly
- [ ] Assessment report: dedicated print layout with all questions, answers, references
- [ ] Screenshot validation: print layout with checklist results

### Task 5.5 — Testing & QA
- [ ] Verify all policy sections render correctly and are searchable
- [ ] Verify all cross-references link to correct targets
- [ ] Verify assessment flow: start, pause, resume, complete, export
- [ ] Verify screenshot upload: drag-drop, paste, file pick for each screenshot type
- [ ] Verify dark mode across all views
- [ ] Verify offline functionality (open from filesystem with no server)
- [ ] Verify print output for reports and checklists
- [ ] Test in Edge, Chrome, Firefox

---

## Implementation Order & Dependencies

```
Phase 1 ──────────────────────────────────────────────►
  1.1 HTML/CSS ─┐
  1.2 Policies  ├──► Phase 2 ─────────────────────────►
  1.3 Purposes  │     2.1 Navigation ─┐
  1.4 Controls  │     2.2 Rendering   ├──► Phase 3 ───►
  1.5 Playbook  │     2.3 Dashboard   │     3.1 Index
  1.6 CrossRef ─┘     2.4 Edge Cases ─┘     3.2 UI  ──► Phase 4 ──► Phase 5
                                            3.3 Filter    4.1-4.3     5.1-5.5
```

**Phase 4 depends on Phases 1–3.** Phase 5 is final polish.

---

## File-by-File Build Order

| Order | File | Phase | Description |
|-------|------|-------|-------------|
| 1 | `index.html` | 1.1 | App shell, layout, modals |
| 2 | `css/styles.css` | 1.1 | Full stylesheet with dark mode |
| 3 | `data/policies.js` | 1.2 | TCF Policies structured data |
| 4 | `data/purposes.js` | 1.3 | Purposes, Features, Stacks data |
| 5 | `data/controls.js` | 1.4 | Controls Catalogue data |
| 6 | `data/playbook.js` | 1.5 | QA Playbook data |
| 7 | `data/crossref.js` | 1.6 | Cross-reference mappings |
| 8 | `js/navigation.js` | 2.1–2.4 | Sidebar, routing, content rendering |
| 9 | `js/search.js` | 3.1–3.3 | Search index, UI, filtering |
| 10 | `data/checklists.js` | 4.2 | Screenshot validation checklists |
| 11 | `js/screenshot.js` | 4.1, 4.3 | Upload, checklist UI, AI integration |
| 12 | `js/settings.js` | 5.1–5.2 | Settings, bookmarks |
| 13 | `js/app.js` | 5.3–5.5 | App init, keyboard nav, final wiring |

---

*Ready to proceed with implementation when you give the go-ahead.*
