const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackCompretion = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const { version } = require('./config')

const isProd = process.env.NODE_ENV === 'production'
const targetEnv = process.env.TARGET_ENV


// webpack define plugin untuk constant
const constant =
  targetEnv === 'prod'
    ? new webpack.DefinePlugin({
      CONF_BASE_URL: JSON.stringify('http://localhost:4000'),
      CONF_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })
    : new webpack.DefinePlugin({
      CONF_BASE_URL: JSON.stringify('https://todo-kredivo.herokuapp.com'),
      CONF_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
})


// const swPlugin = new ServiceWorkerWebpackPlugin({
//   entry: path.join(__dirname, 'public/OneSignalSDKWorker.js'),
// })

// copy src to dist
const copyPlugin = new CopyWebpackPlugin([{ from: 'public' }])

// gzip
// const gziPlugin = new WebpackCompretion({
//   filename(asset) {
//     const newAsset = asset.replace('.gz', '')
//     return newAsset
//   },
//   algorithm: 'gzip',
//   test: /\.(js)$/,
//   deleteOriginalAssets: false,
// })

const uglifyjs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true, // set to true if you want JS source maps
})

const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({})

const cssPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: '[name].css',
  chunkFilename: '[name].css',
})

// const manifestPlugin = new ManifestPlugin()

module.exports = {
  optimization: {
    minimizer: [uglifyjs, optimizeCssPlugin],
  },
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    // 'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/',
  },
  devtool: isProd ? 'source-map' : 'eval',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/image/[ext]/[name].[ext]',
            },
          },
          //   {
          //     test: /\.(graphql|gql)$/,
          //     exclude: /node_modules/,
          //     loader: 'graphql-tag/loader',
          //   },
          {
            test: /sw\.js/,
            exclude: /node_modules/,
            type: 'javascript/auto',
            loader: 'file-loader',
            options: {
              name: 'sw.js',
            },
          },
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.scss$/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  //   modules: true,
                  //   importLoaders: 1,
                  //   localIdentName: '[name]_[local]_[hash:8]',
                  minimize: true,
                },
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  //   modules: true,
                  //   localIdentName: '[name]_[local]_[hash:8]',
                  minimize: true,
                },
              },
              //   'postcss-loader',
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.(mov|mp4|webm)$/,
            use: ['file-loader'],
          },
          {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {
              name: 'static/media/image/svg/[name].[ext]',
            },
          },
          {
            // test: /\.(ttf|otf|eot|woff(2)?)?$/,
            test: [/\.ttf$/, /\.otf$/, /\.woff$/, /\.eot$/],
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
          {
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: isProd
    ? [
      htmlPlugin,
      constant,
      cssPlugin,
      uglifyjs,
      new webpack.optimize.AggressiveMergingPlugin(),
      // gziPlugin,
      copyPlugin,
      // new BundleAnalyzerPlugin(),
      // manifestPlugin,
      // SWplugins,
    ]
    : [htmlPlugin, constant, cssPlugin, copyPlugin],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      molecules: path.join(__dirname, 'src/molecules/'),
      organism: path.join(__dirname, 'src/organism/'),
      graphQuery: path.join(__dirname, 'src/graphQuery/'),
      pages: path.join(__dirname, 'src/pages/'),
      modules: path.join(__dirname, 'src/modules/'),
      utils: path.join(__dirname, 'src/utils/'),
      img: path.join(__dirname, 'src/img/'),
    },
  },
}
