const defaultRes = {
    code: 0,
    message: '成功',
};

exports.getUser = async (ctx) => {
    const uid = ctx.params.id;
    const data = `获取 ${uid} 用户信息成功`;
    ctx.body = Object.assign({data}, defaultRes);
};

exports.createUser = async (ctx) => {
    const params = ctx.request.body;
    console.log(params);
    const res = Object.assign({}, defaultRes);
    if (!params.name || !params.password) {
        res.code = 1;
        res.message = '用户名或密码不能为空';
    } else {
        res.message = '创建用户信息成功';
    }
    ctx.body =res;
};

exports.updateUser = async (ctx) => {
    const uid = ctx.params.id;
    ctx.body = `更新 ${uid} 用户信息成功`;
};

exports.deleteUser = async (ctx) => {
    const uid = ctx.params.id;
    ctx.body = `删除 ${uid} 用户信息成功`;
};