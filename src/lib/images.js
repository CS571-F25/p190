const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY

export function streetMapUrl(lat, lng, zoom = 16) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng))
    return 'https://placehold.co/640x400?text=No+Map'

  if (GEO_KEY) {
    const marker = encodeURIComponent(`lonlat:${lng},${lat};color:%23005EB8;size:medium`)
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=640&height=400&center=lonlat:${lng},${lat}&zoom=${zoom}&marker=${marker}&apiKey=${GEO_KEY}`
  }

  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=640x400&markers=${lat},${lng},lightblue1`
}

export const streetViewUrl = streetMapUrl
export function fallbackMapUrl() {
  return 'https://placehold.co/640x400?text=Map+Unavailable'
}
