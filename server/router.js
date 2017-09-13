'use strict'

const router = require('express').Router()
const { PATH_TO_INDEX } = require('./utils/config')

const appRoutes = [ '/' ]

router.get(appRoutes, (req, res) => {
  res.sendFile(PATH_TO_INDEX)
})

module.exports = router
