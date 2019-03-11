<template>
  <div>
    <el-form :model="courseForm" :rules="courseRules" ref="courseForm" label-width="100px">
      <el-form-item label="课程id" prop="courseId">
        <el-input v-model="courseForm.courseId" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="courseForm.courseName" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="教师邮箱" prop="teacherEmail">
        <el-input v-model="courseForm.teacherEmail" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名" prop="teacherName">
        <el-input v-model="courseForm.teacherName" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="班级个数" prop="classNum">
        <el-input v-model.number="courseForm.classNum"></el-input>
      </el-form-item>
      <el-form-item label="限选人数" prop="studentLimit">
        <el-input v-model.number="courseForm.studentLimit"></el-input>
      </el-form-item>
      <el-form-item label="开课年份" prop="studentLimit">
        <el-input v-model.number="courseForm.startYear"></el-input>
      </el-form-item>
      <el-form-item label="开课学期" prop="studentLimit">
        <el-input v-model.number="courseForm.startSemester"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('courseForm')">立即开设</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser } from '../../api/user'
import { readCookie } from '../../lib/cookie'
import { openSemesterCourse } from '../../api/semester'

export default {
  name: 'openCourseDetail',
  mounted: function () {
    this.courseForm.courseId = this.$route.query.courseId
    this.courseForm.courseName = this.$route.query.courseName
    let result = getUser(this, readCookie('login'))
    result.then(function (res) {
      console.log(res)
      this.courseForm.teacherEmail = res.data.userEmail
      this.courseForm.teacherName = res.data.userName
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    init () {
      console.log('createCourse' + 'init')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result = openSemesterCourse(this, this.courseForm.courseId, this.courseForm.courseName, this.courseForm.classNum, this.courseForm.studentLimit, this.courseForm.startYear, this.courseForm.startSemester, this.courseForm.teacherEmail, this.courseForm.teacherName)
          result.then(function (res) {
            console.log(res)
            this.$alert('您的课程开设成功，请等待主管审批', '开设成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/teacher/homepage')
              }
            })
          }.bind(this))
        } else {
          this.showMsg(this, 'error', '请填写完整的信息')
          return false
        }
      })
    }
  },
  data () {
    return {
      courseForm: {
        courseId: '',
        courseName: '',
        teacherEmail: '',
        teacherName: '',
        classNum: 0,
        studentLimit: 0,
        startYear: 2019,
        startSemester: 1
      },
      courseRules: {
        classNum: [
          { required: true, message: '班次不得为空', trigger: 'blur' },
          { type: 'number', message: '班次必须为数字', trigger: 'blur' }
        ],
        studentLimit: [
          { required: true, message: '限选人数不得为空', trigger: 'blur' },
          { type: 'number', message: '限选人数必须为数字', trigger: 'blur' }
        ],
        startYear: [
          { required: true, message: '开课年份不得为空', trigger: 'blur' },
          { type: 'number', message: '开课年份必须为数字', trigger: 'blur' }
        ],
        startSemester: [
          { required: true, message: '开课学期不得为空', trigger: 'blur' },
          { type: 'number', message: '开课学期必须为数字', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
