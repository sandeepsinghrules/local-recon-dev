<template>
  <v-app>

    <v-main :class="$router.currentRoute.name">
      <router-view />
    </v-main>

  </v-app>
</template>

<style>
  .text-white {
      color: #fff !important;
  }

  .text-gray-600 {
    color: #757575 !important;
  }

  .font-semibold, .text-gray-700 {
    color: #616161 !important;
  }

  /* #gs {
    visibility: hidden !important;
  } */

  .not-mobile {
    display: initial;
  }

  .mobile-only {
    display: none;
  }

  @media screen and (max-width: 767px) {
    .not-mobile {
      display: none;
    }

    .mobile-only {
      display: initial;
    }

    body {
      overflow: hidden;
    }
  }
</style>

<script>

import axios from 'axios'

export default {

  data: function() {
    return {
      loading: true,
      error: false
    }
  },
  methods: {
  },
  created() {
    let self = this

    if (process.env.NODE_ENV != 'development') {
      if (window.location.protocol == "http:") {
        window.location = window.location.href.replace("http://", "https://")
        return;
      }
    }

    // Apply favicon

    let favIconEl = document.createElement("link");
    favIconEl.rel = "icon";
    favIconEl.id = "Lead FinderFavicon";

    let faviconHref = '/favicon.png';

    favIconEl.href = faviconHref;

    document.head.appendChild(favIconEl);
    // END Apply favicon
  }
};
</script>