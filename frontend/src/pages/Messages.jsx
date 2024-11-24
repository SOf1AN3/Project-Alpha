import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import '../styles/messages.css';

const Messages = () => {
   const { user } = useAuth();
   const [socket, setSocket] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);

   useEffect(() => {
      const newSocket = io('http://localhost:5000');

      // Authentifier le socket avec le token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      newSocket.emit('authenticate', token);

      newSocket.on('error', (error) => {
         console.error('Socket error:', error);
      });

      newSocket.on('receiveMessage', (message) => {
         setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);

      return () => {
         newSocket.close();
      };
   }, []);

   useEffect(() => {
      // Charger la liste des utilisateurs disponibles pour la messagerie
      const loadUsers = async () => {
         try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await fetch('http://localhost:5000/auth/users', {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            });

            if (response.ok) {
               const data = await response.json();
               // Si l'utilisateur est admin, montrer tous les utilisateurs
               // Sinon, montrer uniquement les admins
               const filteredUsers = user.type === 'admin'
                  ? data.users
                  : data.users.filter(u => u.type === 'admin');
               setUsers(filteredUsers);
            }
         } catch (error) {
            console.error('Error loading users:', error);
         }
      };

      if (user) {
         loadUsers();
      }
   }, [user]);

   const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim() && selectedUser && socket) {
         socket.emit('sendMessage', {
            receiverId: selectedUser._id,
            content: newMessage
         });
         setNewMessage('');
      }
   };

   return (
      <div className="messages-container">
         <div className="users-list">
            <h3>Available Users</h3>
            {users.map((u) => (
               <div
                  key={u._id}
                  className={`user-item ${selectedUser?._id === u._id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(u)}
               >
                  {u.name} {u.type === 'admin' ? '(Admin)' : ''}
               </div>
            ))}
         </div>

         <div className="chat-section">
            {selectedUser ? (
               <>
                  <div className="messages-display">
                     {messages
                        .filter(m =>
                           (m.senderId === user._id && m.receiverId === selectedUser._id) ||
                           (m.senderId === selectedUser._id && m.receiverId === user._id)
                        )
                        .map((message, index) => (
                           <div
                              key={index}
                              className={`message ${message.isSentByMe ? 'sent' : 'received'}`}
                           >
                              {message.content}
                           </div>
                        ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="message-form">
                     <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="message-input"
                        placeholder="Type your message..."
                     />
                     <button type="submit" className="send-button">Send</button>
                  </form>
               </>
            ) : (
               <div className="no-user-selected">
                  Select a user to start chatting
               </div>
            )}
         </div>
      </div>
   );
};

export default Messages;