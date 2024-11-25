import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/messages.css';

const Messages = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [socket, setSocket] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const messagesEndRef = useRef(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   useEffect(() => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const newSocket = io(apiUrl);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      newSocket.emit('authenticate', token);

      newSocket.on('error', (error) => {
         console.error('Socket error:', error);
      });

      newSocket.on('receiveMessage', (message) => {
         console.log('Nouveau message reçu:', message);
         setMessages((prevMessages) => [...prevMessages, message]);
      });

      setSocket(newSocket);

      return () => newSocket.close();
   }, []);

   useEffect(() => {
      loadUsers();
   }, [user]);

   useEffect(() => {
      if (selectedUser) {
         console.log('Utilisateur sélectionné:', selectedUser);
         loadMessages();
      }
   }, [selectedUser]);

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
            const filteredUsers = user.type === 'admin'
               ? data.users
               : data.users.filter(u => u.type === 'admin');
            setUsers(filteredUsers);
         }
      } catch (error) {
         console.error('Error loading users:', error);
      }
   };

   const loadMessages = async () => {
      if (!selectedUser?._id) {
         console.log('Pas d\'utilisateur sélectionné');
         return;
      }

      try {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         console.log('Chargement des messages pour:', selectedUser._id);
         console.log('Token utilisé:', token);

         const response = await fetch(`http://localhost:5000/messages/history/${selectedUser._id}`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         const data = await response.json();
         console.log('Réponse du serveur:', data);

         if (response.ok) {
            setMessages(data);
         } else {
            console.error('Erreur serveur:', data.error);
         }
      } catch (error) {
         console.error('Error loading messages:', error);
      }
   };

   const handleSendMessage = async (e) => {
      e.preventDefault();
      if (newMessage.trim() && selectedUser && socket) {
         try {
            const messageData = {
               receiverId: selectedUser._id,
               content: newMessage,
               senderId: user._id
            };

            socket.emit('sendMessage', messageData);
            setNewMessage('');
         } catch (error) {
            console.error('Error sending message:', error);
         }
      }
   };

   const formatMessageDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   };

   const getMessageSenderId = (message) => {
      return typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
   };

   const getMessageReceiverId = (message) => {
      return typeof message.receiverId === 'object' ? message.receiverId._id : message.receiverId;
   };

   return (
      <div className="messages-container">
         <div className="users-list">
            <div className="users-header">
               <h3>Users</h3>
               <button
                  className="home-button"
                  onClick={() => navigate('/')}
               >
                  Home
               </button>
            </div>
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
                  <div className="chat-header">
                     <h3>Chat with {selectedUser.name}</h3>
                  </div>
                  <div className="messages-display">
                     {messages.length === 0 ? (
                        <div className="no-messages">Pas encore de messages</div>
                     ) : (
                        messages.map((message, index) => {
                           const senderId = getMessageSenderId(message);
                           const receiverId = getMessageReceiverId(message);

                           return (
                              <div
                                 key={index}
                                 className={
                                    senderId === user._id ? 'message sent' :
                                       senderId === selectedUser._id ? 'message received' :
                                          'message received'
                                 }
                              >
                                 <div className="message-content">{message.content}</div>
                                 <div className="message-timestamp">
                                    {formatMessageDate(message.timestamp)}
                                 </div>
                              </div>
                           );
                        })
                     )}
                     <div ref={messagesEndRef} />
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