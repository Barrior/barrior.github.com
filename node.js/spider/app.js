const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// http://jandan.net/ooxx/page-2210
// http://www.2cto.com/meinv/meitui/
request('http://jandan.net/ooxx/page-1319', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const srcArr = [];

        // 存储图片 url
        $('.commentlist img').each(function () {
            let src = $(this).attr('src');
            if (src) {
                srcArr.push(src);
            }
        });

        // 下载图片
        srcArr.forEach((src, i) => {
            // path.basename(src) 获取图片基本名：http://ww4.sinaimg.cn/mw600/name.jpg => name.jpg
            let filename = i + 1 + path.basename(src).replace(/.+(jpg|jpeg|png|gif)$/, '.$1');

            request
                .get(src)
                .pipe(fs.createWriteStream(`images/${filename}`))
                .on('close', () => {
                    console.log(`${ src }下载完成`);
                });
        });
    }
});