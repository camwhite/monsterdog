'use strict'

// Main modules
const path = require('path')
const express = require('express')
const morgan = require('morgan')

// App modules
const app = express()
const router = require('./router')
const { PUBLIC_PATH } = require('./utils/config')

// Middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use('/assets', express.static(path.join(PUBLIC_PATH, '/assets')))
app.use('/js', express.static(path.join(PUBLIC_PATH, '/js')))

// Routing
app.use('/', router)

module.exports = app
