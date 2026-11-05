export default {
  name: "advisoryMember",
  title: "Advisory Committee Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "initials",
      title: "Initials (2 letters, e.g. AM)",
      type: "string",
      validation: (Rule) => Rule.max(3),
    },
    {
      name: "role",
      title: "Role / Affiliation",
      type: "string",
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
      description: "Lower numbers appear first (e.g. 1, 2, 3)",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
};
