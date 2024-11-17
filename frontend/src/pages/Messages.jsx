import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Messages = () => {
   const { user, socket } = useAuth();
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');

   useEffect(() => {
      const fetchMessages = async () => {
         try {
            const response = await axios.get(`/api/messages/${user.id}`);
            setMessages(response.data);
         } catch (error) {
            console.error('Error fetching messages:', error);
         }
      };

      fetchMessages();
   }, [user]);

   useEffect(() => {
      if (socket) {
         socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
         });
      }
   }, [socket]);

   const sendMessage = () => {
      if (newMessage.trim() === '') return;

      const message = {
         senderId: user.id,
         receiverId: 'admin-id', // Replace with actual admin ID
         content: newMessage,
      };

      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
   };

   return (
      <div>
         <div>
            {messages.map((msg, index) => (
               <div key={index}>
                  <strong>{msg.senderId.email}:</strong> {msg.content}
               </div>
            ))}
         </div>
         <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
         />
         <button onClick={sendMessage}>Send</button>
      </div>
   );
};

export default Messages;