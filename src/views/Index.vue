<template>
  <div class="index">
    <h1>{{text}}</h1>
  </div>
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
.index {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #2c3e50;
    font-size: 100px;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
