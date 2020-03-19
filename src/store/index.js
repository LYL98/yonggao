import Vue from 'vue'
import Vuex from 'vuex'

import wsData from './module/wsData.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndexTable: ''
  },
  mutations: {
    setActiveIndex(state,payload){
      state.activeIndexTable = payload
    }
  },
  actions: {
  },
  modules: {
    wsData
  }
})
