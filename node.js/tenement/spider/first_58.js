const fs = require('fs');
const path = require('path');
const qs = require('query-string');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const utils = require('../lib/utils');
const userAgents = require('../lib/user_agent');
const HouseModle = require('../models/houses');

class Spider {
    constructor() {
        this.initConfig();
        this.bootstrap();
    }

    initConfig() {
        this.pageIndex = 1;
    }

    bootstrap() {
        this.requestListPage();
    }

    createPageUrl() {
        return `http://sz.58.com/chuzu/0/pn${this.pageIndex}/?PGTID=0d3090a7-0000-47ae-d2ec-983a941c503b&ClickID=2`;
    }

    createOptions(url, method = 'get', sendData) {
        const options = {
            url,
            timeout: 30 * 1000,
            jar: true,
            headers: {
                'User-Agent': utils.randomChoice(userAgents)
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

    sendRequest(...arg) {
        return new Promise((resolve, reject) => {
            request.get(this.createOptions(...arg), (err, res, body) => {
                if (err) reject('服务器无响应');
                if (res && res.statusCode === 200) {
                    resolve(body);
                } else {
                    reject('无响应内容或状态码错误');
                }
            });
        });
    }

    async requestListPage() {
        const body = await this.sendRequest(this.createPageUrl());
        this.parseListPage(body);
    }

    parseListPage(html) {
        const $ = cheerio.load(html);
        const tenement = this.tenement = [];

        // 获取列表里每间房屋的缩略图 URL 和详情页 URL
        $('.listUl li').each(function () {
            tenement.push({
                thumbnailUrl: $(this).find('img').attr('lazy_src'),
                detailPageUrl: $(this).find('h2 a').attr('href')
            });
        });
        this.requestDetailPage();
    }

    async requestDetailPage() {
        for (const item of this.tenement) {
            const body = await this.sendRequest(item.detailPageUrl);
            await this.parseDetailPage(body, item);
        }
    }

    splitBlank(str) {
        return utils.resetBlank(str.trim()).split(' ');
    }

    parseDetailPage(html, curTenement) {
        const $ = cheerio.load(html);
        const releaseTime = $('.main-wrap > .house-title .house-update-info').text();
        const $houseDes = $('.house-basic-info .house-basic-desc');
        const $houseDetails = $('.house-detail-desc .main-detail-info');
        const houseType = this.splitBlank($houseDes.find('ul.f14 li').eq(1).find('span').eq(1).text());
        const floor = this.splitBlank($houseDes.find('ul.f14 li').eq(2).find('span').eq(1).text());
        const district = this.splitBlank($houseDes.find('ul.f14 li').eq(4).find('span').eq(1).text());

        const appliances = [];
        $houseDetails.find('.house-disposal li').each(function() {
            appliances.push($(this).text().trim())
        });

        const feature = [];
        $houseDetails.find('.house-word-introduce li').eq(0).find('em').each(function() {
            feature.push($(this).text().trim())
        });

        const claim = [];
        let descriptions = '';
        if ($houseDetails.find('.house-word-introduce li').length > 2) {
            $houseDetails.find('.house-word-introduce li').eq(1).find('em').each(function() {
                claim.push($(this).text().trim())
            });
            descriptions = $houseDetails.find('.house-word-introduce li').eq(2).find('span').text().trim();
        } else {
            descriptions = $houseDetails.find('.house-word-introduce li').eq(1).find('span').text().trim();
        }

        const info = {
            thumbnailUrl: curTenement.thumbnailUrl,
            detailPageUrl: curTenement.detailPageUrl,
            title: $('.main-wrap > .house-title h1').text(),
            releaseTime: utils.trimAll(releaseTime).replace(/^(.+)\d.*次浏览$/, '$1'),
            entryTime: new Date(),
            price: $houseDes.find('.house-pay-way .c_ff552e').text(),
            payWay: $houseDes.find('.house-pay-way .c_333').text(),
            leaseWay: $houseDes.find('ul.f14 li').eq(0).find('span').eq(1).text(),
            houseType: houseType[0],
            area: houseType[1] + houseType[2],
            orientation: floor[0],
            floor: floor[1] || '',
            estateName: $houseDes.find('ul.f14 li').eq(3).find('span').eq(1).text(),
            district: district[0],
            street: district[1] || '',
            address: $houseDes.find('ul.f14 li').eq(5).find('span').eq(1).text().trim(),
            appliances,
            feature,
            claim,
            descriptions
        };

        console.log(info);
        HouseModle.create(info, (err) => {
            if (err) {
                console.log('保存到数据库出错！');
                console.log(info);
            }
        });
    }
}

new Spider();