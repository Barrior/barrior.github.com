const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
})

const Cat = mongoose.model('Cat', {
  name: String,
  age: Number
})

;(async function start () {
  try {
    const tom = await Cat.findOne({ name: 'Tom' })
    console.log(tom)
  } catch (e) {
    console.log(e)
  }

  process.exit(0)
})()
