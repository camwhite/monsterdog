'use strict'

const Soundcloud = require('node-soundcloud')

Soundcloud.init({
  id: '480c18c7ce22bbe09e989422102de2c8',
  secret: '645c9dfed9d3dea4e02854e268c379ff',
  uri: 'foo'
})

let uri = '/users/8553751/tracks'

class SoundUtil {

  // Search the Soundcloud API
  static queryTracks (term) {
    return new Promise((resolve, reject) => {
      Soundcloud.get('/tracks', {
        limit: 100,
        q: term
      }, (err, tracks) => {
        if (err) reject(err)

        resolve(tracks)
      })
    })
  }

  // Fetch monstercat tracks
  static fetchTracks () {
    return new Promise((resolve, reject) => {
      Soundcloud.get(uri, {
        limit: 100,
        linked_partitioning: 1
      }, (err, { collection, next_href }) => {
        if (err) reject(err)

        if (next_href) {
          uri = next_href.replace('https://api.soundcloud.com', '')
        } else {
          uri = '/users/8553751/tracks'
          reject({ code: 400, message: 'Done!' })
        }

        resolve(collection)
      })
    })
  }

}

module.exports = SoundUtil
