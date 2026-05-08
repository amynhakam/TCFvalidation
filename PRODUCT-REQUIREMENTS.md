# TCF Compliance Reference Tool — Product Requirements Document

**Version:** 1.0  
**Date:** May 6, 2026  
**CMP ID:** 198  
**Platform:** Windows Desktop App (UWP + Win32)  
**Stakeholders:** Product, Development, Compliance/Privacy  

---

## 1. Problem Statement

As a publisher operating an IAB-approved CMP (ID 198) for a Windows desktop application, there is no single unified tool that:

1. Consolidates the full TCF v2.2 Policies, Controls Catalogue, and internal QA checklists into a searchable, interactive reference.
2. Allows team members (product, dev, compliance) to quickly look up specific requirements and understand how they apply to a **non-browser, non-mobile** Windows app context.
3. Validates CMP UI screenshots against TCF Appendix B requirements and the Controls Catalogue checklists.
4. Provides guided compliance assessments (interactive Q&A) to identify gaps in implementation.
5. Addresses edge cases unique to this platform — particularly around granular consent vs. legitimate interest handling on secondary layers.

---

## 2. Target Users

| Persona | Needs |
|---------|-------|
| **Developer** | Quick lookup of technical requirements (TC String format, signal propagation, API compliance), QA test procedures |
| **Product Manager** | Understanding of UI/UX requirements, purpose/vendor management rules, stack combinations |
| **Compliance/Privacy** | Full policy text search, screenshot-based auditing, gap analysis, enforcement procedure awareness |

---

## 3. Functional Requirements

### 3.1 Unified Knowledge Base

- **FR-1:** Embed the full TCF v2.2 Policies (all chapters, appendices A & B) as structured, searchable content.
- **FR-2:** Embed the Controls Catalogue (CMP Checklist, Vendor Checklist, Enforcement Procedures) as structured, searchable content.
- **FR-3:** Embed the internal GDPR QA Playbook (accept/decline flows, TC String validation, sync pixel checks, DNT, vendor/purpose toggling, audit logging) as structured, searchable content.
- **FR-4:** Cross-reference all three sources so a user can see the policy requirement, the audit control, and the QA test procedure for any given topic.

### 3.2 Search & Navigation

- **FR-5:** Full-text search across all embedded content with instant results and highlighting.
- **FR-6:** Structured navigation by:
  - Chapter (CMP Policies, Vendor Policies, Publisher Policies, UI Requirements)
  - Topic (Purposes 1–11, Special Purposes 1–3, Features 1–3, Special Features 1–2, Stacks 1–45)
  - Checklist type (CMP Technical, CMP Policy, Vendor Technical, Vendor Registration, QA Playbook)
  - Compliance area (TC String, Signal Propagation, UI/UX, Legitimate Interest, Vendor Management, Attestation)
- **FR-7:** Filter by participant role: CMP, Publisher, Vendor (since the user operates as both Publisher and CMP).
- **FR-8:** Bookmark/favorite specific sections for quick access.

### 3.3 Interactive Compliance Assessment (Q&A)

- **FR-9:** Guided questionnaire flow organized by compliance area:
  - **UI/UX Compliance (Appendix B):** Questions about Initial Layer content, secondary layer controls, CTA design, contrast ratios, resurfacing mechanism, layered approach implementation.
  - **TC String Compliance:** Questions about string generation, encoding, purpose consent bits, vendor consent bits, legitimate interest bits, vendors disclosed.
  - **Publisher Obligations:** Attestation language, privacy policy, vendor selection process, signal forwarding.
  - **Legitimate Interest Handling:** Right-to-object UI, LI vs consent distinction, LI signal generation, secondary layer LI controls.
  - **Vendor Management:** GVL integration (925 vendors), vendor list updates, signal propagation to vendors, non-GVL vendor separation.
  - **Desktop App Specifics:** Non-browser consent storage, consent file management, app-level consent persistence, VPN/geo detection.
- **FR-10:** Each question references the specific policy section(s), control catalogue item(s), and QA playbook step(s) that apply.
- **FR-11:** Assessment generates a compliance scorecard/report showing pass/fail/needs-review for each area.
- **FR-12:** Report can be exported (print-friendly / downloadable).

### 3.4 Screenshot Upload & Validation

- **FR-13:** Upload screenshots of:
  - CMP Initial Layer (consent banner/popup)
  - Secondary Layer / Advanced Settings panel
  - Data Usage Settings screen
  - Privacy policy / attestation section
  - TC String decoder output
- **FR-14:** **Checklist-based validation (always available, no API key):**
  - Display the applicable Appendix B checklist items alongside the uploaded screenshot.
  - User manually checks off each item while viewing the screenshot side-by-side.
  - Checklist items are context-aware based on what type of screenshot was uploaded (Initial Layer vs Secondary Layer vs Privacy Policy).
  - Items include:
    - **Initial Layer:** Purpose descriptions present, vendor count shown, link to vendor list, no pre-selected consents, "Accept" CTA present, "Customize/Advanced" CTA present, consent withdrawal info, scope info, Special Feature disclosure, LI mention with link, CTA contrast ratio ≥ 5:1, matching text treatment.
    - **Secondary Layer:** Granular purpose controls, granular vendor controls, LI distinguished from consent, right-to-object controls, vendor privacy policy links, retention periods shown, features/special features listed, data categories shown, storage duration info.
    - **Privacy Policy:** TCF attestation language present, CMP ID 198 referenced, participation affirmation, compliance affirmation.
    - **TC String:** All expected purpose bits set/unset correctly, vendor consent bits match, vendors disclosed populated, consent screen value correct, LI bits correct.
- **FR-15:** **AI-enhanced validation (optional, requires OpenAI API key):**
  - If user provides an API key, use GPT-4 Vision to automatically analyze the screenshot against the checklist.
  - AI identifies potential issues (e.g., "Accept button appears larger than Decline button," "vendor count not visible," "no link to vendor list found").
  - AI results are presented as suggestions alongside the manual checklist, not as definitive pass/fail.
  - API key stored only in browser localStorage, never transmitted to any server other than OpenAI.

### 3.5 Edge Case & Guidance Reference

- **FR-16:** Dedicated section for edge cases and guidance, including:
  - Granular consent on secondary layer: consenting to individual purposes and vendors after initial accept/decline.
  - Legitimate interest on secondary layer: right-to-object mechanics, how LI signals differ from consent signals.
  - Consent state transitions: Accept → partial decline via Advanced Settings → re-accept flow.
  - Desktop app specifics: consent file storage (`%LOCALAPPDATA%\Publishers\8wekyb3d8bbwe\mcg`), non-cookie-based consent persistence.
  - Consent audit logging: what gets logged to `consentaudit.microsoftcasualgames.com/api/logconsent1`.
  - DNT (Do Not Track) interaction with GDPR consent state.
  - Sync pixel blocking/firing logic based on consent state.
  - MCGID, MUID, ANID, LiveRamp ID presence/absence based on consent state.
  - Brazil and Canada treatment as GDPR regions.
- **FR-17:** Each edge case links to the relevant TCF Policy section, Controls Catalogue item, and QA Playbook procedure.

---

## 4. Non-Functional Requirements

### 4.1 Deployment & Hosting
- **NFR-1:** Static web application (HTML + CSS + JS) — no server-side processing required.
- **NFR-2:** Hosted as a GitHub repository; users clone and open `index.html` locally in a browser.
- **NFR-3:** Must work offline (all policy/checklist content embedded, no external dependencies for core functionality).
- **NFR-4:** AI features (FR-15) require internet access and API key — gracefully degrade when unavailable.

### 4.2 Performance
- **NFR-5:** Search results appear within 200ms of typing.
- **NFR-6:** Page loads in under 2 seconds on a standard machine.

### 4.3 Security
- **NFR-7:** No user data collected or transmitted (except optional OpenAI API calls which go directly from browser to OpenAI).
- **NFR-8:** OpenAI API key stored only in browser localStorage; user warned about this.
- **NFR-9:** No external analytics, tracking, or third-party scripts.
- **NFR-10:** Screenshots are processed client-side only (not uploaded to any server unless AI feature is used with user's explicit action).

### 4.4 Usability
- **NFR-11:** Responsive layout suitable for desktop use (primary), tablet acceptable.
- **NFR-12:** Dark mode support.
- **NFR-13:** Print-friendly view for compliance reports and checklists.
- **NFR-14:** Keyboard-navigable for accessibility.

---

## 5. Content Structure

```
┌─────────────────────────────────────────────────────┐
│  TCF Compliance Reference Tool                      │
├─────────────────────────────────────────────────────┤
│  [Search Bar]                          [Settings ⚙] │
├──────────┬──────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                       │
│          │                                          │
│ ▸ Dashboard                                         │
│ ▸ Policies                                          │
│   ├ CMP (Ch. II)                                    │
│   ├ Vendor (Ch. III)                                │
│   ├ Publisher (Ch. IV)                               │
│   └ User Interaction (Ch. V)                        │
│ ▸ Purposes & Features                               │
│   ├ Purposes 1-11                                   │
│   ├ Special Purposes 1-3                            │
│   ├ Features 1-3                                    │
│   ├ Special Features 1-2                            │
│   └ Stacks 1-45                                     │
│ ▸ UI Requirements (Appendix B)                      │
│   ├ Initial Layer                                   │
│   ├ Secondary Layer                                 │
│   ├ Legitimate Interest Layer                       │
│   └ CTA & Design Rules                              │
│ ▸ Controls Catalogue                                │
│   ├ CMP Checklist                                   │
│   ├ Vendor Checklist                                │
│   └ Enforcement Procedures                          │
│ ▸ QA Playbook                                       │
│   ├ Accept Flow                                     │
│   ├ Decline Flow                                    │
│   ├ State Transitions                               │
│   ├ TC String Validation                            │
│   ├ Sync Pixel Logic                                │
│   └ ID Presence Checks                              │
│ ▸ Compliance Assessment                             │
│ ▸ Screenshot Validator                              │
│ ▸ Edge Cases & Guidance                             │
└──────────┴──────────────────────────────────────────┘
```

---

## 6. Key Interactions

### 6.1 Search Flow
1. User types query (e.g., "legitimate interest secondary layer").
2. Results show across all content sources (Policies, Controls, QA Playbook) with category badges.
3. Click result → navigates to section with search term highlighted.

### 6.2 Compliance Assessment Flow
1. User selects compliance area (e.g., "UI/UX Requirements").
2. Tool presents questions one by one with relevant policy citations.
3. User answers Yes / No / Partial / N/A for each.
4. After completing a section, scorecard shows results.
5. User can export or print the report.

### 6.3 Screenshot Validation Flow
1. User selects screenshot type (Initial Layer, Secondary Layer, etc.).
2. User uploads or pastes screenshot.
3. Tool displays the screenshot alongside the relevant checklist.
4. User checks items manually.
5. (Optional) If AI is configured, user clicks "AI Analyze" to get automated suggestions.
6. Results saved to browser localStorage for future reference.

---

## 7. Out of Scope (v1)

- Server-side processing or database.
- User authentication or multi-user collaboration features.
- Automated TC String decoding (users reference external tool at iabgpp.com).
- Real-time GVL fetching or vendor list sync.
- Mobile-optimized layout (desktop-first tool).
- Automated Fiddler/network traffic analysis.

---

## 8. Success Criteria

- All TCF v2.2 Policy text, Controls Catalogue, and QA Playbook content is searchable and cross-referenced.
- A compliance assessment can be completed in under 30 minutes.
- Screenshot validation checklist covers 100% of Appendix B requirements for both Initial and Secondary layers.
- Tool works fully offline (except optional AI features).
- Product, Dev, and Compliance team members all find the tool useful for their specific workflows.

---

## 9. Open Questions

1. Should TC String decoding be built into the tool (instead of linking to iabgpp.com), or is the external tool sufficient?
2. Are there additional QA scenarios beyond the current playbook that should be incorporated (e.g., consent expiry, GVL update scenarios)?
3. Should the tool include version tracking for when TCF policies are updated (e.g., diff view between policy versions)?
4. Are there specific contrast ratio testing tools or color accessibility checks that should be built in for CTA validation?

---

*Please review this document and let me know:*
- *Any requirements to add, modify, or remove*
- *Your answers to the open questions*
- *Whether you'd like to proceed to the Implementation Plan*
