import test from 'ava';
import request from 'request';
import * as qs from 'query-string';

const sendData = qs.stringify({
    account: '****',
    password: '********'
});

const options = {
    baseUrl: 'http://test-qdcm.myscrm.cn',
    url: '/index.php?r=passport/login&token=cdkqqf1407307954',
    body: sendData,
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(sendData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
};

test.cb('http api testing: qdcm login', t => {
    request.post(options, (err, res, body) => {
        if (err) t.fail('服务器无响应！');

        if (res && res.statusCode === 200) {

            console.log('\x1b[33m%s\x1b[0m', 'body:', body);
            body = JSON.parse(body);

            if (body.retCode == 0) {
                t.deepEqual(body.data, {
                    "userId": "39de01b7-bd8e-f2a1-11e5-d71db0847d0c",
                    "userGUID": "39de01b7-bd8e-f2a1-11e5-d71db0847d0c",
                    // other properties...
                });
            } else {
                t.fail('返回码错误：retCode 不等于 0 !');
            }
        } else {
            t.fail('无响应内容或状态码错误！');
        }

        t.end();
    });
});
