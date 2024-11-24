const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
     senderId: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
     },
     receiverId: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
     },
     content: {
          type: String,
          required: true,
     },
     timestamp: {
          type: Date,
          default: Date.now,
     },
     isRead: {
          type: Boolean,
          default: false
     }
});

// Middleware pour vérifier que la communication respecte les règles admin/user
messageSchema.pre('save', async function (next) {
     try {
          const sender = await mongoose.model('user').findById(this.senderId);
          const receiver = await mongoose.model('user').findById(this.receiverId);

          if (!sender || !receiver) {
               throw new Error('Sender or receiver not found');
          }

          // Si l'expéditeur est un admin, il peut envoyer à n'importe qui
          if (sender.type === 'admin') {
               return next();
          }

          // Si l'expéditeur n'est pas admin, le destinataire doit être admin
          if (receiver.type !== 'admin') {
               throw new Error('Non-admin users can only send messages to admins');
          }

          next();
     } catch (error) {
          next(error);
     }
});

module.exports = mongoose.model('Message', messageSchema);