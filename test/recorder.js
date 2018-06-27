const http = require('http')
//const config = require('config')
const vcr = require('node-vcr')
const debug = require('debug')('node-meraki:recorder')
const crypto = require('crypto')
const _ = require('lodash')

const port = 8888
const proxyTarget = 'http://localhost:5000/api'

const hash = (req, body) => {
  const service = 'meraki'
  const action = `${req.method.toLowerCase()}_${_.last(req.url.split('/'))}`
  const content = body.toString()
  const md5sum = crypto.createHash('md5')

  return `${service}_${action}_${md5sum.update(content).digest('hex')}`
}

const handler = vcr(proxyTarget, {
  dirname: `${__dirname}/meraki-playback`,
  tapeRequestBody: true,
  ignoreHeaders: [
    'public-key-pins-report-only',
    'x-cisco-meraki-api-key',
    'content-length'
  ],
  hash
})

debug(`localhost listening on port ${port} to proxy to ${proxyTarget}`)

const server = http.createServer(handler)

function startServer () {
  // All requests issued to localhost:8888 will be proxied
  server.listen(port)
  return server
}

function stopServer () {
  server.close()
}

module.exports = {
  startServer,
  stopServer
}

/**
 * Start the server if the file is started with node
 */
if (require.main === module) {
  startServer()
}

