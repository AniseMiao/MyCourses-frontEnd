<template>
<div>
  <div>
    <el-date-picker
      v-model="defaultTime"
      type="daterange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-button type="primary" @click="search">查询</el-button>
  </div>
  <br/>
  <el-table
    :data="logData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="90">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="300">
    </el-table-column>
    <el-table-column
      prop="action"
      label="行为"
      width="180">
    </el-table-column>
    <el-table-column
      prop="additionalInfo"
      label="备注"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getStatistics } from '../../api/statistics'
export default {
  name: 'showLog',
  mounted: function () {
    let result = getStatistics(this)
    result.then(function (res) {
      console.log(res)
      this.rawLogData = res.data
      this.rawLogData.forEach(v => {
        let startTime = new Date(this.defaultTime[0])
        let endTime = new Date(this.defaultTime[1])
        let vtime = new Date(v.time)
        if (vtime >= startTime && new Date(v.time) <= endTime) {
          this.logData.push(v)
        }
      })
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    console.log('mounted' + this.name)
  },
  methods: {
    init () {
      console.log('init')
    },
    search () {
      this.logData = []
      this.rawLogData.forEach(v => {
        let startTime = new Date(this.defaultTime[0])
        let endTime = new Date(this.defaultTime[1])
        let vtime = new Date(v.time)
        if (vtime >= startTime && new Date(v.time) <= endTime) {
          this.logData.push(v)
        }
      })
    }
  },
  data () {
    return {
      logData: [],
      rawLogData: [],
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

</style>
