var path = require('path');
var util = require('util');
var crypto = require('crypto');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var webpack = require('webpack');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV === 'development';

var contextPath = DEBUG ? '' : 'rms/';

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
var hash = md5((new Date).getTime() + '');
var cssBundle = path.join('css', util.format('[name].%s.css', hash));
var jsBundle = path.join('js', util.format('[name].%s.js', hash));

var cssExtractTextPlugin = new ExtractTextPlugin(cssBundle, {
  allChunks: true
});

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  cssExtractTextPlugin
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

var loaders = [
  {
    test: /\.jsx?|\.js?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader?optional=runtime']
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: 'file-loader?name=[path][name]-[hash].[ext]'
  },
  {
    test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name]-[hash].[ext]"
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: "file-loader?name=fonts/[name]-[hash].[ext]"
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: ['json-loader']
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'hash=' + hash,
        'contextPath=' + contextPath,
        'title=' + pkg.name
      ].join('&')
    ].join('!')
  },
  {
    test: /\.scss$/,
    loader: cssExtractTextPlugin.extract('style-loader', [
      'css-loader?sourceMap',
      'postcss-loader',
      'sass-loader?' + [
        'sourceMap',
        'sourceMapContents=true',
        'outputStyle=expanded',
        'includePaths[]=' + path.resolve(__dirname, './app/scss'),
        'includePaths[]=' + path.resolve(__dirname, './node_modules')
      ].join('&')
    ].join('!'))
  }
];

var entry = {
  app: ['./App.jsx']
};

if (DEBUG) {
  var url = util.format('http://%s:%d', pkg.config.devHost, pkg.config.devPort);
  entry.app.push('webpack-dev-server/client?' + url);
  entry.app.push('webpack/hot/only-dev-server');
  //entry.app.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/' + contextPath,
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    proxy: {
      '/rms/*': 'http://localhost:8080/'
    },
    stats: {colors: true}
  }
};

module.exports = config;
