import Vue from 'vue'
import Vuex from 'vuex'
import { holydays, Holyday } from '@/store/holydays'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentHolydays: holydays
  },
  getters: {
    getCurrentHolydays(state): Holyday[] {
      return state.currentHolydays
    }
  },
  mutations: {
    addAnotherDay(state, day: Holyday) {
      state.currentHolydays.push(day)
    }
  },
  actions: {
    addHolyday(context, payload: Holyday) {
      context.commit('addAnotherDay', payload)
    }
  },
  modules: {
  }
})
