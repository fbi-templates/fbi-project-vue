<style scoped>
  .login {
    text-align: center;
  }
</style>

<template>
  <div class="login">
    <FormLogin></FormLogin>
  </div>
</template>

<script>
  import FormLogin from 'components/form-login'

  export default {
    components: {
      FormLogin
    }
  }
</script>
