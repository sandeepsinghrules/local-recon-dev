<template>
  <div class="bg-gray-300 min-h-screen">

    <div class="container mx-auto min-h-screen flex justify-center items-top px-3">
        <div class="pb-24 pt-12" style="">
            
            <div class="flex flex-col items-center">
              <router-link :to="(($agency) ? '/signup/confirm' : '/')" class="mb-12">
                <img v-if="!$agency" src="@/assets/icon-gray3.png" alt="" style="max-width: 60px;">
                <span v-if="$agency" style="color: #616161;">
                  <span v-if="!$agency.logo">{{ $agency.company_name }}</span>
                  <img v-if="$agency.logo" :src="$agency.logo" alt="" style="max-height: 80px;">
                </span>
                <!-- <img src="@/assets/icon-gray3.png" alt="" style="max-width: 120px;" class="mb-12">  -->
              </router-link> 
            </div>

            <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">

                <template>
                  <div class="flex flex-col items-center">
                    <img src="@/assets/images/icons/messagesent.svg" class="mb-6" style="max-width:200px;" alt="">
                    <h2 class="text-xl mb-6 text-center font-semibold text-gray-700">We have sent you an email to activate your account</h2>
                  </div>
                </template>
                
            </div>
            <div class="text-center">
                <p class="text-gray-600 text-sm">Already have an account? <router-link to="/login" class="no-underline text-blue font-bold">Login</router-link>.</p>
            </div>
        </div>
    </div>

  </div>

</template>

<script>

export default {

  data: function() {
    return {
    }
  },
  metaInfo () {
    return {
      title: "Sign up confirmation | " + this.$appName
    }
  },
  methods: {
  }
}
</script>