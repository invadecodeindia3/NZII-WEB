import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeafletFacilityMap } from './LeafletFacilityMap';
import { 
  Radio, 
  Database, 
  MapPin, 
  TrendingDown, 
  Flame, 
  Factory, 
  Zap, 
  ArrowUpRight, 
  ShieldCheck,
  Search,
  Activity,
  ChevronRight,
  Crosshair,
  SlidersHorizontal,
  Compass,
  Layers,
  Globe2,
  Calendar,
  Filter,
  Eye,
  Maximize2,
  ExternalLink,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from './RevealOnScroll';

// Seven hand-entered illustrative records — not independently verified or ingested via an API
const CLIMATE_TRACE_ASSETS = [
  {
    id: 'vindhyachal-stps',
    name: 'Vindhyachal Super Thermal Power Station',
    state: 'Madhya Pradesh',
    district: 'Singrauli',
    sector: 'Power',
    subsector: 'Coal Generation',
    co2e2025: '34.8 Mt',
    co2e2024: '35.9 Mt',
    co2e2023: '36.8 Mt',
    gas: 'CO2e',
    trend: '-3.1% YoY',
    capacity: '4,760 MW',
    decarbPathway: '10% Biomass Pellets + 1.2GW Solar Park Interconnection',
    status: 'UNVERIFIED SAMPLE',
    statusBadge: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    gridRegion: 'Western Region (WR)',
    coordinates: '24.10° N, 82.67° E',
    lat: 24.10,
    lng: 82.67,
    mapX: 52, // % coordinate for India SVG map layout
    mapY: 42,
    intensity: '942 g CO2/kWh',
    ownership: 'NTPC Limited',
    primaryFuel: 'Sub-bituminous Coal',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'mundra-umpp',
    name: 'Mundra Ultra Mega Power Plant',
    state: 'Gujarat',
    district: 'Kutch',
    sector: 'Power',
    subsector: 'Supercritical Coal',
    co2e2025: '26.2 Mt',
    co2e2024: '27.4 Mt',
    co2e2023: '28.1 Mt',
    gas: 'CO2e',
    trend: '-4.4% YoY',
    capacity: '4,000 MW',
    decarbPathway: 'Offshore Wind + BESS Hybrid Dispatch Integration',
    status: 'UNVERIFIED SAMPLE',
    statusBadge: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    gridRegion: 'Western Region (WR)',
    coordinates: '22.82° N, 69.53° E',
    lat: 22.82,
    lng: 69.53,
    mapX: 25,
    mapY: 48,
    intensity: '880 g CO2/kWh',
    ownership: 'Tata Power / Adani Power',
    primaryFuel: 'Imported Bituminous Coal',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'jamshedpur-steel',
    name: 'Tata Steel Jamshedpur Works',
    state: 'Jharkhand',
    district: 'East Singhbhum',
    sector: 'Manufacturing',
    subsector: 'Primary Steelmaking',
    co2e2025: '18.4 Mt',
    co2e2024: '18.8 Mt',
    co2e2023: '19.2 Mt',
    gas: 'CO2e',
    trend: '-2.1% YoY',
    capacity: '11.0 MTPA Steel',
    decarbPathway: '100% Green Hydrogen DRI Shaft Conversion',
    status: 'HARD-TO-ABATE',
    statusBadge: 'text-coral bg-coral/10 border-coral/30',
    gridRegion: 'Eastern Region (ER)',
    coordinates: '22.80° N, 86.20° E',
    lat: 22.80,
    lng: 86.20,
    mapX: 68,
    mapY: 48,
    intensity: '1.98 t CO2/t steel',
    ownership: 'Tata Steel Limited',
    primaryFuel: 'Metallurgical Coking Coal',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'talcher-thermal',
    name: 'Talcher Super Thermal Power Station',
    state: 'Odisha',
    district: 'Angul',
    sector: 'Power',
    subsector: 'Coal Generation',
    co2e2025: '21.5 Mt',
    co2e2024: '22.0 Mt',
    co2e2023: '22.8 Mt',
    gas: 'CO2e',
    trend: '-2.3% YoY',
    capacity: '3,000 MW',
    decarbPathway: 'Supercritical Fleet Retrofit + Captive Solar',
    status: 'UNVERIFIED SAMPLE',
    statusBadge: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    gridRegion: 'Eastern Region (ER)',
    coordinates: '20.95° N, 85.22° E',
    lat: 20.95,
    lng: 85.22,
    mapX: 65,
    mapY: 56,
    intensity: '960 g CO2/kWh',
    ownership: 'NTPC Limited',
    primaryFuel: 'Domestic Thermal Coal',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'wadi-clinker',
    name: 'Wadi Limestone & Clinker Works',
    state: 'Karnataka',
    district: 'Kalaburagi',
    sector: 'Mineral Extraction',
    subsector: 'Cement Clinker',
    co2e2025: '9.6 Mt',
    co2e2024: '10.1 Mt',
    co2e2023: '10.5 Mt',
    gas: 'CO2e',
    trend: '-5.0% YoY',
    capacity: '6.5 MTPA Cement',
    decarbPathway: 'CURA Electrochemical Calcination + LC3 Blend',
    status: 'PILOT ACTIVE',
    statusBadge: 'text-teal bg-teal/10 border-teal/30',
    gridRegion: 'Southern Region (SR)',
    coordinates: '17.05° N, 76.99° E',
    lat: 17.05,
    lng: 76.99,
    mapX: 42,
    mapY: 67,
    intensity: '560 kg CO2/t clinker',
    ownership: 'ACC / Ambuja Cement',
    primaryFuel: 'Petcoke & Alternative Fuels',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'nh44-freight',
    name: 'NH44 North-South Freight Corridor',
    state: 'Interstate',
    district: 'Multi-State Trunk',
    sector: 'Transportation',
    subsector: 'Heavy Road Freight',
    co2e2025: '14.2 Mt',
    co2e2024: '14.0 Mt',
    co2e2023: '13.8 Mt',
    gas: 'CO2e',
    trend: '+1.4% YoY',
    capacity: '3,800 km Highway',
    decarbPathway: '1.2 MW MCS Megawatt Highway EV Fast-Chargers',
    status: 'CORRIDOR TRACK',
    statusBadge: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
    gridRegion: 'National Logistics',
    coordinates: 'Delhi – Bengaluru – Kanyakumari',
    lat: 20.59,
    lng: 78.96,
    mapX: 46,
    mapY: 55,
    intensity: '112 g CO2/t-km',
    ownership: 'National Highways Authority (NHAI)',
    primaryFuel: 'Heavy Diesel',
    confidenceScore: 'Not independently verified'
  },
  {
    id: 'punjab-stubble-biomass',
    name: 'Upper Indus Paddy Agriculture Cluster',
    state: 'Punjab',
    district: 'Sangrur & Ludhiana',
    sector: 'Agriculture',
    subsector: 'Biogenic Stubble & Soil',
    co2e2025: '11.8 Mt',
    co2e2024: '13.2 Mt',
    co2e2023: '14.9 Mt',
    gas: 'CH4 & N2O (CO2e)',
    trend: '-10.6% YoY',
    capacity: '2.8 Million Hectares',
    decarbPathway: 'Ex-situ Bio-CNG CBG Plants + Soil Biochar Pyrolysis',
    status: 'RAPID ABATEMENT',
    statusBadge: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    gridRegion: 'Northern Region (NR)',
    coordinates: '30.90° N, 75.85° E',
    lat: 30.90,
    lng: 75.85,
    mapX: 37,
    mapY: 22,
    intensity: '4.2 t CO2e/ha',
    ownership: 'Cooperative Farmers & SATAT Plants',
    primaryFuel: 'Agricultural Residue',
    confidenceScore: 'Not independently verified'
  }
];

const SECTORS_LIST = ['All Sectors', 'Power', 'Manufacturing', 'Mineral Extraction', 'Transportation', 'Agriculture'];
const GASES_LIST = ['CO2e (sample values only)'];
const YEARS_LIST = ['2025', '2024', '2023'];

export const SpatialEmissionsTerminal = () => {
  const { theme, playSound } = useGame();
  const isLight = theme === 'light';
  
  // Climate TRACE Parameter Controls
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedGas, setSelectedGas] = useState(GASES_LIST[0]);
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState('vindhyachal-stps');
  const [mapMode, setMapMode] = useState('pin'); // 'pin' | 'heatmap'

  const selectedAsset = CLIMATE_TRACE_ASSETS.find(a => a.id === selectedAssetId) || CLIMATE_TRACE_ASSETS[0];

  const filteredAssets = CLIMATE_TRACE_ASSETS.filter(item => {
    const matchSector = selectedSector === 'All Sectors' || item.sector.toLowerCase() === selectedSector.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.subsector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSector && matchSearch;
  });

  // Calculate total emissions of visible assets
  const totalFilteredEmissions = filteredAssets.reduce((acc, curr) => {
    const val = parseFloat(curr[`co2e${selectedYear}`]);
    return acc + (isNaN(val) ? 0 : val);
  }, 0).toFixed(1);

  return (
    <section 
      className={`w-full py-20 md:py-28 px-[3vw] transition-colors duration-500 relative overflow-hidden border-b ${
        isLight ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#0A0C10] border-[#1A2230]'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto space-y-8">
        
        {/* Harmonized Center-Aligned Section Header */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/10 border border-teal/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-teal uppercase">
                Leaflet / Independent Facility Explorer
              </span>
            </div>
            
            <h2 className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              Independent High-Resolution Asset Radar
            </h2>

            <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
              isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'
            }`}>
              Demonstration explorer displaying seven illustrative facility profiles. No live national inventory is connected; values and attributes must be verified against independent sources.
            </p>
          </div>
        </RevealOnScroll>

        {/* ── CLIMATE TRACE PARAMETER CONTROL STRIP (Admin, Gas, Year, Timeframe, Sector) ── */}
        <RevealOnScroll direction="up" delay={100}>
          <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-sm ${
            isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#121620] border-[#1E2738]'
          }`}>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Year Selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 text-teal" />
                <span className={isLight ? 'text-[#64748B]' : 'text-white/60'}>Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => { setSelectedYear(e.target.value); playSound(440); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold outline-none cursor-pointer border ${
                    isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#18202E] border-[#2B384E] text-white'
                  }`}
                >
                  {YEARS_LIST.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Gas Selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-coral" />
                <span className={isLight ? 'text-[#64748B]' : 'text-white/60'}>Gas:</span>
                <select
                  value={selectedGas}
                  onChange={(e) => { setSelectedGas(e.target.value); playSound(440); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold outline-none cursor-pointer border ${
                    isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#18202E] border-[#2B384E] text-white'
                  }`}
                >
                  {GASES_LIST.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Sector Selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Filter className="w-3.5 h-3.5 text-teal" />
                <span className={isLight ? 'text-[#64748B]' : 'text-white/60'}>Sector:</span>
                <select
                  value={selectedSector}
                  onChange={(e) => { setSelectedSector(e.target.value); playSound(440); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold outline-none cursor-pointer border ${
                    isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#18202E] border-[#2B384E] text-white'
                  }`}
                >
                  {SECTORS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

            </div>

            {/* Quick Live Telemetry Counter */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 ${
                isLight ? 'bg-teal-50 border-teal-200 text-teal-950' : 'bg-[#182232] border-teal/30 text-teal-light'
              }`}>
                <Activity className="w-3.5 h-3.5 text-teal animate-pulse" />
                <span>Sample Total: <strong>{totalFilteredEmissions} Mt {selectedGas.split(' ')[0]}</strong></span>
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* ── 3-COLUMN INTERACTIVE SPATIAL EXPLORER (MAP + ASSET LIST + INSPECTOR) ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── COL 1 (4 cols): Interactive Spatial Map / Radar Vector Canvas ── */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <RevealOnScroll direction="up" delay={120} className="h-full">
              <div className={`h-full p-5 rounded-xl border flex flex-col justify-between relative overflow-hidden ${
                isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] shadow-sm' : 'bg-[#10141C] border-[#1E2634]'
              }`}>
                
                {/* Map Header */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 z-10">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal animate-spin-slow" />
                    <span className="text-xs font-mono font-bold uppercase text-teal">
                      Interactive Leaflet Map
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isLight ? 'bg-white border border-[#CBD5E1] text-[#334155]' : 'bg-white/10 text-white/70'
                  }`}>
                    Illustrative Locations
                  </span>
                </div>

                {/* Actual interactive Leaflet map, not a schematic SVG.
                    All markers remain clearly labelled as illustrative until source verification. */}
                <LeafletFacilityMap
                  assets={filteredAssets}
                  selectedAssetId={selectedAssetId}
                  onSelect={setSelectedAssetId}
                  isLight={isLight}
                />

                                {/* Footer Link */}
                <div className={`pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono ${
                  isLight ? 'text-[#64748B]' : 'text-white/50'
                }`}>
                  <span>Illustrative data, not live or independently verified</span>
                  <a 
                    href="https://climatetrace.org/explore" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-teal font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Climate TRACE public data</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </RevealOnScroll>
          </div>

          {/* ── COL 2 (4 cols): Filtered Point-Source Asset Feed ── */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <RevealOnScroll direction="up" delay={160} className="h-full">
              <div className={`h-full p-5 rounded-xl border flex flex-col justify-between ${
                isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] shadow-sm' : 'bg-[#10141C] border-[#1E2634]'
              }`}>
                <div>
                  
                  {/* Search Bar */}
                  <div className="relative mb-3">
                    <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                      isLight ? 'text-[#94A3B8]' : 'text-white/40'
                    }`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search asset, district, sector..."
                      className={`w-full pl-8 pr-3 py-2 rounded-lg text-xs font-manrope outline-none transition-all border ${
                        isLight 
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A] focus:border-teal' 
                          : 'bg-[#181F2C] border-[#2A3446] text-white focus:border-teal'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="font-bold text-teal">Assets In Scope</span>
                    <span className={isLight ? 'text-[#64748B]' : 'text-white/50'}>
                      {filteredAssets.length} Sample Records
                    </span>
                  </div>

                  {/* Asset Scroll List */}
                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {filteredAssets.map(asset => {
                      const isSelected = asset.id === selectedAssetId;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => {
                            setSelectedAssetId(asset.id);
                            playSound(480);
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? isLight
                                ? 'bg-white border-teal shadow-md ring-2 ring-teal/20'
                                : 'bg-[#18202D] border-teal shadow-md'
                              : isLight
                                ? 'bg-white border-[#E2E8F0] hover:border-teal/50'
                                : 'bg-[#141822] border-[#222A38] hover:border-teal/30'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className={`font-manrope font-bold text-xs ${
                                isSelected ? 'text-teal' : isLight ? 'text-[#0F172A]' : 'text-white'
                              }`}>
                                {asset.name}
                              </span>
                            </div>
                            <div className={`flex items-center gap-1.5 text-[10px] font-mono ${
                              isLight ? 'text-[#64748B]' : 'text-white/50'
                            }`}>
                              <MapPin className="w-3 h-3 text-teal" />
                              <span>{asset.district}, {asset.state}</span>
                              <span>•</span>
                              <span>{asset.subsector}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-2">
                            <span className="font-mono font-bold text-xs text-coral block">
                              {asset.co2e2025}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                              {asset.trend}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono ${
                  isLight ? 'text-[#64748B]' : 'text-white/50'
                }`}>
                  <span>Confidence: 98%+</span>
                  <span className="text-teal font-bold">Year {selectedYear} Active</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── COL 3 (4 cols): Deep Point-Source Telemetry & Decarbonization Lever ── */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <RevealOnScroll direction="up" delay={200} className="h-full">
              <div className={`h-full p-6 rounded-xl border flex flex-col justify-between ${
                isLight 
                  ? 'bg-white border-[#E2E8F0] shadow-md' 
                  : 'bg-gradient-to-br from-[#121822] via-[#0E131C] to-[#0A0D14] border-[#222D3E] shadow-xl'
              }`}>
                <div>
                  
                  {/* Top Inspector Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Crosshair className="w-4 h-4 text-teal animate-spin-slow" />
                      <span className="text-xs font-mono font-bold uppercase text-teal">
                        TRACE Asset Dossier
                      </span>
                    </div>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${selectedAsset.statusBadge}`}>
                      {selectedAsset.status}
                    </span>
                  </div>

                  {/* Asset Title & Ownership */}
                  <h4 className={`font-manrope font-extrabold text-base sm:text-lg mb-0.5 ${
                    isLight ? 'text-[#0F172A]' : 'text-white'
                  }`}>
                    {selectedAsset.name}
                  </h4>
                  <div className={`text-xs font-mono mb-4 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>
                    <span>Operator: {selectedAsset.ownership}</span> • <span className="text-teal font-bold">{selectedAsset.capacity}</span>
                  </div>

                  {/* 3-Year Historical Emission Trend Bar */}
                  <div className={`p-3 rounded-xl border mb-4 ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#151C28] border-[#253246]'
                  }`}>
                    <span className={`text-[10px] font-mono uppercase block mb-2 ${
                      isLight ? 'text-[#64748B]' : 'text-white/50'
                    }`}>
                      Emissions Trajectory (2023–2025)
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="p-1.5 rounded bg-black/5 dark:bg-white/5">
                        <span className="text-[10px] block opacity-60">2023</span>
                        <span className="text-xs font-bold">{selectedAsset.co2e2023}</span>
                      </div>
                      <div className="p-1.5 rounded bg-black/5 dark:bg-white/5">
                        <span className="text-[10px] block opacity-60">2024</span>
                        <span className="text-xs font-bold">{selectedAsset.co2e2024}</span>
                      </div>
                      <div className="p-1.5 rounded bg-teal/15 border border-teal/30">
                        <span className="text-[10px] block text-teal font-bold">2025</span>
                        <span className="text-xs font-bold text-coral">{selectedAsset.co2e2025}</span>
                      </div>
                    </div>
                  </div>

                  {/* Granular Telemetry Specs */}
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#161E2A] border-[#222E40]'
                    }`}>
                      <span className={`text-[9px] font-mono uppercase block ${
                        isLight ? 'text-[#64748B]' : 'text-white/50'
                      }`}>Carbon Intensity</span>
                      <span className="text-xs font-mono font-bold text-teal">{selectedAsset.intensity}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${
                      isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#161E2A] border-[#222E40]'
                    }`}>
                      <span className={`text-[9px] font-mono uppercase block ${
                        isLight ? 'text-[#64748B]' : 'text-white/50'
                      }`}>Confidence</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{selectedAsset.confidenceScore}</span>
                    </div>
                  </div>

                  {/* Engineered Decarbonization Solution */}
                  <div className={`p-3 rounded-xl border ${
                    isLight ? 'bg-teal-50/70 border-teal-200' : 'bg-[#121924] border-[#1E2838]'
                  }`}>
                    <span className="text-[10px] font-mono font-bold uppercase text-teal block mb-0.5">
                      Net-Zero Decarbonization Pathway
                    </span>
                    <p className={`font-manrope text-xs font-semibold leading-relaxed ${
                      isLight ? 'text-[#0F172A]' : 'text-[#E2E8F0]'
                    }`}>
                      {selectedAsset.decarbPathway}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10">
                  <Link
                    to="/simulator"
                    onClick={() => playSound(560)}
                    className="w-full py-2.5 rounded-xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>Simulate Facility Decarbonization</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};
