const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const messageSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
          validate: isEmail
     },
     message: {
          type: String,
          required: true,
          minlength: 6
     }
})

module.exports = mongoose.model('message', messageSchema)