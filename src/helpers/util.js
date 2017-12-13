export default {
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  },
  query (search) {
    let str = search || window.location.search
    let objURL = {}
    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },
  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    return url + '?' + str.join('&')
  },
  isLegalUrl (str) {
    let pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/
    return pattern.test(str)
  },
  isLegalUsername (str) {
    let pattern = /^[a-zA-Z0-9]{3,16}$/
    return pattern.test(str)
  },
  isLegalEmail (str) {
    let pattern = new RegExp('^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$', 'g')
    return pattern.test(str)
  },
  isLegalPassword (str) {
    let pattern = new RegExp('^(?=.*[0-9])(?=.*[A-Za-z])[a-zA-Z0-9!@#$%^&*]{6,18}$', 'g')
    return pattern.test(str)
  },
  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  /**
   * get localStorage
   */
  getStorage (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  /**
   * delete localStorage
   */
  removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}