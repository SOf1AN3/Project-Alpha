const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new Schema({
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
     password: {
          type: String,
          required: true,
          unique: true,
          minlength: 6
     }
})

module.exports = mongoose.model('user', userSchema)