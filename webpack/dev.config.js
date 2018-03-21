const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require("path");
const base = require('./base.config.js');

module.exports = merge(base, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    port: 9000
  },
});