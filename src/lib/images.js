const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY || "";
const GOOGLE_KEY   = import.meta.env.VITE_GOOGLE_MAPS_KEY || "";

export function geoapifyStaticUrl(
  lat,
  lon,
  { zoom = 16, width = 640, height = 360, markerColor = "blue", scale = 2, style = "osm-bright" } = {}
) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !GEOAPIFY_KEY) return "";
  const marker = `lonlat:${lon},${lat};color:${markerColor}`;
  const p = new URLSearchParams({
    style,
    width: String(width),
    height: String(height),
    center: `lonlat:${lon},${lat}`,
    zoom: String(zoom),
    scale: String(scale),
    marker,
    apiKey: GEOAPIFY_KEY
  });
  return `https://maps.geoapify.com/v1/staticmap?${p.toString()}`;
}

export function streetViewStaticUrl(
  lat,
  lon,
  { fov = 90, heading = 0, pitch = 0, radius = 50, width = 640, height = 360, scale = 2 } = {}
) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !GOOGLE_KEY) return "";
  const p = new URLSearchParams({
    size: `${width}x${height}`,
    location: `${lat},${lon}`,
    fov: String(fov),
    heading: String(heading),
    pitch: String(pitch),
    radius: String(radius),
    scale: String(scale),
    key: GOOGLE_KEY
  });
  return `https://maps.googleapis.com/maps/api/streetview?${p.toString()}`;
}

export function bestListingImage(lat, lon, opts = {}) {
  const street = streetViewStaticUrl(lat, lon, opts);
  if (street) return street;
  const map = geoapifyStaticUrl(lat, lon, opts);
  if (map) return map;
  return fallbackMapUrl(opts);
}

export function streetMapUrl(lat, lon, zoom = 15) {
  const map = geoapifyStaticUrl(lat, lon, { zoom });
  return map || fallbackMapUrl();
}

export function fallbackMapUrl({ width = 640, height = 360, text = "Map unavailable" } = {}) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
    `<rect width='100%' height='100%' fill='#eef2f7'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#64748b' font-family='system-ui, sans-serif' font-size='16'>${text}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}