<style>
  .logo {
    width: 120px;
  }

  .bottom {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 20px;
  }
</style>
<template>
  <section class="page">
    <ListCity></ListCity>
  </section>
</template>
<script>
  import ListCity from 'components/list-city'

  export default {
    components: {
      ListCity,
    },
  }
</script>
