const { ObjectID } = require('mongodb')

// 创建一个新 ObjectID
console.log('create a new ObjectID: ', ObjectID())

// 检查一个字符串是否是有效的 ObjectID
console.log('is valid ObjectId: ', ObjectID.isValid('5bc94a92b01aa48f1cbe782d')) // true
console.log('is valid ObjectId: ', ObjectID.isValid('11')) // false

// 转换字符串为 ObjectID
const id = ObjectID('5b7e7afa7b36e85788770b3a')
console.log('value: %s \ntype: %s', id, typeof id)

// 转换 ObjectID 为字符串
const sId = String(id) || id.toString()
console.log('value: %s \ntype: %s', sId, typeof sId)

// 12 byte binary string 换成为 24 字符的 js string
// time      machine   pid     Encode index
// 5b7fab94   b80bc1   5dfd    5e7ab6

// time: 时间差隔大于等于 100 ms 则不同，小于则相同
