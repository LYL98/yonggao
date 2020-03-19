<template>
  <div class="dataStatistics">
    <div class="tableTitle">
      <TableTitle :tableTitles="tableTitles" :activeIndex="activeIndex" />
    </div>

    <div class="table">
      <keep-alive>
        <component :is="currentPage"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script >
import TableTitle from '../../../components/TableTitle/TableTitle'
// import StatisticalProfile from './StatisticalProfile'
// import OilMonitoringRecord from './OilMonitoringRecord'

export default {
  data() {
    return {
      tableTitles: [
        {
          index: 'StatisticalProfile',
          name: 'dataStatistics.StatisticalProfile'
        },
        {
          index: 'OilMonitoringRecord',
          name: 'dataStatistics.OilMonitoringRecord'
        }
      ],
      activeIndex: 'StatisticalProfile'
    }
  },
  components: {
    TableTitle,
    // StatisticalProfile,
    // OilMonitoringRecord
  },
  computed: {
    currentPage() {
      return (
        this.$store.state.activeIndexTable ||
        sessionStorage.getItem('activeIndex') ||
        'StatisticalProfile'
      )
    },
    // activeIndex(){
    //   return this.$store.state.activeIndexTable ||"StatisticalProfile"
    // }
  }
}
</script>

<style scoped>
.dataStatistics {
    margin-top: 10px;
    /* height: 100%; */
    height: calc(100% - 60px);
    overflow: hidden;
}
.tableTitle {
  /* width: 100%; */
  /* width: 900px; */
  /* width: 280px; */
  position: absolute;
  height: 60px;
  line-height: 60px;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
 
}
.dataStatistics .tableTitle>>> .el-menu{
  background-color: #004766 !important;
  border: none !important;

}
.dataStatistics .tableTitle>>> .el-menu-item{
  background-color: #004766 !important;
  color: #E4E4E4 !important;
}
.dataStatistics .tableTitle>>> .line{
  color: #E4E4E4 !important;
}
.dataStatistics .tableTitle>>>.el-menu--horizontal>.el-menu-item.is-active{
  border-bottom: 3px solid #fff !important;
}
.dataStatistics .table {
  height: 100%;
  /* margin-top: 10px; */
  position: relative;
  z-index: 0.5;
  overflow: auto;
}

</style>
<style >


</style>