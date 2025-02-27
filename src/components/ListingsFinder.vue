<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="col-md-12">
        <!-- <img src="../assets/images/review-services/www.agoda.com.png"> -->

        <v-combobox
          label="Search for your business"
          v-model="autocompleteLocationModel"
          :items="locationFoundItems"
          :search-input.sync="locationSearchText"
          item-text="value"
          item-value="id"
          hide-no-data
          return-object
          :filter="filterPlaces"
          color="green"
          @change="selectPlace()"
        >
      </v-combobox>

        <v-alert v-if="business === false" border="left" color="red" type="error" light text>We could not find your business.</v-alert>

        <div v-if="step == 2">
          <br />
          <h4>Which websites would you like to monitor?</h4>
          <br />

          <v-btn text v-on:click="selectAllWebsites">
            Select All
          </v-btn>
          /
          <v-btn text v-on:click="selectNoWebsites">
            Select None
          </v-btn>

          <br /><br />
          <v-row id="websitesDiv">
            <v-col v-for="supported_site in supported_sites" :key="supported_site" cols="12" sm="6" md="6" lg="4">
              <v-card>
                <v-card-text>
                  <v-checkbox
                    :value="supported_site"
                    v-model.lazy="selected_sites"
                    hide-details
                  >
                    <template v-slot:label>
                      <img :src="require('../assets/images/review-services/' + supported_site + '.png')">
                      {{ reviewSitesNames[supported_site] }}
                    </template>
                  </v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <br />

          <v-alert v-if="selected_sites.length == 0" border="left" color="red" type="error" light text>Please select at least one website.</v-alert>

          <br /><br />

          <v-btn
            class="ma-2"
            color="success"
            @click="selectWebsites()"
            :disabled="selected_sites.length == 0"
          >
            Find My Listings
          </v-btn>
        </div>

        <div v-if="step == 3">
          <h4>Please wait while we find your review platforms...</h4>
          <v-skeleton-loader
            type="list-item-three-line, list-item-three-line, list-item-three-line, actions"
          ></v-skeleton-loader>
        </div>

        <div v-if="step == 4">
          <h4>The following review platforms were found:</h4>

          <br />

          <div v-for="url in urls_found" :key="url" class="bg-gray-100 rounded-l flex flex-row items-center justify-between bg-white rounded w-full mb-2">
            <div class="flex flex-row items-center truncate">
              <div class="w-12 flex-shrink-0">
                <img :src="getIconUrl(url)" alt="" class="rounded-l border border-gray-100">
              </div>
              <div class="truncate p-3 text-gray-400"><span class="text-gray-900">{{ getHostname(url) }}</span>{{ getPathname(url) }}</div>
            </div>
          </div>

          <br />

          <v-btn
            class="ma-2"
            color="primary"
            :disabled="savingListings"
            @click="reset()"
          >
            Reset
          </v-btn>

          <v-btn
            class="ma-2"
            :loading="savingListings"
            :disabled="savingListings"
            color="success"
            @click="saveListings()"
          >
            Save Platforms
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  /* eslint handle-callback-err: "warn" */
  import { GetSuggestions } from '@/utils/PlaceUtils'
  import urlParser from 'url-parse'

  import BusinessesAPI from '@/plugins/api/endpoints/businesses.js';

  import reviewSites from '@/config/review_sites/list';
  import reviewSitesNames from '@/config/review_sites/names';

  // import axios from '@/plugins/api/axios'

  import $ from 'jquery'

  const all_websites = reviewSites;

  const fake_urls = [
    "https://www.facebook.com/klinehomeexteriors/",
    "https://foursquare.com/v/brooklyn-burgers--beer/5579bd50498e191d31ad8270",
    "https://www.tripadvisor.com/Restaurant_Review-g60827-d9453698-Reviews-Brooklyn_Burgers_and_Beers-Brooklyn_New_York.html",
    "https://www.facebook.com/BrooklynBurgersandBeer/",
    "https://www.amazon.com/gp/customer-reviews/R2NFQ2VFAIGZ3G/ref=cm_cr_arp_d_rvw_ttl?ie=UTF8&ASIN=B003YH9MMI",
    "https://www.amazon.com/dp/B003YH9MMI",
    "https://www.g2.com/products/rubymine/reviews",
    "https://www.yelp.com/biz/iron-horse-coffee-san-francisco-2?hrid=cNc371Fj0V0wyGPJzqs9tQ",
    "https://www.trustradius.com/products/zoom-video-webinar/reviews"
  ];

  export default {
    data () {
      return {
        autocompleteLocationModel: null,
        locationSearchText: null,
        locationEntries: [],
        business: null,
        step: 1,
        selected: false,
        supported_sites: JSON.parse(JSON.stringify(all_websites)),
        selected_sites: JSON.parse(JSON.stringify(all_websites)),
        urls_found: [],
        savingListings: false,
        reviewSitesNames: reviewSitesNames
      }
    },
    computed: {
      locationFoundItems () {
        return this.locationEntries
      }
    },
    methods: {
      selectBusiness(place) {
        this.business = place;
        console.log(this.business);
        this.step = 2;
      },
      selectWebsites() {
        //console.log(this.selected_sites);
        this.step = 3;

        console.log('step three');

        this.searchUrls();
      },
      selectAllWebsites() {
        this.selected_sites = JSON.parse(JSON.stringify(all_websites));
      },
      selectNoWebsites() {
        this.selected_sites = [];
      },
      searchUrls() {
        setTimeout(()=> {
          this.step = 4;
          this.urls_found = this.getRandomItemsFromArray(fake_urls, 4);
          this.business.urls = this.urls_found;
        }, 2000);
      },
      async saveListings() {
        this.savingListings = true;

        for (var i in this.urls_found) {
          try {
            await this.$store.dispatch('listings/add', {url: this.urls_found[i]})
          }
          catch (e) {}
        }

        this.$emit('listingsAdded')
      },
      reset() {
        this.step = 1;
        this.business = null;
        this.autocompleteLocationModel = null;
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
          let business_location = {};
          business_location.street_number = address.street_number;
          business_location.address = address.address;
          business_location.city = address.city;
          business_location.state = address.state;
          business_location.zip = address.zip;
          business_location.country = address.country;

          business_location.lat = response.results[0].geometry.location.lat;
          business_location.lng = response.results[0].geometry.location.lng;
          business_location.place_id = response.results[0].place_id;

          that.business_location = business_location;
        });
      },
      getRandomItemsFromArray(arr, n) {
          var result = new Array(n),
              len = arr.length,
              taken = new Array(len);
          if (n > len)
              throw new RangeError("getRandom: more elements taken than available");
          while (n--) {
              var x = Math.floor(Math.random() * len);
              result[n] = arr[x in taken ? taken[x] : x];
              taken[x] = --len in taken ? taken[len] : len;
          }
          return result;
      },
      getHostname(url) {
        return urlParser(url).hostname.replace("www.", "")
      },
      getPathname(url) {
        return urlParser(url).pathname
      },
      getIconUrl(url) {

        return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");

      },
    },
    watch: {
      locationSearchText (newVal) {
        var that = this;

        // If less than 3 chars typed, do not search
        if (!newVal || newVal.length <= 3) return

        // Call the method from the previous section here
        GetSuggestions(newVal)
          .then(function (res) {
            if (!res) {
              that.business = false;
              that.step = 1;
              return;
            }

            that.locationEntries = res;
          })
          .catch(function () {
            that.business = false;
            that.step = 1;
          })
      },
    }
  }
</script>


<style>
  #websitesDiv, #urlsDiv {
      max-height: 450px;
      overflow: auto;
  }

  #websitesDiv img {
    width: 42px;
    height: 42px;
    margin-right: 5px;
  }

  #websitesDiv .v-input__slot {
    margin-bottom: 0px;
  }

  #websitesDiv .v-card__text {
    padding: 12px;
  }

  .v-input--selection-controls {
    margin-top: 0px !important;
    padding-top: 0px !important;
  }

  .v-card {
    text-align: left;
  }

  .url-link {
    text-decoration: none;
  }

  .source-logo-fider {
    float: left;
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
</style>
