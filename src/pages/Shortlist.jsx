import { useMemo, useState } from 'react'
import { Row, Col, Card, Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { streetMapUrl, fallbackMapUrl } from '../lib/images.js'
import { listShortlist, clearShortlist, removeFromShortlist } from '../lib/storage.js'
import EmptyState from '../components/EmptyState.jsx'
import ExportCsvButton from '../components/ExportCsvButton.jsx'

export default function Shortlist() {
  const [items, setItems] = useState(() => listShortlist())
  const sorted = useMemo(() => items.slice(), [items])

  function onClear() { clearShortlist(); setItems([]) }
  function onRemove(id) { removeFromShortlist(id); setItems(listShortlist()) }

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <h1 className="h4 mb-0">Shortlist</h1>

        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            size="sm"
            id="sort-shortlist"
            aria-label="Sort shortlist"
          >
            Sort
          </Dropdown.Toggle>
          <Dropdown.Menu aria-labelledby="sort-shortlist">
            <Dropdown.Item onClick={() =>
              setItems(prev => prev.slice().sort((a,b)=> (a.name||'').localeCompare(b.name||'')))
            }>
              Name (A→Z)
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>
              setItems(prev => prev.slice().sort((a,b)=> (b.name||'').localeCompare(a.name||'')))
            }>
              Name (Z→A)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ExportCsvButton items={items} filename="shortlist.csv" />
        <Button size="sm" variant="outline-danger" onClick={onClear}>Clear</Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState>Nothing saved yet. Go to Home and press “Save”.</EmptyState>
      ) : (
        <Row className="row-spaced g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
          {sorted.map(it => (
            <Col key={it.id}>
              <Card className="h-100 shadow-sm">
                <div className="ratio ratio-16x9 bg-light rounded-top">
                  <img
                    src={streetMapUrl(it.latitude, it.longitude)}
                    onError={(e) => { e.currentTarget.src = fallbackMapUrl() }}
                    className="object-fit-cover rounded-top w-100 h-100"
                    alt=""
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h2" className="fs-6 text-wrap">
                    {it.name || it.formattedAddress}
                  </Card.Title>
                  <div className="text-muted small mb-2 text-wrap">{it.formattedAddress}</div>

                  <div className="mt-auto d-flex flex-column flex-sm-row flex-wrap gap-2 w-100">
                    <Button
                      as={Link}
                      to={`/listing/${encodeURIComponent(it.id)}`}
                      state={{ item: it }}
                      size="sm"
                      variant="outline-primary"
                    >
                      Details
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => onRemove(it.id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
