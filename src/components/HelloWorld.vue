<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Vue.js Resources</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://router.vuejs.org" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank">vuex</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <h3>fbi resources</h3>
    <ul>
      <li>
        <a href="https://github.com/fbi-templates/fbi-project-vue#fbi-project-vue" target="_blank">template docs</a>
      </li>
      <li>
        <a href="https://github.com/AlloyTeam/fbi" target="_blank">fbi</a>
      </li>
      <li>
        <a href="https://github.com/fbi-templates" target="_blank">fbi templates</a>
      </li>
    </ul>
    <h3>fbi templates</h3>
    <ul>
      <li v-for="item in repoList" :key="item.id">
        <a :href="item.html_url" target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    props: {
      msg: String
    },

    data () {
      return {
        repoList: []
      }
    },

    mounted () {
      this.$store.dispatch('repo/getList')
        .then(res => {
          console.log(res)
          this.repoList = res
        })
        .catch(err => {
          if (err.message.indexOf('timeout of') >= 0) {
            console.error('Timeout')
          } else {
            throw err
          }
        })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        color: #42b983;
      }
    }
  }
</style>
