import { Alert } from "react-bootstrap";
export default function ErrorNotice({ message, variant="danger" }) {
  if (!message) return null;
  return <Alert variant={variant}>{message}</Alert>;
}
