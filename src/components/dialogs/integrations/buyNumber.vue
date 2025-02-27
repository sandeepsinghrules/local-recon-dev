<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="rg-modal-header">
        <span>Buy Phone Number</span>

        <a href="javascript: void(0);" class="rg-modal-close-btn" @click="hide"><i class="fa fa-times"></i></a>
      </div>

      <div class="p-6">
        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mb-3">
          <p class="mb-1 text-xs mb-2"><strong>Country</strong></p>
          <v-select
            :items="countries"
            label=""
            item-text="name"
            item-value="code"
            hide-details
            v-model="country"
            class="-mt-2"
            dense
            outlined
          ></v-select>
        </div>

        <div class="mb-3">
          <p class="mb-1 text-xs mb-2"><strong>Area Code</strong></p>

          <input name="text" ref="area_code" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
        </div>

        <div v-if="numbers_found.length > 0" style="font-size: 12px;">
            <div v-for="(item, index) in numbers_found" :key="index">
                {{ item }}

                <a href="javascript: void(0);" class="float-right" @click="buyNumber(item)">Buy</a>

                <div style="clear: both; margin-top: 3px; margin-bottom: 3px;"></div>

                <hr />
            </div>
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right" :class="{'spinner': sending}" @click="save">
            SEARCH
        </button>

        <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="hide">
            CANCEL
        </button>

        <div class="clearfix"></div>

      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import countries from '@/config/countries';

export default {
  props: ['inbox'],

  data: function() {
    return {
      showModal: false,
      sending: false,
      success: null,
      error: null,

      country: "US",

      countries: countries,

      numbers_found: []
    }
  },

  computed: {
    ...mapState({
      me: state => state.me.me
    })
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.sending = false
    },
    async save() {
      this.sending = true
      this.success = null
      this.error = null
      try {

        let formData = new FormData();
        formData.append("country", this.country);
        formData.append("area_code", this.$refs.area_code.value);

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/search-phone-numbers`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        //this.hide()
        // this.hide()
        // this.$store.state.contacts.fetchingContacts = true

        this.numbers_found = response.data.numbers;

      } catch (e) {
        for (var i in e.response.data.errors) {
            if (e.response.data.errors[i] != 'null') {
              console.log(e.response.data.errors[i]);
              this.error = (this.error || '') + e.response.data.errors[i] + "<br />";
            }
        }
      }
      this.sending = false
    },
    async buyNumber(phoneNumber) {
      this.sending = true
      this.success = null
      this.error = null
      try {

        let formData = new FormData();
        formData.append("phoneNumber", phoneNumber);

        if (this.inbox)
          formData.append("inbox", 1);

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/buy-number`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        this.hide()


        if (this.inbox) {
          window.location = window.location.href;
        }
        else {
          this.$parent.$parent.getTwilioNumbers();
        }

      } catch (e) {
        console.log(e);
        for (var i in e.response.data.errors) {
            if (e.response.data.errors[i] != 'null') {
              console.log(e.response.data.errors[i]);
              this.error = (this.error || '') + e.response.data.errors[i] + "<br />";
            }
        }
      }
      this.sending = false
    }
  }
}
</script>
