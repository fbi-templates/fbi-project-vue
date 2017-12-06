import './index.css'

import {mapActions, mapGetters, mapState} from 'vuex'

import Vue from 'vue'
import template from './index.html'

export default Vue.extend({
  template,

  data() {
    return {
      imgs: [
        require('../../static/img/face-1.png'),
        require('../../static/img/face-2.png'),
        require('../../static/img/face-3.png'),
        require('../../static/img/face-4.png'),
        require('../../static/img/face-5.png')
      ]
    }
  }
})
