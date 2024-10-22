import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/connexion.css';

const Connexion = () => {
     const { login } = useAuth();
     const [formData, setFormData] = useState({
          email: '',
          password: '',
          rester: false
     });
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const data = await login(formData.email, formData.password, formData.rester);
               window.location.href = '/';
          } catch (error) {
               setError(error.error);
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
                         {error && <div className="error-message">{error}</div>}
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