<template>

  <div>
    
    <div class="flex flex-row items-top justify-between">
      <h1 class="text-lg font-semibold mb-3">Dashboard</h1>
    </div>

    <hr class="border-b border-gray-100 mb-3">

    <v-container v-if="fetchingStats">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <div class="-mx-2" v-if="!fetchingStats && dashboard_stats">
      <div class="flex flex-row flex-wrap mb-4">
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Last 7 Days</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.last_7_days.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.last_7_days.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.last_7_days.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-calendar text-blue"></i>
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Last 14 Days</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.last_14_days.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.last_14_days.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.last_14_days.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-calendar text-blue"></i>
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Total</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.total.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.total.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.total.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg blue"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-calendar text-blue"></i>
              </div>
            </div>
          </v-card>
        </div>

        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Mobile Numbers</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.mobile_numbers.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.mobile_numbers.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.mobile_numbers.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-cellphone"></i>
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Voip Numbers</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.voip_numbers.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.voip_numbers.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.voip_numbers.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg red"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-phone-voip text-red"></i>
              </div>
            </div>
          </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
          <v-card
            class="pa-2"
            tile
          >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
              <div class="dashboard-box-title">Landline Numbers</div>

              <div class=""><strong class="text-xl">{{ dashboard_stats.landline_numbers.sent }}</strong> <span class="text-sm pl-2">SMS Sent</span> &nbsp;&nbsp;&nbsp; <strong class="text-xl">{{ dashboard_stats.landline_numbers.responses }}</strong> <span class="text-sm pl-2">Response<span v-if="dashboard_stats.landline_numbers.responses != 1">s</span></span></div>
              
              <div class="stats-box-icon-bg red"></div>
              <div class="stats-box-icon">
                <i class="mdi mdi-phone text-red"></i>
              </div>
            </div>
          </v-card>
        </div>

      </div>
    </div>

    <div v-if="!fetchingSearches">

      <div class="text-gray-600 text-md text-bold mb-4">Add New Search</div>

      <div class="dashboard-box mb-6">
        <v-card
          class="pa-2"
          tile
        >
          <div class="lf-search-form">
            <div class="flex flex-row flex-wrap">
              <div class="w-full lg:w-1/2">
                <v-text-field
                  label="Keyword"
                  prepend-inner-icon="mdi-magnify"
                  v-model="search_keyword"
                  outlined
                  dense
                  hide-details
                ></v-text-field>

                <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-2 ml-3 mr-3" />
              </div>

              <div class="w-full lg:w-1/2 -ml-6">
                <div class="lf-search-location-box">
                  <v-combobox
                      label="Location"
                      prepend-inner-icon="mdi-map-marker-outline"
                      v-model="autocompleteLocationModel"
                      :items="locationFoundItems"
                      :search-input.sync="locationSearchText"
                      item-text="value"
                      item-value="id"
                      hide-no-data
                      return-object
                      outlined
                      dense
                      hide-details
                      @change="selectPlace()"
                      style="height: 40px; border: 0px;"
                    >
                  </v-combobox>

                  <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                </div>
              </div>

              <div class="lf-search-form-search-type">
                <v-radio-group
                  class="mt-2"
                  row
                  v-model="search_type"
                  >
                      <v-radio
                      label="Local"
                      :value="'local'"
                      :ripple="false"
                      ></v-radio>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">
                            <v-radio
                            label="In-depth"
                            :value="'in_depth'"
                            :ripple="false"
                            ></v-radio>
                          </span>
                        </template>
                        <span>In-depth search is currently working for USA cities only.</span>
                      </v-tooltip>
                  </v-radio-group>
              </div>

              <div class="lf-search-form-submit-button" @click="addSearch()">
                <i v-if="savingSearch" class="fa fa-spin fa-spinner"></i>
                <i v-else class="mdi mdi-magnify"></i>
              </div>
            </div>
          </div>
        </v-card>
      </div>

      <div v-if="add_search_error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="add_search_error"></div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div :class="'w-full lg:w-1/2' + (($vuetify.breakpoint.xs) ? '' : ' pr-5')">
          <div class="text-gray-600 text-md text-bold mb-4">New Searches</div>

          <div v-if="new_searches === null">
            <v-skeleton-loader
              type="article"
              class="mb-4"
            ></v-skeleton-loader>

            <v-skeleton-loader
              type="article"
              class="mb-4"
            ></v-skeleton-loader>

            <v-skeleton-loader
              type="article"
            ></v-skeleton-loader>
          </div>

          <div v-else v-for="search in new_searches" :key="search.id" class="dashboard-box mb-4">
            <v-card
              class="pa-2"
              tile
            >
              <div class="p-2" style="position: relative;">

                <div style="position: absolute; top: -5px; right: -3px;">
                  <v-tooltip v-if="dateDifference(search.created_at) > 20" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <i class="fa fa-clock text-red-600" v-bind="attrs" v-on="on"></i>
                    </template>
                    <span>Your search is taking longer than expected. <br />Please contact us via chat.</span>
                  </v-tooltip>

                  <v-tooltip v-if="dateDifference(search.created_at) < 10" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <i class="fa fa-clock text-green-600" v-bind="attrs" v-on="on"></i>
                    </template>
                    <span>Your job is processing and should be completed between 5 to 10 minutes.</span>
                  </v-tooltip>

                  <v-tooltip v-if="dateDifference(search.created_at) > 10 && dateDifference(search.created_at) < 20" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <i class="fa fa-clock text-orange-600" v-bind="attrs" v-on="on"></i>
                    </template>
                    <span>This is a larger job and will little longer, but it should be completed in less than 20 minutes.</span>
                  </v-tooltip>
                </div>

                <div style="word-break: break-word;">

                  <div class="float-right">
                    <span style="font-size: 12px; color: #757B89;">
                      {{ formatDate(search.created_at) }}
                    </span>
                    <div class="pt-4">
                      <router-link :to="'/search/' + search.id">
                        <span style="color: #3A9BDB; opacity: 0.7; font-weight: bold;">View Results</span>
                      </router-link>
                    </div>
                  </div>

                  <strong>
                    <span class="text-lg">{{ search.keyword }}</span>  

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="orange lighten-5"
                      text-color="orange lighten-1"
                      v-if="search.status == 'pending'"
                    >
                      pending
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="green lighten-5"
                      text-color="green lighten-1"
                      v-if="search.status == 'completed'"
                    >
                      completed
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="blue lighten-5"
                      text-color="blue lighten-1"
                    >
                    {{ search.search_results_count }} leads
                    </v-chip>
                  </strong>

                  <div class="text-gray-600 pt-3" style="font-size: 12px;">
                    <i class="mdi mdi-map-marker-outline mr-1"></i> {{ search.location }}
                  </div>
                </div>
                <div style="clear: both;"></div>
                <v-progress-linear
                  class="mt-3"
                  color="blue lighten-2"
                  buffer-value="0"
                  stream
                  :value="search.percentage_completed"
                  v-if="search.status == 'pending'"
                ></v-progress-linear>
              </div>
            </v-card>
          </div>

          <div v-if="new_searches !== null && new_searches.length == 0">
            <div class="dashboard-box">
              <v-card
                class="pa-2"
                tile
              >
                <div class="p-4 text-center text-gray-600 text-sm">
                  No searches found.
                </div>
              </v-card>
            </div>
          </div>
        </div>
        <div :class="'w-full lg:w-1/2' + (($vuetify.breakpoint.xs) ? '' : ' pl-5')">
          <div class="text-gray-600 text-md text-bold mb-4">Recent Searches</div>

          <div v-if="recent_searches === null">
            <v-skeleton-loader
              type="article"
              class="mb-4"
            ></v-skeleton-loader>

            <v-skeleton-loader
              type="article"
              class="mb-4"
            ></v-skeleton-loader>

            <v-skeleton-loader
              type="article"
            ></v-skeleton-loader>
          </div>

          <div v-else v-for="search in recent_searches" :key="search.id" class="dashboard-box mb-4">
            <v-card
              class="pa-2"
              tile
            >
              <div class="p-2">
                <div style="word-break: break-word;">

                  <div class="float-right">
                    <span style="font-size: 12px; color: #757B89;">
                      {{ formatDate(search.created_at) }}
                    </span>
                    <div class="pt-4">
                      <router-link :to="'/search/' + search.id">
                        <span style="color: #3A9BDB; opacity: 0.7; font-weight: bold;">View Results</span>
                      </router-link>
                    </div>
                  </div>

                  <strong>
                    <span class="text-lg">{{ search.keyword }}</span>  

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="orange lighten-5"
                      text-color="orange lighten-1"
                      v-if="search.status == 'pending'"
                    >
                      pending
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="green lighten-5"
                      text-color="green lighten-1"
                      v-if="search.status == 'completed'"
                    >
                      completed
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      small
                      color="blue lighten-5"
                      text-color="blue lighten-1"
                    >
                    {{ search.search_results_count }} leads
                    </v-chip>
                  </strong>

                  <div class="text-gray-600 pt-3" style="font-size: 12px;">
                    <i class="mdi mdi-map-marker-outline mr-1"></i> {{ search.location }}
                  </div>
                  <div class="mobile-only mt-1" style="font-size: 12px; color: #757B89;">
                    <i class="fa fa-calendar"></i> {{ formatDate(search.created_at) }}
                  </div>
                </div>
                <div style="clear: both;"></div>
                <v-progress-linear
                  class="mt-3"
                  color="blue lighten-2"
                  buffer-value="0"
                  stream
                  :value="search.percentage_completed"
                  v-if="search.status == 'pending'"
                ></v-progress-linear>
              </div>
            </v-card>
          </div>

          <div v-if="recent_searches !== null && recent_searches.length == 0">
            <div class="dashboard-box">
              <v-card
                class="pa-2"
                tile
              >
                <div class="p-4 text-center text-gray-600 text-sm">
                  No searches found.
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </div>

      <br clear="all" />

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import ReviewsTable from '@/components/ReviewsTable.vue'
import moment from 'moment'
import { GetSuggestions } from '@/utils/PlaceUtils'

export default {
  components: {
    ReviewsTable
  },
  data () {
    return {
      fetchingStats: false,
      dashboard_stats: null,

      search_keyword: null,
      add_search_error: null,
      
      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],

      search_type: 'local',

      savingSearch: false,

      search_location: null,

      searches_interval: null,

      new_searches: null,

      new_searches: null,
      recent_searches: null
    }
  },
  computed: {
    ...mapState({
      searches: state => state.searches.searches,
      fetchingSearches: state => state.searches.fetchingSearches,
    }),
    locationFoundItems () {
      return this.locationEntries
    }
  },
  methods: {
    formatDate: function(date) {
      return moment(String(date)).fromNow()
    },

    dateDifference: function(date) {
      let end = moment();
      var duration = end.diff(moment(date))/1000/60;

      console.log('duration', duration)

      return duration;
    },

    async getSearches() {
      let url = `${process.env.VUE_APP_API_ENDPOINT}/dashboard-searches`;

      let response = await axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.new_searches = response.data.new_searches;
      this.recent_searches = response.data.recent_searches;
    },

    addSearch: async function() {
      this.add_search_error = null

      if (!this.search_keyword) {
        this.add_search_error = "Please enter keyword.";
        return;
      }

      if (!this.search_location) {
        this.add_search_error = "Please enter location.";
        return;
      }

      this.savingSearch = true;

      let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/searches/add-search', {
        search_keyword: this.search_keyword,
        search_location: this.search_location,
        search_type: this.search_type
      } , {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        },
      })

      this.$store.dispatch('searches/fetch', {
        page: 1,
        itemsPerPage: 10
      })

      this.getSearches()

      this.savingSearch = false
      this.search_keyword = null
      this.search_location = null
      this.autocompleteLocationModel = null
    },
    getAddressObject(address_components) {

      console.log('address_components', address_components)

      var ShouldBeComponent = {
        street_number: ["street_number"],
        zip: ["postal_code"],
        address: ["street_address", "route"],
        state: [
          "administrative_area_level_1",
          "administrative_area_level_2",
          "administrative_area_level_3",
          "administrative_area_level_4",
          "administrative_area_level_5"
        ],
        city: [
          "locality",
          "colloquial_area",
          "political",
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
          "sublocality_level_3",
          "sublocality_level_4"
        ],
        country: ["country"]
      };

      var address = {
        street_number: "",
        zip: "",
        address: "",
        state: "",
        city: "",
        country: ""
      };
      address_components.forEach(component => {
        for (var shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
            if (shouldBe === "country") {
              address[shouldBe] = component.short_name;
            } else {
              address[shouldBe] = component.long_name;
            }
          }
        }
      });
      return address;
    },
    filterPlaces (item, queryText, itemText) {
      return true
    },
    selectPlace() {
      let that = this

      $.get("https://maps.googleapis.com/maps/api/geocode/json?place_id=" + this.autocompleteLocationModel.id + "&fields=name,rating,formatted_phone_number&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs", function(response) {
        that.company_name = that.autocompleteLocationModel.value.split(",")[0];

        let address = that.getAddressObject(response.results[0].address_components);
        let search_location = {};
        search_location.street_number = address.street_number;
        search_location.address = address.address;
        search_location.city = address.city;
        search_location.state = address.state;
        search_location.zip = address.zip;
        search_location.country = address.country;

        search_location.lat = response.results[0].geometry.location.lat;
        search_location.lng = response.results[0].geometry.location.lng;
        search_location.place_id = response.results[0].place_id;

        that.search_location = search_location;

        console.log(that.search_location);
      });
    },

    async getDashboardStats() {
      this.fetchingStats = true;
      let url = `${process.env.VUE_APP_API_ENDPOINT}/inbox/get-dashboard-stats`;

      let response = await axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.fetchingStats = false;

      this.dashboard_stats = response.data.stats;
    }
  },
  created() {
    this.$store.state.searches.fetchingSearches = true
    this.$store.dispatch('searches/fetch', {
      page: 1,
      itemsPerPage: 10
    })

    let self = this;
    this.searches_interval = setInterval(function() {
      self.$store.dispatch('searches/fetch', {
        page: 1,
        itemsPerPage: 10
      })
      self.getSearches();
    }, 5000);

    self.getSearches();

    self.getDashboardStats();
  },
  beforeDestroy() {
    clearInterval(this.searches_interval);
    this.searches_interval = null
  },
  watch: {
    locationSearchText (newVal) {
      var that = this;

      // If less than 3 chars typed, do not search
      if (!newVal || newVal.length <= 3) return

      // Call the method from the previous section here
      GetSuggestions(newVal)
        .then(function (res) {
          that.locationEntries = res;
        })
        .catch(function () {
          that.business = false;
          that.step = 1;
        })
    }
  }
}
</script>