import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function HeaderNav() {
  const { pathname } = useLocation()
  return (
    <Navbar
      expand="lg"
      className="bg-white border-bottom shadow-sm sticky-top"
      style={{ top: 0, zIndex: 1020 }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">RentReady</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav activeKey={pathname} className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shortlist">Shortlist</Nav.Link>
            <Nav.Link as={Link} to="/compare">Compare</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
