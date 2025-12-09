import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CompareBadge({ count }) {
  if (!count) return null;
  return (
    <Button
      as={Link}
      to="/compare"
      variant="primary"
      className="position-fixed bottom-0 end-0 m-3 shadow"
    >
      Compare ({count})
    </Button>
  );
}
