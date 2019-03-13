<template>
  <div>
    <el-table
      :data="courseData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="学期课程号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="courseId"
        label="课程号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="studentLimit"
        label="课程容量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="startYear"
        label="年份"
        width="100">
      </el-table-column>
      <el-table-column
        prop="startSemester"
        label="学期"
        width="80">
      </el-table-column>
      <el-table-column
        prop="teacherEmail"
        label="教师邮箱"
        width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlePass(scope.row.id, 1, scope.$index, courseData)">审核通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handlePass(scope.row.id, -1, scope.$index, courseData)">审核不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNotCheckedSemesterCourses, passSemesterCourse } from '../../api/semester'

export default {
  name: 'reviewOpenCourse',
  mounted: function () {
    let result = getNotCheckedSemesterCourses(this)
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
    handlePass (id, state, index, data) {
      passSemesterCourse(this, id, state)
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
