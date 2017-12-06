import './index.css'

import {mapActions, mapGetters, mapState} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  computed: {
    ...mapState('post', {
      post: state => state.item
    })
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {},

  created() {
    this.loading = true
    this.$store
      .dispatch('post/getPostById', this.$route.params.id)
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        console.log(err)
      })
  }
})
