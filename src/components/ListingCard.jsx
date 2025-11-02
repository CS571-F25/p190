import { Card, Button, Badge, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { streetMapUrl } from '../lib/images.js'
import { isShortlisted, toggleShortlist } from '../lib/storage.js'

export default function ListingCard({ item, compare = {}, onToggleCompare }) {
  const saved = isShortlisted(item.id)
  const title = item.name || item.formattedAddress
  const img = streetMapUrl(item.latitude, item.longitude)

  return (
    <Card className="h-100 shadow-sm border-0 rr-card">
      <div className="ratio ratio-16x9 bg-light rounded-top">
        <img
          src={streetMapUrl(item.latitude, item.longitude)}
          alt={`Exterior of ${item.name || item.formattedAddress}`}
          className="object-fit-cover rounded-top"
          loading="lazy"
          onError={(e)=>{ e.currentTarget.src = 'https://placehold.co/640x400?text=Map+Unavailable' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 mb-1 text-truncate">{title}</Card.Title>
        <div className="text-muted small mb-2 text-truncate">{item.formattedAddress}</div>
        <div className="mb-2">
          {typeof item.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
          {typeof item.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
          {item.priceTier && <Badge bg="dark">${item.priceTier.length}</Badge>}
        </div>
        <div className="mt-auto d-flex gap-2 align-items-center">
          <Button as={Link} to={`/listing/${encodeURIComponent(item.id)}`} state={{ item }} variant="outline-primary" size="sm">Details</Button>
          <Button onClick={() => toggleShortlist(item)} variant={saved ? 'success' : 'outline-success'} size="sm">
            {saved ? 'Saved' : 'Save'}
          </Button>
          <Form.Check
            type="checkbox"
            className="ms-auto"
            label="Compare"
            checked={!!compare[item.id]}
            onChange={() => onToggleCompare(item)}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
