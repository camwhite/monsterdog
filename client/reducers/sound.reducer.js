'use strict'

export const soundsFetch = (state = {}, action) => {
  switch (action.type) {
    case 'SOUNDS_REQUEST' :
      return {
        ...state,
        isFetching: true
      }
    case 'SOUNDS_SUCCESS' :
      return {
        ...state,
        sounds: action.sounds,
        isFetching: false
      }
    case 'SOUNDS_FAILURE' :
      return {
        ...state,
        err: action.err,
        isFetching: false
      }
    default :
      return state
  }
}

export const soundsQuery = (state = {}, action) => {
  switch (action.type) {
    case 'QUERY_REQUEST' :
      return {
        ...state,
        isFetching: true
      }
    case 'QUERY_SUCCESS' :
      return {
        ...state,
        results: action.results,
        isFetching: false
      }
    case 'QUERY_FAILURE' :
      return {
        ...state,
        err: action.err,
        isFetching: false
      }
    default :
      return state
  }
}

export const trackChanged = (state = {}, action) => {
  switch (action.type) {
    case 'TRACK_CHANGE' :
      return {
        ...state,
        track: action.track
      }
    default :
      return state
  }
}
