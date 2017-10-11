'use strict'

import { combineReducers } from 'redux'
import { soundsFetch, soundsQuery, trackChanged } from './sound.reducer'

export const makeRootReducer = () => {
  return combineReducers({
    soundsFetch,
    soundsQuery,
    trackChanged
  })
}

export default makeRootReducer
