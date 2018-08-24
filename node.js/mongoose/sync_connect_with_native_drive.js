const MongoClient = require('mongodb').MongoClient

const db = new MongoClient('mongodb://localhost/test').db()

// will get an error:
// MongoClient must be connected before calling MongoClient.prototype.db

;(async function start () {
  const cats = await db.collection('cats').find()
  console.log(cats)
})()
