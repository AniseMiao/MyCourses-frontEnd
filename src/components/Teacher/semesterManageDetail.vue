<template>
<div>
  <span>课程名：{{courseName}}</span>
  <br><br>
    <el-button type="primary" size="mini" @click="newHomework">发布作业</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" size="mini" @click="sendEmail">群发邮件</el-button>&nbsp;&nbsp;&nbsp;
      <el-upload
        action="/MyCourses/api/v1/course/uploadCourseWare"
        :before-upload="addFilename"
        :on-success="handleSuccess"
        :data="uploadIndex"
        :file-list="fileList">
    <el-button size="small" type="primary">上传总成绩</el-button>
  </el-upload>&nbsp;&nbsp;&nbsp;
    <el-button type="danger" size="mini" @click="endCourse">结束课程</el-button>
  <br><br>
  <span>作业一览</span>
  <el-table
    :data="taskData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
          <el-form-item label="作业详情">
            <span>{{ props.row.commentContent }}</span>
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
        <el-button
          size="mini"
          type="primary"
          @click="downloadHomeworks(scope.row.id)">下载作业</el-button>
        <el-button
          size="mini"
          type="success"
          @click="uploadScore(scope.row.commentId)">上传成绩</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="群发邮件"
    :visible.sync="sendEmailVisible"
    :before-close="handleClose">
    <el-form :model="sendEmailForm" :rules="sendEmailRules" ref="sendEmailForm" label-width="100px">
      <el-form-item label="邮件标题" prop="emailTitle">
        <el-input v-model="sendEmailForm.emailTitle"></el-input>
      </el-form-item>
      <el-form-item label="邮件内容" prop="emailContent">
        <el-input type="textarea" :rows="2" v-model="sendEmailForm.emailContent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEmail('sendEmailForm')">发送邮件</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import { downloadHomeworks, getTasks, sendEmails } from '../../api/semester'
import { Loading } from 'element-ui'

export default {
  name: 'semesterManageDetail',
  mounted: function () {
    this.courseName = this.$route.query.courseName
    let result = getTasks(this, this.$route.query.semesterId)
    result.then(function (res) {
      console.log(res)
      this.taskData = res.data
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    handleClose (done) {
      this.$confirm('您所做的修改都将丢失，确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    sendEmail () {
      this.sendEmailVisible = true
    },
    submitEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = sendEmails(this, this.$route.query.semesterId, this.sendEmailForm.emailTitle, this.sendEmailForm.emailContent)
          let LoadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.8)', text: '正在发送邮件，请稍等' })
          result.then(function (res) {
            console.log(res)
            this.$alert('群发邮件成功！', '群发邮件成功', {
              confirmButtonText: '确定',
              callback: action => {
                LoadingInstance.close()
                this.$router.go(0)
              }
            })
          }.bind(this))
        } else {
          this.showMsg(this, 'error', '请填写完整的信息')
          return false
        }
      })
    },
    downloadHomeworks (id) {
      let result = downloadHomeworks(this, this.$route.query.courseId, this.$route.query.semesterId, id)
      result.then(function (res) {
        console.log(res)
        // let url = window.URL.createObjectURL(res.data)
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', 'homework.zip')
        document.body.appendChild(link)
        link.click()
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  data () {
    return {
      courseName: '',
      taskData: [],
      sendEmailVisible: false,
      sendEmailForm: {
        emailTitle: '',
        emailContent: ''
      },
      sendEmailRules: {
        emailTitle: [
          { required: true, message: '请输入邮件标题', trigger: 'blur' }
        ],
        emailContent: [
          { required: true, message: '请输入邮件内容', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
