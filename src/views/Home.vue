<template>
  <div class="home">
    <el-container>
      <el-header style="height: 80px">
        <Header />
      </el-header>
      <el-container>
        <el-aside :width="$t('sidebar.width') + 'px'">
          <Sidebar />
          <div class="zmartec">
            <div class="title">{{$t('message.technical support')}}</div>
            <div class="content">{{$t('message.zmartec')}}</div>
          </div>
        </el-aside>

        <el-main :class="{last:$route.meta.islast}">
          <div class="clumb">
            <Breadcrumb />
          </div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script >
// import Header from '../components/TheHeader.vue'

import { mapMutations, mapActions, mapGetters } from 'vuex'
import Header from '@/components/TheHeader/Header'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
export default {
  data() {
    return {
      wsUrl: '',
      websocket: null,
      isClose: true
    }
  },
  components: {
    Header,
    Sidebar,
    Breadcrumb
  },
  methods: {
    ...mapMutations([
      'updateValue', // 映射 this.updateValue() 为 this.$store.commit('updateValue')
      'updateTreeDatas'
    ]),
    //获取websocket数据
    webSocketLink() {
      let that = this
      that.wsUrl =
        process.env.NODE_ENV == 'development' ? 'ws://192.168.31.11:8686' : ''
      var hearCheck = {
        timeout: 5000,
        timeoutObj: null,
        reset: function() {
          clearInterval(this.timeoutObj)
          return this
        },
        start: function() {
          this.timeoutObj = setInterval(function() {
            that.websocket.send('HeartBeat')
            console.log('HeartBeat')
          }, this.timeout)
        }
      } //心跳检测

      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        that.websocket = new WebSocket(that.wsUrl)
        that.websocket.onopen = function() {
          that.websocket.send(
            JSON.parse(localStorage.userData).websocket_secret_web
          )
          // console.log(JSON.parse(localStorage.userData).websocket_secret_web)
          // hearCheck.reset().start()
          console.log('websocket连接成功')
        }

        that.websocket.onmessage = function(event) {
          // console.log(event.data)
          let reg = RegExp(/type|data/)
          console.log(reg.test(event.data))
          if (reg.test(event.data)) {
            let obj = JSON.parse(event.data)
            console.log(obj)
            switch (obj.type) {
              case 1:
                that.updateValue(obj.data)
                break;
              case 2:
                that.updateTreeDatas(obj.data)
                break;
              default:
                break;
            }
          }
        }
        that.websocket.onclose = function() {
          if (that.isClose) {
            that.webSocketLink()
            console.log('关闭close重连')
          } else {
            console.log('关闭close不重连', evt)
          }
          // hearCheck.reset()
        }
        that.websocket.onerror = function(evt) {
          //连接失败，发送、接收数据失败或者处理数据出现错误
          console.log(
            '连接失败，发送、接收数据失败或者处理数据出现错误err',
            evt
          )
        }
      }
    }
    // handleWsMsg(obj){

    // }
  },
  beforeDestroy() {
    this.isClose = false
    if(this.webSocketLink){
      this.webSocketLink.close()
    }
  },
  mounted() {
    this.webSocketLink()
  },
  computed: {
    ...mapGetters(['wsValue','wsTreeDatas'])
    
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  /* overflow: hidden; */
  /* background-color: rgba(228, 228, 228, 1); */
}

.el-header {
  padding: 0;
}
.el-aside {
  height: 100%;
  position: relative;
}
.el-container {
  height: 100%;
}
.el-main {
  position: relative;
  padding: 20px 30px;
  width: 100%;
  background-color: rgba(228, 228, 228, 1);
  /* max-height: 100%; */
  height: 100%;
}

.zmartec {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
}
.zmartec .title {
  color: #006da8;
}
.zmartec .content {
  color: #0089d2;
}
.clumb {
  height: 30px;
  line-height: 30px;
}
.last {
  background-color: #004766;

  overflow: hidden;
}
</style>