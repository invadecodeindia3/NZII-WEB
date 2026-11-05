import { createClient } from "@sanity/client";

const TOKEN = "skJYVZBgO3aUKgQ48DIqCESxyGPbZ5YGvwKqVkZcNkWS34MGdWsazIz5Orv2obI8Z5oi60SbDJ4BHMly7uHhN3gb3bqRT4n8OcSGjkVIlZQh6QOJMOlH8JegWzAElPtHlZeZpsNwQHlJcTsGeIETqUuvSxf03ZYR6hmO6qEheInqpRGVYpMH";

const client = createClient({
  projectId: "bz23ff6t",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: TOKEN,
  useCdn: false,
});

const advisoryMembers = [
  { name: "Ajay Mathur", initials: "AM", role: "SPP, IIT Delhi", scholar: "https://scholar.google.com/citations?user=kCsLryIAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/ajay-mathur-3666b3334/", order: 1 },
  { name: "NH Ravindranath", initials: "NR", role: "Professor, Indian Institute of Science", scholar: "https://scholar.google.com/citations?user=INRlltAAAAAJ&hl=en", order: 2 },
  { name: "Sutirtha Bhattacharya", initials: "SB", role: "Former Chairman & MD, Coal India Limited", order: 3 },
  { name: "Joyashree Roy", initials: "JR", role: "Asian Institute of Technology, Thailand", scholar: "https://scholar.google.com/citations?user=BUPe_h4AAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/joyashree-roy-716722182/", order: 4 },
  { name: "Navroz Dubash", initials: "ND", role: "Professor, Princeton University", scholar: "https://scholar.google.com/citations?user=jfpM418AAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/navroz-k-dubash-bb2b58151/", order: 5 },
  { name: "Ashok Lavasa", initials: "AL", role: "Former Finance and MoEFCC Secretary", linkedin: "https://www.linkedin.com/in/ashok-lavasa-31322480/", order: 6 },
  { name: "Balachandra Patil", initials: "BP", role: "Professor, Indian Institute of Science", scholar: "https://scholar.google.com/citations?user=adNmZG4AAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/balachandra-patil-685b126/", order: 7 },
  { name: "Minal Pathak", initials: "MP", role: "Ahmedabad University", scholar: "https://scholar.google.com/citations?user=SbnZ-BsAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/minal-pathak-318827130/", order: 8 },
  { name: "Kiran Ananth", initials: "KA", role: "Executive Director – Energy Efficiency, Renewable Energy & Green Entrepreneurship, CII", linkedin: "https://www.linkedin.com/in/kiranananth/", order: 9 },
  { name: "Shoibal Chakravarty", initials: "SC", role: "Professor, Indian Institute of Science", scholar: "https://scholar.google.com/citations?user=BMNFCO8AAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/shoibalc/", order: 10 },
  { name: "Nagaraj Adve", initials: "NA", role: "Founder member, Teachers Against the Climate Crisis (TACC)", order: 11 },
  { name: "Gautam Talukdar", initials: "GT", role: "Wildlife Institute of India", scholar: "https://scholar.google.com/citations?user=RGeadBIAAAAJ&hl=en", order: 12 },
  { name: "PS Roy", initials: "PR", role: "Former Director, NRSC Hyderabad", scholar: "https://scholar.google.com/citations?user=DyxITKYAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/parth-sarathi-roy-74831761/", order: 13 },
  { name: "Sushil Saigal", initials: "SS", role: "TNC", order: 14 },
  { name: "Deepender Pandey", initials: "DP", role: "Former Director, Forest Survey of India (FSI)", linkedin: "https://www.linkedin.com/in/devendra-pandey-6553782b/", order: 15 },
  { name: "Narasimha Rao", initials: "NR", role: "Professor of Energy Systems, Yale School of the Environment", scholar: "https://scholar.google.com/citations?user=cwli_mwAAAAJ&hl=en", linkedin: "https://www.linkedin.com/in/narasimhadrao/", order: 16 },
  { name: "Bharath Jairaj", initials: "BJ", role: "Executive Director, WRI", linkedin: "https://www.linkedin.com/in/bharathjairaj/", order: 17 },
  { name: "Ajay Shankar", initials: "AS", role: "The Energy & Resources Institute (TERI)", order: 18 },
  { name: "Gauri Singh", initials: "GS", role: "International Renewable Energy Agency (IRENA)", order: 19 },
  { name: "Praveer Sinha", initials: "PS", role: "Tata Power", order: 20 },
];

async function seedAdvisory() {
  for (const m of advisoryMembers) {
    const slug = m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await client.createOrReplace({
      _id: `advisory-${slug}`,
      _type: "advisoryMember",
      name: m.name,
      initials: m.initials,
      role: m.role,
      scholar: m.scholar,
      linkedin: m.linkedin,
      order: m.order,
    });
    console.log("✓ Added Advisory Member:", m.name);
  }
}

seedAdvisory().catch(console.error);

