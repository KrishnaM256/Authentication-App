const mongoose = require('mongoose')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const { Timestamp } = require('mongodb')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter username'],
    },
    firstname: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastname: {
      type: String,
      required: [true, 'Please enter your last name'],
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
      required: [true, 'Please enter password'],
    },
    phone: {
      type: Number,
      required: [true, 'Please enter your phone'],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  })
  return token
}

const User = mongoose.model('User', userSchema)

const validate = (data) => {
  const schema = joi.object({
    firstname: joi.string().required().label('First Name'),
    lastname: joi.string().required().label('Last Name'),
    email: joi.string().required().label('Email'),
    address: joi.string().required().label('Address'),
    username: joi.string().required().label('Username'),
    phone: joi.number().required().label('Phone Number'),
    password: passwordComplexity().required().label('Password'),
  })
  return schema.validate(data)
}

module.exports = { User, validate }
