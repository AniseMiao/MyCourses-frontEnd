<template>
  <div>
    <el-table
      :data="scoreData"
      style="width: 100%">
      <el-table-column
        prop="email"
        label="学生邮箱"
        width="400">
      </el-table-column>
      <el-table-column
        prop="semesterId"
        label="课程学期ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="taskId"
        label="作业序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="score"
        label="成绩">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readCookie } from '../../lib/cookie'
import { showScore } from '../../api/statistics'

export default {
  name: 'showScore',
  mounted: function () {
    let result = showScore(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.scoreData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
  },
  data () {
    return {
      scoreData: []
    }
  }
}
</script>

<style scoped>

</style>
