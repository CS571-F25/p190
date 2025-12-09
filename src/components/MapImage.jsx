import { streetMapUrl, fallbackMapUrl } from '../lib/images.js';

export default function MapImage({ lat, lon, zoom, alt, className = "" }) {
  const src = streetMapUrl(lat, lon, zoom);
  return (
    <img
      src={src}
      onError={(e) => { e.currentTarget.src = fallbackMapUrl(); }}
      className={className}
      alt={alt || `Map of ${lat}, ${lon}`}
    />
  );
}
