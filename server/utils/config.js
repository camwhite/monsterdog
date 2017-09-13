'use strict'

const path = require('path')
const publicPath = path.join(__dirname, '../../public/')

module.exports = {
  PUBLIC_PATH: publicPath,
  PATH_TO_INDEX: path.join(publicPath, 'index.html')
}
