// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}

const path = require('path')
const util = require('util')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const pkg = require('./package.json')

const DEBUG = process.env.NODE_ENV === 'development'

const contextPath = ''

// https://github.com/webpack/extract-text-webpack-plugin
const cssExtractTextPlugin = new ExtractTextPlugin('css/rms.css', {
  allChunks: true
})

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  cssExtractTextPlugin,
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  )
}

const loaders = [
  {
    test: /\.jsx?|\.js?$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.(jpe?g|png|gif)(?:\?.*|)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=assets/[name].[ext]',
      'image-webpack'
    ]
  },
  {
    test: /\.(ico|woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=assets/[name].[ext]'
  },
  {
    test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=assets/[name].[ext]'
  },
  {
    test: /\.svg/,
    loader: 'svg-url-loader?name=assets/[name].[ext]'
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'contextPath=' + contextPath
      ].join('&')
    ].join('!')
  },
  {
    test: /\.scss$/,
    loader: cssExtractTextPlugin.extract('style', [
      'css?sourceMap',
      'postcss',
      'sass?' + [
        'sourceMap',
        'sourceMapContents=true',
        'outputStyle=expanded',
        'includePaths[]=' + path.resolve(__dirname, './app/scss'),
        'includePaths[]=' + path.resolve(__dirname, './node_modules')
      ].join('&')
    ].join('!'))
  }
]

const entry = {
  app: ['bootstrap-loader', './index.js']
}

if (DEBUG) {
  const url = util.format('http://%s:%d', pkg.config.devHost, pkg.config.devPort)
  entry.app.push('webpack-dev-server/client?' + url)
  entry.app.push('webpack/hot/only-dev-server')
}

const config = {
  context: path.join(__dirname, '/app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/' + contextPath,
    filename: 'js/bundle.js',
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.scss']
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  }
}

module.exports = config
