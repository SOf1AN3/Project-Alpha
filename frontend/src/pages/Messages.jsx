import { useState, useEffect, useRef } from 'react';
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
      try {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         const response = await fetch(`http://localhost:5000/messages/${selectedUser._id}`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         if (response.ok) {
            const data = await response.json();
            setMessages(data.messages);
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

            // Uniquement émettre via socket
            socket.emit('sendMessage', messageData);

            // Réinitialiser le champ de message
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
                  <div className="chat-header">
                     <h3>Chat with {selectedUser.name}</h3>
                  </div>
                  <div className="messages-display">
                     {messages.map((message, index) => (
                        <div
                           key={index}
                           className={`message ${message.senderId === user._id ? 'sent' : 'received'}`}
                        >
                           <div className="message-content">{message.content}</div>
                           <div className="message-timestamp">
                              {formatMessageDate(message.timestamp)}
                           </div>
                        </div>
                     ))}
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