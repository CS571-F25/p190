import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { listCompareItems, setCompareMap } from '../lib/compare.js'
import { Link } from 'react-router-dom'
import CompareSlot from '../components/CompareSlot.jsx'

export default function Compare() {
  const [items, setItems] = useState(() => listCompareItems())

  useEffect(() => {
    const sync = () => setItems(listCompareItems())
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  const [a, b] = useMemo(() => [items[0], items[1]], [items])

  function clear() { setCompareMap({}); setItems([]) }

  return (
    <div>
      <h2 className="h4 mb-3">Compare</h2>
      <Row className="g-3">
        <Col xs={12} md={6}><CompareSlot item={a} slotLabel="A" /></Col>
        <Col xs={12} md={6}><CompareSlot item={b} slotLabel="B" /></Col>
      </Row>

      <div className="d-flex gap-2 mt-3">
        <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
        <Button variant="outline-danger" onClick={clear}>Clear Compare</Button>
      </div>
    </div>
  )
}
