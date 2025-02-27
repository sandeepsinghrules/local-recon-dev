import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    me: null
  },
  getters: {
    getMe(state){ return state.me }
  },
  mutations: {
    setMe(state, data) {
      state.me = data.me
      state.profile = data.profile
    }
  },
  actions: {
    fetch({commit}) {
      return new Promise(async (resolve, reject) => {
  
        try {
          let r = router.history.current.name
          let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me?r=${r}`, {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          })

          if (response.status == 200) {
            
            // Record identify for segment.com
            // if (process.env.NODE_ENV != "development") {
              if (!this.state.me.me) {
                if (!response.data.parent_id) {
                  // send login data to segment
                  // _gs('identify', {
                  //   email: response.data.email,
                  //   first_name: response.data.first_name,
                  //   last_name: response.data.last_name
                  // });
                  // window.analytics.identify(response.data.gosquared_person_id, {
                  //   name: response.data.first_name + " " + response.data.last_name,
                  //   email: response.data.email,
                  //   type: response.data.company_type
                  // });
                }
              }
            // }

            commit('setMe', {
              me: response.data.user, 
              profile: response.data.profile
            });

            try {
              this.state.me.me.settings.email_addresses = this.state.me.me.settings.email_addresses.split(",");
            }
            catch(e) {}

            try {
              this.state.me.me.settings.sms_numbers = this.state.me.me.settings.sms_numbers.split(",");
            }
            catch(e) {}

            // if (response.data.integrations.twilio.status != 1 || response.data.integrations.google_maps.status != 1) {
            //   if (router.history.current.name != 'settings') {
            //     router.push('/settings');
            //     return;
            //   }
            // }

            // If Agency logs in on main Lead Finder website, redirect them to their subdomain or domain.
            // alt = auto login token
            // if (!this.state.auth.admin) {
            //   if (window.location.origin == process.env.VUE_APP_MAIN_URL && this.state.me.me.company_type == "agency") {
            //     if (this.state.me.me.domain && this.state.me.me.domain_status == 1)
            //       window.location = window.location.protocol + '//' + this.state.me.me.domain + '/login?alt=' + btoa(this.state.auth.jwt);
            //     else
            //       window.location = window.location.protocol + '//' + this.state.me.me.subdomain + '/login?alt=' + btoa(this.state.auth.jwt);

            //     return;
            //   }
            // }

            // // Check subscription
            try {
              if (router.history.current.name != 'billing') {
                if (this.state.me.me.company_type != "admin") {
                  if (!this.state.me.me.subscription) {
                    router.push("/billing");
                  }
                  else {
                    if (this.state.me.me.subscription.stripe_status != "active" && this.state.me.me.subscription.stripe_status != "trialing")
                      router.push("/billing");
                  }
                }
              }
            }
            catch (e) {}
            
            resolve()
            return;
          }
        } catch (error) {
          console.log(error)
          reject(error.response.data.message)
          return
        }
  
        reject()
  
      })
    },
    save(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me`, payload, {
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
    change_password(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/change_password`, payload, {
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
    createSubscription(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stripe/create`, payload, {
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
    changeSubscription(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stripe/change`, payload, {
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
    cancelSubscription(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stripe/cancel`, payload, {
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