const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true
})

const schemeOptions = {
  // 通过设置该选择为 false, 则可以让子 schema 不生成 _id 字段，在大数据，节约存储时可以用上
  // 减少不必要的 _id 字段的生成
  _id: false,

  // 禁用版本（ __v ）字段
  versionKey: false,

  // 为文档添加时间戳，默认为 createdAt 和 updatedAt 字段
  // 通过下面方式修改字段名称
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const schema = new mongoose.Schema({
  name: String,
  age: Number
}, schemeOptions)

const Cat = mongoose.model('Cat', schema)

;(async function start () {
  try {
    const tom = await Cat.findOne({ name: 'Tom' })
    console.log(tom)
  } catch (e) {
    console.log('err: ', e)
  }

  process.exit(0)
})()
