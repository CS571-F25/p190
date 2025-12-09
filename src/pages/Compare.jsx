import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Card, Button, Alert, Table } from 'react-bootstrap'
import { listCompareItems, clearCompare } from '../lib/compare.js'
import { streetMapUrl } from '../lib/images.js'
import { Link } from 'react-router-dom'

export default function Compare() {
  const [items, setItems] = useState(() => listCompareItems())

  useEffect(() => {
    const sync = () => setItems(listCompareItems())
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const [a, b] = useMemo(() => [items[0], items[1]], [items])

  const onClear = () => { clearCompare(); setItems([]) }

  return (
    <div>
      <h1 className="h4 mb-3">Compare</h1>

      {!a && !b && (
        <Alert variant="secondary" className="mb-4">
          Pick two listings on <Alert.Link as={Link} to="/">Home</Alert.Link> using the
          “Compare” checkbox. Your selections will appear here automatically.
        </Alert>
      )}

      <Row className="g-3 mb-4">
        {[a, b].map((it, idx) => (
          <Col xs={12} md={6} key={idx}>
            {!it ? (
              <Card className="h-100 shadow-sm">
                <div className="ratio ratio-16x9 bg-light rounded-top d-flex align-items-center justify-content-center text-muted">
                  Slot {idx ? 'B' : 'A'} — not selected
                </div>
                <Card.Body>
                  <div className="text-muted small">
                    Go to <Link to="/">Home</Link> and tick “Compare” on a listing.
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="h-100 shadow-sm">
                <div className="ratio ratio-16x9 bg-light rounded-top">
                  <img
                    src={streetMapUrl(it.latitude, it.longitude)}
                    className="object-fit-cover rounded-top"
                    alt={`Map of ${it.name || it.formattedAddress || it.id}`}
                  />
                </div>
                <Card.Body>
                  <Card.Title as="h3" className="fs-5">
                    {it.name || it.formattedAddress}
                  </Card.Title>
                  <div className="text-muted small mb-2">{it.formattedAddress}</div>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/listing/${encodeURIComponent(it.id)}`}
                      state={{ item: it }}
                      variant="outline-primary"
                      size="sm"
                    >
                      Details
                    </Button>
                    {it.latitude && it.longitude && (
                      <Button
                        as="a"
                        href={`https://www.google.com/maps?q=${it.latitude},${it.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline-secondary"
                        size="sm"
                      >
                        Open in Google Maps
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>

      {(a || b) && (
        <Table bordered size="sm" className="bg-white">
          <thead>
            <tr>
              <th scope="col" style={{ width: 220 }}>Field</th>
              <th scope="col">A</th>
              <th scope="col">B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Address</th>
              <td>{a?.formattedAddress || '—'}</td>
              <td>{b?.formattedAddress || '—'}</td>
            </tr>
            <tr>
              <th scope="row">Bedrooms</th>
              <td>{a?.bedrooms ?? '—'}</td>
              <td>{b?.bedrooms ?? '—'}</td>
            </tr>
            <tr>
              <th scope="row">Bathrooms</th>
              <td>{a?.bathrooms ?? '—'}</td>
              <td>{b?.bathrooms ?? '—'}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td>{a?.price ?? '—'}</td>
              <td>{b?.price ?? '—'}</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>{a?.type || 'Apartments'}</td>
              <td>{b?.type || 'Apartments'}</td>
            </tr>
          </tbody>
        </Table>
      )}

      <div className="d-flex gap-2 mt-3">
        <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
        <Button variant="outline-danger" onClick={onClear}>Clear Compare</Button>
      </div>
    </div>
  )
}
