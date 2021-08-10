const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { merge } = require('webpack-merge');
const buildConfig = require('./build-config');

module.exports = {
  createWebpackConfig
}

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};


function createWebpackConfig(config) {
  return merge(baseConfig, config);
}

const baseConfig = {
 
  entry: {
    // 'myshow' : fileResolve('src/myshow/index.ts'),
    // 'bin' : fileResolve('src/bin/index.ts'),
  },
 
  output: {
    // path: fileResolve(''),
    // filename: 'dist/[name].js',
    // library: {
    //   name: 'MyShow',
    //   type: 'umd'
    // },
  },
  module: { 
    rules: [ 
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            'plugins': []
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: buildConfig.deps,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css'
    }),
    new NodePolyfillPlugin(),
  ],
}