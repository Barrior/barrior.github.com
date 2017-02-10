const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const pkg = require('./package.json');
const routesConfig = require('./routes.config');

const app = new koa();
const router = new Router();

// Parse the body contents of post request.
app.use(bodyParser());

['get', 'post'].forEach(method => {
    router[method]('/index.php', async (ctx, next) => {
        routeHander.call(ctx, method);
    });
});

app.use(router.routes());
app.listen(pkg.proxy.port || 3000);

function routeHander (method) {
    const query = this.query;
    const route = routesConfig[query.r];
    const configMethod = route.method ? route.method.toLocaleLowerCase() : 'get';

    if (route && method === configMethod) {

        // 注册一个删除了路由(r)的纯查询参数到环境变量上
        this.params = Object.assign({}, query);
        delete this.params.r;

        // 统一返回数据
        this.ykres = {
            retCode: '0',
            data: []
        };

        // 根据对应的路由，处理返回数据
        // 如果需要设置报文，则需自行设置响应数据，这样就不执行下面 if 的代码，避免响应数据被覆盖
        require(`./routes/${route.filepath || query.r}`).call(this);

        // 返回响应数据
        if (this.body === undefined) {
            this.body = this.ykres;
        }

        this.set({
            'Access-Control-Allow-Origin': '*'
        });
    }
}