export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // Hero Section
    {
      name: "heroHeadline1",
      title: "Hero Headline Line 1",
      type: "string",
      initialValue: "What will it take",
    },
    {
      name: "heroHeadline2",
      title: "Hero Headline Line 2",
      type: "string",
      initialValue: "for India to reach",
    },
    {
      name: "heroHeadline3",
      title: "Hero Headline Line 3",
      type: "string",
      initialValue: "net zero?",
    },
    {
      name: "heroParagraph1",
      title: "Hero Paragraph 1",
      type: "text",
      rows: 3,
      initialValue:
        "India has committed to achieving net-zero emissions by 2070. Getting there will transform how the country produces and uses energy, builds infrastructure, uses land and resources, and creates livelihoods.",
    },
    {
      name: "heroParagraph2",
      title: "Hero Paragraph 2",
      type: "text",
      rows: 3,
      initialValue:
        "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the environment.",
    },
    {
      name: "heroButtonText",
      title: "Hero Button Text",
      type: "string",
      initialValue: "About the Net Zero India Initiative",
    },
    {
      name: "heroButtonLink",
      title: "Hero Button Link",
      type: "string",
      initialValue: "/about",
    },
    {
      name: "heroImageInnovation",
      title: "Hero Image - Innovation Bubble",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroImageCentre",
      title: "Hero Image - Centre Bubble",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroImageResearch",
      title: "Hero Image - Research Bubble",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroImagePathways",
      title: "Hero Image - Pathways Bubble",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroImageNetZero",
      title: "Hero Image - Net Zero Bubble",
      type: "image",
      options: { hotspot: true },
    },

    // Why NZII Section
    {
      name: "whyEyebrow",
      title: "Why Section Eyebrow",
      type: "string",
      initialValue: "Why NZII exists",
    },
    {
      name: "whyTitle",
      title: "Why Section Title",
      type: "string",
      initialValue: "Net zero can take many forms.",
    },
    {
      name: "whyTitleAccent",
      title: "Why Section Title Accent (Green/Teal)",
      type: "string",
      initialValue: "So can India’s path to it.",
    },
    {
      name: "whySubhead",
      title: "Why Section Subhead",
      type: "string",
      initialValue: "India’s transition will involve choices.",
    },
    {
      name: "whyChoices",
      title: "Why Section Choices List",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Where should new energy infrastructure be built?",
        "How much land and water could different pathways require?",
        "What happens to jobs and livelihoods?",
        "How might energy choices affect air quality and health?",
        "Where will investment flow?",
      ],
    },
    {
      name: "whyClosing",
      title: "Why Section Closing Paragraph",
      type: "text",
      rows: 3,
      initialValue:
        "These questions cannot be understood in isolation. We study the connections between energy, development, land, water, biodiversity, health, employment, and equity to understand both, whether India can reach net zero, and, what different ways of getting there could mean.",
    },
    {
      name: "pillarsTitle",
      title: "Pillars Title",
      type: "string",
      initialValue: "NZII presents a more complete picture of India’s net-zero transition",
    },
    {
      name: "pillarsIntro",
      title: "Pillars Intro",
      type: "string",
      initialValue: "That picture is more complete because our research is:",
    },
    {
      name: "pillars",
      title: "Pillars (Cards)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "num", title: "Number", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
        },
      ],
    },

    // Led by India Section
    {
      name: "ledEyebrow",
      title: "Led By Section Eyebrow",
      type: "string",
      initialValue: "Our Approach",
    },
    {
      name: "ledTitle",
      title: "Led By Section Title",
      type: "string",
      initialValue: "Led by India.",
    },
    {
      name: "ledTitleAccent",
      title: "Led By Section Title Accent",
      type: "string",
      initialValue: "Built through collaboration.",
    },
    {
      name: "ledDescription",
      title: "Led By Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "The Net Zero India Initiative brings together researchers and institutions across energy systems, public policy, land, development, and related fields to build a rigorous, India-specific understanding of the transition.",
    },

    // Explore Work Section
    {
      name: "workTitle",
      title: "Work Section Title",
      type: "string",
      initialValue: "Explore",
    },
    {
      name: "workTitleAccent",
      title: "Work Section Title Accent",
      type: "string",
      initialValue: "our work",
    },

    // Latest News Section
    {
      name: "newsTitle",
      title: "News Section Title",
      type: "string",
      initialValue: "Latest from the",
    },
    {
      name: "newsTitleAccent",
      title: "News Section Title Accent",
      type: "string",
      initialValue: "Net Zero India Initiative",
    },

    // CTA / Final Section
    {
      name: "ctaTitle",
      title: "CTA Section Title",
      type: "string",
      initialValue: "India’s path to 2070",
    },
    {
      name: "ctaTitleAccent",
      title: "CTA Section Title Accent",
      type: "string",
      initialValue: "is still being written.",
    },
    {
      name: "ctaDescription",
      title: "CTA Section Description",
      type: "text",
      rows: 2,
      initialValue:
        "The decisions made this decade will shape emissions, infrastructure, and livelihoods for generations.",
    },
    {
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Explore Our Collaborations",
    },
    {
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
      initialValue: "/collaborations",
    },
  ],
};
