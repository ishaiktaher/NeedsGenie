export async function searchStates(query) {
  if (!query || query.length < 3) return [];
  const res = await fetch(
    `/api/location-search?type=state&q=${query}`
  );
  return res.json();
}

export async function searchCities(query, state) {
  if (!query || query.length < 3 || !state) return [];
  const res = await fetch(
    `/api/location-search?type=city&q=${query}&state=${state}`
  );
  return res.json();
}

export async function searchLocalities(query, city) {
  if (!query || query.length < 3 || !city?.lat) return [];
  const res = await fetch(
    `/api/location-search?type=locality&q=${query}&lat=${city.lat}&lon=${city.lon}`
  );
  return res.json();
}

