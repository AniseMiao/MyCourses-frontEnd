<template>
    <el-container>
        <el-header>
        </el-header>
        <el-container>
            <el-aside>
            </el-aside>
            <el-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'studentHomepage',
  mounted: function () {
    console.log('mounted' + this.name)
  },
  methods: {
    init () {
      console.log('init')
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
