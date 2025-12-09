import { Card } from "react-bootstrap";
export default function EmptyState({ children }) {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="text-muted">{children}</Card.Body>
    </Card>
  );
}
