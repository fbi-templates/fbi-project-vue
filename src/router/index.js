import Router from 'vue-router'
import Vue from 'vue'

// 代码分离: 异步引入
const Home = () => import('views/Home.vue' /* webpackChunkName: "chunk-home" */)
const Posts = () =>
  import('views/Posts.vue' /* webpackChunkName: "chunk-posts" */)
const Post = () => import('views/Post.vue' /* webpackChunkName: "chunk-post" */)
const City = () => import('views/City.vue' /* webpackChunkName: "chunk-city" */)
const Login = () =>
  import('views/Login.vue' /* webpackChunkName: "chunk-login" */)

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'main-nav-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
    {
      path: '/private',
      name: 'private',
      component: {
        template: '<div>Private content.</div>'
      },
      meta: {
        requiresAuth: true
      }
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
        query: {
          redirect: to.fullPath
        }
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
