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
function openSemesterCourse (that, id, courseName, classNum, studentLimit, startYear, startSemester, teacherEmail, teacherName) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/semester/openCourse',
    params: {
      courseId: id,
      courseName: courseName,
      classNum: classNum,
      studentLimit: studentLimit,
      startYear: startYear,
      startSemester: startSemester,
      teacherEmail: teacherEmail,
      teacherName: teacherName
    }
  })
}
function getMySemesterCourse (that, email) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/semester/getMySemesterCourse',
    params: {
      email: email
    }
  })
}
function startCourse (that, semesterId) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/startCourse',
    params: {
      semesterId: semesterId
    }
  })
}
function sendEmails (that, semesterId, emailTitle, emailContent) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/sendEmail',
    params: {
      semesterId: semesterId,
      emailTitle: emailTitle,
      emailContent: emailContent
    }
  })
}
function downloadHomeworks (that, courseId, semesterId, taskId) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/semester/downloadHomeworks',
    params: {
      courseId: courseId,
      semesterId: semesterId,
      taskId: taskId
    },
    responseType: 'blob'
  })
}
function getTasks (that, semesterId) {
  return that.$axios({
    method: 'get',
    url: '/MyCourses/api/v1/semester/getTasks',
    params: {
      semesterId: semesterId
    }
  })
}
function endCourse (that, semesterId) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/endCourse',
    params: {
      semesterId: semesterId
    }
  })
}
function createTask (that, semesterId, taskTitle, taskInfo) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/createTask',
    params: {
      semesterId: semesterId,
      taskTitle: taskTitle,
      taskInfo: taskInfo
    }
  })
}
function uploadScore (that, email, semesterId, taskId, score, isTotal) {
  return that.$axios({
    method: 'post',
    url: '/MyCourses/api/v1/semester/uploadScore',
    params: {
      email: email,
      semesterId: semesterId,
      taskId: taskId,
      score: score,
      isTotal: isTotal
    }
  })
}
export {
  getNotCheckedSemesterCourses,
  passSemesterCourse,
  openSemesterCourse,
  getMySemesterCourse,
  startCourse,
  sendEmails,
  downloadHomeworks,
  getTasks,
  endCourse,
  createTask,
  uploadScore
}
