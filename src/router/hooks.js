export default {
  // https://router.vuejs.org/api/#router-beforeeach
  beforeEach: {
    setDocumentTitle (to, from, next) {
      if (to.meta && to.meta.title) {
        document.title = to.meta.title
      }
      next()
    }
  }
}
