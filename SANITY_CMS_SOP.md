# Net Zero India Initiative (NZII)
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
| **BEFORE** | Line 3 says: `"net zero?"`<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach net zero?"** |
| **WHILE TYPING** | Change Line 3 to: `"a cleaner future?"`<br><span style="color:#d97706;font-weight:bold;">● Draft</span> | Website **still displays the original text** until you decide to publish. |
| **AFTER PUBLISHING** | Click green **Publish** button.<br><span style="color:#10b981;font-weight:bold;">● Published</span> | Displays: **"What will it take for India to reach a cleaner future?"** |

---

## 3. Where to Click: Replacing an Existing Image

Use this when you want to replace an existing photo (like a hero bubble or a workshop photo) with a new one.

### Exact Clicks:
1. In the **Left Column**, click the page containing the image (e.g., **Home Page**).
2. In the **Middle Column**, click **Home Page**.
3. In the **Right Column**, scroll down to the image field (e.g., **Bubble 1 - Innovation** or **Workshop Photo**).
4. Click the three dots (`...`) on the current image thumbnail.
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
| **BEFORE** | Current image: Solar rooftop photo (`innovation.jpg`) | Circular floating bubble displays the solar rooftop photo. |
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
| **BEFORE** | Role: `Postdoctoral Researcher, Princeton University` | Card displays: **Dr. Anurag Gumber**<br>Subtitle: "Postdoctoral Researcher, Princeton University" |
| **AFTER PUBLISHING** | Role changed to: `Senior Research Fellow, Decarbonisation Pathways` &rarr; Click **Publish** | Card immediately displays: **Dr. Anurag Gumber**<br>Subtitle: "Senior Research Fellow, Decarbonisation Pathways" |

---

## 5. Where to Click: Adding a New Advisory Committee Member

Use this when you want to add a brand new person to the Advisory Committee.

### Exact Clicks:
1. In the **Left Column**, click **Advisory Committee Member**.
2. In the **Middle Column**, click the **`+` (Create)** button at the very top.
3. In the **Right Column**, fill in the fields:
   - **Full Name:** Type the person's name (e.g., `Dr. Rajesh Sharma`).
   - **Initials:** Type 2 letters (e.g., `RS`) — this appears inside their circular profile avatar.
   - **Role / Affiliation:** Type their title and organization (e.g., `Professor, Energy Policy`).
   - **Order:** Type their position number (e.g., `21` to place them after member 20).
   - **Links (Optional):** Add their Google Scholar or LinkedIn profile URL if available.
4. Click the green **Publish** button at the bottom right.
5. Done! The Advisory Committee grid on the website expands automatically to include the new member.

---

## 6. How to Undo Mistakes (Discarding & Rollback)

- **If you made a mistake while typing (before clicking Publish):**
  Click the three dots (`...`) right next to the green Publish button at the bottom right, and click **"Discard changes"**. Your draft is erased and the original live text remains untouched.
- **If you already clicked Publish and want to go back to an earlier version:**
  Click the **Clock icon ("History")** at the top right of the editor. Click on any past date/time, then click **"Restore"**. The page will instantly roll back to that earlier version.

---

## 7. Zero-Break Safety Guarantee

Every section of the website has automatic built-in fallbacks. If any text field is ever left blank or an image is accidentally removed, **the website will never break or show a blank space**. It automatically shows the original verified default content.
