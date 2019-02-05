import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../views/demo.vue'
import Login from '../views/login'
import Dialog from '../components/dia'

Vue.use(Router)
const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/',
    name: 'login',
    components: {
      default: Login,
      dia: Dialog
    }
  },
  {
    path: '*',
    name: '404 Not Found',
    component: Login
  }
]

const router = new Router({
  routes: routes
})

export default router
