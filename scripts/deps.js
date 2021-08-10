const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildConfig = require('./build-config');
const { createWebpackConfig } = require('./common');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = createWebpackConfig({
  mode: 'development',
  entry: {
    'iDraw' : fileResolve('src/deps/idraw.js'),
    'React' : fileResolve('src/deps/react.js'),
    'ReactDOM' : fileResolve('src/deps/react-dom.js'),
    'antd' : fileResolve('src/deps/antd.js'),
  },
 
  output: {
    path: fileResolve(''),
    filename: 'dist/[name].js',
    library: {
      name: '[name]',
      type: 'umd'
    },
  },
});
 