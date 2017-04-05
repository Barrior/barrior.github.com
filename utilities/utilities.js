const scripts = [];

const $ = {
    reg: {
        // 匹配所有空白字符
        trimAll: /\s/g,

        qq: /^[1-9]\d{4,11}$/,

        // email: /^[a-z\d]+[\w.-]*@[a-z\d]+(\-*[a-z\d])*(\.[a-z]{2,6})+$/i,
        email: /^[a-z\d]([\w-.]+(?:[a-z\d]))?@[a-z\d]+(\-*[a-z\d])*(\.[a-z]{2,6})+$/i,

        // 匹配手机号
        tel: /^1[34578]\d{9}$/,

        // 匹配固号
        ftel: /^[1-9]\d{0,3}-\d{3}-\d{8}$/,

        // 匹配身份证
        id: /^[1-8]{2}\d{4}[12][089]\d{2}[01]\d[0-3]\d{4}[\dX]$/i,

        formatPassword: /[^\w\s\\\[\]`~!@#$%^&*()-+={};:'"|,.<>/?]/g
    },

    noop() {},

    trimAll(str) {
        return str.replace(this.reg.trimAll, '');
    },

    // 检查元素是否在某个元素里，与 jQuery.contains 等同
    contains(container, target) {
        if (target) {
            while (target = target.parentNode) {
                if (container === target) {
                    return true;
                }
            }
        }
        return false;
    },

    throttle(handler, delay, must){
        if (!delay && !must) {
            return handler;
        }

        let startTime = new Date();
        let timer;

        return function (e) {
            if (delay) {
                clearTimeout(timer);
                timer = setTimeout(() => {

                    handler.call(this, e);

                }, delay);

            } else if (new Date() - startTime > must) {
                startTime = new Date();
                handler.call(this, e);
            }
        }
    },

    // Translation: {a: 1, b: 2} => '&a=1&b=2'
    jsonToQueryString(json) {
        let str = '';
        for (let key in json) {
            str += `&${key}=${encodeURIComponent(json[key])}`;
        }
        return str;
    },

    // 加载 js
    loadScript(url) {
        if (scripts.indexOf(url) !== -1) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';

            script.onload = () => {
                scripts.push(url);
                resolve();
            };

            script.onerror = (err) => {
                reject(err);
            };

            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    },

    removeElem(selector) {
        const elem = document.querySelector(selector);
        elem && elem.parentNode.removeChild(elem);
    },

    clearJsonpRemains(id) {
        this.removeElem('#' + id);
        delete window[id];
    },

    // jsonp 加载
    jsonp(url) {
        const id = '__utils_jsonp__' + Date.now();
        url += (url.indexOf('?') !== -1 ? '&' : '?') + `callback=${id}`;
        return new Promise((resolve, reject) => {

            window[id] = res => {
                this.clearJsonpRemains(id);
                resolve(res);
            };

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = id;

            script.onerror = err => {
                this.clearJsonpRemains(id);
                reject(err);
            };

            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
};