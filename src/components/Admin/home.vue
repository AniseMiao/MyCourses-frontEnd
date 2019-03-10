<template>
  <div>
    <p>欢迎您，MyCourses主管 {{username}} </p>
    <p>目前共有 <span style="color: red;">{{createCourseNum}}</span> 门课程创建信息等待审批 <el-button @click="checkCreate">立即审批</el-button>
    <p>目前共有 <span style="color: red;">{{openCourseNum}}</span> 门课程开设信息等待审批 <el-button @click="checkOpen">立即审批</el-button>
    <p>系统共有 <span style="color: red;">{{logNum}}</span> 条日志信息 <el-button @click="checkLog">立即查看</el-button></p>
  </div>
</template>

<script>

import { showTodoForAdmin } from '../../api/statistics'
import { getUser } from '../../api/user'
import { readCookie } from '../../lib/cookie'

export default {
  name: 'home',
  mounted: function () {
    let result = showTodoForAdmin(this)
    result.then(function (res) {
      console.log(res)
      this.createCourseNum = res.data[0]
      this.openCourseNum = res.data[1]
      this.logNum = res.data[2]
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    let result2 = getUser(this, readCookie('login'))
    result2.then(function (res) {
      console.log(res)
      this.username = res.data.userName
    }.bind(this)).catch(function (err) {
      console.log(err)
    })
    console.log('mounted')
  },
  methods: {
    checkCreate () {
      this.$router.push('/admin/reviewCreateCourses')
    },
    checkOpen () {
      this.$router.push('/admin/reviewOpenCourses')
    },
    checkLog () {
      this.$router.push('/admin/showLog')
    }
  },
  data () {
    return {
      username: '',
      createCourseNum: 0,
      openCourseNum: 0,
      logNum: 0,
      logData: []
    }
  }
}
</script>

<style scoped>

</style>
