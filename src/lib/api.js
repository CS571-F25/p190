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
    // priceTier: '',
    // rating: undefined,
    // reviewCount: undefined,
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

function haversineMeters(lat1, lon1, lat2, lon2) {
  if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return Infinity
  const R = 6371000
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function geocodeAddressBest(address) {
  const qs = new URLSearchParams({ text: address, limit: '1', apiKey: GEOAPIFY_KEY || '' })
  const res = await fetch(`https://api.geoapify.com/v1/geocode/search?${qs}`)
  if (!res.ok) return null
  const data = await res.json()
  const f = data.features?.[0]?.properties
  if (!f) return null
  return { lat: f.lat, lon: f.lon }
}

const ACCURACY_CACHE_KEY = 'rr_geo_accuracy_v1'
function readAccuracyCache() {
  try { return JSON.parse(localStorage.getItem(ACCURACY_CACHE_KEY) || '{}') } catch { return {} }
}
function writeAccuracyCache(m) {
  localStorage.setItem(ACCURACY_CACHE_KEY, JSON.stringify(m))
}

async function isAccurateListing(item, thresholdMeters = 60) {
  const cache = readAccuracyCache()
  const key = String(item.id)
  if (key in cache) return !!cache[key]
  const best = await geocodeAddressBest(item.formattedAddress)
  const ok = !!best && haversineMeters(item.latitude, item.longitude, best.lat, best.lon) <= thresholdMeters
  cache[key] = ok
  writeAccuracyCache(cache)
  return ok
}

export async function fetchListings({
  city = 'Madison',
  state = 'WI',
  limit = 24,
  offset = 0,
  validateAccurate = true,
  accuracyThresholdMeters = 60,
  maxValidate = 60
} = {}) {
  if (!GEOAPIFY_KEY) throw new Error('Missing VITE_GEOAPIFY_KEY.')

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
  let items = features.map((el, i) => normalize(el, i, city, state)).slice(offset, offset + limit)

  if (!validateAccurate) return items

  const toCheck = items.slice(0, maxValidate)
  const results = await Promise.allSettled(
    toCheck.map(it => isAccurateListing(it, accuracyThresholdMeters))
  )
  const accurateIds = new Set()
  results.forEach((r, i) => { if (r.status === 'fulfilled' && r.value) accurateIds.add(toCheck[i].id) })
  items = items.filter(it => accurateIds.has(it.id))

  return items
}
