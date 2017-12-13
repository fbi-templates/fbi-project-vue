import Vue from 'vue'
import {$apis, $util, $document, $lodash} from './helpers/index'
import filters from './filters'
import Icon from 'components/basic/Icon/Icon.vue'

const globalHelper = {
  $apis: $apis,
  $util: $util,
  $document: $document,
  $_: $lodash
}

function initGlobalHelper() {
  Object
    .keys(globalHelper)
    .forEach(key => {
      Object.defineProperty(Vue.prototype, key, {value: globalHelper[key]})
    })
}

function initGlobalComponent() {
  Vue.component('v-icon', Icon)
}

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