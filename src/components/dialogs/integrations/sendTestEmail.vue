<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Send Test Email</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            To Email Address
          </label>
          <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save" placeholder="email@example.com">
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Message
          </label>
          <textarea name="message" ref="message" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" style="border-style: solid; height: 100px;"></textarea>
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Close
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': sending}" @click="save">
            Send
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
      sending: false,
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
      this.sending = false
    },
    async save() {
      this.sending = true
      this.success = null
      this.error = null
      try {

        let formData = new FormData();
        formData.append("email", this.$refs.email.value);
        formData.append("message", this.$refs.message.value);
        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/send-test-email`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        //this.hide()
        // this.hide()
        // this.$store.state.contacts.fetchingContacts = true

        if (response.data.success) {
            this.error = null
            this.$refs.email.value = ''
            this.$refs.message.value = ''

            this.success = "Email sent! Please check your email address and make sure the email was received. If not, please contact us."

        }
        else {
            this.error = "Failed to send email. Please check your settings."
        }

      } catch (e) {
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
