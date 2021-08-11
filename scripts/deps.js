const path = require('path');
const { merge } = require('webpack-merge'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildConfig = require('./build-config');
const { createWebpackConfig } = require('./common');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};


module.exports = {
  mode: 'development',
  entry: {
    'iDraw' : fileResolve('src/deps/idraw.js'),
    'React' : fileResolve('src/deps/react.js'),
    'ReactDOM' : fileResolve('src/deps/react-dom.js'),
    'antd' : fileResolve('src/deps/antd.js'),
  },
  output: {
    path: fileResolve(''),
    filename: 'dist/public/deps/[name].js',
    library: {
      name: '[name]',
      type: 'umd'
    },
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
      filename: 'dist/public/deps/[name].css'
    }),
  ],
}