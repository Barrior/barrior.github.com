const mongoose = require('mongoose')

const testDB = mongoose.createConnection('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  email: String,
  phone: Number
})

const Person = testDB.model('Person', schema)

;(async function start () {
  try {
    // select 类似 MongoDB projection，但是貌似比它强大
    // + 表示包含
    // - 表示排除
    const people = await Person.findOne().select('+name -created_at')

    console.log('people: ', people)
  } catch (e) {

  }
  process.exit(0)
})()
