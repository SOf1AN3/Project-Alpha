import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState(null);

     // Configure axios
     axios.defaults.withCredentials = true;
     axios.defaults.baseURL = 'http://localhost:5000'; // Ajustez selon votre PORT backend

     // Vérifier l'état de l'authentification au chargement
     useEffect(() => {
          checkAuth();
     }, []);

     const checkAuth = async () => {
          try {
               const response = await axios.get('/api/check-auth');
               if (response.data.authenticated) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
               }
          } catch (error) {
               console.error('Erreur de vérification auth:', error);
               setIsLoggedIn(false);
               setUser(null);
          }
     };

     const login = async (email, password, rester) => {
          try {
               const response = await axios.post('/api/login', {
                    email,
                    password,
                    rester
               });

               setIsLoggedIn(true);
               setUser(response.data.user);
               return response.data;
          } catch (error) {
               throw error.response.data;
          }
     };

     const logout = async () => {
          try {
               await axios.post('/api/logout');
               setIsLoggedIn(false);
               setUser(null);
          } catch (error) {
               console.error('Erreur de déconnexion:', error);
          }
     };

     const signup = async (email, password, confirmPassword, rester) => {
          try {
               const response = await axios.post('/api/signup', {
                    email,
                    password,
                    confirmPassword,
                    rester
               });
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