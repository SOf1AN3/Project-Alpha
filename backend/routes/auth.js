const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', async (req, res) => {
   const { name, email, password, role } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      res.status(400).json({ error: 'Error creating user' });
   }
});

// routes/auth.js
// Dans auth.js, la route login devrait ressembler à ceci :
router.post('/login', async (req, res) => {
   try {
      const { email, password, rester } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Créer le token avec l'userId
      const token = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET,
         { expiresIn: rester ? '7d' : '24h' }
      );

      // Retourner le token et les infos utilisateur (sans le mot de passe)
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
         token,
         user: userResponse
      });
   } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
   }
});

// Add the /auth/check endpoint
router.get('/check', authMiddleware, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ user });
   } catch (error) {
      res.status(500).json({ error: 'Server error' });
   }
});

router.get('/users', authMiddleware, async (req, res) => {
   try {
      let users;
      // Si l'utilisateur est admin, retourner tous les utilisateurs sauf lui-même
      if (req.user.type === 'admin') {
         users = await User.find(
            { _id: { $ne: req.user._id } },
            { password: 0 } // Exclure le mot de passe
         );
      }
      // Si l'utilisateur est normal, retourner uniquement les admins
      else {
         users = await User.find(
            {
               type: 'admin',
               _id: { $ne: req.user._id }
            },
            { password: 0 }
         );
      }

      // Trier les utilisateurs par type (admins en premier) puis par nom
      users.sort((a, b) => {
         if (a.type === 'admin' && b.type !== 'admin') return -1;
         if (a.type !== 'admin' && b.type === 'admin') return 1;
         return a.name.localeCompare(b.name);
      });

      res.json({ users });
   } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
   }
});

// Route pour récupérer les messages d'une conversation
router.get('/messages/:userId', authMiddleware, async (req, res) => {
   try {
      const otherUserId = req.params.userId;
      const currentUserId = req.user._id;

      // Vérifier si l'utilisateur a le droit d'accéder à ces messages
      const otherUser = await User.findById(otherUserId);
      if (!otherUser) {
         return res.status(404).json({ error: 'User not found' });
      }

      // Vérifier les permissions (admin peut tout voir, utilisateur normal ne peut voir que les conversations avec les admins)
      if (req.user.type !== 'admin' && otherUser.type !== 'admin') {
         return res.status(403).json({ error: 'Unauthorized' });
      }

      const messages = await Message.find({
         $or: [
            { senderId: currentUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: currentUserId }
         ]
      }).sort({ timestamp: 1 });

      res.json({ messages });
   } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages' });
   }
});


module.exports = router;