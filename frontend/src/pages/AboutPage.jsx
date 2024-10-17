import React from 'react'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import '../styles/expats.css'
import contactVideo from '../assets/expats-cmp.mp4'
import Footer from '../components/Footer'

const AboutPage = () => {
     return (
          <>
               <div className="relative min-h-screen">
                    <video
                         autoPlay
                         loop
                         muted
                         className="background-expats"
                    >
                         <source src={contactVideo} type="video/mp4" />
                         Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10">
                         <Header />
                         <AboutUs />
                    </div>
                    <Footer />
               </div>

          </>
     )
}

export default AboutPage