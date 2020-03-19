<template>
  <div class="treeCom">
    <el-tree
      ref="tree"
      :data="treeData"
      @node-click="handleNodeClick"
      :show-checkbox="show?true:false"
      node-key="_id"
      default-expand-all
      check-on-click-node
      @check="checkList"
      highlight-current
      :expand-on-click-node="!show?true:false"
    >
      <!-- <template slot-scope="scope">
      <span>{{ treeData.label }}</span>
      </template>-->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- <span v-show="data.gps.is_online">{{ node.label }}</span> -->
        <!-- data.gps?(data.gps.is_online?'color: #3dc5e1':'color: #ccc;'):'' -->
        <i
          class="el-icon-truck iconSize"
          v-show="data.gps"
          :style="(data.gps?(data.gps.is_online?'color: #3dc5e1':'color: #ccc;'):'')"
        ></i>
        <!-- <i class="el-icon-truck iconSize" v-show="wsValue.dvr_id" :style="(wsValue.device_id == data.dvr.dvr_id?'color: #ccc;':'color: #3dc5e1')"></i> -->
        <span class="mySpan">{{ data.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script >
import { mapMutations, mapActions, mapGetters } from 'vuex'
// if(data.gps){data.gps.is_online?'color: #3dc5e1':'color: #ccc;'}
// wsValue.device_id == data.dvr.dvr_id?'color: #3dc5e1'
// wsTreeDatas.dvr_id == data.dvr.dvr_id?'color: #ccc;':(data.gps.is_online?'color: #3dc5e1':'color: #ccc;')
export default {
  name: 'Tree',
  props: {
    // treeData: {
    //   type: Array,
    //   required: true
    // },
    show: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      treeData: []
    }
  },
  methods: {
    //获取树形列表数据
    async getTreeData() {
      let URL = '/v1/oil_truck/tree'

      let res = await this.$http.post(URL, {
        admin_id: localStorage.id
      })
      let { status, data } = res.data
      if (status == 'success') {
        this.treeData = data
      }
      console.log(this.treeData)
    },
    //无多选框的事件
    handleNodeClick(val) {
      // console.log(val)
      if (this.show == false && val.gps) {
        this.$emit('getVideo', val)
      }
    },
    //多选框的选择事件
    checkList() {
      if (this.show == 'position') {
        let res = this.$refs.tree.getCheckedNodes(true)
        // console.log(res)
        this.$emit('getPosition', res)
      } else if (this.show == 'oil') {
        let res = this.$refs.tree.getCheckedNodes(true)
        this.$emit('getOil', res)
      }
    },
    // 根据数据切换树状图样式
    
  },
  mounted() {
 
    this.getTreeData()

  },

  computed: {
    ...mapGetters(['wsTreeDatas', 'wsValue'])
  },
  watch: {
    wsTreeDatas: {
      handler(newValue, oldValue) {
        
        this.treeData.forEach(item => {
          item.children.forEach(ele => {
            if (ele.gps.gps_id == newValue.device_id) {
              ele.gps.is_online = false
            }
          })
        })
      },
      deep: true
    },
    wsValue:{
      handler(newValue,oldValue){
         this.treeData.forEach(item => {
          item.children.forEach(ele => {
            if (ele.gps.gps_id == newValue.device_id) {
              ele.gps.is_online = true
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.treeCom .iconSize {
  margin-right: 4px;
}
.custom-tree-node span {
  font-size: 14px;
}
</style>
<style >
/* #0cb6da */
.video .el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
/* .video
  .el-tree-node__children
  .el-tree-node:focus
  > .el-tree-node__content
  .el-tree-node__label {
  color: #fff;
  background-color: #0cb6da !important;
} */
.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
.el-tree-node:focus > .el-tree-node__content .el-tree-node__label {
  color: #fff;
  background-color: transparent !important;
}
.video
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #fff;
}
/* .video .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content  .el-tree-node__label{
  color: #fff;
  background-color: #0cb6da !important;
} */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #fff;
}

.video .el-tree-node__children .is-current .mySpan {
  background-color: #0cb6da;
  color: #fff;
}

/* el-tree-node is-expanded is-focusable is-checked */
</style>