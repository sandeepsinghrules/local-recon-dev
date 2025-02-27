<template>
  <auth-layout :page="'forgot'">
    <h1 class="text-xl mb-2 text-bold">Forgot Password?</h1>

    <p class="text-xs mb-6">To reset your password, enter the email you used when you created your account.</p>

    <div>
      <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
        {{success}}
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert" v-html="error">
      </div>

      <div class="mb-4">
        <p class="mb-1 text-xs mb-2">Email Address</p>
        <input type="email" ref="email" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" placeholder="e.g. johndoe@example.com" :class="{'opacity-50 cursor-not-allowed': submitting}" @keyup.enter="$refs.password.focus">
      </div>

      <div class="mb-6">
        <router-link class="no-underline align-baseline font-medium text-xs" to="/login">Back to login</router-link>
      </div>


      <div class="">

          <button class="w-full rounded bg-blue text-white text-bold text-xs focus:outline-none py-3 px-4" :class="{'spinner': submitting}" @click="submit">
              SEND RESET LINK
          </button>

      </div>

    </div>

  </auth-layout>

</template>



<script>

import axios from 'axios'
import AuthLayout from '@/components/AuthLayout.vue'

export default {
  components: {
    AuthLayout
  },

  data: function() {
    return {
      success: null,
      info: null,
      error: null,
      submitting: false
    }
  },
  metaInfo () {
    return {
      title: "Forgot Password | " + this.$appName
    }
  },
  methods: {
    async submit() {
      let self = this
      this.submitting = true
      this.error = null
      this.success = null

      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        formData.append("email", self.$refs.email.value.trim());

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/password/email`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })

        this.success = "We found you. Please check your email and click on the password reset link to reset your password."

        this.$refs.email.value = ''

      } catch (e) {
        this.error = "We did not find your email address in our system."
      }
      this.submitting = false
    }
  },
  mounted() {
    try {
      this.$refs.email.focus()
    }
    catch (e) {}
  }
};
</script>