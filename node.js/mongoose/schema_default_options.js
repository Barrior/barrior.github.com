const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
})

const schemeOptions = {
  // 禁用版本字段（ __v ）
  versionKey: false,

  // 为文档添加时间戳，默认为 createdAt 和 updatedAt 字段
  // 通过下面方式修改字段名称
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: Number
}, schemeOptions)

const Cat = mongoose.model('Cat', schema)

;(async function start () {
  try {
    const tom = await Cat.create({ name: 'Tom' })
    console.log(tom)
  } catch (e) {
    console.log('err: ', e)
  }

  process.exit(0)
})()
