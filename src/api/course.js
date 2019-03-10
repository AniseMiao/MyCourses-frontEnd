function getNotCheckedCourses (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/course/getNotCheckedCourses'
  })
}
function passCourse (that, courseId, state) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/course/passCourse',
    params: {
      courseId: courseId,
      state: state
    }
  })
}
function createCourse (that, coursename, teacheremail, teachername, courseinfo) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/course/createCourse',
    params: {
      courseName: coursename,
      email: teacheremail,
      username: teachername,
      info: courseinfo
    }
  })
}
function getMyCourses (that, email) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/getMyCourses',
    params: {
      email: email
    }
  })
}
export {
  getNotCheckedCourses,
  passCourse,
  createCourse,
  getMyCourses
}
