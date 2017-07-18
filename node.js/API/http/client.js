const http = require('http');
const qs = require('query-string');

const postData = qs.stringify({
    code: 600000
});

console.log('-------------');
console.log(postData, '\nPost Data byteLength: ', Buffer.byteLength(postData));
console.log('-------------');

const options = {
    protocol: 'http:',
    host: 'www.yuncaijing.com',
    port: 80,
    path: '/stock/get_lines/yapi/ajax.html',
    method: 'POST',
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
};

const req = http.request(options, (res) => {

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let index = 1;
    const content = [];

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        content.push(chunk);
        console.log('\x1b[33m%s\x1b[0m', `BODY_chunk_${index++}:`, chunk);
    });
    res.on('end', () => {
        console.log(content, 'No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();