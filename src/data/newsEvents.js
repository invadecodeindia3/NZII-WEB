/** News and Events editorial registry.
 * The client has identified 15 events, but supplied no publishable details yet.
 * Editors can add entries here when titles, dates, blurbs, permissions and factual details are approved.
 *
 * Example entry SHAPE (do not publish this example):
 * {
 *   slug: 'unique-event-slug', title: 'Event title', type: 'event' | 'news',
 *   eventDate: '2026-11-10', dateLabel: '10 November 2026',
 *   location: 'Delhi' | 'Online', excerpt: 'Approved editorial blurb',
 *   body: ['Approved paragraph 1'], themeSlugs: ['energy-system'],
 *   status: 'draft' | 'review' | 'approved' | 'published',
 *   imageUrl: null, publishedAt: '2026-11-01'
 * }
 * Do not insert an empty/draft event into public listings.
 */
export const IDENTIFIED_EVENT_COUNT = 15;
export const NEWS_EVENTS = [];
export const PUBLISHED_NEWS_EVENTS = NEWS_EVENTS.filter(item => item.status === 'published' && item.title && item.excerpt && item.slug);
export const getNewsEvent = slug => PUBLISHED_NEWS_EVENTS.find(item => item.slug === slug);
