const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = require('./webpack.config');
const depsConfig = require('./deps');

const prodConfig = {
  mode: 'production',
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
}

module.exports = [
  merge(depsConfig, prodConfig),
  merge(config, prodConfig)
]