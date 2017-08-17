const mongoose = require('mongoose');
const utils = require('../lib/utils');

mongoose.Promise = global.Promise;

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/tenement', {
        useMongoClient: true,
    }, async (err) => {
        if (err) {
            await utils.sleep(1000);
            connect();
        }
    });
}
connect();

const userSchema = mongoose.Schema({
    name: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);