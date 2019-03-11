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
export {
  getNotCheckedSemesterCourses,
  passSemesterCourse,
  openSemesterCourse
}
