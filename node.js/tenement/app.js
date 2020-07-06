const Koa = require('koa');
const session = require('koa-session');
const redisStore = require('koa-redis');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const logger = require('koa-logger');

const router = require('./routers/index');
const appConfig = require('./config/app');
const redisConfig = require('./config/redis');

require('./models/connect_db');

const app = new Koa();
app.keys = appConfig.keys;

app.use(compress());
app.use(logger());
app.use(session({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    store: redisStore(/*{
        host: redisConfig.host,
        port: redisConfig.port,
        db: redisConfig.db,
        password: redisConfig.password,
    }*/)
}, app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Listening on ${appConfig.host}:${appConfig.port}...`);
});