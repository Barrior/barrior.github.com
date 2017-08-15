const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
    ctx.body = '首页';
});

router.get('/user', async ctx => {
    ctx.body = '用户页';
});

router.get('/list', async ctx => {
    ctx.body = '列表页';
});

// RESTful API
router.get('/users/:id', async ctx => {
    ctx.body = '获取用户信息';
});

router.post('/users/:id', async ctx => {
    ctx.body = '添加用户成功';
});

router.put('/users/:id', async ctx => {
    ctx.body = '修改用户信息';
});

router.del('/users/:id', async ctx => {
    ctx.body = '删除用户成功';
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);