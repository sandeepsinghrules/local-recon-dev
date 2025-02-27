<template>

  <panel-navigation>

      <div v-if="profile" class="float-right ml-5 -mt-1">
        <div v-if="profile.settings.role != 'Manager (readonly)'" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="createWidget()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE WIDGET</div>

        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_dashboard'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
      </div>

    <h1 class="text-lg font-semibold mb-3">Local Recon Widgets</h1>

    <hr class="border-b border-gray-100 mb-3">

    <v-skeleton-loader v-if="fetchingWidgets" type="article, article, article"></v-skeleton-loader>

    <div v-if="profile" class="-mx-2">
      <div class="dashboard-box" v-if="!fetchingWidgets && local_recon_widgets.length == 0">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3">

            <br /><br /><br /><br />

            <div class="dashboard-box-iconsquare">
              <div class="dashboard-box-icon-background"></div>
              <div class="dashboard-box-icon">
                <i class="mdi mdi-widgets-outline"></i>
              </div>
            </div>

            <div style="text-align: center;">
              <div class="pt-2 pb-2">
                <strong>No Widgets Yet</strong>
              </div>

              <div v-if="profile.settings.role != 'Manager (readonly)'">

                <div class="text-sm mb-4 text-gray-600">
                  You have no widgets yet. Use our tools to create widgets.
                </div>

                <br />

                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="createWidget()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"></i> CREATE NEW WIDGET</div>

              </div>
            </div>
            
            <br /><br /><br /><br /><br />
          </div>
        </v-card>
      </div>

      <template v-if="!fetchingWidgets && local_recon_widgets.length > 0">

        <div class="flex flex-row flex-wrap mb-4">
          <div v-for="widget in local_recon_widgets" :key="widget.id" class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-4">
            <v-card
              class="pa-2"
              tile
            >
              <div class="p-3">

                <div class="dashboard-box-menu-actions">

                  <div class="dropdown">
                    <i class="mdi mdi-dots-vertical" style="font-size: 14px; cursor: pointer;color: rgb(117, 117, 117);"></i>
                    <div class="dropdown-content">
                      <v-list class="table-menu-actions">
                        <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid)"><span class="table-menu-action-icon"><i class="fa fa-pen"></i></span> Edit</a></v-list-item-title></v-list-item>
                        <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="deleteWidget(widget)"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                      </v-list>
                    </div>
                </div>
                </div>

                <div class="dashboard-box-iconsquare">
                  <div class="dashboard-box-icon-background"></div>
                  <div class="dashboard-box-icon">
                    <i class="mdi mdi-widgets-outline"></i>
                  </div>
                </div>

                <div style="text-align: center;">
                  <div class="pt-2 pb-2">
                    <strong><router-link :to="'/local-recon/widgets/view/' + widget.uuid"><span class="text-gray-900">{{ widget.name }}</span></router-link></strong>
                  </div>

                  <div v-if="profile.settings.role != 'Manager (readonly)'">

                    <div class="text-sm mb-6 text-gray-600">
                      {{ formatDate(widget.created_at) }} · {{ formatTemplate(widget.type) }}
                    </div>

                    <div class="border-1 border-blue bg-white w-full text-blue text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="getEmbedCode(widget)" style="margin-top: -5px;"><i class="fa fa-code mr-2"></i> EMBED CODE</div>

                  </div>
                </div>

              </div>
            </v-card>
          </div>  
        </div>

      </template>
    </div>
  </panel-navigation>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import urlParser from 'url-parse'
import PanelNavigation from '@/components/PanelNavigation.vue'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Local Recon Widgets | " + this.$appName
    }
  },
  components: {
    PanelNavigation
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      profile: state => state.me.profile,
      local_recon_widgets: state => state.local_recon_widgets.local_recon_widgets,
      fetchingWidgets: state => state.local_recon_widgets.fetchingWidgets
    })
  },
  methods: {
    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
    formatTemplate: function(template) {
        if (template == 'default')
            return "Business Audit Widget";

        return template.replace("-", " ");
    },
    createWidget: async function() {
      let self = this
      try {
        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/create', {

        } , {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
        })
        
        self.$router.push('/local-recon/widgets/edit/' + response.data.widget.uuid);
      }catch(e){
        console.log(e)
      }
    },
    getEmbedCode: function(widget) {
      this.$router.push('/local-recon/widgets/edit/' + widget.uuid + "/embed");
    },
    async deleteWidget(widget) {
      // if (this.local_recon) {
        await this.$store.dispatch('local_recon_widgets/delete', widget.id)
        this.$store.dispatch('local_recon_widgets/fetch', { dashboard: false })
      // }
      // else {
      //   await this.$store.dispatch('widgets/delete', widget.id)
      //   this.$store.dispatch('widgets/fetch', { dashboard: false })
      // }
    },
  },
  created() {
    this.$store.state.local_recon_widgets.fetchingWidgets = true
    this.$store.dispatch('local_recon_widgets/fetch', { dashboard: false })
  }
}
</script>

<style scoped>
  input, select {
    border-style: solid;
  }
   /* Style for the dropdown button */
   .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Style for the dropdown content */
    .dropdown-content {
        display: none;
        position: absolute;
        right: 0%;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    /* Show the dropdown content when hovering over the dropdown button */
    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>