const { ObjectID } = require('mongodb')

// 创建一个新 ObjectID
console.log('create a new ObjectID: ', ObjectID())

// 转换字符串为 ObjectID
const id = ObjectID('5b7e7afa7b36e85788770b3a')
console.log('value: %s \ntype: %s', id, typeof id)

// 转换 ObjectID 为字符串
const sId = String(id) || id.toString()
console.log('value: %s \ntype: %s', sId, typeof sId)
