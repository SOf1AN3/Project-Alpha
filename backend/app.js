const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const Message = require('./models/message')



const app = express();



const cors = require('cors');
app.use(cors({
     origin: 'http://localhost:5173', // Remplacez par l'URL de votre application React
     methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
}));

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
     .then(() => {
          app.listen(process.env.PORT, () => {
               console.log("Connected to db and listening on the port", process.env.PORT)
          })

     })
     .catch((error) => {
          console.log(error)
     })



app.get("/", (req, res) => {
     res.redirect("/home");
});

app.post("/api/message", async (req, res) => {
     console.log("Route /api/message appelée");
     const { name, email, message } = req.body
     try {
          if (!name || !email || !message) {
               console.log('Champs manquants')
               return res.status(400).json({ message: "Tous les champs sont requis" })
          }
          console.log('Tentative de création du message')
          const newMessage = await Message.create({ name, email, message })
          console.log('Message créé:', newMessage)
          return res.status(201).json({ message: "Message créé avec succès", data: newMessage })
     }
     catch (error) {
          console.error('Erreur serveur:', error)
          return res.status(500).json({ message: "Erreur lors de la création du message", error: error.message })
     }
})



