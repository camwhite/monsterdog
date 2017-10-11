'use strict'

const chalk = require('chalk')
const sockets = require('socket.io')

const bindListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(chalk.green(`socket ${socket.id} connected`))

    socket.on('disconnect', () => console.log(chalk.yellow(`socket ${socket.id} disconnected`)))
  })
}

module.exports = (server) => {
  const io = sockets(server, { transports: ['websocket', 'polling'] })
  bindListeners(io)
}
