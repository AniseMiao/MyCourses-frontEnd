function getNotCheckedCourses (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/course/getNotCheckedCourses'
  })
}
export {
  getNotCheckedCourses
}
