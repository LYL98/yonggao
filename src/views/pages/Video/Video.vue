<template>
  <div class="video">
    <el-card>
      <div class="videoContent">
        <div class="left">
          <div class="tree">
            <div class="title">{{$t('tree.vehicleList')}}</div>
            <div class="treeCon">
              <!-- :treeData="treeData" -->
              <keep-alive>
                <Tree  @getVideo="getVideo" :show="''"/>
              </keep-alive>
            </div>
          </div>
        </div>
        <div class="right" >
              <!-- :num="index" -->

              <div class="rightContent" >
                <div class="videoTitle">{{videoData.label}}</div>
                <div class="videoNone" v-if="videoData.label && dvrData.dvr_id == undefined">{{$t('message.videoNone')}}</div>
                <div class="videoDiv" v-for="(item,index ) in channels" :key="index" >
                  <VideoMain :channelData="item"  :dvrData="dvrData" :jsession="jsession"/>
                </div>
              </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script >
import axios from 'axios'
import Tree from '../../../components/Tree/Tree'
import VideoMain from "./VideoMain"
export default {
  name: 'Video',
  data(){
      return{
          treeData: [],
          videoData: {},//当前选中车辆的数据
          channels: [],//通道信息
          dvrData:{},//视频的相关播放信息
          jsession: ''
      }
  },

  components: {
    Tree,
    VideoMain
  },
  methods: {
    //获取树形列表数据
  //  async getTreeData(){
  //      let URL = "/v1/oil_truck/tree"

  //      let res = await this.$http.post(URL,{
  //          admin_id: localStorage.id
  //      })
  //      let {status , data} = res.data
  //      if(status == "success"){
  //          this.treeData = data
  //      }
  //     console.log(this.treeData)
  //   },
    getVideo(val){
        console.log(val)
        this.videoData = val
        this.channels = this.videoData.dvr.dvr_channels
        this.dvrData = this.videoData.dvr
        
    },
    //获取视频观看的ID
    async getVideoJessionID(){
      let url_0 ="http://chinamdvr.com:8088/StandardApiAction_login.action?account=cs&password=000000" //登录地址和参数
      let res = await axios.get(url_0, {})
      console.log(res)
       this.jsession = res.data.JSESSIONID
    }
  },
  created(){
      // this.getTreeData()
      this.getVideoJessionID()

  }
}
</script>

<style scoped>
.video{
     margin-top: 10px;
     height: calc(100% - 60px);
     overflow:hidden;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-bottom: 1px solid #ccc;
     border-radius: 4px;
}
.videoContent{
    height: 100%;
    display: flex;
    overflow: auto;
    position: relative;
}
.left{
  /* max-height: 100%; */
  height: calc(100% - 180px);
  position: fixed;
  border-right: 1px solid #ccc;
  overflow:auto;
}
.right{
  width: 100%;
}
.rightContent{
    /* max-height: 100%; */
    flex: 1;
     /* height: 0;
      */
    width: 1008px;
    margin: 40px 0 40px 260px;
    position: absolute; 
    left: 200px; 

 
}
.videoTitle{
  width: 1004px;
  text-align: center;
  line-height: 30px;
  background-color: #ccc;
  
}
.videoNone{
  width: 1004px;
  background-color: #000;
  text-align: center;
  height: 600px;
  line-height: 600px;
  color: #fff;
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
    margin-top: 10px;
    /* margin-left: 10px; */
}
.videoDiv{
  display: inline-block;
  width: 500px;
  /* height: 409px; */
  margin-right: 4px;
}
</style>
<style >
.video .el-card__body{
     padding: 0;  
     height: 100%;
     overflow: auto;
}
.video .el-card{
    /* height: 100% !important; */
    /* overflow: auto; */
    height:100%;
    overflow:auto;
}
</style>