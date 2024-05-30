const express = require('express')
const router = express.Router()
const {
  getUsers,
  registerUser,
  loginUsername,
  loginEmail,
  forgotPassword,
  resetPassword,
} = require('../controller/userController')

router.route('/').get(getUsers)
router.route('/register').post(registerUser)
router.route('/loginUsername').post(loginUsername)
router.route('/loginEmail').post(loginEmail)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:token').post(resetPassword)

module.exports = router
