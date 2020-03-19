<template>
  <div class="login">
    <div class="login-wrap">
      <LoginForm />
    </div>
    <div class="switchLang">
        <i18nDropdown />
      </div>
  </div>
</template>

<script >
import LoginForm from '../../components/LoginForm'
import i18nDropdown from '../../components/i18nDropdown'
export default {
  components: {
    LoginForm,
    i18nDropdown
  },
  methods:{
    
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('../../assets/img/login.jpg') no-repeat center center;
}
.login-wrap {
  position: absolute;
  top: 220px;
  bottom: 210px;
  right: 200px;
}
.switchLang{
    width: 100px;
    position: absolute;
    right: 0px;
}
</style>