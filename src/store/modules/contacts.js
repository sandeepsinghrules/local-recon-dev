import axios from 'axios'

export default {
  namespaced: true,
  state: {
    contacts: [],
    fetchingContacts: true
  },
  getters: {
    getContacts(state){ return state.contacts }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts
      state.fetchingContacts = false
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/contacts`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })
  
          if (response.status == 200) {
            commit('setContacts', response.data)
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
    invite(_, {contactId}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/${contactId}/invite`, {}, {
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
    inviteEmail(_, {contactId}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/${contactId}/invite-email`, {}, {
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
    invitePhone(_, {contactId}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/${contactId}/invite-phone`, {}, {
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
    bulkInvite(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-invite`, {
            ids: contactIds
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
    bulkInviteEmail(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-invite-email`, {
            ids: contactIds
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
    bulkInvitePhone(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-invite-phone`, {
            ids: contactIds
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
    bulkArchive(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-archive`, {
            ids: contactIds
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
    bulkUnarchive(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-unarchive`, {
            ids: contactIds
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
    bulkDelete(_, {contactIds}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/bulk-delete`, {
            ids: contactIds
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