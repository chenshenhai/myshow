const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'dist/[name].css'
      }),
    ],
  }),
  createWebpackConfig({
    entry: {
      'index' : fileResolve('src/page/index/index.tsx'),
      'editor' : fileResolve('src/page/editor/index.tsx'),
    },
    output: {
      path: fileResolve(''),
      filename: 'dist/public/page/[name].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'dist/public/page/[name].css'
      }),
    ],
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

