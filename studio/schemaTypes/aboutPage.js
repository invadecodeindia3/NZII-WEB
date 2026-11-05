export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    // Hero Section
    {
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Building a deeper understanding of India’s path to",
    },
    {
      name: "heroHeadlineAccent",
      title: "Hero Headline Accent (Green/Teal)",
      type: "string",
      initialValue: "net zero.",
    },
    {
      name: "heroParagraph1",
      title: "Hero Paragraph 1",
      type: "text",
      rows: 3,
      initialValue:
        "The Net Zero India Initiative is a research initiative led by the School of Public Policy, IIT Delhi, aimed at building rigorous, spatially detailed, and accessible evidence that can inform policy and enable more inclusive conversations about India’s transition.",
    },
    {
      name: "heroParagraph2",
      title: "Hero Paragraph 2",
      type: "text",
      rows: 2,
      initialValue:
        "Started in 2024, the NZII comprises a diverse team of more than 30 researchers across 4 institutions.",
    },

    // Principles Section
    {
      name: "principlesTitle",
      title: "Principles Title",
      type: "string",
      initialValue: "Our principles",
    },
    {
      name: "principles",
      title: "Principles List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Principle Title", type: "string" },
            { name: "description", title: "Description", type: "string" },
            { name: "color", title: "Color (teal, lime, coral, pink)", type: "string" },
          ],
        },
      ],
      initialValue: [
        { title: "Rigorous", description: "Research designed to withstand scrutiny.", color: "teal" },
        { title: "Independent", description: "NZII does not advocate for a predetermined pathway.", color: "lime" },
        { title: "Collaborative", description: "We work across institutions, disciplines and stakeholder groups.", color: "coral" },
        { title: "Open", description: "We aim to make research, methods, models and data increasingly accessible.", color: "pink" },
      ],
    },

    // Partners Section
    {
      name: "partnersTitle",
      title: "Partners Section Title",
      type: "string",
      initialValue: "Built through partnership",
    },

    // People Section
    {
      name: "peopleTitle",
      title: "People Section Title",
      type: "string",
      initialValue: "The people behind the Net Zero India Initiative",
    },
    {
      name: "peopleSubtitle",
      title: "People Section Subtitle",
      type: "string",
      initialValue: "A multidisciplinary team for a multidimensional challenge.",
    },
  ],
};
