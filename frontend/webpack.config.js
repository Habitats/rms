// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
// This prevents crashes when running on Windows Subsystem for Linux
try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}

// Required dependencies
const path = require('path')         // Node.js path module for handling file paths
const util = require('util')         // Node.js utility functions
const webpack = require('webpack')   // Core webpack module
const pkg = require('./package.json')  // Application package.json for config values
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  // Plugin to extract CSS into separate files

// Environment configuration
// Sets DEBUG to true when in development mode (affects source maps, minification, etc.)
const DEBUG = process.env.NODE_ENV === 'development'
const contextPath = ''  // Base path for application, used in URLs

// ===== PLUGINS CONFIGURATION =====
// Plugins modify the build process and add functionality to webpack
const plugins = [
  // Extracts CSS into separate files
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  
  // Add environment-specific plugins
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
]

// ===== LOADERS/RULES CONFIGURATION =====
// Loaders/rules process different file types and transform them for the bundle
// MIGRATION NOTE: In webpack 4, 'loaders' is renamed to 'rules'
const rules = [
  // Process JS and JSX files with Babel
  {
    test: /\.jsx?|\.js?$/,           // Matches both .js and .jsx files
    exclude: /node_modules/,         // Don't process node_modules files
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
  },
  
  // Process CSS files
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  },
  
  // Process JSON files - built into webpack 5
  {
    test: /\.json$/,
    type: 'json'
  },
  
  // Process image files using asset modules
  {
    test: /\.(jpe?g|png|gif|svg|ico)(?:\?.*|)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]'
    }
  },
  
  // Process font files using asset modules
  {
    test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]'
    }
  },
  
  // Process HTML files using asset modules
  {
    test: /\.html$/,
    type: 'asset/source',
    generator: {
      filename: '[path][name][ext]'
    }
  },
  
  // Process SCSS files
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: false,
          importLoaders: 2,
          url: {
            filter: (url) => {
              return !url.endsWith('/raw');
            },
          }
        }
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'app/scss')
            ],
            silenceDeprecations: ['import', 'global-builtin'],
            quietDeps: true
          }
        }
      }
    ]
  }
]

// ===== ENTRY CONFIGURATION =====
// Entry points tell webpack what files to start processing from
const entry = {
  app: './index.js'
}

// ===== MAIN WEBPACK CONFIGURATION =====
const config = {
  mode: DEBUG ? 'development' : 'production',  // New in webpack 4, replaces many plugins
  context: path.join(__dirname, '/app'),       // Base directory for resolving entry points
  target: 'web',                               // Build for web environment
  devtool: DEBUG ? 'inline-source-map' : false,  // Source maps in development only
  entry: entry,                                // Entry points (see above)
  
  // Output configuration
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  
  // Module processing rules
  module: {
    rules: rules                               // Rules defined above
    // MIGRATION NOTE: In webpack 4, 'rules' replaces 'loaders'
  },
  
  // Plugins (defined above)
  plugins: plugins,
  
  // Configure how modules are resolved
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'bootstrap-sass': path.resolve(__dirname, 'node_modules/bootstrap-sass'),
      'react-select': path.resolve(__dirname, 'node_modules/react-select'),
      'react-select/dist/react-select.min.css': path.resolve(__dirname, 'node_modules/react-select/dist/react-select.min.css'),
      '~': path.resolve(__dirname, 'node_modules')
    },
    symlinks: true
  },
  
  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'app'),
      publicPath: '/'
    },
    hot: true,
    port: pkg.config.devPort,
    host: pkg.config.devHost,
    historyApiFallback: true,
    compress: true,
    watchFiles: {
      paths: ['app/**/*'],
      options: {
        ignored: /node_modules/,
        aggregateTimeout: 300
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: ws:; img-src 'self' https: data:; font-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: ws:; worker-src 'self' blob:; child-src 'self' blob: *.google.com; frame-src 'self' blob: *.google.com;"
    },
    proxy: [
      {
        context: ['/api', '/image', '/secret', '/session'],
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false
      }
    ]
  },
  
  // Added optimization section (webpack 4 feature)
  optimization: {
    minimize: !DEBUG,
    moduleIds: 'named',
    chunkIds: 'named'
  }
}

// Export the completed configuration
module.exports = config
