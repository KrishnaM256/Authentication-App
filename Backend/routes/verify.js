const jwt = require('jsonwebtoken')
const router = require('express').Router()

const verify = async (req, res, next) => {
  try {
    const token = req.cookie.token
    if (!token) {
      return res.json({ status: false, message: 'No token' })
    }
    const decoded = await jwt.decode(token, process.env.JWTPRIVATEKEY)
    next()
  } catch (err) {
    return res.json(err)
  }
}

router.get('/', verify, (req, res) => {
  res.json({ status: true, message: 'Authorized' })
})

module.exports = router
