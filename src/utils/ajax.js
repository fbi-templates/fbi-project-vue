import axios from 'axios'

// docs: https://github.com/mzabriskie/axios
const instance = axios.create({
  baseURL: __APIROOT__, // `__APIROOT__` definded in `fbi/options.js=>data`
  timeout: 1000
})

export default {
  ...instance,
  responseHandler (response) {
    return Promise.resolve(response.data)
  }
}
