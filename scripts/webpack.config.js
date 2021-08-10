const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const buildConfig = require('./build-config');
const { createWebpackConfig } = require('./common');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = [
  createWebpackConfig({
    entry: {
      'myshow' : fileResolve('src/myshow/index.ts'),
    },
    output: {
      path: fileResolve(''),
      filename: 'dist/[name].js',
      library: {
        name: 'MyShow',
        type: 'umd'
      },
    },
  }),
  createWebpackConfig({
    entry: {
      'bin' : fileResolve('src/bin/index.ts'),
    },
    output: {
      path: fileResolve(''),
      filename: 'dist/[name].js',
      library: {
        type: 'commonjs'
      },
    },
  })
]

