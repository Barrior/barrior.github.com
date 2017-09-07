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
    sex: String,
    age: {
        type: String,
        min: 0,
        max: 200,
    },
    avatar: String,
    is_block: {type: Boolean, default: false},

    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);