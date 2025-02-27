import axios from 'axios'

export default {
  namespaced: true,
  state: {
    widgets: false,
    fetchingWidgets: true
  },
  getters: {
    getWidgets(state){ return state.widgets }
  },
  mutations: {
    setWidgets(state, widgets) {
      state.widgets = widgets
      state.fetchingWidgets = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/widgets`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setWidgets', response.data)
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
    delete(_, widgetId) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/me/widgets/${widgetId}`, {
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
  }

}