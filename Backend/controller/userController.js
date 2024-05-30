const asyncHandler = require('express-async-handler')
const { User, validate } = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/sendMail')

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
  const oldUserEmail = await User.findOne({ email: req.body.email })
  if (oldUserEmail) {
    return res
      .status(409)
      .send({ message: 'User with given email already exists' })
  }
  const oldUsername = await User.findOne({ username: req.body.username })
  if (oldUsername) {
    return res.status(400).send({ message: 'Username already taken' })
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const newUser = await User.create({ ...req.body, password: hashedPassword })

  res.status(200).send({ message: 'Registered successfully' })
})

const loginUsername = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const user = await User.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = user.generateToken()
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    res.status(200).send({ message: 'Login successfully!' })
  } else {
    res.status(400).send({ message: 'Username or Password is invalid' })
  }
})

const loginEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = user.generateToken()
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    res.status(200).send({ message: 'Login successfully!' })
  } else {
    res.status(400).send({ message: 'Email or Password is invalid' })
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).send({ message: 'Email is required' })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' })
  }
  const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  })
  const subject = 'Reset Password'
  const encodedToken = encodeURIComponent(token).replace(/\./g, '%2E')
  const text = `https://localhost:5173/reset_password/${encodedToken}`
  try {
    sendEmail({ email, subject, text })
    res.send({ message: 'Email sent successfully' })
  } catch (err) {
    res.status(500).send({ error: 'Failed to send email' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const { token } = req.params
  console.log(token)
  if (!password) {
    return res.status(500).send({ message: 'Please enter reset password' })
  }
  const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY)

  if (Date.now() >= decodedToken.exp * 1000) {
    return res.status(500).send({ message: 'Token expired' })
  }

  const id = decodedToken.id
  const hashedPassword = await bcrypt.hash(password, 10)
  await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
  return res.json({ status: true, message: 'Password updated successfully' })
})

module.exports = {
  getUsers,
  registerUser,
  loginUsername,
  loginEmail,
  forgotPassword,
  resetPassword,
}
