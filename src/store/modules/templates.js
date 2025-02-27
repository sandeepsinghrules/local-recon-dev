import axios from 'axios'

export default {
  namespaced: true,
  state: {
    templates: [],
    fetchingTemplates: true
  },
  getters: {
    getTemplates(state){ return state.templates }
  },
  mutations: {
    setTemplates(state, templates) {
      state.templates = templates
      state.fetchingTemplates = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/templates`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setTemplates', response.data)
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
    bulkDelete(_, {ids}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/templates/bulk-delete`, {
            ids: ids
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
    }

  }

}