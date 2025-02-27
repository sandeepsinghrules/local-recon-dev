import axios from 'axios'

export default {
  namespaced: true,
  state: {
    activity: [],
    fetchingActivity: true
  },
  getters: {
    getActivity(state){ return state.activity }
  },
  mutations: {
    setActivity(state, activity) {
      state.activity = activity
      state.fetchingActivity = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/activity`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setActivity', response.data)
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