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
export {
  getStatistics,
  getUseStatistics
}
