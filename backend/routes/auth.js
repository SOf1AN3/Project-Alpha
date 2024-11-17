const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have a middleware to verify JWT

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
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      // Validate input
      if (!email || !password) {
         return res.status(400).json({ error: 'Please provide email and password' });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Create token
      const token = jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
      );

      // Send user info (excluding password)
      const userResponse = {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role
      };

      res.json({
         message: 'Login successful',
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

module.exports = router;