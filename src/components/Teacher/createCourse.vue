<template>
  <div>
    <el-form :model="courseForm" :rules="courseRules" ref="courseForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="courseForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="教师邮箱" prop="teacherEmail">
        <el-input v-model="courseForm.teacherEmail" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名" prop="teacherName">
        <el-input v-model="courseForm.teacherName" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="课程简介" prop="courseInfo">
        <el-input v-model="courseForm.courseInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('courseForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser } from '../../api/user'
import { readCookie } from '../../lib/cookie'
import { createCourse } from '../../api/course'

export default {
  name: 'createCourse',
  mounted: function () {
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
          let result = createCourse(this, this.courseForm.courseName, this.courseForm.teacherEmail, this.courseForm.teacherName, this.courseForm.courseInfo)
          result.then(function (res) {
            console.log(res)
            this.$alert('您的课程创建成功，请等待主管审批', '创建成功', {
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
        courseName: '',
        teacherEmail: '',
        teacherName: '',
        courseInfo: ''
      },
      courseRules: {
        courseName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        courseInfo: [
          { max: 50, message: '简介不得超过50个字符!', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
