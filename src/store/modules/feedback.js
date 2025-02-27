import axios from 'axios'

export default {
  namespaced: true,
  state: {
    feedback: [],
    fetchingFeedback: true
  },
  getters: {
    getFeedback(state){ return state.feedback }
  },
  mutations: {
    setFeedback(state, feedback) {
      state.feedback = feedback
      state.fetchingFeedback = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/feedback`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setFeedback', response.data)
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