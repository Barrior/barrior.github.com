import { getSign, uniqueRandom } from './utilities'
import { removeElement } from './dom'

export function loadScript (url) {
  // jump url has been requested
  if (loadScript.scripts.indexOf(url) !== -1) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => {
      loadScript.scripts.push(url)
      resolve()
    }
    script.onerror = (err) => {
      reject(err)
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
loadScript.scripts = []

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
export function jsonp (url) {
  return new Promise((resolve, reject) => {
    const id = '_JSONP_' + uniqueRandom()
    url += `${getSign(url)}callback=${id}`

    window[id] = (res) => {
      jsonp.clearRemains(id)
      resolve(res)
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.id = id
    script.src = url
    script.onerror = (err) => {
      jsonp.clearRemains(id)
      reject(err)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
jsonp.clearRemains = (id) => {
  removeElement(`#${id}`)
  delete window[id]
}
