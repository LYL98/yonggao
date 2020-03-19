
<template>
  <!-- 车辆定位 -->
  <div class="vehicleLocalization">
    <el-card>
      <div class="vehicleContent">
        <div class="left">
          <div class="tree">
            <div class="title">{{$t('tree.vehicleList')}}</div>
            <div class="treeCon">
              <!-- :treeData="treeData" -->
              <Tree  :show="'position'" @getPosition="getPosition" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="mapDiv" v-for="(item,index) in positionData" :key="item._id">
            <Map :id="'amapDemo'+index" :data="item.gps.oil_log" v-if="item.gps.gps_id !==undefined"/>
            <div class="titCont" v-else>GPS信号弱</div>

            <div class="mapTitle">{{item.label}}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script >
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Tree from '../../../components/Tree/Tree'
import Map from '../../../components/Map/Map'
export default {
  name: 'VehicleLocalization',
  data() {
    return {
      treeData: [],
      positionData: [],

      wsUrl: '',
      websocket: null,
      isClose: true
    }
  },

  components: {
    Tree,
    Map
  },
  methods: {
    //获取树形列表数据
    // async getTreeData() {
    //   let URL = '/v1/oil_truck/tree'
    //   let res = await this.$http.post(URL, {
    //     admin_id: localStorage.id
    //   })
    //   let { status, data } = res.data
    //   if (status == 'success') {
    //     this.treeData = data
    //   }
    //   console.log('完成')
    // },
    //得到定位相关数据
    getPosition(val) {
      this.positionData = val
      console.log(this.positionData)
    },

    //获取websocket数据
    // webSocketLink() {
    //   let that = this
    //   that.wsUrl = process.env.NODE_ENV == 'development' ? 'ws://192.168.31.11:8686' : ''
    //   var hearCheck = {
    //     timeout: 5000,
    //     timeoutObj: null,
    //     reset: function() {
    //       clearInterval(this.timeoutObj)
    //       return this
    //     },
    //     start: function() {
    //       this.timeoutObj = setInterval(function() {
    //         that.websocket.send('HeartBeat')
    //         console.log('HeartBeat')
    //       }, this.timeout)
    //     }
    //   } //心跳检测

    //   if (typeof WebSocket === 'undefined') {
    //     alert('您的浏览器不支持socket')
    //   } else {
    //     that.websocket = new WebSocket(that.wsUrl)
    //     that.websocket.onopen = function () {
    //       console.log('websocket连接成功')
    //       that.websocket.send(JSON.parse(localStorage.userData).websocket_secret_web)
    //       console.log(JSON.parse(localStorage.userData).websocket_secret_web)
    //       // hearCheck.reset().start()
          
    //     }

    //     that.websocket.onmessage = function(event){
    //         console.log(event.data)
    //         // that.getPosition()
          
            
    //     }

    //     that.websocket.onclose = function () {
          
    //       if(that.isClose){
    //         that.webSocketLink()
    //         console.log('关闭close重连')
    //       }else{
    //         console.log('关闭close不重连', evt)
    //       }
    //       // hearCheck.reset()
    //     }
    //     that.websocket.onerror = function(evt) {
    //     //连接失败，发送、接收数据失败或者处理数据出现错误
    //     console.log('连接失败，发送、接收数据失败或者处理数据出现错误err', evt)
    //   }
    //   }
    // }
  },
  created() {
    // this.getTreeData()
    // this.webSocketLink()
  },

  watch:{
    
  }

}
</script>

<style scoped>
.vehicleLocalization {
  margin-top: 10px;
  height: calc(100% - 60px);

  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
  border-radius: 4px;
}
.vehicleContent {
  height: 100%;
  display: flex;
  overflow: auto;
  position: relative;
}
.left {
  height: calc(100% - 180px);
  position: fixed;
  border-right: 1px solid #ccc;
  overflow: auto;
}
.right {
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
.tree .title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #aeaeae;
  /* height: 100%; */
  border-bottom: 1px solid #ccc;
}
.tree .treeCon {
  width: 200px;
  margin-top: 20px;
  /* margin-left: 20px; */
}
.mapDiv {
  /* display: inline-block; */
  width: 400px;
  /* height: 440px; */
  margin-right: 10px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
.mapTitle {
  width: 400px;
  text-align: center;
  color: #333;
  background-color: #f2f2f2;
  height: 40px;
  line-height: 40px;
}
.titCont{
  width: 400px;
  height: 400px;
  color: #ccc;
  text-align: center;
  line-height: 400px;
}
</style>
<style >
.vehicleLocalization .el-card__body {
  padding: 0;

  height: 100%;
  overflow: auto;
}
.vehicleLocalization .el-card {
  /* height: 100% !important; */
  /* overflow: auto; */
  height: 100%;
  overflow: auto;
}
</style>

