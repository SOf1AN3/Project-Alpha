const express = require('express');
const auth = require('../middleware/auth');
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

module.exports = router;