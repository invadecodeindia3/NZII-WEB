// Refreshes the snapshot of India's emissions used on the V4 Home page (src/v4/data/indiaEmissions.json).
// Sources: Climate TRACE public API (https://climatetrace.org) for emissions; World Bank (SP.POP.TOTL) for population. The page also refreshes the latest year live in
// the browser; this snapshot is what shows first and what remains if the API cannot be reached.
//
//   node scripts/fetch-india-emissions.mjs
//
// If the API fails, the existing snapshot is left untouched.
import { writeFileSync } from 'node:fs';

const API = 'https://api.climatetrace.org/v6/country/emissions';
const GAS = 'co2e_100yr';
const FIRST_YEAR = 2015;
export const SECTORS = {
  power: 'Power',
  manufacturing: 'Manufacturing',
  agriculture: 'Agriculture',
  transportation: 'Transport',
  'fossil-fuel-operations': 'Fossil fuel operations',
  waste: 'Waste',
  buildings: 'Buildings',
  'mineral-extraction': 'Mineral extraction',
  'forestry-and-land-use': 'Forestry & land use',
  'fluorinated-gases': 'Fluorinated gases',
};

const get = async (params) => {
  const res = await fetch(`${API}?countries=IND&${params}`);
  if (!res.ok) throw new Error(`${res.status} for ${params}`);
  const rows = await res.json();
  return rows[0] || null;
};

const thisYear = new Date().getFullYear();
const series = [];
let latest = null;
for (let y = FIRST_YEAR; y < thisYear; y++) {
  const row = await get(`since=${y}&to=${y}`);
  if (!row || !row.emissions[GAS]) continue;
  series.push({ year: y, total: row.emissions[GAS] });
  latest = { year: y, row };
}
if (!latest) throw new Error('No data returned; snapshot left as it was.');

const sectors = [];
for (const [id, label] of Object.entries(SECTORS)) {
  const row = await get(`since=${latest.year}&to=${latest.year}&sectors=${id}`);
  sectors.push({ id, label, value: row ? row.emissions[GAS] : 0 });
}
sectors.sort((a, b) => b.value - a.value);

// Population for the same year (or the newest year the World Bank has), for the per-person figures
const POP = 'https://api.worldbank.org/v2/country/IND;WLD/indicator/SP.POP.TOTL';
const popRes = await fetch(`${POP}?format=json&date=${latest.year - 3}:${latest.year}&per_page=50`);
if (!popRes.ok) throw new Error(`World Bank ${popRes.status}`);
const popRows = (await popRes.json())[1].filter((r) => r.value);
const popYear = Math.max(...popRows.filter((r) => r.countryiso3code === 'IND').map((r) => +r.date));
const popOf = (iso) => popRows.find((r) => r.countryiso3code === iso && +r.date === popYear).value;
const population = { source: 'World Bank', sourceUrl: 'https://data.worldbank.org/indicator/SP.POP.TOTL', year: popYear, india: popOf('IND'), world: popOf('WLD') };

const out = {
  source: 'Climate TRACE',
  sourceUrl: 'https://climatetrace.org/explore',
  api: API,
  fetchedAt: new Date().toISOString().slice(0, 10),
  unit: 'tonnes CO2e (100-year GWP)',
  latestYear: latest.year,
  total: latest.row.emissions[GAS],
  co2: latest.row.emissions.co2,
  worldTotal: latest.row.worldEmissions[GAS],
  rank: latest.row.rank,
  population,
  series,
  sectors,
};
writeFileSync(new URL('../src/v4/data/indiaEmissions.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
const sum = sectors.reduce((s, x) => s + x.value, 0);
console.log(`India ${out.latestYear}: ${(out.total / 1e9).toFixed(2)} Gt CO2e, rank ${out.rank}, ${((out.total / out.worldTotal) * 100).toFixed(1)}% of world; sectors sum ${(sum / 1e9).toFixed(2)} Gt`);
console.log(`Per person (${population.year} population): India ${(out.total / population.india).toFixed(2)} t, world ${(out.worldTotal / population.world).toFixed(2)} t`);
console.log(series.map((s) => `${s.year}:${(s.total / 1e9).toFixed(2)}`).join('  '));
console.log(sectors.map((s) => `${s.label} ${(s.value / 1e9).toFixed(3)}`).join(' | '));
