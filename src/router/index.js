import Router from 'vue-router'
import Vue from 'vue'
import values from 'lodash/values'
import beforeEachHooks from './beforeEachHooks'
import Todo from '../views/Todo.vue'
import Index from '../views/Index.vue'

Vue.use(Router)

const routerInstance = new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/to-do',
      name: 'Todo',
      component: Todo,
      meta: {
        title: '待办'
      }
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

values(beforeEachHooks).forEach(hook => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
