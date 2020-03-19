<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive> -->
        <router-view/>
  </div>
</template>
<script >
import  "babel-polyfill"
export default{

}
</script>
<style lang="scss">
@import './assets/styles/base.scss';
#app{
  width: 100%;
  height: 100%;
}
.el-table td, .el-table th {
  padding: 6px 0 !important;
}
.el-dialog__header {
  border-bottom: 1px solid #ccc !important;
}
.el-pagination{
  padding: 0 !important;
  text-align: right !important;
}
.el-pagination__sizes{
  margin: 0 !important;
}
.el-pagination .el-select .el-input{
   margin: 0 !important;
}
// .el-table th.gutter
//     display: table-cell !important;
//   

.el-table-column--selection .cell{
  padding-right: 10px !important;
}
</style>




