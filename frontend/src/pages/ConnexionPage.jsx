import React from 'react'
import Header from '../components/Header'
import Connexion from '../components/Connexion'
import backgroundVideo from '../assets/expats-cmp.mp4'
import Footer from '../components/Footer'

const ConnexionPage = () => {
     return (
          <>
               <video autoPlay loop muted className="background-connexion">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <Header />
               <Connexion />
               <Footer />
          </>
     )
}

export default ConnexionPage