const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');


module.exports = merge(config, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 9000,
    hot: false,
    inline: false,
  }
})