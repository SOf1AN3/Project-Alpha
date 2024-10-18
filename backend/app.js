const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const session = require('express-session'); // Ajout de l'import de session
const MongoStore = require('connect-mongo'); // Ajout de l'import de connect-mongo
const cors = require('cors');
require('dotenv').config();

const Message = require('./models/message');
const User = require('./models/user');

const app = express();

// Configuration de CORS (à mettre AVANT session)
app.use(cors({
     origin: 'http://localhost:5173',
     methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
}));

// Parsers (à mettre AVANT session)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la session (APRÈS cors et parsers, AVANT les routes)
app.use(session({
     secret: process.env.SESSION_SECRET || 'votre_secret_key', // Utilisez une variable d'environnement
     resave: false,
     saveUninitialized: false,
     store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          collectionName: 'sessions'
     }),
     cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'lax'
     }
}));

app.use((req, res, next) => {
     console.log('Session:', req.session);
     next();
});

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
     console.log('Test email:', emailRegex.test(email)); // Log du résultat du test

     if (!emailRegex.test(email)) {
          console.log('Email invalide:', email);
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

// ________________________________________________________________________________________________

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

// Route POST pour l'inscription
app.post('/api/signup', validateSignupData, async (req, res) => {
     try {
          const { email, password, rester } = req.body;

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
               email,
               password: hashedPassword,
               stayConnected: rester === 'on'
          });

          // Sauvegarde dans la base de données
          await newUser.save();

          // Création d'une session si "rester connecté" est coché
          if (rester === 'on') {
               req.session.userId = newUser._id;
               req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours
          }

          // Réponse réussie
          res.status(201).json({
               message: "Inscription réussie",
               redirect: "/"
          });

     } catch (error) {
          console.error('Erreur lors de l\'inscription: ', error);
          res.status(500).json({ error: "Erreur lors de l'inscription" });
     }
});

app.post('/api/login', validateLoginData, async (req, res) => {
     try {
          const { email, password, rester } = req.body;

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

          // Initialisation de la session
          try {
               req.session.userId = user._id;
               req.session.email = user.email;

               if (rester) {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
               }

               // Attendre que la session soit sauvegardée
               await new Promise((resolve, reject) => {
                    req.session.save((err) => {
                         if (err) reject(err);
                         resolve();
                    });
               });

               // Mise à jour du statut "rester connecté"
               await User.findByIdAndUpdate(user._id, { stayConnected: rester });

               res.json({
                    message: "Connexion réussie",
                    redirect: "/",
                    user: {
                         email: user.email,
                         id: user._id
                    }
               });

          } catch (sessionError) {
               console.error('Erreur session:', sessionError);
               return res.status(500).json({
                    error: "Erreur lors de la création de la session"
               });
          }

     } catch (error) {
          console.error('Erreur connexion:', error);
          res.status(500).json({
               error: "Erreur lors de la connexion"
          });
     }
});

app.get('/api/check-auth', async (req, res) => {
     try {
          if (!req.session.userId) {
               return res.status(401).json({
                    authenticated: false
               });
          }

          const user = await User.findById(req.session.userId);
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

// Route pour la déconnexion
app.post('/api/logout', (req, res) => {
     req.session.destroy(err => {
          if (err) {
               return res.status(500).json({
                    error: "Erreur lors de la déconnexion"
               });
          }
          res.json({ message: "Déconnexion réussie" });
     });
});


