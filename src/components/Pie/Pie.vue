<template>
  <div class="pieCon">
    <div :id="id" :data="data"></div>
  </div>
</template>

<script >
let echarts = require('echarts/lib/echarts')
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Pie',
  props: {
    id: {
      type: String
    },
    data:{
      type: Number
    }
  },
  data() {
    return {}
  },
  watch:{
    data:{
      handler(newValue,oldValue){
        this.drawChart(this.id,newValue)
      }
    },
  },
  methods: {
    drawChart(id,data) {
      var that = this
      let myChart = echarts.init(document.getElementById(id))
      if(id == "pie1" ){
        var tName = "车辆"
        var tColor = '#00ccff'
      }else if(id == "pie2"){
        var tName = "在线"
        var tColor = '#66ffff'
      }else if(id == "pie3"){
        var tName = "异常"
        var tColor = '#f90'
      }
   
      let option = {
        title: {
         
          text: data, //该学校班牌总数量
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 700,
          
          },
          subtext: tName, //在线班牌数量
          subtextStyle: {
            //副标题文本样式
            // color:'#F26300',
            color: '#fff',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          itemGap: 2,
          x: 'center',
          y: '35%'
        },
        tooltip: {
          //鼠标移上去的显示
            trigger: 'item',
            position:'center'
        },

        color: [tColor], //环形图颜色样式修改
        series: [
          {
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: data, name: (tName) }
              //   {
              //     value:
              //       this.classBrandList[i].total -
              //       this.classBrandList[i].isOnLine,
              //     name: '关机'
              //   }
            ]
          }
        ]
      }

      myChart.setOption(option)
    }
  },
  created() {
      this.$nextTick(()=>{
    this.drawChart(this.id,this.data)

      })
  }
}
</script>

<style scoped>
div{
    width: 100%;
    height: 100%;
}
</style>
