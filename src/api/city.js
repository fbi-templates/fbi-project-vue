import cgi from '../helpers/cgi'

// see: https://github.com/mzabriskie/axios
// cgi.http.get(url)
// cgi.http.post(url, data)
// cgi.handleCGIReturn(response)

export default {
  all() {
    return cgi.http
      .get(`${cgi.root}/city`)
      .then(response => cgi.handleCGIReturn(response))
  }
}
