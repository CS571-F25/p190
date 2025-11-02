// import { useEffect, useMemo, useState } from 'react'
// import { Row, Col, Alert } from 'react-bootstrap'
// import FiltersBar from '../components/FiltersBar.jsx'
// import ListingCard from '../components/ListingCard.jsx'
// import { fetchListings } from '../lib/api.js'
// import { toggleCompareItem, getCompareMap } from '../lib/compare.js'

// function haversineKm(lat1, lon1, lat2, lon2) {
//   if ([lat1, lon1, lat2, lon2].some(v => typeof v !== 'number' || Number.isNaN(v))) {
//     return Number.POSITIVE_INFINITY
//   }
//   const toRad = d => (d * Math.PI) / 180
//   const R = 6371
//   const dLat = toRad(lat2 - lat1)
//   const dLon = toRad(lon2 - lon1)
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   return R * c
// }

// export default function Home() {
//   const [raw, setRaw] = useState([])
//   const [status, setStatus] = useState('idle')
//   const [err, setErr] = useState('')
//   const [compare, setCompare] = useState(() => getCompareMap())
//   const [filters, setFilters] = useState({}) // { search, sort_by }

//   async function load() {
//     setStatus('loading'); setErr('')
//     try {
//       const data = await fetchListings({ city: 'Madison', state: 'WI', limit: 36, offset: 0 })
//       setRaw(data); setStatus('done')
//     } catch (e) {
//       setErr(String(e)); setStatus('error')
//     }
//   }
//   useEffect(() => { load() }, [])

//   const items = useMemo(() => {
//     let v = raw.slice()

//     // City center ≈ centroid of results
//     const hasCoords = v.filter(x => typeof x.latitude === 'number' && typeof x.longitude === 'number')
//     const center = hasCoords.length
//       ? {
//           lat: hasCoords.reduce((s, x) => s + x.latitude, 0) / hasCoords.length,
//           lon: hasCoords.reduce((s, x) => s + x.longitude, 0) / hasCoords.length
//         }
//       : { lat: 0, lon: 0 }

//     v = v.map(x => ({ ...x, __distanceKm: haversineKm(center.lat, center.lon, x.latitude, x.longitude) }))

//     // Text search
//     const q = (filters.search || '').trim().toLowerCase()
//     if (q) {
//       v = v.filter(x =>
//         (x.name || '').toLowerCase().includes(q) ||
//         (x.formattedAddress || '').toLowerCase().includes(q)
//       )
//     }

//     // Sort
//     const sort = filters.sort_by || 'distance'
//     if (sort === 'az') {
//       v.sort((a, b) => (a.name || a.formattedAddress || '').localeCompare(b.name || b.formattedAddress || ''))
//     } else if (sort === 'za') {
//       v.sort((a, b) => (b.name || b.formattedAddress || '').localeCompare(a.name || a.formattedAddress || ''))
//     } else if (sort === 'distance_desc') {
//       v.sort((a, b) => (b.__distanceKm - a.__distanceKm))
//     } else {
//       v.sort((a, b) => (a.__distanceKm - b.__distanceKm))
//     }

//     return v
//   }, [raw, filters])

//   function applyFilters(obj) { setFilters(obj) }

//   function onToggleCompare(item) {
//     const next = toggleCompareItem(item)
//     setCompare(next)
//   }

//   return (
//     <div>
//       <h2 className="h4 mb-3">Find apartment communities</h2>
//       <FiltersBar onApply={applyFilters} />

//       {status === 'loading' && <Alert variant="info">Loading listings…</Alert>}
//       {status === 'error' && <Alert variant="danger">Failed to load listings: {err}</Alert>}

//       <Row xs={1} sm={2} md={3} lg={3} className="g-3">
//         {items.map((item) => (
//           <Col key={item.id}>
//             <ListingCard item={item} compare={compare} onToggleCompare={onToggleCompare} />
//           </Col>
//         ))}
//       </Row>

//       {items.length === 0 && status === 'done' && (
//         <Alert className="mt-3" variant="secondary">
//           No results match your filters.
//         </Alert>
//       )}
//     </div>
//   )
// }

import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import FiltersBar from '../components/FiltersBar.jsx'
import ListingCard from '../components/ListingCard.jsx'
import { fetchListings } from '../lib/api.js'
import { toggleCompareItem, getCompareMap } from '../lib/compare.js'

function haversineKm(lat1, lon1, lat2, lon2) {
  if ([lat1, lon1, lat2, lon2].some(v => typeof v !== 'number' || Number.isNaN(v))) {
    return Number.POSITIVE_INFINITY
  }
  const toRad = d => (d * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function Home() {
  const [raw, setRaw] = useState([])
  const [status, setStatus] = useState('idle')
  const [err, setErr] = useState('')
  const [compare, setCompare] = useState(() => getCompareMap())
  const [filters, setFilters] = useState({})

  async function load() {
    setStatus('loading'); setErr('')
    try {
      const data = await fetchListings({ city: 'Madison', state: 'WI', limit: 36, offset: 0 })
      setRaw(data); setStatus('done')
    } catch (e) {
      setErr(String(e)); setStatus('error')
    }
  }
  useEffect(() => { load() }, [])

  const items = useMemo(() => {
    let v = raw.slice()
    const hasCoords = v.filter(x => typeof x.latitude === 'number' && typeof x.longitude === 'number')
    const center = hasCoords.length
      ? {
          lat: hasCoords.reduce((s, x) => s + x.latitude, 0) / hasCoords.length,
          lon: hasCoords.reduce((s, x) => s + x.longitude, 0) / hasCoords.length
        }
      : { lat: 0, lon: 0 }
    v = v.map(x => ({ ...x, __distanceKm: haversineKm(center.lat, center.lon, x.latitude, x.longitude) }))

    const q = (filters.search || '').trim().toLowerCase()
    if (q) {
      v = v.filter(x =>
        (x.name || '').toLowerCase().includes(q) ||
        (x.formattedAddress || '').toLowerCase().includes(q)
      )
    }

    const sort = filters.sort_by || 'distance'
    if (sort === 'az') {
      v.sort((a, b) => (a.name || a.formattedAddress || '').localeCompare(b.name || b.formattedAddress || ''))
    } else if (sort === 'za') {
      v.sort((a, b) => (b.name || b.formattedAddress || '').localeCompare(a.name || a.formattedAddress || ''))
    } else if (sort === 'distance_desc') {
      v.sort((a, b) => (b.__distanceKm - a.__distanceKm))
    } else {
      v.sort((a, b) => (a.__distanceKm - b.__distanceKm))
    }

    return v
  }, [raw, filters])

  function applyFilters(obj) { setFilters(obj) }

  function onToggleCompare(item) {
    const next = toggleCompareItem(item)
    setCompare(next)
  }

  return (
    <div>
      <h2 className="h4 mb-3">Find apartment communities</h2>
      <FiltersBar onApply={applyFilters} />
      {status === 'loading' && <Alert variant="info">Loading listings…</Alert>}
      {status === 'error' && <Alert variant="danger">Failed to load listings: {err}</Alert>}

      <Row xs={1} sm={2} md={3} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <ListingCard item={item} compare={compare} onToggleCompare={onToggleCompare} />
          </Col>
        ))}
      </Row>

      {items.length === 0 && status === 'done' && (
        <Alert className="mt-3" variant="secondary">
          No results match your filters.
        </Alert>
      )}
    </div>
  )
}
