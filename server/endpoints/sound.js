'use strict'

const SoundUtil = require('../utils/sound.util')

class SoundController {

  // Get paginated tracks
  static async paginate (req, res) {
    let tracks

    try {
      tracks = await SoundUtil.fetchTracks(req.query)
    } catch (err) {
      return res.send(err.err_message)
    }

    res.json(tracks)
  }

  // Search tracks
  static async query (req, res) {
    let tracks

    try {
      tracks = await SoundUtil.queryTracks(req.query.term)
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
