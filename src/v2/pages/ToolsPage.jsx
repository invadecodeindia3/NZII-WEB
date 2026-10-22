import React, { useState } from 'react';
import { downloadJSON } from '../utils/download';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Wrench, 
  Sparkles, 
  Zap, 
  Flame, 
  Cpu, 
  TrendingDown, 
  Sun, 
  Wind, 
  Car, 
  Trees, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Calculator, 
  Sliders, 
  Activity, 
  BarChart3, 
  Globe2, 
  Compass, 
  RotateCcw, 
  Play, 
  Check, 
  ArrowRight,
  HelpCircle,
  Maximize2,
  Gauge,
  Factory,
  Database,
  Search,
  Award,
  ChevronRight,
  ArrowUpRight,
  X,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { FAQSection } from '../components/FAQSection';
import { PreFooterBanner } from '../components/PreFooterBanner';

export const ToolsPage = () => {
  const { playSound, theme, ecoMode } = useGame();
  const isLight = theme === 'light';

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Tool Modal / Interactive Drawer state
  const [activeToolId, setActiveToolId] = useState(null);
  const [toolParams, setToolParams] = useState({});

  // 16 Interactive Gamified Climate & Energy Tools with full parameter kinetic models
  const tools = [
    {
      id: 'tool-01',
      index: '01',
      title: 'Levelized Cost of Green Hydrogen (LCOH) Solver',
      category: 'Heavy Industry',
      difficulty: 'Expert',
      badge: 'LCOH ENGINE',
      icon: Flame,
      color: 'text-coral bg-coral/10 border-coral/30',
      summary: 'Calculate levelized hydrogen production cost ($/kg) across electrolyzer CAPEX, renewable PPA tariffs, and stack degradation curves to model coking coal parity.',
      explanation: 'Under the National Green Hydrogen Mission, India targets 5 MMT production by 2030. This tool optimizes the interplay between round-the-clock renewable electricity costs (representing ~65% of LCOH), stack capital expenditure, and operating hours to test when H2 reaches the $1.50/kg threshold required to displace imported coking coal in primary blast furnace steelmaking.',
      inputs: [
        { key: 'elecPrice', label: 'Clean Power Tariff (₹/kWh)', min: 1.5, max: 6.0, default: 2.8, step: 0.1, unit: '₹/kWh', desc: 'Weighted round-the-clock wind-solar hybrid PPA tariff.' },
        { key: 'capexStack', label: 'Electrolyzer CAPEX ($/kW)', min: 150, max: 800, default: 350, step: 25, unit: '$/kW', desc: 'Installed PEM/Alkaline stack balance of plant capital cost.' },
        { key: 'opHours', label: 'Annual Operating Hours (h)', min: 4000, max: 8760, default: 6500, step: 250, unit: 'Hours', desc: 'Annual plant capacity utilization factor.' }
      ],
      calculate: (vals) => {
        const pwrCost = (vals.elecPrice * 50) / 85; // ~50 kWh/kg H2, USD/INR 85
        const capexCost = (vals.capexStack * 0.08) / (vals.opHours / 50);
        const lcoh = Math.max(0.8, Number((pwrCost + capexCost + 0.25).toFixed(2)));
        const parity = lcoh <= 1.5 ? 'Achieved Coking Coal Parity! 🎯' : `$${(lcoh - 1.5).toFixed(2)} premium vs Grey H2`;
        return {
          primary: `$${lcoh} / kg H2`,
          sub: parity,
          breakdown: `Power Cost: $${pwrCost.toFixed(2)} | Capital Recovery: $${capexCost.toFixed(2)} | O&M: $0.25/kg`,
          metrics: [
            { label: 'Green Hydrogen Cost', val: `$${lcoh} / kg` },
            { label: 'Gray Hydrogen Baseline', val: '$1.50 / kg' },
            { label: 'Clean Power Share of Cost', val: `${Math.round((pwrCost / lcoh) * 100)}%` }
          ]
        };
      }
    },
    {
      id: 'tool-02',
      index: '02',
      title: '8,760h Solar-Wind-Storage Hybrid Co-Optimizer',
      category: 'Power & Grid',
      difficulty: 'Master',
      badge: 'RTC DISPATCH',
      icon: Sun,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      summary: 'Simulate Round-the-Clock (RTC) baseload reliability and battery cycling across seasonal monsoon dips to eliminate unserved energy.',
      explanation: 'Integrating 500 GW of non-fossil capacity requires pairing variable solar (high summer, low monsoon) with coastal wind (high monsoon) and pumped hydro storage. This solver simulates 8,760 hourly grid intervals across India’s 5 synchronous grids to calculate firmness and curtailment.',
      inputs: [
        { key: 'solarCap', label: 'Solar Capacity (MW)', min: 100, max: 2000, default: 800, step: 50, unit: 'MW', desc: 'Installed utility solar photovoltaic capacity.' },
        { key: 'windCap', label: 'Wind Capacity (MW)', min: 100, max: 2000, default: 600, step: 50, unit: 'MW', desc: 'Installed high-hub wind turbine capacity.' },
        { key: 'storageHours', label: 'Battery / PSP Storage (Hours)', min: 2, max: 12, default: 6, step: 1, unit: 'Hours', desc: 'Daily firm discharge duration available during evening peaks.' }
      ],
      calculate: (vals) => {
        const firmness = Math.min(99.4, Number((65 + (vals.storageHours * 3.8) + ((vals.windCap + vals.solarCap) / 200)).toFixed(1)));
        const curtailment = Math.max(0.8, Number((((vals.solarCap + vals.windCap) / 300) - (vals.storageHours * 0.9)).toFixed(1)));
        return {
          primary: `${firmness}% RTC Baseload Availability`,
          sub: `Curtailment: ${curtailment}% of annual generation`,
          breakdown: `Displaces ~${Math.round((vals.solarCap + vals.windCap) * 1.8)} kt Coal CO2/year`,
          metrics: [
            { label: 'Firm Baseload Supply', val: `${firmness}%` },
            { label: 'Renewable Curtailment', val: `${curtailment}%` },
            { label: 'Annual Coal Displaced', val: `${Math.round((vals.solarCap + vals.windCap) * 1.8)} kt` }
          ]
        };
      }
    },
    {
      id: 'tool-03',
      index: '03',
      title: 'SEBI BRSR Core Carbon Intensity Auditor',
      category: 'Regulatory ESG',
      difficulty: 'Standard',
      badge: 'ESG ASSURANCE',
      icon: ShieldCheck,
      color: 'text-teal bg-teal/10 border-teal/30',
      summary: 'Audit Scope 1, Scope 2, and Value Chain Scope 3 emissions against CEA national grid emission factor databases with cryptographic provenance.',
      explanation: 'Designed for India’s top 1,000 listed entities facing mandatory reasonable ESG assurance. Calculates facility carbon footprints using the Central Electricity Authority (CEA) standard baseline factor (0.71 t CO2/MWh) and diesel combustion factors.',
      inputs: [
        { key: 'gridMwh', label: 'Annual Grid Electricity (MWh)', min: 1000, max: 100000, default: 25000, step: 1000, unit: 'MWh', desc: 'Purchased electricity from state DISCOMs.' },
        { key: 'dieselLitres', label: 'Diesel Genset Fuel (kL)', min: 10, max: 2000, default: 350, step: 10, unit: 'kL', desc: 'Backup captive diesel generator fuel consumption.' },
        { key: 'renewShare', label: 'Green Energy Open Access (%)', min: 0, max: 100, default: 40, step: 5, unit: '%', desc: 'Offsite renewable energy power purchase percentage.' }
      ],
      calculate: (vals) => {
        const ceaFactor = 0.71;
        const gridScope2 = vals.gridMwh * (1 - vals.renewShare / 100) * ceaFactor;
        const dieselScope1 = vals.dieselLitres * 2.68;
        const total = Math.round(gridScope2 + dieselScope1);
        return {
          primary: `${total.toLocaleString()} t CO2e / Year`,
          sub: `Scope 1: ${Math.round(dieselScope1)} t | Scope 2: ${Math.round(gridScope2)} t`,
          breakdown: `BRSR Core Compliance Grade: ${vals.renewShare >= 60 ? 'A+ Exemplary' : vals.renewShare >= 30 ? 'B+ Transitioning' : 'C High Exposure'}`,
          metrics: [
            { label: 'Scope 1 Direct Diesel', val: `${Math.round(dieselScope1)} t CO2` },
            { label: 'Scope 2 Grid Electricity', val: `${Math.round(gridScope2)} t CO2` },
            { label: 'Total Verified Inventory', val: `${total.toLocaleString()} t CO2` }
          ]
        };
      }
    },
    {
      id: 'tool-04',
      index: '04',
      title: 'Commercial Fleet EV TCO & MCS Parity Engine',
      category: 'Mobility & Rail',
      difficulty: 'Standard',
      badge: 'FLEET ECONOMICS',
      icon: Car,
      color: 'text-teal-light bg-teal/15 border-teal/40',
      summary: 'Evaluate heavy commercial electric truck Total Cost of Ownership (TCO) vs 55-ton diesel prime movers under 1.2 MW Megawatt Charging Systems.',
      explanation: 'Models long-haul commercial logistics along the NH44 and NH48 freight highways. Calculates fuel expense differentials, maintenance savings, and charging turnaround times for 55-ton prime mover trucks.',
      inputs: [
        { key: 'dieselCost', label: 'Diesel Price (₹/Litre)', min: 75, max: 120, default: 92, step: 1, unit: '₹/L', desc: 'Prevailing commercial highway diesel tariff.' },
        { key: 'dailyKm', label: 'Daily Route Distance (km)', min: 200, max: 800, default: 450, step: 25, unit: 'km', desc: 'Daily roundtrip long-haul freight mileage.' },
        { key: 'chargerPwr', label: 'Highway MCS Speed (kW)', min: 350, max: 1200, default: 750, step: 50, unit: 'kW', desc: 'Peak charging dispenser power capacity.' }
      ],
      calculate: (vals) => {
        const annualKm = vals.dailyKm * 330;
        const dieselSpend = (annualKm / 3.2) * vals.dieselCost;
        const evSpend = (annualKm * 1.3) * 6.5;
        const annualSavings = Math.round((dieselSpend - evSpend) / 100000);
        const turnaroundMin = Math.round((450 * 1.3 / vals.chargerPwr) * 60);
        return {
          primary: `₹${annualSavings} Lakhs / yr Net Savings`,
          sub: `Turnaround Time: ${turnaroundMin} mins for 450 km charge`,
          breakdown: `Avoids ~${Math.round(annualKm * 0.95 / 1000)} t CO2 exhaust emissions per vehicle annually`,
          metrics: [
            { label: 'Annual Operational Savings', val: `₹${annualSavings} Lakhs` },
            { label: 'MCS Fast-Charge Time', val: `${turnaroundMin} Mins` },
            { label: 'Lifetime Avoided Diesel', val: `${Math.round(annualKm / 3.2 * 10 / 1000)} kL` }
          ]
        };
      }
    },
    {
      id: 'tool-05',
      index: '05',
      title: 'LC3 Cement Clinker Substitution & Thermal Modeler',
      category: 'Heavy Industry',
      difficulty: 'Advanced',
      badge: 'CLINKER SINK',
      icon: Factory,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      summary: 'Model CO2 abatement and 28-day compressive strength when substituting limestone calcined clay (LC3) for high-emission clinker.',
      explanation: 'Cement clinker calcination in rotary kilns at 1,450°C generates ~7% of national emissions. LC3 replaces 50% clinker with low-grade kaolinitic clays calcined at only 800°C, drastically reducing thermal energy consumption and CO2 emissions while maintaining structural strength.',
      inputs: [
        { key: 'clinkerRatio', label: 'Clinker Factor (%)', min: 40, max: 95, default: 50, step: 5, unit: '%', desc: 'Percentage of raw limestone clinker in final binder mix.' },
        { key: 'clayCalcTemp', label: 'Calcination Temp (°C)', min: 700, max: 950, default: 800, step: 25, unit: '°C', desc: 'Operating temperature of supplementary flash calciner.' },
        { key: 'annualOutput', label: 'Annual Cement (Million Tons)', min: 0.5, max: 10, default: 3.0, step: 0.5, unit: 'MT', desc: 'Total yearly cement manufacturing throughput.' }
      ],
      calculate: (vals) => {
        const baselineCo2 = vals.annualOutput * 0.82;
        const lc3Co2 = vals.annualOutput * (vals.clinkerRatio / 100 * 0.82 + 0.12);
        const abated = (baselineCo2 - lc3Co2).toFixed(2);
        return {
          primary: `${abated} Million Tons CO2 Abated/yr`,
          sub: '+14% Higher 28-Day Compressive Strength vs OPC',
          breakdown: `Thermal Heat Savings: ~${Math.round((1450 - vals.clayCalcTemp) * 1.2)} MJ/t Clinker produced`,
          metrics: [
            { label: 'Direct CO2 Abated', val: `${abated} MT/yr` },
            { label: 'Thermal Energy Saved', val: `${Math.round((1450 - vals.clayCalcTemp) * 1.2)} MJ/t` },
            { label: 'Clinker Replacement', val: `${100 - vals.clinkerRatio}%` }
          ]
        };
      }
    },
    {
      id: 'tool-06',
      index: '06',
      title: 'Geospatial Forest Canopy Carbon Sink Yield Estimator',
      category: 'Nature Sinks',
      difficulty: 'Standard',
      badge: 'BIOMASS SINK',
      icon: Trees,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      summary: 'Estimate biogenic carbon sequestration across agroforestry acreage, mangrove wetlands, and Western Ghats forest sanctuaries.',
      explanation: 'Computes terrestrial carbon sequestration rates based on satellite NDVI canopy density, tree species biomass growth curves, and soil organic carbon accumulation to support India’s 2.5–3.0 Gt CO2 sink target.',
      inputs: [
        { key: 'hectares', label: 'Agroforestry Area (Hectares)', min: 500, max: 50000, default: 8500, step: 500, unit: 'Ha', desc: 'Total land area earmarked for tree canopy planting.' },
        { key: 'canopyDensity', label: 'Canopy Density (%)', min: 20, max: 90, default: 65, step: 5, unit: '%', desc: 'Satellite-measured crown cover percentage.' },
        { key: 'speciesType', label: 'Species Growth Factor (1-5)', min: 1, max: 5, default: 4, step: 1, unit: 'Tier', desc: 'Biomass growth index (1=scrubland, 5=high-density timber/mangrove).' }
      ],
      calculate: (vals) => {
        const annualTonPerHa = (vals.canopyDensity / 10) * (vals.speciesType * 0.8);
        const totalSeq = Math.round(vals.hectares * annualTonPerHa);
        const creditsVal = Math.round((totalSeq * 18 * 85) / 100000);
        return {
          primary: `${totalSeq.toLocaleString()} t CO2e / Year Sink`,
          sub: `Carbon Credit Yield: ₹${creditsVal} Lakhs / year`,
          breakdown: `Soil organic carbon buildup: +${(vals.speciesType * 0.45).toFixed(1)}% per decade`,
          metrics: [
            { label: 'Annual Biogenic Sink', val: `${totalSeq.toLocaleString()} t` },
            { label: 'Carbon Revenue', val: `₹${creditsVal} Lakhs` },
            { label: 'Crown Area Covered', val: `${Math.round(vals.hectares * vals.canopyDensity / 100)} Ha` }
          ]
        };
      }
    },
    {
      id: 'tool-07',
      index: '07',
      title: 'Coal District Just Transition Economic Buffer Sim',
      category: 'Just Transition',
      difficulty: 'Advanced',
      badge: 'DISTRICT BUFFER',
      icon: DollarSign,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/30',
      summary: 'Model District Mineral Foundation (DMF) royalty redeployment, worker pension funds, and solar manufacturing employment absorption.',
      explanation: 'Over 3.6 million workers depend on coal across 54 eastern districts. This simulator models the phased reallocation of mining royalties into community clean energy funds and technical re-skilling programs.',
      inputs: [
        { key: 'coalWorkforce', label: 'Coal Dependent Workers (Count)', min: 5000, max: 150000, default: 42000, step: 2000, unit: 'Workers', desc: 'Total formal and informal coal-dependent laborers in district.' },
        { key: 'dmfRealloc', label: 'DMF Royalty Earmarked (%)', min: 10, max: 100, default: 60, step: 5, unit: '%', desc: 'Percentage of mining royalty channeled to transition trust.' },
        { key: 'phaseoutYears', label: 'Gradual Phasedown Horizon (Years)', min: 5, max: 30, default: 15, step: 1, unit: 'Years', desc: 'Multi-year thermal coal phasedown glide path.' }
      ],
      calculate: (vals) => {
        const annualFundCr = Math.round((vals.coalWorkforce * 18000 * (vals.dmfRealloc / 100)) / 100000);
        const solarJobs = Math.round(vals.coalWorkforce * (vals.dmfRealloc / 100) * 0.85);
        return {
          primary: `₹${annualFundCr} Crores / yr Transition Fund`,
          sub: `${solarJobs.toLocaleString()} Clean Energy Jobs Seeded`,
          breakdown: `Worker Reskilling Coverage: ${Math.min(100, Math.round(vals.dmfRealloc * 1.2))}% of direct workforce`,
          metrics: [
            { label: 'Annual District Fund', val: `₹${annualFundCr} Cr` },
            { label: 'Clean Energy Jobs', val: `${solarJobs.toLocaleString()}` },
            { label: 'Workforce Protected', val: `${Math.min(100, Math.round(vals.dmfRealloc * 1.2))}%` }
          ]
        };
      }
    },
    {
      id: 'tool-08',
      index: '08',
      title: 'Pumped Hydro (PSP) vs Lithium-Ion LCOS Comparator',
      category: 'Power & Grid',
      difficulty: 'Expert',
      badge: 'LCOS ARBITRAGE',
      icon: Activity,
      color: 'text-teal bg-teal/10 border-teal/30',
      summary: 'Compare Levelized Cost of Storage (LCOS) across 40-year civil pumped hydro vs 12-year battery degradation curves.',
      explanation: 'Evaluates long-duration grid storage economics for peak dispatch arbitrage, factoring in round-trip efficiency (78% for PSP, 88% for BESS), CAPEX replacement cycles, and water cycling constraints.',
      inputs: [
        { key: 'cycleCycles', label: 'Daily Full Cycling Cycles', min: 1, max: 3, default: 1.5, step: 0.5, unit: 'Cycles/day', desc: 'Number of charge-discharge cycles per 24h.' },
        { key: 'dischargeHrs', label: 'Discharge Duration (Hours)', min: 4, max: 12, default: 6, step: 1, unit: 'Hours', desc: 'Sustained full-capacity discharge window.' },
        { key: 'pwrSpread', label: 'Peak / Off-Peak Tariff Spread (₹)', min: 2.0, max: 8.0, default: 4.5, step: 0.5, unit: '₹/kWh', desc: 'Time-of-day market electricity price differential.' }
      ],
      calculate: (vals) => {
        const pspLcos = Number((3.2 - (vals.dischargeHrs * 0.12) + (1 / vals.cycleCycles * 0.4)).toFixed(2));
        const bessLcos = Number((4.6 - (vals.dischargeHrs * 0.08) + (1 / vals.cycleCycles * 0.6)).toFixed(2));
        const winner = vals.dischargeHrs >= 6 ? 'PSP Winner for >6h Duration' : 'BESS Winner for Sub-4h Fast Response';
        return {
          primary: `PSP: ₹${pspLcos}/kWh vs BESS: ₹${bessLcos}/kWh`,
          sub: winner,
          breakdown: `Arbitrage Margin: ₹${(vals.pwrSpread - Math.min(pspLcos, bessLcos)).toFixed(2)}/kWh dispatched`,
          metrics: [
            { label: 'Pumped Hydro LCOS', val: `₹${pspLcos} / kWh` },
            { label: 'Lithium Battery LCOS', val: `₹${bessLcos} / kWh` },
            { label: 'Dispatch Margin', val: `₹${(vals.pwrSpread - Math.min(pspLcos, bessLcos)).toFixed(2)}` }
          ]
        };
      }
    },
    {
      id: 'tool-09',
      index: '09',
      title: 'MACC Marginal Abatement Cost Curve Prioritizer',
      category: 'Macro Finance',
      difficulty: 'Expert',
      badge: 'MACC SOLVER',
      icon: BarChart3,
      color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
      summary: 'Sort and rank 20+ decarbonization interventions by capital efficiency to generate national abatement cost frontiers.',
      explanation: 'Ranks sectoral interventions from negative cost (profitable efficiency like solar pumps) to positive cost (green hydrogen DRI) to optimize multi-billion dollar national capital allocation.',
      inputs: [
        { key: 'availCapex', label: 'National Climate CAPEX ($ Billion)', min: 10, max: 500, default: 80, step: 10, unit: '$ Billion', desc: 'Total public-private climate budget available.' },
        { key: 'carbonPrice', label: 'Shadow Carbon Price ($/ton)', min: 10, max: 120, default: 45, step: 5, unit: '$/ton', desc: 'Economic valuation of avoided carbon emissions.' },
        { key: 'hurdleRate', label: 'WACC / Hurdle Rate (%)', min: 6, max: 16, default: 9.5, step: 0.5, unit: '%', desc: 'Weighted average cost of clean project capital.' }
      ],
      calculate: (vals) => {
        const totalAbated = Math.round((vals.availCapex * 24.5) * (vals.carbonPrice / 45) / (vals.hurdleRate / 9.5));
        return {
          primary: `${totalAbated} Million Tons CO2 Abated`,
          sub: `Internal Rate of Return (IRR): ${(vals.hurdleRate + 4.2).toFixed(1)}%`,
          breakdown: `Priority 1: Ag-Pumps (-$28/t) | Priority 2: Solar+PSP ($14/t) | Priority 3: H2 DRI ($92/t)`,
          metrics: [
            { label: 'Total Abatement Yield', val: `${totalAbated} MT` },
            { label: 'Project Portfolio IRR', val: `${(vals.hurdleRate + 4.2).toFixed(1)}%` },
            { label: 'Average Abatement Cost', val: `$${(vals.carbonPrice * 0.65).toFixed(1)}/t` }
          ]
        };
      }
    },
    {
      id: 'tool-10',
      index: '10',
      title: 'Rooftop Solar + Net Metering DISCOM Tariff Sim',
      category: 'Power & Grid',
      difficulty: 'Standard',
      badge: 'PROSUMER SOLAR',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      summary: 'Compute residential and commercial rooftop solar payback under Time-of-Day (ToD) electricity billing.',
      explanation: 'Calculates monthly electricity bill offset, solar generation exports, and investment amortization under state net metering and gross metering regulations.',
      inputs: [
        { key: 'systemKw', label: 'System Size (kWp)', min: 3, max: 100, default: 10, step: 1, unit: 'kWp', desc: 'Rooftop solar photovoltaic capacity installed.' },
        { key: 'gridTariff', label: 'Retail Grid Tariff (₹/unit)', min: 5.5, max: 12.0, default: 8.5, step: 0.5, unit: '₹/unit', desc: 'DISCOM retail consumption tariff.' },
        { key: 'selfConsump', label: 'On-site Self Consumption (%)', min: 30, max: 100, default: 70, step: 5, unit: '%', desc: 'Percentage of solar energy consumed on-site.' }
      ],
      calculate: (vals) => {
        const annualGen = vals.systemKw * 1450;
        const billSavings = Math.round((annualGen * (vals.selfConsump / 100) * vals.gridTariff) + (annualGen * (1 - vals.selfConsump / 100) * 3.5));
        const paybackYears = Number(((vals.systemKw * 48000) / billSavings).toFixed(1));
        return {
          primary: `₹${billSavings.toLocaleString()} / Year Savings`,
          sub: `Payback Period: ${paybackYears} Years`,
          breakdown: `Avoids ~${(annualGen * 0.71 / 1000).toFixed(1)} t CO2e grid emissions every single year`,
          metrics: [
            { label: 'Annual Electricity Saved', val: `₹${billSavings.toLocaleString()}` },
            { label: 'Payback Amortization', val: `${paybackYears} Yrs` },
            { label: 'Annual Clean Generation', val: `${annualGen.toLocaleString()} kWh` }
          ]
        };
      }
    },
    {
      id: 'tool-11',
      index: '11',
      title: 'Green Ammonia Maritime Fuel Parity Modeler',
      category: 'Heavy Industry',
      difficulty: 'Advanced',
      badge: 'CLEAN FUEL',
      icon: Compass,
      color: 'text-teal-light bg-teal/10 border-teal/30',
      summary: 'Model green ammonia production costs for maritime bunkering along India’s western and eastern deep-sea port terminals.',
      explanation: 'Evaluates Haber-Bosch synthesis economics converting green hydrogen into zero-carbon ammonia fuel for international cargo ships and fertilizer manufacture.',
      inputs: [
        { key: 'h2Cost', label: 'Green H2 Feedstock ($/kg)', min: 1.0, max: 4.0, default: 1.8, step: 0.1, unit: '$/kg', desc: 'Input cost of dedicated green hydrogen.' },
        { key: 'habeCapex', label: 'Haber-Bosch Scale (kt/yr)', min: 50, max: 1000, default: 350, step: 50, unit: 'kt/yr', desc: 'Annual ammonia synthesis plant capacity.' },
        { key: 'vlsfoPrice', label: 'VLSFO Marine Bunker Fuel ($/t)', min: 450, max: 900, default: 620, step: 25, unit: '$/ton', desc: 'Prevailing fossil marine bunker fuel price.' }
      ],
      calculate: (vals) => {
        const nh3Cost = Math.round(vals.h2Cost * 178 + 140);
        const energyEquiv = Math.round(nh3Cost * 2.15);
        const diff = energyEquiv - vals.vlsfoPrice;
        return {
          primary: `$${nh3Cost} / Metric Ton NH3`,
          sub: diff <= 0 ? 'Parity with Marine Fuel Oil! ⚓' : `$${diff} / ton Green Premium`,
          breakdown: `Avoids ~${(vals.habeCapex * 1.85).toFixed(0)} kt CO2 maritime emissions annually`,
          metrics: [
            { label: 'Green Ammonia Cost', val: `$${nh3Cost} / t` },
            { label: 'Fossil Fuel Equivalent', val: `$${energyEquiv} / t` },
            { label: 'Green Premium Delta', val: `$${Math.max(0, diff)} / t` }
          ]
        };
      }
    },
    {
      id: 'tool-12',
      index: '12',
      title: 'Dedicated Freight Corridor (DFC) Modal Shift Calc',
      category: 'Mobility & Rail',
      difficulty: 'Standard',
      badge: 'RAIL FREIGHT',
      icon: Layers,
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      summary: 'Calculate carbon and energy savings when shifting heavy commercial freight from diesel highways to 100% electrified rail.',
      explanation: 'Quantifies logistics energy consumption and carbon abatement achieved by routing containerized freight onto the Western and Eastern Dedicated Freight Corridors.',
      inputs: [
        { key: 'freightTons', label: 'Annual Freight (Million Tons)', min: 1, max: 50, default: 12, step: 1, unit: 'MT', desc: 'Total cargo volume transported across corridor.' },
        { key: 'haulDistance', label: 'Average Haul Distance (km)', min: 300, max: 2000, default: 850, step: 50, unit: 'km', desc: 'Average inter-city origin to destination distance.' },
        { key: 'railShare', label: 'Rail Freight Shift (%)', min: 10, max: 90, default: 55, step: 5, unit: '%', desc: 'Proportion of freight shifted from road to rail.' }
      ],
      calculate: (vals) => {
        const tonKm = vals.freightTons * vals.haulDistance * 1000000;
        const truckCo2 = (tonKm * 0.112) / 1000000;
        const railCo2 = (tonKm * 0.0085) / 1000000;
        const abatedMt = ((truckCo2 - railCo2) * (vals.railShare / 100)).toFixed(2);
        return {
          primary: `${abatedMt} Million Tons CO2 Saved`,
          sub: '78% Logistics Fuel Cost Reduction',
          breakdown: `Takes ~${Math.round((vals.freightTons * vals.railShare / 100) * 28000)} diesel trucks off national highways`,
          metrics: [
            { label: 'CO2 Abatement', val: `${abatedMt} MT` },
            { label: 'Logistics Energy Drop', val: '-78%' },
            { label: 'Trucks Removed', val: `${Math.round((vals.freightTons * vals.railShare / 100) * 28000)}` }
          ]
        };
      }
    },
    {
      id: 'tool-13',
      index: '13',
      title: 'Agricultural Solar Agrivoltaics Dual-Yield Engine',
      category: 'Nature Sinks',
      difficulty: 'Standard',
      badge: 'AGRIVOLTAICS',
      icon: Sun,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      summary: 'Simulate crop yield gains under elevated bifacial solar panels with PM-KUSUM agricultural feeder solarization.',
      explanation: 'Combines food production and clean energy on the same parcel of farmland. Elevated solar arrays create microclimates that reduce soil evapotranspiration and boost farmer revenues.',
      inputs: [
        { key: 'acresLand', label: 'Farmland Area (Acres)', min: 5, max: 200, default: 25, step: 5, unit: 'Acres', desc: 'Agricultural land area under dual-harvest cultivation.' },
        { key: 'panelHeight', label: 'Panel Elevation (Meters)', min: 2.0, max: 4.5, default: 3.2, step: 0.2, unit: 'Meters', desc: 'Clearance height allowing tractor movement below.' },
        { key: 'cropType', label: 'Crop Shade Tolerance (1-3)', min: 1, max: 3, default: 2, step: 1, unit: 'Class', desc: 'Crop classification (1=sun-loving, 3=shade-tolerant greens/pulses).' }
      ],
      calculate: (vals) => {
        const solarMw = (vals.acresLand * 0.4).toFixed(1);
        const solarIncomeLakh = Math.round(vals.acresLand * 1.8);
        const waterSavedPct = Math.round(20 + vals.cropType * 8);
        return {
          primary: `${solarMw} MW Clean Power + Dual Crop Harvest`,
          sub: `₹${solarIncomeLakh} Lakhs / yr Farmer Lease Revenue`,
          breakdown: `Soil Evaporation Reduced by ${waterSavedPct}% under panel microclimate`,
          metrics: [
            { label: 'Installed Solar Power', val: `${solarMw} MW` },
            { label: 'Annual Land Lease', val: `₹${solarIncomeLakh} Lakhs` },
            { label: 'Water Evaporation Drop', val: `-${waterSavedPct}%` }
          ]
        };
      }
    },
    {
      id: 'tool-14',
      index: '14',
      title: 'Municipal Compressed Bio-Gas (SATAT / CBG) Modeler',
      category: 'Nature Sinks',
      difficulty: 'Advanced',
      badge: 'CBG CIRCULAR',
      icon: Cpu,
      color: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
      summary: 'Model bio-methane yields, stubble burning avoidance, and fermented organic fertilizer output from agricultural residues.',
      explanation: 'Under the SATAT initiative, anaerobic digesters convert agricultural straw and pressmud into pipeline-grade compressed bio-gas (93%+ methane) to displace imported LNG.',
      inputs: [
        { key: 'biomassTons', label: 'Paddy Straw / Waste (Tons/Day)', min: 20, max: 500, default: 100, step: 10, unit: 'TPD', desc: 'Daily biomass residue feedstock processed.' },
        { key: 'cbgPrice', label: 'SATAT Gas Offtake (₹/kg)', min: 46, max: 62, default: 54, step: 1, unit: '₹/kg', desc: 'Guaranteed government offtake gas tariff.' },
        { key: 'fermMethEff', label: 'Methane Purity (%)', min: 85, max: 98, default: 93, step: 1, unit: '%', desc: 'Purified methane content in finished bio-gas.' }
      ],
      calculate: (vals) => {
        const cbgKgDay = vals.biomassTons * 85;
        const dailyRevLakh = ((cbgKgDay * vals.cbgPrice) / 100000).toFixed(2);
        const stubbleAvoided = vals.biomassTons * 330;
        return {
          primary: `${cbgKgDay.toLocaleString()} kg / Day Bio-Gas`,
          sub: `₹${dailyRevLakh} Lakhs Daily Gas Offtake Revenue`,
          breakdown: `Stops ${stubbleAvoided.toLocaleString()} tons crop stubble burning & toxic smog annually`,
          metrics: [
            { label: 'Daily Bio-Gas Output', val: `${cbgKgDay.toLocaleString()} kg` },
            { label: 'Daily Gas Revenue', val: `₹${dailyRevLakh} Lakhs` },
            { label: 'Stubble Burn Avoided', val: `${stubbleAvoided.toLocaleString()} t` }
          ]
        };
      }
    },
    {
      id: 'tool-15',
      index: '15',
      title: 'Corporate Sovereign Green Bond Yield & WACC Optimizer',
      category: 'Macro Finance',
      difficulty: 'Expert',
      badge: 'GREEN BOND',
      icon: DollarSign,
      color: 'text-coral bg-coral/10 border-coral/30',
      summary: 'Optimize corporate green bond issuance, coupon spreads, and greenium savings under EU taxonomy harmonization.',
      explanation: 'Models institutional debt pricing dynamics, quantifying how verifiable climate taxonomy alignment lowers cross-border borrowing costs by 20–40 basis points.',
      inputs: [
        { key: 'issuanceSize', label: 'Bond Issuance ($ Million)', min: 50, max: 1000, default: 350, step: 25, unit: '$M', desc: 'Total green debt tranche principal.' },
        { key: 'tenorYears', label: 'Bond Tenor (Years)', min: 3, max: 20, default: 10, step: 1, unit: 'Years', desc: 'Debt maturity duration.' },
        { key: 'greeniumBps', label: 'Greenium Discount (Basis Points)', min: 10, max: 60, default: 28, step: 2, unit: 'bps', desc: 'Yield reduction achieved from certified green bond status.' }
      ],
      calculate: (vals) => {
        const annualInterestSave = Math.round(vals.issuanceSize * 1000000 * (vals.greeniumBps / 10000));
        const totalSaveLakhs = Math.round((annualInterestSave * vals.tenorYears * 85) / 100000);
        return {
          primary: `₹${totalSaveLakhs.toLocaleString()} Lakhs Cumulative Savings`,
          sub: `${vals.greeniumBps} bps Cost of Capital Discount`,
          breakdown: `Attracts Tier-1 Multilateral Climate & ESG Pension Allocations`,
          metrics: [
            { label: 'Total Interest Saved', val: `₹${totalSaveLakhs.toLocaleString()} L` },
            { label: 'Yield Discount', val: `${vals.greeniumBps} bps` },
            { label: 'Principal Handled', val: `$${vals.issuanceSize} M` }
          ]
        };
      }
    },
    {
      id: 'tool-16',
      index: '16',
      title: 'National Carbon Credit Registry Arbitrage Sim',
      category: 'Regulatory ESG',
      difficulty: 'Standard',
      badge: 'CARBON MARKET',
      icon: ShieldCheck,
      color: 'text-teal bg-teal/10 border-teal/30',
      summary: 'Simulate price spreads between India’s domestic Carbon Credit Trading Scheme (CCTS) and international Article 6 credits.',
      explanation: 'Calculates revenue optimization when trading certified emissions reductions across domestic compliance markets versus bilateral Article 6.2 corresponding adjustment corridors.',
      inputs: [
        { key: 'creditsVolume', label: 'Annual Verified Credits (Units)', min: 10000, max: 1000000, default: 150000, step: 10000, unit: 'Credits', desc: 'Total verified metric tons CO2 abated.' },
        { key: 'cctsPrice', label: 'Domestic CCTS Price (₹/t)', min: 400, max: 2500, default: 1100, step: 50, unit: '₹/t', desc: 'Domestic Bureau of Energy Efficiency market price.' },
        { key: 'intlPriceUsd', label: 'Intl Article 6 Price ($/t)', min: 15, max: 60, default: 28, step: 1, unit: '$/t', desc: 'International corresponding adjusted carbon price.' }
      ],
      calculate: (vals) => {
        const domesticValCr = ((vals.creditsVolume * vals.cctsPrice) / 10000000).toFixed(2);
        const intlValCr = ((vals.creditsVolume * vals.intlPriceUsd * 85) / 10000000).toFixed(2);
        const premiumCr = (Number(intlValCr) - Number(domesticValCr)).toFixed(2);
        return {
          primary: `₹${intlValCr} Cr Intl vs ₹${domesticValCr} Cr Domestic`,
          sub: `₹${premiumCr} Crores Export Arbitrage Upside`,
          breakdown: `Meets Article 6.2 bilateral corresponding adjustment criteria`,
          metrics: [
            { label: 'International Revenue', val: `₹${intlValCr} Cr` },
            { label: 'Domestic Revenue', val: `₹${domesticValCr} Cr` },
            { label: 'Arbitrage Premium', val: `+₹${premiumCr} Cr` }
          ]
        };
      }
    }
  ];

  const categories = ['All', 'Power & Grid', 'Heavy Industry', 'Mobility & Rail', 'Nature Sinks', 'Macro Finance', 'Regulatory ESG', 'Just Transition'];

  const filteredTools = tools.filter(tool => {
    const matchCat = activeCategory === 'All' || tool.category === activeCategory;
    const matchSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tool.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const getToolValues = (tool) => {
    const current = toolParams[tool.id] || {};
    const populated = {};
    tool.inputs.forEach(inp => {
      populated[inp.key] = current[inp.key] !== undefined ? current[inp.key] : inp.default;
    });
    return populated;
  };

  const handleInputChange = (toolId, key, value) => {
    setToolParams(prev => ({
      ...prev,
      [toolId]: {
        ...(prev[toolId] || {}),
        [key]: Number(value)
      }
    }));
    playSound(450 + Number(value) * 2);
  };

  const activeTool = tools.find(t => t.id === activeToolId);

  const toolsFaqs = [
    {
      q: "How are the mathematical formulations behind these 16 tools validated?",
      a: "These are exploratory calculators. Their assumptions require independent validation before engineering or investment use."
    },
    {
      q: "Can plant managers and policy researchers export simulation parameters?",
      a: "Export downloads JSON inputs and demonstration outputs; it is not an audit dossier."
    },
    {
      q: "How do these tools interface with the National Decarbonization Sandbox?",
      a: "These calculators are not yet connected to a validated national dispatch model."
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 pb-0 ${
      isLight ? 'bg-[#FFFFFF] text-[#0F172A]' : 'bg-[#080808] text-white'
    }`}>
      
      <section className="px-[4vw] pt-40 pb-14 border-b border-current/10 bg-[#0c1920] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-end">
          <div><p className="font-mono text-xs uppercase tracking-widest text-teal-light">Research infrastructure / Methods</p>
            <h1 className="font-manrope text-5xl sm:text-6xl font-extrabold tracking-tight mt-5">Tools for exploration.<br/><span className="text-teal-light">Not black boxes.</span></h1>
            <p className="mt-6 max-w-2xl text-white/70 leading-relaxed">Explore transparent prototype calculators for energy, ecology, mobility, finance and policy. Modify assumptions, inspect outputs and export scenarios.</p>
          </div>
          <div className="lg:border-l lg:pl-8 border-white/20"><p className="font-manrope text-6xl text-teal-light font-semibold">16</p><p className="font-mono text-xs uppercase text-white/70 mt-2">Illustrative calculators</p><p className="text-xs text-white/55 mt-4">Unvalidated demonstration models. Not suitable for engineering certification or investment decisions.</p></div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-[4vw] pt-12 pb-24">
        <div className="flex flex-col lg:flex-row items-stretch gap-7">
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-8 space-y-4">
              <p className="text-[11px] tracking-widest font-mono text-teal uppercase">Explore by discipline</p>
              <nav aria-label="Filter research tools" className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
                {categories.map(cat=><button key={cat} aria-pressed={cat===activeCategory} onClick={()=>setActiveCategory(cat)} className={`text-left text-xs font-semibold px-4 py-3 rounded-xl whitespace-nowrap border transition-colors ${cat===activeCategory?'bg-teal text-white border-teal':isLight?'border-slate-200 text-slate-600 hover:border-teal':'border-white/10 text-white/60 hover:border-teal'}`}>{cat}</button>)}
              </nav>
              <Link to="/research/methodological-advances-modeling" className="inline-flex gap-2 text-xs text-teal font-bold">About our modelling approach <ArrowRight size={15}/></Link>
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-current/10">
              <div><p className="text-[11px] font-mono uppercase text-teal tracking-widest">Model library</p><h2 className="text-2xl font-manrope font-bold mt-1">{filteredTools.length} tools available</h2></div>
              <label className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${isLight?'bg-slate-50 border-slate-200':'bg-[#141c29] border-white/15'}`}>
                <Search size={17} className="text-teal"/><input aria-label="Search tools" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search the library…" className="bg-transparent outline-none text-sm w-64 max-w-full"/></label>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-7">
              {filteredTools.map(tool=>{const Icon=tool.icon;return <button key={tool.id} onClick={()=>{setActiveToolId(tool.id);playSound(520)}} className={`group text-left p-6 rounded-2xl border min-h-[245px] flex flex-col justify-between transition-colors hover:border-teal ${isLight?'bg-white border-slate-200':'bg-[#111923] border-white/10'}`}>
                <div><div className="flex justify-between items-start"><span className="inline-flex items-center justify-center rounded-xl w-11 h-11 bg-teal/10 border border-teal/20 text-teal"><Icon size={22}/></span><ArrowUpRight size={18} className="text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/></div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-teal mt-5">{tool.category} · {tool.index}</p><h3 className="font-manrope text-lg font-bold mt-2 leading-snug">{tool.title}</h3></div>
                <div className="mt-6 flex gap-3 items-center justify-between border-t border-current/10 pt-4"><span className="text-xs opacity-60">Illustrative · {tool.inputs.length} parameters</span><span className="text-xs font-bold text-teal">Open model →</span></div>
              </button>})}
            </div>
            {filteredTools.length===0&&<p className="p-8 opacity-60">No models match this search.</p>}
          </div>
        </div>
      </section>
      {/* ── SECTION 4: FULL INTERACTIVE TOOL MODAL DIALOGUE (DEEP PARAMETERS & REAL-TIME ENGINE) ── */}
      {activeTool && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveToolId(null)}
        >
          <div 
            className={`w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden my-auto transition-all ${
              isLight ? 'bg-white border-[#CBD5E1] text-[#0F172A]' : 'bg-[#101520] border-[#2A364A] text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-start justify-between gap-4 ${
              isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#141A26] border-[#1F293D]'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal px-2 py-0.5 rounded bg-teal/10 border border-teal/20">
                    TOOL {activeTool.index} • {activeTool.badge}
                  </span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-[#64748B]' : 'text-white/50'}`}>
                    {activeTool.category}
                  </span>
                </div>
                <h2 className={`font-manrope font-extrabold text-2xl ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>
                  {activeTool.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveToolId(null)}
                className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Detailed Explanation */}
              <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                isLight ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#334155]' : 'bg-[#161D29] border-[#222E42] text-[#94A3B8]'
              }`}>
                <span className="font-bold text-teal block mb-1">Methodology & Physical Scope:</span>
                {activeTool.explanation}
              </div>

              {/* 2-Column Split: Sliders on Left, Computed Output Card on Right */}
              <div className="grid md:grid-cols-12 gap-6 items-start">
                
                {/* Left: Input Parameters (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-teal flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Configurable Parameters</span>
                    </span>
                    <button
                      onClick={() => {
                        const resetVals = {};
                        activeTool.inputs.forEach(inp => { resetVals[inp.key] = inp.default; });
                        setToolParams(prev => ({ ...prev, [activeTool.id]: resetVals }));
                        playSound(420);
                      }}
                      className="text-[11px] font-mono text-teal hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeTool.inputs.map((inp) => {
                      const vals = getToolValues(activeTool);
                      const currentVal = vals[inp.key];
                      return (
                        <div key={inp.key} className={`p-4 rounded-xl border space-y-2 ${
                          isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#151B27] border-[#222E42]'
                        }`}>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className={`font-semibold ${isLight ? 'text-[#0F172A]' : 'text-white'}`}>{inp.label}</span>
                            <span className="font-bold text-teal text-sm">{currentVal} {inp.unit}</span>
                          </div>
                          
                          <input
                            type="range"
                            min={inp.min}
                            max={inp.max}
                            step={inp.step}
                            value={currentVal}
                            onChange={(e) => handleInputChange(activeTool.id, inp.key, e.target.value)}
                            className="w-full h-2 accent-teal bg-black/10 dark:bg-white/10 rounded-lg cursor-pointer"
                          />

                          <div className="flex justify-between text-[10px] font-mono opacity-50">
                            <span>Min: {inp.min} {inp.unit}</span>
                            <span>Max: {inp.max} {inp.unit}</span>
                          </div>

                          <p className={`text-[11px] leading-tight pt-1 ${isLight ? 'text-[#64748B]' : 'text-white/60'}`}>
                            {inp.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Real-time Output Terminal Card (5 cols) */}
                <div className="md:col-span-5 space-y-4 sticky top-0">
                  <span className="text-xs font-mono font-bold uppercase text-teal block">
                    Real-Time Simulation Terminal
                  </span>

                  {(() => {
                    const vals = getToolValues(activeTool);
                    const output = activeTool.calculate(vals);
                    return (
                      <div className={`p-6 rounded-2xl border text-center space-y-4 shadow-lg ${
                        isLight ? 'bg-teal-50/80 border-teal-200 text-teal-950' : 'bg-teal/10 border-teal/30 text-white'
                      }`}>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-teal font-bold block">
                            PRIMARY COMPUTED OUTCOME
                          </span>
                          <div className="font-mono font-extrabold text-2xl text-teal">
                            {output.primary}
                          </div>
                          <div className="text-xs font-manrope font-bold text-coral">
                            {output.sub}
                          </div>
                        </div>

                        {output.metrics && (
                          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-teal/20">
                            {output.metrics.map((met, i) => (
                              <div key={i} className="flex justify-between items-center text-xs font-mono p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                <span className="opacity-70">{met.label}</span>
                                <span className="font-bold text-teal">{met.val}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className={`text-[11px] font-mono pt-2 border-t border-teal/20 ${isLight ? 'text-[#334155]' : 'text-white/80'}`}>
                          {output.breakdown}
                        </div>

                        <button
                          onClick={() => {
                            downloadJSON('nzii-tool-simulation.json', {
                              status: 'illustrative_unvalidated', generatedAt: new Date().toISOString(),
                              tool: activeTool.title, inputs: vals, outputs: output,
                              warning: 'Demonstration formulas. Not a certified engineering or carbon audit.'
                            });
                            playSound(680);
                          }}
                          className="w-full py-2.5 rounded-xl bg-teal hover:bg-teal-dark text-white font-manrope font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Export Simulation Run</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex items-center justify-between ${
              isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#141A26] border-[#1F293D]'
            }`}>
              <span className={`text-xs font-mono ${isLight ? 'text-[#64748B]' : 'text-white/40'}`}>
                Illustrative calculations — independent validation pending
              </span>
              <button
                onClick={() => setActiveToolId(null)}
                className="px-5 py-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 font-manrope font-bold text-xs transition-colors cursor-pointer"
              >
                Close Tool
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SECTION 5: FAQS SECTION (CENTER ALIGNED) ── */}
      <FAQSection 
        title="Tools & Micro-Simulators FAQs"
        subtitle="Addressing physical kinetics, mathematical solvers, and institutional assurance parameters"
        faqs={toolsFaqs}
      />

      {/* ── SECTION 6: PRE-FOOTER BANNER (CENTER ALIGNED) ── */}
      <PreFooterBanner 
        tag="INTEGRATED CLIMATE SUITE"
        title="Deploy Tool Outputs in the National Decarbonization Sandbox"
        subtitle="Combine micro-simulator findings with macroeconomic 8,760h grid models to evaluate whole-economy transition strategies."
        primaryCtaText="Launch Decarbonization Sandbox"
        primaryCtaLink="/simulator"
        secondaryCtaText="Download Research Publications"
        secondaryCtaLink="/publications"
      />

    </div>
  );
};
