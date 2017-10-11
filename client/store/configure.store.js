'use strict'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import makeRootReducer from '../reducers'

export default (initialState = {}) => {
  const middlewares = [ thunk ]

  if (!__PROD__) {
    middlewares.push(createLogger())
  }

  return createStore(
    makeRootReducer(),
    applyMiddleware(...middlewares)
  )
}
