const Hapi = require('hapi')

// swagger & view the documentation
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')

// router validate
const Joi = require('joi')

// create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8066
})

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  options: {
    tags: ['say hi', 'test'],
    description: '测试 Hello 接口',
    validate: {
      query: {
        name: Joi.string().required()
      }
    }
  },
  handler: function (request, h) {
    return 'hello ' + request.query.name
  }
})

server.route({
  method: 'GET',
  path: '/user',
  options: {
    tags: ['user'],
    description: '获取用户基础信息'
  },
  handler: function (request, h) {
    return {
      user: 'Barrior',
      sex: 'male'
    }
  }
})

// Start the server
async function start () {
  try {
    const swaggerOptions = {
      info: {
        title: 'API Documentation',
        version: '1.0.0'
      }
    }

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ])

    await server.start()
    console.log('Server running at:', server.info.uri)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
