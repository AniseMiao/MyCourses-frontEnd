function login (that, email, password) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/user/login',
    params: {
      email: email,
      password: password
    }
  })
}
function registry (that, email, password, userType) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/user/registry',
    params: {
      email: email,
      password: password,
      userType: userType
    }
  })
}
function sendVerificationCode (that, email) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/user/sendVerificationCode',
    params: {
      email: email
    }
  })
}
function closeUser (that, email) {
  that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/user/closeUser',
    params: {
      email: email
    }
  })
}
function getUser (that, email) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/user/getUser',
    params: {
      email: email
    }
  })
}
function modifyUser (that, email, username, userNumber) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/user/modifyUser',
    params: {
      email: email,
      username: username,
      userNumber: userNumber
    }
  })
}
export {
  login,
  registry,
  sendVerificationCode,
  closeUser,
  getUser,
  modifyUser
}
