import axios from 'axios'

export default {
  namespaced: true,
  state: {
    businesses: [],
    fetchingBusinesses: true,
    sort_by: 1
  },
  getters: {
    getBusinesses(state){ return state.businesses }
  },
  mutations: {
    setBusinesses(state, businesses) {
      state.businesses = businesses
      state.fetchingBusinesses = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/children?sort_by=` + this.state.businesses.sort_by, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setBusinesses', response.data)
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
    bulkDelete(_, {businessesIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/children/bulk-delete`, {
            ids: businessesIds
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