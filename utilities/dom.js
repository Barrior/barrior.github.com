// check if the element be contained in the container
// result that equal jQuery.contains
export function contains (container, target) {
  if (target) {
    while ((target = target.parentNode)) {
      if (container === target) {
        return true
      }
    }
  }
  return false
}

export function removeElement (selector) {
  const elem = document.querySelector(selector)
  elem && elem.parentNode.removeChild(elem)
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

export function scrollTo (target, element = window, speed = 0.3) {
  // target value must less than the max value of scroll top and
  // more than the min value of 0
  target = Math.max(0, Math.min(getScrollHeight(element) - getClientHeight(element), target))

  clearInterval(element.TIMER_OF_SRCOLL_TO)
  element.TIMER_OF_SRCOLL_TO = setInterval(function () {
    let st = scrollTop(element)
    let position = (target - st) * speed

    st += (st > target ? Math.floor(position) : Math.ceil(position))

    scrollTop(element, st)

    if (st < target + 1 && st > target - 1) {
      clearInterval(element.TIMER_OF_SRCOLL_TO)
      scrollTop(element, target)
    }
  }, 30)
}
