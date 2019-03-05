import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topNavState: 'adminHome',
    leftNavState: 'adminHome'
  },
  mutations: {
    head (h) {
      this.state.headState = h
    }
  },
  actions: {

  }
})
