<template>
  <div class="vehicleManagement">
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
// import Car from "./Car"
// import CarHeader from "./CarHeader"
// import CarBody from "./CarBody"

export default {
  name:"VehicleManagement",
  data() {
    return {
      tableTitles: [
        {
          index: 'Car',
          name: 'vehicleManagement.Car'
        },
        {
          index: 'CarHeader',
          name:'vehicleManagement.CarHeader'
        },
        {
          index: 'CarBody',
          name: 'vehicleManagement.CarBody'
        }
      ],
      // activeIndex: "Car",
    }
  },
  components: {
    TableTitle,
    // Car,
    // CarHeader,
    // CarBody
  },
  computed: {
    currentPage() {
      return (
        this.$store.state.activeIndexTable ||
        sessionStorage.getItem('activeIndex') ||
        'Car'
      )
    },
    activeIndex(){
      return this.$store.state.activeIndexTable ||"Car"
    }
  },
  mounted(){
    console.log(this.activeIndex)
  }
}
</script>

<style scoped>
.vehicleManagement {
  /* height: 100%; */
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