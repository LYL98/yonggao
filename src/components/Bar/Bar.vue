<template>
  <div class="bar">
    <div :id="id" :data="data" :ref="id"></div>
  </div>
</template>

<script >
import { mapMutations, mapActions, mapGetters } from 'vuex'

let echarts1 = require('echarts/lib/echarts')
// 引入柱形图组件
require('echarts/lib/chart/bar')
//引入折线组件
require('echarts/lib/chart/line')

// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'Bar',
  props: {
    id: {
      type: String
    },
    data: {
      type: Object
    }
  },
  data() {
    return {}
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.drawBar(this.id, newValue)
      },
      deep: true
    },
    wsValue: {
      handler(newValue, oldValue) {
        console.log(newValue.device_id == this.data.oil_log[0].device_id)
        if (newValue.device_id == this.data.oil_log[0].device_id) {
          this.data.oil_log.push(newValue)
        }
      }
    }
  },
  methods: {
    drawBar(id, data) {
      var xData = this.data.oil_log.map(item => {
        return item.time
      })

      var yData = this.data.oil_log.map(item => {
        return item.weight
      })
      let myChart = echarts1.init(document.getElementById(id))

      let option = {
        title: {
          text: data.plate_no,
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#333',
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 'dataMin',
            name: '载重',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: '载重',
            type: 'bar',
            barWidth: '60%',
            data: yData
          }
        ],
        dataZoom: {
          show: true,
          start: 0,
          end: 100,
          startValue: xData[0],
          endValue: xData[xData.length - 4]
        }
      }
      myChart.setOption(option)
    }
  },
  mounted() {
    // this.$nextTick(()=>{
    console.log(this.data)

    this.drawBar(this.id, this.data)

    // })
  },
  computed: {
    ...mapGetters(['wsValue'])
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>