
<template>
<!-- 油量监控 -->
  <div class="oilMonitoring">
    <el-card>
      <div class="oilContent">
        <div class="left">
          <div class="tree">
            <div class="title">{{$t('tree.vehicleList')}}</div>
            <div class="treeCon">
              <!-- :treeData="treeData" -->
                <Tree   :show="'oil'" @getOil="getOil"/>
            </div>
          </div>
        </div>
        <div class="right">
            <div class="oilDiv" v-for="item in oilData" :key="item._id" >
              <OilDiv :gps_id="item.gps.gps_id"  v-if="item.gps.oil_log !=undefined" class="myOilDiv"/>
              <div class="titCont" v-else>暂无信息</div>
              <div class="oilTitle">{{item.label}}</div>
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script >
import Tree from '../../../components/Tree/Tree'
import OilDiv from "../../../components/OilDiv/OilDiv"
export default {
  name: 'VehicleLocalization',
  data(){
      return{
          treeData: [],
          oilData: [],
      }
  },

  components: {
    Tree,
    OilDiv
  },
  methods: {
    //获取树形列表数据
  //  async getTreeData(){
  //      let URL = "/v1/oil_truck/tree"

  //      let res = await this.$http.post(URL,{
  //          admin_id: localStorage.id
  //       })
  //      let {status , data} = res.data
  //      if(status == "success"){
  //          this.treeData = data
  //      }},

    getOil(val) {
        
        this.oilData = val
        console.log(this.oilData)
    }
  },
  created(){
      // this.getTreeData()
  }
}
</script>

<style scoped>
.oilMonitoring{
   margin-top: 10px;
     height: calc(100% - 60px);
     overflow:hidden;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-bottom: 1px solid #ccc;
     border-radius: 4px;

}
.oilContent{
    height: 100%;
    display: flex;
    overflow: auto;
    position: relative;
}
.left{
  height: calc(100% - 180px);
  position: fixed;
  border-right: 1px solid #ccc;
  overflow:auto;

}
.right{
    flex: 1;
    padding: 40px 0 40px 60px;
    position: absolute; 
    left: 200px; 
    display: flex;
  flex-wrap: wrap;
}
.tree {
  width: 200px;
  /* height: 100%; */
}
.tree .title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #AEAEAE;
   /* height: 100%; */
    border-bottom: 1px solid #ccc;
}
.tree .treeCon{
    width: 200px;
    margin-top: 20px;
    /* margin-left: 20px; */
     
}
.oilDiv{
  /* display: inline-block; */
  /* width: 400px;
  height: 480px; */
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;

}
.myOilDiv{
  box-sizing: border-box;
  width: 400px;
  height: 460px;
  padding: 10px;
  color: #333;
  font-size: 14px;
  /* overflow: hidden; */
}
.oilTitle {
  width: 400px;
  text-align: center;
  color: #333;
  background-color: #f2f2f2;
  height: 40px;
  line-height: 40px;
}
.titCont{
  width: 400px;
  height: 460px;
  color: #ccc;
  text-align: center;
  line-height: 460px;
}
</style>
<style >

.oilMonitoring .el-card__body{
    padding: 0;  
     height: 100%;
     overflow: auto;
}
.oilMonitoring .el-card{
    /* height: 100% !important; */
    /* overflow: auto; */
    height:100%;
    overflow:auto;
}
</style>