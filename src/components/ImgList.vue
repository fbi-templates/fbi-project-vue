<style scoped>
  .img-list {
    li {
      display: inline-block;
      list-style-type: none;

      img {
        width: 30px;
        margin: 0 .1em;
      }
    }
  }
</style>

<template>
  <ul class="img-list">
    <li v-for="img in imgs">
      <img :src="img">
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        imgs: [
          require('../static/img/face-1.png'),
          require('../static/img/face-2.png'),
          require('../static/img/face-3.png'),
          require('../static/img/face-4.png'),
          require('../static/img/face-5.png')
        ]
      }
    }
  }
</script>