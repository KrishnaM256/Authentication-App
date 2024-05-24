const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
  res.send({ message: 'Getting Users' })
})

module.exports = { getUsers }
