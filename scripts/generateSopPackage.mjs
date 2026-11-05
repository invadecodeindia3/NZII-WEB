import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const todayDir1 = "/Users/Shravani/Downloads/05-11-2026";
const todayDir2 = "/Users/Shravani/Downloads/NZII_SOP_05-11-2026";
const artifactDir = "/Users/Shravani/.gemini/antigravity/brain/cadbc33b-b8da-4e5c-8f9a-c089188a31e1";
const repoDir = "/Users/Shravani/Downloads/NZII-2-main";

const markdownContent = `# Net Zero India Initiative (NZII)
# Website Content Management Guide (Sanity CMS)

---

## Access Links

- **Live Website:** [https://nzii2.vercel.app](https://nzii2.vercel.app)
- **CMS Editor Portal:** [https://nzii-studio.vercel.app](https://nzii-studio.vercel.app)

---

## 1. How to Log In

1. Open **[https://nzii-studio.vercel.app](https://nzii-studio.vercel.app)** in your browser (Google Chrome, Safari, or Edge).
2. Click **"Log in with Google"** or **"Log in with email"**.
3. Sign in with your registered email address.
4. The dashboard will load with three main columns:
   - **Left Column:** Choose the section you want to edit (Home Page, About Page, People, etc.).
   - **Middle Column:** Select the specific page or item.
   - **Right Column:** The editor where you make changes to words or images.

![CMS Navigation Screen](sanity-studio-sidebar.png)

---

## 2. Where to Click: Changing Any Words or Text

Use this to edit any headlines, paragraphs, or button text.

### Exact Clicks:
1. In the **Left Column**, click **Home Page** (or **About Page**, **Site Settings**).
2. In the **Middle Column**, click **Home Page**.
3. In the **Right Column**, click directly into the text field you want to edit (for example: **Hero Headline Line 3**).
4. Type your updated text.
5. Notice the bottom right indicator changes to a yellow **Draft** badge. *(The live website does NOT change yet, so you can type freely).*
6. Click the green **Publish** button at the bottom right.
7. Open or refresh **[https://nzii2.vercel.app](https://nzii2.vercel.app)**. The text updates immediately.

### Before & After Example:

| Stage | What You Do in CMS Editor | What Shows on the Live Website |
| :--- | :--- | :--- |
| **BEFORE** | Line 3 says: \`"net zero?"\`<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach net zero?"** |
| **WHILE TYPING** | Change Line 3 to: \`"a cleaner future?"\`<br><span style="color:#d97706;font-weight:bold;">● Draft</span> | Website **still displays the original text** until you decide to publish. |
| **AFTER PUBLISHING** | Click green **Publish** button.<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach a cleaner future?"** |

---

## 3. Where to Click: Replacing an Existing Image

Use this when you want to replace an existing photo (like a hero bubble or a workshop photo) with a new one.

### Exact Clicks:
1. In the **Left Column**, click the page containing the image (e.g., **Home Page**).
2. In the **Middle Column**, click **Home Page**.
3. In the **Right Column**, scroll down to the image field (e.g., **Bubble 1 - Innovation** or **Workshop Photo**).
4. Click the three dots (\`...\`) on the current image thumbnail.
5. Click **Replace**:
   - Choose **Upload** to pick a new photo from your computer.
   - Or choose **Select** to pick from the pre-uploaded photo library.
6. **Set the Focal Point (Hotspot):**
   - Click the crop icon on the uploaded thumbnail.
   - Drag the small circle to the main subject of the image (like a person's face or the center of the photo). This prevents the image from getting cut off on mobile phones.
7. Click the green **Publish** button at the bottom right.
8. Refresh **[https://nzii2.vercel.app](https://nzii2.vercel.app)**. The new photo appears immediately.

### Before & After Example:

| Stage | CMS Image Field | Live Website Appearance |
| :--- | :--- | :--- |
| **BEFORE** | Current image: Solar rooftop photo (\`innovation.jpg\`) | Circular floating bubble displays the solar rooftop photo. |
| **REPLACING** | Click **Replace** &rarr; Upload new photo &rarr; Set focal hotspot. | Live site continues showing the original photo while you adjust. |
| **AFTER PUBLISHING** | Click **Publish** button. | Floating bubble immediately shows the new photo with seamless animation. |

---

## 4. Where to Click: Editing a Person's Name or Title

Use this to update an existing team member, advisory member, or collaborator.

### Exact Clicks:
1. In the **Left Column**, click **Collaborators** (or **Advisory Committee Member**).
2. In the **Middle Column**, click on the person's name (e.g., **Dr. Anurag Gumber**).
3. In the **Right Column**:
   - Click into the **Full Name** field to edit their name.
   - Click into the **Role / Affiliation** field to edit their designation or university.
   - If changing their photo: Click their photo thumbnail &rarr; click **Replace** &rarr; upload new photo.
4. Click the green **Publish** button at the bottom right.
5. The updated details will appear immediately on the website's People / Consortium section.

### Before & After Example:

| Stage | CMS Editor Field | Live Website Card |
| :--- | :--- | :--- |
| **BEFORE** | Role: \`Postdoctoral Researcher, Princeton University\` | Card displays: **Dr. Anurag Gumber**<br>Subtitle: "Postdoctoral Researcher, Princeton University" |
| **AFTER PUBLISHING** | Role changed to: \`Senior Research Fellow, Decarbonisation Pathways\` &rarr; Click **Publish** | Card immediately displays: **Dr. Anurag Gumber**<br>Subtitle: "Senior Research Fellow, Decarbonisation Pathways" |

---

## 5. Where to Click: Adding a New Advisory Committee Member

Use this when you want to add a brand new person to the Advisory Committee.

### Exact Clicks:
1. In the **Left Column**, click **Advisory Committee Member**.
2. In the **Middle Column**, click the **\`+\` (Create)** button at the very top.
3. In the **Right Column**, fill in the fields:
   - **Full Name:** Type the person's name (e.g., \`Dr. Rajesh Sharma\`).
   - **Initials:** Type 2 letters (e.g., \`RS\`) — this appears inside their circular profile avatar.
   - **Role / Affiliation:** Type their title and organization (e.g., \`Professor, Energy Policy\`).
   - **Order:** Type their position number (e.g., \`21\` to place them after member 20).
   - **Links (Optional):** Add their Google Scholar or LinkedIn profile URL if available.
4. Click the green **Publish** button at the bottom right.
5. Done! The Advisory Committee grid on the website expands automatically to include the new member.

---

## 6. How to Undo Mistakes (Discarding & Rollback)

- **If you made a mistake while typing (before clicking Publish):**
  Click the three dots (\`...\`) right next to the green Publish button at the bottom right, and click **"Discard changes"**. Your draft is erased and the original live text remains untouched.
- **If you already clicked Publish and want to go back to an earlier version:**
  Click the **Clock icon ("History")** at the top right of the editor. Click on any past date/time, then click **"Restore"**. The page will instantly roll back to that earlier version.

---

## 7. Zero-Break Safety Guarantee

Every section of the website has automatic built-in fallbacks. If any text field is ever left blank or an image is accidentally removed, **the website will never break or show a blank space**. It automatically shows the original verified default content.
`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NZII Website Content Management Guide</title>
  <style>
    :root {
      --bg: #faf8f5;
      --card-bg: #ffffff;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --primary: #0f172a;
      --accent: #2563eb;
      --green: #16a34a;
      --amber: #d97706;
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --mono: ui-monospace, Menlo, Monaco, Consolas, monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      padding: 40px 20px;
    }
    .wrapper {
      max-width: 960px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 48px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    header {
      border-bottom: 2px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 6px;
    }
    .tagline {
      font-size: 15px;
      color: var(--text-muted);
    }
    .links-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 24px 0 36px 0;
    }
    .link-card {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      background: #f8fafc;
    }
    .link-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .link-url {
      font-size: 16px;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
      word-break: break-all;
    }
    .link-url:hover { text-decoration: underline; }
    .link-desc {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary);
      margin: 40px 0 16px 0;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .num-pill {
      background: var(--accent);
      color: white;
      font-size: 13px;
      font-weight: 700;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    p, li {
      font-size: 15px;
      color: #334155;
      margin-bottom: 10px;
    }
    ol, ul { padding-left: 22px; margin-bottom: 16px; }
    li { margin-bottom: 8px; }
    code {
      font-family: var(--mono);
      font-size: 13px;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }
    .screenshot {
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin: 16px 0 24px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    /* Comparison Section */
    .compare-wrap {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      margin: 20px 0;
    }
    .compare-label {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      margin-bottom: 12px;
    }
    .compare-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .compare-box {
      border-radius: 8px;
      padding: 14px;
      border: 1px solid #cbd5e1;
    }
    .box-before { background: #fffdfd; border-color: #fecaca; }
    .box-after { background: #f6fef9; border-color: #bbf7d0; }
    .box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .tag-red { color: #dc2626; text-transform: uppercase; }
    .tag-green { color: #16a34a; text-transform: uppercase; }
    .badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
    }
    .badge-pub { background: #dcfce7; color: #166534; }
    .badge-draft { background: #fef3c7; color: #92400e; }
    .preview-render {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-top: 10px;
      font-size: 14px;
    }
    .preview-render-title {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 700;
      color: #94a3b8;
      margin-bottom: 4px;
    }
    .tip-box {
      background: #eff6ff;
      border-left: 4px solid var(--accent);
      padding: 12px 16px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 14px;
      color: #1e40af;
    }
    @media (max-width: 768px) {
      .wrapper { padding: 24px 16px; }
      .links-grid, .compare-grid { grid-template-columns: 1fr; }
    }
    @media print {
      body { background: white; padding: 0; }
      .wrapper { border: none; box-shadow: none; padding: 0; }
      .screenshot { max-height: 240px; object-fit: contain; }
    }
  </style>
</head>
<body>

<div class="wrapper">

  <header>
    <h1>NZII Website Content Management Guide</h1>
    <div class="tagline">Where to Click, How to Edit Words, Upload Images & Publish Live</div>
  </header>

  <div class="links-grid">
    <div class="link-card">
      <div class="link-label">Live Public Website</div>
      <a href="https://nzii2.vercel.app" target="_blank" class="link-url">https://nzii2.vercel.app</a>
      <div class="link-desc">Your public website. Reflects changes as soon as you click Publish.</div>
    </div>
    <div class="link-card">
      <div class="link-label">CMS Editor Portal</div>
      <a href="https://nzii-studio.vercel.app" target="_blank" class="link-url">https://nzii-studio.vercel.app</a>
      <div class="link-desc">Where you log in to edit words, headlines, images, and team members.</div>
    </div>
  </div>

  <h2><span class="num-pill">1</span> How to Log In</h2>
  <ol>
    <li>Open <strong><a href="https://nzii-studio.vercel.app" target="_blank">https://nzii-studio.vercel.app</a></strong> in your browser.</li>
    <li>Click <strong>"Log in with Google"</strong> or <strong>"Log in with email"</strong>.</li>
    <li>Enter your email address to access your workspace.</li>
    <li>The dashboard opens with three columns:</li>
  </ol>
  <img src="sanity-studio-sidebar.png" alt="CMS Interface Columns" class="screenshot" />

  <h2><span class="num-pill">2</span> Where to Click: Changing Any Words or Text</h2>
  <p>Follow these clicks to update any headline, paragraph, or button wording:</p>
  <ol>
    <li>In the <strong>Left Column</strong>, click <strong>Home Page</strong> (or <strong>About Page</strong>, <strong>Site Settings</strong>).</li>
    <li>In the <strong>Middle Column</strong>, click <strong>Home Page</strong>.</li>
    <li>In the <strong>Right Column</strong>, click directly inside the text box you want to edit (e.g. <code>Hero Headline Line 3</code>).</li>
    <li>Type your updated wording.</li>
    <li>A yellow <strong>Draft</strong> indicator appears in the bottom right corner. <em>(The live website does NOT change yet while you type).</em></li>
    <li>Click the green <strong>Publish</strong> button in the bottom right corner.</li>
    <li>Refresh <strong><a href="https://nzii2.vercel.app" target="_blank">https://nzii2.vercel.app</a></strong> to see the new wording live.</li>
  </ol>

  <div class="compare-wrap">
    <div class="compare-label">Real-Time Before & After Example: Text Change</div>
    <div class="compare-grid">
      <div class="compare-box box-before">
        <div class="box-header">
          <span class="tag-red">Before</span>
          <span class="badge badge-pub">● Published</span>
        </div>
        <div style="font-size: 13px; color: #334155;">Field in CMS:</div>
        <code>Line 3: "net zero?"</code>
        <div class="preview-render">
          <div class="preview-render-title">Live Website Render</div>
          <div style="font-weight: 700; color: #0f172a;">What will it take for India to reach <span style="color: #2563eb;">net zero?</span></div>
        </div>
      </div>
      <div class="compare-box box-after">
        <div class="box-header">
          <span class="tag-green">After Publishing</span>
          <span class="badge badge-pub">● Published</span>
        </div>
        <div style="font-size: 13px; color: #334155;">Field in CMS:</div>
        <code>Line 3: "a cleaner future?"</code>
        <div class="preview-render">
          <div class="preview-render-title">Live Website Render</div>
          <div style="font-weight: 700; color: #0f172a;">What will it take for India to reach <span style="color: #2563eb;">a cleaner future?</span></div>
        </div>
      </div>
    </div>
  </div>

  <h2><span class="num-pill">3</span> Where to Click: Replacing an Existing Image</h2>
  <p>Follow these clicks when you want to change an existing photo (like a hero bubble or workshop image):</p>
  <ol>
    <li>In the <strong>Left Column</strong>, click the page containing the photo (e.g. <strong>Home Page</strong>).</li>
    <li>In the <strong>Middle Column</strong>, click <strong>Home Page</strong>.</li>
    <li>In the <strong>Right Column</strong>, scroll down to the image field (e.g. <strong>Bubble 1 - Innovation</strong>).</li>
    <li>Click the three dots (<code>...</code>) on the existing image.</li>
    <li>Click <strong>Replace</strong> &rarr; then choose <strong>Upload</strong> to select a new image from your computer.</li>
    <li><strong>Set Focal Point (Hotspot):</strong> Click the crop icon on the image thumbnail, and drag the circle onto the central part of the photo (such as a person's face or subject). This prevents awkward cropping on mobile screens.</li>
    <li>Click the green <strong>Publish</strong> button at the bottom right.</li>
  </ol>

  <div class="compare-wrap">
    <div class="compare-label">Real-Time Before & After Example: Replacing an Image</div>
    <div class="compare-grid">
      <div class="compare-box box-before">
        <div class="box-header">
          <span class="tag-red">Before</span>
          <span class="badge badge-pub">● Published</span>
        </div>
        <img src="bubble-before.jpg" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin: 6px 0;" alt="Current Image" />
        <div style="font-size: 12px; color: #64748b;">Current Photo: Solar rooftop panels</div>
      </div>
      <div class="compare-box box-after">
        <div class="box-header">
          <span class="tag-green">After Publishing</span>
          <span class="badge badge-pub">● Published</span>
        </div>
        <img src="bubble-after.jpg" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin: 6px 0;" alt="New Image" />
        <div style="font-size: 12px; color: #16a34a; font-weight: 600;">Updated Photo: Immediately live inside floating bubble</div>
      </div>
    </div>
  </div>

  <h2><span class="num-pill">4</span> Where to Click: Editing a Person's Name or Title</h2>
  <p>Follow these clicks to update an existing team member or collaborator:</p>
  <ol>
    <li>In the <strong>Left Column</strong>, click <strong>Collaborators</strong> (or <strong>Advisory Committee Member</strong>).</li>
    <li>In the <strong>Middle Column</strong>, click on the person's name (e.g. <strong>Dr. Anurag Gumber</strong>).</li>
    <li>In the <strong>Right Column</strong>:
      <ul>
        <li>Click into <strong>Full Name</strong> to edit their name.</li>
        <li>Click into <strong>Role / Affiliation</strong> to update their title or institution.</li>
        <li>To change their photo: Click their photo thumbnail &rarr; click <strong>Replace</strong> &rarr; upload a new photo.</li>
      </ul>
    </li>
    <li>Click the green <strong>Publish</strong> button at the bottom right.</li>
  </ol>

  <div class="compare-wrap">
    <div class="compare-label">Real-Time Before & After Example: Updating a Person's Role</div>
    <div class="compare-grid">
      <div class="compare-box box-before">
        <div class="box-header">
          <span class="tag-red">Before</span>
        </div>
        <div style="font-size: 12px; color: #64748b;">Role Field in CMS:</div>
        <code>Postdoctoral Researcher, Princeton University</code>
        <div class="preview-render">
          <div style="font-weight: 700;">Dr. Anurag Gumber</div>
          <div style="font-size: 12px; color: #64748b;">Postdoctoral Researcher, Princeton University</div>
        </div>
      </div>
      <div class="compare-box box-after">
        <div class="box-header">
          <span class="tag-green">After Publishing</span>
        </div>
        <div style="font-size: 12px; color: #64748b;">Role Field in CMS:</div>
        <code>Senior Research Fellow, Decarbonisation Pathways</code>
        <div class="preview-render">
          <div style="font-weight: 700;">Dr. Anurag Gumber</div>
          <div style="font-size: 12px; color: #16a34a; font-weight: 600;">Senior Research Fellow, Decarbonisation Pathways</div>
        </div>
      </div>
    </div>
  </div>

  <h2><span class="num-pill">5</span> Where to Click: Adding a Brand New Person</h2>
  <p>Follow these clicks to add a new person to the Advisory Committee:</p>
  <ol>
    <li>In the <strong>Left Column</strong>, click <strong>Advisory Committee Member</strong>.</li>
    <li>In the <strong>Middle Column</strong>, click the <strong><code>+</code> (Create)</strong> button at the very top.</li>
    <li>In the <strong>Right Column</strong>, fill in the details:
      <ul>
        <li><strong>Full Name:</strong> Enter their name (e.g. <code>Dr. Rajesh Sharma</code>).</li>
        <li><strong>Initials:</strong> Enter 2 letters (e.g. <code>RS</code>) for their avatar circle.</li>
        <li><strong>Role / Affiliation:</strong> Enter their designation (e.g. <code>Professor, Energy Policy</code>).</li>
        <li><strong>Order:</strong> Enter their position number (e.g. <code>21</code> to place after existing members).</li>
      </ul>
    </li>
    <li>Click the green <strong>Publish</strong> button at the bottom right.</li>
    <li>The new member is added to the website grid automatically.</li>
  </ol>

  <h2><span class="num-pill">6</span> How to Undo Mistakes (Discard or Rollback)</h2>
  <ul>
    <li><strong>If you made mistakes while editing (before clicking Publish):</strong><br>
    Click the three dots (<code>...</code>) next to the Publish button &rarr; select <strong>"Discard changes"</strong>. The draft is deleted and the live site remains unchanged.</li>
    <li><strong>If you already clicked Publish and want an earlier version back:</strong><br>
    Click the <strong>Clock icon ("History")</strong> at the top right of the editor &rarr; select any past version &rarr; click <strong>"Restore"</strong>.</li>
  </ul>

  <div class="tip-box">
    <strong>Zero-Break Guarantee:</strong> The NZII website includes automatic fallback protection. If any text box is accidentally cleared or an image is removed, the website will never show an error or blank space — it automatically keeps the original verified content.
  </div>

</div>

</body>
</html>
`;

// Write clean files
console.log("Writing clean SOP files...");
fs.writeFileSync(path.join(todayDir1, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(todayDir2, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(artifactDir, "NZII_Sanity_CMS_SOP.md"), markdownContent);
fs.writeFileSync(path.join(repoDir, "SANITY_CMS_SOP.md"), markdownContent);

fs.writeFileSync(path.join(todayDir1, "NZII_Sanity_CMS_SOP.html"), htmlContent);
fs.writeFileSync(path.join(todayDir2, "NZII_Sanity_CMS_SOP.html"), htmlContent);
fs.writeFileSync(path.join(artifactDir, "NZII_Sanity_CMS_SOP.html"), htmlContent);

// Generate clean PDF
try {
  console.log("Generating clean printable PDF...");
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const inputHtml = path.join(todayDir1, "NZII_Sanity_CMS_SOP.html");
  const outputPdf1 = path.join(todayDir1, "NZII_Sanity_CMS_SOP.pdf");
  const outputPdf2 = path.join(todayDir2, "NZII_Sanity_CMS_SOP.pdf");

  execSync('"' + chromePath + '" --headless --disable-gpu --print-to-pdf="' + outputPdf1 + '" "' + inputHtml + '"', { stdio: "pipe" });
  fs.copyFileSync(outputPdf1, outputPdf2);
  console.log("✓ Clean PDF successfully generated in both today's folders!");
} catch (err) {
  console.error("PDF generation note:", err.message);
}
