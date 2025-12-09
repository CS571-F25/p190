import { Button } from "react-bootstrap";
export default function LoadMoreButton({ canLoadMore, onClick }) {
  if (!canLoadMore) return null;
  return (
    <div className="text-center mt-3">
      <Button variant="outline-primary" onClick={onClick}>Load more</Button>
    </div>
  );
}
