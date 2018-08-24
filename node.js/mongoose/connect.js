const mongoose = require('mongoose')

// sync connect !!!???
// 如果把 localhost 换成找不到的地址 127.0.0.9 就会报如下错
// MongoNetworkError: connection 0 to 127.0.0.9:27017 timed out
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
})

const Cat = mongoose.model('Cat', {
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
  } catch (e) {
    console.log(e)
  }

  process.exit(0)
})()
