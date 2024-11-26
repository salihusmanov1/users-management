const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require("cors");
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const corsConfig = {
  origin: 'https://users-management-client.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsConfig));

app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app