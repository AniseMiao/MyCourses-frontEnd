// 引入外部库
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
// 引入样式表
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
// 引入内部全局方法
import Message from './lib/Message'
import { createCookie, readCookie, eraseCookie } from './lib/cookie'
import myCharts from './lib/echarts'

Vue.use(ElementUI)
Vue.use(myCharts)

// 注册全局方法别名
Vue.prototype.$axios = axios
Vue.prototype.showMsg = Message.showMsg
Vue.prototype.setCookie = createCookie
Vue.prototype.getCookie = readCookie
Vue.prototype.deleteCookie = eraseCookie

Vue.config.productionTip = true

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App),
  el: '#app'
})
