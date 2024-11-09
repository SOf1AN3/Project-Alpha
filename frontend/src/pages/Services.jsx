import { useRef, useState, useEffect } from 'react'
import Cards from '../components/Cards'
import Header from '../components/Header'
import backgroundImage from '../assets/background.jpg'
import Footer from '../components/Footer'

const Services = () => {
     return (
          <>
               <div className="services-wrapper">
                    <div
                         className="background-fixe"
                         style={{ backgroundImage: `url(${backgroundImage})` }}
                    ></div>
                    <Header />
                    <Cards />
               </div>
               <footer className='services-footer'>
                    <ul>
                         <li>Tiberium Consulting</li>
                         <li>Copyrights © Tiberium Consulting 2024</li>
                    </ul>
               </footer>
          </>
     )
}

export default Services