'use strict'

// Main Imports
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configure.store'
import * as io from 'socket.io-client'
import 'eric-meyer-reset.scss/_reset.scss'
import './styles/app.scss'

// Component Imports
import Nav from './components/nav.component'
import Player from './containers/player.container'

const store = configureStore()
const socket = io.connect('', { 'transports': [ 'websocket', 'polling' ] })

const MOUNT_NODE = document.getElementById('app')

class App extends Component {

  render () {
    return (
      <div className="container">
        <Nav />
        <Player />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
)

// HMR
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => socket.disconnect())
}
