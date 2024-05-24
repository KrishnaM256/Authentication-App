const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.send({ users })
})

const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, address, password, phone } = req.body
  if (!username || !name || !email || !address || !password || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const user = await User.create({
    username,
    name,
    email,
    address,
    password,
    phone,
  })
})

module.exports = { getUsers }
