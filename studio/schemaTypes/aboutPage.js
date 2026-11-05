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
    {
      name: "piSectionTitle",
      title: "PIs Section Title",
      type: "string",
      initialValue: "Meet the PIs",
    },
    {
      name: "pis",
      title: "Principal Investigators (PIs)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Full Name", type: "string" },
            { name: "role", title: "Role", type: "string", initialValue: "Principal Investigator" },
            { name: "institution", title: "Institution", type: "string", initialValue: "IIT Delhi" },
            { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
            { name: "scholar", title: "Google Scholar URL", type: "url" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
          ],
        },
      ],
    },
    {
      name: "iitdResearchers",
      title: "IIT Delhi Researchers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Full Name", type: "string" },
            { name: "initials", title: "Initials (e.g. TK)", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "isLead", title: "Is Lead?", type: "boolean", initialValue: false },
            { name: "scholar", title: "Google Scholar URL", type: "url" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
          ],
        },
      ],
    },
    {
      name: "adminTeam",
      title: "Admin and Communications Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Full Name", type: "string" },
            { name: "initials", title: "Initials", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "linkedin", title: "LinkedIn URL", type: "url" },
          ],
        },
      ],
    },
    {
      name: "pastResearchers",
      title: "Past Researchers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Full Name", type: "string" },
            { name: "initials", title: "Initials", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "scholar", title: "Google Scholar URL", type: "url" },
          ],
        },
      ],
    },
    {
      name: "partnerTeams",
      title: "Core Partner Teams",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "orgName", title: "Organization Name", type: "string" },
            { name: "orgId", title: "CSS ID (prayas, princeton)", type: "string" },
            {
              name: "members",
              title: "Members",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", title: "Full Name", type: "string" },
                    { name: "initials", title: "Initials", type: "string" },
                    { name: "role", title: "Role (optional)", type: "string" },
                    { name: "isLead", title: "Is Lead?", type: "boolean" },
                    { name: "scholar", title: "Google Scholar URL", type: "url" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "About Page (Live)",
      };
    },
  },
};
