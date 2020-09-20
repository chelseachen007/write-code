import Vue from 'vue'
import Vuex from './cvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      // state哪来的？
      state.counter++
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      console.log(state.counter);
      
      return state.counter * 2;
    }
  }
})
