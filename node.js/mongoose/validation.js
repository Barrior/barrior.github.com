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
  email: {
    type: String,
    // 自定义验证器规则
    required: function (v) {
      console.log('required: ', v, this)
      return (typeof this.name !== 'undefined')
    }
  },
  phone: {
    type: String,
    // 自定义验证器
    validate: {
      validator: function (v) {
        console.log('validator: ', this, v)
        return /^1[3456789]\d{9}$/.test(v)
      },
      message: function (props) {
        return `${props.value} is not a valid phone number!`
      }
    }
  }
})

const Person = testDB.model('Person', schema)

const info = { name: 'Barrior', age: 25, phone: 13100001111 }
const doc = new Person(info)

const err = doc.validateSync()

// 有错误并不会直接抛出错误
if (err) {
  // 这个 err 的信息更详尽
  // console.log(err)
  throw new Error(err)
}

/*
;(async function start () {
  try {

    // save() 默认会触发模型校验 model validation
    const result = await doc.save((err) => {
      if (err) {
        console.log(err)
      }
    })
    console.log('result: ', result)

  } catch (e) {

  }
})()
*/
