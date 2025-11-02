import { useEffect, useState } from 'react'
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { streetViewUrl } from '../lib/images.js'
import { getShortlist, setLocal, updateNote } from '../lib/storage.js'

export default function Shortlist() {
  const [s, setS] = useState(getShortlist())

  useEffect(() => {
    const id = setInterval(() => setS(getShortlist()), 400)
    return () => clearInterval(id)
  }, [])

  function remove(id) {
    const next = { items: s.items.filter(x => x.id !== id) }
    setLocal('rr_shortlist', next)
    setS(next)
  }

  function onChangeNote(id, val) {
    updateNote(id, val)
    setS(getShortlist())
  }

  function downloadICS() {
    const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RentReady//EN']
    const now = new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z'
    s.items.forEach((it, idx) => {
      const start = new Date(Date.now() + idx * 3600_000)
      const end = new Date(start.getTime() + 45*60*1000)
      const fmt = d => d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z'
      lines.push('BEGIN:VEVENT',`UID:${it.id}@rentready`,`DTSTAMP:${now}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,`SUMMARY:Tour - ${it.data.formattedAddress}`,`DESCRIPTION:${(it.note||'').replace(/\n/g,' ')}`,'END:VEVENT')
    })
    lines.push('END:VCALENDAR')
    const blob = new Blob([lines.join('\n')], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'rentready-tour.ics'; a.click()
    URL.revokeObjectURL(url)
  }

  if (!s.items.length) return <Alert variant="secondary">No saved places yet.</Alert>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">Your Shortlist</h2>
        <Button variant="outline-primary" onClick={downloadICS}>Export Tour (.ics)</Button>
      </div>
      <Row className="g-3" xs={1} md={2}>
        {s.items.map(it => (
          <Col key={it.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={streetViewUrl(it.data.latitude, it.data.longitude)} alt={`Exterior of ${it.data.formattedAddress}`} />
              <Card.Body>
                <Card.Title className="fs-6">{it.data.formattedAddress}</Card.Title>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-semibold">Note</Form.Label>
                  <Form.Control as="textarea" rows={2} value={it.note} onChange={e => onChangeNote(it.id, e.target.value)} placeholder="e.g., ask about utilities" />
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="outline-danger" onClick={() => remove(it.id)}>Remove</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}