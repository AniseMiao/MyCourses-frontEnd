<template>
  <div class="showuse">
    <div id="chart"></div>
  </div>
</template>

<script>
import { getUseStatistics } from '../../api/statistics'

export default {
  name: 'showUse',
  mounted: function () {
    let result = getUseStatistics(this)
    result.then(function (res) {
      console.log(res)
      this.optionData.xAxis[0].data = res.data.xAxis
      this.optionData.series[0].data = res.data.loginData
      this.optionData.series[1].data = res.data.registryData
      this.$chart.showUseOneWeek('chart', this.optionData)
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('init')
    }
  },
  data () {
    return {
      logData: [],
      rawLogData: [],
      optionData: {
        title: {
          text: '网站使用情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Login', 'Registry']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Login',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: 'Registry',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [
                { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      },
      defaultTime: [new Date() - 3600 * 1000 * 24, new Date()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  }
}
</script>

<style scoped>
  #chart {
    width: 1200px;
    height: 600px;
  }
</style>
