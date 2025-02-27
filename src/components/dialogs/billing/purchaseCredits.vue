<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Purchase One-Time Credits</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mt-1 mb-3">
          {{ commafy(user_amount) }} pay as you go credits for ${{ price_per_1 }} <br />
          Pay as you go credits do not expire <br />
          Purchase as many as you need
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Quantity
          </label>
          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="number" min="1" v-model="quantity">
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Credits
          </label>
          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="number" readonly v-model="credits">
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Amount (USD)
          </label>
          ${{ this.price }}
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': saving}" @click="save">
            Purchase
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
      success: null,
      error: null,
      price: 10,
      price_per_1: 10,
      user_amount: 10000,
      quantity: 1,
      amount: 10,
      credits: 0
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
    async save() {
      this.saving = true
      this.error = null
      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        formData.append("quantity", this.quantity);

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/billing/purchase-credits`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        //this.hide()
        this.hide()

    	this.$store.dispatch('me/fetch')
    	this.error = null

      } catch (e) {
        this.error = e.response.data.message
      }
      this.saving = false
    },
    commafy: function( num ) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    }
  },
  created() {
    this.quantity = 1
    let price_per_10k = 10;
    let initial_amount = 10000
    this.user_amount = this.$store.state.me.me.credits_recharge_amount
    // this.user_amount = 50 // only for debugging

    let thresholds_ratio = this.user_amount / initial_amount

    this.price_per_1 = price_per_10k * thresholds_ratio
    this.price_per_1 = parseFloat(this.price_per_1).toFixed(2)
    this.price = this.quantity * price_per_10k * thresholds_ratio
    this.price = parseFloat(this.price).toFixed(2)
    this.credits = this.quantity * this.user_amount
  },
  watch: {
    quantity: function(val, oldVal) {
      let price_per_10k = 10;
      let initial_amount = 10000
      this.user_amount = this.$store.state.me.me.credits_recharge_amount
      // this.user_amount = 50

      let thresholds_ratio = this.user_amount / initial_amount

      this.price_per_1 = price_per_10k * thresholds_ratio
      this.price_per_1 = parseFloat(this.price_per_1).toFixed(2)
      this.price = this.quantity * price_per_10k * thresholds_ratio
      this.price = parseFloat(this.price).toFixed(2)
      this.credits = this.quantity * this.user_amount
    }
  }
}
</script>
