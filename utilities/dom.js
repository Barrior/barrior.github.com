export function removeElement (selector) {
  const elem = document.querySelector(selector)
  elem && elem.parentNode.removeChild(elem)
}

export function isWindow (elem) {
  return elem != null && elem === elem.window
}

export function offset (elem) {
  const bounding = elem.getBoundingClientRect()
  return {
    left: window.pageXOffset + bounding.left,
    top: window.pageYOffset + bounding.top
  }
}

export function getStyle (elem, prop) {
  const style = getComputedStyle(elem)
  return parseFloat(style[prop])
}

export function getWidth (elem) {
  const clientWidth = getClientWidth(elem)
  const style = getComputedStyle(elem)
  return (
    clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  )
}

export function getClientWidth (elem) {
  if (isWindow(elem) || elem.nodeType === 9) {
    elem = document.documentElement
  }
  return elem.clientWidth
}

export function getClientHeight (elem) {
  if (isWindow(elem) || elem.nodeType === 9) {
    elem = document.documentElement
  }
  return elem.clientHeight
}

export function getScrollHeight (elem) {
  if (isWindow(elem) || elem.nodeType === 9) {
    elem = document.documentElement
  }
  return elem.scrollHeight
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

// check if the element is showing on container viewport
export function isElementInViewport (elem, container = window, ahead = 1) {
  const st = scrollTop(container) + offset(container).top
  const ch = getClientHeight(container)
  const elemTop = offset(elem).top
  const elemHeight = elem.offsetHeight / ahead

  return (elemTop + elemHeight > st && elemTop < st + ch)
}

export function scrollTo (elem = window, target, speed = 0.3) {
  // target value must less than the max value of scroll top and
  // more than the min value of 0
  target = Math.max(
    0,
    Math.min(getScrollHeight(elem) - getClientHeight(elem), target)
  )

  clearInterval(elem.TIMER_OF_SRCOLLTO)
  elem.TIMER_OF_SRCOLLTO = setInterval(function () {
    let st = scrollTop(elem)
    let position = (target - st) * speed

    st += (st > target ? Math.floor(position) : Math.ceil(position))

    scrollTop(elem, st)

    if (st < target + 1 && st > target - 1) {
      clearInterval(elem.TIMER_OF_SRCOLLTO)
      scrollTop(elem, target)
    }
  }, 30)
}
