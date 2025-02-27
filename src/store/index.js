import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import auth from './modules/auth'
import integrations from './modules/integrations'
import contacts from './modules/contacts'
import businesses from './modules/businesses'
import locations from './modules/locations'
import stats from './modules/stats'
import searches from './modules/searches'
import templates from './modules/templates'
import personalization_images from './modules/personalization_images'
import reviews from './modules/reviews'
import feedback from './modules/feedback'
import widgets from './modules/widgets'
import local_recon_widgets from './modules/local_recon_widgets'
import me from './modules/me'

import activity from './modules/activity'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

export default new Vuex.Store({
  modules: {
    auth,
    integrations,
    contacts,
    businesses,
    locations,
    stats,
    searches,
    templates,
    personalization_images,
    reviews,
    feedback,
    widgets,
    local_recon_widgets,
    me,
    activity
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin]
})