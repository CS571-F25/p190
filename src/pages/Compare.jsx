// import { useEffect, useMemo, useState } from 'react'
// import { Row, Col, Button } from 'react-bootstrap'
// import { listCompareItems, setCompareMap } from '../lib/compare.js'
// import { Link } from 'react-router-dom'
// import CompareSlot from '../components/CompareSlot.jsx'

// export default function Compare() {
//   const [items, setItems] = useState(() => listCompareItems())

//   useEffect(() => {
//     const sync = () => setItems(listCompareItems())
//     window.addEventListener('focus', sync)
//     return () => window.removeEventListener('focus', sync)
//   }, [])

//   const [a, b] = useMemo(() => [items[0], items[1]], [items])

//   function clear() { setCompareMap({}); setItems([]) }

//   return (
//     <div>
//       <h2 className="h4 mb-3">Compare</h2>
//       <Row className="g-3">
//         <Col xs={12} md={6}><CompareSlot item={a} slotLabel="A" /></Col>
//         <Col xs={12} md={6}><CompareSlot item={b} slotLabel="B" /></Col>
//       </Row>

//       <div className="d-flex gap-2 mt-3">
//         <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
//         <Button variant="outline-danger" onClick={clear}>Clear Compare</Button>
//       </div>
//     </div>
//   )
// }


// import { useEffect, useMemo, useState } from 'react'
// import { Row, Col, Card, Badge, Button, Table, Alert } from 'react-bootstrap'
// import { listCompareItems, setCompareMap } from '../lib/compare.js'
// import { streetMapUrl, fallbackMapUrl } from '../lib/images.js'
// import { Link } from 'react-router-dom'

// function diffClass(a, b) {
//   if (a == null && b == null) return ''
//   if (String(a ?? '') === String(b ?? '')) return ''
//   return 'table-warning'
// }

// export default function Compare() {
//   const [items, setItems] = useState(() => listCompareItems())

//   useEffect(() => {
//     const sync = () => setItems(listCompareItems())
//     window.addEventListener('focus', sync)
//     return () => window.removeEventListener('focus', sync)
//   }, [])

//   if (items.length < 2) {
//     return (
//       <Alert variant="secondary">
//         Pick two listings to compare on the Home page. Once selected, use the bottom tray’s **Compare Now** button.
//       </Alert>
//     )
//   }

//   const [A, B] = useMemo(() => [items[0], items[1]], [items])

//   function clear() {
//     setCompareMap({})
//     setItems([])
//   }

//   return (
//     <div>
//       <h2 className="h4 mb-3">Compare</h2>

//       <Row className="g-3">
//         {[A, B].map((it, idx) => (
//           <Col xs={12} md={6} key={idx}>
//             <Card className="h-100 border-0 shadow-sm">
//               <div className="ratio ratio-16x9 bg-light rounded-top">
//                 <img
//                   src={streetMapUrl(it.latitude, it.longitude)}
//                   className="object-fit-cover rounded-top"
//                   alt={`Map preview of ${it.name || it.formattedAddress}`}
//                   onError={(e)=>{ e.currentTarget.src = fallbackMapUrl(it.latitude, it.longitude) }}
//                 />
//               </div>
//               <Card.Body>
//                 <Card.Title className="fs-5">{it.name || it.formattedAddress}</Card.Title>
//                 <div className="text-muted small mb-2">{it.formattedAddress}</div>
//                 <div className="mb-2">
//                   {typeof it.bedrooms !== 'undefined' && <Badge bg="secondary" className="me-2">bd</Badge>}
//                   {typeof it.bathrooms !== 'undefined' && <Badge bg="secondary" className="me-2">ba</Badge>}
//                   {it.price && <Badge bg="dark">${it.price.toLocaleString?.() || it.price}</Badge>}
//                 </div>
//                 <div className="d-flex gap-2">
//                   <Button as={Link} to={`/listing/${encodeURIComponent(it.id)}`} state={{ item: it }} variant="outline-primary" size="sm">
//                     Details
//                   </Button>
//                   <Button
//                     as="a"
//                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(it.formattedAddress)}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     variant="outline-secondary"
//                     size="sm"
//                   >
//                     Open in Google Maps
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Highlighted difference table */}
//       <div className="mt-4">
//         <Table bordered responsive>
//           <thead>
//             <tr>
//               <th>Field</th>
//               <th>A</th>
//               <th>B</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className={diffClass(A.formattedAddress, B.formattedAddress)}>
//               <th>Address</th>
//               <td>{A.formattedAddress}</td>
//               <td>{B.formattedAddress}</td>
//             </tr>
//             <tr className={diffClass(A.bedrooms, B.bedrooms)}>
//               <th>Bedrooms</th>
//               <td>{A.bedrooms ?? '—'}</td>
//               <td>{B.bedrooms ?? '—'}</td>
//             </tr>
//             <tr className={diffClass(A.bathrooms, B.bathrooms)}>
//               <th>Bathrooms</th>
//               <td>{A.bathrooms ?? '—'}</td>
//               <td>{B.bathrooms ?? '—'}</td>
//             </tr>
//             <tr className={diffClass(A.price, B.price)}>
//               <th>Price</th>
//               <td>{A.price ? `$${A.price.toLocaleString?.() || A.price}` : '—'}</td>
//               <td>{B.price ? `$${B.price.toLocaleString?.() || B.price}` : '—'}</td>
//             </tr>
//             <tr className={diffClass(A.propertyType, B.propertyType)}>
//               <th>Type</th>
//               <td>{A.propertyType ?? '—'}</td>
//               <td>{B.propertyType ?? '—'}</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>

//       <div className="d-flex gap-2 mt-3">
//         <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
//         <Button variant="outline-danger" onClick={clear}>Clear Compare</Button>
//       </div>
//     </div>
//   )
// }


import { useEffect, useState, useMemo } from 'react';
import { Button, Card } from 'react-bootstrap';
import { listCompareItems, setCompareMap } from '../lib/compare.js';
import { streetMapUrl } from '../lib/images.js';
import { useLocation, useNavigate } from 'react-router-dom';

const TRAY_HEIGHT = 112;

export default function CompareTray() {
  const [items, setItems] = useState(() => listCompareItems());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setItems(listCompareItems());
    window.addEventListener('storage', sync);
    window.addEventListener('compare:updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('compare:updated', sync);
    };
  }, []);


  const hidden = location.pathname === '/compare' || items.length === 0;

  const thumbs = useMemo(
    () => items.slice(0, 6), 
    [items]
  );

  if (hidden) return null;

  return (
    <>
      
      <div style={{ height: TRAY_HEIGHT }} aria-hidden />

      <div
        role="region"
        aria-label="Compare tray"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: TRAY_HEIGHT,
          background: '#fff',
          borderTop: '1px solid rgba(0,0,0,.1)',
          boxShadow: '0 -6px 16px rgba(0,0,0,.08)',
          zIndex: 1030,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px',
          }}
        >
          <strong className="me-1">Compare</strong>

          <div
            style={{
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              paddingBottom: 4,
              flex: 1,
            }}
          >
            {thumbs.map((it) => (
              <Card key={it.id} style={{ width: 96, minWidth: 96 }}>
                <div className="ratio ratio-1x1 bg-light">
                  <img
                    src={streetMapUrl(it.latitude, it.longitude, 15)}
                    className="object-fit-cover"
                    alt={(it.name || it.formattedAddress || 'Listing') + ' thumbnail'}
                  />
                </div>
                <Card.Body className="p-1">
                  <div
                    className="small text-truncate"
                    title={it.name || it.formattedAddress}
                  >
                    {it.name || it.formattedAddress || 'Apartment B...'}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button
              onClick={() => navigate('/compare')}
              variant="primary"
              size="sm"
            >
              Compare Now
            </Button>
            <Button
              onClick={() => setCompareMap({})}
              variant="light"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
