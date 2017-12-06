import Vue from 'vue'
import axios from 'axios'
/**
 * CGI请求方式和返回处理
 */
export default {
  root: __APIROOT__,
  http: axios,
  handleCGIReturn(response) {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data)
    } else {
      throw response.data
    }
  }
}
