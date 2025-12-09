// import { useLocation, useParams, Link } from 'react-router-dom'
// import { Card, Button } from 'react-bootstrap'
// import { listShortlist, toggleShortlist, isShortlisted } from '../lib/storage.js'
// import { useState } from 'react'
// import MapImage from '../components/MapImage.jsx'
// import OpenInMapsButton from '../components/OpenInMapsButton.jsx'
// import AddressBlock from '../components/AddressBlock.jsx'
// import BadgesRow from '../components/BadgesRow.jsx'
// import EmailInquiryButton from '../components/EmailInquiryButton.jsx'

// export default function ListingDetail() {
//   const { id } = useParams()
//   const location = useLocation()
//   const fallback = listShortlist().find(x => String(x.id) === String(id))
//   const item = location.state?.item || fallback

//   if (!item) {
//     return (
//       <div>
//         <p className="text-danger">Listing isn't found. Please go back to Home and open Details again.</p>
//         <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
//       </div>
//     )
//   }

//   const [saved, setSaved] = useState(() => isShortlisted(item.id))
//   function onToggleSave() { const now = toggleShortlist(item); setSaved(now) }

//   return (
//     <Card className="border-0 shadow-sm">
//       <div className="ratio ratio-16x9 bg-light rounded-top">
//         <MapImage lat={item.latitude} lon={item.longitude} zoom={17} alt={`Map of ${item.formattedAddress}`} className="object-fit-cover rounded-top w-100 h-100" />
//       </div>
//       <Card.Body>
//         <AddressBlock titleClass="fs-4" title={item.name || item.formattedAddress} address={item.formattedAddress} />
//         <BadgesRow bedrooms={item.bedrooms} bathrooms={item.bathrooms} price={item.price} />
//         <div className="d-flex gap-2 flex-wrap">
//           <Button as={Link} to="/" variant="outline-primary">Back</Button>
//           <Button onClick={onToggleSave} variant={saved ? 'success' : 'outline-success'}>{saved ? 'Saved' : 'Save'}</Button>
//           <EmailInquiryButton item={item} />
//           <OpenInMapsButton lat={item.latitude} lon={item.longitude} address={item.formattedAddress} />
//           {item.url && <Button as="a" href={item.url} target="_blank" rel="noopener noreferrer" variant="outline-secondary">Visit website</Button>}
//         </div>
//       </Card.Body>
//     </Card>
//   )
// }


import { useLocation, useParams, Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { listShortlist, toggleShortlist, isShortlisted } from '../lib/storage.js'
import { useState } from 'react'
import MapImage from '../components/MapImage.jsx'
import OpenInMapsButton from '../components/OpenInMapsButton.jsx'
import AddressBlock from '../components/AddressBlock.jsx'
import BadgesRow from '../components/BadgesRow.jsx'
import EmailInquiryButton from '../components/EmailInquiryButton.jsx'

export default function ListingDetail() {
  const { id } = useParams()
  const location = useLocation()
  const fallback = listShortlist().find(x => String(x.id) === String(id))
  const item = location.state?.item || fallback

  if (!item) {
    return (
      <div>
        <p className="text-danger">Listing isn't found. Please go back to Home and open Details again.</p>
        <Button as={Link} to="/" variant="outline-primary">Back to Home</Button>
      </div>
    )
  }

  const [saved, setSaved] = useState(() => isShortlisted(item.id))
  function onToggleSave() { const now = toggleShortlist(item); setSaved(now) }

  return (
    <>
      <h1 className="visually-hidden">Listing Details</h1>

      <Card className="border-0 shadow-sm">
        <div className="ratio ratio-16x9 bg-light rounded-top">
          <MapImage
            lat={item.latitude}
            lon={item.longitude}
            zoom={17}
            alt={`Map of ${item.formattedAddress}`}
            className="object-fit-cover rounded-top w-100 h-100"
          />
        </div>

        <Card.Body>
          <AddressBlock
            titleClass="fs-4"
            title={item.name || item.formattedAddress}
            address={item.formattedAddress}
          />
          <BadgesRow bedrooms={item.bedrooms} bathrooms={item.bathrooms} price={item.price} />

          <div className="d-flex gap-2 flex-wrap">
            <Button as={Link} to="/" variant="outline-primary">Back</Button>
            <Button onClick={onToggleSave} variant={saved ? 'success' : 'outline-success'}>
              {saved ? 'Saved' : 'Save'}
            </Button>
            <EmailInquiryButton item={item} />
            <OpenInMapsButton
              lat={item.latitude}
              lon={item.longitude}
              address={item.formattedAddress}
            />
            {item.url && (
              <Button
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-secondary"
              >
                Visit website
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
