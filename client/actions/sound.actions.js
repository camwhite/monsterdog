'use strict'

import { fetchRandomized, fetchQuery } from '../utils/sound.util'
import _findIndex from 'lodash/findIndex'
import _unionBy from 'lodash/unionBy'

export const getSounds = () => (dispatch, getState) => {
  const previousSounds = getState().soundsFetch.sounds || []
  dispatch({
    type: 'SOUNDS_REQUEST'
  })

  return fetchRandomized()
    .then(sounds => {
      dispatch({
        type: 'SOUNDS_SUCCESS',
        sounds: _unionBy(previousSounds, sounds, 'id')
      })
    })
    .catch(err => {
      dispatch({
        type: 'SOUNDS_FAILURE',
        err: err
      })
    })
}

export const querySounds = (query) => (dispatch, getState) => {
  const { track } = getState().trackChanged
  dispatch({
    type: 'QUERY_REQUEST'
  })

  return fetchQuery(query)
    .then(results => {
      const index = _findIndex(results, (r) => r.id === track.id)
      if (index === -1) {
        results.push(track)
      }
      dispatch({
        type: 'QUERY_SUCCESS',
        results
      })
    })
    .catch(err => {
      dispatch({
        type: 'QUERY_FAILURE',
        err: err
      })
    })
}

export const changeTrack = (track) => (dispatch) => {
  return dispatch({
    type: 'TRACK_CHANGE',
    track
  })
}
