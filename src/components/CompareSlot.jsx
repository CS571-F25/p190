import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { streetMapUrl, fallbackMapUrl } from '../lib/images.js'

export default function CompareSlot({ item, slotLabel }) {
  if (!item) {
    return (
      <Card className="h-100 border-0 shadow-sm">
        <Card.Body className="text-muted">Slot {slotLabel} is empty. Choose two on Home.</Card.Body>
      </Card>
    )
  }

  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="ratio ratio-16x9 bg-light rounded-top">
        <img
          src={streetMapUrl(item.latitude, item.longitude)}
          className="object-fit-cover rounded-top"
          alt={`Photo of ${item.name || item.formattedAddress}`}
          onError={(e)=>{ e.currentTarget.src = fallbackMapUrl(item.latitude, item.longitude) }}
        />
      </div>
      <Card.Body>
        <Card.Title className="fs-5">{item.name || item.formattedAddress}</Card.Title>
        <div className="text-muted small mb-2">{item.formattedAddress}</div>
        <div className="mb-2">
          {typeof item.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
          {typeof item.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
          {item.price && <Badge bg="dark">${item.price.toLocaleString?.() || item.price}</Badge>}
        </div>
        <div className="d-flex gap-2">
          <Button
            as={Link}
            to={`/listing/${encodeURIComponent(item.id)}`}
            state={{ item }}
            variant="outline-primary"
            size="sm"
          >
            Details
          </Button>
          {item.url && (
            <Button as="a" href={item.url} target="_blank" rel="noreferrer" variant="outline-secondary" size="sm">
              View
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
