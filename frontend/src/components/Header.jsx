import React, { useState } from 'react';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png'; // Assuming this is the path for menu.png
import '../App.css';

const Header = () => {
     const [isMenuOpen, setMenuOpen] = useState(false);

     const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
     };

     return (
          <header className={isMenuOpen ? 'show-menu' : ''}>
               <a href="/home"><img className="logo" src={logo} alt="Logo" /></a>
               <ul className="header-list">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/expats">Expats</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/about">About Us</a></li>
               </ul>
               <button className="menu-button" onClick={toggleMenu}>
                    <img src={menuIcon} alt="Menu" />
               </button>
               <a href="/connexion"><button className="login-btn">Se Connecter</button></a>
          </header>
     );
}

export default Header;
