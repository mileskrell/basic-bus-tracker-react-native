const BASE_URL = "https://transloc-api-1-2.p.rapidapi.com";
const TRANSLOC_KEY = "get ur own";
const AGENCY = 1323;

// a circle of 1,000 meters around (40.505, -74.445)
const GEO_AREA = encodeURIComponent("40.505,-74.445|4000");

const requestInit = {
  // eslint-disable-next-line no-undef
  headers: new Headers({
    "X-RapidAPI-Host": "transloc-api-1-2.p.rapidapi.com",
    "X-RapidAPI-Key": TRANSLOC_KEY
  })
};

export async function fetchTransLocArrivalEstimates() {
  return (await (await fetch(
    `${BASE_URL}/arrival-estimates.json?agencies=${AGENCY}&geo_area=${GEO_AREA}`,
    requestInit
  )).json()).data;
}

export async function fetchTransLocRoutes() {
  return (await (await fetch(
    `${BASE_URL}/routes.json?agencies=${AGENCY}&geo_area=${GEO_AREA}`,
    requestInit
  )).json()).data[AGENCY];
}

export async function fetchTransLocStops() {
  return (await (await fetch(
    `${BASE_URL}/stops.json?agencies=${AGENCY}&geo_area=${GEO_AREA}`,
    requestInit
  )).json()).data;
}
