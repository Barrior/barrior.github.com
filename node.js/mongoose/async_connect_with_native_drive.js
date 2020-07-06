const MongoClient = require('mongodb').MongoClient

/*
MongoClient.connect('mongodb://localhost/', { useNewUrlParser: true }, (err, client) => {
  if (!err) {
    const db = client.db('test')
    db.collection('cats').find().toArray((err, items) => {
      if (!err) {
        console.log('cats: \n', items)
        client.close()
      }
    })
  }
})
*/

MongoClient.connect('mongodb://localhost/test', { useNewUrlParser: true }, async (err, client) => {
  if (!err) {
    try {
      const db = client.db()
      const cats = await db.collection('cats').find().toArray()
      console.log('cats: \n', cats)
    } finally {
      client.close()
    }
  }
})
