function getStatistics (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/getLog'
  })
}
function getUseStatistics (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/showUse'
  })
}
function showTodoForAdmin (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/showTodoForAdmin'
  })
}
export {
  getStatistics,
  getUseStatistics,
  showTodoForAdmin
}
