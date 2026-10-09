/**
 * NZII research agenda supplied by the client in October 2026.
 * Themes are editorial taxonomy, not claims of completed research.
 * Add future themes here; hub, detail pages and navigation derive from this registry.
 */
export const RESEARCH_THEMES = [
  {slug:'energy-system', title:'Energy System', short:'Electricity, fuels, networks and the evolution of energy systems.', category:'Systems', icon:'zap',
    description:'Study the structure and transformation of energy systems, including electricity generation, storage, grids, market design and demand-side change.',
    questions:['How can power systems remain reliable as renewable energy grows?','What infrastructure and market designs support affordable clean energy?','Which assumptions most influence energy transition pathways?'],
    methods:['Energy-system scenarios','Grid and demand analysis','Public energy statistics'], links:[{text:'Explore scenario sandbox',path:'/simulator'},{text:'Independent data sources',path:'/data'}]},
  {slug:'land-use-dynamics', title:'Land Use Dynamics', short:'Changing landscapes, agriculture, forests and competing land demands.',category:'Ecology',icon:'layers',
    description:'Examine how agriculture, forests, settlements, infrastructure and climate strategies shape land-use change and spatial trade-offs.',
    questions:['How does land-use change interact with climate and energy infrastructure?','How might landscape transitions affect rural livelihoods?','Which spatial datasets can reveal competing land needs?'],
    methods:['Spatial analysis','Land-cover change assessment','Landscape scenarios'],links:[{text:'Explore data sources',path:'/data'}]},
  {slug:'employment',title:'Employment',short:'Jobs, skills, livelihoods and labour-market transitions.',category:'Society',icon:'users',
    description:'Investigate how economic and environmental transitions affect employment, workforce mobility, skills and regional livelihoods.',
    questions:['Which communities and occupations experience transition risks?','Where could new employment opportunities emerge?','What data are needed to compare employment pathways?'],
    methods:['Employment indicators','Regional comparisons','Transition scenario analysis'],links:[{text:'Open research concepts',path:'/publications'}]},
  {slug:'energy-finance-investment',title:'Energy Finance and Investment',short:'Capital allocation, investment risks and financing pathways.',category:'Economy',icon:'landmark',
    description:'Explore the financing needs, incentives and risks associated with sustainable infrastructure and energy transitions.',
    questions:['What influences the cost of capital for different technologies?','How do policy, tariffs and risk shape investment decisions?','Where are the financing gaps and evidence limitations?'],
    methods:['Financial scenario modelling','Cost-of-capital research','Public investment indicators'],links:[{text:'Explore prototype calculators',path:'/tools'}]},
  {slug:'biodiversity-natural-resources',title:'Biodiversity and Natural Resources',short:'Ecosystems, water, forests and resource stewardship.',category:'Ecology',icon:'leaf',
    description:'Study the relationships between biodiversity, ecosystem integrity and use of natural resources under environmental and economic change.',
    questions:['How can biodiversity evidence inform infrastructure choices?','What trade-offs emerge across water, forests and land?','How should ecological uncertainty be represented?'],
    methods:['Ecosystem indicators','Conservation datasets','Resource-use assessment'],links:[{text:'Browse independent data',path:'/data'}]},
  {slug:'energy-society-justice',title:'Energy, Society and Justice',short:'Access, affordability, fairness and social outcomes.',category:'Society',icon:'scale',
    description:'Understand who benefits from energy transformation, who bears its costs and how equity can inform energy and climate governance.',
    questions:['Who is underserved by existing energy systems?','How are costs and benefits distributed?','Which groups need to be represented in transition planning?'],
    methods:['Distributional analysis','Participatory research design','Social indicators'],links:[{text:'Explore policy context',path:'/policy'}]},
  {slug:'mobility',title:'Mobility',short:'Passenger and freight movement, transport choices and accessibility.',category:'Systems',icon:'route',
    description:'Examine how mobility systems, electrification, land use and freight networks interact with climate, equity and economic development.',
    questions:['What drives changes in mobility demand?','How can infrastructure investment improve accessibility?','Which transport datasets support robust emissions estimates?'],
    methods:['Transport activity analysis','Network scenarios','Mobility and accessibility indicators'],links:[{text:'Explore transport tools',path:'/tools'}]},
  {slug:'methodological-advances-modeling',title:'Methodological Advances in Modeling',short:'Transparent models, uncertainty, reproducibility and new methods.',category:'Methods',icon:'brain-circuit',
    description:'Develop and evaluate approaches to integrated modelling, scenario analysis, reproducibility, sensitivity and uncertainty communication.',
    questions:['Which approaches are appropriate for different research questions?','How should sensitivity and uncertainty be communicated?','How can independent results be reproduced and benchmarked?'],
    methods:['Model intercomparison','Sensitivity analysis','Reproducibility protocols'],links:[{text:'Prototype analytical workbench',path:'/tools'},{text:'Scenario demonstration',path:'/simulator'}]},
  {slug:'open-fair-data',title:'Open FAIR Data',short:'Findable, accessible, interoperable and reusable research data.',category:'Methods',icon:'database',
    description:'Build practices for transparent discovery, documentation, provenance, interoperability and responsible reuse of research data.',
    questions:['What metadata make research datasets discoverable?','How can provenance and licensing be preserved through processing?','What quality gates are needed before publication?'],
    methods:['Data cataloguing','Provenance and metadata standards','Versioned source ingestion'],links:[{text:'Data source register',path:'/data'}]},
];
export const getResearchTheme = slug => RESEARCH_THEMES.find(theme => theme.slug === slug);
