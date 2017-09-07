const mongoose = require('mongoose');
const mongoConfig = require('../config/mongodb');

mongoose.Promise = global.Promise;

mongoose.connect(mongoConfig.url, {
    useMongoClient: true,
    poolSize: 10,
}, (err) => {
    if (err) {
        console.error('connect to %s error: ', mongoConfig.url, err.message);
        process.exit(1);
    }
});