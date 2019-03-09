function getNotCheckedSemesterCourses (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/semester/getNotCheckedCourses'
  })
}
export {
  getNotCheckedSemesterCourses
}
