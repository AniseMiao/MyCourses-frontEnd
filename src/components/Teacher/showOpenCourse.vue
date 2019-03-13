<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="3">
          <el-select v-model="selectOption" placeholder="请选择">
            <el-option label="开课年份" value="1"></el-option>
            <el-option label="开课学期" value="2"></el-option>
            <el-option label="课程名称" value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="21">
          <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <br/>
    <el-table
      :data="openCourseData"
      style="width: 100%">
      <el-table-column
        prop="courseId"
        label="课程编号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="startYear"
        label="开课年份"
        width="80">
      </el-table-column>
      <el-table-column
        prop="startSemester"
        label="开课学期"
        width="80">
      </el-table-column>
      <el-table-column
        prop="isPassed"
        label="课程状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readCookie } from '../../lib/cookie'
import { getSemesterData } from '../../api/statistics'

export default {
  name: 'showOpenCourse',
  mounted: function () {
    let result = getSemesterData(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.rawData = res.data
      this.openCourseData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    search () {
      if (this.input1 !== '') {
        console.log(this.selectOption)
        this.openCourseData = []
        if (this.selectOption === '1') {
          this.rawData.forEach(v => {
            if (!(v.startYear.indexOf(this.input1))) {
              this.openCourseData.push(v)
            }
          })
        } else if (this.selectOption === '2') {
          this.rawData.forEach(v => {
            if (!(v.startSemester.indexOf(this.input1))) {
              this.openCourseData.push(v)
            }
          })
        } else if (this.selectOption === '3') {
          this.rawData.forEach(v => {
            if (!(v.courseName.indexOf(this.input1))) {
              this.openCourseData.push(v)
            }
          })
        } else {
          this.openCourseData = this.rawData
        }
      } else {
        this.openCourseData = this.rawData
      }
    }
  },
  data () {
    return {
      input1: '',
      openCourseData: [],
      rawData: [],
      selectOption: ''
    }
  }
}
</script>

<style scoped>

</style>
