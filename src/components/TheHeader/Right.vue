<template>
  <div class="right-con">
    <el-dropdown placement="top-end" class="dropDowm">
      <span class="el-dropdown-link">
        <div class="avatar">
          <el-avatar>user</el-avatar>
        </div>{{$t('right.admin')}}
        <i class="el-icon-arrow-down el-icon--right" style="line-height:80px; margin-left: 0px;"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="getEdit">{{$t('message.changePassword')}}</el-dropdown-item>
        <el-dropdown-item @click.native="logout">{{$t('right.exit')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码框 -->
    <el-dialog :title="$t('message.changePassword')" :visible.sync="showEdit" width="25%"  class="form" :before-close="closeDiv">
      <el-form ref="form" :model="form" :label-width="$t('rules.labelWidth')" :rules="rules" size="small">
        <el-form-item :label="$t('message.oldPassword')" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.newPassword')" prop="new_password">
          <el-input v-model="form.new_password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.rePassword')" prop="repassword">
          <el-input v-model="form.repassword" type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="closeEdit">{{$t('message.cancel')}}</el-button>
          <el-button type="primary" @click="saveEdit('form')">{{$t('message.save')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script >
export default {
  name: 'Right',
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.newPassword')));
        } else {
          if (this.form.repassword !== '') {
            this.$refs.ruleForm.validateField('repassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('rules.rePassword')));
        } else if (value !== this.form.new_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rules,value,callback)=>{
        if(value === ''){
           callback(new Error(this.$t('rules.oldPassword')));
        }
      }
    return {
      showEdit: false,
      form:{
        password:'',
        new_password: '',
        repassword:''
      },
      rules:{
           password: [
          {
            required: true,
            validator: validatePass3,
            // message: this.$t('rules.oldPassword'),
            trigger: 'blur'
          }
        ],
         new_password: [
          {
            required: true,
             validator: validatePass,
            // message: this.$t('rules.newPassword'),
            trigger: 'blur'
          }
        ],
         repassword: [
          {
            required: true,
            validator: validatePass2,
            // message: this.$t('rules.rePassword'),
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    logout() {
        console.log(this.message)
      this.$confirm(this.$t('right.logOut'), this.$t('right.hint'), {
        confirmButtonText: this.$t('right.confirm'),
        cancelButtonText: this.$t('right.cancel'),
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: this.$t('right.successfulExit')
          })
          localStorage.removeItem('userData')
          this.$router.push('/login')
        })
        .catch(() => {
          console.log('退出错误')
        })
    },
    closeDiv(){
      this.form.password = ''
      this.form.new_password = ''
      this.form.repassword = ''
      this.$refs.form.resetFields()
       this.showEdit = false
    },
    closeEdit(){
      this.closeDiv()
    },
    //修改密码
    async saveEdit(){
      try {
        let URL = "/v1/admin/repass"
        let res = await this.$http.post(URL,{
          admin_id: localStorage.id,
          ...this.form
        })
        console.log(res)
        if(res.data.status == "success"){
          this.closeDiv()
          this.$message({
                message: this.$t('message.operationSuccessful'),
                type: 'success'
              })
        }
      } catch (error) {
        console.log(error)
      }
    },
    getEdit(){
      this.showEdit = true
    }
  },
  computed:{
    // rules(){
    //   return{
        
    //   }
    // }
  }
}
</script>

<style scoped>
/* .right-con {

} */
.avatar {
  box-sizing: border-box;
  height: 80px;
  padding: 20px 0;
}
.el-avatar {
  display: block;
  margin-right: 4px;
}

.el-dropdown-link {
  display: flex;
  color: #fff;
}
.el-dropdown-menu {
  margin-top: -10px;
}
.right-con .form{
  line-height: 0;
}
</style>