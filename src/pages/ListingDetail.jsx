import { useLocation, useParams, Link } from 'react-router-dom'
import { Card, Button, Badge } from 'react-bootstrap'
import { streetMapUrl } from '../lib/images.js'
import { getShortlist, toggleShortlist, isShortlisted } from '../lib/storage.js'
import { useState } from 'react'

export default function ListingDetail() {
  const [showing] = useState(false) 
  const { id } = useParams()
  const location = useLocation()
  const item = location.state?.item || getShortlist().items.find(x => x.id === id)?.data
  if (!item) return (
    <div>
      <p className="text-danger">Listing not found. Please go back to Home and open Details again.</p>
      <Button as={Link} to="/">Back to Home</Button>
    </div>
  )

  const saved = isShortlisted(item.id)
  function toggle(){ toggleShortlist(item) }

  const subject = encodeURIComponent(`Inquiry about ${item.name || item.formattedAddress}`)
  const body = encodeURIComponent([
    `Hi, I'm interested in ${item.name || item.formattedAddress}.`,
    '',
    `Link: ${item.url || window.location.href}`,
    '— Sent from RentReady'
  ].join('\n'))
  const mailto = `mailto:?subject=${subject}&body=${body}`
  const openMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.formattedAddress)}`

  return (
    <Card className="border-0 shadow-sm">
      <div className="ratio ratio-16x9 bg-light rounded-top">
        <img
          src={streetMapUrl(item.latitude, item.longitude, 17)}
          className="object-fit-cover rounded-top"
          alt={`Map of ${item.formattedAddress}`}
        />
      </div>
      <Card.Body>
        <Card.Title className="fs-4">{item.name || item.formattedAddress}</Card.Title>
        <div className="text-muted mb-2">{item.formattedAddress}</div>
        <div className="mb-3">
          {typeof item.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
          {typeof item.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
          {item.price && <Badge bg="dark">${item.price.toLocaleString?.() || item.price}</Badge>}
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Button as={Link} to="/" variant="outline-primary">Back</Button>
          <Button onClick={toggle} variant={saved ? 'success' : 'outline-success'}>{saved ? 'Saved' : 'Save'}</Button>
          <Button as="a" href={mailto} variant="outline-secondary">Email inquiry</Button>
          <Button as="a" href={openMaps} target="_blank" rel="noreferrer" variant="outline-secondary">Open in Maps</Button>
          {item.url && <Button as="a" href={item.url} target="_blank" rel="noreferrer" variant="outline-secondary">Visit website</Button>}
        </div>
      </Card.Body>
    </Card>
  )
}
