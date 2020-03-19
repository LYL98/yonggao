<template>
  <div class="login-form">
    <div class="title">{{$t('message.loginTitle')}}</div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
      <el-form-item prop="account">
        <el-input v-model="loginForm.account" :placeholder="$t('message.account')"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          :placeholder="$t('message.password')"
          v-model="loginForm.password"
          @keyup.enter.native="login('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          :placeholder="$t('message.code')"
          v-model="loginForm.code"
          @keyup.enter.native="login('loginForm')"
        ></el-input>
      </el-form-item>
      <div class="pic">
        <img :src="URL" alt />
      </div>
      <el-form-item>
        <!-- <div class="login-btn"> -->
        <el-button
          type="primary"
          round
          @click="login('loginForm')"
          class="btn"
        >{{$t('message.login')}}</el-button>
        <!-- </div> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import CryptoJs from '@/assets/js/cryptoJs.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      //   rules: {},
      loginForm: {
        account: '',
        password: '',
        code: ''
      },
      URL: ''
    }
  },
  methods: {
    // login() {
    //   this.$refs.loginForm.validate(async valid => {
    //     if (valid) {
    //       let url = '/v1/admin/login'
    //       let p = CryptoJs.encrypt(this.loginForm.password)
    //       let res = await this.$http.post(url, {
    //         account: this.loginForm.account,
    //         code: this.loginForm.code,
    //         password: p
    //       })
    //       let { status, data, msg } = res.data
    //       if (status == 'success') {
    //         this.$message({
    //           type: 'success',
    //           message: msg
    //         })
    //         localStorage.setItem('userData', JSON.stringify(data))
    //         localStorage.setItem('id',  JSON.stringify(data.admin_id))
            
    //         console.log(localStorage.id)
    //         this.$router.push('/')
    //       } else {
    //         this.$message.error(msg)

    //         this.URL = process.env.VUE_APP_BASE_API + '/v1/admin/captcha'+ '?' + Math.ceil(Math.random() * 10)
    //       }
    //       console.log(res.data)
    //     }else {
    //       this.$message.error('请输入正确的用户名和密码')
    //       return false
    //     }
    //   })
    // },
    login(){
      this.$router.push('/')
    }
  },
  computed: {
    rules() {
      return {
        account: [
          {
            required: true,
            message: this.$t('login.username'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.password'),
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: this.$t('login.code'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  mounted() {
    this.URL = process.env.VUE_APP_BASE_API + '/v1/admin/captcha'
  }
}
</script>

<style scoped>
.login-form {
  /* box-sizing: border-box; */
  width: 200px;
  height: 340px;
  padding: 20px 50px;
  background: rgba(255, 255, 255, 0.4);
  /* border:1px solid #ddd; */
  border-radius: 4px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.btn {
  width: 200px;
}
.pic {
  margin-bottom: 10px;
}
</style>
