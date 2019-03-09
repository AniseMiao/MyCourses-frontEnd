function getNotCheckedSemesterCourses (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/semester/getNotCheckedCourses'
  })
}
function passSemesterCourse (that, id, state) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/passCourse',
    params: {
      id: id,
      state: state
    }
  })
}
export {
  getNotCheckedSemesterCourses,
  passSemesterCourse
}
