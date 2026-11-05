export default {
  name: "openCall",
  title: "Open Call for Collaboration",
  type: "document",
  fields: [
    {
      name: "callNo",
      title: "Call Number (e.g. 1, 2, 3)",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "theme",
      title: "Thematic Area",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Call Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "stay",
      title: "Duration / Stay (e.g. 3–6 months)",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "link",
      title: "External Call Link",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "theme",
    },
  },
};
