import React from 'react'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import '../styles/expats.css'
import backgroundImage from '../assets/background.jpg'

const AboutPage = () => {
     return (
          <>
               <div className="relative min-h-screen">
                    <div
                         className="background-fixe"
                         style={{ backgroundImage: `url(${backgroundImage})` }}
                    ></div>
                    <div className="relative z-10">
                         <Header />
                         <AboutUs />
                    </div>
               </div>
          </>
     )
}

export default AboutPage