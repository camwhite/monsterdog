'use strict'

const _shuffle = require('lodash/shuffle')
const { fetchTracks, queryTracks } = require('../utils/sound.util')

class SoundController {

  // Get paginated tracks
  static async paginate (req, res) {
    let tracks

    try {
      tracks = await fetchTracks()
    } catch (err) {
      return res.status(err.code).send(err)
    }

    res.json(_shuffle(tracks))
  }

  // Search tracks
  static async query (req, res) {
    let tracks

    try {
      tracks = await queryTracks(req.query.term)
    } catch (err) {
      return res.status(err.status).send(err)
    }

    res.json(tracks)
  }

}

module.exports = (router) => {
  router.get('/api/sounds', SoundController.paginate)
  router.get('/api/sounds/search', SoundController.query)
}
