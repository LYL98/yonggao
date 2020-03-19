<template>
  <div class="mymap">
    <div class="titCont" v-show="data.device_id==undefined">GPS信号弱</div>
    <el-amap
      ref="map"
      :vid="id"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      v-show="data.device_id !==undefined"
    >
      <el-amap-marker
        vid="component-marker"
        :position="componentMarker.position"
        
      ></el-amap-marker>
    </el-amap>
    <!-- <div class="title">{{data.gps.oil_log.plate_no}}</div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'f13909f9919f66a6121c8f6ba76f05c6',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
})
let amapManager = new VueAMap.AMapManager()
export default {
    props:{
        id:{
            type: String
        },
        data:{
            type: Object
        }
    },
  data() {
    return {
      amapManager,
      center: [],
      zoom: 12,
      position:[],
      componentMarker: {
        position: [],
      }
    }
  },
  methods:{
      drawMap(data){
         
          this.center =  [data.longitude, data.latitude]
          this.zoom = 17
          this.position = [data.longitude, data.latitude]
          this.componentMarker.position = [data.longitude, data.latitude]
      }
  },
  mounted(){

    console.log(this.data)
      this.drawMap(this.data)
  },
  watch:{
    data:{
      handler(newValue,oldValue){
        this.drawMap(newValue)
      },
      deep: true
    },
  wsValue:{
    handler(newValue,oldValue){
      console.log(this.data)
        if(newValue.device_id == this.data.device_id){
              this.drawMap(newValue)
        }
    },
       deep:true

  }

  },
  computed:{
    ...mapGetters(['wsValue'])
  }
}
</script>

<style scoped>
.mymap {
  width: 100%;
  height: 400px;
  /* box-sizing: border-box; */
  /* border: 1px solid #ccc; */
}
.titCont{
  width: 400px;
  height: 400px;
  color: #ccc;
  text-align: center;
  line-height: 400px;
}

</style>