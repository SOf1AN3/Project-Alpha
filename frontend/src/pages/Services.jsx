import { useRef, useState, useEffect } from 'react'
import Cards from '../components/Cards'
import Header from '../components/Header'
import backgroundImage from '../assets/background.jpg'

const Services = () => {
     return (
          <div className="services-wrapper">
               <div
                    className="background-fixe"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
               ></div>
               <Header />
               <Cards />
          </div>
     )
}

export default Services