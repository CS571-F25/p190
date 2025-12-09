import { useRef, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isShortlisted, toggleShortlist } from '../lib/storage.js'
import { useToaster } from './Toaster.jsx'
import MapImage from './MapImage.jsx'
import OpenInMapsButton from './OpenInMapsButton.jsx'
import AddressBlock from './AddressBlock.jsx'
import BadgesRow from './BadgesRow.jsx'
import { googleMapsHref } from '../lib/links.js'

export default function ListingCard({ item, compare, onToggleCompare }) {
  const toast = useToaster()
  const saveBtnRef = useRef(null)
  const [saved, setSaved] = useState(() => isShortlisted(item.id))

  function toggleSave() {
    const now = toggleShortlist(item)
    setSaved(now)
    toast(
      now ? 'Saved to Shortlist' : 'Removed from Shortlist',
      now ? 'success' : 'secondary',
      saveBtnRef.current
    )
  }

  const hasCoords = Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
  const compareId = `compare-${encodeURIComponent(String(item.id))}`

  return (
    <Card className="h-100 shadow-sm">
      <div className="ratio ratio-16x9 bg-light rounded-top">
        <a
          href={googleMapsHref(item)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.formattedAddress} in Google Maps`}
          className="d-block rounded-top"
          title="Open in Google Maps"
        >
          <MapImage
            lat={item.latitude}
            lon={item.longitude}
            zoom={16}
            alt={`Map of ${item.formattedAddress}`}
            className="object-fit-cover rounded-top w-100 h-100"
          />
        </a>
      </div>

      <Card.Body className="d-flex flex-column">
        <AddressBlock title={item.name || item.formattedAddress} address={item.formattedAddress} />
        <BadgesRow bedrooms={item.bedrooms} bathrooms={item.bathrooms} price={item.price} />

        <div className="mt-auto d-flex gap-2 align-items-center flex-wrap">
          <Button
            as={Link}
            to={`/listing/${encodeURIComponent(item.id)}`}
            state={{ item }}
            variant="outline-primary"
            size="sm"
          >
            Details
          </Button>

          <Button
            ref={saveBtnRef}
            onClick={toggleSave}
            variant={saved ? 'success' : 'outline-success'}
            size="sm"
          >
            {saved ? 'Saved' : 'Save'}
          </Button>

          {hasCoords && (
            <OpenInMapsButton
              lat={item.latitude}
              lon={item.longitude}
              address={item.formattedAddress}
              size="sm"
            />
          )}

          {typeof compare !== 'undefined' && (
            <Form.Check
              id={compareId}
              type="checkbox"
              checked={!!compare[item.id]}
              onChange={() => onToggleCompare(item)}
              label="Compare"
              aria-label={`Select ${item.name || item.formattedAddress} for comparison`}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  )
}



