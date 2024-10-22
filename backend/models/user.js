const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new Schema({
     name: {
          type: String,
          required: true,
          minlength: 3
     },
     email: {
          type: String,
          required: true,
          unique: true,
          validate: isEmail
     },
     password: {
          type: String,
          required: true,
          unique: true,
          minlength: 6
     },
     type: {
          type: String,
          required: true,
          enum: ['simple', 'advanced', 'premium', 'admin'],
          default: 'simple'
     },
     isConfirmed: {
          type: Boolean,
          required: true,
          default: false
     }
})

module.exports = mongoose.model('user', userSchema)