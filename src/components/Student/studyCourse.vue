<template>
<div>
  <el-table
    :data="semesterData"
    style="width: 100%">
    <el-table-column
      prop="semesterId"
      label="学期课程号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="courseId"
      label="课程号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名"
      width="200">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="intoCourse(scope.row.semesterId, scope.row.courseId, scope.row.courseName)">课程学习
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getSelectedCourses } from '../../api/semester'
import { readCookie } from '../../lib/cookie'
import { getUser } from '../../api/user'

export default {
  name: 'studyCourse',
  mounted: function () {
    let result = getSelectedCourses(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.semesterData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    let result2 = getUser(this, readCookie('login'))
    result2.then(function (res) {
      console.log(res)
      this.userNumber = res.data.userNumber
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    intoCourse (id, courseId, name) {
      this.$router.push({
        path: '/student/studyCourse/detail',
        query: {
          semesterId: id,
          courseId: courseId,
          courseName: name,
          userNumber: this.userNumber
        }
      })
    }
  },
  data () {
    return {
      semesterData: [],
      userNumber: ''
    }
  }
}
</script>

<style scoped>

</style>
