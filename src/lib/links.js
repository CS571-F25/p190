export function googleMapsHref(itemOrLat, lon, address) {
  if (typeof itemOrLat === 'object') {
    const it = itemOrLat;
    if (Number.isFinite(it.latitude) && Number.isFinite(it.longitude)) {
      return `https://www.google.com/maps?q=${it.latitude},${it.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(it.formattedAddress || '')}`;
  }
  if (Number.isFinite(itemOrLat) && Number.isFinite(lon)) {
    return `https://www.google.com/maps?q=${itemOrLat},${lon}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || '')}`;
}