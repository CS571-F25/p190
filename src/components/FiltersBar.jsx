import { Form, Row, Col, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

export default function FiltersBar({ onApply }) {
  const [params, setParams] = useSearchParams()

  const search = params.get('search') || ''
  const sort_by = params.get('sort_by') || 'distance'

  function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const next = new URLSearchParams(params)
    next.set('search', (form.get('search') || '').trim())
    next.set('sort_by', form.get('sort_by') || 'distance')
    setParams(next)
    onApply && onApply(Object.fromEntries(next))
  }

  function reset() {
    const next = new URLSearchParams()
    setParams(next)
    onApply && onApply(Object.fromEntries(next))
  }

  return (
    <Form onSubmit={submit} className="mb-4">
      <Row className="g-3 align-items-end">
        <Col xs={12} md={6}>
          <Form.Label>Search (name or address)</Form.Label>
          <Form.Control
            name="search"
            placeholder="e.g., Langdon, Dayton, Park Regent…"
            defaultValue={search}
          />
        </Col>

        <Col xs={12} md={3}>
          <Form.Label>Sort By</Form.Label>
          <Form.Select name="sort_by" defaultValue={sort_by}>
            <option value="distance">Distance (closest first)</option>
            <option value="distance_desc">Distance (farthest first)</option>
            <option value="az">Name (A → Z)</option>
            <option value="za">Name (Z → A)</option>
          </Form.Select>
        </Col>

        <Col xs="auto" className="d-flex gap-2">
          <Button type="submit" variant="primary">Apply</Button>
          <Button type="button" variant="outline-secondary" onClick={reset}>Reset</Button>
        </Col>
      </Row>
    </Form>
  )
}