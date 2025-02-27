<template>

  <panel-navigation>

    <div class="bg-gray-100 flex flex-col justify-center items-center">
      
      <img src="@/assets/images/icons/collecting.svg" alt="" class="mt-12" style="max-width: 200px;">
      <div class="text-center mt-12 mb-6 font-semibold text-green-600 text-lg"><font-awesome-icon icon="check-circle" class="text-green-500 mr-2"/>Success. <span class="text-gray-600">We are importing your contacts now ...</span></div>
      <router-link to="/contacts" class="bg-gray-500 hover:bg-gray-400 text-lg text-white rounded py-3 px-4 mb-12">Go to contacts</router-link>
    </div>

  </panel-navigation>

</template>

<script>
import PanelNavigation from '@/components/PanelNavigation.vue'
import axios from 'axios'

export default {
  metaInfo () {
    return {
      title: "Success | " + this.$appName
    }
  },
  components: {
    PanelNavigation
  },
  async created() {

    switch (this.$route.params.devslug) {
      case 'quickbooks_oauth2':

        try {
          await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/provider/quickbooks_oauth2/callback?code=${this.$route.query.code}&state=${this.$route.query.state}&realmId=${this.$route.query.realmId}`, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })
        }catch(e){
          console.log(e)
        }

        break;
    
      default:
        break;
    }

  }
}
</script>

