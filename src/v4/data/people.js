// People, partners and open calls shown on the V4 'Who we are' and 'Collaborate with us' pages.
// Source: NZII Version 2 prototype (nzii-version2.lovable.app). Update names, roles and links here only.

const gs = (user) => `https://scholar.google.com/citations?user=${user}&hl=en`;
const li = (handle) => `https://www.linkedin.com/in/${handle}`;

export const personId = (name) =>
  'person-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const PIS = [
  { name: 'Ambuj Sagar', photo: '/assets/people/pi-ambuj-sagar.jpg', scholar: gs('k8Lrh_4AAAAJ'), linkedin: li('ambuj-sagar-1983379/') },
  { name: 'Kaveri Iychettira', photo: '/assets/people/pi-kaveri-iychettira.jpg', scholar: gs('0yQF0u8AAAAJ'), linkedin: li('kiychettira/') },
  { name: 'Rajarshi Dasgupta', photo: '/assets/people/pi-rajarshi-dasgupta.jpg', scholar: gs('KfcluxcAAAAJ'), linkedin: li('drrajarshidasgupta/') },
];

export const RESEARCHERS = [
  // The two PIs who also lead research are listed here as well; their hero dot points at the PI card.
  { name: 'Kaveri Iychettira', initials: 'KI', role: 'Lead', lead: true, alsoPi: true, scholar: gs('0yQF0u8AAAAJ'), linkedin: li('kiychettira/') },
  { name: 'Rajarshi Dasgupta', initials: 'RD', role: 'Lead', lead: true, alsoPi: true, scholar: gs('KfcluxcAAAAJ'), linkedin: li('drrajarshidasgupta/') },
  { name: 'Tarun Khanna', initials: 'TK', role: 'Lead', lead: true, linkedin: li('tarun-khanna/') },
  { name: 'Srishti Gwal', initials: 'SG', role: 'Postdoctoral Fellow', scholar: gs('uodwEL4AAAAJ') },
  { name: 'Aditya Sharma', initials: 'AS', role: 'Postdoctoral Fellow', scholar: gs('I8oSB0AAAAJ') },
  { name: 'Subhadip Bhattacharya', initials: 'SB', role: 'Postdoctoral Fellow', scholar: gs('jvTl6zIAAAAJ'), linkedin: li('subhadip-bhattacharya-2b98281b') },
  { name: 'Shashank Prabhakar', initials: 'SP', role: 'Postdoctoral Fellow', scholar: gs('mX0zyNMAAAAJ') },
  { name: 'Senjuty Bhowmik', initials: 'SB', role: 'Postdoctoral Fellow' },
  { name: 'Somya Srivastava', initials: 'SS', role: 'Research Associate' },
  { name: 'Anshul Angira', initials: 'AA', role: 'Research Associate' },
  { name: 'Satyam Prakash', initials: 'SP', role: 'Research Associate', linkedin: li('satyam-prakash04/') },
  { name: 'Mallika Bhuyan', initials: 'MB', role: 'Research Associate', scholar: gs('5CkvpKkAAAAJ') },
  { name: 'AN Rohith', initials: 'AR', role: 'Researcher', scholar: gs('qKYOv2oAAAAJ') },
];

export const ADMIN = [
  { name: 'Ashwini Mudgal', initials: 'AM', role: 'Project Manager', linkedin: li('ashwini-mudgal-9443774/') },
  { name: 'Ekta Baranwal', initials: 'EB', role: 'Postdoctoral Fellow & Coordinator', linkedin: li('dr-ekta-baranwal-10963732/') },
  { name: 'Varsha Seharawat', initials: 'VS', role: 'Senior Project Assistant' },
  { name: 'Manash Pratim Deka', initials: 'MD', role: 'Project Assistant' },
  { name: 'Manoj Singh Negi', initials: 'MN', role: 'Communications Expert', linkedin: li('negimanoj/') },
];

export const PAST = [
  { name: 'Akhil Chauhan', initials: 'AC', role: 'Research Associate', scholar: gs('MF0VIhEAAAAJ') },
  { name: 'Anuj Gurjar', initials: 'AG', role: 'Research Associate' },
  { name: 'Divyangi Mishra', initials: 'DM', role: 'Research Associate' },
  { name: 'Aishwarya Bhave', initials: 'AB', role: 'Research Associate' },
  { name: 'Manpreet Singh', initials: 'MS', role: 'Research Associate' },
  { name: 'Susan Das', initials: 'SD', role: 'Research Associate' },
  { name: 'Yeshu Vashishtha', initials: 'YV', role: 'Research Associate' },
  { name: 'Ganesh Hegde', initials: 'GH', role: 'Princeton University', scholar: gs('tg57FhcAAAAJ') },
  { name: 'Malini Nambiar', initials: 'MN', role: 'Princeton University', scholar: gs('cbwiuSAAAAAJ') },
  { name: 'Niranjan S', initials: 'NS', role: 'Intern' },
];

export const CORE_PARTNERS = [
  {
    key: 'prayas',
    name: 'Prayas (Energy Group)',
    logo: '/assets/logos/prayas-energy-group.png',
    desc: 'Partner in research. Developer of the PIER demand-side energy model; provided the foundational model and data framework to further build and expand NZII’s energy demand model.',
    team: [
      { name: 'Ashok Sreenivas', initials: 'AS', role: 'Lead', lead: true },
      { name: 'Srihari Dukkipati', initials: 'SD', role: 'Lead', lead: true, scholar: gs('MCoCRpkAAAAJ') },
      { name: 'Narendra Pai', initials: 'NP' },
      { name: 'Aniruddha Ketkar', initials: 'AK' },
      { name: 'Varun Nair', initials: 'VN' },
    ],
  },
  {
    key: 'princeton',
    name: 'Princeton University / Andlinger Center for Energy and the Environment',
    shortName: 'Princeton University',
    logo: '/assets/logos/princeton-university.png',
    desc: 'Provided seed funding. Brings international experience in net-zero studies across countries such as the US, Australia, Brazil and China. Partner in research, particularly in developing the supply-side energy model using Princeton’s MACRO platform.',
    team: [
      { name: 'Chris Greig', initials: 'CG', role: 'Lead', lead: true, scholar: gs('AxDVkNMAAAAJ') },
      { name: 'Andrew Pascale', initials: 'AP', scholar: gs('LfEPhqYAAAAJ') },
      { name: 'Luca Bonaldo', initials: 'LB', scholar: gs('-mUhRVkAAAAJ') },
    ],
  },
];

// `news` lists the NZII news and events a collaborator took part in; a collaborator with news gets a pop-up.
export const COLLABORATORS = [
  {
    key: 'anurag-gumber', name: 'Anurag Gumber', role: 'Assistant Professor, HKUST (Guangzhou)',
    photo: '/assets/people/collab-anurag-gumber.jpg', scholar: gs('3Ys1yoAAAAAJ'), linkedin: li('anurag-gumber/'),
    news: [{ id: '2026-01-anurag-gumber', title: 'Anurag Gumber on how much capital India’s net-zero transition could need', meta: 'January 2026 · IIT Delhi', date: '2026-01' }],
  },
  {
    key: 'sarath-guttikunda', name: 'Sarath Guttikunda', role: 'Founder, UrbanEmissions.info',
    photo: '/assets/people/collab-sarath-guttikunda.jpg', scholar: gs('XyEvdnMAAAAJ'), linkedin: li('sarath-guttikunda-3a01149/'), news: [],
  },
  {
    key: 'narasimha-rao', name: 'Narasimha Rao', role: 'Professor of Energy Systems, Yale School of the Environment',
    photo: '/assets/people/collab-narasimha-rao.jpg', scholar: gs('cwli_mwAAAAJ'), linkedin: li('narasimhadrao/'),
    news: [{ id: '2025-11-narasimha-rao', title: 'Narasimha Rao on judging the energy transition by people’s living standards', meta: 'November 2025 · IIT Delhi', date: '2025-11' }],
  },
  {
    key: 'sara-constantino', name: 'Sara Constantino', role: 'Assistant Professor, Stanford University',
    photo: '/assets/people/collab-sara-constantino.jpg', scholar: gs('3ShGgmcAAAAJ'), news: [],
  },
  {
    key: 'pranab-choudhury', name: 'Pranab Choudhury', role: 'Co-founder & CEO, Landstack',
    photo: '/assets/people/collab-pranab-choudhury.jpg', scholar: gs('SPz4QrwAAAAJ'), linkedin: li('prchoudhury/'), news: [],
  },
  {
    key: 'shalini-dhyani', name: 'Shalini Dhyani', role: 'Principal Scientist, CSIR-NEERI',
    photo: '/assets/people/collab-shalini-dhyani.jpg', scholar: gs('alsuByQAAAAJ'), linkedin: li('shalini-d-84b81332/'), news: [],
  },
  {
    key: 'ps-roy', name: 'PS Roy', role: 'Former Director, NRSC Hyderabad',
    photo: '/assets/people/collab-ps-roy.jpg', scholar: gs('DyxITKYAAAAJ'), linkedin: li('parth-sarathi-roy-74831761/'), news: [],
  },
];

// One dot per current team member in the 'Who we are' hero, in team order (past researchers left out).
export const HERO_PEOPLE = [
  ...['Kaveri Iychettira', 'Ambuj Sagar', 'Rajarshi Dasgupta'].map((name) => ({ g: 'pi', lead: true, name, role: 'Principal Investigator' })),
  ...RESEARCHERS.filter((p) => !p.alsoPi).map((p) => ({ g: 'res', lead: !!p.lead, name: p.name, role: p.role })),
  ...ADMIN.map((p) => ({ g: 'adm', lead: false, name: p.name, role: p.role })),
  ...CORE_PARTNERS.flatMap((org) =>
    org.team.map((p) => ({ g: 'org', lead: !!p.lead, name: p.name, role: (p.role ? p.role + ', ' : '') + (org.shortName || org.name) })),
  ),
].map((p) => ({ ...p, id: personId(p.name) }));

// The Open Calls microsite: the prototype's own page, served as it stands from public/open-calls/index.html
// (opens in a new tab, as in the prototype). Its addresses: #all-calls, #call-<id>, #how-it-works, #faqs, #apply.
export const OPEN_CALLS_SITE = '/open-calls/index.html';

// Set `deadline` to 'YYYY-MM-DD' once confirmed; the status and countdown then update themselves.
export const OPEN_CALLS = {
  round: 'Round 2',
  deadline: null,
  honorarium: null,
  calls: [
    { id: 'employment', no: 1, theme: 'Employment', title: 'Modelling employment shifts in India’s energy transition', stay: '3 to 6 months' },
    { id: 'biodiversity', no: 2, theme: 'Biodiversity', title: 'Modelling multitaxa habitat suitability and optimising spatial buffers for long-term biodiversity persistence', stay: 'Up to 6 months' },
    { id: 'capital', no: 3, theme: 'Capital mobilisation', title: 'Modelling capital mobilisation for India’s energy transition', stay: '3 to 6 months' },
    { id: 'agent-based', no: 4, theme: 'Agent-based modelling', title: 'Agent-based modelling of India’s energy transition', stay: '3 to 6 months' },
  ],
};
