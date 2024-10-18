import React from 'react'
import Header from '../components/Header'
import backgroundVideo from '../assets/expats-cmp.mp4'
import Inscription from '../components/Inscription'

const InscriptionPage = () => {
     return (
          <>
               <video autoPlay loop muted className="background-connexion">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <Header />
               <Inscription />
          </>
     )
}

export default InscriptionPage