export default {
  login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 1500)
      // test error
      // setTimeout(() => reject('An error occurred.'), 1500)
    })
  }
}
