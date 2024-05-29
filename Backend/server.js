const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/dbConnection')
const cookieParser = require('cookie-parser')

const app = express()
connectDB()

const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
app.use('/api/users', require('./routes/userRoutes'))
app.use('api/verify', require('./routes/verify'))

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
