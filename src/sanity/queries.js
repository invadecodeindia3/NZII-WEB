/**
 * Centralized Sanity GROQ queries for NZII Website
 * Every field has a 1-to-1 match with the Sanity Studio schema
 */

// Global Site Settings (Header & Footer)
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  "logoLight": logoLight.asset->url,
  "logoDark": logoDark.asset->url,
  footerText,
  footerTagline1,
  footerTagline2
}`;

// Home Page
export const homePageQuery = `*[_type == "homePage"][0] {
  heroHeadline1,
  heroHeadline2,
  heroHeadline3,
  heroParagraph1,
  heroParagraph2,
  heroButtonText,
  heroButtonLink,
  "heroImageInnovation": heroImageInnovation.asset->url,
  "heroImageCentre": heroImageCentre.asset->url,
  "heroImageResearch": heroImageResearch.asset->url,
  "heroImagePathways": heroImagePathways.asset->url,
  "heroImageNetZero": heroImageNetZero.asset->url,
  whyEyebrow,
  whyTitle,
  whyTitleAccent,
  whySubhead,
  whyChoices,
  whyClosing,
  pillarsTitle,
  pillarsIntro,
  pillars[] {
    num,
    title,
    description
  },
  ledEyebrow,
  ledTitle,
  ledTitleAccent,
  ledDescription,
  workTitle,
  workTitleAccent,
  "workFeaturedPhoto": workFeaturedPhoto.asset->url,
  workFeaturedEyebrow,
  workFeaturedTitle,
  workFeaturedDescription,
  workGetInvolvedEyebrow,
  workGetInvolvedTitle,
  workGetInvolvedDescription,
  workGetInvolvedButtonText,
  workGetInvolvedButtonLink,
  newsTitle,
  newsTitleAccent,
  newsCards[] {
    "photo": photo.asset->url,
    eyebrow,
    title,
    date,
    link
  },
  ctaTitle,
  ctaTitleAccent,
  ctaDescription,
  ctaButtonText,
  ctaButtonLink
}`;

// About Page
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  heroHeadline,
  heroHeadlineAccent,
  heroParagraph1,
  heroParagraph2,
  principlesTitle,
  principles[] {
    title,
    description,
    color
  },
  partnersTitle,
  peopleTitle,
  peopleSubtitle,
  piSectionTitle,
  pis[] {
    name,
    role,
    institution,
    "photo": photo.asset->url,
    scholar,
    linkedin
  },
  iitdResearchers[] {
    name,
    initials,
    role,
    isLead,
    scholar,
    linkedin
  },
  adminTeam[] {
    name,
    initials,
    role,
    linkedin
  },
  pastResearchers[] {
    name,
    initials,
    role,
    scholar
  },
  partnerTeams[] {
    orgName,
    orgId,
    members[] {
      name,
      initials,
      role,
      isLead,
      scholar
    }
  }
}`;

// Collaborations Page
export const collaborationsPageQuery = `*[_type == "collaborationsPage"][0] {
  introLabel,
  introHeadline,
  introLead,
  roundStatus,
  roundTitle,
  deadline,
  honorarium,
  exploreButtonText,
  applyButtonText,
  collaboratorsTitle,
  advisoryTitle
}`;

// Advisory Committee Members
export const advisoryQuery = `*[_type == "advisoryMember"] | order(order asc, name asc) {
  _id,
  name,
  initials,
  role,
  scholar,
  linkedin,
  order
}`;

// Collaborators
export const collaboratorsQuery = `*[_type == "collaborator"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  initials,
  role,
  "photo": photo.asset->url,
  scholar,
  linkedin,
  order,
  news[] {
    title,
    date,
    meta,
    url
  }
}`;

// Open Calls for Collaboration
export const openCallsQuery = `*[_type == "openCall"] | order(callNo asc) {
  _id,
  callNo,
  theme,
  title,
  stay,
  description,
  link
}`;

// News & Events
export const newsEventsQuery = `*[_type == "newsEvent"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  meta,
  excerpt,
  "coverImage": coverImage.asset->url,
  link
}`;
