const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Message = require('./models/message');
const User = require('./models/user');

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

// Middleware pour valider les données
const validateSignupData = (req, res, next) => {
     const { email, password, confirmPassword } = req.body;

     // Validation de l'email
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Format d'email invalide" });
     }

     // Validation du mot de passe
     if (password.length < 6) {
          return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
     }

     // Vérification de la confirmation du mot de passe
     if (password !== confirmPassword) {
          return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
     }

     next();
};

const validateLoginData = (req, res, next) => {
     const { email, password } = req.body;

     // Validation de l'email
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Format d'email invalide" });
     }

     // Validation du mot de passe
     if (!password || password.length < 1) {
          return res.status(400).json({ error: "Veuillez entrer votre mot de passe" });
     }

     next();
};

// Générer un token JWT
const generateToken = (user) => {
     return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
     const token = req.headers['authorization'];
     if (!token) return res.sendStatus(401);

     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
     });
};

app.post('/api/signup', validateSignupData, async (req, res) => {
     try {
          const { name, email, password } = req.body;

          // Vérifier si l'utilisateur existe déjà
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(400).json({ error: "Cet email est déjà utilisé" });
          }

          // Hachage du mot de passe
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Création du nouvel utilisateur
          const newUser = new User({
               name,
               email,
               password: hashedPassword
          });

          // Sauvegarde dans la base de données
          await newUser.save();

          // Générer un token JWT
          const token = generateToken(newUser);

          // Réponse réussie
          res.status(201).json({
               message: "Inscription réussie",
               token,
               user: {
                    email: newUser.email,
                    id: newUser._id
               }
          });

     } catch (error) {
          console.error('Erreur lors de l\'inscription: ', error);
          res.status(500).json({ error: "Erreur lors de l'inscription" });
     }
});

app.post('/api/login', validateLoginData, async (req, res) => {
     try {
          const { email, password } = req.body;

          // Recherche de l'utilisateur
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(401).json({
                    error: "Email ou mot de passe incorrect"
               });
          }

          // Vérification du mot de passe
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
               return res.status(401).json({
                    error: "Email ou mot de passe incorrect"
               });
          }

          // Générer un token JWT
          const token = generateToken(user);

          res.json({
               message: "Connexion réussie",
               token,
               user: {
                    email: user.email,
                    id: user._id
               }
          });

     } catch (error) {
          console.error('Erreur connexion:', error);
          res.status(500).json({
               error: "Erreur lors de la connexion"
          });
     }
});

app.get('/api/check-auth', authenticateToken, async (req, res) => {
     try {
          const user = await User.findById(req.user.id);
          if (!user) {
               return res.status(401).json({
                    authenticated: false
               });
          }

          res.json({
               authenticated: true,
               user: {
                    email: user.email,
                    id: user._id
               }
          });

     } catch (error) {
          console.error('Erreur lors de la vérification de l\'authentification:', error);
          res.status(500).json({
               error: "Erreur lors de la vérification de l'authentification"
          });
     }
});

app.post('/api/logout', (req, res) => {
     // Pour JWT, la déconnexion est gérée côté client en supprimant le token
     res.json({ message: "Déconnexion réussie" });
});

app.get('/api/users', authenticateToken, async (req, res) => {
     try {
          const users = await User.find({}, 'email'); // Fetch all users and select only the email field
          res.status(200).json(users);
     } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Error fetching users' });
     }
});