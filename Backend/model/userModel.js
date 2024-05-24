const mongoose = require('mongoose')
const { TimeStamp } = require('mongodb')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter username'],
    },
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
    },
    address: {
      type: String,
      required: [true, 'Please enter your address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    phone: {
      type: Number,
      required: [true, 'Please enter your phone'],
    },
  },
  {
    TimeStamp: true,
  }
)

module.exports = mongoose.model('User', userSchema)
