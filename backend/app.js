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

     socket.on('sendMessage', (message) => {
          io.emit('receiveMessage', message);
     });

     socket.on('disconnect', () => {
          console.log('Client disconnected');
     });
});