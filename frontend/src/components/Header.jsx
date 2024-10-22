import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import menuIcon from '../assets/menu.png';
import exitIcon from '../assets/exit.png';
import '../App.css';

const Header = () => {
     const [isMenuOpen, setMenuOpen] = useState(false);
     const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
     const [isFadingOut, setIsFadingOut] = useState(false);
     const { isLoggedIn, logout } = useAuth();
     const navigate = useNavigate();

     const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
     };

     const handleAuthClick = () => {
          if (isLoggedIn) {
               setShowLogoutConfirm(true);
          } else {
               navigate('/connexion');
          }
     };

     const confirmLogout = async () => {
          try {
               await logout();
               navigate('/home');
          } catch (error) {
               console.error('Erreur lors de la déconnexion:', error);
          } finally {
               setShowLogoutConfirm(false);
          }
     };

     const cancelLogout = () => {
          setIsFadingOut(true);
          setTimeout(() => {
               setShowLogoutConfirm(false);
               setIsFadingOut(false);
          }, 300); // Duration of the fade-out animation
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
                         <li><a draggable="false" href="/contact">Contact</a></li>
                         <li><a draggable="false" href="/about">About</a></li>
                         {isLoggedIn && <li><a draggable="false" href="/dashboard">Dashboard</a></li>}
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

                    {showLogoutConfirm && (
                         <div className="logout-confirm-overlay">
                              <div className={`logout-confirm-popup ${isFadingOut ? 'fade-out' : ''}`}>
                                   <p>Voulez-vous vous déconnecter?</p>
                                   <button className="confirm-btn" onClick={confirmLogout}>Oui</button>
                                   <button className="cancel-btn" onClick={cancelLogout}>Non</button>
                              </div>
                         </div>
                    )}
               </header>
          </div>
     );
};

export default Header;