import echarts from 'echarts'

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get () {
        return {
          showUseOneWeek: function (id, optionData) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()
            this.chart.setOption(optionData)
          }
        }
      }
    }
  })
}

export default {
  install
}
