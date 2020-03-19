<template>
<!-- 设备管理 -->
  <div class="deviceManagement">
    <div class="tableTitle">
      <TableTitle :tableTitles="tableTitles" :activeIndex="activeIndex" />
    </div>
    <div class="table">
      <!-- <keep-alive> -->
        <component :is="currentPage"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script >
import TableTitle from '../../../components/TableTitle/TableTitle'
// import VideoMonitoringEquipment from './VideoMonitoringEquipment'
// import VehiclePositioningEquipment from './VehiclePositioningEquipment'
// import OilMonitoringEquipment from './OilMonitoringEquipment'

export default {
  name:"DeviceManagement",
  data() {
    return {
      tableTitles: [
        {
          index: 'VideoMonitoringEquipment',
          name: 'deviceManagement.VideoMonitoringEquipment'
        },
        {
          index: 'VehiclePositioningEquipment',
          name: 'deviceManagement.VehiclePositioningEquipment'
        },
        {
          index: 'OilMonitoringEquipment',
          name: 'deviceManagement.OilMonitoringEquipment'
        }
      ],
    }
  },
  components: {
    TableTitle,
    // VideoMonitoringEquipment,
    // VehiclePositioningEquipment,
    // OilMonitoringEquipment
  },

  methods: {},
  watch: {},
  computed: {
    currentPage() {
      return (
        this.$store.state.activeIndexTable ||
        sessionStorage.getItem('activeIndex') ||
        'VideoMonitoringEquipment'
      )
    },
    activeIndex(){
      return (this.$store.state.activeIndexTable ||"VideoMonitoringEquipment")
    }
    
  },
  // beforeCreate(){
  //   this.$options.components.VideoMonitoringEquipment = require('./VideoMonitoringEquipment').default
  //   this.$options.components.VehiclePositioningEquipment = require('./VehiclePositioningEquipment').default
  //   this.$options.components.OilMonitoringEquipment = require('./OilMonitoringEquipment').default

  // }
}
</script>

<style scoped>
.deviceManagement {
  /* height: 100%; */
  /* width: 100px; */
}
.tableTitle {
  /* width: 100%; */
  /* width: 900px; */
  position: absolute;
  height: 60px;
  line-height: 60px;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
}
.table{
  margin-top: 10px;
  position: relative;
  z-index: 0.5;
}
</style>