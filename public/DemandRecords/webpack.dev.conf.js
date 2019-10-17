const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.js');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    hot: true,
    noInfo: true,
    port: 3000,
    quiet: true
  },
  plugins: [
    // Javascript热更新配置
    new webpack.HotModuleReplacementPlugin()
  ]
});