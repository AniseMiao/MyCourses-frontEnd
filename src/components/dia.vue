<template>
  <el-dialog
    title="课程信息"
    :visible.sync="dialogVisible"
    width="50%">
      <span>
        这是一段信息
      </span>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'dia',
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
