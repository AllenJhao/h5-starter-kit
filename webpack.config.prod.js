const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SizePlugin = require('size-plugin');
const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(
      chunk => chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:6].css',
      chunkFilename: 'static/css/[name].[contenthash:6].css',
    }),
    new SizePlugin(),
    new VueLoaderPlugin()
  ]
})