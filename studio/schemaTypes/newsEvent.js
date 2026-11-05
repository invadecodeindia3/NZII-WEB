export default {
  name: "newsEvent",
  title: "News & Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "meta",
      title: "Meta Label (e.g. November 2025 · IIT Delhi)",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Short Excerpt / Blurb",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "link",
      title: "Article Link",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "coverImage",
    },
  },
};

