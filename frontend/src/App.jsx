import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Services from './pages/Services';
import Home from './pages/Home';
import ConnexionPage from './pages/ConnexionPage';
import Expats from './pages/Expats';
import Contact from './pages/Contact';
import AboutPage from './pages/AboutPage';
import InscriptionPage from './pages/InscriptionPage';
import AdminPanel from './pages/AdminPanel';
import NotFoundPage from './pages/NotFoundPage';
import Messages from './pages/Messages';

import './App.css';
import './styles/about.css';
import './styles/services.css';
import './styles/contact.css';
import './styles/connexion.css';
import './styles/expats.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/connexion" element={<ConnexionPage />} />
            <Route path="/expats" element={<Expats />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/dashboard/chat" element={<Messages />} /> */}
            <Route path="/inscription" element={<InscriptionPage />} />
            {/* <Route path="/admin/users" element={<AdminPanel />} /> */}
            {/* always last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;