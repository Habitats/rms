if (process.env.NODE_ENV === 'production') {
  console.log('RUNNING PRODUCTON!')
  module.exports = require('./configureStore.prod.js')
} else {
  console.log('RUNNING DEVELOPMENT!')
  module.exports = require('./configureStore.dev.js')
}