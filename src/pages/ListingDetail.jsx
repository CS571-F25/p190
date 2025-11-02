import { useLocation, useParams, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Card, Button, Badge, Modal, Form } from 'react-bootstrap'
import { streetViewUrl } from '../lib/images.js'
import { getShortlist, toggleShortlist, isShortlisted } from '../lib/storage.js'

export default function ListingDetail() {
  const { id } = useParams()
  const location = useLocation()
  
  const item = location.state?.item || getShortlist().items.find(x => x.id === id)?.data


  if (!item) {
    return (
      <div>
        <p className="text-danger">Listing not found. Please go back to the home page and open Details again.</p>
        <Button as={Link} to="/">Back to Home</Button>
      </div>
    )
  }

  const title = item.name || item.formattedAddress || 'Listing'
  const imgSrc = useMemo(() => {
   
    if (item.imageUrl) return item.imageUrl
    if (item.latitude && item.longitude) return streetViewUrl(item.latitude, item.longitude)
    return 'https://via.placeholder.com/640x400?text=No+Image'
  }, [item])

  const saved = isShortlisted(item.id)
  function toggleSave() { toggleShortlist(item) }

  // --- Inquiry modal state ---
  const [showInquiry, setShowInquiry] = useState(false)
  const [inqName, setInqName] = useState('')
  const [inqEmail, setInqEmail] = useState('')
  const [inqMsg, setInqMsg] = useState('')

  function openInquiry() { setShowInquiry(true) }
  function closeInquiry() { setShowInquiry(false) }

  function mailtoHref() {
    const subject = encodeURIComponent(`Inquiry about ${title}`)
    const lines = [
      `Hi, I'm interested in ${title}.`,
      '',
      item.url ? `Link: ${item.url}` : `Listing ID: ${item.id}`,
      inqName ? `Name: ${inqName}` : '',
      inqEmail ? `Email: ${inqEmail}` : '',
      '',
      '— Sent from RentReady'
    ].filter(Boolean)
    const body = encodeURIComponent(lines.join('\n'))
    // leave "to" blank; user's default mail app opens a compose window
    return `mailto:?subject=${subject}&body=${body}`
  }

  function submitInquiry(e) {
    e.preventDefault()
    window.location.href = mailtoHref()
    closeInquiry()
  }

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={imgSrc}
          alt={`Photo of ${title}`}
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/640x400?text=No+Image' }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>

          {/* Badges for BOTH possible data shapes */}
          <Card.Text className="mb-2">
            {/* RentCast badges */}
            {typeof item.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">{item.bedrooms} bd</Badge>}
            {typeof item.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">{item.bathrooms} ba</Badge>}
            {typeof item.price !== 'undefined' && Number(item.price) > 0 && (
              <Badge bg="dark" className="me-2">${item.price?.toLocaleString?.() || item.price}</Badge>
            )}
            {/* Yelp badges */}
            {item.rating ? <Badge bg="warning" text="dark" className="me-2">★ {item.rating}</Badge> : null}
            {item.priceTier ? <Badge bg="secondary" className="me-2">{item.priceTier}</Badge> : null}
          </Card.Text>

          {/* Meta lines (show only if present) */}
          {item.formattedAddress && <p className="text-muted mb-1"><strong>Address:</strong> {item.formattedAddress}</p>}
          {item.propertyType && <p className="text-muted mb-1"><strong>Type:</strong> {item.propertyType}</p>}
          {item.status && <p className="text-muted mb-1"><strong>Status:</strong> {item.status}</p>}
          {item.listedDate && (
            <p className="text-muted mb-1">
              <strong>Listed:</strong> {new Date(item.listedDate).toLocaleDateString()}
            </p>
          )}
          {item.phone && <p className="text-muted mb-1"><strong>Phone:</strong> {item.phone}</p>}

          {/* Actions */}
          <div className="d-flex flex-wrap gap-2 mt-3">
            <Button variant={saved ? 'success' : 'outline-success'} onClick={toggleSave}>
              {saved ? 'Saved' : 'Save to Shortlist'}
            </Button>
            <Button as={Link} to="/shortlist" variant="outline-primary">Go to Shortlist</Button>
            <Button variant="primary" onClick={openInquiry}>Contact</Button>
            {item.url && (
              <Button variant="outline-secondary" as="a" href={item.url} target="_blank" rel="noreferrer">
                View Listing
              </Button>
            )}
            {item.phone && (
              <Button variant="outline-secondary" as="a" href={`tel:${item.phone.replace(/\D/g, '')}`}>
                Call
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Inquiry Modal */}
      <Modal show={showInquiry} onHide={closeInquiry}>
        <Modal.Header closeButton>
          <Modal.Title>Contact about {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitInquiry}>
            <Form.Group className="mb-2">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                placeholder="Jane Doe"
                value={inqName}
                onChange={e => setInqName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Your email</Form.Label>
              <Form.Control
                type="email"
                placeholder="jane@wisc.edu"
                value={inqEmail}
                onChange={e => setInqEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder={`Hi, I'm interested in ${title}. Can you share availability and next steps?`}
                value={inqMsg}
                onChange={e => setInqMsg(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={closeInquiry}>Cancel</Button>
              <Button type="submit" variant="primary">Send Email</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
