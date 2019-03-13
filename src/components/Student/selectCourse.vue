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
        prop="studentLimit"
        label="限选人数"
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
            @click="select(scope.row.id, scope.row.studentNum, scope.row.studentLimit, scope.row.isPassed)">选课
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPassedCourses, selectCourse } from '../../api/semester'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'selectCourse',
  mounted: function () {
    let result = getPassedCourses(this)
    result.then(function (res) {
      console.log(res)
      this.semesterData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    select (semesterId, num, limit, status) {
      if (num >= limit && status === 2) {
        this.showMsg(this, 'info', '该课人员已满！')
      } else {
        selectCourse(this, readCookie('login'), semesterId)
        this.$alert('选课成功！', '选课成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.go(0)
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
