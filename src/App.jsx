import { Container, Navbar, Nav } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import Shortlist from './pages/Shortlist.jsx'
import Compare from './pages/Compare.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar expand="lg" sticky="top" className="app-nav shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">RentReady</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/shortlist">Shortlist</Nav.Link>
              <Nav.Link as={Link} to="/compare">Compare</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="app-main">
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/shortlist" element={<Shortlist />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
      </main>
    </>
  )
}
