<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Connect Stripe</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          {{error}}
        </div>

        <div class="mb-1">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            API Key
          </label>
          <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" ref="apikey">
        </div>
        <p class="text-xs text-gray-700">Stripe API Key with READ permission for customers.</p>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': connecting}" @click="connect">
            Connect
        </button>

      </div>



    </div>
  </div>

</template>

<script>
export default {
  data: function() {
    return {
      showModal: false,
      connecting: false,
      success: null,
      error: null
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.connecting = false
    },
    async connect() {
      this.connecting = true
      this.error = null
      try {
        await this.$store.dispatch('integrations/add', {providerId: 1, config: { apikey: this.$refs.apikey.value }})
        this.$store.dispatch('integrations/fetch')
        //this.hide()
        this.$router.push('/provider/stripe_api/success')
      } catch (e) {
        this.error = e
      }
      this.connecting = false
    }
  }
}
</script>
