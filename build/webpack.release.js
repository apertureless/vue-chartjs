var vue = require('vue-loader')
var path = require('path')
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var projectRoot = path.resolve(__dirname, '../')
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader')

module.exports = {
  entry: {
    'vue-chartjs': './src/index.js'
  },
  output: {
    filename: './dist/[name].js',
    library: 'VueChartJs',
    libraryTarget: 'umd'
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: cssLoader
      },
      {
        test: /\.s[a|c]ss$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {

  delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
    // new ExtractTextPlugin('build.css')
  ]
}
