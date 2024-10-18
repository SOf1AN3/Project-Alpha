const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new Schema({
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
     isAdmin: {
          type: Boolean,
          required: true,
          default: false
     }
})

module.exports = mongoose.model('user', userSchema)