const fs = require('fs')
const path = require('path')

const webpackConfigPath = path.join(__dirname, '../webpack.config.js')
const webpackConfig = fs.readFileSync(webpackConfigPath, 'utf8')

// Check if we're currently using the simple app
const isUsingSimpleApp = webpackConfig.includes('./simple/index.js')

// Create new webpack config
const newConfig = isUsingSimpleApp
  ? webpackConfig.replace('./simple/index.js', './index.js')
  : webpackConfig.replace('./index.js', './simple/index.js')

// Write the new config
fs.writeFileSync(webpackConfigPath, newConfig)

console.log(`Switched to ${isUsingSimpleApp ? 'main' : 'simple'} app`) 