const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

const connectDB = require('./models/connect_db');
const router = require('./routers/index');
const sessionConfig = require('./config/session');

const app = new Koa();
app.keys = ['koa_session_secret_key'];

app.use(compress());
app.use(session(sessionConfig, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

connectDB(() => {
    app.listen(3000);
});