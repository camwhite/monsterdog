'use strict'

import * as request from 'superagent'

export const fetchRandomized = () => {
  const qs = window.location.search || ''
  console.log(qs)
  return new Promise((resolve, reject) => {
    request.get('/api/sounds' + qs)
      .set('accept', 'json')
      .end((err, { body }) => {
        if (err) reject(err)
        resolve(body)
      })
  })
}

export const fetchQuery = (query) => {
  return new Promise((resolve, reject) => {
    request.get('/api/sounds/search')
      .query({ term: query })
      .set('accept', 'json')
      .end((err, { body }) => {
        if (err) reject(err)
        resolve(body)
      })
  })
}
