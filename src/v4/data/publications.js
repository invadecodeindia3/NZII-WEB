// NZII publications and outputs, from "RFN Outputs Template.xlsx" (sent by Ashwini Mudgal, November 2026).
// Add new items here; the Publications page and the site search read this list.
// type: 'journal' | 'book' | 'report' | 'presentation' | 'dataset'. `ym` (year-month) only orders the list.
// Workshops and seminars listed in the sheet are events, so they are on the News & Events page instead.
export const PUB_TYPES = [
  { key: 'journal', label: 'Journal articles', one: 'Journal article' },
  { key: 'book', label: 'Book chapters', one: 'Book chapter' },
  { key: 'report', label: 'Reports', one: 'Report' },
  { key: 'presentation', label: 'Conference presentations', one: 'Presentation' },
  { key: 'dataset', label: 'Datasets', one: 'Dataset' },
];

export const PUBLICATIONS = [
  {
    type: 'journal', ym: '2026-06',
    title: 'The impact of utility-scale renewable energy on distribution utility finances in India: Insights from Rajasthan and Jharkhand',
    venue: 'The Electricity Journal, 39(2), 107533', date: 'June 2026',
    authors: 'Neshwin Rodrigues, Kaveri Iychettira, Joe Lane',
    link: 'https://doi.org/10.1016/j.tej.2026.107533',
  },
  {
    type: 'journal', ym: '2026-02',
    title: 'No empty Land: Comparing distributional outcomes of solar parks across land tenure regimes in India',
    venue: 'Energy Research and Social Science', date: 'February 2026',
    authors: 'Sukanya Khar, Kaveri Iychettira',
    link: 'https://doi.org/10.1016/j.erss.2026.104544',
  },
  {
    type: 'journal', ym: '2026-01',
    title: 'The role of subsidies in accelerating green hydrogen adoption in India: A model-based policy evaluation',
    venue: 'Energy Policy', date: 'January 2026',
    authors: 'Akhil Chauhan, Kaveri Iychettira',
    link: 'https://doi.org/10.1016/j.enpol.2026.115109',
  },
  {
    type: 'journal', ym: '2025-10',
    title: 'Potential of India’s AFOLU sector in achieving net zero: A systematic review of land-based mitigation strategies',
    venue: 'Land Use Policy', date: 'October 2025',
    authors: 'Srishti Gwal, Aditya Sharma, Andrew Pascale, Rajarshi Dasgupta, Ganesh Hegde, Chris Greig',
    link: 'https://doi.org/10.1016/j.landusepol.2025.107798',
  },
  {
    type: 'journal', ym: '2025-10', status: 'Under review',
    title: 'Charting Coupled Development - Mitigation Pathways for India: Insights from a Decade of Modelling Studies',
    venue: 'npj Climate Action', date: 'Under review since October 2025',
    authors: 'Medhavi Sandhani, Kaveri Iychettira, Sara Constantino',
  },
  {
    type: 'journal', ym: '2025-01', status: 'Under review',
    title: 'Analytical overview of India’s Non-CO2 Agricultural Emissions: Long-Term Trends, Projections, and Transformative Mitigation Potential',
    venue: 'Environmental Impact Assessment Review', date: 'Under review',
    authors: 'Aditya Sharma, Rajarshi Dasgupta, Andrew Pascale, Srishti Gwal, Chris Greig',
  },
  {
    type: 'book', ym: '2025-04',
    title: 'Development Outcomes of Mitigation Pathways: Assessing our State of Knowledge',
    venue: 'Energy Transition and Climate Justice: A Path Less Travelled (Vol. 51), India International Centre', date: 'Winter 2024 – Spring 2025',
  },
  {
    type: 'report', ym: '2026-04',
    title: 'Climate Transition Pathways',
    venue: 'India Climate and Energy Frontiers report, Schmidt Sciences', date: 'April 2026',
    authors: 'Dwarkeshwar Dutt, Medhavi Sandhani, Kaveri Iychettira, Ambuj Sagar',
    news: '/v4/news-events#2026-04-icef-report',
  },
  {
    type: 'presentation', ym: '2026-07',
    title: 'Supply-Side Optimization Framework for India’s Electricity Sector',
    venue: 'Conference Paper (IAEEE)', date: '19–22 July 2026',
    authors: 'Shashank Prabhakar, Kaveri Iychettira',
    link: 'https://iaee2026chile.org/',
  },
  {
    type: 'presentation', ym: '2026-06',
    title: 'Applying the Nature Futures Framework (NFF) to navigate India’s forest future',
    venue: 'World Biodiversity Forum 2026, Switzerland', date: '14–16 June 2026',
    authors: 'Dasgupta, R., Basu, M., and Kanojia, V',
    link: 'https://doi.org/10.5194/wbf2026-647',
  },
  {
    type: 'presentation', ym: '2026-06',
    title: 'The Land-Energy-Development Nexus: Spatial Constraints, Socio-Technical Trade-offs, and Policy Pathways for India’s Net-Zero Transition',
    venue: '6th India Public Policy Conference, NLSIU (conference paper)', date: '8–11 June 2026',
    authors: 'Ganesh Hegde, Somya Srivastava, Sukanya Khar, Kaveri Iychettira',
    link: 'https://www.ippapublicpolicy.org/conference/6th-india-public-policy-network-conference/panel-list/26/panel/policy-making-for-india-s-evolving-energy-transition-landscape/2024',
  },
  {
    type: 'presentation', ym: '2025-11',
    title: 'Opportunities for Automation in Siting Energy Infrastructure in India',
    venue: 'India Land and Development Conference', date: '18–20 November 2025',
    authors: 'Ganesh Hegde',
    link: 'https://www.ildc.co.in/session-details/111',
  },
  {
    type: 'presentation', ym: '2025-11',
    title: 'Siting RE in India: A Bird’s Eye View (Conference Panel and Presentation)',
    venue: 'India Land and Development Conference', date: '18–20 November 2025',
    authors: 'Ganesh Hegde, Somya Srivastava, Sukanya Khar, Kaveri Iychettira',
    link: 'https://www.ildc.co.in/session-details/226',
  },
  {
    type: 'presentation', ym: '2025-11',
    title: 'Panel discussion - How do we navigate competing developmental and energy transition priorities for land use in India?',
    venue: 'India Land and Development Conference', date: '18–20 November 2025',
    authors: 'Sukanya Khar, Kaveri Iychettira, Ganesh Hegde',
    link: 'https://www.ildc.co.in/session-details/226',
  },
  {
    type: 'presentation', ym: '2025-10',
    title: 'Scaling Green Hydrogen in India: Policy Levers for Cost Reduction and Technology Adoption',
    venue: 'World Hydrogen Technologies Convention', date: 'October 2025',
    authors: 'Akhil Chauhan, Kaveri Iychettira',
  },
  {
    type: 'presentation', ym: '2025-07',
    title: 'Can India balance development and climate action? Assessing our state of knowledge [Paper presentation].',
    venue: 'International Conference on Public Policy', date: '1–4 July 2025',
    authors: 'Medhavi Sandhani, Kaveri Iychettira',
  },
  {
    type: 'presentation', ym: '2025-07',
    title: 'Justice in the Making: Procedural and Recognition Justice in Siting Large-Scale Solar Parks in India',
    venue: 'International Conference on Public Policy', date: '1–4 July 2025',
    authors: 'Sukanya Khar, Kaveri Iychettira',
    link: 'https://www.ippapublicpolicy.org/conference/icpp7-chiang-mai-2025/21',
  },
  {
    type: 'dataset', ym: '2026-01',
    title: 'Dataset related to population and appliance projection for residential end-use at State-Urban/Rural-economic based quintile granularity',
    venue: 'Dataset',
    authors: 'Susan Das',
    note: 'Demographic and appliance-ownership projections across residential appliance categories and efficiency levels, combining households and appliance data from the Census 2011, NSSO HCES 2022–23 and CEEW IRES 2020 into one consistent dataset.',
  },
];
