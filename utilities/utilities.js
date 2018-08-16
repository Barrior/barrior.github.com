export noop = () => {};

export function trimAll(string) {
    return string.replace(/[\s\b]/g, '');
}

export function getSign(urlString) {
    return urlString.indexOf('?') === -1 ? '?' : '&';
}

// Translation: {a: 1, b: 2} => '&a=1&b=2'
export function objQueryStringify(obj) {
    let str = '';
    for (const key in obj) {
        str += `&${key}=${encodeURIComponent(obj[key])}`;
    }
    return str;
}

export function defineReadOnlyProperty(target, prop, value) {
    Object.defineProperty(target, prop, {
        value,
        writable: false,
        enumerable: true,
        configurable: false
    });
}

/**
 * 格式化金额，针对 input 输入框
 * eg: '12.30.' => '12.30'
 * eg: '.' => ''
 * eg: '09' => '9'
 * @param value {string} 被格式化的值
 * @param digits {number} 显示位数（保留几位小数）
 * @return value {string} 格式后的值
 */
export function formatAmountInput(value, digits) {
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
}

// 检查元素是否在某个元素里，与 jQuery.contains 等同
export function contains(container, target) {
    if (target) {
        while (target = target.parentNode) {
            if (container === target) {
                return true;
            }
        }
    }
    return false;
}

// 从DOM中移除某个元素
export function removeElement(selector) {
    const elem = document.querySelector(selector);
    elem && elem.parentNode.removeChild(elem);
}

export function isWindow (elem) {
  return elem != null && elem === elem.window
}

export function offset (elem) {
  const offset = { left: 0, top: 0 }
  if (!isWindow(elem) && elem.nodeType !== 9) {
    while (elem) {
      offset.left += elem.offsetLeft
      offset.top += elem.offsetTop
      elem = elem.offsetParent
    }
  }
  return offset
}

export function getClientHeight (elem) {
  if (isWindow(elem) || elem.nodeType === 9) {
    elem = document.documentElement
  }
  return elem.clientHeight
}

export function scrollTop (elem, value) {
  let win
  if (isWindow(elem)) {
    win = elem
  } else if (elem.nodeType === 9) {
    win = elem.defaultView
  }
  
  if (value === undefined) {
    return win ? win.pageYOffset : elem.scrollTop
  }
  
  if (win) {
    win.scrollTo(0, value)
  } else {
    elem.scrollTop = value
  }
}

// 检查元素是否在可视区内
export function isElementInViewport(elem, container = winodw, ahead = 1) {
  const st = scrollTop(container) + offset(container).top
  const ch = getClientHeight(container)
  const elemTop = offset(elem).top
  const elemHeight = elem.offsetHeight / ahead
  
  return (elemTop + elemHeight > st && elemTop < st + ch)
}

export function scrollTo (to, speed = 0.3) {
  const element = window
  
  clearInterval(element.TIMER_OF_SRCOLL_TO)
  element.TIMER_OF_SRCOLL_TO = setInterval(function () {
    let st = scrollTop(element)
    let position = (to - st) * speed
    
    st += (st > to ? Math.floor(position) : Math.ceil(position))
    
    scrollTop(element, st)
    
    if (st < to + 1 && st > to - 1) {
      clearInterval(element.TIMER_OF_SRCOLL_TO)
      scrollTop(element, to)
    }
  }, 30)
}

/**
 * 函数节流
 * @param  {Function} handler
 * @param  {Number}   delay 可选，值 >= 0
 * @param  {Number}   must  可选，值 >= 0
 * @return {Function}       run when trigger it's event
 */
export function throttle(handler, delay, must){
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
}

export function loadScript(url) {
    // jump url has been requested
    if (loadScript.scripts.indexOf(url) !== -1) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            loadScript.scripts.push(url);
            resolve();
        };
        script.onerror = (err) => {
            reject(err);
        };
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}
loadScript.scripts = [];

/**
 * JSONP 跨域加载
 * @param url
 * @returns {Promise}
 *
 * Example：
 *  jsonp('http://domain.com/some-url')
 *  .then(() => {
 *    console.log('loading success')
 *  })
 *  .catch((err) => {
 *    console.log(err)
 *  })
 */
export function jsonp(url) {
    const id = '_utilities_jsonp_' + Date.now();
    url += `${getSign(url)}callback=${id}`;

    return new Promise((resolve, reject) => {
        window[id] = (res) => {
            jsonp.clearRemains(id);
            resolve(res);
        };
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.id = id;
        script.onerror = (err) => {
            jsonp.clearRemains(id);
            reject(err);
        };
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}
jsonp.clearRemains = (id) => {
    removeElement(`#${id}`);
    delete window[id];
}

/**
 * 深或浅拷贝，跟 jQuery extend 方法一致
 * extend( target [, object1 ] [, objectN ] )
 * extend( [ deep ,] target, object1 [, objectN ] )
 * @returns {object}
 */
export function extend() {
    const isArray = Array.isArray;
    let arg = arguments,
        target = arg[0] || {},
        deep = false,
        length = arg.length,
        i = 1,
        value, attr,
        copyIsArray;

    if (typeof target === 'boolean') {
        deep = target;
        target = arg[1] || {};
        i++;
    }

    for (; i < length; i++) {
        for (attr in arg[i]) {

            value = arg[i][attr];

            if (deep && (isPlainObject(value) || (copyIsArray = isArray(value)))) {

                let src = target[attr];

                if (copyIsArray) {
                    copyIsArray = false;
                    src = isArray(src) ? src : [];
                } else {
                    src = isPlainObject(src) ? src : {};
                }

                target[attr] = extend(deep, src, value);

            } else {
                target[attr] = value;
            }

        }
    }

    return target;
}
