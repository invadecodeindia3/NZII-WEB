import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Flame, 
  Layers, 
  Factory, 
  Zap, 
  Truck, 
  Trees, 
  TrendingDown, 
  Sparkles, 
  Radio, 
  Database,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';

// Top Point-Source & Regional Asset Emitters across India (modeled on Climate TRACE asset registry)
const TOP_EMITTER_ASSETS = [
  {
    id: 'vindhyachal',
    name: 'Vindhyachal Super Thermal Power Station',
    state: 'Madhya Pradesh',
    sector: 'Power Generation',
    subsector: 'Supercritical Sub-Bituminous Coal',
    emissions2025: '34.8 Mt CO2e',
    abatementPathway: 'Biomass Co-firing (10%) + 1.2 GW Solar + SMR Carbon Capture',
    intensity: 'High',
    reductionTarget: '-42% by 2035',
    coordinates: '24.10° N, 82.67° E'
  },
  {
    id: 'jamshedpur-steel',
    name: 'Jamshedpur Primary Steel Works',
    state: 'Jharkhand',
    sector: 'Heavy Industry',
    subsector: 'Integrated Blast Furnace - Basic Oxygen',
    emissions2025: '18.4 Mt CO2e',
    abatementPathway: 'Green Hydrogen DRI Transition + 100% Waste Heat Recovery',
    intensity: 'Hard-to-Abate',
    reductionTarget: '-60% by 2040',
    coordinates: '22.80° N, 86.20° E'
  },
  {
    id: 'mundra-power',
    name: 'Mundra Ultra Mega Thermal Plant',
    state: 'Gujarat',
    sector: 'Power Generation',
    subsector: 'Coastal Imported Bituminous Coal',
    emissions2025: '26.2 Mt CO2e',
    abatementPathway: 'Offshore Wind Hybrid + Synchronous Condenser Phase-in',
    intensity: 'High',
    reductionTarget: '-50% by 2032',
    coordinates: '22.82° N, 69.53° E'
  },
  {
    id: 'wadi-cement',
    name: 'Wadi Limestone & Clinker Complex',
    state: 'Karnataka',
    sector: 'Industrial Minerals',
    subsector: 'Dry Process Rotary Kiln Cement',
    emissions2025: '9.6 Mt CO2e',
    abatementPathway: 'Calcined Clay (LC3) Blending + CURA Electrochemical Lime',
    intensity: 'Process-Heavy',
    reductionTarget: '-48% by 2030',
    coordinates: '17.05° N, 76.99° E'
  },
  {
    id: 'nh44-freight',
    name: 'NH44 North-South Heavy Freight Corridor',
    state: 'Interstate (Delhi–Bengaluru)',
    sector: 'Transport & Logistics',
    subsector: 'Class 8 Heavy Duty Diesel Long-Haul',
    emissions2025: '14.2 Mt CO2e',
    abatementPathway: 'Megawatt Charging Stations + Dedicated Electric Freight Rail',
    intensity: 'Dispersed',
    reductionTarget: '-75% by 2038',
    coordinates: 'Interstate Corridor'
  }
];

const SECTOR_BREAKDOWN = [
  { name: 'Power & Electricity', share: 44.2, emissions: '1,260 Mt', color: '#F59E0B', trend: '-2.8% YoY' },
  { name: 'Heavy Manufacturing & Steel', share: 22.4, emissions: '638 Mt', color: '#E76F51', trend: '+1.4% YoY' },
  { name: 'Agriculture & Livestock', share: 14.8, emissions: '422 Mt', color: '#10B981', trend: '-0.4% YoY' },
  { name: 'Transport & Freight', share: 11.2, emissions: '319 Mt', color: '#0D9488', trend: '+3.1% YoY' },
  { name: 'Buildings & Waste Management', share: 7.4, emissions: '211 Mt', color: '#8B5CF6', trend: '-1.1% YoY' }
];

export const ClimateTraceAssetExplorer = () => {
  const { theme, ecoMode, playSound } = useGame();
  const isLight = theme === 'light';
  const [selectedAsset, setSelectedAsset] = useState(TOP_EMITTER_ASSETS[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredAssets = activeFilter === 'All' 
    ? TOP_EMITTER_ASSETS 
    : TOP_EMITTER_ASSETS.filter(a => a.sector.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className={`w-full py-20 md:py-28 px-[3vw] transition-colors duration-500 relative ${
      isLight ? 'bg-[#F4F6F0]' : 'bg-[#0A0A0D]'
    }`}>
      <div className="w-full max-w-[1720px] mx-auto space-y-12">
        
        {/* Section Header: Climate TRACE Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-teal uppercase">
                Satellite & Point-Source Telemetry (Modeled after Climate TRACE)
              </span>
            </div>
            <h2 className={`font-manrope text-3xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight ${
              isLight ? 'text-[#0F172A]' : 'text-white'
            }`}>
              National Asset-Level Emissions & Decarbonization Radar
            </h2>
            <p className={`text-sm 2xl:text-base mt-2 max-w-2xl ${
              isLight ? 'text-[#475569]' : 'text-[#A1A1AA]'
            }`}>
              Tracking over 1,400 individual industrial facilities, mega thermal power stations, and transport corridors across 28 Indian states.
            </p>
          </div>

          {/* Quick Telemetry Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 font-mono text-xs font-bold border ${
              isLight 
                ? 'bg-white border-[#CBD5E1] text-[#0F172A]' 
                : 'bg-[#141418] border-[#27272D] text-white'
            }`}>
              <Database className="w-4 h-4 text-teal" />
              <span>Audited Total: 2,850 Mt CO2e</span>
            </div>
            <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 font-mono text-xs font-bold border ${
              isLight 
                ? 'bg-teal-50 border-teal-200 text-teal-900' 
                : 'bg-teal/10 border-teal/30 text-teal-light'
            }`}>
              <Radio className="w-4 h-4 text-teal animate-pulse" />
              <span>2025 Satellite Pass: Active</span>
            </div>
          </div>
        </div>

        {/* ── 2-COLUMN INFOGRAPHIC WORKSPACE ── */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Col (5 cols): Sector Breakdown Macro Chart */}
          <div className={`lg:col-span-5 p-7 sm:p-8 rounded-3xl border flex flex-col justify-between ${
            isLight 
              ? 'bg-white border-[#E2E8F0] shadow-sm' 
              : 'bg-[#121216] border-[#222228]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">National Portfolio</span>
                  <h3 className={`font-manrope font-bold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                    Gross Emissions by Sector
                  </h3>
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                  isLight ? 'bg-[#F1F5F9] text-[#475569]' : 'bg-[#1C1C22] text-[#A1A1AA]'
                }`}>
                  100% = 2,850 Mt
                </span>
              </div>

              {/* Stacked Percentage Visual Bar */}
              <div className="w-full h-4 rounded-full overflow-hidden flex mb-6 shadow-inner bg-black/20">
                {SECTOR_BREAKDOWN.map((s) => (
                  <div 
                    key={s.name} 
                    style={{ width: `${s.share}%`, backgroundColor: s.color }}
                    title={`${s.name}: ${s.share}%`}
                    className="h-full hover:opacity-90 transition-opacity"
                  ></div>
                ))}
              </div>

              {/* Granular Breakdown List */}
              <div className="space-y-4">
                {SECTOR_BREAKDOWN.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs sm:text-sm font-manrope">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: s.color }}></span>
                      <span className={`font-semibold ${isLight ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>
                        {s.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <span className={isLight ? 'text-[#64748B]' : 'text-[#A1A1AA]'}>{s.emissions}</span>
                      <span className={`font-bold ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>{s.share}%</span>
                      <span className={`text-[11px] ${s.trend.startsWith('-') ? 'text-emerald-500' : 'text-coral'}`}>
                        {s.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology Micro Note */}
            <div className={`mt-8 pt-5 border-t text-[11px] font-mono leading-relaxed ${
              isLight ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#222228] text-[#71717A]'
            }`}>
              Reconciled against Central Electricity Authority (CEA), MoEFCC GHG Third National Communication, and satellite GHG plume tracking sensors.
            </div>
          </div>

          {/* Right Col (7 cols): Interactive Facility Asset Explorer */}
          <div className={`lg:col-span-7 p-7 sm:p-8 rounded-3xl border flex flex-col justify-between ${
            isLight 
              ? 'bg-white border-[#E2E8F0] shadow-sm' 
              : 'bg-[#121216] border-[#222228]'
          }`}>
            <div>
              {/* Asset Header & Filter Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-teal font-bold block mb-1">Asset Registry</span>
                  <h3 className={`font-manrope font-bold text-xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                    High-Impact Decarbonization Targets
                  </h3>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['All', 'Power', 'Heavy Industry', 'Transport'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveFilter(tab);
                        playSound(420);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                        activeFilter === tab
                          ? 'bg-teal text-white shadow-sm'
                          : isLight 
                            ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]' 
                            : 'bg-[#1C1C22] text-[#A1A1AA] hover:bg-[#25252D]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Selector Buttons */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {filteredAssets.map((asset) => {
                  const isSelected = selectedAsset.id === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        playSound(520);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? isLight 
                            ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20' 
                            : 'bg-[#1A1A22] border-teal ring-2 ring-teal/20'
                          : isLight 
                            ? 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-teal/50' 
                            : 'bg-[#17171C] border-[#27272D] hover:border-teal/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                          <span className={`font-mono text-xs font-bold truncate ${
                            isLight ? 'text-[#0F172A]' : 'text-white'
                          }`}>
                            {asset.state}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-coral/15 text-coral font-bold shrink-0">
                          {asset.emissions2025}
                        </span>
                      </div>
                      <div className={`font-manrope text-xs font-bold line-clamp-1 ${
                        isSelected ? 'text-teal' : isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'
                      }`}>
                        {asset.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Asset Deep Dive Card */}
              {selectedAsset && (
                <div className={`p-6 rounded-2xl border ${
                  isLight 
                    ? 'bg-[#F8FAFC] border-[#E2E8F0]' 
                    : 'bg-[#0E0E12] border-[#222228]'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-teal-light font-bold">
                        {selectedAsset.subsector}
                      </span>
                      <h4 className={`font-manrope font-extrabold text-base sm:text-lg ${
                        isLight ? 'text-[#0F172A]' : 'text-white'
                      }`}>
                        {selectedAsset.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-white/50 block">ABATEMENT GOAL</span>
                      <span className="text-emerald-500 font-mono font-bold text-sm">
                        {selectedAsset.reductionTarget}
                      </span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-manrope">
                    <div>
                      <span className={`block text-[11px] font-mono mb-1 ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                        ENGINEERED TRANSITION PATHWAY
                      </span>
                      <p className={`font-medium ${isLight ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>
                        {selectedAsset.abatementPathway}
                      </p>
                    </div>

                    <div>
                      <span className={`block text-[11px] font-mono mb-1 ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                        COORDINATES & AUDIT REGISTRY
                      </span>
                      <p className="font-mono text-teal font-semibold">
                        {selectedAsset.coordinates} • Climate TRACE ID: #NZII-IND-{selectedAsset.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-[#71717A]'}`}>
                Showing 5 of 1,420 mapped Indian emissions assets
              </span>
              <a 
                href="/simulator" 
                onClick={() => playSound(480)}
                className="text-xs font-mono font-bold text-teal hover:underline flex items-center gap-1"
              >
                <span>Launch Full Spatial GIS Sandbox</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
