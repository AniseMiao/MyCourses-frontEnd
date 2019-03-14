<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="3">
          <el-select v-model="selectOption" placeholder="请选择">
            <el-option label="开课学期" value="1"></el-option>
            <el-option label="课程名称" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="21">
          <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="selectData"
      style="width: 100%">
      <el-table-column
        prop="semesterId"
        label="学期课程号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="courseId"
        label="课程号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="isSelected"
        label="选退课情况"
        width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { readCookie } from '../../lib/cookie'
import { showSelectCourseData } from '../../api/semester'

export default {
  name: 'showSelectCourse',
  mounted: function () {
    let result = showSelectCourseData(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.selectData = res.data
      this.rawData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('showSelectCourse' + 'init')
    },
    search () {
      if (this.input1 !== '') {
        this.selectData = []
        if (this.selectOption === '1') {
          this.rawData.forEach(v => {
            if (!(v.semesterId.toString().indexOf(this.input1))) {
              this.selectData.push(v)
            }
          })
        } else if (this.selectOption === '2') {
          this.rawData.forEach(v => {
            if (!(v.courseName.indexOf(this.input1))) {
              this.selectData.push(v)
            }
          })
        } else {
          this.selectData = this.rawData
        }
      } else {
        this.selectData = this.rawData
      }
    }
  },
  data () {
    return {
      rawData: [],
      selectData: [],
      input1: '',
      selectOption: ''
    }
  }
}
</script>

<style scoped>

</style>
