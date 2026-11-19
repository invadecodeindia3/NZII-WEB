import { useEffect, useState } from 'react';
import snapshot from '../data/indiaEmissions.json';

const GAS = 'co2e_100yr';
// Climate TRACE's country total leaves out forestry and land use, so the sector list does too.
const LISTED = (s) => s.id !== 'forestry-and-land-use';

const shape = (d, live) => ({
  ...d,
  sectors: d.sectors.filter(LISTED),
  live,
  // tonnes of CO2e per person, using the population year in the snapshot
  perPerson: { india: d.total / d.population.india, world: d.worldTotal / d.population.world },
});

// the live answer is fetched once per page load and shared by every component that asks
let shared = null;

/**
 * India's emissions from Climate TRACE. Starts from the saved snapshot (refreshed by
 * `node scripts/fetch-india-emissions.mjs`) and then asks the public API for the newest full year, so the
 * page shows the latest published figures without a redeploy. If the API cannot be reached the snapshot stays.
 */
export const useIndiaEmissions = () => {
  const [data, setData] = useState(() => shape(snapshot, false));

  useEffect(() => {
    let dead = false;
    const get = async (params) => {
      const res = await fetch(`${snapshot.api}?countries=IND&${params}`);
      if (!res.ok) throw new Error(String(res.status));
      return (await res.json())[0] || null;
    };
    shared = shared || (async () => {
      try {
        // newest full year the source has: last calendar year, or the one before early in the year
        let year = new Date().getFullYear() - 1;
        let row = await get(`since=${year}&to=${year}`);
        if (!row || !row.emissions[GAS]) {
          year -= 1;
          row = await get(`since=${year}&to=${year}`);
        }
        if (!row || !row.emissions[GAS] || year < snapshot.latestYear) return null;
        const sectors = await Promise.all(
          snapshot.sectors.map(async (s) => {
            const r = await get(`since=${year}&to=${year}&sectors=${s.id}`);
            return { ...s, value: r ? r.emissions[GAS] : 0 };
          }),
        );
        const series = [...snapshot.series.filter((p) => p.year !== year), { year, total: row.emissions[GAS] }].sort((a, b) => a.year - b.year);
        return (
          shape(
            {
              ...snapshot,
              fetchedAt: new Date().toISOString().slice(0, 10),
              latestYear: year,
              total: row.emissions[GAS],
              co2: row.emissions.co2,
              worldTotal: row.worldEmissions[GAS],
              rank: row.rank,
              series,
              sectors: sectors.sort((a, b) => b.value - a.value),
            },
            true,
          )
        );
      } catch {
        return null; // keep the snapshot
      }
    })();
    shared.then((fresh) => {
      if (fresh && !dead) setData(fresh);
    });
    return () => {
      dead = true;
    };
  }, []);

  return data;
};
