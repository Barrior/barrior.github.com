const pkg = require('../package.json');
const http = require('http');

const app = http.createServer((req, res) => {
    let data = {
        url: req.url,
        method: req.method
    };
    res.end(JSON.stringify(data));
});

app.listen(pkg.proxy.port || 3000);