import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import menuIcon from '../assets/menu.png';
import exitIcon from '../assets/exit.png';
import '../App.css';

const Header = () => {
     const [isMenuOpen, setMenuOpen] = useState(false);
     const { isLoggedIn, logout } = useAuth();
     const navigate = useNavigate();

     const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
     };

     const handleAuthClick = async () => {
          if (isLoggedIn) {
               try {
                    await logout();
                    navigate('/home');
               } catch (error) {
                    console.error('Erreur lors de la déconnexion:', error);
               }
          } else {
               navigate('/connexion');
          }
     };

     return (
          <div className='no-select'>
               <header className={isMenuOpen ? 'show-menu menu-open' : ''}>
                    <a draggable="false" href="/home">
                         <h5 className='logo-text'>Tiberium</h5>
                    </a>
                    <ul className="header-list">
                         <li><a draggable="false" href="/home">Home</a></li>
                         <li><a draggable="false" href="/services">Services</a></li>
                         <li><a draggable="false" href="/expats">Expats</a></li>
                         <li><a draggable="false" href="/contact">Contact Us</a></li>
                         <li><a draggable="false" href="/about">About Us</a></li>
                    </ul>
                    <button className="menu-button" onClick={toggleMenu}>
                         <img draggable="false" src={menuIcon} alt="Menu" />
                    </button>

                    <button
                         className='connexion-btn'
                         onClick={handleAuthClick}
                    >
                         {isLoggedIn ? 'Se Déconnecter' : 'Se Connecter'}
                    </button>

                    {isMenuOpen && (
                         <button className="exit-button" onClick={toggleMenu}>
                              <img draggable="false" src={exitIcon} alt="Exit" />
                         </button>
                    )}
               </header>
          </div>
     );
};

export default Header;