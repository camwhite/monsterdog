'use strict'

const chalk = require('chalk')
const http = require('http')
const sockets = require('./sockets')
const app = require('./app')

const port = process.env.PORT || 9000

app.set('port', port)
if (process.env.NODE_ENV !== 'production') {
  require('../webpack')(app)
}

const httpServer = http.createServer(app)

httpServer.on('error', (err) => {
  console.error(err)
})

httpServer.on('listening', () => {
  console.log(chalk.blue(`Express server is listening on ${httpServer.address().port}`))
})

httpServer.listen(port, () => sockets(httpServer))
