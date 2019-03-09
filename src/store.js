import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topNavState: 'admin',
    leftNavState: 'admin'
  },
  mutations: {
    head (h) {
      this.state.headState = h
    },
    changeNav (state, context) {
      state = context
    }
  },
  actions: {

  }
})
