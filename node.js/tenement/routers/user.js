const RexExp = require('../lib/regexp');
const encryption = require('../lib/encryption');
const UserModel = require('../models/user');

const defaultRes = Object.freeze({
    code: 0,
    message: '成功',
});

exports.signup = async (ctx) => {
    let {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    if (/\s/.test(username)) {
        res.code = 1;
        res.message = '用户名不能包含空格';
    } else if (!username || !password) {
        res.code = 1;
        res.message = '用户名或密码不能为空';
    } else {
        username = username.toLowerCase();
        if (username.length >= 20) {
            res.code = 1;
            res.message = '用户名长度不能超过20个字符';
        } else if (password.length < 6 || password.length >= 20) {
            res.code = 1;
            res.message = '密码长度不能小于6个字符或超过20个字符';
        } else if (!RexExp.password.test(password)) {
            res.code = 1;
            res.message = '密码只能包含英文字符或数字';
        }
    }

    if (res.code === 0) {
        await UserModel
            .findOne({username})
            .then((result) => {
                if (result) {
                    res.code = 4;
                    res.message = '用户名已经被注册';
                } else {
                    return UserModel.create({
                        username,
                        password: encryption.encryptPassword(password),
                    });
                }
            })
            .then((newUserInfo) => {
                if (newUserInfo) {
                    ctx.session.signin = true;
                    ctx.session.userInfo = newUserInfo;
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

exports.signin = async (ctx) => {
    let {username, password} = ctx.request.body;
    const res = Object.assign({}, defaultRes);

    if (!username || !password) {
        res.code = 1;
        res.message = '用户名或密码不能为空';
    } else {
        username = username.toLowerCase();
        await UserModel
            .findOne({
                username,
                password: encryption.encryptPassword(password),
            })
            .then((userInfo) => {
                if (userInfo) {
                    res.data = {
                        username: userInfo.username,
                        id: userInfo._id,
                    };
                    res.message = '登录成功';

                    ctx.session.signin = true;
                    ctx.session.userInfo = userInfo;
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
    const res = Object.assign({}, defaultRes);

    ctx.session = null;
    res.message = '退出成功';
    ctx.body = res;
};

exports.getUserInfo = async (ctx) => {
    const res = Object.assign({}, defaultRes);

    if (ctx.session.signin) {
        res.data = Object.assign({}, ctx.session.userInfo);
        delete res.data.password;
    } else {
        res.code = -1;
        res.message = '未登录';
    }

    ctx.body = res;
};

exports.updateUser = async (ctx) => {
    const res = Object.assign({}, defaultRes);
    const body = ctx.request.body;

    try {
        delete body.password;
        await UserModel.update({_id: body.id}, body);
        const userInfo = await UserModel.findById(body.id);
        if (userInfo) {
            res.data = userInfo;
            res.message = '更新用户信息成功';
        } else {
            res.code = 1;
            res.message = '用户不存在';
        }
    } catch (err) {
        res.code = -1;
        res.message = '服务器错误';
    }

    ctx.body = res;
};

exports.deleteUser = async (ctx) => {
    const res = Object.assign({}, defaultRes);
    const query = ctx.request.query;

    try {
        const userInfo = await UserModel.findByIdAndRemove(query.id);
        if (userInfo) {
            res.message = '删除用户成功';
            res.data = userInfo._doc;
            delete res.data.password;
        } else {
            res.code = 1;
            res.message = '用户不存在';
        }
    } catch (err) {
        res.code = -1;
        res.message = '服务器错误';
    }

    ctx.body = res;
};