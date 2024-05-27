const asyncHandler = require('express-async-handler')
const { User, validate } = require('../model/userModel')
const bcrypt = require('bcrypt')

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.send({ users })
})
const registerUser = asyncHandler(async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }

  // Check if the username already exists
  const oldUsername = await User.findOne({ username: req.body.username })
  if (oldUsername) {
    return res.status(400).send({ message: 'Username already taken' })
  }

  // Check if the email already exists
  const oldUserEmail = await User.findOne({ email: req.body.email })
  if (oldUserEmail) {
    return res
      .status(409)
      .send({ message: 'User with given email already exists' })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  // Create and save the new user
  // Create and save the new user
  const newUser = new User({ ...req.body, password: hashedPassword })

  // Ensure all fields are provided and correctly saved
  newUser.firstName = req.body.firstName
  newUser.lastName = req.body.lastName

  await newUser.save()

  // Send success response
  res.status(200).send({ message: 'Registered successfully' })
})
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if ((!username && !email) || !password) {
    res.status(400).send
    throw new Error('All fields are mandatory')
  }
  var user
  if (username) {
    user = await User.findOne({ username: username })
  } else {
    user = await User.findOne({ email: email })
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if (username) {
    if (!comparePassword || !user) {
      res.status(400)
      throw new Error('Username or Password is invalid')
    }
  }
  if (email) {
    if (!comparePassword || !user) {
      res.status(400)
      throw new Error('Email or Password is invalid')
    }
  }
  res.status(200).send({ message: 'Logged in successfully!' })
})

module.exports = { getUsers, registerUser, loginUser }
