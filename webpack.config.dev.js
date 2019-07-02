const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./webpack.config');
console.log(process.env.NODE_ENV)
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