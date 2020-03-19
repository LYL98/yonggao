<template>
  <div class="oilMonitoringEquipment">
    <el-card>
      <!-- 油量监测设备 -->
      <div class="tableHeader">
        <div class="left">
          <el-button type="primary" size="small" class="paddingA" @click="getAdd">
            <i class="el-icon-plus"></i>
            {{$t('message.add')}}
          </el-button>
        </div>
        <div class="right">
          <el-input
            :placeholder="$t('message.sensorSearchWord')"
            class="search"
            size="small"
            v-model="conditions.key"
             @keyup.enter.native ='getOilMonitoringEquipment'
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small" @click="search">{{$t('message.search')}}</el-button>
        </div>
      </div>

      <div class="tableInfo">
        <el-table
          :data="dataList"
          ref="multipleTable"
          border
          :header-cell-style="{background:'#f2f2f2',color: '#797979',}"
          v-loading="load1"
          @selection-change="handleSelectionChange"
          max-height="600"
          
        >
          <el-table-column type="selection" width="55" align="center" prop="_id"></el-table-column>
          <el-table-column prop="name" :label="$t('videoMonitoringEquipment.deviceName')"  align="center"></el-table-column>
          <el-table-column prop="oil_sensor_id" :label="$t('oilMonitoringEquipment.sensorID')"  align="center"></el-table-column>
          <el-table-column prop="status" :label="$t('videoMonitoringEquipment.deviceState')"  align="center" width="200px">
             <template slot-scope="scope">
              <span v-if="scope.row.status=== '0'" style="color:#33cc99">{{$t('message.normal')}}</span>
              <span v-if="scope.row.status=== '1'" style="color:#ff9900">{{$t('message.repairs')}}</span>
              <span v-if="scope.row.status=== '2'" style="color:#cc0000">{{$t('message.trouble')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" :label="$t('videoMonitoringEquipment.addDate')"  align="center"></el-table-column>
          <el-table-column :label="$t('videoMonitoringEquipment.operation')" align="center" width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit-outline"
                type="primary"
                :title="$t('message.edit')"
                @click="getEdit(scope.row._id)"
              ></el-button>

              <el-button
                size="mini"
                icon="el-icon-delete"
                type="primary"
                :title="$t('message.delete')"
                @click="del(scope.row._id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-button type="primary" size="small" @click=delMore()>{{$t('message.delete')}}</el-button>
          <el-pagination
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

    <!-- 添加的模态框 -->
      <el-dialog
        :visible.sync="showAdd"
        :title="$t('message.addDevice')"
        width="25%"
        :before-close="closeDiv"
      >
        <el-form
          ref="form"
          :model="form"
          :label-width="$t('message.labelWidth')"
          :rules="rules"
          size="small"
        >
          <el-form-item :label="$t('videoMonitoringEquipment.deviceName')" prop="name">
            <el-input v-model="form.name" size="mini" v-filter-special-char="form.name"></el-input>
          </el-form-item>
          <!-- prop="dvr_id" -->
          <el-form-item :label="$t('oilMonitoringEquipment.sensorID')" prop="oil_sensor_id">
            <el-input v-model="form.oil_sensor_id" size="mini"></el-input>
          </el-form-item>
          <!-- prop="dvr_channels" -->
        
          <el-form-item :label="$t('videoMonitoringEquipment.deviceState')" prop="status">
            <el-select v-model="form.status" placeholder="请选择" size="mini" @change="changeStatus">
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.value"
              ></el-option>-->
              <el-option :label="$t('message.normal')" value="0"></el-option>
              <el-option :label="$t('message.repairs')" value="1"></el-option>
              <el-option :label="$t('message.trouble')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="closeAdd('form')" size="mini">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="saveAdd('form')" size="mini">{{$t('message.save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

     <!-- 编辑的模态框 -->
      <el-dialog
        :visible.sync="showEdit"
        :title="$t('message.editDevice')"
        width="25%"
        :before-close="closeDiv"
      >
        <el-form
          ref="form"
          :model="form"
          :label-width="$t('message.labelWidth')"
          :rules="rules"
          size="small"
        >
          <el-form-item :label="$t('videoMonitoringEquipment.deviceName')" prop="name">
            <el-input v-model="form.name" size="mini"  v-filter-special-char="form.name"></el-input>
          </el-form-item>
          <!-- prop="dvr_id" -->
          <el-form-item :label="$t('oilMonitoringEquipment.sensorID')">
            <el-input v-model="form.oil_sensor_id" size="mini"></el-input>
          </el-form-item>
          <!-- prop="dvr_channels" -->
          <!-- <el-form-item :label="$t('videoMonitoringEquipment.channelNumber')">
            <el-input v-model="form.dvr_channels" size="mini"></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('videoMonitoringEquipment.updateDate')">
            <el-input v-model="form.update_time" size="mini" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('videoMonitoringEquipment.deviceState')" prop="status">
            <el-select v-model="form.status" placeholder="请选择" size="mini" @change="changeStatus">
              <el-option :label="$t('message.normal')" value="0" size="mini"></el-option>
              <el-option :label="$t('message.repairs')" value="1" size="mini"></el-option>
              <el-option :label="$t('message.trouble')" value="2" size="mini"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="closeEdit('form')" size="mini">{{$t('message.cancel')}}</el-button>
            <el-button type="primary" @click="saveEdit('form')" size="mini">{{$t('message.save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script >
export default {
  name:"OilMonitoringEquipment",
  data() {
    return {
      load1: false, //列表加载动画
      load2: false, //打开编辑框动画

      dataList: [],
      pageInfo: {
        page: null,
        size: null,
        total: null
      },
      conditions: {
        key: '',
        page: null,
        size: null
      },
      showAdd: false,
      showEdit: false,

      form: {
        _id: '',
        name: '', //设备名称
        oil_sensor_id: '', //传感器ID
        update_time: '',
        status: '0', //设备状态 (默认值)
        type: '3' //设备类型 (默认值)
      },
      delData: []
      // options: [
      //   { value: 0, label: 'message.normal' },
      //   { value: 1, label: 'message.repairs' },
      //   { value: 2, label: 'message.trouble' }
      // ]
    }
  },
  methods: {
    async getOilMonitoringEquipment() {
      this.load1 = true
      try {
        let URL = '/v1/device'
        let res = await this.$http.post(URL, {
          admin_id: localStorage.id,
          type: "3",
          key: this.conditions.key,
          page: this.conditions.page,
          size: this.conditions.size
        })
        console.log(res.data)
        let { status, data } = res.data
        if (status == 'success') {
          this.dataList = data.dataList
          this.pageInfo = data.pageInfo
        }
        this.load1 = false
      } catch (e) {
        console.log(e)
      }
    },

    //搜索事件
    search() {
      this.conditions.page = 1
      this.getOilMonitoringEquipment()
    },
    //切换页码
    handleSizeChange(val) {
      this.conditions.size = val
      this.getOilMonitoringEquipment()
    },
    //切换页码
    handleCurrentChange(val) {
      console.log(val)
      this.conditions.page = val
      this.getOilMonitoringEquipment()
    },
    //切换设备状态
    changeStatus(val) {
      this.form.status = val
      console.log(this.form.status)
    },
    //打开添加模态框
    getAdd() {
      this.showAdd = true
    },
    //添加模态框中的关闭按钮事件
    closeAdd(form) {
      // this.$refs.form.resetFields()
      // ;(this.form.name = ''),
      //   (this.form.dvr_id = ''),
      //   (this.form.dvr_channels = '')
      // this.showAdd = false
      this.closeDiv()
    },
    //添加模态框中的右上角关闭事件
    closeDiv() {
      ;(this.form.name = ''),
        (this.form.oil_sensor_id = ''),
        // (this.form.dvr_channels = '')
      // (this.form.update_time = '')

      this.$refs.form.resetFields()
      this.showAdd = false
      this.showEdit = false
    },
    //添加模态框的保存事件
    saveAdd(form) {
      try {
        this.$refs[form].validate(async valid => {
          if (valid) {
            let URL = '/v1/device/create'
            let res = await this.$http.post(URL, {
              admin_id: localStorage.id,
              ...this.form
            })
            console.log(res.data)
            if (res.data.status == 'success') {
              this.$message({
                message: this.$t('message.addSuccessful'),
                type: 'success'
              })
              this.getOilMonitoringEquipment()
              this.$refs.form.resetFields()
              ;(this.form.name = ''),
                (this.form.gps_id = ''),
                // (this.form.dvr_channels = '')
              this.showAdd = false
            } else {
              console.log(res.data.msg)
              this.closeDiv()
               this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    //打开编辑模态框
    async getEdit(id) {
      try {
        this.showEdit = true
        this.load2 = true

        let URL = '/v1/device/read'

        let res = await this.$http.post(URL, {
          admin_id: localStorage.id,
          _id: id
        })
        if (res.data.status == 'success') {
          this.form = res.data.data
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //编辑模态框的取消事件
    closeEdit() {
      this.closeDiv()
    },
    //编辑模态框的保存事件
    saveEdit(form) {
      try {
        let URL = '/v1/device/update'
        this.$refs[form].validate(async valid => {
          if (valid) {
            let res = await this.$http.post(URL, {
              admin_id: localStorage.id,
              ...this.form
            })
            console.log(res.data)
            if (res.data.status == 'success') {
              this.$message({
                message: this.$t('message.operationSuccessful'),
                type: 'success'
              })
              this.$refs.form.resetFields()
              ;(this.form.name = ''),
                (this.form.oil_sensor_id = ''),
                // (this.form.dvr_channels = '')
              this.showEdit = false
              this.getOilMonitoringEquipment()
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    //选中多行数据
    handleSelectionChange(val) {
      console.log(val)
      val.forEach(item => {
        this.delData.push(item._id)
      })
      console.log(this.delData)
    },
    //删除单个数据
    del(id) {
      let URL = '/v1/device/delete'
      console.log(id)
      let idData = id
      this.$confirm(this.$t('message.deleteData'), this.$t('message.Tooltip'), {
        confirmButtonText: this.$t('message.yes'),
        cancelButtonText: this.$t('message.no'),
        type: 'warning'
      })
        .then(async () => {
          let res = await this.$http.post(URL, {
            _id: [id],
            admin_id: localStorage.id
          })
          console.log(res.data)
          if (res.data.status == 'success') {
            this.$message({
              type: 'success',
              message: this.$t('message.operationSuccessful')
            })
            this.getOilMonitoringEquipment()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    delMore(){
      console.log(this.delData.length)
      if(this.delData.length != 0){  
      let URL = '/v1/device/delete'
       this.$confirm(this.$t('message.deleteData'), this.$t('message.Tooltip'), {
        confirmButtonText: this.$t('message.yes'),
        cancelButtonText: this.$t('message.no'),
        type: 'warning'
      })
        .then(async () => {
          let res = await this.$http.post(URL, {
            _id: this.delData,
            admin_id: localStorage.id
          })
          console.log(res.data)
          if (res.data.status == 'success') {
            this.$message({
              type: 'success',
              message: this.$t('message.operationSuccessful')
            })
            this.getOilMonitoringEquipment()
          }
        })
        .catch(e => {
          console.log(e)
        })
        }else{
          this.$message({
            type: 'warning',
            message: this.$t('message.delMore')
          })
        }
    }
  },
  created() {
    console.log(this.form.status)

    this.getOilMonitoringEquipment()
    localStorage.setItem('id', '5de9ce9a11f7921ed40021f4')
    console.log(localStorage.id)
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t('rules.deviceName'),
            trigger: 'blur'
          }
        ],
        oil_sensor_id: [
          {
            required: true,
            message: this.$t('rules.sensor_id'),
            trigger: 'blur'
          }
        ],
        // dvr_channels: [
        //   {
        //     required: true,
        //     message: this.$t('rules.channelNumber'),
        //     trigger: 'blur'
        //   }
        // ],
        status: [
          {
            required: true,
            message: this.$t('rules.status'),
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.tableHeader {
  display: flex;
  justify-content: space-between;
}
.right {
  display: flex;
  justify-content: space-between;
}
.search {
  margin-right: 10px;
}
.tableInfo {
  margin-top: 20px;
}
.pagination {
  display: flex;
  justify-content: space-between;
  /* text-align: right; */
  margin-top: 20px;
}
.paddingA {
  padding: 9px;
  height: 32px;
}
</style>

<style >
.el-dialog__body {
  padding-bottom: 10px !important;
}
</style>