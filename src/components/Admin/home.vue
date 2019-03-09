<template>
  <div>
    <p>欢迎您，MyCourses主管 {{username}} </p>
    <p>目前共有 <span style="color: red;">{{createCourseNum}}</span> 门课程创建信息等待审批 <el-button>立即审批</el-button></p>
    <p>目前共有 <span style="color: red;">{{openCourseNum}}</span> 门课程开设信息等待审批 <el-button>立即审批</el-button></p>
    <p>今日系统共有 <span style="color: red;">{{logNum}}</span> 条日志信息 <el-button>立即查看</el-button></p>
  </div>
</template>

<script>

export default {
  name: 'home',
  mounted: function () {
    console.log('mounted')
  },
  methods: {
    init () {
      console.log('init')
    }
  },
  data () {
    return {
      username: 'Admin',
      createCourseNum: 10,
      openCourseNum: 20,
      logNum: 100,
      logData: []
    }
  }
}
</script>

<style scoped>

</style>
