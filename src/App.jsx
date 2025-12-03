// import { Container, Navbar, Nav } from 'react-bootstrap'
// import { Routes, Route, Link } from 'react-router-dom'
// import Home from './pages/Home.jsx'
// import ListingDetail from './pages/ListingDetail.jsx'
// import Shortlist from './pages/Shortlist.jsx'
// import Compare from './pages/Compare.jsx'
// import './App.css'
// import HeaderNav from './components/HeaderNav.jsx'
// import CompareTray from './components/CompareTray.jsx'

// export default function App() {
//   return (
//     <>
//       <Navbar bg="light" expand="lg" className="border-bottom">
//         <Container>
//           <Navbar.Brand as={Link} to="/">RentReady</Navbar.Brand>
//           <Navbar.Toggle />
//           <Navbar.Collapse>
//             <Nav className="me-auto">
//               <Nav.Link as={Link} to="/">Home</Nav.Link>
//               <Nav.Link as={Link} to="/shortlist">Shortlist</Nav.Link>
//               <Nav.Link as={Link} to="/compare">Compare</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container className="py-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/listing/:id" element={<ListingDetail />} />
//           <Route path="/shortlist" element={<Shortlist />} />
//           <Route path="/compare" element={<Compare />} />
//         </Routes>
//       </Container>
//     </>
//   )
// }


// import { Container } from 'react-bootstrap'
// import { Routes, Route } from 'react-router-dom'

// import HeaderNav from './components/HeaderNav.jsx'
// import CompareTray from './components/CompareTray.jsx'
// import Toaster from './components/Toaster.jsx'

// import Home from './pages/Home.jsx'
// import ListingDetail from './pages/ListingDetail.jsx'
// import Shortlist from './pages/Shortlist.jsx'
// import Compare from './pages/Compare.jsx'

// import './App.css'

// export default function App() {
//   return (
//     <Toaster>
//       <HeaderNav />


//       <Container className="py-4 mb-5">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/listing/:id" element={<ListingDetail />} />
//           <Route path="/shortlist" element={<Shortlist />} />
//           <Route path="/compare" element={<Compare />} />
//         </Routes>
//       </Container>

//       <CompareTray />
//     </Toaster>
//   )
// }


import { Container } from 'react-bootstrap'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import Shortlist from './pages/Shortlist.jsx'
import Compare from './pages/Compare.jsx'
import './App.css'
import HeaderNav from './components/HeaderNav.jsx'
import CompareTray from './components/CompareTray.jsx'

export default function App() {
  const location = useLocation()
  const onCompare =
    location.pathname === '/compare' ||
    (location.hash && location.hash.includes('/compare'))

  return (
    <>
      <HeaderNav />

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/shortlist" element={<Shortlist />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </Container>
      {!onCompare && <CompareTray />}
    </>
  )
}
