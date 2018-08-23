export function noop () {}

export function trimAll (string) {
  return string.replace(/[\s\b]/g, '')
}

export function getSign (urlString) {
  return urlString.indexOf('?') === -1 ? '?' : '&'
}

// Translation: {a: 1, b: 2} => '&a=1&b=2'
export function stringify (obj) {
  let str = ''
  for (const key in obj) {
    str += `&${key}=${encodeURIComponent(obj[key])}`
  }
  return str
}

export function defineReadOnlyProperty (target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: false,
    enumerable: true,
    configurable: false
  })
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
export function formatAmountInput (value, digits) {
  if (value !== '') {
    // '.' => ''
    // '2c' => '2'
    value = value.replace(/^\.|[^\d.]/g, '')
    if (value !== '') {
      if (value.charAt(0) === '0' && value.charAt(1) !== '.') {
        // '09' => '9'
        // '00' => '0'
        value = !+value ? '0' : value.substring(1)
      } else {
        const tempValue = value.split('.')
        if (tempValue.length >= 2) {
          if (typeof digits === 'number') {
            // eg(digits = 2): '12.300' => '12.30'
            if (digits) {
              let decimals = tempValue[1].substring(0, digits)
              value = tempValue[0] + '.' + decimals
            } else {
              // '12.' => '12'
              value = tempValue[0]
            }
          } else {
            // '12.30.' => '12.30'
            // '12..' => '12.'
            value = tempValue[0] + '.' + tempValue[1]
          }
        }
      }
    }
  }
  return value
}

/**
 * 函数节流
 * @param  {Function} handler
 * @param  {Number}   delay 可选，值 >= 0
 * @param  {Number}   must  可选，值 >= 0
 * @return {Function}       run when trigger it's event
 */
export function throttle (handler, delay, must) {
  if (!delay && !must) {
    return handler
  }

  let startTime = new Date()
  let timer

  return function (e) {
    if (delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        handler.call(this, e)
      }, delay)
    } else if (new Date() - startTime > must) {
      startTime = new Date()
      handler.call(this, e)
    }
  }
}

/**
 * 深或浅拷贝，跟 jQuery extend 方法一致
 * extend( target [, object1 ] [, objectN ] )
 * extend( [ deep ,] target, object1 [, objectN ] )
 * @returns {object}
 */
export function extend () {
  const isArray = Array.isArray
  let arg = arguments,
    target = arg[0] || {},
    deep = false,
    length = arg.length,
    i = 1,
    value, attr,
    copyIsArray

  if (typeof target === 'boolean') {
    deep = target
    target = arg[1] || {}
    i++
  }

  for (; i < length; i++) {
    for (attr in arg[i]) {
      value = arg[i][attr]

      if (deep && (isPlainObject(value) || (copyIsArray = isArray(value)))) {
        let src = target[attr]

        if (copyIsArray) {
          copyIsArray = false
          src = isArray(src) ? src : []
        } else {
          src = isPlainObject(src) ? src : {}
        }

        target[attr] = extend(deep, src, value)
      } else {
        target[attr] = value
      }
    }
  }

  return target
}

export function uniqueRandom () {
  return Date.now() + Math.random().toString(36).substring(2, 15)
}
