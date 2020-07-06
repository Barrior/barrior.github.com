const mongoose = require('mongoose')

// Operation Buffering: like sync connect
mongoose.connect('mongodb://localhost:27017/test', {
  // 如果指定 useNewUrlParser: true，则必须在连接字符串中指定端口
  // 新的 URL 解析程序不支持没有端口
  useNewUrlParser: true
})

const Cat = mongoose.model('Cat', {
  name: String,
  age: Number
})

// 创建多个数据库连接
const test2 = mongoose.createConnection('mongodb://localhost:27017/test2', {
  useNewUrlParser: true
})

const Cat2 = test2.model('Cat', {
  name: String,
  age: Number
})

;(async function start () {
  try {
    const tom = await Cat.create({ name: 'Tom' })
    console.log(tom)

    tom.age = 2
    await tom.save()
    console.log(tom)

    const tom2 = await Cat2.create({ name: 'Tom' })
    console.log(tom2)
  } catch (e) {
    console.log(e)
  }

  process.exit(0)
})()
