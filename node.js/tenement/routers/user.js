const REGEXP = require('../lib/regexp');
const User = require('../models/user');

const defaultRes = Object.freeze({
    code: 0,
    message: '成功',
});

exports.getUser = async (ctx) => {
    const uid = ctx.params.id;
    const data = `获取 ${uid} 用户信息成功`;
    ctx.body = Object.assign({data}, defaultRes);
};

exports.createUser = async (ctx) => {
    const {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    console.log({username, password});

    if (!username || !password) {
        res.code = 1;
        res.message = '用户名或密码不能为空';
    } else {
        if (username.length >= 20) {
            res.code = 1;
            res.message = '用户名长度不能超过20个字符';
        } else if (password.length < 6 || password.length >= 20) {
            res.code = 1;
            res.message = '密码长度不能小于6个字符或超过20个字符';
        } else if (!REGEXP.password.test(password)) {
            res.code = 1;
            res.message = '密码只能包含英文字符或数字';
        }
    }

    if (res.code === 0) {
        User.fineOne({name: username}).then(result => {
            console.log(result)
        })
    }

    ctx.body = res;
};

exports.updateUser = async (ctx) => {
    const uid = ctx.params.id;
    ctx.body = `更新 ${uid} 用户信息成功`;
};

exports.deleteUser = async (ctx) => {
    const uid = ctx.params.id;
    ctx.body = `删除 ${uid} 用户信息成功`;
};