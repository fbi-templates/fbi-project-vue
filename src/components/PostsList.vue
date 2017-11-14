<style scoped>
  .list-wrap {
    min-height: 300px;
    .loading,
    .error {
      padding: 10px;
      text-align: center;
      color: #999;
    }
    .posts-list {
      li {
        list-style-type: none;
      }
      .num {
        display: inline-block;
        width: 30px;
      }
    }
  }

  .post-num {
    padding: 1em;
    text-align: right;
  }

  .pager {
    padding: 2em;
    margin: 0 auto;
    text-align: center;
    li {
      list-style-type: none;
      display: inline-block;
      margin: 0 2px;
      width: 30px;
      line-height: 30px;
      cursor: pointer;
      background-color: #ccc;
      &.active {
        background-color: #f9f9f9;
      }
      &.private {
        display: inline;
        background-color: #fff;
      }
    }
  }
</style>

<template>
  <section>
    <!--List-->
    <section class="list-wrap">
      <div v-if="listLoading" class="loading">loading...</div>
      <div class="error">{{ errorMessage }}</div>
      <ul class="posts-list">
        <li v-for="(post, index) of allPosts">
          <span class="num">{{index+1}}.</span>
          <router-link
            :to="{ name: 'post', params: { id: post.id } }">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </section>
    <div class="post-num">
      Total posts: {{ postsNum }}
    </div>
    <!--Pager-->
    <ul class="pager">
      <li
        v-for="num of totalNum"
        :class="num === currIdx ? 'active' : '' "
        @click="handlePageLinkClick(num)">
        {{ num }}
      </li>
      <li class="private">
        <router-link :to="{ name: 'private' }">Private Link</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    props: {

    },
    data() {
      return {
        currIdx: 1,
        listLoading: false,
        errorMessage: '',
      }
    },
    computed: {
      totalNum() {
        return 10
      },
      ...mapGetters(['postsNum']),
      ...mapState({
        allPosts: state => state.post.all
      })
    },
    methods: {
      handlePageLinkClick(num) {
        this.currIdx = num
          // do actions
      },
      ...mapActions(['getPosts'])
    },
    created() {
      if (!this.postsNum) {
        this.listLoading = true
      }
      this.getPosts().then(() => {
          this.listLoading = false
        })
        .catch(err => {
          this.listLoading = false
          this.errorMessage = err
        })
    }
  }
</script>