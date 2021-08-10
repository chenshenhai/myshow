const path = require('path');
const { createWebpackConfig, createWebpackNodeConfig } = require('./common');

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
  createWebpackNodeConfig({
    entry: {
      'bin' : fileResolve('src/bin/index.ts'),
    },
    output: {
      path: fileResolve(''),
      filename: 'dist/[name].js',
      library: {
        type: 'commonjs-module'
      },
    },
  })
]

