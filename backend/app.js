const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
     cors: {
          origin: 'http://localhost:5173',
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
     }
});

// Configuration de CORS
app.use(cors({
     origin: 'http://localhost:5173',
     methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const Message = require('./models/message');
const User = require('./models/user');

app.use('/auth', authRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
     .then(() => {
          console.log("Connected to MongoDB");
          server.listen(process.env.PORT, () => {
               console.log("Server listening on port", process.env.PORT);
          });
     })
     .catch((error) => {
          console.log("MongoDB connection error:", error);
     });

// Gestion des événements Socket.io
io.on('connection', (socket) => {
     console.log('New client connected');

     // Authentification du socket
     socket.on('authenticate', async (token) => {
          try {
               // Vérifier le token et obtenir l'utilisateur
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
               const user = await User.findById(decoded.userId);
               if (!user) throw new Error('User not found');

               socket.userId = user._id;
               socket.userType = user.type;
               socket.join(user._id.toString()); // Rejoindre une room personnelle
          } catch (error) {
               socket.emit('error', 'Authentication failed');
          }
     });

     socket.on('sendMessage', async (data) => {
          try {
               if (!socket.userId) {
                    throw new Error('Not authenticated');
               }

               const { receiverId, content } = data;

               const message = new Message({
                    senderId: socket.userId,
                    receiverId,
                    content
               });

               await message.save();

               // Émettre le message au destinataire et à l'expéditeur
               io.to(receiverId).emit('receiveMessage', {
                    ...message.toObject(),
                    isSentByMe: false
               });

               socket.emit('receiveMessage', {
                    ...message.toObject(),
                    isSentByMe: true
               });
          } catch (error) {
               socket.emit('error', error.message);
          }
     });

     socket.on('disconnect', () => {
          console.log('Client disconnected');
     });
});