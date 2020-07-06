const mongoose = require('mongoose')

const testDB = mongoose.createConnection('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true
})

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: Number,
  email: String,
  phone: Number
})

// 为已经存在的路径定义虚拟值，需同时配合下面【3】的设置
schema.path('first_name').get(function (v) {
  return v + ' is my name'
})

// 定义虚拟属性，如果想在 console.log 中得到该值，需要配合如下【3】的设置
schema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name
})

// 3
// 定义了如下设置，find 出来的对象【不使用toJSON】也会包含虚拟值
schema.set('toJSON', { getters: true, virtuals: true })
schema.set('toObject', { getters: true, virtuals: true })

const Person = testDB.model('Person', schema)

;(async function start () {
  try {
    const people = await Person.findOne({ first_name: 'Barrior' })
    console.log('people: ', people)
    console.log('people.toJSON(): ', people.toJSON())
    console.log('JSON.stringify(people): ', JSON.stringify(people))
    console.log('fullName: ', people.full_name)
  } catch (e) {

  }
  process.exit(0)
})()
