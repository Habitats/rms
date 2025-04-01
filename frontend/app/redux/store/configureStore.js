/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */

let configureStore = null

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.prod').configureStore
} else {
  configureStore = require('./configureStore.dev').configureStore
}

export { configureStore }