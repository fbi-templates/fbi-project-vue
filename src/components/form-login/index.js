import './index.css'

import {mapActions, mapGetters, mapState} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  computed: {
    userInfo: {
      get() {
        if (this.$store.state.user.info) {
          return Object.assign({}, this.$store.state.user.info)
        } else {
          return {
            name: '',
            pwd: ''
          }
        }
      },
      set(value) {
        this.userInfo = value
      }
    }
  },

  created() {},

  methods: {
    handleBtnLoginClick(num) {
      console.log(this.userInfo)
      this.$store
        .dispatch('user/login', this.userInfo)
        .then(() => {
          console.log('succ')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
