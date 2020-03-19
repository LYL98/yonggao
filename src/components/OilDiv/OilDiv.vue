<template>
  <!-- 油量监控选中出现的表 -->
  <div class="oilTable">
    <div class="oilData" v-for="item in dataList" :key="item._id">
      <div class="oilContent" :class="{active:item.alarm}">
        <span>{{item.create_time}}</span>
        <!-- class="oilWeight" -->
        <span class="oilWeight">{{item.weight}} kg</span>
        <!-- <el-button
                  v-show="item.alarm"
                  size="mini"
                  icon="el-icon-video-camera"
                  type="primary"
                  :title="$t('message.look')"
                  
        ></el-button>-->
        <!-- @click="getVideoShow(scope.row)" -->
      </div>
    </div>
  </div>
</template>

<script >
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  props: {
    gps_id: {
      type: String
    }
  },
  data() {
    return {
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['wsValue', 'wsTreeDatas'])
    
  },
  methods: {
    async getFirstData(gps_id) {
      try {
        let URL = '/v1/oil_log'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id,
          gps_id: gps_id
        })
        console.log(res.data)
        let { status, data } = res.data
        if (status == 'success') {
          this.dataList = data.dataList
        } else {
          console.log('获取油量列表错误')
        }
      } catch (error) {
        console.log(error)
      }
    }
    //
  },
  mounted() {
    this.getFirstData(this.gps_id)
    
  },
  watch: {
    //   dataList:{
    //     //   handler(oldValue,newValue){
    //     //         this.getFirstData()
    //     //   }
    //   }
    wsValue: {
      
      handler(newValue, oldValue) {
        
        if (newValue.device_id == this.dataList[0].device_id) {
          console.log(11,newValue)
          this.dataList.unshift(newValue)
          this.dataList.pop()
        }
      },
      deep:true,
      // immediate: true,
    }
  }
}
</script>

<style scoped>
.oilTable {
  /* box-sizing: border-box; */
  /* width: 400px; */
  /* padding: 10px; */
  /* height: 40px; */
  /* color: #333;
  font-size: 14px; */
  /* height: 440px; */
}
.oilTable .oilContent {
  margin-bottom: 10px;
}
.oilTable span {
  margin-right: 20px;
}
.oilData:nth-child(1) div .oilWeight {
  font-weight: 700;
}
.oilWeight {
}
.active {
  color: #f00;
}
</style>