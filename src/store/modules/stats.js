import axios from 'axios'

export default {
  namespaced: true,
  state: {
    stats: [],
    fetchingStats: true
  },
  getters: {
    getStats(state){ return state.stats }
  },
  mutations: {
    setStats(state, stats) {
      state.stats = stats
      state.fetchingStats = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/agency/stats`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setStats', response.data)
            resolve()
            return;
          }
        } catch (error) {
          reject(error.response.data.message)
          return
        }
  
        reject()
  
      })
    }
  }
}