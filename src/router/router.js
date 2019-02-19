import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import NotFound from '../views/404'
import AdminHomepage from '../views/Admin/homepage'
import HomepageMainAdmin from '../components/Admin/home'
import TopNavAdmin from '../components/Admin/topNavForAdmin'
import LeftNavAdmin from '../components/Admin/leftNavForAdmin'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/adminHomepage',
    name: 'adminHomepage',
    component: AdminHomepage,
    children: [{
      path: '',
      components: {
        topNav: TopNavAdmin,
        leftNav: LeftNavAdmin,
        main: HomepageMainAdmin
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
