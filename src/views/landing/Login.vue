<template>
  <auth-layout :page="'login'" v-if="!$route.query.alt">
    <h1 class="text-xl mb-2 text-bold">Welcome Back</h1>

    <p class="text-xs mb-6">Enter your credentials below to login to your account.</p>

    <div v-if="!loading">
      <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
        {{success}}
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert" v-html="error">
      </div>

      <div class="mb-4">
        <p class="mb-1 text-xs mb-2">Email Address</p>
          <input type="email" ref="email" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" placeholder="e.g. johndoe@example.com" :class="{'opacity-50 cursor-not-allowed': authenticating}" @keyup.enter="$refs.password.focus">
      </div>

      <div class="mb-2">
        <p class="mb-1 text-xs mb-2">Password</p>
          <input type="password" ref="password" class="rg-text-field rg-auth-field block w-full border-0 px-2 py-2 rounded" placeholder="Enter Password" :class="{'opacity-50 cursor-not-allowed': authenticating}" v-on:keyup.enter="submit">
      </div>

      <!-- <div>
        <div class="float-left">
          <v-checkbox v-model="agree" :ripple="false"></v-checkbox>
        </div>

        <div class="float-left pt-1">
          <p class="text-xs">I agree with Local Lead Sniper <a href="/terms-of-service" target="lfp-tos">terms of service</a></p>
        </div>

        <div style="clear: both;"></div>
      </div> -->

      <div class="mb-6">
        <router-link class="no-underline align-baseline font-medium text-xs" to="/forgot-password">Forgot Password?</router-link>
      </div>

      <div class="">

          <button class="w-full rounded bg-blue text-white text-bold text-xs focus:outline-none py-3 px-4" :class="{'spinner': authenticating}" @click="submit">
              LOGIN
          </button>

      </div>

    </div>

    <div v-if="loading" style="text-align: center; padding: 40px;">
      <i class="fa fa-spin fa-spinner" style="font-size: 30px;"></i>
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
      loading: true,
      success: null,
      info: null,
      error: null,
      authenticating: false,
      accountCreated: false,
      needsEmailVerification: false,
      agree: true
    }
  },
  metaInfo () {
    return {
      title: "Login | " + this.$appName
    }
  },
  methods: {
    async submit() {
      // if (!this.agree) {
      //   this.error = 'Please agree to our terms and conditions.'

      //   return;
      // }

      let self = this
      this.authenticating = true
      this.error = null
      this.success = null

      let email = self.$refs.email.value.trim()

      try {
        await this.$store.dispatch("auth/login", { 
          email: this.$refs.email.value.trim(),
          password: this.$refs.password.value.trim()
        })
        window.location = '/dashboard'

        this.$store.state.auth.admin = false
        this.$store.state.auth.admin_jwt_token = ""

        this.$store.state.auth.owner = false
        this.$store.state.auth.owner_jwt_token = ""

      }catch(error){
        console.log(error)
        this.error = 'Given credentials are not valid.'
      }

      this.authenticating = false
    }
  },
  created() {
    let self = this;

    if(this.$route.query.verified) {
      this.success = 'Thank you for confirming your email. You can log in now.'
      this.$router.push('login')
    }

    // Check if we are using a token to auto login, or show the login form by settings this.loading = false
    // Check if we are using a different domain than the 
    if (this.$route.query.alt) {
      let jwt_token = atob(this.$route.query.alt);
      this.$store.state.auth.jwt = jwt_token;

      // Add owner to the state, when agency clicks the "Manage Business" button
      if (this.$route.query.owner) {
        this.$store.state.auth.owner = true
        this.$store.state.auth.owner_jwt_token = this.$route.query.owner_jwt_token
      }
      if (this.$route.query.admin) {
        this.$store.state.auth.admin = true
        this.$store.state.auth.admin_jwt_token = this.$route.query.admin_jwt_token
      }
      else {
        if (!this.$store.state.auth.jwt) {
          this.$store.state.auth.owner = false
          this.$store.state.auth.owner_jwt_token = ""

          this.$store.state.auth.admin = false
          this.$store.state.auth.admin_jwt_token = ""
        }
      }

      this.$router.push('/dashboard');
      
      // this.$store.dispatch('me/fetch').then(function() {
      //   window.location = self.$route.query.redirect ? "/" + self.$route.query.redirect : "/dashboard";
      // });
    }
    else if (this.$route.query.u) {
      // login by UUID

      axios.post(process.env.VUE_APP_API_ENDPOINT + '/login/uuid', {
        u: this.$route.query.u
      } , {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        },
      }).then(function(response) {
        self.$store.state.auth.jwt = response.data.token;

        self.$router.push(self.$route.query.redirect ? "/" + self.$route.query.redirect : "/dashboard");
      });
    }
    else {
      this.loading = false

      let self = this
      setTimeout(function() {
        if (self.$route.query.email)
          self.$refs.email.value = self.$route.query.email
      }, 500);
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