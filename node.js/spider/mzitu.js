const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let album = ['50574', '51276', '71235', '86048', '95656'];
let pictureIndex = 1;
let total = null;

//album = album.concat([...Array(100).keys()]);

function createImgOptions(albumId, imgUrl) {
    const options = {
        url: imgUrl,
        timeout: 30 * 1000,
        jar: true,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': 'i.meizitu.net',
            'Pragma': 'no-cache',
            'Referer': `http://www.mzitu.com/${albumId}/${pictureIndex}`,
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        }
    };
    return options;
}

function createOptions(albumId, method = 'get', sendData) {
    const url = createUrl(albumId);
    const options = {
        url,
        timeout: 30 * 1000,
        jar: true,
        headers: {
            'Connection': 'keep-alive',
            'Host': 'www.mzitu.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        }
    };
    if (method === 'post') {
        sendData = qs.stringify(sendData);
        options.body = sendData;
        Object.assign(options.headers, {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(sendData)
        });
    }
    return options;
}

// http://www.mzitu.com/71235/50
function createUrl(albumId) {
    return `http://www.mzitu.com/${albumId}/${pictureIndex}`;
}

function sendRequest(albumId) {
    return new Promise((resolve, reject) => {
        if (albumId === 0) return reject();
        async function recursion(noSleep) {
            if (total && pictureIndex > total) {
                return resolve();
            }
            if (!noSleep) {
                await sleep(parseInt(limitRandom(1000, 0)));
            }
            request.get(createOptions(albumId), (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const $ = cheerio.load(body);
                    const imgUrl = $('.main .main-image img').attr('src');
                    const curPictrueIndex = pictureIndex;

                    total = +$('.main .pagenavi a').last().prev().text();
                    pictureIndex++;
                    console.log(`albumId: ${albumId}, Downloading: ${curPictrueIndex}/${total}`);

                    // http://i.meizitu.net/2016/08/name.jpg => name.jpg
                    const filename = curPictrueIndex + path.basename(imgUrl).replace(/.+(jpg|jpeg|png|gif)$/, '.$1');

                    // `images/${albumId}/${filename}`
                    const dir = `./images/${albumId}`;
                    const imgPath = `${dir}/${filename}`;

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    } else if (fs.existsSync(imgPath)) {
                        return recursion(true);
                    }

                    function downloadImg() {
                        request
                            .get(createImgOptions(albumId, imgUrl))
                            .pipe(fs.createWriteStream(imgPath))
                            .on('close', () => {
                                console.log(`${imgUrl}下载完成`);
                                recursion();
                            })
                            .on('error', () => {
                                console.log('下载文件失败，重新下载...');
                                downloadImg();
                            });
                    }
                    downloadImg();
                } else if (res.statusCode === 404) {
                    reject(404);
                } else {
                    recursion();
                }
            });
        }
        recursion(true);
    });
}

function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

function limitRandom(max, min) {
    return max === min ? max : (Math.random() * (max - min) + min);
}

async function bootstrap() {
    for(const id of album) {
        pictureIndex = 1;
        total = null;
        await sendRequest(id).catch(err => err);
        await sleep(parseInt(limitRandom(5000, 1000)));
    }
}

bootstrap();