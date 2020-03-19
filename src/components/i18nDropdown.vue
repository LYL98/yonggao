<template>
  <div class="i18n-dropdown">
    <el-dropdown @command="handleCommand" placement="top">
      <span class="el-dropdown-link">
        {{$t('message.lang')}}
        <i class="el-icon-arrow-down el-icon--right myI"></i>
      </span>
      <el-dropdown-menu slot="dropdown" :class="{marginTop: isTop}">
        <el-dropdown-item command="cn">中文简体</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
        <el-dropdown-item command="zhTW">中文繁体</el-dropdown-item>
        
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script >

export default {
    name: 'i18nDropdown',
    props:{
      isTop:{
        type: Boolean,
        default: false,
      }
    },
    methods:{
        handleCommand(command){
            this.$i18n.locale = command
            localStorage.setItem("lang",command)
        }
    }
}
</script>

<style scoped>
.i18n-dropdown{
    cursor: pointer;  
}
.el-dropdown-link{
    color: #fff
}
.marginTop{
  margin-top: -10px;
}
span{
  display: block;
}
.myI{
  margin-left: -2px;
}
</style>