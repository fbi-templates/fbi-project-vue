<template>
  <img class="icon" :class="iconClass" :src="iconTarget" alt="">
</template>

<script>
export default {
  data () {
    return {
      iconClass: 'icon-' + this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    iconTarget() {
      return require(`src/static/icons/icon-${this.name}.png`)
    }
  }
}
</script>
