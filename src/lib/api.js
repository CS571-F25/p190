// const RC_KEY = import.meta.env.VITE_RENTCAST_KEY

// function normalize(listing, index = 0) {
//   const id = listing.listingId || `${listing.formattedAddress}-${listing.latitude}-${listing.longitude}-${index}`
//   return {
//     id,
//     formattedAddress: listing.formattedAddress,
//     latitude: listing.latitude,
//     longitude: listing.longitude,
//     bedrooms: listing.bedrooms,
//     bathrooms: listing.bathrooms,
//     price: listing.price,
//     propertyType: listing.propertyType || 'Apartment',
//     status: listing.status || 'Active',
//     listedDate: listing.listedDate || null
//   }
// }

// export async function fetchListings({ city = 'Madison', state = 'WI', limit = 24, offset = 0 }) {
//   if (RC_KEY) {
//     const url = `https://api.rentcast.io/v1/listings/rental/long-term?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&limit=${limit}&offset=${offset}`
//     const res = await fetch(url, { headers: { 'X-Api-Key': RC_KEY } })
//     if (!res.ok) throw new Error('RentCast request failed')
//     const data = await res.json()
//     const arr = Array.isArray(data) ? data : (data.listings || data.results || [])
//     return arr.map(normalize)
//   } else {
//     const res = await fetch('/p190/mock-listings.json')
//     const data = await res.json()
//     return data.map(normalize)
//   }
// }
const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY

function normalize(el, i = 0, city = '', state = '') {
  const props = el.properties || {}
  const id = props.place_id || `${props.name || 'apt'}-${props.lat}-${props.lon}-${i}`
  const name = props.name || 'Apartment Building'
  const addr = [props.housenumber, props.street, props.city || city, props.state || state]
    .filter(Boolean).join(', ')
  return {
    id,
    name,
    formattedAddress: addr || props.formatted || name,
    latitude: props.lat,
    longitude: props.lon,
    bedrooms: undefined,
    bathrooms: undefined,
    price: undefined,
    priceTier: '',
    rating: undefined,
    reviewCount: undefined,
    propertyType: props.category || 'Apartments',
    status: 'Active',
    listedDate: null,
    url: props.website || props.datasource?.raw?.website || null,
    phone: props.contact?.phone || props.datasource?.raw?.phone || null,
    imageUrl: null
  }
}

async function geocodeCityState(city, state) {
  const qs = new URLSearchParams({ text: `${city}, ${state}`, limit: '1', apiKey: GEOAPIFY_KEY || '' })
  const res = await fetch(`https://api.geoapify.com/v1/geocode/search?${qs}`)
  if (!res.ok) throw new Error('Geoapify geocoding failed')
  const data = await res.json()
  const f = data.features?.[0]
  if (!f) return null
  return { bbox: f.bbox, center: { lat: f.properties.lat, lon: f.properties.lon } }
}

export async function fetchListings({ city = 'Madison', state = 'WI', limit = 24, offset = 0 } = {}) {
  if (!GEOAPIFY_KEY) {
    throw new Error('Missing VITE_GEOAPIFY_KEY.')
  }

  const geo = await geocodeCityState(city, state)
  if (!geo || !geo.bbox) return []
  const [minLon, minLat, maxLon, maxLat] = geo.bbox

  const categories = [
    'accommodation.apartment',
    'building.residential',
    'building.dormitory',
    'building.accommodation'
  ].join(',')

  const qs = new URLSearchParams({
    categories,
    filter: `rect:${minLon},${minLat},${maxLon},${maxLat}`,
    bias: `proximity:${geo.center.lon},${geo.center.lat}`,
    limit: String(limit + offset),
    apiKey: GEOAPIFY_KEY
  })

  const url = `https://api.geoapify.com/v2/places?${qs}`
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Geoapify places failed (${res.status}): ${text || res.statusText}`)
  }
  const data = await res.json()
  const features = data.features || []
  const items = features.map((el, i) => normalize(el, i, city, state))
  return items.slice(offset, offset + limit)
}