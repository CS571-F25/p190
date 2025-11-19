import { useEffect, useState, useMemo } from 'react'
import { Row, Col, Button, Dropdown, Alert } from 'react-bootstrap'
import ListingCard from '../components/ListingCard.jsx'
import { getShortlist, setShortlist } from '../lib/storage.js'

function toCSV(rows){
  const heads = ['id','name','formattedAddress','latitude','longitude','price']
  const esc = v => `"${String(v ?? '').replaceAll('"','""')}"`
  return [heads.join(','), ...rows.map(r => heads.map(h => esc(r[h])).join(','))].join('\n')
}

export default function Shortlist(){
  const [items, setItems] = useState(() => getShortlist().items.map(x => x.data))

  useEffect(() => {
    const sync = () => setItems(getShortlist().items.map(x => x.data))
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  const [sortBy, setSortBy] = useState('name')
  const sorted = useMemo(() => {
    const v = items.slice()
    if (sortBy === 'name') v.sort((a,b)=> (a.name||a.formattedAddress||'').localeCompare(b.name||b.formattedAddress||''))
    else v.sort((a,b)=> (a.price ?? 0) - (b.price ?? 0))
    return v
  }, [items, sortBy])

  function clearAll(){
    setShortlist({ items: [] })
    setItems([])
  }
  function exportCSV(){
    const csv = toCSV(sorted)
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'shortlist.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">Shortlist</h2>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">Sort</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>setSortBy('name')}>Name</Dropdown.Item>
              <Dropdown.Item onClick={()=>setSortBy('price')}>Price</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-success" size="sm" onClick={exportCSV}>Export CSV</Button>
          <Button variant="outline-danger" size="sm" onClick={clearAll}>Clear</Button>
        </div>
      </div>

      {sorted.length === 0 && <Alert variant="secondary">Nothing saved yet. Go to Home and press “Save”.</Alert>}

      <Row xs={1} sm={2} md={3} lg={3} className="g-3">
        {sorted.map(item => (
          <Col key={item.id}>
            <ListingCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
