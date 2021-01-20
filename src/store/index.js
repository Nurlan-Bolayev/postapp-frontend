import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchUser({commit}) {
      try {
        const res = await axios.get('api/users/me')
        commit('setUser', res.data)
      } catch (e) {
        // ignore
      }
    },

    async logout({commit}) {
      try {
        commit('setUser', null)
        await axios.post('api/logout')
      } catch (e) {
        // ignore
      }
    }
  },
  modules: {}
})