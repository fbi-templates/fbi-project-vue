
<template>
  <div class="home">
    <img src="../assets/img/logo.png">
    <h3>{{ num }}</h3>
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',

    // Assets
    components: {
      HelloWorld,
    },

    // Composition
    mixins: [],

    // Data
    data () {
      return {
        num: 0
      }
    },
    model: {},
    props: {},
    computed: {},
    methods: {},
    watch: {},

    // Lifecycle Hooks
    beforeCreate () { },
    created () {
      const timer = setInterval(() => {
        console.log(this.num)
        this.num++
      }, 1000)

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
        console.log('timer clear.')
      })
    },
    beforeMount () { },
    mounted () { },
    beforeUpdate () { },
    updated () { },
    activated () { },
    deactivated () { },
    beforeDestroy () { },
    destroyed () { },
    errorCaptured () { },
  }
</script>
