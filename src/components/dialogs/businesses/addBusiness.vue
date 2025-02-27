<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-2/4 lg:w-2/4 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 v-if="!is_business" class="text-lg font-semibold text-gray-800 mb-3">Add a Business</h2>

        <h2 v-if="is_business" class="text-lg font-semibold text-gray-800 mb-3">Add a Location</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    First Name
                </label>
                <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
            </div>

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Last Name
                </label>
                <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
            </div>
        </div>

        <div class="flex flex-wrap -mx-3">
            <div class="w-full px-3 mb-3 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Email Address
                </label>
                <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
            </div>
        </div>

        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-2/2 px-3 mb-1 md:mb-0">
                <p class="text-xs text-gray-700 mt-2">Use our tool below to search for your business online, or enter your details manually.</p>

                <v-combobox
                    :label="((is_business) ? 'Search for location' : 'Business name and main location')"
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

        <div class="flex flex-wrap -mx-3">
          <div :class="'md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Company Name
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-city" type="text" ref="company_name" v-model="company_name">
          </div>

          <div :class="'w-full md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Country
            </label>
            
            <v-select
              :items="countries"
              label=""
              item-text="name"
              item-value="code"
              hide-details
              v-model="business_location.country"
              class="-mt-2"
            ></v-select>
          </div>

          <div :class="'w-full md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Address
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-model="business_location.address">
          </div>
        </div>

        <div class="flex flex-wrap -mx-3">
          <div :class="'w-full md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              City
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-model="business_location.city">
          </div>

          <div :class="'w-full md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              <span v-if="business_location.country == 'US'">State</span>
              <span v-if="business_location.country != 'US'">County</span>
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-model="business_location.state">
          </div>

          <div :class="'w-full md:w-1/3 px-3 mb-6 md:mb-0'">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              <span v-if="business_location.country == 'US'">Zip</span>
              <span v-if="business_location.country != 'US'">Postal Code</span>
            </label>
            <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-model="business_location.zip">
          </div>
        </div>

        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-2/2 px-3 mb-3 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Optional
                </label>
                <v-checkbox
                  v-model="loginEnabled"
                  label="Create Login"
                  value="yes"
                  hide-details
                ></v-checkbox>
            </div>
        </div>

        <div v-if="loginEnabled" class="flex flex-wrap -mx-3">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Password
                </label>
                <input name="password" ref="password" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="password">
            </div>

            <!-- <div class="w-full px-3 mb-6 md:mb-0" style="font-size: 12px;">
                A confirmation link will be sent to the customer to verify their email address.
              </div> -->
        </div>
      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': saving}" @click="save">
            Save
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { GetSuggestions } from '@/utils/PlaceUtils'
import $ from 'jquery'
import countries from '@/config/countries';

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
      success: null,
      error: null,
      loginEnabled: false,

      company_name: "",

      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],

      business_location: {
        country: "US"
      },

      countries: countries
    }
  },
  props: ['is_business'],
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
      this.saving = false
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
    async save() {
      this.saving = true
      this.error = null
      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        formData.append("first_name", this.$refs.first_name.value);
        formData.append("last_name", this.$refs.last_name.value);
        formData.append("company_name", this.company_name);
        formData.append("email", this.$refs.email.value);

        if (this.loginEnabled)
            formData.append("password", this.$refs.password.value);

        formData.append("loginEnabled", this.loginEnabled);

        formData.append("street_number", this.business_location.street_number);
        formData.append("address", this.business_location.address);
        formData.append("city", this.business_location.city);
        formData.append("state", this.business_location.state);
        formData.append("zip", this.business_location.zip);
        formData.append("country", this.business_location.country);
        formData.append("lat", this.business_location.lat);
        formData.append("lng", this.business_location.lng);
        formData.append("place_id", this.business_location.place_id);

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/children/add`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        if (typeof(this.is_business) != "undefined") {
          let response2 = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?id=${response.data.child.id}`, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          window.location = window.location.origin + '/login?alt=' + btoa(response2.data.jwt_token);
        }
        else {
          //this.hide()
          this.hide()
          // this.$store.state.contacts.fetchingContacts = true
          this.$store.dispatch('businesses/fetch')
          this.$store.dispatch('locations/fetch')
          this.error = null

          if (this.$store.state.me.me.company_type == 'agency')
            this.$store.dispatch('stats/fetch')
        }

      } catch (error) {
        console.log(error)
          error.errors = error.response.data.errors
          for (var i in error.errors) {
            if (error.errors[i] != 'null') {
              console.log(error.errors[i]);
              this.error = (this.error || '') + error.errors[i] + "<br />";
            }
          }

      }
      this.saving = false

      // if (typeof(this.is_business) != "undefined")
      //   if (this.$route.name != "locations")
      //     this.$router.push('/locations')
    },
    filterPlaces (item, queryText, itemText) {
      return true
    },
    selectPlace() {
      let that = this

      $.get("https://maps.googleapis.com/maps/api/geocode/json?place_id=" + this.autocompleteLocationModel.id + "&fields=name,rating,formatted_phone_number&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs", function(response) {
        that.company_name = that.autocompleteLocationModel.value.split(",")[0];
        console.log(response.results[0])

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
    }
  },watch: {
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
  }
}
</script>
