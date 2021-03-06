const path = require('path')
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
    alias: {
      assets: path.resolve('src', 'assets'),
    },
    extensions: ['.js', '.vue', '.css', '.scss'],
  },
  entry: {
    app: path.resolve(__dirname, 'src/index'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: process.env.NODE_ENV === 'development' ?  'static/js/[name].js' : 'static/js/[name].[contenthash:6].js',
    chunkFilename: process.env.NODE_ENV === 'development' ?  'static/js/[name].js' : 'static/js/[name].[contenthash:6].js',
  },
  module: {
    rules:[{
      test: /\.vue$/,
      use: [{ loader: 'vue-loader' }]
    }, {
      test: /\.pug$/,
      use: [{ loader: 'pug-plain-loader' }]
    }, {
      test: /\.js$/,
      use: [{ loader: 'babel-loader'}],
      exclude: /node_modules/,
    }, {
      test: /\.scss|\.css$/,
      use: [
        process.env.NODE_ENV === 'development' ? {
          loader: ExtractCssChunksWebpackPlugin.loader,
          options: {
            hot: true,
            modules: true,
            reloadAll: true
          }
        } : MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          query: {
            modules: true,
            sourceMap: true,
            localIdentName: '[folder]-[local]-[hash:6]',
          },
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('postcss-preset-env')({
                path: [path.resolve(__dirname, 'src')],
              }),
              require('postcss-import')({
                browsers: 'last 2 versions, ie > 9',
              }),
            ].concat(process.env.NODE_ENV === 'development'
              ? []
              : [require('cssnano')()],
            ),
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          query: {
            sourceMap: true,
          },
        },
      ],
    }, {
      test: /.(jpeg|jpg|png|gif)$/,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: process.env.NODE_ENV === 'development'
              ? 'dist/static/files/[name].[ext]'
              : 'dist/static/files/[name]-[hash:6].[ext]',
          },
        },
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              optimizationLevel: 7,
              interlaced:        false,
            },
            pngquant: {
              optimizationLevel: 7,
              interlaced:        false,
              quality:           '65-90',
              speed:             4,
            },
            gifsicle: {
              optimizationLevel: 7,
              interlaced:        false,
            },
          },
        },
      ],
    }, {
      test: /.svg$/,
      loader: 'svg-inline-loader',
    },]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        shared: {
          name: 'shared',
          minChunks: 2,
          test: /\.vue?$/,
        },
        styles: {
          name: 'styles',
          minSize: 0, //Ignore minSize for CSS files, to force them in new chunks
          test: /\.scss|\.css$/,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
        },
      },
    },
  }
}
