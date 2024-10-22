import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/connexion.css';

const Inscription = () => {
     const { signup } = useAuth();
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
     });
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const data = await signup(formData.name, formData.email, formData.password, formData.confirmPassword);
               window.location.href = '/contact';
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
                         <h1>Inscription</h1>
                         {error && <div className="error-message">{error}</div>}
                         <input
                              type="text"
                              name="name"
                              className='text-input'
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                         />
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
                              <input type="checkbox" name="rester" id="rester" className='rester' onChange={handleChange} />
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