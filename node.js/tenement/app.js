const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const router = require('./routers/index');

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

/*
app.use(async (ctx, next) => {
    console.log(1)
    next();
    console.log(3)
    ctx.body = 0;
});

app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(4)
});
*/

app.use(session(sessionConfig, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);