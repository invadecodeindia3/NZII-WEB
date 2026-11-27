// OPEN CALLS: the one place to update (from the prototype's assets/data/open-calls.js).
// The Home page pop-up reads this, so changes here show up there.
// - Add a theme: add an entry to `themes` (and its full page on the Open Calls microsite). Set `open: false` to take it down.
// - Dates: 'YYYY-MM-DD', or null while to be confirmed.
// - The Home pop-up shows while at least one theme is open and the last date has not passed; it says
//   "Closing soon" in the last 14 days and hides itself after the last date.
export const OPEN_CALLS_DATA = {
  programme: 'Academic Research Collaboration Programme',
  site: '/open-calls/index.html',
  opens: null,
  lastDate: null,
  shortlisting: null,
  themes: [
    {
      id: 'agent-based',
      no: 1,
      open: true,
      title: 'Agent-based modelling of India’s energy transition',
      summary: 'How do the separate investment and technology choices of generators, investors, policymakers and consumers add up to India’s path to net zero?',
      lead: 'Prof Kaveri Iychettira',
      photo: '/assets/people/pi-kaveri-iychettira.jpg',
    },
    {
      id: 'employment',
      no: 2,
      open: true,
      title: 'Modelling employment shifts in India’s energy transition',
    },
    {
      id: 'biodiversity',
      no: 3,
      open: true,
      title: 'Modelling multitaxa habitat suitability and optimising spatial buffers for long-term biodiversity persistence',
    },
    {
      id: 'capital',
      no: 4,
      open: true,
      title: 'Modelling capital mobilisation for India’s energy transition',
    },
  ],
};
