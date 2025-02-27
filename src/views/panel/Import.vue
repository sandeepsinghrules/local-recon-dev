<template>

  <div>

    <dialog-integration-stripe ref="dialogStripe"></dialog-integration-stripe>
    <dialog-integration-sevdesk ref="dialogSevdesk"></dialog-integration-sevdesk>
    <dialog-integration-csvfile ref="dialogCsvFile"></dialog-integration-csvfile>
    
    <panel-navigation>


      <div class="flex flex-wrap">
        

        

        <div class="w-full md:w-1/2 mb-8">
          <h2 class="text-lg font-semibold mb-2">Import Contacts</h2>
          <hr class="border-b border-gray-100">
          <p class="text-sm mb-4 text-gray-700">Import your from a CSV file.</p>
          <div class="">

            <div @click="$refs.dialogCsvFile.show()" class="bg-super-light border-2 rounded w-40 float-left mr-2 mb-2 zoom cursor-pointer" >
              <div class="text-gray-600 overflow-hidden flex flex-row items-center justify-center">
                <img src="@/assets/images/providers/icons/icon-csv.png" alt="" class="rounded my-2" style="height: 50px;">
              </div>
              <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">Import</div>
            </div>

            <!-- <div @click="connectXero" class="bg-super-light border-2 rounded w-40 float-left mr-2 mb-2 zoom cursor-pointer" >
              <div class="text-gray-600 overflow-hidden flex flex-row items-center justify-center">
                <img src="@/assets/images/providers/icons/icon-xero.png" alt="" class="rounded my-2" style="height: 50px;">
              </div>
              <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">Xero</div>
            </div> -->

            <div class="clearfix"></div>
          </div>

        </div>

      </div>





    </panel-navigation>

  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
// import MenuIntegrationActions from '@/components/menus/menuIntegrationActions.vue'
import DialogIntegrationStripe from '@/components/dialogs/dialogIntegrationStripe.vue'
import DialogIntegrationSevdesk from '@/components/dialogs/dialogIntegrationSevdesk.vue'
import DialogIntegrationCsvfile from '@/components/dialogs/dialogIntegrationCsvFile.vue'

export default {
  metaInfo () {
    return {
      title: "Import | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    // MenuIntegrationActions,
    DialogIntegrationStripe,
    DialogIntegrationSevdesk,
    DialogIntegrationCsvfile
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState({
      integrations: state => state.integrations.integrations
    }),
    connectedIntegrations() {
      return this.integrations.filter(integration => !integration.temporary)
    }
  },
  methods: {
    async connectXero() {
      try {
        let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/provider/xero_oauth1/authorise_url`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        window.location = response.data.url
      }catch(e){
        console.log(e)
      }
    },

    async connectQuickbooks() {
      try {
        let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/provider/quickbooks_oauth2/authorise_url`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        window.location = response.data.url
      }catch(e){
        console.log(e)
      }
    }

  },
  created() {
    this.$store.dispatch('integrations/fetch')
  }
}
</script>

<style lang="scss" scoped>
/*
.integrations {
  .integration {
    width: 160px;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: transform .2s;
    cursor: pointer;

    border-radius: 5px;
    opacity: 0.8;

    &:hover {
      transform: scale(1.05);
      opacity: 1.0;
    }

    .integration-icon {
      height: 60px;
      background-color: rgb(247, 247, 247);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(221, 221, 221);
      font-size: 34px;
      
    }

    .integration-title {
      background-color: rgb(243, 243, 243);
      text-align: center;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      color: rgb(114, 114, 114);
    }
  }
}*/
</style>


