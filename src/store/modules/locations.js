import axios from 'axios'

export default {
  namespaced: true,
  state: {
    locations: [],
    fetchingLocations: true
  },
  getters: {
    getLocations(state){ return state.locations }
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations
      state.fetchingLocations = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/locations`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setLocations', response.data)
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