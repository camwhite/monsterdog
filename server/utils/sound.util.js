'use strict'

const Soundcloud = require('node-soundcloud')
const _shuffle = require('lodash/shuffle')

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
  static async fetchTracks (query) {
    let track
    console.log(query)
    if (query.track) {
      track = await this.fetchTrack(query.track)
    }

    return new Promise((resolve, reject) => {
      Soundcloud.get(uri, {
        limit: 100,
        linked_partitioning: 1
      }, (err, data) => {
        if (err) reject(err)

        data.collection = _shuffle(data.collection)
        if (track) {
          data.collection.unshift(track)
        }

        if (data.next_href) {
          uri = data.next_href.replace('https://api.soundcloud.com', '')
        } else {
          uri = '/users/8553751/tracks'
          reject({ code: 400, message: 'Done!' })
        }

        resolve(data.collection)
      })
    })
  }

  static fetchTrack (track) {
    return new Promise((resolve, reject) => {
      Soundcloud.get(`/tracks/${track}`, (err, track) => {
        if (err) reject(err)

        resolve(track)
      })
    })
  }

}

module.exports = SoundUtil
