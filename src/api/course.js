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

function createCourse (that, coursename, teacheremail, teachername, courseinfo) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/course/createCourse',
    params: {
      courseName: coursename,
      email: teacheremail,
      username: teachername,
      info: courseinfo
    }
  })
}

function getMyCourses (that, email) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/getMyCourses',
    params: {
      email: email
    }
  })
}

function getAllCourseWares (that, courseId) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/getCourseWare',
    params: {
      courseId: courseId
    }
  })
}

function downloadCourseWare (that, courseId, courseWareName) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/downloadCourseWare',
    params: {
      courseId: courseId,
      fileName: courseWareName
    },
    responseType: 'blob'
  })
}

function deleteCourseWare (that, courseId, courseWareName) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/course/deleteCourseWare',
    params: {
      courseId: courseId,
      courseWareName: courseWareName
    }
  })
}

function getForumData (that, courseId) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/getForumData',
    params: {
      courseId: courseId
    }
  })
}

function getCommentReply (that, commentFatherId) {
  return that.$axios({
    method: 'get',
    url: 'MyCourses/api/v1/course/getCommentReplies',
    params: {
      commentFatherId: commentFatherId
    }
  })
}

function postComment (that, courseId, userEmail, commentTitle, commentContent) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/course/postComment',
    params: {
      courseId: courseId,
      userEmail: userEmail,
      commentTitle: commentTitle,
      commentContent: commentContent
    }
  })
}

function replyComment (that, courseId, commentFatherId, userEmail, commentTitle, commentContent) {
  return that.$axios({
    method: 'post',
    url: 'MyCourses/api/v1/course/replyComment',
    params: {
      courseId: courseId,
      commentFatherId: commentFatherId,
      userEmail: userEmail,
      commentTitle: commentTitle,
      commentContent: commentContent
    }
  })
}

export {
  getNotCheckedCourses,
  passCourse,
  createCourse,
  getMyCourses,
  getAllCourseWares,
  downloadCourseWare,
  deleteCourseWare,
  getForumData,
  getCommentReply,
  postComment,
  replyComment
}
