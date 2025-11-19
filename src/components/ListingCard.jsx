import { Card, Button, Badge, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { streetMapUrl } from '../lib/images.js'
import { isShortlisted, toggleShortlist } from '../lib/storage.js'
import { useToaster } from './Toaster.jsx'

export default function ListingCard({ item, compare, onToggleCompare }) {
  const toast = useToaster()
  const saved = isShortlisted(item.id)
  function toggleSave() {
    const now = toggleShortlist(item)
    toast(now ? 'Saved to Shortlist' : 'Removed from Shortlist', now ? 'success' : 'secondary')
  }

  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="ratio ratio-16x9 bg-light rounded-top">
        <img
          src={streetMapUrl(item.latitude, item.longitude)}
          className="object-fit-cover rounded-top"
          alt={`Exterior of ${item.formattedAddress}`}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{item.name || item.formattedAddress}</Card.Title>
        <div className="text-muted small mb-2">{item.formattedAddress}</div>
        <Card.Text className="mb-2">
          {typeof item.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
          {typeof item.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
          {item.price && <Badge bg="dark">${item.price.toLocaleString?.() || item.price}</Badge>}
        </Card.Text>
        <div className="mt-auto d-flex gap-2 align-items-center">
          <Button as={Link} to={`/listing/${encodeURIComponent(item.id)}`} state={{ item }} variant="outline-primary" size="sm">Details</Button>
          <Button onClick={toggleSave} variant={saved ? 'success' : 'outline-success'} size="sm">
            {saved ? 'Saved' : 'Save'}
          </Button>
          {typeof compare !== 'undefined' && (
            <Form.Check
              type="checkbox"
              checked={!!compare[item.id]}
              onChange={() => onToggleCompare(item)}
              label="Compare"
            />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
