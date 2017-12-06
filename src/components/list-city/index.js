import './index.css'

import {mapActions, mapGetters, mapState} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  data() {
    return {
      list: []
    }
  },

  created() {
    this.$store
      .dispatch('city/all')
      .then(res => {
        this.list = res
      })
      .catch(err => {
        throw err
      })
  }
})
