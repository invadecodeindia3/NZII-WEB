import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "bz23ff6t";
export const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2024-03-01";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // fast response via edge cache
  apiVersion,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

/**
 * Safe fetch helper: returns fallback data if Sanity query fails or returns empty.
 */
export async function safeFetch(query, params = {}, fallback = null) {
  try {
    const data = await client.fetch(query, params);
    if (data && (!Array.isArray(data) || data.length > 0)) {
      return data;
    }
    return fallback;
  } catch (err) {
    console.warn("[Sanity] safeFetch fallback used:", err.message);
    return fallback;
  }
}

