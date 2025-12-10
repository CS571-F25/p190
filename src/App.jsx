import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import Shortlist from './pages/Shortlist.jsx'
import Compare from './pages/Compare.jsx'
import HeaderNav from './components/HeaderNav.jsx'   
import './App.css'

export default function App() {
  return (
    <>
      <HeaderNav />                            
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
