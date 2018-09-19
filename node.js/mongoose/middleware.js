const mongoose = require('mongoose')

const testDB = mongoose.createConnection('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number
})

/* Serial 串行 */
// 用 next 方式调用中间件
// pre 保存文档之前调用
schema.pre('save', function (next) {
  console.log('this:', this)
  next()
})

// 5.x 用 async 方式调用中间件
// post 已经保存后调用
schema.post('save', async function () {
  console.log('this:', this)
})

/*
所有的 pre('validate') 和 post('validate') 钩子
在任何 pre('save') 钩子之前调用
*/

const Person = testDB.model('Person', schema)

;(async function start () {
  try {
    const people = await Person.findOne()
    people.name = `Barrior - ${Math.random().toFixed(6)}`

    console.log('people: ', people)
    await people.save()
  } catch (e) {

  }
  process.exit(0)
})()
