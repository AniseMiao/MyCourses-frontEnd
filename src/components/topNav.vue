<template>
  <div>
    <el-row v-show="userType === 'Admin'">
      <el-col :span="3">
        <el-button type="text" icon="el-icon-menu" style="padding-top: 15px;padding-bottom: 0px; padding-left: 15px"
                   @click="goToHomepage">
          MyCourses
          <p></p>
        </el-button>
      </el-col>
      <el-col :span="19">
        <el-menu
          mode="horizontal"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">课程管理</template>
            <el-menu-item index="/admin/reviewCreateCourses">建课审核</el-menu-item>
            <el-menu-item index="/admin/reviewOpenCourses">开课审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">统计信息</template>
            <el-menu-item index="/admin/showTeachers">查看教师信息</el-menu-item>
            <el-menu-item index="/admin/showStudents">查看学生信息</el-menu-item>
            <el-menu-item index="/admin/showUse">查看站点使用情况</el-menu-item>
            <el-menu-item index="/admin/showLog">查看系统日志</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="1">
        <el-dropdown>
          <el-button type="text" icon="el-icon-setting" style="padding-top: 20px;padding-bottom: 0px;">{{username}}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showProfile">个人资料</el-dropdown-item>
            <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row v-show="userType === 'Student'">
      <el-col :span="3">
        <el-button type="text" icon="el-icon-menu" style="padding-top: 15px;padding-bottom: 0px; padding-left: 15px"
                   @click="goToHomepage">
          MyCourses
          <p></p>
        </el-button>
      </el-col>
      <el-col :span="19">
        <el-menu
          mode="horizontal"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">课程管理</template>
            <el-menu-item index="/student/selectCourse">学期选课</el-menu-item>
            <el-menu-item index="/student/quitCourse">退出课程</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">课程学习</template>
            <el-menu-item index="/student/studyCourse">课程学习</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">统计信息</template>
            <el-menu-item index="/student/showSelectCourse">查看选退课信息</el-menu-item>
            <el-menu-item index="/student/showScore">查看成绩信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="1">
        <el-dropdown>
          <el-button type="text" icon="el-icon-setting" style="padding-top: 20px;padding-bottom: 0px;">{{username}}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showProfile">个人资料</el-dropdown-item>
            <el-dropdown-item @click.native="deleteUser">注销账户</el-dropdown-item>
            <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row v-show="userType === 'Teacher'">
      <el-col :span="3">
        <el-button type="text" icon="el-icon-menu" style="padding-top: 15px;padding-bottom: 0px; padding-left: 15px"
                   @click="goToHomepage">
          MyCourses
          <p></p>
        </el-button>
      </el-col>
      <el-col :span="19">
        <el-menu
          mode="horizontal"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">课程管理</template>
            <el-menu-item index="/teacher/createCourse">创建课程</el-menu-item>
            <el-menu-item index="/teacher/manageCourse">课程管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">学期管理</template>
            <el-menu-item index="/teacher/openCourse">开设课程</el-menu-item>
            <el-menu-item index="/teacher/manageSemester">学期管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">统计信息</template>
            <el-menu-item index="/teacher/showOpenCourse">查看开课信息</el-menu-item>
            <el-menu-item index="/teacher/showSelectCourse">查看选课信息</el-menu-item>
            <el-menu-item index="/teacher/showScore">查看成绩信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="1">
        <el-dropdown>
          <el-button type="text" icon="el-icon-setting" style="padding-top: 20px;padding-bottom: 0px;">{{username}}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showProfile">个人资料</el-dropdown-item>
            <el-dropdown-item @click.native="deleteUser">注销账户</el-dropdown-item>
            <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-dialog
      title="个人信息"
      :visible.sync="profileVisible"
      width="30%">
      <span>邮箱: <el-input v-model="userEmail" :readonly="true"></el-input></span>
      <span>密码: <el-input show-password v-model="userPassword" :readonly="true"></el-input></span>
      <span>用户名: <el-input v-model="username"></el-input></span>
      <span>学号/工号: <el-input v-model="userNumber"></el-input></span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitProfile">确 定</el-button>
    <el-button type="primary" @click="profileVisible = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { readCookie, eraseCookie } from '../lib/cookie'
import { closeUser, getUser, modifyUser } from '../api/user'

export default {
  name: 'topNav',
  mounted: function () {
    let profileData = getUser(this, readCookie('login'))
    profileData.then(function (res) {
      console.log(res)
      this.userEmail = res.data.userEmail
      this.username = res.data.userName
      this.userNumber = res.data.userNumber
      this.userPassword = res.data.userPassword
      this.userType = res.data.userType
      if (this.username === '' || this.username === null || this.userNumber === '' || this.userNumber === null) {
        this.profileVisible = true
      }
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    goToHomepage () {
      this.$router.push('/')
    },
    logout () {
      eraseCookie('login')
      eraseCookie('type')
      this.$router.push('/')
    },
    submitProfile () {
      let result = modifyUser(this, this.userEmail, this.username, this.userNumber)
      result.then(function (res) {
        console.log(res)
        this.profileVisible = false
      }.bind(this)).catch(function (err) {
        console.log(err)
        this.$confirm('您必须正确填写您的用户名和学号/工号方可继续', '系统提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }.bind(this))
    },
    deleteUser () {
      this.$confirm('此操作将注销您的账户, 今后无法使用，除非用同一邮箱再次注册，是否确定?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeUser(this, this.userEmail)
        this.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    },
    showProfile () {
      this.profileVisible = true
    }
  },
  data () {
    return {
      username: '',
      userEmail: '',
      userPassword: '',
      userNumber: '',
      userType: '',
      profileVisible: false
    }
  }
}
</script>

<style scoped>

</style>
