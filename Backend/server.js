const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/dbConnection')

const app = express()
connectDB()

const PORT = process.env.PORT || 8000

app.use('/api/register', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
