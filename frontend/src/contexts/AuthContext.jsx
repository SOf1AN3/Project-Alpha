import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState(null);

     // Configure axios
     axios.defaults.baseURL = 'http://localhost:5000'; // Ajustez selon votre PORT backend

     // Vérifier l'état de l'authentification au chargement
     useEffect(() => {
          checkAuth();
     }, []);

     const checkAuth = async () => {
          const token = localStorage.getItem('token');
          if (token) {
               try {
                    const response = await axios.get('/api/check-auth', {
                         headers: {
                              'Authorization': token
                         }
                    });
                    if (response.data.authenticated) {
                         setIsLoggedIn(true);
                         setUser(response.data.user);
                    }
               } catch (error) {
                    console.error('Erreur de vérification auth:', error);
                    setIsLoggedIn(false);
                    setUser(null);
               }
          }
     };

     const login = async (email, password, rester) => {
          try {
               const response = await axios.post('/api/login', {
                    email,
                    password,
                    rester
               });

               localStorage.setItem('token', response.data.token);
               setIsLoggedIn(true);
               setUser(response.data.user);
               return response.data;
          } catch (error) {
               throw error.response.data;
          }
     };

     const logout = () => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
     };

     const signup = async (name, email, password, confirmPassword, rester) => {
          try {
               const response = await axios.post('/api/signup', {
                    name,
                    email,
                    password,
                    confirmPassword,
                    rester
               });

               localStorage.setItem('token', response.data.token);
               setIsLoggedIn(true);
               setUser(response.data.user);
               return response.data;
          } catch (error) {
               throw error.response.data;
          }
     };

     return (
          <AuthContext.Provider
               value={{
                    isLoggedIn,
                    user,
                    login,
                    logout,
                    signup,
                    checkAuth
               }}
          >
               {children}
          </AuthContext.Provider>
     );
};

export const useAuth = () => useContext(AuthContext);