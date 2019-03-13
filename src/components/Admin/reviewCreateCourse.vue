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
        prop="courseTeacherEmail"
        label="教师邮箱"
        width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlePass(scope.row.courseId, 1, scope.$index, courseData)">审核通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handlePass(scope.row.courseId, -1, scope.$index, courseData)">审核不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNotCheckedCourses, passCourse } from '../../api/course'

export default {
  name: 'reviewCreateCourse',
  mounted: function () {
    let result = getNotCheckedCourses(this)
    result.then(function (res) {
      this.courseData = res.data
      console.log(res)
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    console.log('reviewCreateCourse' + 'mounted')
  },
  methods: {
    init () {
      console.log('reviewCreateCourse' + 'init')
    },
    handlePass (courseId, state, index, data) {
      passCourse(this, courseId, state)
      data.splice(index, 1)
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
