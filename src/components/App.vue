<style>
  body {
    margin: 0;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
  }

  .page {
    text-align: center;
    padding: 1em;
  }

  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>

<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainNav from 'components/Nav'

  export default {
    components: {
      MainNav,
    },
  }
</script>