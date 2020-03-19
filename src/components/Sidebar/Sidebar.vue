<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgba(0, 63, 96, 1)"
      text-color="#fff"
      active-text-color="#66FFFF"
      router
      @select="selectReset"
    >
      <el-menu-item index="/DeviceManagement">
        <i class="el-icon-setting iconSize"></i>
        <span slot="title">{{$t('sidebar.DeviceManagement')}}</span>
      </el-menu-item>
      <el-menu-item index="/VehicleManagement">
        <i class="el-icon-truck iconSize"></i>
        <span slot="title">{{$t('sidebar.VehicleManagement')}}</span>
      </el-menu-item>
      <el-menu-item index="/Video">
        <i class="el-icon-video-camera-solid iconSize"></i>
        <span slot="title">{{$t('sidebar.Video')}}</span>
      </el-menu-item>
      <el-menu-item index="/VehicleLocalization">
        <i class="el-icon-location-outline iconSize"></i>
        <span slot="title">{{$t('sidebar.VehicleLocalization')}}</span>
      </el-menu-item>
      <el-menu-item index="/OilMonitoring">
        <i class="el-icon-odometer iconSize"></i>
        <span slot="title">{{$t('sidebar.OilMonitoring')}}</span>
      </el-menu-item>
      <el-menu-item index="/DataStatistics">
        <i class="el-icon-s-data iconSize" ></i>
        <span slot="title">{{$t('sidebar.DataStatistics')}}</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script >
import {mapState,mapGetters,mapActions} from 'vuex'; 

export default {
  name: 'Sidebar',
  data(){
    return{
      
    }
  },
  watch:{
    
    
  },
  methods:{
  selectReset(){
       sessionStorage.setItem("activeIndex","")
      //  sessionStorage.getItem('activeIndex')

     this.$store.commit("setActiveIndex","")
     console.log(this.$store.state.activeIndexTable)
  }
  }

}
</script>

<style scoped>
.sidebar {
  height: 100%;
}
.el-menu {
  height: 100%;
  border: 0;
}
.el-menu-item {
  display: flex;
  flex-direction:  column;
  justify-content: center;
  align-items: center; 
  height: 80px;
 
}
span {
  line-height: 14px;
  font-size: 14px;
}
.iconSize{
  font-size: 30px;
  color: #fff;
  margin-bottom: 6px;
}
.el-menu-item:hover {
  background-color: rgba(14, 221, 240, 0.32) !important;
}
</style>