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
export {
  getNotCheckedCourses,
  passCourse
}
