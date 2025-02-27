<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Connect {{ review_site_name }} Listing</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          {{error}}
        </div>

        <div v-show="review_site_name == 'Google'">
          <div class="mb-1">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Recommended
            </label>

            <v-combobox
                :label="'Search Google Listing'"
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
          </div>
        </div>

        <div>
          <div class="mb-1">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              <span v-if="review_site_name == 'Google'">OR enter </span> URL
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" ref="url" v-model="review_platform_url" :placeholder="'e.g. ' + reviewSitesUrls[review_site.replace('www.', '')]">
          </div>
          <!-- <p class="text-xs text-gray-700">You can add any review platform (Google Maps, Facebook, Tripadvisor etc.)</p> -->

          <div v-if="review_platform_url && !valid_url" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 mt-1" role="alert">
            <div>
              URL is invalid, please enter a valid URL.
              
              <div v-if="current_url_format" class="mt-2">
                <strong>Correct URL format for this platform:</strong>
                <br />
                {{ reviewSitesUrls[review_site.replace("www.", "")] }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button v-if="(review_platform_url && valid_url) || (place_id)" class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': adding}" @click="add">
            Save
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import reviewSitesUrls from '@/config/review_sites/urls';
import { GetSuggestions } from '@/utils/PlaceUtils'
import $ from 'jquery'

export default {
  data: function() {
    return {
      showModal: false,
      adding: false,
      success: null,
      error: null,
      valid_url: false,
      review_platform_url: '',
      current_url_format: '',
      review_site: null,
      review_site_name: null,
      reviewSitesUrls: reviewSitesUrls,
      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],
      place_id: null,
      business_location: {},
      url: null
    }
  },
  computed: {
    locationFoundItems () {
      return this.locationEntries
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.adding = false
    },
    async add() {
      this.adding = true
      this.error = null
      try {
        await this.$store.dispatch('listings/add', {url: this.$refs.url.value || this.url, place_id: this.place_id})
        this.$store.dispatch('listings/fetch', { dashboard: false })
        this.$store.dispatch('me/fetch')
        this.hide()
      } catch (e) {
        console.log(e)
        this.error = e
      }
      this.adding = false
    },
    checkUrlValid() {
      try {
        let parsed_url = new URL(this.review_platform_url)

        let reviewSiteUrl = this.reviewSitesUrls[parsed_url.host.replace("www.", "")]

        if (!reviewSiteUrl) {
          this.valid_url = false;
          return;
        }

        let explodedSlashes1 = reviewSiteUrl.split("/");
        let explodedSlashes2 = this.review_platform_url.split("/");

        if (explodedSlashes1.length - explodedSlashes2.length > 1 || explodedSlashes2.length - explodedSlashes1.length > 1) {
          this.valid_url = false;
          this.current_url_format = reviewSiteUrl;
          return;
        }

        let explodedQuestionMarks1 = reviewSiteUrl.split("?");
        let explodedQuestionMarks2 = this.review_platform_url.split("?");

        if (explodedQuestionMarks1.length != explodedQuestionMarks2.length) {
          this.valid_url = false;
          this.current_url_format = reviewSiteUrl;
          return;
        }

        let explodedAmpersands1 = reviewSiteUrl.split("&");
        let explodedAmpersands2 = this.review_platform_url.split("&");

        if (explodedAmpersands1.length != explodedAmpersands2.length) {
          this.valid_url = false;
          this.current_url_format = reviewSiteUrl;
          return;
        }
      }
      catch(e) {
        this.valid_url = false;
        return;
      }

      this.valid_url = true;
    },
    filterPlaces (item, queryText, itemText) {
      return true
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
    selectPlace() {
      let that = this

      $.get("https://maps.googleapis.com/maps/api/geocode/json?place_id=" + this.autocompleteLocationModel.id + "&fields=name,rating,formatted_phone_number&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs", function(response) {
        that.company_name = that.autocompleteLocationModel.value.split(",")[0];
        that.place_id = that.autocompleteLocationModel.id;

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

        that.url = 'https://www.google.com/search?q=' + encodeURIComponent(that.company_name + ' ' + business_location.address + ' ' + business_location.street_number);
        
        // 'Brooklyn+Burgers+%26+Beer+11215'
        
        that.business_location = business_location;
      });
    }
  },
  watch: {
    "review_platform_url": {
      handler () {
        this.checkUrlValid()
      }
    },
    locationSearchText (newVal) {
      var that = this;

      // If less than 3 chars typed, do not search
      if (!newVal || newVal.length <= 3) return

      // Call the method from the previous section here
      GetSuggestions(newVal)
        .then(function (res) {
          
          that.locationEntries = res
        })
        .catch(function () {
          that.business = false;
          that.step = 1;
        })
    },
  },
  mounted() {
    this.place_id = null
  },
  created() {
    // console.log('review_site', this.review_site)
    // console.log('reviewSitesUrls', this.reviewSitesUrls['facebook.com'])
  }
}
</script>
