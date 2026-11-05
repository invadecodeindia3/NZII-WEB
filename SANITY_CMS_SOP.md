# NZII Sanity CMS — Standard Operating Procedure (SOP)

This document provides complete operational instructions for managing all text, images, and documents on the Net Zero India Initiative (NZII) platform via Sanity Studio CMS.

---

## 1. System URLs & Credentials Reference

| Service | Environment | URL | Purpose |
| :--- | :--- | :--- | :--- |
| **NZII Web Platform** | Production | [https://nzii2.vercel.app](https://nzii2.vercel.app) | Public-facing website |
| **NZII Web (Mirror)** | Production | [https://nzi-web.vercel.app](https://nzi-web.vercel.app) | Secondary production alias |
| **Sanity CMS Studio** | Production | [https://nzii-studio.vercel.app](https://nzii-studio.vercel.app) | Online content management portal |
| **Sanity CMS (Local)** | Development | `http://localhost:3333` | Local development environment |
| **Sanity Management** | Cloud Console | [https://www.sanity.io/manage](https://www.sanity.io/manage) | User permissions, CORS, and project billing |

- **Sanity Project ID**: `bz23ff6t`
- **Sanity Dataset**: `production`
- **API Version**: `2024-03-01`

---

## 2. Authentication & Initial Access

1. Open **[https://nzii-studio.vercel.app](https://nzii-studio.vercel.app)** in any standard desktop browser (Google Chrome, Safari, Firefox, or Edge).
2. Choose **"Log in with Google"** or **"Log in with email"**.
3. Use the exact email address that received the workspace invitation from the project administrator.
4. Once authenticated, the Studio interface loads the primary three-column workspace layout:

![Sanity Studio Navigation Panel](/Users/Shravani/.gemini/antigravity/brain/cadbc33b-b8da-4e5c-8f9a-c089188a31e1/sanity-studio-sidebar.png)

---

## 3. Studio Architecture & Content Layout

The CMS is organized into two distinct document structures:

### A. Singletons (Global & Page-Level Documents)
Singletons control unique pages where only one instance exists. Selecting them in the sidebar immediately presents the live document:

1. **Site Settings (Header & Footer)**:
   - Primary Light & Dark SVG brand logos.
   - Global site title and accessibility descriptors.
   - Footer descriptive paragraph and dual copyright/tagline lines.
2. **Home Page**:
   - Hero headlines (Lines 1, 2, and 3), narrative paragraphs, and button copy/link.
   - Five interactive floating hero bubble photographs.
   - "Why NZII Exists" section: eyebrow, title, accent, 6 choice bullets, closing paragraph, and workshop photograph.
   - Four research pillars: numbers, headings, and granular descriptions.
   - "Led by India" collaboration copy and partner institution descriptors.
   - "Explore Our Work" featured research card and secondary engagement links.
   - "Latest from NZII" update cards and final call-to-action banner.
3. **About Page**:
   - Hero headline, accent text, and institutional background copy.
   - Four organizational principles (Rigorous, Independent, Collaborative, Open).
   - Principal Investigators (PIs): photos, titles, institutional tags, and Google Scholar / LinkedIn URLs.
   - IIT Delhi Research Team, Administration Team, and Partner Institutional rosters (Prayas & Princeton).
4. **Collaborations Page**:
   - RFN Open Calls headline, institutional preamble, and round status.
   - Submission deadlines, honorarium terms, and application links.

### B. Collections (Repeatable Document Entities)
Collections represent multiple records of a given type:

1. **Advisory Committee Member**:
   - 20-member directory. Each document stores member name, institutional affiliation, role, 2-letter avatar initials, Google Scholar URL, LinkedIn URL, and numerical sort order.
2. **Collaborator**:
   - Academic and institutional research collaborators with photos, titles, and biography links.
3. **Open Call for Collaboration**:
   - Thematic call definitions with call number, duration of stay, and guidelines.
4. **News & Event**:
   - Editorial articles, workshop summaries, and dated updates with featured cover images.
5. **Media Library (OneDrive Photos)**:
   - Master catalog of all 24 high-resolution research theme photographs (`1.jpg` through `24.jpg`) and convening documentation.

---

## 4. Content Modification Workflows

### 4.1 Updating Text Content
1. In the leftmost sidebar column, select the target document (e.g., **Home Page**).
2. In the center document column, click **Home Page (Live)**.
3. The editor panel opens on the right.
4. Locate the desired field (e.g., `Hero Headline Line 1`).
5. Enter the updated string directly into the input field.
6. Observe that the status indicator in the lower right shifts from **"Published"** to **"Draft"**.

### 4.2 Updating Photographs & Images

Every image field supports hot-swapping through two mechanisms:

#### Mechanism 1: Using the Pre-loaded Media Library (Recommended)
1. Navigate to the image field (e.g., `Why Section Photo`).
2. Click **"Select"** on the image card.
3. The integrated asset selector displays all pre-uploaded OneDrive and workshop imagery.
4. Select the target photograph and confirm.

#### Mechanism 2: Direct Local File Upload
1. Drag and drop any image file (`.jpg`, `.png`, `.webp`, `.svg`) directly into the upload card, or click **"Upload"** to browse your local filesystem.
2. Click the **"Crop / Hotspot"** control icon on the uploaded thumbnail:
   - Move the circular hotspot to the critical focal point (e.g., a person's face or central data point).
   - The platform will maintain focus on this area across all responsive screen sizes (mobile, tablet, desktop).

![Live Platform Synchronization Example](/Users/Shravani/.gemini/antigravity/brain/cadbc33b-b8da-4e5c-8f9a-c089188a31e1/live-website-preview.jpg)

### 4.3 Adding or Reordering List Items (e.g., Advisory Members)
1. Select **Advisory Committee Member** from the sidebar.
2. Click the **`+` (Create new document)** button located at the top right of the middle column.
3. Populate the required metadata:
   - **Full Name**: e.g., `Dr. Jane Doe`
   - **Initials**: e.g., `JD`
   - **Role / Affiliation**: e.g., `Professor, Indian Institute of Science`
   - **Order**: Integer defining sort position (e.g., `21` places the member after existing members).
4. Click **Publish**.

---

## 5. Publishing & Release Process

- **Automatic Draft Staging**: All keystrokes and image uploads are saved immediately to cloud staging as an unreleased draft. Edits do not affect the public website until explicitly published.
- **Pushing Live**: Click the green **"Publish"** button situated in the lower-right corner of the interface.
- **Rollback / Discard**: To abandon uncommitted draft changes, click the context menu (`...`) adjacent to the Publish button and select **"Discard changes"**.
- **Audit History**: Click the clock icon (`History`) at the top right of any document pane to view timestamps, diffs, and previous versions published by specific users.

---

## 6. User Access Management (Adding Collaborators)

To grant edit privileges to client personnel:

1. Navigate to the administrative console at **[https://www.sanity.io/manage/project/bz23ff6t/members](https://www.sanity.io/manage/project/bz23ff6t/members)**.
2. Click **"Invite member"**.
3. Supply the recipient's email address.
4. Select role:
   - **Editor**: Standard operational role. Can edit, upload, draft, and publish all content, but cannot alter API billing or destructive project settings.
   - **Administrator**: Full administrative control, including CORS domain configuration and token management.
5. Click **"Send Invite"**. The invitee will receive an automated invitation link valid for 30 days.

---

## 7. Failsafe & Technical Resilience Guarantees

1. **Codebase Fallbacks**: Every data query in the frontend codebase incorporates complete fallback strings and local asset pointers. Deleting a text field or clearing an image in Sanity will not break the UI or produce `undefined` tokens; the application will fall back to its verified default state.
2. **Bandwidth Guardrails**: All static scripts and styles are served with `Cache-Control: public, max-age=31536000, immutable`, and images are dynamically served through Sanity's global CDN with WebP/AVIF format negotiation, eliminating bandwidth spikes.
3. **CORS Enforcement**: Web clients connect exclusively via authenticated endpoints configured for `https://nzii2.vercel.app`, `https://nzi-web.vercel.app`, and `https://nzii-studio.vercel.app`.
