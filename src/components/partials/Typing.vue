<template>
  <h1 class="typing">{{showingText}}</h1>
</template>

<script>
export default {
  data () {
    return {
      showingText: '',
      index: 0
    }
  },
  props: {
    text: {
      type: String,
      default: 'hello world'
    }
  },
  methods: {
    typing() {
      if (this.index <= this.text.length) {
        this.showingText = this.text.slice(0, this.index)
        this.index++
      } else {
        return
      }
      setTimeout(this.typing, 100)
    }
  },
  mounted () {
    this.typing()
  }
}
</script>

<style scoped>
.typing {
  position: absolute;
  left: 50%;
  top: 40%;
  color: #2c3e50;
  font-size: 100px;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
