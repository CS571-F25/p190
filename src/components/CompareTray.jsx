import { useEffect, useState } from 'react'
import { Button, Card, Badge } from 'react-bootstrap'
import { listCompareItems, setCompareMap } from '../lib/compare.js'
import { streetMapUrl, fallbackMapUrl } from '../lib/images.js'
import { Link } from 'react-router-dom'

export default function CompareTray() {
  const [items, setItems] = useState(() => listCompareItems())
  useEffect(() => {
    const sync = () => setItems(listCompareItems())
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const count = items.length
  if (count === 0) return null

  const [a, b] = [items[0], items[1] ?? null]

  function clearTray() {
    setCompareMap({})
    setItems([])
  }

  return (
    <div className="rr-compare-tray shadow-lg border-top bg-white">
      <div className="container py-2 d-flex align-items-center gap-3">
        <strong className="me-2">Compare</strong>
        { [a,b].map((it, idx) => (
          <div key={idx} className="rr-compare-thumb">
            {it ? (
              <Card className="h-100 border-0">
                <div className="ratio ratio-4x3 bg-light rounded">
                  <img
                    src={streetMapUrl(it.latitude, it.longitude, 15)}
                    className="object-fit-cover rounded"
                    alt={`Preview of ${it.name || it.formattedAddress}`}
                    onError={(e)=>{ e.currentTarget.src = fallbackMapUrl(it.latitude, it.longitude) }}
                  />
                </div>
                <div className="small mt-1 text-truncate" title={it.name || it.formattedAddress}>
                  {it.name || it.formattedAddress}
                </div>
              </Card>
            ) : (
              <div className="rr-compare-slot placeholder-glow">
                <span className="placeholder col-12" />
                <div className="small text-muted mt-1">Pick one…</div>
              </div>
            )}
          </div>
        ))}

        <div className="ms-auto d-flex gap-2">
          <Button as={Link} to="/compare" variant="primary" disabled={count < 2}>
            Compare Now
          </Button>
          <Button variant="outline-secondary" onClick={clearTray}>Clear</Button>
        </div>
      </div>
    </div>
  )
}
