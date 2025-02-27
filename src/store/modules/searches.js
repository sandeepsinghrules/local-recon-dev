import axios from 'axios'

export default {
  namespaced: true,
  state: {
    searches: false,
    fetchingSearches: true,
    totalFilteredSearches: 0
  },
  getters: {
    getSearches(state){ return state.searches }
  },
  mutations: {
    setSearches(state, searches) {
      state.searches = searches.searches
      state.fetchingSearches = false
      state.totalFilteredSearches = searches.totalFilteredSearches
    },
  },
  actions: {
    fetch({commit}, {page, itemsPerPage, search}) {
      if (!page)
        page = 1;

      if (!itemsPerPage)
        itemsPerPage = 10;

      if (!search)
        search = "";

      return new Promise(async (resolve, reject) => {
  
        try {
          let url = `${process.env.VUE_APP_API_ENDPOINT}/searches` + '?page=' + page + '&itemsPerPage=' + itemsPerPage + '&search=' + search;

          let response = await axios.get(url, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setSearches', response.data)
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
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/searches/bulk-delete`, {
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
    },
    bulkDeleteResults(_, {ids}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/searches/bulk-delete-results`, {
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