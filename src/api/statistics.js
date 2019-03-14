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

function getSemesterData (that, email) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/showSemesterStatistics',
    params: {
      email: email
    }
  })
}

function getSelectCourseData (that, email) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/statistics/showSelectCourseData',
    params: {
      email: email
    }
  })
}

function showScore (that, email) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/statistics/showScore',
    params: {
      email: email
    }
  })
}

export {
  getStatistics,
  getUseStatistics,
  showTodoForAdmin,
  getSemesterData,
  getSelectCourseData,
  showScore
}
