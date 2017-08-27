const mongoose = require('mongoose');
const utils = require('../lib/utils');

mongoose.Promise = global.Promise;

function connect(callback) {
    mongoose.connect('mongodb://127.0.0.1:27017/tenement', {
        useMongoClient: true,
    }, async (err) => {
        if (err) {
            await utils.sleep(1000);
            connect(callback);
        }
    });
    callback && callback();
}

module.exports = connect;