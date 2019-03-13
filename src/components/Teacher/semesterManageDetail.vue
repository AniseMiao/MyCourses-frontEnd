<template>
  <div>
    <span>课程名：{{courseName}}</span>
    <br><br>
    <el-button type="primary" size="mini" @click="createTaskVisible = true">发布作业</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="primary" size="mini" @click="sendEmailVisible = true">群发邮件</el-button>&nbsp;&nbsp;&nbsp;
    <el-button type="danger" size="mini" @click="endCourse">结束课程</el-button>
    <br><br>
    <el-upload
      action="/MyCourses/api/v1/course/uploadCourseWare"
      :show-file-list="false"
      :data="uploadIndex"
      :before-upload="handleExcel">
      <el-button size="mini" type="primary">上传总成绩</el-button>
    </el-upload>
    <br><br>
    <span>作业一览</span>
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
                  @click="downloadHomeworks(scope.row.id)">下载作业
                </el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-upload
                  action="/MyCourses/api/v1/course/uploadCourseWare"
                  :show-file-list="false"
                  :data="uploadIndex"
                  :before-upload="handleExcel">
                  <el-button size="mini" type="success" @click="getTaskId(scope.row.id, 0)">上传成绩</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>
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
    <el-dialog
      title="发布作业"
      :visible.sync="createTaskVisible"
      :before-close="handleClose">
      <el-form :model="createTaskForm" :rules="createTaskRules" ref="createTaskForm" label-width="100px">
        <el-form-item label="作业标题" prop="taskTitle">
          <el-input v-model="createTaskForm.taskTitle"></el-input>
        </el-form-item>
        <el-form-item label="作业内容" prop="taskInfo">
          <el-input type="textarea" :rows="2" v-model="createTaskForm.taskInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTask('createTaskForm')">发布作业</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { downloadHomeworks, getTasks, sendEmails, endCourse, createTask, uploadScore } from '../../api/semester'
import { Loading } from 'element-ui'
import XLSX from 'xlsx'

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
    getTaskId (id, isTotal) {
      this.taskId = id
      this.isTotal = isTotal
    },
    async handleExcel (file) {
      let fileList = []
      fileList.push(file)
      console.log(this.taskId)
      console.log(this.isTotal)
      await this.readExcel(fileList)
      this.uploadIndex.courseId = this.$route.query.courseId
      this.uploadIndex.filename = file.name
      this.$confirm('是否要公开成绩？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '成绩公开成功'
        })
        return true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '成绩不会公开'
        })
        return false
      })
    },
    readExcel (e) { // 表格导入
      let that = this
      const files = e
      console.log(files)
      const fileReader = new FileReader()
      fileReader.onload = async (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]// 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
          console.log(ws)
          that.excelData = []// 清空接收数据
          for (let i = 0; i < ws.length; i++) {
            console.log(ws[i])
            let sheetData = {
              studentNumber: ws[i].number,
              score: ws[i].score
            }
            that.excelData.push(sheetData)
          }
          console.log(that.excelData)
          let j = 0
          for (j = 0; j < that.excelData.length; j++) {
            await uploadScore(that, that.excelData[j].studentNumber + '@smail.nju.edu.cn', that.$route.query.semesterId, that.taskId, that.excelData[j].score, that.isTotal)
          }
          if (j === that.excelData.length) {
            that.taskId = 0
            that.isTotal = 1
          }
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    submitEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = sendEmails(this, this.$route.query.semesterId, this.sendEmailForm.emailTitle, this.sendEmailForm.emailContent)
          let LoadingInstance = Loading.service({
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.8)',
            text: '正在发送邮件，请稍等'
          })
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
    submitTask (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = createTask(this, this.$route.query.semesterId, this.createTaskForm.taskTitle, this.createTaskForm.taskInfo)
          result.then(function (res) {
            console.log(res)
            this.$alert('作业布置成功！', '作业布置成功', {
              confirmButtonText: '确定',
              callback: action => {
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
    },
    endCourse () {
      this.$confirm('结课之后课程将不再允许学生加入，是否确定?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        endCourse(this, this.$route.query.semesterId)
        this.$message({
          type: 'info',
          message: '课程已结课'
        })
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
      uploadIndex: {
        courseId: '',
        filename: ''
      },
      taskId: 0,
      isTotal: 1,
      taskData: [],
      excelData: [],
      createTaskVisible: false,
      createTaskForm: {
        taskTitle: '',
        taskInfo: ''
      },
      createTaskRules: {
        taskTitle: [
          { required: true, message: '请输入作业标题', trigger: 'blur' }
        ],
        taskInfo: [
          { required: true, message: '请输入作业内容', trigger: 'blur' }
        ]
      },
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
