import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  linkActiveClass: 'main-nav-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('views/Home.vue' /* webpackChunkName: "chunk-home" */)
    },
    {
      path: '/posts',
      name: 'posts',
      component: () =>
        import('views/Posts.vue' /* webpackChunkName: "chunk-posts" */)
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () =>
        import('views/Post.vue' /* webpackChunkName: "chunk-post" */)
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('views/Login.vue' /* webpackChunkName: "chunk-login" */)
    },
    {
      path: '/private',
      name: 'private',
      component: {
        template: '<div>Private content.</div>'
      },
      meta: {requiresAuth: true}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // const isLoggedIn = auth.loggedIn()
    const isLoggedIn = false

    if (!isLoggedIn) {
      router.push({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  console.info(`${new Date().toLocaleString()}: ${to.path}`)
})

export default router
