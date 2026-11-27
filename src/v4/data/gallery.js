// Photos and videos from NZII events, grouped by event. The Gallery page and the "See the photos" links on
// News & Events read this list. Add an event (newest first) or a photo here; `news` is its News & Events entry.
const P = '/assets/photos';
export const GALLERY = [
  {
    id: 'g-2026-09-nzx', title: 'Global Net Zero X workshop', meta: 'September 2026 · Princeton University', news: '2026-09-nzx-princeton',
    items: [
      { src: `${P}/events/2026-09-nzx.jpg`, sm: `${P}/events/2026-09-nzx-sm.jpg`, w: 1000, h: 667, alt: 'NZII researchers with colleagues at the Global Net Zero X workshop, Princeton University, September 2026' },
    ],
  },
  {
    id: 'g-2025-01-conference', title: 'Conference on India’s path to net zero', meta: 'January 2025 · India Habitat Centre, New Delhi', news: '2025-01-conference',
    items: [
      { video: 'https://youtu.be/leUxPr9g_5w', label: 'Watch Day 1', src: `${P}/events/2025-01-conference-day1-portrait.jpg`, sm: `${P}/events/2025-01-conference-day1-portrait-sm.jpg`, w: 900, h: 900, alt: 'A speaker on Day 1 of the conference on India’s path to net zero, January 2025' },
      { video: 'https://youtu.be/3Y0-CJzP-_g', label: 'Watch Day 2', src: `${P}/events/2025-01-conference-day2-portrait.jpg`, sm: `${P}/events/2025-01-conference-day2-portrait-sm.jpg`, w: 900, h: 900, alt: 'A speaker on Day 2 of the conference on India’s path to net zero, January 2025' },
    ],
  },
  {
    id: 'g-2024-sector-workshops', title: 'Sector workshops', meta: 'September to December 2024 · IIT Delhi', news: '2024-09-sector-workshops',
    items: [
      { src: `${P}/events/2024-sector-urban-xl.jpg`, sm: `${P}/events/2024-sector-urban-sm.jpg`, w: 1600, h: 1067, alt: 'Participants at the NZII workshop on the future of India’s urbanisation, IIT Delhi, September 2024' },
      { src: `${P}/gallery/12_Urbanisation_Sep2024_photo2_group_exercise.jpg`, sm: `${P}/gallery/12_Urbanisation_Sep2024_photo2_group_exercise-sm.jpg`, w: 1600, h: 1200, alt: 'A group exercise at the NZII workshop on urbanisation, IIT Delhi, September 2024' },
      { src: `${P}/gallery/12_Agriculture_Dec2024_photo1_room.jpg`, sm: `${P}/gallery/12_Agriculture_Dec2024_photo1_room-sm.jpg`, w: 1600, h: 1200, alt: 'The NZII workshop on agriculture, IIT Delhi, December 2024' },
      { src: `${P}/who/strip-agri-05.jpg`, sm: `${P}/who/strip-agri-05-sm.jpg`, w: 900, h: 675, alt: 'A session at the NZII workshop on agriculture, IIT Delhi, December 2024' },
      { src: `${P}/who/collab-agri-speaker.jpg`, sm: `${P}/who/collab-agri-speaker-sm.jpg`, w: 1000, h: 1000, alt: 'A researcher speaks at the NZII workshop on agriculture, IIT Delhi, December 2024' },
      { src: `${P}/gallery/12_Industry_Dec2024_photo1_room.jpg`, sm: `${P}/gallery/12_Industry_Dec2024_photo1_room-sm.jpg`, w: 1500, h: 1125, alt: 'The NZII workshop on industry, IIT Delhi, December 2024' },
    ],
  },
  {
    id: 'g-2024-07-launch', title: 'Launch of the Net Zero India Initiative', meta: 'July 2024 · IIT Delhi', news: '2024-07-launch',
    items: [
      { src: `${P}/events/2024-07-launch-xl.jpg`, sm: `${P}/events/2024-07-launch-sm.jpg`, w: 1600, h: 1067, alt: 'Participants at the launch and scenarios workshop of the Net Zero India Initiative, IIT Delhi, July 2024' },
      { src: `${P}/who/strip-launch-22.jpg`, sm: `${P}/who/strip-launch-22-sm.jpg`, w: 900, h: 675, alt: 'Participants at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
      { src: `${P}/who/strip-launch-16.jpg`, sm: `${P}/who/strip-launch-16-sm.jpg`, w: 900, h: 675, alt: 'Discussion at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
      { src: `${P}/who/strip-launch-04.jpg`, sm: `${P}/who/strip-launch-04-sm.jpg`, w: 900, h: 675, alt: 'Participants listening at the launch of the Net Zero India Initiative, IIT Delhi, July 2024' },
    ],
  },
];

/** Gallery anchor for a News & Events entry, if that event has photos. */
export const galleryFor = (newsId) => GALLERY.find((g) => g.news === newsId)?.id;
