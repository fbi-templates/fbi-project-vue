export default {
  setDocumentTitle(to, from, next) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
}