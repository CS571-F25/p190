// import { Card, Button } from 'react-bootstrap';
// import { streetMapUrl } from '../lib/images.js';
// import { listCompareItems, toggleCompareItem, clearCompare } from '../lib/compare.js';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function CompareHand() {
//   const [items, setItems] = useState(() => listCompareItems());

//   useEffect(() => {
//     const sync = () => setItems(listCompareItems());
//     window.addEventListener('compare_changed', sync);
//     window.addEventListener('storage', sync);
//     window.addEventListener('focus', sync);
//     return () => {
//       window.removeEventListener('compare_changed', sync);
//       window.removeEventListener('storage', sync);
//       window.removeEventListener('focus', sync);
//     };
//   }, []);

//   if (items.length === 0) return null;

//   const remove = (it) => {
//     toggleCompareItem(it);
//     setItems(listCompareItems());
//   };

//   return (
//     <div className="mb-3">
//       <div className="d-flex align-items-center justify-content-between mb-2">
//         <h3 className="h6 mb-0">Currently comparing</h3>
//         <div className="d-flex gap-2">
//           <Button as={Link} to="/compare" variant="primary" size="sm" disabled={items.length < 2}>
//             Compare Now
//           </Button>
//           <Button variant="outline-secondary" size="sm" onClick={() => { clearCompare(); setItems([]); }}>
//             Clear
//           </Button>
//         </div>
//       </div>
//       <div className="d-flex gap-3 flex-wrap">
//         {items.map(it => (
//           <Card key={it.id} className="border-0 shadow-sm" style={{width: 220}}>
//             <div className="ratio ratio-16x9 bg-light">
//               <img src={streetMapUrl(it.latitude, it.longitude)} className="object-fit-cover" />
//             </div>
//             <Card.Body className="p-2">
//               <div className="small fw-semibold text-truncate">{it.name || it.formattedAddress}</div>
//               <div className="small text-muted text-truncate">{it.formattedAddress}</div>
//               <Button
//                 className="mt-2 w-100"
//                 size="sm"
//                 variant="outline-secondary"
//                 onClick={() => remove(it)}
//               >
//                 Remove
//               </Button>
//             </Card.Body>
//           </Card>
//         ))}
//         {items.length === 1 && (
//           <Card className="border-0 shadow-sm d-flex align-items-center justify-content-center" style={{width: 220, minHeight: 140}}>
//             <div className="text-muted small">Pick one more…</div>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }
