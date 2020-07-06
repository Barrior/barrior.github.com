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
