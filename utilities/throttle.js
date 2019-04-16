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
