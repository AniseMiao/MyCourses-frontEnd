function getStatistics (that) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/getLog'
  })
}
export {
  getStatistics
}
