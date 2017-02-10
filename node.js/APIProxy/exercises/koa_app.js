const pkg = require('../package.json');
const koa = require('koa');
const app = koa();

app.use(function * (next) {
    switch (this.path) {
        case '/':
            this.body = 'Home page';
            break;
        case '/about':
            this.body = 'About page';
            break;
        default:
            this.body = '404: Page not found';
    }
    return yield next;
});

app.use(function * (next) {
    this.body = `The second middleware's : ${next} \n`;
});

app.listen(pkg.proxy.port || 3000);