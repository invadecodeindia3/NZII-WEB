import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const TOKEN = "skJYVZBgO3aUKgQ48DIqCESxyGPbZ5YGvwKqVkZcNkWS34MGdWsazIz5Orv2obI8Z5oi60SbDJ4BHMly7uHhN3gb3bqRT4n8OcSGjkVIlZQh6QOJMOlH8JegWzAElPtHlZeZpsNwQHlJcTsGeIETqUuvSxf03ZYR6hmO6qEheInqpRGVYpMH";

const client = createClient({
  projectId: "bz23ff6t",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: TOKEN,
  useCdn: false,
});

async function uploadImage(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return null;
  try {
    const asset = await client.assets.upload("image", fs.createReadStream(fullPath), {
      filename: path.basename(fullPath),
    });
    return asset;
  } catch (err) {
    console.error("Failed to upload", fullPath, err.message);
    return null;
  }
}

// 24 OneDrive theme photos
const oneDrivePhotos = [
  { file: "public/images/1.jpg", title: "Agriculture & Land Use Dynamics", category: "Land & Agriculture" },
  { file: "public/images/2.jpg", title: "Nature, Forests & Carbon Sinks", category: "Ecosystems" },
  { file: "public/images/3.jpg", title: "Power System & Electricity Grid", category: "Energy Systems" },
  { file: "public/images/4.jpg", title: "Solar Power Deployment", category: "Renewables" },
  { file: "public/images/5.jpg", title: "Urban Transition & Energy Justice", category: "Cities & Society" },
  { file: "public/images/6.jpg", title: "Biodiversity & Natural Resources", category: "Environment" },
  { file: "public/images/7.jpg", title: "Transition Trade-offs & Choices", category: "Public Policy" },
  { file: "public/images/8.jpg", title: "Methodological Advances in Modeling", category: "Research & Modeling" },
  { file: "public/images/9.jpg", title: "People, Jobs & Just Livelihoods", category: "Livelihoods" },
  { file: "public/images/10.jpg", title: "Regional Landscape & Topography", category: "Geography" },
  { file: "public/images/11.jpg", title: "Open Calls for Research", category: "Collaboration" },
  { file: "public/images/12.jpg", title: "Policy Briefs & Publications", category: "Publications" },
  { file: "public/images/13.jpg", title: "Clean Energy Investment & Finance", category: "Finance" },
  { file: "public/images/14.jpg", title: "Institutional Collaboration", category: "Secretariat" },
  { file: "public/images/15.jpg", title: "Energy Economics & Markets", category: "Economics" },
  { file: "public/images/16.jpg", title: "Clean Mobility & Transport Pathways", category: "Transport" },
  { file: "public/images/17.jpg", title: "Stakeholder Convening & Workshops", category: "Events" },
  { file: "public/images/18.jpg", title: "Rural Economy & Agro-transitions", category: "Agriculture" },
  { file: "public/images/19.jpg", title: "Solar Utility Scale Parks", category: "Renewables" },
  { file: "public/images/20.jpg", title: "Making System Transitions Visible", category: "Visualizations" },
  { file: "public/images/21.jpg", title: "Water Systems & Energy Nexus", category: "Water & Climate" },
  { file: "public/images/22.jpg", title: "Granular District-Level Mapping", category: "Spatial Modeling" },
  { file: "public/images/23.jpg", title: "Ecosystem Resilience Framework", category: "Ecology" },
  { file: "public/images/24.jpg", title: "Secretariat Research Fellows", category: "Team" },
];

// Workshop photos
const workshopPhotos = [
  { file: "public/assets/photos/03_Launch_Jul2024_photo1_room.jpg", title: "NZII Launch Workshop (July 2024)", category: "Convening" },
  { file: "public/assets/photos/12_Urbanisation_Sep2024_photo1_group.jpg", title: "Urbanisation & Land Governance Workshop (Sep 2024)", category: "Workshops" },
  { file: "public/assets/photos/12_Urbanisation_Sep2024_photo2_group_exercise.jpg", title: "Stakeholder Group Exercise (Sep 2024)", category: "Workshops" },
  { file: "public/assets/photos/12_Industry_Dec2024_photo1_room.jpg", title: "Heavy Industry Decarbonization Session (Dec 2024)", category: "Industry" },
  { file: "public/assets/photos/12_Agriculture_Dec2024_photo1_room.jpg", title: "Agriculture & Land Sector Convening (Dec 2024)", category: "Agriculture" },
  { file: "public/assets/photos/12_Agriculture_Dec2024_photo2_room.jpg", title: "Scenario Modeling Discussion (Dec 2024)", category: "Research" },
];

async function main() {
  console.log("Starting bulk upload of all OneDrive and Workshop images into Sanity Media Library...\n");

  const allItems = [...oneDrivePhotos, ...workshopPhotos];
  let count = 0;

  for (const item of allItems) {
    count++;
    console.log(`[${count}/${allItems.length}] Uploading: ${item.title} (${path.basename(item.file)})...`);
    const asset = await uploadImage(item.file);
    if (asset) {
      const docId = `media-${path.basename(item.file).replace(/\.[^.]+$/, "")}`;
      await client.createOrReplace({
        _id: docId,
        _type: "mediaAsset",
        title: item.title,
        category: item.category,
        fileName: path.basename(item.file),
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      });
      console.log(`   ✓ Created Media Document: "${item.title}"`);
    }
  }

  console.log("\nDone! All OneDrive images and workshop photos are published in Sanity!");
}

main().catch(console.error);

