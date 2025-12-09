import { Badge } from "react-bootstrap";

export default function BadgesRow({ bedrooms, bathrooms, price }) {
  return (
    <div className="mb-2">
      {typeof bedrooms !== "undefined" && <Badge bg="secondary" className="me-2">bd</Badge>}
      {typeof bathrooms !== "undefined" && <Badge bg="secondary" className="me-2">ba</Badge>}
      {price && <Badge bg="dark">${price.toLocaleString?.() || price}</Badge>}
    </div>
  );
}
