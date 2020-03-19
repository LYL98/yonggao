<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item >{{$t('breadcrumb.homePage')}}</el-breadcrumb-item>
      <el-breadcrumb-item >
        {{$t("sidebar."+this.$route.name)}}
      </el-breadcrumb-item>
      
    </el-breadcrumb>
  </div>
</template>

<script >
export default {
  name: "Breadcrumb",
  data(){
    return{
     
    }
  },
  watch:{ 
    
  }
}
</script>

<style scoped>

.el-breadcrumb{
  line-height: 30px;
 
}
.color {
  color: #999
}
</style>
<style >
.el-breadcrumb__inner {
  color: #999 !important;

}
.el-breadcrumb__separator{
  color: #ccc
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
  font-weight: 700 !important;
}
</style>