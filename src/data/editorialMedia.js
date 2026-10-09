/**
 * Editorial photo references, illustrative only: not photographs of verified NZII
 * projects, events, research or partners. Replace with approved local assets later.
 */
const image = (id, width = 1280) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=80';
export const editorialMedia = {
  energy: image('photo-1532601224476-15c79f2f7a51', 1600),
  landscape: image('photo-1500530855697-b586d89ba3ee'),
  forest: image('photo-1441974231531-c6227db76b6e'),
  solar: image('photo-1509391366360-2e959784a276'),
  agriculture: image('photo-1500382017468-9049fed747ef'),
  people: image('photo-1521737711867-e3b97375f902'),
  research: image('photo-1532094349884-543bc11b234d'),
  cities: image('photo-1480714378408-67cf0d13bc1b'),
  mobility: image('photo-1449965408869-eaa3f722e40d'),
  water: image('photo-1433086966358-54859d0ed716'),
  nature: image('photo-1473448912268-2022ce9509d8'),
  investment: image('photo-1497366811353-6870744d04b2'),
  convening: image('photo-1475721027785-f74eccf877e2'),
};
export const themeMedia = {
  'energy-system': editorialMedia.energy,
  'land-use-dynamics': editorialMedia.agriculture,
  'employment': editorialMedia.people,
  'energy-finance-investment': editorialMedia.investment,
  'biodiversity-natural-resources': editorialMedia.forest,
  'energy-society-justice': editorialMedia.cities,
  'mobility': editorialMedia.mobility,
  'methodological-advances-modeling': editorialMedia.research,
  'open-fair-data': editorialMedia.nature,
};
