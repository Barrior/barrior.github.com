const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const router = require('./routers/index');
const User = require('./models/user');
const utils = require('./lib/utils');
const encryption = require('./lib/encryption');

const app = new Koa();
const sessionConfig = {
    key: 'koa:sess',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
};

app.keys = ['cookie_sign_key_1', 'cookie_sign_key_2'];

// get login state
app.use(async (ctx, next) => {
    const loginState = ctx.cookies.get('loginState', {signed: true});
    try {
        const uid = encryption.decipher(loginState);
        await User.findOne({_id: uid}).then((userInfo) => {
            if (userInfo) {
                Object.freeze(userInfo);
                utils.defineReadOnlyProperty(ctx, 'logined', userInfo);
            }
        });
    } catch (e) {

    }
    await next();
});

app.use(session(sessionConfig, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);