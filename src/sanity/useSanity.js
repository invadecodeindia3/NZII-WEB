import { useState, useEffect } from "react";
import { client } from "./client";

/**
 * Universal React hook for fetching Sanity data.
 * If Sanity has data, it uses Sanity data.
 * If Sanity is empty or loading fails, it seamlessly returns the fallback data.
 * Zero layout shift, zero crashes.
 */
export function useSanity(query, params = {}, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    client
      .fetch(query, params)
      .then((res) => {
        if (!isMounted) return;
        if (res && (!Array.isArray(res) || res.length > 0)) {
          setData(res);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("[Sanity] Hook using fallback data:", err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { data, loading };
}
