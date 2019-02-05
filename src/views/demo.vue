<template>
    <el-container>
        <el-header>
          <router-view name="top"></router-view>
        </el-header>
      <el-container>
        <el-aside>
          aside
        </el-aside>
        <el-main>
          main
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'demo',
  mounted: function () {
    console.log('mounted' + this.name)
  },
  methods: {
    init () {
      console.log('init')
    }
  }
}
</script>

<style scoped>
  .el-container{
    min-height: 90vh;
  }
  .el-header{
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

</style>
