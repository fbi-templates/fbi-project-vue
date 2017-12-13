import Router from 'vue-router'
import Vue from 'vue'
import values from 'lodash/values'
import beforeEachHooks from './beforeEachHooks'
import Todo from '../views/Todo.vue'

Vue.use(Router)

const routerInstance = new Router({
  routes: [
    {
      path: '/to-do',
      name: 'Todo',
      component: Todo,
      meta: {
        title: '首页'
      }
    },
    {
      path: '*',
      redirect: '/to-do'
    }
  ]
})

values(beforeEachHooks).forEach(hook => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
