<style scoped>
  .loading {
    padding: 10px;
    text-align: center;
    color: #999;
  }

  .post {
    width: 600px;
    margin: 0 auto;
    color: #666;
  }

  .post-cnt {
    min-height: 400px;
    line-height: 1.8;
  }

  .post-num {
    padding: 1em;
    text-align: right;
  }
</style>

<template>
  <article class="post">
    <div v-if="loading" class="loading">loading...</div>
    <h2>{{ post.title }}</h2>
    <div class="post-cnt">
      {{ post.content }}
    </div>
    <div class="post-num">
      Total posts: {{ postsNum }}
    </div>
  </article>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['postsNum']),
      ...mapState({
        post: state => state.post.item
      })
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      ...mapActions(['getPostById'])
    },
    created() {
      this.loading = true
      this.getPostById(this.$route.params.id)
        .then(() => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
</script>