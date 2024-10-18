import React, { useState } from 'react';
import '../styles/connexion.css';

const Connexion = () => {
     const [formData, setFormData] = useState({
          email: '',
          password: '',
          rester: false
     });

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
               });

               const data = await response.json();

               if (!response.ok) {
                    alert(data.error);
               } else {
                    window.location.href = '/';
               }
          } catch (error) {
               console.error('Erreur:', error);
               alert('Erreur lors de la connexion');
          }
     };

     const handleChange = (e) => {
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
          setFormData({
               ...formData,
               [e.target.name]: value
          });
     };

     return (
          <div className="connexion-container">
               <div className='connexion-form'>
                    <form onSubmit={handleSubmit}>
                         <h1>Connexion</h1>
                         <input
                              type="email"
                              name="email"
                              className='text-input'
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                         />
                         <input
                              type="password"
                              name="password"
                              className='text-input'
                              placeholder="Mot de passe"
                              value={formData.password}
                              onChange={handleChange}
                              required
                         />
                         <div className="rester-container">
                              <input
                                   type="checkbox"
                                   name="rester"
                                   id="rester"
                                   className='rester'
                                   checked={formData.rester}
                                   onChange={handleChange}
                              />
                              <label htmlFor="rester" className="rester-label">
                                   Rester connecté
                              </label>
                         </div>
                         <button type="submit">Se Connecter</button>
                         <a className='inscrire' href="/inscription">S'inscrire ?</a>
                    </form>
               </div>
          </div>
     );
};

export default Connexion;