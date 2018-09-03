const mongoose = require('mongoose')

const testDB = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true
})

const Cat = testDB.model('Cat', {
  name: String,
  age: Number
})

;(async function start () {
  try {
    const tom = await Cat.findOne({})

    const info = { age: 3, name: 'May' }

    // set info
    tom.set(info)

    // or this way
    // Object.assign(tom, info)

    await tom.save()

    console.log(tom)
  } catch (e) {
    console.log(e)
  }

  process.exit(0)
})()
