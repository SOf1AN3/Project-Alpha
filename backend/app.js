const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

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
          app.listen(process.env.PORT, () => {
               console.log("Server listening on port", process.env.PORT);
          });
     })
     .catch((error) => {
          console.log("MongoDB connection error:", error);
     });