const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const query = searchParams.get("q");
  const state = searchParams.get("state");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!type || !query || query.trim().length < 3) {
    return Response.json([]);
  }

  const cacheKey = JSON.stringify({ type, query, state, lat, lon });
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return Response.json(cached.data);
  }

  let url =
    `${NOMINATIM_BASE}?format=json` +
    `&countrycodes=in` +
    `&limit=6` +
    `&addressdetails=1`;

  // ✅ STATE SEARCH (FIXED)
  if (type === "state") {
    url += `&q=${encodeURIComponent(query + ", India")}`;
  }

  // ✅ CITY SEARCH (STATE-AWARE)
  if (type === "city") {
    if (!state) return Response.json([]);

    url += `&q=${encodeURIComponent(query + ", " + state + ", India")}`;
  }

  // ✅ LOCALITY SEARCH (CITY-BOUND)
  if (type === "locality") {
    if (!lat || !lon) return Response.json([]);

    url +=
      `&q=${encodeURIComponent(query)}` +
      `&lat=${lat}&lon=${lon}` +
      `&bounded=1`;
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "NeedsGenie/1.0 (contact@needsginie.com)",
      "Accept-Language": "en",
    },
  });

  const data = await res.json();

  let result = [];

  if (type === "state") {
    result = data
      .filter((i) => i.address?.state)
      .map((i) => i.address.state)
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  if (type === "city") {
    result = data
      .filter((i) => i.address?.city || i.address?.town)
      .map((i) => ({
        label: i.address.city || i.address.town,
        lat: i.lat,
        lon: i.lon,
      }));
  }

  if (type === "locality") {
    result = data
      .filter(
        (i) =>
          i.address?.suburb ||
          i.address?.neighbourhood ||
          i.address?.quarter
      )
      .map((i) => i.display_name);
  }

  cache.set(cacheKey, { time: Date.now(), data: result });

  return Response.json(result);
}
