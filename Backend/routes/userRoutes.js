const express = require('express')
const router = express.Router()
const {
  getUsers,
  registerUser,
  loginUsername,
  loginEmail,
} = require('../controller/userController')

router.route('/').get(getUsers)
router.route('/register').post(registerUser)
router.route('/loginUsername').post(loginUsername)
router.route('/loginEmail').post(loginEmail)
module.exports = router
