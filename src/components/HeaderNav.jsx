import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function HeaderNav() {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="app-nav shadow-sm"  
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">RentReady</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} end to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shortlist">Shortlist</Nav.Link>
            <Nav.Link as={NavLink} to="/compare">Compare</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
