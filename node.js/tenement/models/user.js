const mongoose = require('mongoose');
const RexExp = require('../lib/regexp');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        min: 1,
        max: 20,
    },
    password: {
        type: String,
        min: 6,
        max: 20,
    },
    email: {
        type: String,
        trim: true,
        match: RexExp.email,
    },
    tel: {
        type: Number,
        trim: true,
        match: RexExp.tel,
    },
    avatar: String,
});

module.exports = mongoose.model('User', userSchema);