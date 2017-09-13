'use strict'

const path = require('path')
const HappyPack = require('happypack')
const webpack = require('webpack')
const sharedHappyThreads = HappyPack.ThreadPool({ size: 1 })

let devtool

const entryPoints = [ path.join(__dirname, 'client', 'main.js') ]
const plugins = [
  new HappyPack({
    id: 'jsx/js',
    loaders: [ 'babel-loader' ],
    threadPool: sharedHappyThreads,
    threads: 1,
  }),
  new HappyPack({
    id: 'raw',
    loaders: [ 'raw-loader' ],
    threadPool: sharedHappyThreads,
    threads: 1 
  }),
  new HappyPack({
    id: 'pure-css',
    loaders: [ 'css-loader'],
    threadPool: sharedHappyThreads,
    threads: 1
  }),
  new HappyPack({
    id: 'sass',
    loaders: [ 'sass-loader'],
    threadPool: sharedHappyThreads,
    threads: 1
  }),
  new HappyPack({
    id: 'files',
    loaders: [ 'file-loader'],
    threadPool: sharedHappyThreads,
    threads: 1
  }),
  new webpack.DefinePlugin({
    __PROD__: process.env.NODE_ENV === 'production'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['main'],
    minChunks: module => /node_modules/.test(module.resource)
  })
]

if (process.env.NODE_ENV !== 'production') {
  entryPoints.push('webpack-hot-middleware/client')
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  devtool = 'eval'
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  devtool = false
}

module.exports = {
  entry: {
    main: entryPoints
  },
  devtool: devtool,
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [ 'node_modules', path.resolve(__dirname, 'public', 'js') ],
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
            options: { presets: ['react', 'es2015', 'stage-0'] }
          }
        ]
      },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: 'file-loader' },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.scss$/, use: [ 'style-loader?singleton=true', 'css-loader', 'sass-loader' ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: plugins
}
