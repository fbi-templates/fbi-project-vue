<template>
  <h1 class="typing">{{text}}</h1>
</template>

<script>
export default {
  data () {
    return {
      allText: 'hello world',
      text: '',
      index: 1
    }
  },
  methods: {
    typing() {
      if (this.index <= this.allText.length) {
        this.text = this.allText.slice(0, this.index)
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
