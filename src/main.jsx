import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toaster from './components/Toaster.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Toaster>
      <App />
    </Toaster> 
  </HashRouter>
)
