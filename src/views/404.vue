<template>
  <div class="error">
    <img src="../assets/404.gif">
    <h2 style="text-align: center">啊哦…<br/></h2>
    <strong>你似乎来到了知识的荒原...</strong>
    <p style="color: grey">来源链接是否正确？课程是否存在？</p>
    <p>
      <el-button type="text" @click="returnToTheHomePage">返回首页</el-button>
      &nbsp;
      <el-button type="text" @click="returnToThePreviousPage">返回上页</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Not-Found',
  methods: {
    returnToThePreviousPage () {
      this.$router.go(-1)
    },
    returnToTheHomePage () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .error {
    text-align: center;
    width: 500px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
</style>
