/**
 * Centralized Sanity GROQ queries for NZII Website
 */

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
