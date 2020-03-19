<template>
  <!-- 统计概况 -->
  <div class="statisticalProfile">
    <el-card class="content">
      <div class="top">
        <div class="left">
          <div class="title">{{$t('dataStatistics.carStatistics')}}</div>
          <div class="pieCont">
            <div class="carDataMap">
              <Pie :id="'pie1'" :data="total" />
            </div>
            <div class="carDataMap">
              <Pie :id="'pie2'" :data="online" />
            </div>
            <div class="carDataMap">
              <Pie :id="'pie3'" :data="warning" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">{{$t('dataStatistics.carStatus')}}</div>
          <div class="statusCon" >
            <div class="statusContent" v-for="item in carStatus" :key="item._id" >
              <div class="carPic" :style="item.online?(item.warning?'color: #f90':'color: #66ffff'):(item.warning?'color: #f90':'')">
                <i class="el-icon-truck iconSize"></i>
                <span>{{item.plate_no}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">{{$t('dataStatistics.oilMonitoring')}}
          <span>({{oil_title}})</span>
          </div>
        <div class="oilContents">
          <div class="oilContent" v-for="(item,index) in oil_data" :key="item.oil_log._id">
              <Bar :id="'bar'+index" :data="item"/>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script >
 import { mapMutations, mapActions, mapGetters } from 'vuex'
import Pie from '../../../components/Pie/Pie'
import Bar from "../../../components/Bar/Bar"
export default {
  name: 'StatisticalProfile',
  data() {
    return {
      total: null,
      online: null,
      warning: null,
      carStatus: [],
      oil_data: [],
      oil_title:'',
    }
  },
  methods: {
    async getEchartsData() {
      try {
        let URL = '/v1/statistics'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id
        })
        console.log(res.data)
        if (res.data.status == 'success') {
          this.total = res.data.data.oil_truck_total

          this.online = res.data.data.oil_truck_online
          this.warning = res.data.data.oil_truck_warning
          this.carStatus = res.data.data.oil_truck_status
          this.oil_data = res.data.data.oil_logs.data
          this.oil_title = res.data.data.oil_logs.title
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    Pie,
    Bar
  },
  created() {
    this.$nextTick(()=>{
    this.getEchartsData()

    })

  },
  computed:{
    ...mapGetters(['wsValue']), 
  },
  watch:{
    wsValue:{
      handler(newValue,oldValue){
        // this.dataList.unshift(newValue)
        // this.dataList.pop()
        // this.pageInfo.total += 1
        this.carStatus.forEach(item=>{
          if(item.device_id_gps == newValue.device_id){
            item.online = true
          }
        })
      }
    },
    wsTreeDatas:{
      handler(newValue,oldValue){
        this.carStatus.forEach(item=>{
          if(item.device_id_gps == newValue.device_id){
            item.online = false
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.statisticalProfile{
  position: relative;
  height: 100%;
  overflow: auto;
}
.statisticalProfile .content {
  background-color: rgba(0, 60, 85, 1);
  border: none;
  color: #ccc;
  height: 100%;
  position: relative;

}
.statisticalProfile .top {
  display: flex;
  /* justify-content: space-between; */
}
.statisticalProfile .pieCont {
  display: flex;
}
.carDataMap {
  width: 120px;
  height: 120px;
}
.statisticalProfile .title {
  color: #ccc;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 7px;
}
.statisticalProfile .right {
  margin-left: 80px;
}
.statisticalProfile .right .title {
  margin-bottom: 20px;
}
.statisticalProfile .statusCon {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.statisticalProfile .carPic {
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  margin-top: 8px;
}
.statisticalProfile .iconSize {
  font-size: 50px;
  line-height: 46px;
}
.statisticalProfile .bottom{
  margin-top: 30px;
  overflow: auto;
  /* 这里改了 */
  /* height: 100%; */
 
}
.statisticalProfile .bottom .title span {
  font-size: 16px;
}
.statisticalProfile .oilContents{
  /* 这里改了 */

  /* height: 100%; */
  
  overflow: auto;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  
}
.statisticalProfile .oilContent{
  width: 450px;
  height: 300px;
  border: 1px solid #0089d2;
  margin-top: 10px;
  margin-right: 60px;
}
</style>
<style >
.statisticalProfile .el-card{
    
  /* 这里改了 */
    
    /* height:100%; */
    overflow:auto;
}
.statisticalProfile .el-card__body{
    box-sizing: border-box;
     padding: 30px;  
     height: 100% ;
     overflow: hidden;
}
</style>