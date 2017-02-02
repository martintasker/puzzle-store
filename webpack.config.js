var webpack = require('webpack');

module.exports = {
  entry: {
    "puzzle-store": "./src/index.js"
  },
  output: {
    path: 'build',
    filename: '[name].js',
    library: 'PuzzleStore',
    libraryTarget: 'umd'
  },
  externals: [
    "immutable",
    "redux",
    "react"
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: "source-map",
  plugins: [new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })]
};
