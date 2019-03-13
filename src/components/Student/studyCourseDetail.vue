<template>
  <div>
    <span>课程名：{{courseName}}</span>
    <br><br>
    <el-button type="primary" size="small" @click="gotoForum">进入课程论坛</el-button>
    <br><br>
    <span>课件管理</span>
    <br><br>
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
            @click="download(scope.row.courseWareName)">下载课件
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br><br>
    <span>作业管理</span>
    <el-table
      :data="taskData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="作业详情">
              <span>{{ props.row.info }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="作业ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="作业标题"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  @click="downloadHomework(scope.row.id)">下载作业
                </el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-upload
                  action="/MyCourses/api/v1/semester/uploadHomework"
                  :show-file-list="false"
                  :before-upload="addFilename"
                  :on-success="handleSuccess"
                  :data="uploadIndex">
                  <el-button size="mini" type="success" @click="getTaskId(scope.row.id)">上传作业</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { downloadCourseWare, getAllCourseWares } from '../../api/course'
import { downloadMyHomework, getTasks } from '../../api/semester'

export default {
  name: 'courseManageDetail',
  mounted: function () {
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
    let result2 = getTasks(this, this.$route.query.semesterId)
    result2.then(function (res) {
      console.log(res)
      this.taskData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    downloadHomework (id) {
      let result = downloadMyHomework(this, this.$route.query.semesterId, id, this.$route.query.courseId, this.$route.query.userNumber)
      result.then(function (res) {
        console.log(res)
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', this.$route.query.userNumber + '.txt')
        document.body.appendChild(link)
        link.click()
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    },
    addFilename (file) {
      this.uploadIndex.filename = file.name
    },
    handleSuccess (response, file, fileList) {
      this.$router.go(0)
    },
    getTaskId (id) {
      this.uploadIndex.taskId = id
      this.uploadIndex.semesterId = this.$route.query.semesterId
      this.uploadIndex.courseId = this.$route.query.courseId
    },
    gotoForum () {
      this.$router.push({
        path: '/student/studyCourse/detail/forum',
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
    }
  },
  data () {
    return {
      courseId: '',
      courseName: '',
      courseWareData: [],
      fileList: [],
      taskData: [],
      uploadIndex: {
        semesterId: '',
        taskId: '',
        courseId: '',
        filename: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
