<template>
  <div>  <el-row v-show="$store.state.topNavState==='adminHome'">
    <el-col :span="3">
      <el-button type="text" icon="el-icon-menu" style="padding-top: 15px;padding-bottom: 0px; padding-left: 15px" @click="goToHomepage">
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
          <el-menu-item index="temp">建课审核
            <el-badge class="mark" :value="createCourseNum"/>
          </el-menu-item>
          <el-menu-item index="temp">开课审核
            <el-badge class="mark" :value="openCourseNum"/>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">统计信息</template>
          <el-menu-item index="2-1">查看教师信息</el-menu-item>
          <el-menu-item index="2-2">查看学生信息</el-menu-item>
          <el-menu-item index="2-3">查看站点使用情况</el-menu-item>
          <el-menu-item index="2-4">查看系统日志</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="1">
      <el-dropdown trigger="click">
        <el-button type="text" icon="el-icon-setting" style="padding-top: 20px;padding-bottom: 0px;">{{username}}</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
    <el-row v-show="$store.state.topNavState === 'adminOne'">
    </el-row></div>

</template>

<script>
import { getNotCheckedCourses } from '../api/course'
export default {
  name: 'topNav',
  mounted: function () {
    getNotCheckedCourses()
  },
  methods: {
    goToHomepage () {
      this.$router.push({
        url: '/adminHomepage',
        params: {
          username: this.username
        }
      })
    }
  },
  data () {
    return {
      username: 'admin',
      createCourseNum: 10,
      openCourseNum: 20
    }
  }
}
</script>

<style scoped>

</style>
