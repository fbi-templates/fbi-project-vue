import Vue from 'vue'

// mock data
const posts = [
  {
    id: 1,
    title: 'What is Vuex?',
    content: `Vuex is a <strong>state management pattern + library</strong> for Vue.js applications.
    It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.
    It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.`
  },
  {
    id: 2,
    title: 'What is Vue.js?',
    content: `Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.
    Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.
    The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects.

    On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.`
  }
]

export default {
  getPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(posts), 1500)
      // test error
      // setTimeout(() => reject('An error occurred.'), 1500)
    })
  }

  // use vue-resource
  // getPosts(request) {
  //   return Vue.http.get('path/to/api/posts', request)
  //     .then((response) => Promise.resolve(response.data))
  //     .catch((error) => Promise.reject(error))
  // }
}
