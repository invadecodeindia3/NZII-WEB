export default {
  name: "mediaAsset",
  title: "Media Library (OneDrive Photos)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title / Theme",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category / Research Theme",
      type: "string",
    },
    {
      name: "fileName",
      title: "Original File",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
};

