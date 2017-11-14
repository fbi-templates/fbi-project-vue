<style>
  .main-nav {
    padding: 1em;
    text-align: center;
    font-size: 12px;
    a {
      margin: 0 5px;
      text-decoration: none;
      color: blue;
    }
    .main-nav-active {
      color: #333;
      cursor: default;
    }
  }
</style>

<template>
  <nav class="main-nav">
    <router-link :to="{ name: 'home' }" exact>Home</router-link>
    <router-link :to="{ name: 'posts' }" exact>Posts</router-link>
    <router-link :to="{ name: 'login' }" exact>login</router-link>


    <!--
    <router-link to="home">Home</router-link>
    <router-link :to="'home'">Home</router-link>
    <router-link :to="{ path: 'home' }">Home</router-link>
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
    <router-link :to="{ path: '/abc'}" replace></router-link>
    <router-link :to="{ path: 'relative/path'}" append></router-link>
    <router-link to="/foo" tag="li">foo</router-link>
    -->
  </nav>
</template>