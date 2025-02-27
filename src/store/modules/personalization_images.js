import axios from 'axios'

export default {
  namespaced: true,
  state: {
    images: [],
    fetchingImages: true
  },
  getters: {
    getImages(state){ return state.images }
  },
  mutations: {
    setImages(state, images) {
      state.images = images
      state.fetchingImages = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/personalization-images`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setImages', response.data)
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
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/personalization-images/bulk-delete`, {
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