import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import menuIcon from '../assets/menu.png';
import exitIcon from '../assets/exit.png';
import '../App.css';

const Header = () => {
     const { t } = useTranslation();
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
                         <li><a draggable="false" href="/home">{t('header_home')}</a></li>
                         <li><a draggable="false" href="/services">{t('header_services')}</a></li>
                         <li><a draggable="false" href="/expats">{t('header_expats')}</a></li>
                         <li><a draggable="false" href="/contact">{t('header_contact')}</a></li>
                         <li><a draggable="false" href="/about">{t('header_about')}</a></li>
                         {/* {isLoggedIn && <li><a draggable="false" href="/dashboard/chat">Dashboard</a></li>} */}
                    </ul>
                    <button className="menu-button" onClick={toggleMenu}>
                         <img draggable="false" src={menuIcon} alt="Menu" />
                    </button>

                    <button
                         className='connexion-btn'
                         onClick={handleAuthClick}
                    >
                         {isLoggedIn ? t('header_logout') : t('header_login')}
                    </button>

                    {isMenuOpen && (
                         <button className="exit-button" onClick={toggleMenu}>
                              <img draggable="false" src={exitIcon} alt="Exit" />
                         </button>
                    )}

                    {showLogoutConfirm && (
                         <div className="logout-confirm-overlay">
                              <div className={`logout-confirm-popup ${isFadingOut ? 'fade-out' : ''}`}>
                                   <p>{t('logout_confirm_message')}</p>
                                   <button className="confirm-btn" onClick={confirmLogout}>{t('logout_confirm_yes')}</button>
                                   <button className="cancel-btn" onClick={cancelLogout}>{t('logout_confirm_no')}</button>
                              </div>
                         </div>
                    )}
               </header>
          </div>
     );
};

export default Header;