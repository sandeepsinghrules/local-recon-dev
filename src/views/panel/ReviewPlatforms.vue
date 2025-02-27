<template>

  <panel-navigation>

    <dialog-review-platform-add ref="dialogPlatform"></dialog-review-platform-add>

    <!-- <div class="float-right -mt-3 ml-2">
      <div class="bg-green-500 hover:bg-green-400 text-white inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': saving}" @click="saveScrapeFrequency()">Save</div>
    </div>
    <div class="float-right" v-if="me">
      <v-text-field class="reviews-scrape-frequency" style="width: 240px; margin-top: -20px;"
        v-model="me.reviews_scrape_frequency"
        prefix="Fetch Reviews Every"
        suffix="days"
        type="number"
        hide-details
        single-line
        min="1"
      ></v-text-field>
    </div> -->

    <h1 class="text-lg font-semibold mb-4">Review Platforms</h1>

    <hr class="border-b border-gray-100 mb-3">

    <v-skeleton-loader v-if="fetchingListings" type="article, article, article"></v-skeleton-loader>

    <div v-if="me">
    <!--
      <v-alert
        color="blue-grey"
        dark
        icon="mdi-clock-fast"
        text
        v-if="!fetchingListings && listings.length == 0"
      >
        <img src="@/assets/images/providers/reviewplatforms-collection.png" alt="" class="mt-5" style="max-width: 100px; float: right;">

        Add your first review platform
        <br /><br />

        <v-btn
          tile
          color="blue-grey mb-10"
          @click="$refs.dialogPlatform.show()"
        >
        <br />
        <v-icon left>
          mdi-plus
        </v-icon>
          Add Link Manualy
        </v-btn>

        <v-divider vertical class="ml-4 mr-4"></v-divider>

        <v-btn
          tile
          color="blue mb-10"
          @click="listingFinder = true"
        >
        <br />
        <v-icon left>
          mdi-magnify-plus-outline
        </v-icon>
          Find Your Links
        </v-btn>
      </v-alert> -->

      <template>

        <!-- <div v-if="(!fetchingListings && listings.length > 0) || listings_search" class="flex flex-row flex-wrap justify-between items-start mb-6">
          <div class="text-sm mb-4 text-gray-700">Your review platform links.</div>
          <div>
            <div class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded cursor-pointer float-left" @click="$refs.dialogPlatform.show()"><i class="fa fa-plus"> </i> Add Link</div>
          </div>
        </div> -->

        <!-- <div v-if="listingFinder || (!fetchingListings && listings.length == 0) || listings_search" class="">

          <v-alert
            color="blue-grey"
            dark
            icon="mdi-clock-fast"
            text
            v-if="!fetchingListings && listings.length == 0 && !listings_search"
          >
            Looks like there are no review platforms in your account yet!
            <br /><br />
            <v-btn
              tile
              color="blue-grey mb-10"
              @click="$refs.dialogPlatform.show()"
            >
            <br />
            <v-icon left>
              mdi-plus
            </v-icon>
              Add Review Platform
            </v-btn>
          </v-alert>

        </div> -->

        <h2 class="font-bold text-gray-800 mb-3">Active Connections</h2>

        <div v-if="listings.length == 0">
          There are no active connections. Please add your connections below.
        </div>

        <div v-else class="flex">
          <div v-for="reviewplatform in active_connections" :key="reviewplatform.id" class="w-full mr-2 mb-2" :class="'float-left'" style="width: 250px;">
            <v-card>
              <v-card-text>
                <div class="text-h6 text--primary">
                  <div class="float-right mt-1">
                    <img :src="getIconUrl(reviewplatform.url)" alt="" class="source-logo-dashboard rounded-l border border-gray-100 mr-3">
                  </div>
                  {{ reviewSitesNamesOriginal["www." + getHostname(reviewplatform.url)] }}

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip
                        color="pink lighten-1"
                        text-color="white"
                        small
                        v-if="reviewplatform.crawl_status == 'pending' || !reviewplatform.crawl_status"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon left>
                          mdi-upload
                        </v-icon>
                        Importing...
                      </v-chip>
                    </template>
                    <span>Your reviews are being imported. <br />We will send you an email when import will be completed.</span>
                  </v-tooltip>
                </div>
              </v-card-text>

              <v-card-actions class="-mt-2">
                <v-btn
                  v-if="$store.state.auth.owner || !$agency || ($agency && $agency.settings.allow_business_to_modify_review_sites == 1)"
                  class="w-full secondary text-white"
                  outlined
                  rounded
                  text
                  small
                  @click="deleteReviewplatform(reviewplatform.id)"
                >
                  Disconnect
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <h2 class="font-bold text-gray-800 mb-3 mt-6">Available Connections</h2>

        <div v-if="reviewSitesNamesCount == 0">
          Congratulations! You have successfully connected all available review platforms.
        </div>

        <div v-else class="flex">
          <div v-for="(reviewSite, index) in reviewSitesNames" :key="index" class="w-full mr-2 mb-2" :class="'float-left'" style="width: 250px;">
            <v-card>
              <v-card-text>
                <div class="text-h6 text--primary">
                  <div class="float-right mt-1">
                    <img :src="getIconUrl('https://' + index)" alt="" class="source-logo-dashboard rounded-l border border-gray-100 mr-3">
                  </div>
                  {{ reviewSite }}
                </div>
              </v-card-text>

              <v-card-actions class="-mt-2">
                <v-btn
                  v-if="$store.state.auth.owner || !$agency || ($agency && $agency.settings.allow_business_to_modify_review_sites == 1)"
                  class="w-full primary text-white"
                  outlined
                  rounded
                  text
                  small
                  @click="$refs.dialogPlatform.review_platform_url = ''; $refs.dialogPlatform.review_site = index; $refs.dialogPlatform.review_site_name = reviewSite; $refs.dialogPlatform.show()"
                >
                  Connect
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <div v-if="me && me.subscription && me.subscription.stripe_id == 'starter'">
          <h2 class="font-bold text-gray-800 mb-3 mt-6">Widgets Only Connections</h2>

          <div v-if="reviewSitesNamesWidgetsOnlyCount == 0">
            Congratulations! You have successfully connected all available widgets only review platforms.
          </div>

          <div v-else>
            <div v-for="(reviewSite, index) in reviewSitesNamesWidgetsOnly" :key="index" class="w-full mr-2 mb-2" :class="'float-left'" style="width: 250px;">
              <v-card>
                <v-card-text>
                  <div class="text-h6 text--primary">
                    <div class="float-right mt-1">
                      <img :src="getIconUrl('https://' + index)" alt="" class="source-logo-dashboard rounded-l border border-gray-100 mr-3">
                    </div>
                    {{ reviewSite }}
                  </div>
                </v-card-text>

                <v-card-actions class="-mt-2">
                  <v-btn
                    v-if="$store.state.auth.owner || !$agency || ($agency && $agency.settings.allow_business_to_modify_review_sites == 1)"
                    class="w-full primary text-white"
                    outlined
                    rounded
                    text
                    small
                    @click="$refs.dialogPlatform.review_platform_url = ''; $refs.dialogPlatform.review_site = index; $refs.dialogPlatform.review_site_name = reviewSite; $refs.dialogPlatform.show()"
                  >
                    Connect
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </div>

        <!-- <div v-if="!fetchingListings && listings.length > 0" class="mb-6">
          <div v-for="reviewplatform in listings" :key="reviewplatform.id" class="bg-gray-100 rounded-l flex flex-row items-center justify-between bg-white rounded w-full mb-2">

            <div class="flex flex-row items-center truncate">
              <div class="w-12 flex-shrink-0">
                <img :src="getIconUrl(reviewplatform.url)" alt="" class="rounded-l border border-gray-100">
              </div>
              <div class="truncate p-3 text-gray-400"><span class="text-gray-900">{{ getHostname(reviewplatform.url) }}</span>{{ getPathname(reviewplatform.url) }}</div>
            </div>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  color="pink lighten-1"
                  text-color="white"
                  small
                  v-if="reviewplatform.crawl_status == 'pending' || !reviewplatform.crawl_status"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-upload
                  </v-icon>
                  Importing...
                </v-chip>
              </template>
              <span>Your reviews are being imported. <br />We will send you an email when import will be completed.</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  color="red lighten-1"
                  text-color="white"
                  small
                  v-if="reviewplatform.crawl_status == 'failed_no_credits'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-alert
                  </v-icon>
                  Stalled
                </v-chip>
              </template>
              <span>Your reviews are NOT being imported. <br />You either ran out of credits or there is an issue with our system. <br />Please recharge your account OR contact us at {{ $agency.email }}</span>
            </v-tooltip>

            <menu-reviewplatform-actions :reviewplatform="reviewplatform" class="mr-2">
              <div class="cursor-pointer">
                <svg class="text-gray-800 fill-current" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 1248v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68V736q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68V224q0-40 28-68t68-28h192q40 0 68 28t28 68z"/></svg>
              </div>
            </menu-reviewplatform-actions>

          </div>
        </div> -->

      </template>
    </div>

    <!-- <div v-if="listingFinder">
      <div class="flex flex-row flex-wrap justify-between items-start mb-6">
        <div class="text-sm mb-4 text-gray-700">Credits Cost: <strong>150</strong></div>
        <div>
          <div class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer float-right ml-4" @click="listingFinder = false"><i class="fa fa-arrow-left"> </i> Go Back</div>
        </div>
      </div>

      <div style="clear: both;">
        <ListingsFinder @listingsAdded="listingsAdded" />
      </div>
    </div> -->

    <!--<div>
      <button class="bg-gray-200 py-2 px-3 text-gray-600 hover:bg-gray-300 rounded" @click="$refs.dialogPlatform.show()"><font-awesome-icon icon="plus-circle" class="mr-1"></font-awesome-icon> Add platform</button>
    </div>-->
  </panel-navigation>

</template>

<script>
import { mapState } from 'vuex'
import urlParser from 'url-parse'
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuReviewplatformActions from '@/components/menus/menuReviewplatformActions.vue'
import DialogReviewPlatformAdd from '@/components/dialogs/dialogReviewPlatformAdd.vue'
import ListingsFinder from '@/components/ListingsFinder.vue'
import reviewSitesNames from '@/config/review_sites/names';
import reviewSitesNamesWidgetsOnly from '@/config/review_sites/names_widgets';
import axios from 'axios'

export default {
  metaInfo () {
    return {
      title: "Review Platforms | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuReviewplatformActions,
    DialogReviewPlatformAdd,
    ListingsFinder
  },
  data () {
    return {
      listingFinder: false,
      listings_search_percentage: 17,
      listingsInterval: null,
      saving: false,
      savingNapScan: false,
      reviewSitesNamesOriginal: {"www.agoda.com": "Agoda","www.avvo.com": "Avvo","www.expedia.com": "Expedia","www.facebook.com": "Facebook","www.google.com": "Google","www.playstore.com": "Playstore","www.tripadvisor.com": "Tripadvisor","www.yelp.com": "Yelp","www.zillow.com": "Zillow","www.zomato.com": "Zomato","www.airbnb.com": "Airbnb","www.aliexpress.com": "Aliexpress","www.alternativeto.com": "Alternativeto","www.amazon.com": "Amazon","www.angi.com": "Angie's List","www.apartmentratings.com": "Apartmentratings","www.apartments.com": "Apartments","www.appstore.com": "Appstore","www.bbb.org": "Bbb","www.bookatable.co.uk": "Bookatable","www.booking.com": "Booking","www.capterra.com": "Capterra","www.cargurus.com": "Cargurus","www.cars.com": "Cars","www.citysearch.com": "Citysearch","www.classpass.com": "Classpass","www.consumeraffairs.com": "Consumeraffairs","www.creditkarma.com": "Creditkarma","www.customerlobby.com": "Customerlobby","www.dealerrater.com": "Dealerrater","www.ebay.com": "Ebay","www.edmunds.com": "Edmunds","www.etsy.com": "Etsy","www.findlaw.com": "Findlaw","www.foursquare.com": "Foursquare","www.g2crowd.com": "G2crowd","www.g2.com": "G2","www.gartner.com": "Gartner","www.glassdoor.com": "Glassdoor","www.greatschools.org": "Greatschools","www.healthgrades.com": "Healthgrades","www.homeadvisor.com": "Homeadvisor","www.homeaway.com.au": "Homeaway","www.homestars.com": "Homestars","www.houzz.com": "Houzz","www.hotels.com": "Hotels","www.indeed.com": "Indeed","www.influenster.com": "Influenster","www.insiderpages.com": "Insiderpages","www.itcentralstation.com": "Itcentralstation","www.lawyers.com": "Lawyers","www.lendingtree.com": "Lendingtree","www.martindale.com": "Martindale","www.niche.com": "Niche","www.openrice.com": "Openrice","www.opentable.com": "Opentable","www.producthunt.com": "Producthunt","www.productreview.com.au": "Productreview","www.ratemds.com": "Ratemds","www.reserveout.com": "Reserveout","www.sitejabber.com": "Sitejabber","www.softwareadvice.com": "Softwareadvice","www.talabat.com": "Talabat","www.theknot.com": "Theknot","www.thumbtack.com": "Thumbtack","www.trulia.com": "Trulia","www.trustedshops.com": "Trustedshops","www.trustpilot.com": "Trustpilot","www.trustradius.com": "Trustradius","www.vitals.com": "Vitals","www.walmart.com": "Walmart","www.webmd.com": "Webmd","www.weddingwire.com": "Weddingwire","www.yell.com": "Yell","www.yellowpages.com": "Yellowpages","www.zocdoc.com": "Zocdoc"},
      reviewSitesNamesCount: 3,
      reviewSitesNames: reviewSitesNames,
      reviewSitesNamesWidgetsOnlyCount: 3,
      reviewSitesNamesWidgetsOnly: reviewSitesNamesWidgetsOnly,
      active_connections: {}
    }
  },
  computed: {
    ...mapState({
      listings: state => state.listings.listings,
      listings_search: state => state.listings.listings_search,
      fetchingListings: state => state.listings.fetchingListings,
      me: state => state.me.me
    })
  },
  methods: {
    getHostname(url) {
      return urlParser(url).hostname.replace("www.", "")
    },
    getPathname(url) {
      let parsed_url = urlParser(url)

      if (url.includes("google"))
        return parsed_url.pathname + parsed_url.query

      return parsed_url.pathname
    },
    getIconUrl(url) {
      return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");

    },
    async deleteReviewplatform(listing_id) {
      await this.$store.dispatch('listings/delete', listing_id)
      await this.$store.dispatch('listings/fetch', { dashboard: false })

      this.active_connections = {};
      for (var i in this.listings) {
        let listing = this.listings[i];
        let hostName = this.getHostname(listing.url);

        this.active_connections[hostName] = listing;
        delete this.reviewSitesNames["www." + hostName];
      }

      window.location = window.location.href;

      return;

      // this.reviewSitesNames = JSON.parse(JSON.stringify(this.reviewSitesNamesOriginal));

      // this.active_connections = {};
      // for (var i in this.listings) {
      //   let listing = this.listings[i];
      //   let hostName = this.getHostname(listing.url);

      //   this.active_connections[hostName] = listing;
      //   delete this.reviewSitesNames["www." + hostName];
      // }

      // this.reviewSitesNamesCount = 0;
      // for (var i in this.reviewSitesNames)
      //   this.reviewSitesNamesCount++;
    },
    async saveScrapeFrequency() {
      this.saving = true

      let self = this

      await this.$store.dispatch('me/save', {
        reviews_scrape_frequency: self.me.reviews_scrape_frequency,
      })

      this.saving = false

      let credits_amount = (30/self.me.reviews_scrape_frequency) * 10;
      credits_amount = parseInt(credits_amount);

      this.$swal({
        title: "Settings saved!",
        html: "Every time we submit your listing for reviews refetch, we will use <strong>10</strong> credits from your account. This will use <strong>" + credits_amount + "</strong> credits per month per listing.\
              <br /><br />\
              <a href='/billing' class=\"text-blue-500\">Click here</a> to view your credits log.\
              ",
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then(function() {

      });
    },
    listingsAdded: function() {
      console.log('listings addeddddddd')
      this.listingFinder = false
      this.$store.dispatch('me/fetch')
      this.$store.dispatch('listings/fetch', { dashboard: false })
    },
    async submitNapScan() {
      this.savingNapScan = true
      console.log(this.$refs.business_name.value)
      console.log(this.$refs.zip.value)

      try {
        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/listings/submit-nap', {
          business_name: this.$refs.business_name.value,
          zip: this.$refs.zip.value
        } , {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
        })

        this.savingNapScan = false

        this.$store.dispatch('listings/fetch', { dashboard: false })
      }catch(e){
        console.log(e)
      }
    },
    async dismissListingsSearch() {
      this.$store.state.listings.listings_search = false

      try {
        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/listings/dismiss-nap', {
        } , {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
        })

        this.savingNapScan = false
      }catch(e){
        console.log(e)
      }
    }
  },
  created() {
    this.$store.state.listings.fetchingListings = true
    this.$store.dispatch('listings/fetch', { dashboard: false })

    let hasPending = false;

    for (var i in this.listings) {
      if (this.listings[i].crawl_status == "pending" || !this.listings[i].crawl_status)
        hasPending = true;
    }

    if (this.listings_search) {
      if (this.listings_search.crawl_status == "pending")
        hasPending = true;
    }

    var that = this;

    if (hasPending) {
      that.listingsInterval = setInterval(function() {
        that.$store.dispatch('listings/fetch', { dashboard: true })
      }, 5000);
    }
  },

  beforeDestroy () {
     clearInterval(this.listingsInterval)
  },

  watch: {
    listings: function() {
      this.active_connections = {};
      for (var i in this.listings) {
        let listing = this.listings[i];
        let hostName = this.getHostname(listing.url);

        this.active_connections[hostName] = listing;
        if (typeof(this.reviewSitesNames["www." + hostName]) != "undefined")
          delete this.reviewSitesNames["www." + hostName];
        
        if (typeof(this.reviewSitesNamesWidgetsOnly["www." + hostName]) != "undefined")
          delete this.reviewSitesNamesWidgetsOnly["www." + hostName];
      }

      this.reviewSitesNamesCount = 0;
      for (var i in this.reviewSitesNames)
        this.reviewSitesNamesCount++;

      this.reviewSitesNamesWidgetsOnlyCount = 0;
      for (var i in this.reviewSitesNamesWidgetsOnly)
        this.reviewSitesNamesWidgetsOnlyCount++;
    }
  }
}
</script>

<style>
  input, select {
    border-style: solid;
  }

  .reviews-scrape-frequency input[type="number"] {
    text-align: center;
  }
</style>