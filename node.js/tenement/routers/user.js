const REGEXP = require('../lib/regexp');
const encryption = require('../lib/encryption');
const User = require('../models/user');

const defaultRes = Object.freeze({
    code: 0,
    message: '成功',
});

exports.getCookie = async (ctx) => {
    console.log('logined:', ctx.logined)
    ctx.body = ctx.logined;
};

exports.signin = async (ctx) => {
    const {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    if (!username || !password) {
        res.code = 1;
        res.message = '用户名或密码不能为空';
    } else {
        await User
            .findOne({
                username,
                password: encryption.encryptPassword(password),
            })
            .then((userInfo) => {
                if (userInfo) {
                    res.data = {
                        username,
                        id: userInfo._id,
                    };
                    res.message = '登录成功';

                    // set login state
                    ctx.cookies.set(
                        'loginState',
                        encryption.cipher(userInfo._id.toString()),
                        {
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            httpOnly: true,
                            signed: true,
                            overwrite: false
                        }
                    );
                } else {
                    res.code = 1;
                    res.message = '用户名或密码错误';
                }
            })
            .catch(console.error);
    }

    ctx.body = res;
};

exports.signout = async (ctx) => {
    const {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    ctx.body = res;
};

exports.signup = async (ctx) => {
    const {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    console.log({username, password});

    if (/\s/.test(username)) {
        res.code = 1;
        res.message = '用户名不能包含空格';
    } else if (!username || !password) {
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
        await User
            .findOne({username})
            .then((result) => {
                if (result) {
                    res.code = 4;
                    res.message = '用户名已经被注册';
                } else {
                    return User.create({
                        username,
                        password: encryption.encryptPassword(password),
                    });
                }
            })
            .then((newUserInfo) => {
                if (newUserInfo) {
                    res.data = {
                        username,
                        id: newUserInfo._id,
                    };
                    res.message = '注册成功';
                }
            })
            .catch(console.error);
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