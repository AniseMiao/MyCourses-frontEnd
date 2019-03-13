<template>
  <div>
    <el-table
      :data="selectCourseData"
      style="width: 100%">
      <el-table-column
        prop="courseId"
        label="课程编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="semesterId"
        label="课程学期ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="email"
        label="选课人邮箱"
        width="400">
      </el-table-column>
      <el-table-column
        prop="isSelected"
        label="是否选中"
        width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readCookie } from '../../lib/cookie'
import { getSelectCourseData } from '../../api/statistics'

export default {
  name: 'showSelectCourse',
  mounted: function () {
    let result = getSelectCourseData(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.selectCourseData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
  },
  data () {
    return {
      selectCourseData: []
    }
  }
}
</script>

<style scoped>

</style>
