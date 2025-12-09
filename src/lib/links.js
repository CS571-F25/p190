export function googleMapsHref({ latitude, longitude, formattedAddress, name }) {
  const hasCoords = Number.isFinite(latitude) && Number.isFinite(longitude);
  if (hasCoords) {
    const lat = Number(latitude).toFixed(6);
    const lon = Number(longitude).toFixed(6);
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`loc:${lat},${lon}`)}${name ? `&query_place=${encodeURIComponent(name)}` : ''}`;
  }
  const q = formattedAddress || name || '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
