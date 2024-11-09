import React from 'react'
import Header from '../components/Header'
import Connexion from '../components/Connexion'
import backgroundImage from '../assets/background.jpg'

const ConnexionPage = () => {
     return (
          <>
               <div
                    className="background-fixe"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
               ></div>
               <Header />
               <Connexion />
          </>
     )
}

export default ConnexionPage