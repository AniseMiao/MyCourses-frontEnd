import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Message from './lib/Message'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.showMsg = Message.showMsg
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App),
  el: '#app'
})
