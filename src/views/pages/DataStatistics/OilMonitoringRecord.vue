<template>
  <div class="oilMonitoringRecord">
    <div class="cont">
      <div class="tableHeader">
        <div class="left">
          <!-- <el-button type="primary" size="small" class="paddingA" @click="getAdd">
            <i class="el-icon-plus"></i>
            {{$t('message.add')}}
          </el-button>-->
        </div>
        <div class="right">
          <el-date-picker
            v-model="conditions.date"
            type="date"
            :placeholder="$t('dataStatistics.date')"
            size="small"
            class="comWidth"
            value-format="yyyy-MM-dd"
          ></el-date-picker>

          <el-select
            v-model="conditions.device_id_gps"
            :placeholder="$t('dataStatistics.allCar')"
            size="small"
            class="comWidth"
          >
            <el-option-group v-for="group in carData" :key="group.label" :label="group.label">
              <!-- key绑定值要换value -->
              <el-option
                v-for="item in group.options"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-option-group>
          </el-select>

          <el-select
            v-model="conditions.status"
            :placeholder="$t('dataStatistics.status')"
            size="small"
            class="comWidth"
          >
            <el-option
              v-for="item in statusData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input
            :placeholder="$t('message.searchWord')"
            class="search"
            size="small"
            v-model="conditions.key"
            @keyup.enter.native="getOilMonitoringEquipment"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>-->
          <el-button type="primary" size="small" @click="search">{{$t('message.search')}}</el-button>
        </div>
      </div>

      <div class="tableCon">
        <!-- "62.5vh" -->

        <div class="tableContent">
          <el-table
            :data="dataList"
            ref="multipleTable"
            border
            :header-cell-style="{background:'#f2f2f2',color: '#797979',}"
            v-loading="load1"
            max-height="600"
          >
            <el-table-column
              type="index"
              :width="$t('message.labelWidth1')"
              :label="$t('dataStatistics.number')"
              align="center"
            ></el-table-column>
            <el-table-column prop="create_time" :label="$t('dataStatistics.time')" align="center"></el-table-column>
            <el-table-column prop="weight" :label="$t('dataStatistics.oil')" align="center"></el-table-column>
            <el-table-column
              prop="oil_truck.plate_no"
              :label="$t('dataStatistics.car')"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="oil_truck.type_label"
              :label="$t('dataStatistics.vehicleType')"
              align="center"
            ></el-table-column>
            <!-- <el-table-column
            prop="alarm"
            :label="$t('dataStatistics.cylinder')"
            align="center"
            ></el-table-column>-->
            <el-table-column
              prop="status_label"
              :label="$t('dataStatistics.status')"
              align="center"
              width="200px"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.status_label=='油量增多'"
                  style="color:#33cc99"
                >{{scope.row.status_label}}</span>
                <span v-if="scope.row.status_label=='正常'">{{scope.row.status_label}}</span>
                <span
                  v-if="scope.row.status_label=='油量減少'"
                  style="color:#cc0000"
                >{{scope.row.status_label}}</span>
              </template>
            </el-table-column>
            <!-- 以下是视频回放 -->
            <!-- <el-table-column prop="alarm" :label="$t('dataStatistics.video')" align="center">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.alarm"
                  size="mini"
                  icon="el-icon-video-camera"
                  type="primary"
                  :title="$t('message.look')"
                  @click="getVideoShow(scope.row)"
                ></el-button>
              </template>
            </el-table-column> -->
          </el-table>

          <div class="pagination">
            <!-- <el-button type="primary" size="small" @click="delMore()">{{$t('message.delete')}}</el-button> -->
            <el-pagination
              class="myPagin"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.page"
              :page-sizes="[15,20, 25]"
              :page-size="pageInfo.size"
              layout="total, prev, pager, next, sizes"
              :total="pageInfo.total"
            ></el-pagination>
          </div>
        </div>
      </div>

      <el-dialog :visible.sync="showVideo" :title="videoData.title" center class="myDialog">
        <div class="info">
          <span class="time">{{videoData.time}}</span>
          <span class="weight">{{videoData.weight}}kg</span>
        </div>
        <div class="videoCont"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script >
// import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  
  name: 'OilMonitoringRecord',
  data() {
    return {
      load1: false,
      showVideo: false,
      conditions: {
        date: '',
        device_id_gps: '',
        status: '',
        page: null,
        size: null
      },
      carData: [],
      statusData: [],
      pageInfo: {
        total:null,
        size:null,
        page:null
      },
      dataList: [],
      videoData: {
        title: '',
        time: '',
        weight: ''
      }
    }
  },
  methods: {
    //获取车辆下拉列表
    async getCarData() {
      try {
        let URL = '/v1/oil_truck/select'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id
        })
        let { status, data } = res.data
        if (status == 'success') {
          console.log(data)
          this.carData = data
        }
      } catch (error) {
        console.log(error)
      }
    },
    //获取状态下拉列表
    async getStatusData() {
      try {
        let URL = '/v1/statistics/statusSelect'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id
        })
        let { status, data } = res.data
        if (status == 'success') {
          this.statusData = data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getOilData() {
      this.load1 = true
      try {
        let URL = '/v1/statistics/oilLog'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id,
          ...this.conditions
        })
        console.log(res.data)
        let { status, data } = res.data
        if (status == 'success') {
          this.dataList = data.dataList
          this.pageInfo = data.pageInfo
          this.load1 = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    search() {
      this.conditions.page = 1
      // console.log(this.conditions)
      this.getOilData()
    },
    handleSizeChange(val) {
      this.conditions.size = val
      this.getOilData()
    },
    handleCurrentChange(val) {
      this.conditions.page = val
      this.getOilData()
    },
    //点击视频回放按钮
    getVideoShow(data) {
      console.log(data)
      this.videoData.title = data.oil_truck.plate_no
      this.videoData.time = data.create_time
      this.videoData.weight = data.weight

      this.showVideo = true
    }
  },
  created() {
    this.getCarData()
    this.getStatusData()
    this.getOilData()
  },
  // computed:{
  //   ...mapGetters(['wsValue']), 
  // },
  // watch:{
  //   wsValue:{
  //     handler(newValue,oldValue){
  //       this.dataList.unshift(newValue)
  //       this.dataList.pop()
  //       this.pageInfo.total += 1
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.oilMonitoringRecord {
  background-color: rgba(0, 60, 85, 1);

  position: relative;
  // height: 100%;
  overflow: auto;

  .cont {
    box-sizing: border-box;
    min-height: 100%;
    // width: 100%;
    
    //  position: absolute;
     

    overflow: auto;
    // overflow: auto;
    padding: 20px;
    .tableHeader {
      display: flex;
      justify-content: space-between;
    }
    .right {
      .comWidth {
        width: 140px;
        margin-right: 10px;
      }
      // display: flex;
      // justify-content: space-between;
      .search {
        margin-right: 10px;
        width: 300px;
      }
    }
    .tableCon {
      min-height: 100%;
      overflow: auto;
        // position: absolute;
        // position: absolute;

      .tableContent {
        // height: 100%;
        // height: calc(100% - 60px);
        overflow: hidden;
        // position: absolute;
        // box-sizing: border-box;
        margin-top: 10px;
        .pagination {
          margin-top: 15px;
        }
      }
    }
  }
  .myDialog {
    .info {
      text-align: center;
      span {
        margin-right: 20px;
        color: #f00;
      }
    }
  }
}
</style>
<style >
.oilMonitoringRecord .el-pagination__total {
  color: #fff;
}
</style>
