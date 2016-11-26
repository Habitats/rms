const util = require('util')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const pkg = require('./package.json')
const proxy = require('http-proxy-middleware')

const port = pkg.config.devPort
const host = pkg.config.devHost

const server = new WebpackDevServer(
  webpack(config),
  config.devServer
)

server.listen(port, host, function (err) {
  if (err) {
    console.log(err)
  }
  const url = util.format('http://%s:%d', host, port)
  console.log('Listening at %s', url)
})

server.use('/api|/secret|/image|/session', proxy({
  target: 'http://localhost:8081',
  changeOrigin: true
}))

server.use('*', (req, res) => res.sendFile(path.join(__dirname, 'app', 'index.html')))


