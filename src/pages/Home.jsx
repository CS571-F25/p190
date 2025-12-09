import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FiltersBar from '../components/FiltersBar.jsx'
import ListingCard from '../components/ListingCard.jsx'
import { fetchListings } from '../lib/api.js'
import { toggleCompareItem, getCompareMap } from '../lib/compare.js'
import { useToaster } from '../components/Toaster.jsx'
import ErrorNotice from '../components/ErrorNotice.jsx'
import LoadMoreButton from '../components/LoadMoreButton.jsx'
import CompareBadge from '../components/CompareBadge.jsx'
import ResultsCount from '../components/ResultsCount.jsx';

function haversineKm(lat1, lon1, lat2, lon2) {
  if ([lat1, lon1, lat2, lon2].some(v => typeof v !== 'number' || Number.isNaN(v))) return Number.POSITIVE_INFINITY
  const toRad = d => (d * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function Home() {
  const toast = useToaster()
  const [raw, setRaw] = useState([])
  const [status, setStatus] = useState('idle')
  const [err, setErr] = useState('')
  const [compare, setCompare] = useState(() => getCompareMap())
  const [filters, setFilters] = useState({})
  const [visible, setVisible] = useState(12)

  async function load() {
    setStatus('loading'); setErr('')
    try {
      const data = await fetchListings({ city: 'Madison', state: 'WI', limit: 36, offset: 0 })
      setRaw(data); setStatus('done'); setVisible(12)
    } catch (e) { setErr(String(e)); setStatus('error') }
  }
  useEffect(() => { load() }, [])

  const items = useMemo(() => {
    let v = raw.slice()
    const withCoords = v.filter(x => Number.isFinite(x.latitude) && Number.isFinite(x.longitude))
    const center = withCoords.length
      ? { lat: withCoords.reduce((s,x)=>s+x.latitude,0)/withCoords.length, lon: withCoords.reduce((s,x)=>s+x.longitude,0)/withCoords.length }
      : { lat: 0, lon: 0 }
    v = v.map(x => ({ ...x, __distanceKm: haversineKm(center.lat, center.lon, x.latitude, x.longitude) }))
    const q = (filters.search || '').trim().toLowerCase()
    if (q) v = v.filter(x => (x.name||'').toLowerCase().includes(q) || (x.formattedAddress||'').toLowerCase().includes(q))
    const sort = filters.sort_by || 'distance'
    if (sort === 'az') v.sort((a,b)=> (a.name||a.formattedAddress||'').localeCompare(b.name||b.formattedAddress||''))
    else if (sort === 'za') v.sort((a,b)=> (b.name||b.formattedAddress||'').localeCompare(a.name||a.formattedAddress||''))
    else if (sort === 'distance_desc') v.sort((a,b)=> b.__distanceKm - a.__distanceKm)
    else v.sort((a,b)=> a.__distanceKm - b.__distanceKm)
    return v
  }, [raw, filters])

  function applyFilters(obj) { setFilters(obj); setVisible(12) }

  function onToggleCompare(item) {
    if (!compare[item.id] && Object.keys(compare).length >= 2) {
      toast('You can only compare two at a time', 'warning')
      return
    }
    const next = toggleCompareItem(item)
    setCompare(next)
    toast(next[item.id] ? 'Added to Compare' : 'Removed from Compare', next[item.id] ? 'primary' : 'secondary')
  }

  const compareCount = useMemo(() => Object.keys(compare).length, [compare])

  return (
    <div>
      <h1 className="h4 mb-3">Find apartment communities</h1>
      <FiltersBar onApply={applyFilters} />
      {status === 'loading' && <Alert variant="info">Loading listings…</Alert>}
      <ErrorNotice message={status === 'error' ? `Failed to load listings: ${err}` : ''} />
      <ResultsCount total={items.length} visible={visible} />

      <Row className="row-spaced g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
        {items.slice(0, visible).map((item) => (
          <Col key={item.id}>
            <ListingCard item={item} compare={compare} onToggleCompare={onToggleCompare} />
          </Col>
        ))}
      </Row>

      {items.length === 0 && status === 'done' && (
        <Alert className="mt-3" variant="secondary">No results match your filters.</Alert>
      )}

      <LoadMoreButton canLoadMore={visible < items.length} onClick={() => setVisible(v => v + 12)} />
      <CompareBadge count={compareCount} />
    </div>
  )
}
