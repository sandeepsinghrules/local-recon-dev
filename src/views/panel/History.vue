<template>

  <panel-navigation>

    <div>

      <div v-if="$vuetify.breakpoint.xs" class="justify-between items-start mb-3 float-right">
        <v-menu
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="flex flex-row items-center px-4 py-2 bg-white rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer">
              <span class="mr-2">Actions</span>
              <span class="text-xs" style="padding-top: 3px;">
                <font-awesome-icon icon="chevron-down"  />
              </span>
            </div>
          </template>

          <v-list class="table-menu-actions">
            <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
          </v-list>
        </v-menu>
      </div>
        
      <h1 class="text-lg font-semibold mb-3">History</h1>

      <div v-if="$vuetify.breakpoint.xs">
        <v-text-field
          placeholder="Search cities and keywords..."
          dense
          outlined
          hide-details
          style="border: solid 1px #CCCCCC; width: 100%; background: white;"
          v-model="search"
        ></v-text-field>
      </div>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingSearches" type="article, article, article"></v-skeleton-loader>

      <div class="dashboard-box" v-if="!fetchingSearches && searches.length == 0">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3">

            <br /><br /><br /><br />

            <div class="dashboard-box-iconsquare">
              <div class="dashboard-box-icon-background"></div>
              <div class="dashboard-box-icon">
                <i class="mdi mdi-briefcase-outline"></i>
              </div>
            </div>

            <div style="text-align: center;">
              <div class="pt-2 pb-2">
                <strong>No Searches Yet</strong>
              </div>

              <div class="text-sm mb-4 text-gray-600">
                You have no searches yet. Use the dashboard to create searches.
              </div>

              <br />

              <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="$router.push('/dashboard')" style="margin-top: -5px;"><i class="fa fa-plus mr-2"></i> ADD NEW SEARCH</div>
            </div>
            
            <br /><br /><br /><br /><br />
          </div>
        </v-card>
      </div>

      <template v-if="!fetchingSearches && searches.length > 0">

        <div v-if="$vuetify.breakpoint.xs">
          <div v-for="search in searches" :key="search.id" class="dashboard-box mb-4">
            <v-card
              class=""
              tile
            >
              <div class="p-2" style="position: relative;">
                <div v-if="search.status == 'pending'" style="position: absolute; top: 0; right: 2px;">
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

                  <div class="float-left">
                    <v-checkbox
                      :id="search.id+'-checkbox'"
                      :value="search.id"
                      v-model="selectedIds"
                      hide-details
                      :ripple="false"
                    >
                    </v-checkbox>
                  </div>

                  <strong>
                    <span class="text-lg">{{ search.keyword }}</span>  

                    <br />
                    <v-chip
                      class="-mt-2"
                      x-small
                      color="orange lighten-5"
                      text-color="orange lighten-1"
                      v-if="search.status == 'pending'"
                    >
                      pending
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      x-small
                      color="green lighten-5"
                      text-color="green lighten-1"
                      v-if="search.status == 'completed'"
                    >
                      completed
                    </v-chip>

                    <v-chip
                      class="ml-3 -mt-2"
                      x-small
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
        </div>

        <div v-else class="dashboard-box">
          <v-card
            class="pa-2"
            tile
          >
            <div class="p-3">

              <div class="float-left">
                <v-text-field
                  placeholder="Search cities and keywords..."
                  dense
                  outlined
                  hide-details
                  style="border: solid 1px #CCCCCC; width: 300px;"
                  v-model="search"
                >
                  
                </v-text-field>
              </div>

              <div class="justify-between items-start mb-3 float-right">
                <v-menu
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="flex flex-row items-center px-4 py-2 rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer">
                      <span class="mr-2">Actions</span>
                      <span class="text-xs" style="padding-top: 3px;">
                        <font-awesome-icon icon="chevron-down"  />
                      </span>
                    </div>
                  </template>

                  <v-list class="table-menu-actions">
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <br clear="all" />

              <div class="">
                
                <table class="w-full rg-datatable">
                  <thead class="border-b border-gray-100 w-full">
                    <tr>
                      <th></th>
                      <th>Search Term</th>
                      <th>Location</th>
                      <th>Leads Found</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="w-full" style="">
                    <tr v-for="search in searches" :key="search.id">
                      <td>
                        <v-checkbox
                          :id="search.id+'-checkbox'"
                          :value="search.id"
                          v-model="selectedIds"
                          hide-details
                          :ripple="false"
                        >
                        </v-checkbox>
                      </td>
                      <td class="text-bold">{{ search.keyword }}</td>
                      <td class="text-gray-600">{{ search.location }}</td>
                      <td>{{ search.search_results_count }}</td>
                      <td>{{ formatDate(search.created_at) }}</td>
                      <td style="position: relative;">
                        <v-chip
                          class=""
                          small
                          color="orange lighten-5"
                          text-color="orange lighten-1"
                          v-if="search.status == 'pending'"
                        >
                          pending
                        </v-chip>

                        <v-chip
                          class=""
                          small
                          color="green lighten-5"
                          text-color="green lighten-1"
                          v-if="search.status == 'completed'"
                        >
                          completed
                        </v-chip>

                        <div v-if="search.status == 'pending'" style="display: inline-block; margin-left: 10px;">
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
                      </td>
                      <td style="text-align: right;">
                        <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="$router.push('/search/' + search.id)">
                          <i class="fa fa-sign-in-alt mr-2 text-blue"></i>
                          <span class="whitespace-no-wrap text-blue">View RESULTS</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <v-pagination
                    class="mt-2 mb-2"
                    v-model="page"
                    :length="totalFilteredSearches"
                    total-visible="7"
                    circle
                ></v-pagination>
            </div>
          </div>
          </v-card>
        </div>
      </template>

      <!-- <div v-if="!fetchingSearches">

      <div class="flex flex-row flex-wrap mb-3">
          <div class="w-full">
          <div class="w-full mb-4" >
              <div class="bg-gray-100 rounded-b" style="min-height: auto;">

              <div class="p-1">
                  <div v-for="search in searches" :key="search.id" class="border-gray-200 text-sm p-3 text-gray-800 bg-white rounded mb-1">
                  <div style="word-break: break-word;">
                      <strong>
                      <span>{{ search.keyword }}</span>  
                      <span class="text-gray-600" style="font-size: 12px;">
                          in {{ search.location }}
                      </span>

                      <v-chip
                          class="ml-3"
                          small
                          text-color="white"
                          color="orange lighten-2"
                          v-if="search.status == 'pending'"
                      >
                          pending
                      </v-chip>

                      <v-chip
                          class="ml-3"
                          small
                          text-color="white"
                          color="green lighten-2"
                          v-if="search.status == 'completed'"
                      >
                          completed
                      </v-chip>
                      </strong>
                      {{ search.details }}
                      <div class="float-right">
                      <em style="font-size: 12px;">
                          {{ formatDate(search.created_at) }}
                      </em>
                      <br />
                      <router-link :to="'/search/' + search.id">
                          View Results
                      </router-link>
                      </div>
                      <div class="mobile-only mt-1 text-gray-600" style="font-size: 12px; font-style: italic;">
                      <i class="fa fa-calendar"></i> {{ formatDate(search.created_at) }}
                      </div>
                  </div>
                  <div style="clear: both;"></div>
                  <v-progress-linear
                      class="mt-2"
                      color="teal lighten-2"
                      buffer-value="0"
                      stream
                      :value="search.percentage_completed"
                      v-if="search.status == 'pending'"
                  ></v-progress-linear>
                  </div>

                 
              </div>

              </div>
          </div>
          </div>
      </div>
      </div> -->

    </div>
  
  </panel-navigation>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import ReviewsTable from '@/components/ReviewsTable.vue'
import moment from 'moment'
import { GetSuggestions } from '@/utils/PlaceUtils'
import PanelNavigation from '@/components/PanelNavigation.vue'

export default {
    metaInfo () {
        return {
        title: "History | " + this.$appName
        }
    },
  components: {
    ReviewsTable,
    PanelNavigation
  },
  data () {
    return {
      search_keyword: null,
      add_search_error: null,
      
      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],

      savingSearch: false,

      search_location: null,

      searches_interval: null,

      count: 0,
      page: 1,
      itemsPerPage: 10,

      selectedIds: [],

      search: ""
    }
  },
  computed: {
    ...mapState({
      searches: state => state.searches.searches,
      totalFilteredSearches: state => state.searches.totalFilteredSearches,
      fetchingSearches: state => state.searches.fetchingSearches,
    }),
    locationFoundItems () {
      return this.locationEntries
    }
  },
  methods: {
    async bulkDelete() {
      await this.$store.dispatch('searches/bulkDelete', {ids: this.selectedIds})
      this.$store.dispatch('searches/fetch', {
        search: this.search
      })
      this.selectedIds = []
    },

    formatDate: function(date) {
      return moment(String(date)).fromNow()
    },

    dateDifference: function(date) {
      let end = moment();
      var duration = end.diff(moment(date))/1000/60;

      console.log('duration', duration)

      return duration;
    },

    getAddressObject(address_components) {
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
  },
  created() {
    this.$store.state.searches.fetchingSearches = true
    this.$store.dispatch('searches/fetch', {
        search: this.search,
        page: this.page,
        itemsPerPage: this.itemsPerPage
    })

    let self = this;
    this.searches_interval = setInterval(function() {
        self.$store.dispatch('searches/fetch', {
            search: self.search,
            page: self.page,
            itemsPerPage: self.itemsPerPage
        })
    }, 1000);
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
          that.search = false;
          that.step = 1;
        })
    }
  }
}
</script>