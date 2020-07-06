const http = require('http')
const url = require('url')
const server = http.createServer()
const { createCircle } = require('./circle')
const { createRect } = require('./rect')
const { times } = require('lodash')

server.on('request', function (req, res) {
  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  const result = []

  switch (url.parse(req.url).pathname) {
    case '/circle':
      times(20, () => {
        result.push({
          url: createCircle().base64
        })
      })
      res.end(JSON.stringify(result))
      break
    case '/rect':
      times(20, () => {
        result.push({
          url: createRect().base64
        })
      })
      res.end(JSON.stringify(result))
      break
    default:
      res.writeHead(404, {
        'content-type': 'text/html;charset=utf-8'
      })
      res.end('页面被吃掉啦 ( T_T ) ')
  }
})

server.listen(3333, 'localhost')
