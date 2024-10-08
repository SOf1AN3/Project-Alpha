import React from 'react'
import '../styles/connexion.css'
import backgroundVideo from '../assets/connexion.mp4'

const Connexion = () => {
     return (
          <div className="connexion-container">
               <div className='connexion-form'>
                    <form action="" method="post">
                         <h1>Connexion</h1>
                         <input type="email" name="email" className='text-input' placeholder="Email" />
                         <input type="password" name="password" className='text-input' placeholder="Mot de passe" />
                         <div className="rester-container">
                              <input type="checkbox" name="rester" id="rester" className='rester' />
                              <label htmlFor="rester" className="rester-label">Rester connecté</label>
                         </div>
                         <button type="submit">Se Connecter</button>
                    </form>
               </div>
          </div>
     )
}

export default Connexion