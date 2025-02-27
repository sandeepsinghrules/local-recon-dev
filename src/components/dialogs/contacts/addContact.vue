<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Add a Contact</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            First Name
          </label>
          <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Last Name
          </label>
          <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
        </div>

        <!-- <p class="text-xs text-gray-700 mb-4">Your contact's name.</p> -->

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Email
          </label>
          <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
        </div>

        <!-- <p class="text-xs text-gray-700 mb-4">Your contact's email.</p> -->

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Phone Number
          </label>
          <input name="phone" ref="phone" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
        </div>

        <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

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

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
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
      this.saving = false
    },
    async save() {
      this.saving = true
      this.error = null
      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        formData.append("first_name", this.$refs.first_name.value);
        formData.append("last_name", this.$refs.last_name.value);
        formData.append("email", this.$refs.email.value);
        formData.append("phone", this.$refs.phone.value);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/contacts`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        //this.hide()
        this.hide()
        // this.$store.state.contacts.fetchingContacts = true
    	this.$store.dispatch('contacts/fetch')
    	this.error = null

      } catch (e) {
        this.error = e.response.data.message
      }
      this.saving = false
    }
  }
}
</script>
