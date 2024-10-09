
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Services from './pages/Services'
import Home from './pages/Home'
import ConnexionPage from './pages/ConnexionPage';
import Expats from './pages/Expats';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/expats" element={<Expats />} />


      </Routes>
    </Router>
  )
}

export default App
