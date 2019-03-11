<template>
<div>
  <span>课程名：{{courseName}}</span>
  <br>
  <el-button type="primary" @click="gotoForum">进入课程论坛</el-button>
  <br>
  <span>课件管理</span>
  <el-table
    :data="courseWareData"
    style="width: 100%">
    <el-table-column
      prop="courseWareName"
      label="课件名称">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="download(scope.row.courseWareName)">下载课件</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delete(scope.row.courseWareName)">删除课件</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { downloadCourseWare, deleteCourseWare, getAllCourseWares } from '../../api/course'

export default {
  name: 'courseManageDetail',
  mounted: function () {
    this.init()
    this.courseName = this.$route.query.courseName
    let result = getAllCourseWares(this, this.$route.query.courseId)
    result.then(function (res) {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        this.courseWareData.push({
          courseWareName: res.data[i]
        })
      }
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('courseManageDetail' + 'init')
    },
    gotoForum () {
      this.$router.push({
        path: '/teacher/courseManage/detail/forum',
        query: {
          courseId: this.$route.query.courseId
        }
      })
    },
    download (filename) {
      console.log(filename)
      let result = downloadCourseWare(this, this.$route.query.courseId, filename)
      result.then(function (res) {
        console.log(res)
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      }).catch(function (err) {
        console.log(err)
      })
    },
    delete (filename) {
      this.$confirm('此操作将删除该课件，是否确定?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCourseWare(this, this.$route.query.courseId, filename)
        this.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    }
  },
  data () {
    return {
      courseName: '',
      courseWareData: []
    }
  }
}
</script>

<style scoped>

</style>
