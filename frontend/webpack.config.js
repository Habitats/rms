var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV === 'development';

var contextPath = '';

var cssExtractTextPlugin = new ExtractTextPlugin('css/rms.css', {
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
    loader: 'react-hot'
  },
  {
    test: /\.jsx?|\.js?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['react', 'es2015']
    }
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loader: 'json-loader'
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    exclude: /node_modules/,
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
    exclude: /node_modules/,
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
    exclude: /node_modules/,
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
