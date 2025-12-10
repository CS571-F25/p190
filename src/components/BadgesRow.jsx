export default function BadgesRow({ bedrooms, bathrooms, price, compact = false }) {
  const beds =
    Number.isFinite(bedrooms)
      ? compact
        ? `${bedrooms} bd`
        : `${bedrooms} bed${bedrooms === 1 ? '' : 's'}`
      : null;

  const baths =
    Number.isFinite(bathrooms)
      ? compact
        ? `${bathrooms} ba`
        : `${bathrooms} bath${bathrooms === 1 ? '' : 's'}`
      : null;

  return (
    <div className="d-flex gap-2 mb-2">
      {beds && (
        <span className="badge bg-secondary" title={`${beds}`}>
          {beds}
        </span>
      )}
      {baths && (
        <span className="badge bg-secondary" title={`${baths}`}>
          {baths}
        </span>
      )}
      {price != null && (
        <span className="badge bg-dark" title="Monthly rent">{price}</span>
      )}
    </div>
  );
}
