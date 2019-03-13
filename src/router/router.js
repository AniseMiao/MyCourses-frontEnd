/* eslint-disable eqeqeq */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import NotFound from '../views/404'
import AdminHomepage from '../views/Admin/homepage'
import HomepageMainAdmin from '../components/Admin/home'
import ShowLog from '../components/Admin/showLog'
import ShowUse from '../components/Admin/showUse'
import ShowStudents from '../components/Admin/showStudent'
import ShowTeachers from '../components/Admin/showTeacher'
import ReviewCreateCourses from '../components/Admin/reviewCreateCourse'
import ReviewOpenCourses from '../components/Admin/reviewOpenCourse'
import TeacherHomepage from '../views/Teacher/homepage'
import HomepageMainTeacher from '../components/Teacher/home'
import CreateCourse from '../components/Teacher/createCourse'
import ManageCourse from '../components/Teacher/courseManage'
import ManageCourseDetail from '../components/Teacher/courseManageDetail'
import CourseForum from '../components/Teacher/courseForum'
import OpenCourse from '../components/Teacher/openCourse'
import OpenCourseDetail from '../components/Teacher/openCourseDetail'
import ManageSemester from '../components/Teacher/manageSemester'
import ManageSemesterDetail from '../components/Teacher/semesterManageDetail'
import ShowOpenCourse from '../components/Teacher/showOpenCourse'
import showSelectCourse from '../components/Teacher/showSelectCourse'
import ShowScore from '../components/Teacher/showScore'
import StudentHomepage from '../views/Student/homepage'
import HomepageMainStudent from '../components/Student/home'
import SelectCourse from '../components/Student/selectCourse'
import QuitCourse from '../components/Student/quitCourse'
import StudyCourse from '../components/Student/studyCourse'
import StudyCourseDetail from '../components/Student/studyCourseDetail'
import StudentForum from '../components/Student/courseForum'
import TopNav from '../components/topNav'
import LeftNav from '../components/leftNav'
import { eraseCookie, readCookie } from '../lib/cookie'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/Homepage',
    name: 'adminHomepage',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: HomepageMainAdmin
      }
    }]
  },
  {
    path: '/admin/showLog',
    name: 'adminShowLog',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowLog
      }
    }]
  },
  {
    path: '/admin/showUse',
    name: 'adminShowUse',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowUse
      }
    }]
  },
  {
    path: '/admin/showStudents',
    name: 'adminShowStudents',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowStudents
      }
    }]
  },
  {
    path: '/admin/showTeachers',
    name: 'adminShowTeachers',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowTeachers
      }
    }]
  },
  {
    path: '/admin/reviewCreateCourses',
    name: 'adminReviewCreateCourses',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ReviewCreateCourses
      }
    }]
  },
  {
    path: '/admin/reviewOpenCourses',
    name: 'adminReviewOpenCourses',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ReviewOpenCourses
      }
    }]
  },
  {
    path: '/teacher/homepage',
    name: 'teacherHomepage',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: HomepageMainTeacher
      }
    }]
  },
  {
    path: '/teacher/createCourse',
    name: 'teacherCreateCourse',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: CreateCourse
      }
    }]
  },
  {
    path: '/teacher/manageCourse',
    name: 'teacherManageCourse',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ManageCourse
      }
    }]
  },
  {
    path: '/teacher/manageCourse/detail',
    name: 'teacherManageCourseDetail',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ManageCourseDetail
      }
    }]
  },
  {
    path: '/teacher/manageCourse/detail/forum',
    name: 'teacherManageCourseForum',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: CourseForum
      }
    }]
  },
  {
    path: '/teacher/openCourse',
    name: 'teacherOpenCourse',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: OpenCourse
      }
    }]
  },
  {
    path: '/teacher/openCourse/detail',
    name: 'teacherOpenCourseDetail',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: OpenCourseDetail
      }
    }]
  },
  {
    path: '/teacher/manageSemester',
    name: 'teacherManageSemester',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ManageSemester
      }
    }]
  },
  {
    path: '/teacher/manageSemester/detail',
    name: 'teacherManageSemesterDetail',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ManageSemesterDetail
      }
    }]
  },
  {
    path: '/teacher/showOpenCourse',
    name: 'teacherShowOpenCourse',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowOpenCourse
      }
    }]
  },
  {
    path: '/teacher/showSelectCourse',
    name: 'teacherShowSelectCourse',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: showSelectCourse
      }
    }]
  },
  {
    path: '/teacher/showScore',
    name: 'teacherShowScore',
    component: TeacherHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: ShowScore
      }
    }]
  },
  {
    path: '/student/homepage',
    name: 'studentHomepage',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: HomepageMainStudent
      }
    }]
  },
  {
    path: '/student/selectCourse',
    name: 'studentSelectCourse',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: SelectCourse
      }
    }]
  },
  {
    path: '/student/quitCourse',
    name: 'studentQuitCourse',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: QuitCourse
      }
    }]
  },
  {
    path: '/student/studyCourse',
    name: 'studentStudyCourse',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: StudyCourse
      }
    }]
  },
  {
    path: '/student/studyCourse/detail',
    name: 'studentStudyCourseDetail',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: StudyCourseDetail
      }
    }]
  },
  {
    path: '/student/studyCourse/detail/forum',
    name: 'studentCourseForum',
    component: StudentHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNav,
        leftNav: LeftNav,
        main: StudentForum
      }
    }]
  },
  {
    path: '*',
    name: '404 Not Found',
    component: NotFound
  }
]

const router = new Router({
  routes: routes
})

export default router
router.beforeEach((route, redirect, next) => {
  if (route.path === '/admin/logout' || route.path === '/student/logout' || route.path === '/teacher/logout') {
    eraseCookie('login')
    eraseCookie('type')
    next('/')
  } else if (route.path === '/' && readCookie('login') !== null && readCookie('type') == 3) {
    next('/admin/homepage')
  } else if (route.path === '/' && readCookie('login') !== null && readCookie('type') == 2) {
    next('/teacher/homepage')
  } else if (route.path === '/' && readCookie('login') !== null && readCookie('type') == 1) {
    next('/student/homepage')
  } else {
    next()
  }
})
/**
router.beforeEach((route, redirect, next) => {
  // 如果没有登录，跳转至登录页面
  if (route.path !== '/' && !_global.getCookieForRouter('username') && route.name !== '404 Not Found') {
    _global.setCookieForRouter('notLogin', 'true', 1000 * 60 * 60 * 24 * 15)
    next({ path: '/', query: { redirect: route.fullPath } })
    // go(0)原地刷新可以解决mounted不执行的问题
    router.go(0)
  } else {
    next()
  }
  // 如果已经登陆成功，那么跳转至主页
  if (route.path === '/' && _global.getCookieForRouter('username')) {
    let userTypeForRouter = _global.getCookieForRouter('userType')
    let userNameForRouter = _global.getCookieForRouter('username')
    if (userTypeForRouter === 'user') {
      next({ path: '/Homepage', query: { username: userNameForRouter } })
    } else if (userTypeForRouter === 'admin') {
      next({ path: '/AdminBackground', query: { username: userNameForRouter } })
    } else {
      next()
    }
  }
})
**/
