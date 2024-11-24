import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
   autoConnect: true,
   withCredentials: true
});

// Gestion des erreurs de connexion
socket.on('connect_error', (error) => {
   console.error('Socket connection error:', error);
});

// Gestion de la reconnexion
socket.on('reconnect', (attemptNumber) => {
   console.log('Reconnected to socket after', attemptNumber, 'attempts');
});