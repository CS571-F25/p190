// const GEOAPIFY_KEY =
//   import.meta.env?.VITE_GEOAPIFY_KEY ||
//   (typeof localStorage !== 'undefined' && localStorage.getItem('VITE_GEOAPIFY_KEY')) ||
//   (typeof window !== 'undefined' && window.__GEOAPIFY_KEY__) ||
//   ''

// export function streetViewUrl(lat, lng) {
//   if (!lat || !lng) return 'https://via.placeholder.com/640x400?text=No+Image'
//   if (GEOAPIFY_KEY) {
//     const w = 640, h = 400, zoom = 16
//     const marker = `lonlat:${lng},${lat};color:%23ff4d4f;size:medium`
//     return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=${w}&height=${h}&center=lonlat:${lng},${lat}&zoom=${zoom}&marker=${encodeURIComponent(marker)}&apiKey=${GEOAPIFY_KEY}`
//   }
//   return fallbackMapUrl(lat, lng)
// }

// export function fallbackMapUrl(lat, lng) {
//   if (!lat || !lng) return 'https://via.placeholder.com/640x400?text=No+Image'
//   const zoom = 16
//   return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=640x400&markers=${lat},${lng},lightblue1`
// }
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
