export default {
  name: "collaborationsPage",
  title: "Collaborations Page",
  type: "document",
  fields: [
    // Open Calls Intro
    {
      name: "introLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Explore Our Collaborations",
    },
    {
      name: "introHeadline",
      title: "Headline",
      type: "string",
      initialValue: "IIT Delhi’s Open Calls for Collaboration under RFNs",
    },
    {
      name: "introLead",
      title: "Lead Paragraph",
      type: "text",
      rows: 4,
      initialValue:
        "Through the open calls for collaboration, funded by Schmidt Sciences, the IIT Delhi NZII team aims to identify and address emergent capacity deficits across several thematic areas of the Net Zero India Initiative (NZII). In this round, we release four calls for collaboration along the following themes; each theme is described in detail in the corresponding links below.",
    },

    // Current Round Side Panel
    {
      name: "roundStatus",
      title: "Round Status Label (e.g. Open / Closed)",
      type: "string",
      initialValue: "Open",
    },
    {
      name: "roundTitle",
      title: "Round Title (e.g. Round 2)",
      type: "string",
      initialValue: "Round 2",
    },
    {
      name: "deadline",
      title: "Deadline Text",
      type: "string",
      initialValue: "To be confirmed",
    },
    {
      name: "honorarium",
      title: "Honorarium Text",
      type: "string",
      initialValue: "To be confirmed",
    },
    {
      name: "exploreButtonText",
      title: "Explore Open Calls Button Text",
      type: "string",
      initialValue: "Explore Open Calls",
    },
    {
      name: "applyButtonText",
      title: "How to Apply Button Text",
      type: "string",
      initialValue: "How to apply",
    },

    // Collaborators Section
    {
      name: "collaboratorsTitle",
      title: "Collaborators Section Title",
      type: "string",
      initialValue: "Meet the collaborators",
    },

    // Advisory Committee Section
    {
      name: "advisoryTitle",
      title: "Advisory Committee Title",
      type: "string",
      initialValue: "Advisory Committee",
    },
  ],
};
