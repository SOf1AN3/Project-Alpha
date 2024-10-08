import React, { useState } from 'react';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import exitIcon from '../assets/exit.png'; // Import the exit icon
import '../App.css';

const Header = () => {
     const [isMenuOpen, setMenuOpen] = useState(false);

     const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
     };

     return (
          <div className='no-select'>
               <header className={isMenuOpen ? 'show-menu menu-open' : ''}>
                    <a draggable="false" href="/home"><img draggable='false' className="logo" src={logo} alt="Logo" /></a>
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
                    <a draggable="false" className='connexion-btn' href="/connexion">Se Connecter</a>
                    {isMenuOpen && (
                         <button className="exit-button" onClick={toggleMenu}>
                              <img draggable="false" src={exitIcon} alt="Exit" />
                         </button>
                    )}
               </header>
          </div>
     );
}

export default Header;