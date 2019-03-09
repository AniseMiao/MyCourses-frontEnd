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
import TopNav from '../components/topNav'
import LeftNav from '../components/leftNav'
import { eraseCookie } from '../lib/cookie'

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
