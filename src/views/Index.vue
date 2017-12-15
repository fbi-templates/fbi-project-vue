<template>
  <div class="index">
    <typing/>
    <div class="face-wrap">
      <v-icon v-for="(name, index) in icons" :key="index" :name="name" />
    </div>
  </div>
</template>

<script>
import Typing from 'components/partials/Typing.vue'
export default {
  data () {
    return {
      icons: ['face-1', 'face-2', 'face-3', 'face-4', 'face-5']
    }
  },
  components: {
    Typing
  },
  mounted () {
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .face-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.icon {
  width: 30px;
  height: 30px;
}
</style>
