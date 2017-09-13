'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as io from 'socket.io-client'
import 'eric-meyer-reset.scss/_reset.scss'

const socket = io.connect()
const MOUNT_NODE = document.getElementById('app')

class App extends Component {

  render () {
    return (
      <p>Foobar</p>
    )
  }
}

ReactDOM.render(
  <App />,
  MOUNT_NODE
)

if (module.hot) {
  module.hot.accept()
}
