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
        return str.replace($.reg.trimAll, '');
    },

    // 格式化金额，针对 input 输入框
    // eg: '12.30.' => '12.30'
    // eg: '.' => ''
    // eg: '09' => '9'
    // @param value {string} 被格式化的值
    // @param digits {number} 显示位数（保留几位小数）
    // @return value {string} 格式后的值
    formatAmountInput(value, digits) {
        if (value !== '') {

            // '.' => ''
            // '2c' => '2'
            value = value.replace(/^\.|[^\d.]/g, '');
            if (value !== '') {
                if (value.charAt(0) === '0' && value.charAt(1) !== '.') {

                    // '09' => '9'
                    // '00' => '0'
                    value = !+value ? '0' : value.substring(1);
                } else {
                    const tempValue = value.split('.');
                    if (tempValue.length >= 2) {
                        if (typeof digits === 'number') {

                            // eg(digits = 2): '12.300' => '12.30'
                            if (digits) {
                                let decimals = tempValue[1].substring(0, digits);
                                value = tempValue[0] + '.' + decimals;
                            } else {

                                // '12.' => '12'
                                value = tempValue[0];
                            }
                        } else {

                            // '12.30.' => '12.30'
                            // '12..' => '12.'
                            value = tempValue[0] + '.' + tempValue[1];
                        }
                    }
                }
            }
        }
        return value;
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

    // 检查元素是否在可视区内
    checkInView(elem) {
        const $ = jQuery;
        const elemTop = $(elem).offset().top;
        const elemHeight = $(elem).outerHeight() / 2;
        const winTop = $(window).scrollTop();
        const winHeight = $(window).height();

        if (
            elemTop + elemHeight > winTop &&
            elemTop < winTop + winHeight
        ) {
            return true;
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
    toQueryString(obj) {
        let str = '';
        for (const key in obj) {
            str += `&${key}=${encodeURIComponent(obj[key])}`;
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
        $.removeElem('#' + id);
        delete window[id];
    },

    // jsonp 加载
    jsonp(url) {
        const id = '__utils_jsonp__' + Date.now();
        url += (url.indexOf('?') !== -1 ? '&' : '?') + `callback=${id}`;
        return new Promise((resolve, reject) => {

            window[id] = res => {
                $.clearJsonpRemains(id);
                resolve(res);
            };

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = id;

            script.onerror = err => {
                $.clearJsonpRemains(id);
                reject(err);
            };

            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
};