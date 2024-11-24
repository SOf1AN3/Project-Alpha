const express = require('express');
const auth = require('../middleware/authMiddleware');
const Message = require('../models/message');
const router = express.Router();

router.get('/conversations', auth, async (req, res) => {
   try {
      const messages = await Message.find({
         $or: [{ senderId: req.user.id }, { receiverId: req.user.id }]
      }).populate('senderId receiverId', 'name email');
      res.json(messages);
   } catch (error) {
      res.status(500).json({ error: 'Server error' });
   }
});

// Ajouter cette nouvelle route POST
router.post('/', auth, async (req, res) => {
   try {
      const { receiverId, content } = req.body;
      const newMessage = new Message({
         senderId: req.user._id,
         receiverId,
         content,
         timestamp: new Date()
      });

      await newMessage.save();
      res.status(201).json(newMessage);
   } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message' });
   }
});

router.get('/history/:userId', auth, async (req, res) => {
   try {
      const userId = req.params.userId;
      const messages = await Message.find({
         $or: [{ senderId: req.user.id, receiverId: userId }, { senderId: userId, receiverId: req.user.id }]
      }).sort({ timestamp: 1 }); // Trier par timestamp croissant

      res.json(messages);
   } catch (error) {
      res.status(500).json({ error: 'Server error' });
   }
});

module.exports = router;