<template>
  <div>
    <el-table
      :data="semesterData"
      style="width: 100%">
      <el-table-column
        prop="id"
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
      <el-table-column
        prop="classNum"
        label="开课班次"
        width="100">
      </el-table-column>
      <el-table-column
        prop="studentNum"
        label="当前选课人数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="startYear"
        label="开课年份"
        width="100">
      </el-table-column>
      <el-table-column
        prop="startSemester"
        label="开课学期"
        width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="intoCourse(scope.row.id, scope.row.isPassed, scope.row.courseId, scope.row.courseName)">学期课程管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMySemesterCourse, startCourse } from '../../api/semester'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'manageSemester',
  mounted: function () {
    let result = getMySemesterCourse(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.semesterData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    intoCourse (id, status, courseId, name) {
      if (status !== 2) {
        this.$confirm('该课程尚未正式开课，管理课程默认结束选课开始上课，是否确定?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          startCourse(this, id)
          this.$router.push({
            path: '/teacher/manageSemester/detail',
            query: {
              semesterId: id,
              courseId: courseId,
              courseName: name
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消开课'
          })
        })
      } else {
        this.$router.push({
          path: '/teacher/manageSemester/detail',
          query: {
            semesterId: id,
            courseId: courseId,
            courseName: name
          }
        })
      }
    }
  },
  data () {
    return {
      semesterData: []
    }
  }
}
</script>

<style scoped>

</style>
