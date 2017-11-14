<style>
  .posts {
    width: 600px;
    margin: 1em auto;
  }
</style>

<template>
  <section class="posts">
    <posts-list></posts-list>
  </section>
</template>

<script>
  import PostsList from 'components/PostsList'

  export default {
    components: {
      PostsList
    },
    created() {
      // document.title += ' - Posts'
    }
  }
</script>