<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-col items-center justify-top px-4" style="background-color: rgba(0,0,0,.3);">
    <div class="w-full bg-white shadow rounded-lg mx-6 mt-24" style="max-width: 500px;">

    <div class="p-6">
      <input type="text" class="card-holder-name block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-3 rounded mb-3" style="line-height:1.25" ref="cardHolderName" placeholder="Cardholder name">

      <card class="credit-card block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-3 rounded mb-5"
        :class="{ complete }"
        :stripe="stripePublishableKey"
        :options="stripeOptions"
        @change="complete = $event.complete"
      />

      <button class="w-full rounded bg-green-500 hover:border-green-500 text-white focus:outline-none py-2 px-4" :class="{'spinner': subscribing, 'opacity-50': !complete, 'hover:bg-green-400': complete}" @click="pay" :disabled='!complete'>
          Subscribe for {{ price }}
      </button>

    </div>



    </div>
  </div>

</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import axios from 'axios'

export default {
  props: {
    plan: String,
    price: String
  },
  data: function() {
    return {
      showModal: false,
      complete: false,
      subscribing: false,
      stripePublishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      stripeOptions: {
        style: {
          base: {
            color: 'black',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: '#A3A3A3'
            },
          },
        }
      }
    }
  },
  components: {
    Card
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    async pay() {
      this.subscribing = true
      try {
        let response = await createToken({name: this.$refs.cardHolderName.value})


        //console.log(response.token)
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stripe/create`, {
          token: response.token,
          plan: this.plan
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })

        this.$store.dispatch('me/fetch')
        this.hide()
        //console.log(token)
      }catch(e){
        console.log(e)
      }
      this.subscribing = false
    }

  },
  created() {

  }
}
</script>

<style scoped>

.card-holder-name::placeholder {
  opacity: 1.0
}

.credit-card .InputElement {
  color: red;
}

</style>
