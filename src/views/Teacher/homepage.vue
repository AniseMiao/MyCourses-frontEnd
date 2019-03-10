<template>
  <el-container class="container">
    <el-header class="topNavigation">
      <router-view class="topNav" name="topNav"></router-view>
    </el-header>
    <el-container>
      <el-aside class="asideNavigation" width="200px">
        <router-view name="leftNav"></router-view>
      </el-aside>
      <el-main class="teacherHomepageMain">
        <router-view name="main"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'teacherHomepage'
}
</script>

<style scoped>

</style>
