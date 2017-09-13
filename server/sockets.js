'use strict'

const sockets = require('socket.io')

const bindListeners = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
  })
}

module.exports = (server) => {
  const io = sockets(server, { transports: ['websocket', 'polling'] })
  bindListeners(io)
}
