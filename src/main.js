import '@fortawesome/fontawesome-free/css/all.css'
import Vue from "vue";
import App from "./App.vue";
import VueMoment from "vue-moment";
import VueAnalytics from "vue-analytics";
import VueMeta from "vue-meta";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueClipboard from 'vue-clipboard2'
import VueMasonry from 'vue-masonry-css'
import VueApexCharts from 'vue-apexcharts'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueTabulator from 'vue-tabulator';

import {
  faCoffee,
  faPlusCircle,
  faChartLine,
  faChevronDown,
  faMobile,
  faEnvelope,
  faClock,
  faUsers,
  faPaperPlane,
  faCheckCircle,
  faCheck,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'

import VueSweetalert2 from 'vue-sweetalert2';

import Gravatar from 'vue-gravatar';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import VueFabric from 'vuejs-fabric';

let appName = 'Local Recon'

if (window.location.href.indexOf("reviewgrower") != -1) {
  let exploded = window.location.href.split('reviewgrower.com');
  window.location = "https://app.localrecon.com" + exploded[1];
}

if (window.location.href.indexOf("app.localrecon.com") == -1 && window.location.href.indexOf("localhost") == -1) {
  let exploded = window.location.href.split('com');
  window.location = "https://app.localrecon.com" + exploded[1];
}

Vue.use({
  install() {
    Vue.agency = null;
    Vue.prototype.$agency = null;
    Vue.appName = appName;
    Vue.prototype.$appName = appName;
  }
});

continueLoadingApp()

function continueLoadingApp() {
  let parent_id = '';
  let loggedIn = false;

  let vuex = {auth: {jwt: null}};

  try {
    vuex = JSON.parse(window.localStorage.vuex);
  }
  catch (e) {}

  // console.log('vuex', vuex)

  if (vuex.auth.jwt) {
    try {
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me?field=parent_id`, {
        headers: {
          'Authorization': 'Bearer ' + vuex.auth.jwt
        }
      }).then(function(response) {
        // console.log('response.data', response.data)
        parent_id = response.data.parent_id;
        loggedIn = true;
        continueLoadingApp2();
      }).catch(function (error) {
        continueLoadingApp2();
      });
    }
    catch (e) {
      continueLoadingApp2();
    }
  }
  else {
    continueLoadingApp2();
  }
  
  function continueLoadingApp2() {
    library.add([
      faCoffee,
      faPlusCircle,
      faChartLine,
      faChevronDown,
      faMobile,
      faEnvelope,
      faClock,
      faUsers,
      faPaperPlane,
      faCheckCircle,
      faCheck,
      faLeaf,
    ]);

    Vue.use(VueMoment);
    Vue.use(VueMeta);
    Vue.component("font-awesome-icon", FontAwesomeIcon);

    Vue.component('v-gravatar', Gravatar);

    Vue.use(VueSweetalert2);

    Vue.use(VueClipboard)

    Vue.use(Vuetify)

    Vue.use(VueMasonry);

    Vue.use(VueApexCharts)

    Vue.component('apexchart', VueApexCharts)

    Vue.component('VueFabric',VueFabric);

    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs',
        libraries: 'places',
      }
    });

    // Make BootstrapVue available throughout your project
    Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin)

    Vue.use(VueTabulator);

    Vue.use({
      install() {
          Vue.appName = appName;
          Vue.prototype.$appName = appName;
      }
    });

    new Vue({
      router
    });

    axios.interceptors.response.use(undefined, async function (error) {
      if (error.response.status === 401) {
        await store.dispatch("auth/logout");
        router.push("/login");
      }
      return Promise.reject(error);
    });

    // Plugins
    // ...

    // Sass file
    require("./assets/styles/main.css");

    Vue.config.productionTip = false;

    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount("#app");
  }
}