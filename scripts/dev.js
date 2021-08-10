const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');


module.exports = [
  ...config.map((conf) => {
    return merge(conf, {
      mode: 'development',
    })
  })
]