const http = require('http')
const url = require('url')
const server = http.createServer()
const { createCircle } = require('./circle')
const { times } = require('lodash')

server.on('request', function (req, res) {
  // console.log(url.parse(req.url), req.url)

  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  switch (url.parse(req.url).pathname) {
    case '/circle':
      const result = []
      times(20, () => {
        result.push({
          url: createCircle().base64
        })
      })
      res.end(JSON.stringify(result))
      break
    case '/user':
      res.end('用户中心')
      break
    default:
      res.writeHead(404, {
        'content-type': 'text/html;charset=utf-8'
      })
      res.end('页面被吃掉啦 ( T_T ) ')
  }
})

server.listen(3333, 'localhost')
