import axios from 'axios'

export default {
  namespaced: true,
  state: {
    integrations: []
  },
  getters: {
    getIntegrations(state){ return state.integrations }
  },
  mutations: {
    setIntegrations(state, integrations) {
      state.integrations = integrations
    }
  },
  actions: {
    add(_, {providerId, config} ){
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/integrations`, {
            providerId,
            config
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
          if (response.status == 200) {
            resolve()
            return;
          }
        } catch (error) {
          reject(error.response.data.message)
          return
        }

        reject()

      })
    },
    delete(_, integrationId) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/integrations/${integrationId}`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
          if (response.status == 200) {
            resolve()
            return;
          }
        } catch (error) {
          reject(error.response.data.message)
          return
        }

        reject()

      })
    },
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/integrations`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setIntegrations', response.data)
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