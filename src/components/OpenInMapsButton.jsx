import { Button } from 'react-bootstrap';

function fmt(n) { return (Number.isFinite(n) ? Number(n).toFixed(6) : null); }

export default function OpenInMapsButton({ lat, lon, address, size="sm", className="" }) {
  const latStr = fmt(lat), lonStr = fmt(lon);
  const query = (latStr && lonStr)
    ? `${latStr},${lonStr}`               
    : encodeURIComponent(address || "");        

  const href = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <Button
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary"
      size={size}
      className={className}
    >
      Open in Maps
    </Button>
  );
}