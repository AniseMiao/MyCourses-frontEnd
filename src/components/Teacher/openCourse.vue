<template>
  <div>
    <el-table
      :data="courseData"
      style="width: 100%">
      <el-table-column
        prop="courseId"
        label="课程号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="isPassed"
        label="是否通过"
        width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="intoCourse(scope.row.courseId, scope.row.isPassed, scope.row.courseName)">开设课程</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMyCourses } from '../../api/course'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'openCourse',
  mounted: function () {
    let result = getMyCourses(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.courseData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    intoCourse (id, status, name) {
      if (status === 0 || status === -1) {
        this.$confirm('该课程尚未审批或审批不通过，不能开设课程！', '系统提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.$router.push({
          path: '/teacher/openCourse/detail',
          query: {
            courseId: id,
            courseName: name
          }
        })
      }
    }
  },
  data () {
    return {
      courseData: []
    }
  }
}
</script>

<style scoped>

</style>
