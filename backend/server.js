const express = require('express')
const dotenv = require ('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')
const path = require('path')

// connect to database
connectDB()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// serve frontend
if (process.env.NODE_ENV === 'production') {
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // fixing app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.status(200).json({message: 'Welcome to the Support Desk API'})
    })
  }  

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))