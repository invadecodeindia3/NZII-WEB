export default {
  name: "siteSettings",
  title: "Site Settings (Header & Footer)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "Net Zero India Initiative",
    },
    {
      name: "logoLight",
      title: "Logo (Light Mode)",
      type: "image",
      description: "Default color logo on light background",
    },
    {
      name: "logoDark",
      title: "Logo (Dark Mode)",
      type: "image",
      description: "Pale/white logo on dark background",
    },
    {
      name: "footerText",
      title: "Footer Description Paragraph",
      type: "text",
      rows: 3,
      initialValue:
        "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.",
    },
    {
      name: "footerTagline1",
      title: "Footer Tagline Left",
      type: "string",
      initialValue: "Net Zero India Initiative · Research, pathways and evidence",
    },
    {
      name: "footerTagline2",
      title: "Footer Tagline Right",
      type: "string",
      initialValue: "Made for curiosity, grounded in evidence.",
    },
  ],
};
