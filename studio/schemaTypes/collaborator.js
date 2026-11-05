export default {
  name: "collaborator",
  title: "Collaborator",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (ID)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "initials",
      title: "Initials",
      type: "string",
    },
    {
      name: "role",
      title: "Role / Affiliation",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "scholar",
      title: "Google Scholar URL",
      type: "url",
    },
    {
      name: "linkedin",
      title: "LinkedIn Profile URL",
      type: "url",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
};
