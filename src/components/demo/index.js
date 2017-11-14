import './index.css'

import {
  mapActions,
  mapGetters,
} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  data() {
    return {
      text: 'Demo component'
    }
  },

  methods: {}

})