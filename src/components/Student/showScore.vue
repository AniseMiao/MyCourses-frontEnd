<template>
  <div>
    <el-table
      :data="selectData"
      style="width: 100%">
      <el-table-column
        prop="semesterId"
        label="学期课程号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="taskId"
        label="作业ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readCookie } from '../../lib/cookie'
import { showScore } from '../../api/semester'

export default {
  name: 'showScore',
  mounted: function () {
    let result = showScore(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.selectData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('showSelectCourse' + 'init')
    }
  },
  data () {
    return {
      selectData: []
    }
  }
}
</script>

<style scoped>

</style>
