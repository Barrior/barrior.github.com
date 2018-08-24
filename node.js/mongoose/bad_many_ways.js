// 1
// const connect = require('mongodb')

// 2
// const MongoClient = require('mongodb').MongoClient
// const connect = MongoClient.connect

/*
connect('mongodb://localhost/test', { useNewUrlParser: true }, callback)
*/

// 3
// const MongoClient = require('mongodb').MongoClient
// const mongoClient = new MongoClient('mongodb://localhost/test', { useNewUrlParser: true })
//
// mongoClient.connect(callback)

// 4 ?
const MongoClient = require('mongodb').MongoClient
new MongoClient('mongodb://localhost/test', { useNewUrlParser: true }, callback)

async function callback (err, client) {
  if (!err) {
    try {
      const db = client.db()
      const cats = await db.collection('cats').find().toArray()
      console.log('cats: \n', cats)
    } finally {
      client.close()
    }
  }
}
