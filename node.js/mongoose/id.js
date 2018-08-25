const mongoose = require('mongoose')
const http = require('http')

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
})

const Cat = mongoose.model('Cat', {
  name: String,
  age: Number
})

;(async function start () {
  try {
    const tom = await Cat.findOne({})

    console.log('_id: ', tom._id)
    console.log('_id type: ', typeof tom._id)

    // 版本 5.x ? 就有了默认的虚拟属性 id
    // 类型为 string
    console.log('id: ', tom.id)
    console.log('id type: ', typeof tom.id)

    // 默认访问的时候才有，直接返回 tom 对象到 http response 没有 id 属性
    // {"_id":"5b7a76175c20ff04acb6c4cf","name":"Tom","__v":0}
    console.log(JSON.stringify(tom))
  } catch (e) {
    console.log('err: ', e)
  }

  // process.exit(0)
})()

const person = {
  age: 25,
  get name () {
    return 'barrior'
  }
}

// {"age":25,"name":"barrior"}
console.log(JSON.stringify(person))

http.createServer().on('request', async function (req, res) {
  const tom = await Cat.findOne({})
  // {"_id":"5b7a76175c20ff04acb6c4cf","name":"Tom","__v":0}
  res.end(JSON.stringify(tom))
}).listen(8086, '127.0.0.1')
