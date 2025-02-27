<template>
  <auth-layout :page="'signup'">
    <h1 class="text-xl mb-2 text-bold">Sign up for {{ $appName }}</h1>

    <p v-show="e1 != 3" class="text-xs mb-4">Enter your information below to create your account.</p>

    <div>
      <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
        {{success}}
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <div v-html="error"> </div>
      </div>

      <v-stepper v-model="e1">
        <v-stepper-header style="display: none;">
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            Account Setup
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            Company Information
          </v-stepper-step>

          <v-stepper-step
            :complete="e1 > 3"
            step="3"
          >
            Validate Phone
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
              <div v-if="selected_plan" class="mb-4">
                <p class="mb-1 text-xs mb-2">
                  Plan
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" style="background: rgb(224, 224, 224); font-size: 13px;" type="text" :value="selected_plan.name + '' + ((selected_plan.price == 0) ? ' - 0.00 ' + selected_plan.currency + '/' + selected_plan.frequency : ' - ' + selected_plan.price.toFixed(2) + ' ' + selected_plan.currency + '/' + selected_plan.frequency)" readonly>
              </div>

            <div class="mb-4">
              <p class="mb-1 text-xs mb-2">
                Company Name
              </p>
              <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" id="grid-city" type="text" ref="company_name" v-model="company_name" placeholder="e.g. My Company Inc.">
            </div>

            <div class="mb-4">
              <p class="mb-1 text-xs mb-2">
                  First Name
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" id="grid-first-name" type="text" ref="first_name" placeholder="e.g. John">
            </div>

            <div class="mb-4">
                <p class="mb-1 text-xs mb-2">
                  Last Name
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" id="grid-last-name" type="text" ref="last_name" placeholder="e.g. Doe">
            </div>

            <div class="mb-4">
              <p class="mb-1 text-xs mb-2">Email</p>
                <input type="email" ref="email" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" :class="{'opacity-50 cursor-not-allowed': authenticating}" placeholder="e.g. johndoe@example.com">
            </div>

            <div class="mb-4">
              <p class="mb-1 text-xs mb-2">Phone Number</p>
              <input type="text" ref="phone" v-model="phone" @keyup="phone_valid = false" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" :class="{'opacity-50 cursor-not-allowed': authenticating}" placeholder="e.g. +18123124214">
            </div>

            <div class="mb-4">
                <p class="mb-1 text-xs mb-2">Password</p>
                <input type="password" ref="password" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" :class="{'opacity-50 cursor-not-allowed': authenticating}" autocomplete="new-password" placeholder="Create Password">
            </div>

            <div v-if="company_type == 'agency'">
              <div class="float-left">
                <v-checkbox v-model="agree" :ripple="false"></v-checkbox>
              </div>

              <div class="float-left pt-1">
                <p class="text-xs">By signing up, I agree to the <a href="/terms-of-service" target="rg-tos">Terms of Service</a> & <a href="/privacy-policy" target="rg-privacy">Privacy Policy</a></p>
              </div>
            </div>

            <div class="">

              <button class="w-full rounded bg-blue text-white text-bold text-xs focus:outline-none py-3 px-4" :class="{'spinner': registering}" @click="submit()">
                  CREATE ACCOUNT
              </button>

              <button class="w-full rounded border border-blue bg-white text-primary text-bold text-xs focus:outline-none py-3 px-4 mt-3" @click="e1 = 1">
                  BACK
              </button>

            </div>

          </v-stepper-content>

          <v-stepper-content step="2">

            <div v-show="company_type == 'business'" :class="'w-full ' + ((only_business) ? '' : '') + ' pl-3 mb-3 md:mb-0 -mx-3'">
              <p class="text-xs text-gray-700 mt-2">Use our tool below to search for your business online, or enter your details manually.</p>

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
                  color="grey"
                  background-color="grey lighten-4"
                  @change="selectPlace()"
                  dense
                  outlined
                >
              </v-combobox>
            </div>

            <div class="flex flex-wrap -mx-3 -mt-4">
              

              <div v-if="only_business" :class="'w-full md:w-1/2 pl-3 mb-4 md:mb-0'">
                <p class="mb-1 text-xs mb-2">
                  Country
                </p>
                
                <v-select
                  :items="countries"
                  label=""
                  item-text="name"
                  item-value="code"
                  hide-details
                  outlined
                  dense
                  v-model="business_location.country"
                  class="-mt-2"
                  color="grey"
                ></v-select>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div v-if="only_business" :class="'w-full md:w-1/2 px-3 mb-4 md:mb-0'">
                <p class="mb-1 text-xs mb-2">
                  Address
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" type="text" v-model="business_location.address" placeholder="e.g. 5th Avenue">
              </div>
              <div v-if="only_business" :class="'w-full md:w-1/2 pl-3 mb-4 md:mb-0'">
                <p class="mb-1 text-xs mb-2">
                  City
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" type="text" v-model="business_location.city" placeholder="e.g. New York">
              </div>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div v-if="only_business" :class="'w-full md:w-1/2 pl-3 mb-4 md:mb-0'">
                <p class="mb-1 text-xs mb-2">
                  <span v-if="business_location.country == 'US'">State</span>
                  <span v-if="business_location.country != 'US'">County</span>
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" type="text" v-model="business_location.state" placeholder="e.g. NY">
              </div>

              <div v-if="only_business" :class="'w-full md:w-1/2 pl-3 mb-4 md:mb-0'">
                <p class="mb-1 text-xs mb-2">
                  <span v-if="business_location.country == 'US'">Zip</span>
                  <span v-if="business_location.country != 'US'">Postal Code</span>
                </p>
                <input class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" type="text" v-model="business_location.zip" placeholder="00001">
              </div>
            </div>

            <!-- <div v-if="company_type == 'business'" class="w-full px-3 md:mb-0">
              <v-checkbox
                v-model="pull_google_reviews"
                :label="`Pull my Google reviews`"
              ></v-checkbox>
            </div> -->

            <div v-if="!only_business && 0" class="w-full md:w-1/3 px-3 mb-4 md:mb-0">
              <p class="mb-1 text-xs mb-2">
                Company Type
              </p>
              <div class="relative">
                <select class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" id="grid-state" ref="company_type" v-model="company_type">
                  <option value="agency">Agency</option>
                  <option value="business">Business</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div class="mb-6 pr-3" v-show="company_type == 'agency'">
              <p class="mb-1 text-xs mb-2">Subdomain
                <v-tooltip top color="primary">
                  <template v-slot:activator="{ on, attrs }">
                    <i class="fa fa-question-circle" style="font-size: 16px;"
                      v-bind="attrs"
                      v-on="on"
                    ></i>
                  </template>
                  <span>Choose your your white label subdomain, <br />this will be where your application resides. <br />For example your company name could be HighRepAgency<br /> and your application would be: highrepagency.leadfinder.com<br /> No capitals or special characters are allowed.</span>
                </v-tooltip>

              </p>
                <input type="text" ref="subdomain" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" :class="{'opacity-50 cursor-not-allowed': authenticating}" style="width: calc(100% - 160px); display: inline-block;" placeholder="e.g. digital">
                <input type="text" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" :class="{'opacity-50 cursor-not-allowed': authenticating}" style="margin-left: -3px; width: 160px; display: inline-block; background-color: #e0e0e0;" value=".leadfinder.com" disabled>
            </div>

            <div v-if="company_type == 'agency'">
              <div class="float-left">
                <v-checkbox v-model="agree" :ripple="false"></v-checkbox>
              </div>

              <div class="float-left pt-1">
                <p class="text-xs">By signing up, I agree to the <a href="https://leadfinder.com/terms-of-service/" target="rg-tos">Terms of Service</a> & <a href="https://leadfinder.com/privacy-policy/" target="rg-privacy">Privacy Policy</a></p>
              </div>
            </div>

            <div class="pt-3 pr-3">

                

            </div>

          </v-stepper-content>

          <v-stepper-content step="3">
            <div v-if="!phone_valid">
              <p class="text-xs mb-4 mt-10">A 6 digit code was sent via SMS to your phone number. Please enter the code below in order to validate your phone:</p>

              <div style="text-align: center;">
                <a href="javascript: void(0);" class="text-xs mt-2" @click="sendOtpSms()">+ Resend validation code</a>
              </div>

              <div class="mt-6" style="display: flex; flex-direction: row; justify-content: center; padding-bottom: 20px;">
                <!-- <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator="-"
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  @on-change="handleOnChange"
                  @on-complete="verifyOtp"
                /> -->
              </div>

              <div v-if="verifying_otp" style="text-align: center;">
                <i class="fa fa-spin fa-spinner"></i>
              </div>

              <div v-if="otp_attempted && !verifying_otp && !otp_valid" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                The code you entered is invalid. Please try again by clicking the "+ Resend validation code" link above.
              </div>
            </div>
            <div v-else>
              <v-chip small color="success">
                Validated!
              </v-chip>
            </div>

            <button class="w-full rounded border border-blue bg-white text-primary text-bold text-xs focus:outline-none py-3 px-4 mt-3" @click="e1 = 2">
                BACK
            </button>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <div v-show="e1 == 1" class="mt-6 text-xs">
        Already have an account? <router-link class="no-underline align-baseline font-medium text-xs" to="/login">Login</router-link>
      </div>
    </div>
  </auth-layout>

</template>

<script>
import { mapState } from 'vuex'
import AuthLayout from '@/components/AuthLayout.vue'
import { GetSuggestions } from '@/utils/PlaceUtils'
import $ from 'jquery'
import axios from 'axios'
import countries from '@/config/countries';

export default {
  components: {
    AuthLayout
  },

  data: function() {
    return {
      company_name: "",

      success: null,
      info: null,
      error: null,
      registering: false,
      accountCreated: false,
      authenticating: false,

      company_type: 'agency',
      only_business: false,

      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],

      pull_google_reviews: false,

      business_location: {
        country: "US"
      },

      selected_plan: null,

      countries: countries,

      e1: 1,

      phone: "",
      phone_valid: false,
      verifying_otp: false,
      otp_valid: false,
      otp_attempted: false,
      otp_generated_code: null,

      agree: false
    }
  },
  computed: {
    ...mapState({
      me: state => state.me
    }),
    locationFoundItems () {
      return this.locationEntries
    }
  },
  metaInfo () {
    return {
      title: "Sign Up | " + this.$appName
    }
  },
  methods: {
    async submit(isIgnoreOtp) {
      this.error = null

      if (!this.$agency && !this.agree) {
        this.error = "Please agree to our terms and conditions.";
        return;
      }

      // if (!this.$agency && typeof(isIgnoreOtp) == "undefined") {
      //   this.e1 = 3;

      //   this.sendOtpSms();

      //   return;
      // }

      let self = this
      this.registering = true

      try {
        //await this["auth/signup"]({ first_name: this.first_name, last_name: this.last_name, email: this.email, password: this.password })
        // android/ios chrome autofill fix (access input values directly)

        let params = { 
          company_name: this.company_name.trim() || this.$refs.company_name.value.trim(),
          company_type: this.company_type,
          first_name: this.$refs.first_name.value.trim(),
          last_name: this.$refs.last_name.value.trim(),
          email: this.$refs.email.value.trim(),
          phone: this.$refs.phone.value.trim(),
          password: this.$refs.password.value.trim(),
          pull_google_reviews: this.pull_google_reviews
        };

        if (window.location.origin != process.env.VUE_APP_MAIN_URL)
          params.host = window.location.host

        if (this.selected_plan)
          params.selected_plan = this.selected_plan;

        await this.$store.dispatch("auth/signup", params)

        // self.$router.push('/signup/confirm')

        setTimeout(function() {
          window.location = process.env.VUE_APP_API_ENDPOINT + "/billing/checkout/" + self.$refs.email.value.trim() + "?product=" + self.selected_plan.code + "&origin=" + window.location.origin + "&as=1" + "&tid=" + self.getCookie("_fprom_tid");
        }, 1000);

      }catch(error){
        for (var i in error.errors) {
          if (error.errors[i] != 'null') {
            this.error = (this.error || '') + error.errors[i] + "<br />";
          }
        }
      }

      this.registering = false

    },
    sendOtpSms() {
      let self = this;

      self.verifying_otp = false;
      self.otp_valid = false;
      self.otp_attempted = false;

      self.$refs.otpInput.clearInput();
      
      this.otp_generated_code = Math.floor(100000 + Math.random() * 900000);

      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/signup/send-otp-code`, {
        phone: this.phone,
        otp: btoa(this.otp_generated_code)
      });
    },
    verifyOtp(value) {
      let self = this;
      this.verifying_otp = true;

      if (value == this.otp_generated_code) {
        self.submit(true);
      }
      else {
        self.otp_attempted = true;
        self.verifying_otp = false;
        self.otp_valid = false;
      }
    },
    handleOnChange(value) {

    },
    clearOtp() {
      this.otpInput = "";
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
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

    async getSpecialPlanDetails(plan_id) {
      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/signup/get-special-plan-details`, {
        company_type: this.company_type,
        plan_id: this.$route.params.plan_id,
        agency_email: ((this.$agency) ? this.$agency.email : null)
      })

      this.selected_plan = response.data.plan

      if (!this.selected_plan.currency)
        this.selected_plan.currency = "USD";
      
      if (!this.selected_plan.frequency)
        this.selected_plan.frequency = "month";
    },
  },
  mounted() {

    let self = this
    setTimeout(function() {
      if (self.$agency) {
        // self.$refs.company_type.value = "business"
        self.company_type = "business"
        self.only_business = true
      }

      if (self.$route.params.plan_id)
        self.getSpecialPlanDetails(self.$route.params.plan_id)
    }, 0);

    setTimeout(function() {
      if (self.$route.query.company_name) {
        self.company_name = self.$route.query.company_name
        self.$refs.company_name.value = self.$route.query.company_name
      }

      if (self.$route.query.first_name)
        self.$refs.first_name.value = self.$route.query.first_name

      if (self.$route.query.last_name)
        self.$refs.last_name.value = self.$route.query.last_name

      if (self.$route.query.email)
        self.$refs.email.value = self.$route.query.email

      if (self.$route.query.phone) {
        self.phone = self.$route.query.phone
        self.$refs.phone.value = self.$route.query.phone
      }
    }, 500);

    if (self.$route.params.company_type) {
      if (self.$route.params.company_type == 'b') {
        self.company_type = 'business';
        self.only_business = true
      }
    }
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
    },
    company_name (newVal) {
      if (!this.only_business) {
        function convertToSlug(Text) {
          return Text.toLowerCase()
                    .replace(/ /g, '')
                    .replace(/[^\w-]+/g, '');
        }

        this.$refs.subdomain.value = convertToSlug(newVal);
      }
    }
  }
}
</script>

<style scoped>
  .v-stepper {
    border: 0px !important;
    box-shadow: none !important;
    padding: 0px !important;
  }

  .v-stepper__content {
    padding: 0px !important;
  }
</style>

<style>
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .otp-input.error {
    border: 1px solid red !important;
  }

  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>