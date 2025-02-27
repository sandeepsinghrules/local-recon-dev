<template>
  <auth-layout :page="'forgot'">
    <h1 class="text-xl mb-2 text-bold">
      <span v-if="!success">Almost there...</span>
      <span v-if="success">Done!</span>
    </h1>

    <p class="text-xs mb-6" v-if="!success">Reset your password below.</p>

    <div>
      <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
        {{success}}
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert" v-html="error">
      </div>

      <div v-if="success">
        <div class="mb-6">
          <router-link class="no-underline align-baseline font-medium text-xs" to="/login">Back to login</router-link>
        </div>
      </div>

      <div v-else>

        <div class="mb-4">
          <p class="mb-1 text-xs mb-2">New Password</p>
          
          <input type="password" ref="password" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" placeholder="Enter new password" :class="{'opacity-50 cursor-not-allowed': submitting}">
        </div>

        <div class="mb-4">
          <p class="mb-1 text-xs mb-2">Confirm Password</p>

          <input type="password" ref="password_confirmation" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" placeholder="Re-Enter new password" :class="{'opacity-50 cursor-not-allowed': submitting}">
        </div>


        <div class="">

            <button class="w-full rounded bg-blue text-white text-bold text-xs focus:outline-none py-3 px-4" :class="{'spinner': submitting}" @click="submit">
                RESET PASSWORD
            </button>

        </div>
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
      title: "Reset Password | " + this.$appName
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
        formData.append("email", self.$route.query.email);
        formData.append("password", self.$refs.password.value.trim());
        formData.append("password_confirmation", self.$refs.password_confirmation.value.trim());
        formData.append("token", self.$route.params.token);

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/password/reset`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })

        this.success = "Your password has been reset."

        this.$refs.email.value = ''

      } catch(error) {
          for (var i in error.response.data.errors) {
            if (error.response.data.errors[i] != 'null') {
              this.error = (this.error || '') + error.response.data.errors[i][0] + "<br />";
            }
          }

          console.log(this.error)
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