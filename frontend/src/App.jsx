
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Services from './pages/Services'
import Home from './pages/Home'
import ConnexionPage from './pages/ConnexionPage';
import Expats from './pages/Expats';
import Contact from './pages/Contact';
import AboutPage from './pages/AboutPage';

import './App.css';
import './styles/about.css';
import './styles/services.css';
import './styles/contact.css';
import './styles/connexion.css';
import './styles/expats.css';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/expats" element={<Expats />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />


      </Routes>
    </Router>
  )
}

export default App
