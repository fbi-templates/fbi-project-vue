<style scoped>
  .wrap {
    width: 300px;
    margin: 0 auto;
    text-align: left;
  }

  form {
    padding-top: 100px;
    padding-left: 100px;
    label {
      float: left;
      margin-left: -100px;
    }
    .form-item {
      margin-bottom: 10px;
    }
  }
</style>

<template>
  <section class="wrap">
    <!--Form-->
    <form>
      <div class="form-item">
        <label for="">Name</label>
        <input type="text" v-model="userInfo.name">
      </div>
      <div class="form-item">
        <label for="">Password</label>
        <input type="password" v-model="userInfo.pwd">
      </div>
      <div class="form-item">
        <input type="button" value="Login" @click="handleBtnLoginClick">
      </div>
    </form>
    <!--Info-->
    <div class="info" v-if="userInfo">
      <div>
        Name: {{ userInfo.name }}
      </div>
    </div>
  </section>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      userInfo: {
        get() {
          return this.$store.state.user.info || {
            name: '',
            pwd: ''
          }
        },
        set(value) {
          this.userInfo = value
        }
      },
      // ...mapState({
      //   userInfo: state => state.user.info || {
      //     name: ''
      //   }
      // })
    },
    methods: {
      handleBtnLoginClick(num) {
        console.log(this.userInfo)
        this.login(this.userInfo).then(() => {
            console.log('succ')
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapActions(['login'])
    },
    created() {
      // this.userInfo.name = 'aa'
    }
  }
</script>