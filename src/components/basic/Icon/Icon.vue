<template>
  <img class="icon" :class="iconClass" :src="iconTarget" alt="">
</template>

<script>
// import Icons from 'src/static/icons'

export default {
  data () {
    return {
      Icons: Icons,
      iconClass: 'icon-' + this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      default: '',
      validator (val) {
        return Icons[val]
      }
    }
  },
  computed: {
    iconTarget() {
      return require(`src/static/icons/icon-${this.name}.png`)
    }
  }
}
</script>
