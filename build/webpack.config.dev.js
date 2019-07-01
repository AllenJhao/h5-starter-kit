const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: 'dist',
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractCssChunksWebpackPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].css',
    }),
    new VueLoaderPlugin()
  ],
})