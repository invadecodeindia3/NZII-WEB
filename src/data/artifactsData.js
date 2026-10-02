export const ALL_ARTIFACTS = [
  {
    id: 'vindhyachal-retrofit',
    type: 'case-study',
    category: 'Power & Grid',
    sector: 'Thermal Power Retrofit',
    title: '4.7 GW Super Thermal Solar-Biomass Hybrid Co-Firing Retrofit',
    location: 'Singrauli, Madhya Pradesh',
    partner: 'NTPC Limited / Central Electricity Authority',
    date: 'March 2026',
    year: '2025–2026',
    co2eReduced: '3.4 Mt CO2/yr',
    capex: '$420 Million',
    tag: 'GRID TRANSITION',
    author: 'Power Systems Taskforce',
    readTime: '8 min read',
    downloads: '4,120',
    summary: 'Empirical dispatch audit and technical deployment of 10% agricultural biomass pellet co-firing coupled with a 1.2 GW dedicated grid-interconnected solar park and pumped hydro storage to replace coal peak generation.',
    challenge: 'The Vindhyachal Super Thermal Power Station is one of South Asia’s largest coal-fired baseload facilities. Balancing regional peak demand while drastically curtailing coal emissions required a co-firing architecture that could maintain boiler thermodynamic efficiency without degrading turbine blade lifetimes.',
    solution: 'Engineers designed a dual-tier retrofit combining torque-controlled biomass pellet injection with an adjacent 1.2 GW bifacial solar farm and a 6-hour pumped hydro facility. During sunny peak daytime intervals, solar generation feeds the national grid directly while coal boilers ramp down to a 40% technical minimum.',
    results: [
      '3.4 Million metric tons direct annual emissions abated from baseline generation.',
      'Zero grid frequency deviations during diurnal evening peak loads (maintained 49.95–50.02 Hz).',
      'Created 4,200 local agricultural biomass aggregation and pelletization jobs in Madhya Pradesh and UP.',
      'Conserved 2.1 million tons of thermal coal consumption annually.'
    ],
    technicalMetrics: [
      { label: 'Installed Solar Capacity', value: '1,200 MW' },
      { label: 'Biomass Blend Ratio', value: '10% by Weight' },
      { label: 'Thermal Efficiency Delta', value: '-0.3% (Negligible)' },
      { label: 'LCOE of Blended Generation', value: '₹3.42 / kWh' }
    ],
    faqs: [
      {
        q: "What types of agricultural crop residues are used for biomass pellets?",
        a: "The plant utilizes agro-pellets synthesized from paddy straw, mustard stalk, and bagasse sourced within a 150 km radius, preventing seasonal stubble burning."
      },
      {
        q: "How does the pumped hydro unit coordinate with the coal ramp rate?",
        a: "The pumped hydro plant responds in under 45 seconds to cover steep evening solar ramp-downs, allowing the coal boilers to ramp up gradually without thermal stress."
      }
    ]
  },
  {
    id: 'tata-steel-h2',
    type: 'case-study',
    category: 'Heavy Industry',
    sector: 'Primary Steelmaking',
    title: 'Green Hydrogen Direct Reduced Iron (H2-DRI) Pilot at Jamshedpur Works',
    location: 'Jamshedpur, Jharkhand',
    partner: 'Tata Steel / IIT Kharagpur',
    date: 'February 2026',
    year: '2025',
    co2eReduced: '1.8 Mt CO2/yr',
    capex: '$680 Million',
    tag: 'HARD-TO-ABATE',
    author: 'Metallurgical Decarbonization Group',
    readTime: '11 min read',
    downloads: '3,890',
    summary: 'Transitioning a primary blast furnace facility into a 100% green hydrogen shaft, supported by a 120 MW PEM electrolyzer farm and round-the-clock wind-solar hybrid power purchase agreements.',
    challenge: 'Conventional blast furnace-basic oxygen furnace (BF-BOF) steelmaking relies on metallurgical coking coal as both heat source and chemical reducing agent, producing ~2.1 tons of CO2 per ton of liquid crude steel.',
    solution: 'A 120 MW polymer electrolyte membrane (PEM) electrolyzer was deployed alongside a retrofitted shaft furnace. High-purity green hydrogen (99.99%) replaces carbon monoxide as the chemical reducing gas, yielding water vapor instead of carbon dioxide.',
    results: [
      'Crude steel carbon intensity dropped from 2.05 t to 0.42 t CO2/t.',
      'Demonstrated commercial viability at $1.85/kg H2 procurement price.',
      'Supplied zero-carbon automotive-grade steel to Indian commercial OEMs.',
      'Pioneered domestic refractory lining metallurgy withstands 1,100°C hydrogen embrittlement.'
    ],
    technicalMetrics: [
      { label: 'Electrolyzer Scale', value: '120 MW PEM' },
      { label: 'H2 Specific Consumption', value: '54 kg H2 / t DRI' },
      { label: 'Electric Arc Furnace Power', value: '100% Green PPA' },
      { label: 'Steel Carbon Intensity', value: '0.42 t CO2/t' }
    ],
    faqs: [
      {
        q: "What safety protocols manage hydrogen embrittlement in the furnace shaft?",
        a: "The shaft employs specialized austenitic stainless steel alloy piping and continuous acoustic optical leak detection sensors connected to automatic inert nitrogen purge valves."
      },
      {
        q: "Is the steel quality equivalent to conventional blast furnace output?",
        a: "Yes. The resulting Direct Reduced Iron passes all BIS 2062 tensile and fatigue standards for automotive and high-rise structural construction."
      }
    ]
  },
  {
    id: 'wadi-lc3-cement',
    type: 'case-study',
    category: 'Cement & Minerals',
    sector: 'Cement Clinker',
    title: 'Commercial Scale Limestone Calcined Clay Cement (LC3) Formulation',
    location: 'Kalaburagi, Karnataka',
    partner: 'ACC / Ambuja Cement / EPFL',
    date: 'January 2026',
    year: '2025–2026',
    co2eReduced: '960,000 t CO2/yr',
    capex: '$140 Million',
    tag: 'CIRCULAR MATERIALS',
    author: 'Industrial Symbiosis Taskforce',
    readTime: '7 min read',
    downloads: '2,950',
    summary: 'Industrial calcination retrofit replacing 50% of ordinary Portland clinker with local low-grade kaolinitic clays and non-calcined limestone, cutting process heat requirements by 300°C.',
    challenge: 'Cement clinker production accounts for ~7% of global emissions, primarily driven by the endothermic decarbonation of limestone (CaCO3 -> CaO + CO2) inside rotary kilns fired at 1,450°C.',
    solution: 'The plant introduced a dedicated flash calciner for low-grade china clay (calcined at 800°C). Blending 30% calcined clay, 15% raw non-calcined limestone, and 5% gypsum with 50% clinker produced a synergistic aluminosilicate matrix.',
    results: [
      '40% reduction in specific net CO2 emissions per ton of binder.',
      'Exceeded BIS 28-day structural compressive strength standards by 14%.',
      'Conserved 1.2 million tons of high-grade limestone reserves annually.',
      'Cut rotary kiln specific thermal energy consumption from 3,150 to 2,280 MJ/t.'
    ],
    technicalMetrics: [
      { label: 'Clinker Factor', value: '50% (vs 95% in OPC)' },
      { label: 'Calcination Temperature', value: '800°C (vs 1,450°C)' },
      { label: '28-Day Strength', value: '62.4 MPa' },
      { label: 'Chloride Penetration', value: '68% Lower vs OPC' }
    ],
    faqs: [
      {
        q: "Can LC3 be used in coastal and marine concrete structures?",
        a: "LC3 exhibits significantly denser pore structure and lower chloride permeability, making it superior to Ordinary Portland Cement for bridges, ports, and coastal foundations."
      },
      {
        q: "Does LC3 require purchasing new rotary kilns?",
        a: "No. Existing cement grinding mills and preheaters can be retrofitted with a supplementary flash calciner at less than 20% of the cost of a greenfield clinker line."
      }
    ]
  },
  {
    id: 'nh44-electric-freight',
    type: 'case-study',
    category: 'Transport & Freight',
    sector: 'Heavy Commercial Trucking',
    title: '1.2 MW Megawatt Charging System (MCS) Highway Logistics Corridor',
    location: 'Delhi – Agra – Nagpur Trunk (NH44)',
    partner: 'National Highways Authority of India / Ashok Leyland',
    date: 'April 2026',
    year: '2026',
    co2eReduced: '740,000 t CO2/yr',
    capex: '$95 Million',
    tag: 'COMMERCIAL EV',
    author: 'Freight Decarbonization Initiative',
    readTime: '6 min read',
    downloads: '2,480',
    summary: 'Deploying 14 high-throughput solar-plus-storage fast-charging plazas along 1,000 km of national freight highway, enabling continuous 24/7 long-haul battery electric heavy truck convoys.',
    challenge: 'Long-haul freight trucking consumes over 60% of India’s diesel. Heavy 55-ton trucks cannot afford multi-hour charging delays without disrupting inter-city logistics supply chains.',
    solution: '14 high-power charging plazas equipped with 1.2 MW liquid-cooled dispensers and 4 MWh containerized battery storage were built every 75 km along NH44. Peak shaving storage ensures zero demand penalties on state electricity grids.',
    results: [
      '42% lower Total Cost of Ownership (TCO) compared to diesel heavy trucks.',
      '35-minute turnaround time for 55-ton gross weight electric prime movers.',
      'Integrated with Western Dedicated Freight Corridor (DFC) multimodal freight terminals.',
      'Abated 740,000 tons of diesel exhaust particulate and greenhouse gases annually.'
    ],
    technicalMetrics: [
      { label: 'Dispenser Peak Speed', value: '1,200 kW (1.2 MW)' },
      { label: 'Battery Chemistry', value: 'LFP with Liquid Cooling' },
      { label: 'Plaza Solar Canopy', value: '800 kWp per site' },
      { label: 'Turnaround Time', value: '35 mins for 450 km' }
    ],
    faqs: [
      {
        q: "How does the grid handle sudden 1.2 MW charging surges?",
        a: "Each plaza is backed by an on-site 4 MWh battery buffer that charges slowly from the grid and solar canopy, absorbing the peak demand spikes when trucks connect."
      },
      {
        q: "What is the battery warranty and cycle life for these electric prime movers?",
        a: "Batteries are rated for 4,000 full charging cycles at 80% state of health, delivering over 1.2 million kilometers of operational lifespan."
      }
    ]
  },
  {
    id: 'blog-just-transition',
    type: 'article',
    category: 'Macro Finance',
    sector: 'Climate Capital Architecture',
    title: 'Financing India’s $10.1 Trillion Decarbonization: Sovereign Guarantees & Blended Concessional Capital',
    location: 'National Policy Brief',
    partner: 'Pathways Macroeconomic Group',
    date: 'September 2026',
    year: '2026',
    co2eReduced: 'Economy-Wide Scope',
    capex: '$10.1 Trillion Horizon',
    tag: 'MACRO FINANCE',
    author: 'Economic Transitions Working Group',
    readTime: '9 min read',
    downloads: '3,410',
    summary: 'A detailed capital architecture outlining how sovereign green credit guarantees, MDB de-risking tranches, and domestic priority sector lending (PSL) can crowd in $300B annually into non-fossil energy assets.',
    challenge: 'Developing nations face a cost-of-capital penalty: clean infrastructure in emerging markets often carries borrowing costs of 9–14%, compared to 3–5% in Western economies.',
    solution: 'This paper proposes a three-tier blended finance framework: multilateral concessional first-loss guarantees, RBI priority sector quotas for grid-scale energy storage, and EU-India Green Taxonomy harmonization.',
    results: [
      'Lowers weighted average cost of capital (WACC) from 11.2% to 6.8%.',
      'Unlocks $300B in annual cross-border institutional pension fund allocations.',
      'Provides dedicated capital pools for sub-100MW distributed solar and farmer agrivoltaics.',
      'Secures sovereign credit protection for state DISCOM off-takers.'
    ],
    technicalMetrics: [
      { label: 'Annual Capital Target', value: '$300 Billion / yr' },
      { label: 'Target WACC Reduction', value: '-440 Basis Points' },
      { label: 'PSL Allocation Mandate', value: '8% for Storage/EV' },
      { label: 'First-Loss Tranche Ratio', value: '1 : 9 Leverage' }
    ],
    faqs: [
      {
        q: "How does taxonomy harmonization lower borrowing costs?",
        a: "Harmonizing India’s Green Taxonomy with EU standards allows European green bond funds to invest without incurring additional ESG compliance risk discounts."
      },
      {
        q: "What role do multilateral development banks (MDBs) play?",
        a: "MDBs provide foreign exchange hedging buffers and first-loss debt guarantees, absorbing early-stage technical risk on hydrogen and storage assets."
      }
    ]
  },
  {
    id: 'blog-monsoon-wind',
    type: 'article',
    category: 'Power Systems',
    sector: 'Grid Unit Commitment',
    title: '8,760h Hourly Grid Dispatch Under 500 GW Renewables: Balancing India’s Seasonal Monsoon Slumps',
    location: 'National Synchronous Grid',
    partner: 'Power Systems Working Group',
    date: 'August 2026',
    year: '2026',
    co2eReduced: '480 Mt CO2e Grid Offset',
    capex: 'Grid Modernization',
    tag: 'POWER SYSTEMS',
    author: 'Power Systems Working Group',
    readTime: '12 min read',
    downloads: '2,890',
    summary: 'Unit commitment simulation analyzing extreme weather contingencies, pumped hydro cycling patterns, and cross-state wheeling constraints across the national unified synchronous grid.',
    challenge: 'India experiences intense seasonal renewable swings: massive wind generation surges during the southwest monsoon (June–August) coupled with reduced solar output, followed by sharp winter morning peaks.',
    solution: 'We formulated a PyPSA-based mathematical solver modeling all 8,760 hours of annual dispatch across 5 regional grids, incorporating 63 GW pumped hydro, 160 GWh batteries, and dynamic line ratings.',
    results: [
      'Maintains synchronous grid frequency strictly between 49.90 Hz and 50.05 Hz.',
      'Restricts national renewable curtailment to under 1.8% of gross generation.',
      'Identifies 14 key inter-state transmission bottlenecks on the Western-Northern corridor.',
      'Optimizes daily 6-hour pumped hydro water pumping schedules to soak up midday solar peaks.'
    ],
    technicalMetrics: [
      { label: 'Simulated Intervals', value: '8,760 Hours' },
      { label: 'Modeled Storage Asset', value: '63 GW PSP + BESS' },
      { label: 'Maximum Grid Curtailment', value: '1.8%' },
      { label: 'Peak Demand Handled', value: '384 GW (2030)' }
    ],
    faqs: [
      {
        q: "How are thermal coal power plants operated during peak solar hours?",
        a: "Thermal units are flexed down to a 40% technical minimum, utilizing advanced boiler burner modifications and synchronous condenser modes for grid inertia."
      },
      {
        q: "Are extreme weather events like prolonged overcast monsoons modeled?",
        a: "Yes. The solver incorporates a 10-year historical weather dataset, stress-testing the grid against 7 consecutive days of low wind and high cloud cover."
      }
    ]
  },
  {
    id: 'blog-sebi-brsr',
    type: 'article',
    category: 'Regulatory Standards',
    sector: 'Statutory ESG Assurance',
    title: 'SEBI BRSR Core Statutory Assurance: Moving from Voluntary ESG Marketing to Audited Provenance',
    location: 'Capital Markets Desk',
    partner: 'Regulatory Standards Lab',
    date: 'July 2026',
    year: '2026',
    co2eReduced: '1,000 Listed Entities',
    capex: 'Statutory Standard',
    tag: 'REGULATORY ESG',
    author: 'Regulatory Standards Lab',
    readTime: '7 min read',
    downloads: '1,950',
    summary: 'How real-time telemetry, automated smart-meter ledger parsing, and standardized CEA emission factors protect institutional investors from greenwashing penalties.',
    challenge: 'Voluntary corporate sustainability reports frequently suffer from unverified carbon accounting, arbitrary Scope 2 emission factors, and omitted supply-chain Scope 3 emissions.',
    solution: 'Our automated assurance architecture pulls raw smart-meter telemetry directly from utility ERPs, binding each consumption entry to a cryptographic timestamp and state-specific CEA emission factor.',
    results: [
      'Generates 100% audit-ready ISO 14064 dossiers for SEBI BRSR Core compliance.',
      'Eliminates manual reporting overhead by 85% for top 1,000 listed Indian corporations.',
      'Provides verifiable supply-chain Scope 3 carbon tracing for micro and small vendor tiers.',
      'Automates reconciliation against the national Carbon Credit Trading Scheme (CCTS).'
    ],
    technicalMetrics: [
      { label: 'Entities in Scope', value: 'Top 1,000 Listed' },
      { label: 'Audit Standard', value: 'SEBI BRSR Core / ISO 14064' },
      { label: 'Verification Latency', value: '< 24 Hours' },
      { label: 'Scope 1-3 Coverage', value: '100% Telemetry Linked' }
    ],
    faqs: [
      {
        q: "What distinguishes SEBI BRSR Core from global GRI standards?",
        a: "BRSR Core mandates reasonable third-party assurance on 9 key ESG attributes, focusing on quantitative metrics like specific water consumption and job creation."
      },
      {
        q: "Can small suppliers in the value chain use this without expensive enterprise software?",
        a: "Yes. A lightweight open-source API and web utility is provided for MSME vendors to submit verified utility invoices and fuel logs."
      }
    ]
  }
];
