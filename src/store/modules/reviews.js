import axios from 'axios'

export default {
  namespaced: true,
  state: {
    reviews: [],
    loading_reviews: true,
    initial_loading: true,
    totalFilteredReviews: 0,
    totalReviews: 0,
    notRespondedCount: 0,
  },
  getters: {
    getReviews(state){ return state.reviews }
  },
  mutations: {
    setReviews(state, response) {
      state.reviews = response.data.reviews
      state.loading_reviews = false
      state.initial_loading = false
      state.totalFilteredReviews = response.data.totalFilteredReviews
      state.totalReviews = response.data.totalReviews
      state.notRespondedCount = response.data.notRespondedCount
    }
  },
  actions: {
    add(_, {url} ){
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/reviews`, {
            url
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

    fetch({commit}, {dashboard, social_posting, social_posting_rating, social_posting_review_sites, sortBy, sortDesc, page, itemsPerPage, search, filter_rating, filter_website, review_sites, date, showByResponded}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let url = `${process.env.VUE_APP_API_ENDPOINT}/me/reviews?dashboard=${dashboard}`+
          '&social_posting=' + social_posting + 
          '&social_posting_rating=' + social_posting_rating + 
          '&social_posting_review_sites=' + social_posting_review_sites + 
          '&sortBy=' + sortBy + '&sortDesc=' + sortDesc + '&page=' + page + '&itemsPerPage=' + itemsPerPage + '&search=' + search + '&filter_rating=' + filter_rating + '&filter_website=' + filter_website + '&showByResponded=' + showByResponded;

          if (review_sites && date)
            url += '&review_sites=' + review_sites + '&date=' + date;

          let response = await axios.get(url
          		, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setReviews', response)
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
    delete(_, listingId) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}/me/reviews/${listingId}`, {
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