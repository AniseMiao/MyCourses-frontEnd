function showMsg (that, type, message) {
  that.$message({
    showClose: true,
    type: type, // success/warning/info/error
    message: message
  })
}

export default {
  showMsg
}
