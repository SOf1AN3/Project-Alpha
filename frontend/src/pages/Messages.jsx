import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/messages.css';


const socket = io('http://localhost:5000');

const Messages = () => {
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');

   useEffect(() => {
      socket.on('receiveMessage', (message) => {
         setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
         socket.off('receiveMessage');
      };
   }, []);

   const handleSendMessage = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
         socket.emit('sendMessage', newMessage);
         setNewMessage('');
      }
   };

   return (
      <div className="messages-container">
         <div className="messages-display">
            {messages.map((message, index) => (
               <div key={index} className="message">
                  {message}
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
      </div>
   );
};

export default Messages;