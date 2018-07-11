import Vue from 'vue'
import Router from 'vue-router'
import hooks from './hooks'

const Home = () => import('@/views/Home.vue' /* webpackChunkName: "chunk-home" */)
const About = () =>
  import('@/views/About.vue' /* webpackChunkName: "chunk-about" */)
// import Home from '@/views/Home.vue'
// import About from '@/views/About.vue'

Vue.use(Router)

const routerInstance = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

const beforeEachKeys = Object.keys(hooks.beforeEach)

if (beforeEachKeys.length > 0) {
  beforeEachKeys.map(hook => {
    routerInstance.beforeEach(hooks.beforeEach[hook])
  })
}

export default routerInstance
