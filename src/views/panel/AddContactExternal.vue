<template>
  <div class="bg-gray-300 min-h-screen">

    <div class="container mx-auto min-h-screen flex justify-center items-top px-3">
        <div class="pb-24 pt-12" style="">

            <div class="external-contact-form-wrapper border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">

                <template v-if="invalidPage">
                    <div style="padding: 50px; text-align: center;">
                        Invalid form.
                    </div>
                </template>

                <template v-else>
                    <template v-if="loadingPage">
                        <div style="padding: 50px; text-align: center;">
                            <i class="fa fa-spin fa-spinner" style="font-size: 30px;"></i>
                        </div>
                    </template>

                    <template v-else>
                          
                        <div class="flex flex-col items-center mb-5">
                          <img v-if="!business" src="@/assets/icon-gray3.png" alt="" style="max-width: 60px;">
                          <span v-if="business" style="color: #616161;">
                            <span v-if="!business.logo">{{ business.company_name }}</span>
                            <img v-if="business.logo" :src="business.logo" alt="" style="max-height: 80px;">
                          </span>
                        </div>
                        
                        <template v-if="contactAdded">
                        <div class="flex flex-col items-center">
                            <img src="@/assets/images/icons/messagesent.svg" class="mb-6" style="max-width:200px;" alt="">
                            <h2 class="text-xl mb-6 text-center font-semibold text-gray-700">We have sent you an email to activate your account</h2>
                        </div>
                        </template>

                        <template v-else>

                        <h1 class="text-2xl mb-6 text-center font-semibold text-gray-700">Add Contact</h1>

                        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            {{success}}
                        </div>

                        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <div v-html="error"> </div>
                        </div>

                        <div class="mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="">First Name</label>
                            <input type="text" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded">
                        </div>

                        <div class="mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="">Last Name</label>
                            <input type="text" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded">
                        </div>

                        <div class="mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="">Email</label>
                            <input type="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded">
                        </div>

                        <div class="mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="">Phone Number</label>
                            <input type="text" ref="phone" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded">
                        </div>

                        <div class="">

                            <button class="w-full rounded bg-green-500 hover:bg-green-400 hover:border-green-500 text-white focus:outline-none py-3 px-4" :class="{'spinner': addingContact}" @click="submit">
                                Add Contact
                            </button>

                        </div>

                        </template>
                    </template>
                </template>
            </div>
        </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'

export default {

  data: function() {
    return {
      success: null,
      info: null,
      error: null,
      addingContact: false,
      loadingPage: true,
      contactAdded: false,
      invalidPage: false,
      business: null
    }
  },
  metaInfo () {
    return {
      title: "Add Contact | " + this.$appName
    }
  },
  methods: {
    async validatePage() {
        this.addingContact = true
        this.error = null

        let formData = new FormData();
        formData.append("uuid", this.$route.params.uuid);

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/validate-external-page`, formData, {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
                'Content-Type': 'multipart/form-data'
            }
        })

        if (response.data.success) {
            this.loadingPage  = false
            this.business = response.data.business
        }
        else {
            this.loadingPage  = false
            this.invalidPage = true
        }

        this.addingContact = false
    },
    
    async submit() {
      this.addingContact = true
      this.error = null
      this.success = null

      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        formData.append("first_name", this.$refs.first_name.value);
        formData.append("last_name", this.$refs.last_name.value);
        formData.append("email", this.$refs.email.value);
        formData.append("phone", this.$refs.phone.value);
        formData.append("uuid", this.$route.params.uuid);

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/add-contact-externally`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        this.success = "Contact added successfully!"

        this.$refs.first_name.value = ''
        this.$refs.last_name.value = ''
        this.$refs.email.value = ''
        this.$refs.phone.value = ''

      } catch (e) {
        this.error = e.response.data.message
      }
      this.addingContact = false

    }
  },
  mounted() {
    this.validatePage();
  },
  watch: {
    
  }
}
</script>

<style type="text/css">
    .external-contact-form-wrapper {
        width: 400px;
    }
</style>