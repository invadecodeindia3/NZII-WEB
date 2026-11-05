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

async function uploadImage(relPath) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn("File not found:", fullPath);
    return null;
  }
  try {
    const asset = await client.assets.upload("image", fs.createReadStream(fullPath), {
      filename: path.basename(fullPath),
    });
    console.log("✓ Uploaded image:", path.basename(fullPath), "->", asset._id);
    return asset;
  } catch (err) {
    console.error("Failed to upload", fullPath, err.message);
    return null;
  }
}

async function run() {
  console.log("Uploading all website images to Sanity...");

  // Hero bubble images
  const imgInnov = await uploadImage("public/assets/pbh/hero/innovation.jpg");
  const imgCentre = await uploadImage("public/assets/pbh/hero/centre.jpg");
  const imgResearch = await uploadImage("public/assets/pbh/hero/research.jpg");
  const imgPathways = await uploadImage("public/assets/pbh/hero/pathways.jpg");
  const imgNetzero = await uploadImage("public/assets/pbh/hero/netzero.jpg");

  // Work & News images
  const imgWorkFeat = await uploadImage("public/assets/photos/12_Agriculture_Dec2024_photo1_room.jpg");
  const imgNews1 = await uploadImage("public/assets/photos/03_Launch_Jul2024_photo1_room.jpg");
  const imgNews2 = await uploadImage("public/assets/photos/12_Urbanisation_Sep2024_photo1_group.jpg");
  const imgNews3 = await uploadImage("public/assets/photos/12_Industry_Dec2024_photo1_room.jpg");

  // PIs
  const imgKaveri = await uploadImage("public/assets/people/pi-kaveri-iychettira.jpg");
  const imgAmbuj = await uploadImage("public/assets/people/pi-ambuj-sagar.jpg");
  const imgRajarshi = await uploadImage("public/assets/people/pi-rajarshi-dasgupta.jpg");

  // Collaborators
  const imgCollab1 = await uploadImage("public/assets/people/collab-anurag-gumber.jpg");
  const imgCollab2 = await uploadImage("public/assets/people/collab-sarath-guttikunda.jpg");
  const imgCollab3 = await uploadImage("public/assets/people/collab-narasimha-rao.jpg");
  const imgCollab4 = await uploadImage("public/assets/people/collab-sara-constantino.jpg");
  const imgCollab5 = await uploadImage("public/assets/people/collab-pranab-choudhury.jpg");
  const imgCollab6 = await uploadImage("public/assets/people/collab-shalini-dhyani.jpg");
  const imgCollab7 = await uploadImage("public/assets/people/collab-ps-roy.jpg");

  // Logos
  const imgLogoColor = await uploadImage("public/assets/logos/nzii-logo-colour.svg");
  const imgLogoPale = await uploadImage("public/assets/logos/nzii-logo-pale-yellow.svg");

  const toAssetRef = (asset) => (asset ? { _type: "image", asset: { _type: "reference", _ref: asset._id } } : undefined);

  console.log("\nCreating / Updating Site Settings in Sanity...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Net Zero India Initiative",
    logoLight: toAssetRef(imgLogoColor),
    logoDark: toAssetRef(imgLogoPale),
    footerText:
      "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.",
    footerTagline1: "Net Zero India Initiative · Research, pathways and evidence",
    footerTagline2: "Made for curiosity, grounded in evidence.",
  });
  console.log("✓ Site Settings published");

  console.log("\nCreating / Updating Home Page in Sanity...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeadline1: "What will it take",
    heroHeadline2: "for India to reach",
    heroHeadline3: "net zero?",
    heroParagraph1:
      "India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.",
    heroParagraph2:
      "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.",
    heroButtonText: "About the Net Zero India Initiative",
    heroButtonLink: "/about",
    heroImageInnovation: toAssetRef(imgInnov),
    heroImageCentre: toAssetRef(imgCentre),
    heroImageResearch: toAssetRef(imgResearch),
    heroImagePathways: toAssetRef(imgPathways),
    heroImageNetZero: toAssetRef(imgNetzero),

    whyEyebrow: "Why NZII exists",
    whyTitle: "Net zero can take many forms.",
    whyTitleAccent: "So can India’s path to it.",
    whySubhead: "India’s transition will involve choices.",
    whyChoices: [
      "Where should new energy infrastructure be built?",
      "How much land and water could different pathways require?",
      "What happens to jobs and livelihoods?",
      "How might energy choices affect air quality and health?",
      "Where will investment flow?",
    ],
    whyClosing:
      "These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.",

    pillarsTitle: "NZII presents a more complete picture of India’s net-zero transition",
    pillarsIntro: "That picture is more complete because our research is:",
    pillars: [
      {
        _key: "p1",
        num: "01",
        title: "Development-compatible",
        description:
          "Starting from the living standards and economic foundations India will need, then mapping pathways that achieve them while reaching net zero.",
      },
      {
        _key: "p2",
        num: "02",
        title: "Spatially and sectorally granular",
        description:
          "Down to districts, power plants, transmission corridors, river basins and industrial clusters across power, industry, transport, buildings and land.",
      },
      {
        _key: "p3",
        num: "03",
        title: "Integrated across systems",
        description:
          "Connecting energy system models with land, water, air quality, employment, macroeconomic and ecosystem frameworks.",
      },
      {
        _key: "p4",
        num: "04",
        title: "Policy and investment-facing",
        description:
          "Producing evidence calibrated to near-term decisions: 2030, 2035 and 2047 milestones, state-level implementation, capital mobilization and just transitions.",
      },
    ],

    ledEyebrow: "Collaborative model",
    ledTitle: "Led by India.",
    ledTitleAccent: "Built through collaboration.",
    ledDescription:
      "The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.",

    workTitle: "Explore",
    workTitleAccent: "our work",
    workFeaturedPhoto: toAssetRef(imgWorkFeat),
    workFeaturedEyebrow: "Featured research",
    workFeaturedTitle: "First results from NZII’s Reference scenario",
    workFeaturedDescription:
      "A baseline of how India’s energy demand, electricity supply and land-sector emissions could evolve to 2070, presented to NZII’s Advisory Committee in September 2026.",
    workGetInvolvedEyebrow: "Get involved",
    workGetInvolvedTitle: "Explore Our Collaborations",
    workGetInvolvedDescription:
      "Explore opportunities to collaborate, contribute to ongoing research, participate in programmes, or engage with the Net Zero India Initiative.",
    workGetInvolvedButtonText: "Explore opportunities",
    workGetInvolvedButtonLink: "/consortium",

    newsTitle: "Latest from the",
    newsTitleAccent: "Net Zero India Initiative",
    newsCards: [
      {
        _key: "n1",
        photo: toAssetRef(imgNews1),
        eyebrow: "News & Updates",
        title: "NZII presents its development-compatible approach at Princeton’s NZx workshop",
        date: "September 2026",
      },
      {
        _key: "n2",
        photo: toAssetRef(imgNews2),
        eyebrow: "Workshops & Events",
        title: "Workshop asks how land for solar and wind can be governed fairly",
        date: "May 2026",
      },
      {
        _key: "n3",
        photo: toAssetRef(imgNews3),
        eyebrow: "Research & Publications",
        title: "NZII researchers write the opening chapter of the ICEF report",
        date: "April 2026",
      },
    ],

    ctaTitle: "India’s path to 2070",
    ctaTitleAccent: "is still being written.",
    ctaDescription:
      "Explore the research, evidence and ideas helping us understand the choices ahead.",
    ctaButtonText: "Explore Our Collaborations",
    ctaButtonLink: "/consortium",
  });
  console.log("✓ Home Page published with all images");

  console.log("\nCreating / Updating About Page in Sanity...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroHeadline: "Building a deeper understanding of India’s path to",
    heroHeadlineAccent: "net zero.",
    heroParagraph1:
      "The Net Zero India Initiative is a research initiative led by the School of Public Policy, IIT Delhi, aimed at building rigorous, spatially detailed, and accessible evidence that can inform policy and enable more inclusive conversations about India’s transition.",
    heroParagraph2:
      "Started in 2024, the NZII comprises a diverse team of more than 30 researchers across 4 institutions.",

    principlesTitle: "Our principles",
    principles: [
      { _key: "pr1", title: "Rigorous", description: "Research designed to withstand scrutiny.", color: "teal" },
      { _key: "pr2", title: "Independent", description: "NZII does not advocate for a predetermined pathway.", color: "lime" },
      { _key: "pr3", title: "Collaborative", description: "We work across institutions, disciplines and stakeholder groups.", color: "coral" },
      { _key: "pr4", title: "Open", description: "We aim to make research, methods, models and data increasingly accessible.", color: "pink" },
    ],

    partnersTitle: "Built through partnership",
    peopleTitle: "The people behind the Net Zero India Initiative",
    peopleSubtitle: "A multidisciplinary team for a multidimensional challenge.",
    piSectionTitle: "Meet the PIs",
    pis: [
      {
        _key: "pi1",
        name: "Kaveri Iychettira",
        role: "Principal Investigator",
        institution: "IIT Delhi",
        photo: toAssetRef(imgKaveri),
        scholar: "https://scholar.google.com/citations?user=0yQF0u8AAAAJ&hl=en",
        linkedin: "https://www.linkedin.com/in/kiychettira/",
      },
      {
        _key: "pi2",
        name: "Ambuj Sagar",
        role: "Principal Investigator",
        institution: "IIT Delhi",
        photo: toAssetRef(imgAmbuj),
        scholar: "https://scholar.google.com/citations?user=k8Lrh_4AAAAJ&hl=en",
        linkedin: "https://www.linkedin.com/in/ambuj-sagar-1983379/",
      },
      {
        _key: "pi3",
        name: "Rajarshi Dasgupta",
        role: "Principal Investigator",
        institution: "IIT Delhi",
        photo: toAssetRef(imgRajarshi),
        scholar: "https://scholar.google.com/citations?user=KfcluxcAAAAJ&hl=en",
        linkedin: "https://www.linkedin.com/in/drrajarshidasgupta/",
      },
    ],
  });
  console.log("✓ About Page published with PI photos");

  console.log("\nCreating / Updating Collaborations Page in Sanity...");
  await client.createOrReplace({
    _id: "collaborationsPage",
    _type: "collaborationsPage",
    introLabel: "Explore Our Collaborations",
    introHeadline: "IIT Delhi’s Open Calls for Collaboration under RFNs",
    introLead:
      "Through the open calls for collaboration, funded by Schmidt Sciences, the IIT Delhi NZII team aims to identify and address emergent capacity deficits across several thematic areas of the Net Zero India Initiative (NZII). In this round, we release four calls for collaboration along the following themes; each theme is described in detail in the corresponding links below.",
    roundStatus: "Open",
    roundTitle: "Round 2",
    deadline: "To be confirmed",
    honorarium: "To be confirmed",
    exploreButtonText: "Explore Open Calls",
    applyButtonText: "How to apply",
    collaboratorsTitle: "Meet the collaborators",
    advisoryTitle: "Advisory Committee",
  });
  console.log("✓ Collaborations Page published");

  console.log("\nCreating Collaborators in Sanity...");
  const collabs = [
    { id: "anurag-gumber", name: "Anurag Gumber", role: "Assistant Professor, HKUST (Guangzhou)", photo: imgCollab1, scholar: "https://scholar.google.com/citations?user=3Ys1yoAAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/anurag-gumber/", order: 1 },
    { id: "sarath-guttikunda", name: "Sarath Guttikunda", role: "Founder, UrbanEmissions.info", photo: imgCollab2, scholar: "https://scholar.google.com/citations?user=XyEvdnMAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/sarath-guttikunda-3a01149/", order: 2 },
    { id: "narasimha-rao", name: "Narasimha Rao", role: "Professor of Energy Systems, Yale School of the Environment", photo: imgCollab3, scholar: "https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/narasimhadrao/", order: 3 },
    { id: "sara-constantino", name: "Sara Constantino", role: "Assistant Professor, Stanford University", photo: imgCollab4, scholar: "https://scholar.google.com/citations?user=3ShGgmcAAAAJ&hl=en", order: 4 },
    { id: "pranab-choudhury", name: "Pranab Choudhury", role: "Co-founder & CEO, Landstack", photo: imgCollab5, scholar: "https://scholar.google.com/citations?user=SPz4QrwAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/prchoudhury/", order: 5 },
    { id: "shalini-dhyani", name: "Shalini Dhyani", role: "Principal Scientist, CSIR-NEERI", photo: imgCollab6, scholar: "https://scholar.google.com/citations?user=alsuByQAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/shalini-d-84b81332/", order: 6 },
    { id: "ps-roy", name: "PS Roy", role: "Former Director, NRSC Hyderabad", photo: imgCollab7, scholar: "https://scholar.google.com/citations?user=DyxITKYAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/parth-sarathi-roy-74831761/", order: 7 },
  ];

  for (const c of collabs) {
    await client.createOrReplace({
      _id: `collab-${c.id}`,
      _type: "collaborator",
      name: c.name,
      slug: { current: c.id },
      role: c.role,
      photo: toAssetRef(c.photo),
      scholar: c.scholar,
      linkedin: c.linkedin,
      order: c.order,
    });
    console.log("✓ Collaborator published:", c.name);
  }

  console.log("\nAll images and documents successfully uploaded into Sanity!");
}

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

