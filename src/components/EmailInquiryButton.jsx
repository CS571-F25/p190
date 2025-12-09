import { Button } from 'react-bootstrap'

export default function EmailInquiryButton({ item, subject, body, variant = 'outline-secondary', size, className }) {
  const s = subject || `Inquiry about ${item?.name || item?.formattedAddress || 'listing'}`
  const b = body || [
    `Hi, I'm interested in ${item?.name || item?.formattedAddress || 'this listing'}.`,
    '',
    `Listing link: ${item?.url || window.location.href}`,
    '— Sent from RentReady'
  ].join('\n')
  const href = `mailto:?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`
  return (
    <Button as="a" href={href} variant={variant} size={size} className={className}>
      Email inquiry
    </Button>
  )
}
