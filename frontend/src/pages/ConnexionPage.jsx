import React from 'react'
import Header from '../components/Header'
import Connexion from '../components/Connexion'
import backgroundVideo from '../assets/connexion.mp4'

const ConnexionPage = () => {
     return (
          <>
               <video autoPlay loop muted className="background-connexion">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <Header />
               <Connexion />
          </>
     )
}

export default ConnexionPage