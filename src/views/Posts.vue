<style>
  .posts {
    width: 600px;
    margin: 1em auto;
  }
</style>

<template>
  <section class="posts">
    <ListPost></ListPost>
  </section>
</template>
Ï
<script>
  import ListPost from 'components/list-post'

  export default {
    components: {
      ListPost
    },
    created() {
      // document.title += ' - Posts'
    }
  }
</script>
