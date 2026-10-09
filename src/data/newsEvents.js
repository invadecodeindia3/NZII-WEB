/**
 * NZII News & Events editorial registry.
 * The client has separately identified 15 real events; their titles, dates and blurbs
 * have NOT yet been supplied. These six FICTIONAL design examples are not those events.
 *
 * To publish a real item, require status='published', verified=true, approved source copy,
 * accurate eventDate/dateLabel, approvals and rights for any supplied media.
 * Fictional examples are deliberately marked with fictional=true and no real date.
 * Draft and review entries never appear on the public site.
 */
export const IDENTIFIED_EVENT_COUNT = 15;
export const NEWS_EVENTS = [
  {
    "slug": "sample-grid-futures-roundtable",
    "title": "India’s Energy System Futures: Research Roundtable",
    "type": "event",
    "themeSlugs": [
      "energy-system",
      "methodological-advances-modeling"
    ],
    "excerpt": "An example roundtable examining electricity reliability, renewable integration and the assumptions behind long-term energy scenarios.",
    "body": [
      "This fictional event illustrates how NZII could introduce discussion-led research programming on energy systems. No roundtable has been scheduled or held.",
      "A possible agenda would consider generation planning, demand flexibility, storage, uncertainty and transparent scenario assumptions. The questions shown here are illustrative and no speakers or institutional partners are being claimed."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  },
  {
    "slug": "sample-land-biodiversity-dialogue",
    "title": "Land, Water & Biodiversity: Research Dialogue",
    "type": "event",
    "themeSlugs": [
      "land-use-dynamics",
      "biodiversity-natural-resources"
    ],
    "excerpt": "A sample interdisciplinary session on land-use change, ecosystem resilience and competing demands on natural resources.",
    "body": [
      "This is a fictional research event created only to demonstrate the News & Events experience. There are no confirmed organisers, speakers or dates.",
      "The sample programme explores land-use transitions, forests, water stress, conservation trade-offs and the research methods needed to compare ecological scenarios."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  },
  {
    "slug": "sample-future-work-workshop",
    "title": "Work, Skills & the Energy Transition: Methods Workshop",
    "type": "event",
    "themeSlugs": [
      "employment",
      "energy-society-justice"
    ],
    "excerpt": "An illustrative workshop exploring employment pathways, reskilling needs and social equity through India's transition.",
    "body": [
      "This example workshop is not a record of any NZII activity. It demonstrates how future event summaries could connect employment research with justice and social outcomes.",
      "Illustrative discussion topics include occupational transitions, regional labour exposure, decent work and transparent use of employment data."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  },
  {
    "slug": "sample-transition-finance-colloquium",
    "title": "Financing a Just Transition: Research Colloquium",
    "type": "event",
    "themeSlugs": [
      "energy-finance-investment",
      "energy-society-justice"
    ],
    "excerpt": "A fictional colloquium exploring investment risk, public finance and the distribution of transition costs.",
    "body": [
      "This content is a design sample, not an invitation to a scheduled colloquium or an account of one already held.",
      "A potential research conversation would explore financing pathways, the cost of capital, regional disparities and how social outcomes can be reflected in investment analysis."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  },
  {
    "slug": "sample-mobility-access-lab",
    "title": "Mobility, Access & Low-Carbon Transport: Ideas Lab",
    "type": "event",
    "themeSlugs": [
      "mobility",
      "energy-system"
    ],
    "excerpt": "A sample ideas lab on transport accessibility, freight efficiency, electrification and mobility evidence.",
    "body": [
      "This is a fictional event example. No venue, date, registration or speakers have been announced.",
      "The sample programme connects passenger mobility, freight activity, charging needs, energy-system impacts and the accessibility implications of infrastructure choices."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  },
  {
    "slug": "sample-open-fair-model-clinic",
    "title": "Open FAIR Data & Reproducible Models: Research Clinic",
    "type": "event",
    "themeSlugs": [
      "open-fair-data",
      "methodological-advances-modeling"
    ],
    "excerpt": "An example research clinic on provenance, interoperable metadata, reproducible pipelines and model uncertainty.",
    "body": [
      "This fictional research clinic demonstrates how an NZII methodology event could be described on the platform. It is not an actual programme or completed workshop.",
      "Potential topics include research data standards, persistent identifiers, transparent transformations, licensing, sensitivity analysis and requirements for independent scientific review."
    ],
    "dateLabel": "No real date · Fictional example",
    "eventDate": null,
    "location": "Illustrative format only",
    "status": "published",
    "fictional": true,
    "verified": false
  }
];
export const PUBLISHED_NEWS_EVENTS = NEWS_EVENTS.filter(item =>
  item.status === 'published' && (item.fictional === true || item.verified === true)
  && item.slug && item.title && item.excerpt
);
export const getNewsEvent = slug => PUBLISHED_NEWS_EVENTS.find(item => item.slug === slug);
