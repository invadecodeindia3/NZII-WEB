import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const todayDir1 = "/Users/Shravani/Downloads/05-11-2026";
const todayDir2 = "/Users/Shravani/Downloads/NZII_SOP_05-11-2026";
const artifactDir = "/Users/Shravani/.gemini/antigravity/brain/cadbc33b-b8da-4e5c-8f9a-c089188a31e1";
const repoDir = "/Users/Shravani/Downloads/NZII-2-main";

const markdownContent = `# Net Zero India Initiative (NZII)
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
| **Local Studio (Dev)** | \`http://localhost:3333\` | Local development environment |

- **Sanity Project ID:** \`bz23ff6t\`
- **Sanity Dataset:** \`production\`
- **API Version:** \`2024-03-01\`

---

## 2. Authentication & Initial Access (Baby Steps)

1. Open **[https://nzii-studio.vercel.app](https://nzii-studio.vercel.app)** in Google Chrome, Safari, Firefox, or Edge.
2. Click **"Log in with Google"** or **"Log in with email"**.
3. Use the exact email address invited by the administrator (e.g., \`updates@purplebluehouse.com\` or your NZII team email).
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
- **Document:** \`Home Page\` (Singleton)
- **Field in Studio:** \`Hero Headline Line 1\`, \`Hero Headline Line 2\`, \`Hero Headline Line 3\`
- **Live Location:** Top Hero Section on [https://nzii2.vercel.app](https://nzii2.vercel.app)

#### Step-by-Step Execution
1. In the left navigation, click **Home Page**.
2. Click **Home Page (Live)** in the middle pane.
3. Locate **Hero Headline Line 3** in the editor pane.
4. Replace the text \`net zero?\` with \`a cleaner future?\`.
5. Observe the status bar in the bottom right immediately changes to **"Draft"** (yellow dot). The public website remains unchanged while you edit.
6. Click the green **"Publish"** button in the bottom right corner.
7. Reload [https://nzii2.vercel.app](https://nzii2.vercel.app). The live headline updates immediately.

#### Real-Time Comparison

| Stage | Studio Editor State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | \`Line 1: "What will it take"\`<br>\`Line 2: "for India to reach"\`<br>\`Line 3: "net zero?"\`<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach net zero?"** with gradient accent on "net zero?". |
| **DURING EDIT** | Changed Line 3 to \`"a cleaner future?"\`<br><span style="color:#f59e0b;font-weight:bold;">● Draft (Unpublished)</span> | Public website **still displays the original text** ("net zero?"). No public disruption while typing. |
| **AFTER PUBLISH** | Status flips to: <span style="color:#10b981;font-weight:bold;">● Published</span> | Live website immediately displays: **"What will it take for India to reach a cleaner future?"** |

---

### Case Study 2: Replacing Images & Setting Focal Hotspots

#### Target Field
- **Document:** \`Home Page\` (Singleton)
- **Field in Studio:** \`Hero Bubble 1 (Innovation)\` (or \`Why Section Workshop Photo\`)
- **Live Location:** Animated floating circular bubble on [https://nzii2.vercel.app](https://nzii2.vercel.app)

#### Step-by-Step Execution
1. Open **Home Page** in Sanity Studio.
2. Scroll to the **Hero Floating Bubble Images** section.
3. Click on the thumbnail for **Bubble 1 (Innovation)**.
4. Click the three dots (\`...\`) or click **"Replace"**:
   - **Option A (Media Library):** Click **Select** to choose from the 24 pre-uploaded OneDrive research photos or workshop images.
   - **Option B (Direct Upload):** Drag-and-drop a new \`.jpg\` or \`.png\` directly from your computer.
5. Click the **"Crop / Hotspot"** tool icon on the thumbnail:
   - Drag the circular focal target onto the central subject of the photo (e.g., person or solar array). This guarantees the image will never be awkwardly cropped on mobile devices.
6. Click **Publish**.
7. Reload the live website to see the updated floating bubble.

#### Real-Time Comparison

| Stage | Studio Editor State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | Asset: \`innovation.jpg\` (Rooftop solar installation)<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Floating bubble #1 displays the solar rooftop photo inside an animated organic SVG mask. |
| **DURING EDIT** | New photo selected from OneDrive catalog; Hotspot centered on focal point.<br><span style="color:#f59e0b;font-weight:bold;">● Draft</span> | Live site continues showing the rooftop solar photo with zero interruption. |
| **AFTER PUBLISH** | Green Published indicator confirms CDN sync. | Floating bubble #1 instantly displays the new research photograph with smooth floating CSS animation. |

---

### Case Study 3: Modifying Names, Designations & Team Rosters

#### Target Field
- **Document:** \`Collaborator\` (Collection) or \`Advisory Committee Member\`
- **Field in Studio:** \`Full Name\`, \`Role / Affiliation\`, \`Initials\`, \`Profile Photo\`
- **Live Location:** Consortium & People directory at [https://nzii2.vercel.app/consortium](https://nzii2.vercel.app/consortium)

#### Step-by-Step Execution
1. In the left navigation, click **Collaborators** (or **Advisory Committee Member**).
2. Select the person you wish to update (e.g., \`Dr. Anurag Gumber\`).
3. To update their title, click the **Role / Affiliation** field.
4. Replace \`Postdoctoral Researcher, Princeton University\` with \`Senior Research Fellow, Climate Policy, Princeton University\`.
5. If replacing their photo, click **Replace** on the **Photo** field and upload an updated headshot.
6. Click the green **Publish** button.
7. Open [https://nzii2.vercel.app/consortium](https://nzii2.vercel.app/consortium). The member's card and bio reflect the new title immediately.

#### Real-Time Comparison

| Stage | Studio Document State | Public Website Render |
| :--- | :--- | :--- |
| **BEFORE** | Name: \`Dr. Anurag Gumber\`<br>Role: \`Postdoctoral Researcher, Princeton University\`<br>Photo: \`collab-anurag-gumber.jpg\` | Card displays: **Dr. Anurag Gumber**, under-title: "Postdoctoral Researcher, Princeton University". |
| **DURING EDIT** | Role edited to: \`"Senior Research Fellow, Climate Policy"\`<br>Status: <span style="color:#f59e0b;font-weight:bold;">● Draft</span> | Consortium directory continues showing previous designation. |
| **AFTER PUBLISH** | Published live to Sanity CDN. | Card updates instantly to: **Dr. Anurag Gumber**, "Senior Research Fellow, Climate Policy". |

---

### Case Study 4: Adding a New Advisory Board Member

#### Step-by-Step Execution
1. In the left navigation, click **Advisory Committee Member**.
2. Click the **\`+\` (Create new document)** button at the top of the middle pane.
3. Fill in the required fields:
   - **Full Name:** e.g., \`Dr. Rajesh Sharma\`
   - **Initials:** \`RS\` (used for the circular avatar badge)
   - **Role / Affiliation:** e.g., \`Professor, Energy Policy Institute\`
   - **Sort Order:** \`21\` (positions them sequentially after existing 20 members)
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
   - If an error is made while editing a draft, click the three dots (\`...\`) adjacent to the Publish button at the bottom right.
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

1. **Zero-Break Frontend Fallbacks:** Every Sanity query in \`src/sanity/queries.js\` and every React component (\`HomePage.jsx\`, \`AboutPage.jsx\`, \`ConsortiumPage.jsx\`, \`Header.jsx\`, \`Footer.jsx\`) includes hardcoded fallbacks. Clearing a field or deleting an image in Sanity will **never** display broken \`[object Object]\`, blank boxes, or \`404\` errors.
2. **High-Performance CDN Delivery:** All images served via Sanity are routed through a global image CDN that automatically converts assets to modern \`.webp\` and \`.avif\` formats and resizes them dynamically according to screen resolution.
3. **CORS Security:** Direct API access is strictly limited to authorized production domains (\`https://nzii2.vercel.app\`, \`https://nzi-web.vercel.app\`, and \`https://nzii-studio.vercel.app\`).
`;

// Create HTML content with publication styling and before/after cards
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NZII Sanity CMS — Standard Operating Procedure (SOP)</title>
  <style>
    :root {
      --bg: #faf7f2;
      --card-bg: #ffffff;
      --text: #1a1a1a;
      --text-muted: #555555;
      --border: #e6dfd5;
      --primary: #1e3a8a;
      --accent: #2563eb;
      --green: #059669;
      --amber: #d97706;
      --tag-bg: #f3ede2;
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      padding: 40px 24px;
    }
    .container {
      max-width: 1040px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 56px 48px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.04);
    }
    header {
      border-bottom: 2px solid var(--border);
      padding-bottom: 28px;
      margin-bottom: 40px;
    }
    .badge-pill {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 16px;
      color: var(--text-muted);
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      background: var(--bg);
      padding: 16px 20px;
      border-radius: 10px;
      margin-top: 24px;
      font-size: 13px;
    }
    .meta-item strong { display: block; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
    h2 {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin: 44px 0 16px 0;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      letter-spacing: -0.01em;
    }
    h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin: 28px 0 12px 0;
    }
    p, li {
      font-size: 15px;
      color: #334155;
      margin-bottom: 12px;
    }
    ul, ol { padding-left: 24px; margin-bottom: 16px; }
    li { margin-bottom: 6px; }
    a { color: var(--accent); text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
    code {
      font-family: var(--font-mono);
      font-size: 13px;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 12px 14px;
      text-align: left;
    }
    th {
      background: #f8fafc;
      font-weight: 600;
      color: #1e293b;
    }
    .url-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 20px 0;
    }
    .url-box {
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      background: #ffffff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }
    .url-box .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 4px;
    }
    .url-box .link {
      font-size: 15px;
      font-weight: 700;
      color: var(--primary);
      word-break: break-all;
    }
    .url-box .desc {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }
    .img-preview {
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--border);
      margin: 16px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    /* Before & After Comparison Cards */
    .compare-container {
      background: #fdfcfb;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .compare-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .compare-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 768px) {
      .compare-grid, .url-card { grid-template-columns: 1fr; }
      .container { padding: 24px 16px; }
    }
    .compare-card {
      border-radius: 10px;
      padding: 16px;
      border: 1px solid #e2e8f0;
    }
    .card-before {
      background: #fff8f8;
      border-color: #fecaca;
    }
    .card-after {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .tag-before { color: #dc2626; }
    .tag-after { color: #16a34a; }
    .status-badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
    }
    .status-published { background: #dcfce7; color: #15803d; }
    .status-draft { background: #fef3c7; color: #b45309; }
    .render-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 14px;
      margin-top: 10px;
      font-size: 14px;
    }
    .render-box-title {
      font-size: 11px;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .step-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 700;
      margin-right: 6px;
    }
    .note-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 14px;
      color: #1e40af;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { border: none; box-shadow: none; padding: 0; }
      .img-preview { max-height: 260px; object-fit: contain; }
    }
  </style>
</head>
<body>

<div class="container">

  <header>
    <div class="badge-pill">Operational SOP · Sanity CMS</div>
    <h1>Net Zero India Initiative (NZII)</h1>
    <div class="subtitle">Complete Standard Operating Procedure for Content, Image & Team Management</div>
    
    <div class="meta-grid">
      <div class="meta-item">
        <strong>Document Version</strong>
        2.0 (Production Verified)
      </div>
      <div class="meta-item">
        <strong>Sanity Project ID</strong>
        <code>bz23ff6t</code> (Dataset: <code>production</code>)
      </div>
      <div class="meta-item">
        <strong>Audience</strong>
        NZII Leadership, PBH, Content Editors
      </div>
      <div class="meta-item">
        <strong>Effective Date</strong>
        November 5, 2026
      </div>
    </div>
  </header>

  <h2>1. Production URLs Reference</h2>

  <div class="url-card">
    <div class="url-box">
      <div class="label">Public Website (Production)</div>
      <div class="link"><a href="https://nzii2.vercel.app" target="_blank">https://nzii2.vercel.app</a></div>
      <div class="desc">Live public website. Fetches content directly from Sanity CDN.</div>
    </div>
    <div class="url-box">
      <div class="label">Sanity CMS Studio (Production)</div>
      <div class="link"><a href="https://nzii-studio.vercel.app" target="_blank">https://nzii-studio.vercel.app</a></div>
      <div class="desc">Online editing portal for NZII team and PBH editors.</div>
    </div>
    <div class="url-box">
      <div class="label">Secondary Production Mirror</div>
      <div class="link"><a href="https://nzi-web.vercel.app" target="_blank">https://nzi-web.vercel.app</a></div>
      <div class="desc">Production alias mirror. Synchronized identically with nzii2.</div>
    </div>
    <div class="url-box">
      <div class="label">Sanity Management Console</div>
      <div class="link"><a href="https://www.sanity.io/manage/project/bz23ff6t" target="_blank">https://www.sanity.io/manage</a></div>
      <div class="desc">Administrative portal for inviting team members and setting roles.</div>
    </div>
  </div>

  <h2>2. Quick Access & Authentication (Baby Steps)</h2>
  <ol>
    <li>Open <strong><a href="https://nzii-studio.vercel.app" target="_blank">https://nzii-studio.vercel.app</a></strong> in Google Chrome, Safari, or Edge.</li>
    <li>Select <strong>"Log in with Google"</strong> or <strong>"Log in with email"</strong>.</li>
    <li>Enter the authorized email (e.g. <code>updates@purplebluehouse.com</code> or your NZII team email).</li>
    <li>Upon login, the Studio layout appears in three organized panels:</li>
  </ol>

  <img src="sanity-studio-sidebar.png" alt="Sanity Studio Navigation Panel" class="img-preview" />

  <h2>3. Real-Time Before & After Demonstrations</h2>
  <p>The examples below illustrate exactly how changes in Sanity Studio propagate to the live website, demonstrating field names, draft staging, and visual outcomes.</p>

  <!-- CASE STUDY 1 -->
  <div class="compare-container">
    <div class="compare-title">
      <span class="step-badge">1</span> Case Study 1: Modifying Wordings & Headlines (Text Changes)
    </div>
    <p style="font-size: 14px; color: #475569;">
      <strong>Target:</strong> Home Page Hero Headlines &bull; 
      <strong>Document:</strong> <code>Home Page</code> (Singleton) &bull; 
      <strong>Field:</strong> <code>Hero Headline Line 3</code>
    </p>

    <div class="compare-grid">
      <!-- BEFORE -->
      <div class="compare-card card-before">
        <div class="card-header">
          <span class="tag-before">Before Change</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Studio Field Value:</div>
        <code>Line 3: "net zero?"</code>

        <div class="render-box">
          <div class="render-box-title">Live Website Render</div>
          <div style="font-size: 16px; font-weight: 700; color: #0f172a; line-height: 1.3;">
            What will it take<br>
            for India to reach<br>
            <span style="color: #2563eb;">net zero?</span>
          </div>
        </div>
      </div>

      <!-- AFTER -->
      <div class="compare-card card-after">
        <div class="card-header">
          <span class="tag-after">After Publishing</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Updated Studio Field:</div>
        <code>Line 3: "a cleaner future?"</code>

        <div class="render-box">
          <div class="render-box-title">Live Website Render</div>
          <div style="font-size: 16px; font-weight: 700; color: #0f172a; line-height: 1.3;">
            What will it take<br>
            for India to reach<br>
            <span style="color: #2563eb;">a cleaner future?</span>
          </div>
        </div>
      </div>
    </div>

    <div class="note-box">
      <strong>Real-Time Behavior:</strong> As soon as you type in Studio, a yellow <strong>Draft</strong> pill appears. The live website remains 100% on the old version. Only when you click the green <strong>"Publish"</strong> button at bottom-right does the live site update.
    </div>
  </div>

  <!-- CASE STUDY 2 -->
  <div class="compare-container">
    <div class="compare-title">
      <span class="step-badge">2</span> Case Study 2: Replacing Images & Setting Hotspot Focus
    </div>
    <p style="font-size: 14px; color: #475569;">
      <strong>Target:</strong> Floating Hero Bubble 1 (Innovation) &bull; 
      <strong>Document:</strong> <code>Home Page</code> &bull; 
      <strong>Tool:</strong> Asset Selector + Hotspot Tool
    </p>

    <div class="compare-grid">
      <!-- BEFORE -->
      <div class="compare-card card-before">
        <div class="card-header">
          <span class="tag-before">Before Change</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Current Asset:</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;"><code>innovation.jpg</code> (Rooftop solar panels)</div>
        <img src="bubble-before.jpg" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" alt="Before Image" />

        <div class="render-box">
          <div class="render-box-title">Website Appearance</div>
          <div style="font-size: 13px; color: #334155;">Solar rooftop appears inside circular floating bubble with animated pulse effect.</div>
        </div>
      </div>

      <!-- AFTER -->
      <div class="compare-card card-after">
        <div class="card-header">
          <span class="tag-after">After Publishing Swapped Image</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Swapped Asset:</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;"><code>research.jpg</code> (Wind / grid research photo)</div>
        <img src="bubble-after.jpg" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" alt="After Image" />

        <div class="render-box">
          <div class="render-box-title">Website Appearance</div>
          <div style="font-size: 13px; color: #334155;">New research photo appears inside circular floating bubble immediately upon publishing.</div>
        </div>
      </div>
    </div>

    <div class="note-box">
      <strong>Hotspot Control:</strong> Click the crop tool on any uploaded image to drag the focal circle to the person's face or subject. Sanity automatically crops around this hotspot on mobile, tablet, and desktop screens.
    </div>
  </div>

  <!-- CASE STUDY 3 -->
  <div class="compare-container">
    <div class="compare-title">
      <span class="step-badge">3</span> Case Study 3: Modifying Names, Designations & Roles
    </div>
    <p style="font-size: 14px; color: #475569;">
      <strong>Target:</strong> Collaborator Card &bull; 
      <strong>Collection:</strong> <code>Collaborators</code> &bull; 
      <strong>Document:</strong> <code>Dr. Anurag Gumber</code>
    </p>

    <div class="compare-grid">
      <!-- BEFORE -->
      <div class="compare-card card-before">
        <div class="card-header">
          <span class="tag-before">Before Change</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Original Document:</div>
        <div style="font-size: 12px; margin: 4px 0;"><strong>Name:</strong> Dr. Anurag Gumber</div>
        <div style="font-size: 12px; margin-bottom: 8px;"><strong>Role:</strong> <code>Postdoctoral Researcher, Princeton University</code></div>

        <div class="render-box">
          <div class="render-box-title">Consortium Page Display</div>
          <div style="font-weight: 700; color: #0f172a;">Dr. Anurag Gumber</div>
          <div style="font-size: 12px; color: #64748b;">Postdoctoral Researcher, Princeton University</div>
        </div>
      </div>

      <!-- AFTER -->
      <div class="compare-card card-after">
        <div class="card-header">
          <span class="tag-after">After Publishing</span>
          <span class="status-badge status-published">● Published</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #334155;">Updated Document:</div>
        <div style="font-size: 12px; margin: 4px 0;"><strong>Name:</strong> Dr. Anurag Gumber</div>
        <div style="font-size: 12px; margin-bottom: 8px;"><strong>Role:</strong> <code>Senior Research Fellow, Decarbonisation Pathways</code></div>

        <div class="render-box">
          <div class="render-box-title">Consortium Page Display</div>
          <div style="font-weight: 700; color: #0f172a;">Dr. Anurag Gumber</div>
          <div style="font-size: 12px; color: #16a34a; font-weight: 600;">Senior Research Fellow, Decarbonisation Pathways</div>
        </div>
      </div>
    </div>
  </div>

  <h2>4. Document Types Reference Guide</h2>
  <table>
    <thead>
      <tr>
        <th>Document Type</th>
        <th>Scope</th>
        <th>What It Manages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Site Settings</strong></td>
        <td>Global Singleton</td>
        <td>Header light/dark SVG brand logos, website title, and footer taglines.</td>
      </tr>
      <tr>
        <td><strong>Home Page</strong></td>
        <td>Page Singleton</td>
        <td>Hero headlines, 2 narrative paragraphs, button link/text, 5 floating bubble images, "Why NZII Exists" (title, 6 choice points, closing copy, convening photo), 4 pillars, "Led by India" collaboration copy, Work cards, News cards.</td>
      </tr>
      <tr>
        <td><strong>About Page</strong></td>
        <td>Page Singleton</td>
        <td>About hero headline, 4 core principles, Principal Investigators (Kaveri, Ambuj, Rajarshi) with photos and bio links, IIT Delhi team roster, Admin staff, partner rosters.</td>
      </tr>
      <tr>
        <td><strong>Collaborations Page</strong></td>
        <td>Page Singleton</td>
        <td>RFN Open Calls preamble, thematic round description, submission deadlines, honorarium details, and apply link.</td>
      </tr>
      <tr>
        <td><strong>Advisory Committee</strong></td>
        <td>Collection (20 members)</td>
        <td>Full name, institutional affiliation, 2-letter avatar initials, Google Scholar link, LinkedIn profile, and sort order.</td>
      </tr>
      <tr>
        <td><strong>Collaborators</strong></td>
        <td>Collection (7+ members)</td>
        <td>Research collaborator photos, names, titles, institutional tags, and research summaries.</td>
      </tr>
      <tr>
        <td><strong>Media Library</strong></td>
        <td>Asset Catalog</td>
        <td>Master store of all 24 high-resolution research theme photos and convening workshop photos.</td>
      </tr>
    </tbody>
  </table>

  <h2>5. Publishing, Discarding & 1-Click Rollback</h2>
  <ul>
    <li><strong>Publishing Changes:</strong> When editing, click the green <strong>"Publish"</strong> button in the lower-right corner. Updates propagate globally via CDN.</li>
    <li><strong>Discarding a Draft:</strong> If you made mistakes in a draft and want to throw it away, click the three dots (<code>...</code>) next to Publish and select <strong>"Discard changes"</strong>.</li>
    <li><strong>History & Rollback:</strong> Click the <strong>Clock icon ("History")</strong> at top right to inspect previous versions with timestamps. Click <strong>"Restore"</strong> to bring back any earlier version.</li>
  </ul>

  <h2>6. Granting Access to Team Members</h2>
  <ol>
    <li>Navigate to <strong><a href="https://www.sanity.io/manage/project/bz23ff6t/members" target="_blank">https://www.sanity.io/manage/project/bz23ff6t/members</a></strong>.</li>
    <li>Click the <strong>"Invite member"</strong> button.</li>
    <li>Input the user's email address.</li>
    <li>Select role <strong>"Editor"</strong> (allows full editing and publishing without risk of touching billing or API keys).</li>
    <li>Click <strong>Send Invite</strong>. The recipient receives an invitation valid for 30 days.</li>
  </ol>

  <h2>7. Failsafe Resilience & Zero-Break Guarantees</h2>
  <div class="note-box" style="background: #f0fdf4; border-left-color: #10b981; color: #065f46;">
    <strong>Guaranteed Zero Downtime:</strong> Every single field in the NZII code has built-in code fallbacks. If any text field is cleared or an image is removed in Sanity, the website does NOT show an error or blank space — it automatically reverts to its default verified copy and local asset.
  </div>

  <p style="margin-top: 40px; font-size: 13px; color: #94a3b8; text-align: center; border-top: 1px solid var(--border); padding-top: 20px;">
    Net Zero India Initiative &bull; Document generated on November 5, 2026 &bull; Production Sanity Project <code>bz23ff6t</code>
  </p>

</div>

</body>
</html>
`;

// Write to all destinations
console.log("Writing SOP files...");

// 1. Write Markdown files
fs.writeFileSync(path.join(todayDir1, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(todayDir2, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(artifactDir, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(repoDir, "SANITY_CMS_SOP.md"), markdownContent);

// 2. Write HTML files
fs.writeFileSync(path.join(todayDir1, "NZII_Sanity_CMS_SOP.html"), htmlContent);
fs.writeFileSync(path.join(todayDir2, "NZII_Sanity_CMS_SOP.html"), htmlContent);
fs.writeFileSync(path.join(artifactDir, "NZII_Sanity_CMS_SOP.html"), htmlContent);

console.log("✓ Markdown and HTML files written to both today's folders.");

// 3. Generate PDF using headless Chrome
try {
  console.log("Generating printable PDF using headless Chrome...");
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const inputHtml = path.join(todayDir1, "NZII_Sanity_CMS_SOP.html");
  const outputPdf1 = path.join(todayDir1, "NZII_Sanity_CMS_SOP.pdf");
  const outputPdf2 = path.join(todayDir2, "NZII_Sanity_CMS_SOP.pdf");

  execSync('"' + chromePath + '" --headless --disable-gpu --print-to-pdf="' + outputPdf1 + '" "' + inputHtml + '"', { stdio: "pipe" });
  fs.copyFileSync(outputPdf1, outputPdf2);
  console.log("✓ PDF successfully generated in both today's folders!");
} catch (err) {
  console.error("PDF generation note:", err.message);
}
