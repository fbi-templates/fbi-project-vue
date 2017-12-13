import $ajax from './ajax'

function requestUrl (path) {
  return `${__APIROOT__}/api/${path}`
}

export default {
  getSomeThing() {
    return $ajax.get(requestUrl('getNiceLinks'), data)
  }
}
