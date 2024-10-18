import React, { useState } from 'react';
import '../styles/connexion.css';

const Inscription = () => {
     const [formData, setFormData] = useState({
          email: '',
          password: '',
          confirmPassword: ''
     });
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
               });

               const data = await response.json();

               if (!response.ok) {
                    setError(data.error);
               } else {
                    window.location.href = '/contact';
               }
          } catch (error) {
               console.error('Erreur:', error);
               setError('Erreur lors de l\'inscription');
          }
     };

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          });
     };

     return (
          <div className="connexion-container">
               <div className='connexion-form'>
                    <form onSubmit={handleSubmit}>
                         <h1>Inscription</h1>
                         {error && <div className="error-message">{error}</div>}
                         <input
                              type="email"
                              name="email"
                              className='text-input'
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                         />
                         <input
                              type="password"
                              name="password"
                              className='text-input'
                              placeholder="Mot de passe"
                              value={formData.password}
                              onChange={handleChange}
                         />
                         <input
                              type="password"
                              name="confirmPassword"
                              className='text-input'
                              placeholder="Confirmez votre Mot de passe"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                         />
                         <div className="rester-container">
                              <input type="checkbox" name="rester" id="rester" className='rester' />
                              <label htmlFor="rester" className="rester-label">Rester connecté</label>
                         </div>
                         <button type="submit">S'inscrire</button>
                         <a className='inscrire' href="/connexion">Se connecter ?</a>
                    </form>
               </div>
          </div>
     );
};

export default Inscription;