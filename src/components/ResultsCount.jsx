export default function ResultsCount({ total, visible }) {
  if (typeof total !== 'number') return null;
  const msg = visible && visible < total
    ? `${visible} of ${total} results`
    : `${total} result${total === 1 ? '' : 's'}`;
  return <p className="text-muted small mb-2" aria-live="polite">{msg}</p>;
}
