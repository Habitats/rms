const path = require('path');
const util = require('util');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

const DEBUG = process.env.NODE_ENV === 'development';

const contextPath = '';

const cssExtractTextPlugin = new ExtractTextPlugin('css/rms.css', {
  allChunks: true
});

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  cssExtractTextPlugin,
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
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
  );
}

const loaders = [
  {
    test: /\.jsx?|\.js?$/,
    exclude: /node_modules/,
    loader: 'react-hot'
  },
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
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: 'file-loader?name=[path][name].[ext]'
  },
  {
    test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: 'file-loader?name=fonts/[name].[ext]'
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
];

const entry = {
  app: ['bootstrap-loader', './index.js']
};

if (DEBUG) {
  const url = util.format('http://%s:%d', pkg.config.devHost, pkg.config.devPort);
  entry.app.push('webpack-dev-server/client?' + url);
  entry.app.push('webpack/hot/only-dev-server');
}

const config = {
  context: path.join(__dirname, 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/' + contextPath,
    filename: 'js/rms.js',
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
    proxy: {
      '/*': 'http://localhost:8080/'
    },
    stats: {colors: true}
  }
};

module.exports = config;
