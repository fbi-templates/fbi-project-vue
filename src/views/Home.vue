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
    <div>
      <img :src="logo" class="logo">
    </div>
    <h2>
      This is Home Demo
    </h2>
    <demo></demo>
    <ListImg class="bottom"></ListImg>
  </section>
</template>
<script>
  import ListImg from 'components/list-img'
  import Demo from 'components/demo'

  export default {
    components: {
      ListImg,
      Demo
    },
    data() {
      return {
        logo: require('../static/img/logo.png')
      }
    },
    created() {
      console.log(__APIROOT__)
    }
  }
</script>
