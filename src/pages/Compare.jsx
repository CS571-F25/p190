// import { useEffect, useMemo, useState } from 'react'
// import { Row, Col, Card, Badge, Button } from 'react-bootstrap'
// import { listCompareItems, setCompareMap } from '../lib/compare.js'
// import { streetViewUrl, fallbackMapUrl } from '../lib/images.js'
// import { Link } from 'react-router-dom'

// export default function Compare() {
//   const [items, setItems] = useState(() => listCompareItems())

//   useEffect(() => {
//     const sync = () => setItems(listCompareItems())
//     window.addEventListener('focus', sync)
//     return () => window.removeEventListener('focus', sync)
//   }, [])

//   const [a, b] = useMemo(() => [items[0], items[1]], [items])

//   function clear() {
//     setCompareMap({})
//     setItems([])
//   }

//   return (
//     <div>
//       <h2 className="h4 mb-3">Compare</h2>
//       <Row className="g-3">
//         {[a, b].map((it, idx) => (
//           <Col xs={12} md={6} key={idx}>
//             {!it ? (
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body className="text-muted">Slot {idx ? 'B' : 'A'} is empty. Choose two on Home.</Card.Body>
//               </Card>
//             ) : (
//               <Card className="h-100 border-0 shadow-sm">
//                 <div className="ratio ratio-16x9 bg-light rounded-top">
//                   <img
//                     src={streetViewUrl(it.latitude, it.longitude)}
//                     className="object-fit-cover rounded-top"
//                     alt={`Photo of ${it.name || it.formattedAddress}`}
//                     onError={(e)=>{ e.currentTarget.src = fallbackMapUrl(it.latitude, it.longitude) }}
//                   />
//                 </div>
//                 <Card.Body>
//                   <Card.Title className="fs-5">{it.name || it.formattedAddress}</Card.Title>
//                   <div className="text-muted small mb-2">{it.formattedAddress}</div>
//                   <div className="mb-2">
//                     {typeof it.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
//                     {typeof it.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
//                     {it.priceTier && <Badge bg="dark">${it.priceTier.length}</Badge>}
//                   </div>
//                   <div className="d-flex gap-2">
//                     <Button as={Link} to={`/listing/${encodeURIComponent(it.id)}`} state={{ item: it }} variant="outline-primary" size="sm">Details</Button>
//                     {it.url && <Button as="a" href={it.url} target="_blank" rel="noreferrer" variant="outline-secondary" size="sm">View</Button>}
//                   </div>
//                 </Card.Body>
//               </Card>
//             )}
//           </Col>
//         ))}
//       </Row>

//       <div className="d-flex gap-2 mt-3">
//         <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
//         <Button variant="outline-danger" onClick={clear}>Clear Compare</Button>
//       </div>
//     </div>
//   )
// }

import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { listCompareItems, setCompareMap } from '../lib/compare.js'
import { streetMapUrl, fallbackMapUrl } from '../lib/images.js'
import { Link } from 'react-router-dom'

export default function Compare() {
  const [items, setItems] = useState(() => listCompareItems())

  useEffect(() => {
    const sync = () => setItems(listCompareItems())
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  const [a, b] = useMemo(() => [items[0], items[1]], [items])

  function clear() {
    setCompareMap({})
    setItems([])
  }

  return (
    <div>
      <h2 className="h4 mb-3">Compare</h2>
      <Row className="g-3">
        {[a, b].map((it, idx) => (
          <Col xs={12} md={6} key={idx}>
            {!it ? (
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-muted">Slot {idx ? 'B' : 'A'} is empty. Choose two on Home.</Card.Body>
              </Card>
            ) : (
              <Card className="h-100 border-0 shadow-sm">
                <div className="ratio ratio-16x9 bg-light rounded-top">
                  <img
                    src={streetMapUrl(it.latitude, it.longitude)}
                    className="object-fit-cover rounded-top"
                    alt={`Photo of ${it.name || it.formattedAddress}`}
                    onError={(e)=>{ e.currentTarget.src = fallbackMapUrl(it.latitude, it.longitude) }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fs-5">{it.name || it.formattedAddress}</Card.Title>
                  <div className="text-muted small mb-2">{it.formattedAddress}</div>
                  <div className="mb-2">
                    {typeof it.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
                    {typeof it.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
                    {it.priceTier && <Badge bg="dark">${it.priceTier.length}</Badge>}
                  </div>
                  <div className="d-flex gap-2">
                    <Button as={Link} to={`/listing/${encodeURIComponent(it.id)}`} state={{ item: it }} variant="outline-primary" size="sm">Details</Button>
                    {it.url && <Button as="a" href={it.url} target="_blank" rel="noreferrer" variant="outline-secondary" size="sm">View</Button>}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>

      <div className="d-flex gap-2 mt-3">
        <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
        <Button variant="outline-danger" onClick={clear}>Clear Compare</Button>
      </div>
    </div>
  )
}
