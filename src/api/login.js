function login (that, username, password) {
  var result = that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/user/login',
    params: {
      email: username,
      password: password
    }
  })
  return result
}
export {
  login
}
