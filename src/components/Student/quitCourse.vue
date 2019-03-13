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
            type="danger"
            @click="select(scope.row.id)">退课
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSelectedCourses, quitCourse } from '../../api/semester'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'quitCourse',
  mounted: function () {
    let result = getSelectedCourses(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.semesterData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    select (id) {
      quitCourse(this, id)
      this.$alert('退课成功！', '退课成功', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.go(0)
        }
      })
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
