import Vue from 'vue'
import {$apis, $util, $document} from './helpers/index'
import filters from './filters'
import Icon from 'components/basic/Icon/Icon.vue'

const globalHelper = {
  $apis: $apis,
  $util: $util,
  $document: $document,
  $_: $lodash
}

const globalComponent = {
  'v-icon': Icon
}

// register global helper, use it in vue component just like `this.$apis.xxx`
function initGlobalHelper() {
  for (let key in globalHelper) {
    Object.defineProperty(Vue.prototype, key, {value: globalHelper[key]})
  }
}

// register global component, use it in vue component just like `<v-icon :name='xxx'>`
function initGlobalComponent() {
  for (let key in globalComponent) {
    Vue.component(key, globalComponent[key])
  }
}

// register global filter
function initFilters() {
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }
}

export default {
  init: function () {
    initGlobalHelper()
    initGlobalComponent()
    initFilters()
  }
}