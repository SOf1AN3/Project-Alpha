import React from 'react'
import Header from '../components/Header'
import Connexion from '../components/Connexion'
import backgroundImage from '../assets/background.jpg'
import Footer from '../components/Footer'

const ConnexionPage = () => {
     return (
          <div className="connexion-page">
               <div
                    className="background-fixe"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
               ></div>
               <Header />
               <div className="connexion-content">
                    <Connexion />
               </div>
               <Footer />
          </div>
     )
}

export default ConnexionPage