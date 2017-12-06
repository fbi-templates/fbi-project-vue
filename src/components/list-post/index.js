import './index.css'

import {mapActions, mapGetters, mapState} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  data() {
    return {
      currIdx: 1,
      listLoading: false,
      errorMessage: ''
    }
  },
  computed: {
    totalNum() {
      return 10
    },
    ...mapState('post', {
      allPosts: state => state.all
    })
  },
  methods: {
    handlePageLinkClick(num) {
      this.currIdx = num
      // do actions
    },
    ...mapActions(['getPosts'])
  },
  created() {
    if (!this.allPosts.length) {
      this.listLoading = true
    }
    this.$store
      .dispatch('post/getPosts')
      .then(() => {
        this.listLoading = false
      })
      .catch(err => {
        this.listLoading = false
        this.errorMessage = err
      })
  }
})
