import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App),
  el: '#app'
})
