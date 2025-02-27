<template>
  <div>
    <landing-navigation />
    <div class="container mx-auto px-6 py-24">

      <h1 class="text-xl mb-4">Contact</h1>

      <p class="mb-8">Send us an email at <a class="text-green-500" href="mailto:support@Lead Finder.com">support@Lead Finder.com</a>, twitter us at <a class="text-green-500" href="https://twitter.com/Lead Finder">@Lead Finder</a> or use the form below.</p>

      <template v-if="!submitted">
        <input type="text" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded mb-4" style="max-width: 400px;" ref="email" placeholder="Your email"
        >
        <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded mb-8" maxlength="1000" style="max-width: 600px;" ref="body" placeholder="Your message"></textarea>

        <button @click="submit" class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-400" :class="{'spinner': submitting}">Send message</button>
      </template>

      <template v-else>
        <div>Thank you for your message. We will get back to you soon.</div>
      </template>

    </div>
    <landing-footer></landing-footer>
  </div>
</template>

<script>
import LandingNavigation from '@/components/LandingNavigation.vue'
import LandingFooter from '@/components/LandingFooter.vue'
import axios from 'axios'

export default {
  components: {
    LandingNavigation,
    LandingFooter
  },
  metaInfo () {
    return {
      title: "Contact | " + this.$appName
    }
  },
  data() {
    return {
      submitting: false,
      submitted: false
    }
  },
  methods: {
    async submit() {

      this.submitting = true

      try {
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contact-form`, {
          email: this.$refs.email.value,
          body: this.$refs.body.value
        })
        this.submitted = true
      }catch(e){
        console.log(e)
      }

      this.submitting = false

    }
  }
};
</script>

<style>
  input, textarea {
    border-style: solid;
  }
</style>