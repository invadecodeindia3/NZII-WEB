# Net Zero India Initiative (NZII)
# Sanity CMS Standard Operating Procedure (SOP)
**Document Version:** 2.0 (Production Verified)  
**Date:** November 5, 2026  
**Audience:** NZII Core Team, PurpleBlue House (PBH), Project Editors & Administrators  

---

## 1. Executive Summary & Production URLs

The Net Zero India Initiative web platform is connected directly to a headless Sanity CMS backend. Every headline, paragraph, image, logo, and roster member is editable through the cloud Studio interface without editing code or redeploying the application.

All data queries are engineered with **zero-break fallback safeguards**: if any field in the CMS is empty or cleared, the website automatically falls back to its verified default text and local asset pointer, guaranteeing the website never breaks.

### Production Environment Reference

| System Component | URL | Environment / Purpose |
| :--- | :--- | :--- |
| **NZII Web Platform** | [https://nzii2.vercel.app](https://nzii2.vercel.app) | Public production website |
| **NZII Web (Mirror)** | [https://nzi-web.vercel.app](https://nzi-web.vercel.app) | Secondary production domain |
| **Sanity CMS Studio** | [https://nzii-studio.vercel.app](https://nzii-studio.vercel.app) | Dedicated web portal for editing content |
| **Sanity Cloud Console** | [https://www.sanity.io/manage](https://www.sanity.io/manage) | Team access, member invites & CORS |
| **Local Studio (Dev)** | `http://localhost:3333` | Local development environment |

- **Sanity Project ID:** `bz23ff6t`
- **Sanity Dataset:** `production`
- **API Version:** `2024-03-01`

---

## 2. Authentication & Initial Access (Baby Steps)

1. Open **[https://nzii-studio.vercel.app](https://nzii-studio.vercel.app)** in Google Chrome, Safari, Firefox, or Edge.
2. Click **"Log in with Google"** or **"Log in with email"**.
3. Use the exact email address invited by the administrator (e.g., `updates@purplebluehouse.com` or your NZII team email).
4. Once authenticated, the Studio interface loads with three panes:
   - **Left Pane (Content Types):** Site Settings, Home Page, About Page, Collaborations Page, Advisory Board, Collaborators, Media Library.
   - **Middle Pane (Documents):** List of documents under the selected content type.
   - **Right Pane (Editor):** The form fields for the selected document.

![Sanity Studio Navigation Panel](sanity-studio-sidebar.png)

---

## 3. Real-Time Before & After Change Demonstrations

The sections below document how changes made in Sanity Studio propagate to the live website, demonstrating exact field names, before/after states, draft staging, and visual results.

---

### Case Study 1: Changing Wordings & Headlines (Text Editing)

#### Target Field
- **Document:** `Home Page` (Singleton)
- **Field in Studio:** `Hero Headline Line 1`, `Hero Headline Line 2`, `Hero Headline Line 3`
- **Live Location:** Top Hero Section on [https://nzii2.vercel.app](https://nzii2.vercel.app)

#### Step-by-Step Execution
1. In the left navigation, click **Home Page**.
2. Click **Home Page (Live)** in the middle pane.
3. Locate **Hero Headline Line 3** in the editor pane.
4. Replace the text `net zero?` with `a cleaner future?`.
5. Observe the status bar in the bottom right immediately changes to **"Draft"** (yellow dot). The public website remains unchanged while you edit.
6. Click the green **"Publish"** button in the bottom right corner.
7. Reload [https://nzii2.vercel.app](https://nzii2.vercel.app). The live headline updates immediately.

#### Real-Time Comparison

| Stage | Studio Editor State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | `Line 1: "What will it take"`<br>`Line 2: "for India to reach"`<br>`Line 3: "net zero?"`<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach net zero?"** with gradient accent on "net zero?". |
| **DURING EDIT** | Changed Line 3 to `"a cleaner future?"`<br><span style="color:#f59e0b;font-weight:bold;">● Draft (Unpublished)</span> | Public website **still displays the original text** ("net zero?"). No public disruption while typing. |
| **AFTER PUBLISH** | Status flips to: <span style="color:#10b981;font-weight:bold;">● Published</span> | Live website immediately displays: **"What will it take for India to reach a cleaner future?"** |

---

### Case Study 2: Replacing Images & Setting Focal Hotspots

#### Target Field
- **Document:** `Home Page` (Singleton)
- **Field in Studio:** `Hero Bubble 1 (Innovation)` (or `Why Section Workshop Photo`)
- **Live Location:** Animated floating circular bubble on [https://nzii2.vercel.app](https://nzii2.vercel.app)

#### Step-by-Step Execution
1. Open **Home Page** in Sanity Studio.
2. Scroll to the **Hero Floating Bubble Images** section.
3. Click on the thumbnail for **Bubble 1 (Innovation)**.
4. Click the three dots (`...`) or click **"Replace"**:
   - **Option A (Media Library):** Click **Select** to choose from the 24 pre-uploaded OneDrive research photos or workshop images.
   - **Option B (Direct Upload):** Drag-and-drop a new `.jpg` or `.png` directly from your computer.
5. Click the **"Crop / Hotspot"** tool icon on the thumbnail:
   - Drag the circular focal target onto the central subject of the photo (e.g., person or solar array). This guarantees the image will never be awkwardly cropped on mobile devices.
6. Click **Publish**.
7. Reload the live website to see the updated floating bubble.

#### Real-Time Comparison

| Stage | Studio Editor State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | Asset: `innovation.jpg` (Rooftop solar installation)<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Floating bubble #1 displays the solar rooftop photo inside an animated organic SVG mask. |
| **DURING EDIT** | New photo selected from OneDrive catalog; Hotspot centered on focal point.<br><span style="color:#f59e0b;font-weight:bold;">● Draft</span> | Live site continues showing the rooftop solar photo with zero interruption. |
| **AFTER PUBLISH** | Green Published indicator confirms CDN sync. | Floating bubble #1 instantly displays the new research photograph with smooth floating CSS animation. |

---

### Case Study 3: Modifying Names, Designations & Team Rosters

#### Target Field
- **Document:** `Collaborator` (Collection) or `Advisory Committee Member`
- **Field in Studio:** `Full Name`, `Role / Affiliation`, `Initials`, `Profile Photo`
- **Live Location:** Consortium & People directory at [https://nzii2.vercel.app/consortium](https://nzii2.vercel.app/consortium)

#### Step-by-Step Execution
1. In the left navigation, click **Collaborators** (or **Advisory Committee Member**).
2. Select the person you wish to update (e.g., `Dr. Anurag Gumber`).
3. To update their title, click the **Role / Affiliation** field.
4. Replace `Postdoctoral Researcher, Princeton University` with `Senior Research Fellow, Climate Policy, Princeton University`.
5. If replacing their photo, click **Replace** on the **Photo** field and upload an updated headshot.
6. Click the green **Publish** button.
7. Open [https://nzii2.vercel.app/consortium](https://nzii2.vercel.app/consortium). The member's card and bio reflect the new title immediately.

#### Real-Time Comparison

| Stage | Studio Document State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | Name: `Dr. Anurag Gumber`<br>Role: `Postdoctoral Researcher, Princeton University`<br>Photo: `collab-anurag-gumber.jpg` | Card displays: **Dr. Anurag Gumber**, under-title: "Postdoctoral Researcher, Princeton University". |
| **DURING EDIT** | Role edited to: `"Senior Research Fellow, Climate Policy"`<br>Status: <span style="color:#f59e0b;font-weight:bold;">● Draft</span> | Consortium directory continues showing previous designation. |
| **AFTER PUBLISH** | Published live to Sanity CDN. | Card updates instantly to: **Dr. Anurag Gumber**, "Senior Research Fellow, Climate Policy". |

---

### Case Study 4: Adding a New Advisory Board Member

#### Step-by-Step Execution
1. In the left navigation, click **Advisory Committee Member**.
2. Click the **`+` (Create new document)** button at the top of the middle pane.
3. Fill in the required fields:
   - **Full Name:** e.g., `Dr. Rajesh Sharma`
   - **Initials:** `RS` (used for the circular avatar badge)
   - **Role / Affiliation:** e.g., `Professor, Energy Policy Institute`
   - **Sort Order:** `21` (positions them sequentially after existing 20 members)
   - **Google Scholar URL / LinkedIn URL:** (Optional)
4. Click **Publish**.
5. The Advisory Committee grid on the website expands to 21 members automatically.

---

## 4. CMS Document Architecture Reference

### A. Singletons (Global & Single-Page Controllers)

| Document | Key Managed Fields | Fallback Behavior |
| :--- | :--- | :--- |
| **Site Settings** | Light SVG Logo, Dark SVG Logo, Global Title, Footer Narrative, Footer Tagline 1, Footer Tagline 2 | Reverts to bundled SVG logos and official NZII mission copy |
| **Home Page** | 3 Hero Headlines, 2 Narrative Paragraphs, Button Text & Link, 5 Floating Bubble Photos, "Why NZII Exists" (Eyebrow, Title, Accent, 6 Bullet Points, Closing Copy, Workshop Photo), 4 Research Pillars, "Led by India" Copy, Work Card, News Cards | Reverts to approved launch text and local high-res imagery |
| **About Page** | Hero Headline, Accent Phrasing, 4 Principles (Rigorous, Independent, Collaborative, Open), 3 Principal Investigators (Photos, Names, Titles, Links), IIT Delhi Researchers, Admin Team, Partner Institutions | Reverts to verified institutional roster and academic citations |
| **Collaborations Page** | RFN Open Calls Headline, Institutional Preamble, Round Status, Submission Deadlines, Application Links | Reverts to official round specifications |

### B. Collections (Repeatable Entity Lists)

| Collection | Entity Attributes | Usage |
| :--- | :--- | :--- |
| **Advisory Committee Member** | Name, Initials, Affiliation, Order, Scholar/LinkedIn URLs | Powers the 20+ member advisory directory on Consortium page |
| **Collaborator** | Name, Photo, Role, Bio, Institution | Powers academic and technical research partner cards |
| **Media Library** | Title, Category, High-res Image file | Contains all 24 OneDrive research photos and convening assets |
| **News & Event** | Title, Date, Slug, Cover Image, Summary, Article Body | Manages announcements, workshop reports, and media releases |

---

## 5. Editorial Controls: Drafts, Rollbacks & Audit Trails

1. **Automatic Draft Staging:**
   - Every character typed is saved as an instant cloud draft. Edits will **never** go live until the **Publish** button is clicked.
2. **Discarding an Unwanted Edit:**
   - If an error is made while editing a draft, click the three dots (`...`) adjacent to the Publish button at the bottom right.
   - Select **"Discard changes"**. The document reverts to the last published version.
3. **Audit History & 1-Click Rollback:**
   - Click the **clock icon ("History")** in the top right header of any document pane.
   - Review past published versions with timestamps and user names.
   - Click **"Restore"** on any previous version to revert the document instantly.

---

## 6. Managing User Permissions & Adding Team Members

To grant editor access to client team members:

1. Log into the administrative console: **[https://www.sanity.io/manage/project/bz23ff6t/members](https://www.sanity.io/manage/project/bz23ff6t/members)**.
2. Click **"Invite member"** (top right).
3. Enter the recipient's email address.
4. Select Role:
   - **Editor (Recommended):** Full permission to edit, draft, upload images, and publish content. Cannot alter API billing, CORS, or delete project.
   - **Administrator:** Full project control.
5. Click **"Send Invite"**. The invitee receives an email with an activation link.

---

## 7. Failsafe Guarantees & Technical Resilience

1. **Zero-Break Frontend Fallbacks:** Every Sanity query in `src/sanity/queries.js` and every React component (`HomePage.jsx`, `AboutPage.jsx`, `ConsortiumPage.jsx`, `Header.jsx`, `Footer.jsx`) includes hardcoded fallbacks. Clearing a field or deleting an image in Sanity will **never** display broken `[object Object]`, blank boxes, or `404` errors.
2. **High-Performance CDN Delivery:** All images served via Sanity are routed through a global image CDN that automatically converts assets to modern `.webp` and `.avif` formats and resizes them dynamically according to screen resolution.
3. **CORS Security:** Direct API access is strictly limited to authorized production domains (`https://nzii2.vercel.app`, `https://nzi-web.vercel.app`, and `https://nzii-studio.vercel.app`).
