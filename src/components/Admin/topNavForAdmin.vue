<template>
  <el-col>
    <el-button type="text" icon="el-icon-menu" style="padding-top: 15px;padding-bottom: 0px" @click="goToHomepage">MyCourses
      <p></p>
    </el-button>
  </el-col>
</template>

<script>
export default {
  name: 'topNav',
  methods: {
    goToHomepage () {
      this.$router.push('/adminHomepage')
    }
  },
  data () {
    return {
      username: ''
    }
  }
}
</script>

<style scoped>

</style>
