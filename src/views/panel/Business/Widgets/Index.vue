<template>

  <panel-navigation>

    <h1 class="text-lg font-semibold mb-4">Widgets</h1>

    <hr class="border-b border-gray-100 mb-3">

    <v-skeleton-loader v-if="fetchingWidgets" type="article, article, article"></v-skeleton-loader>

    <div>
      <v-alert
        color="blue-grey"
        dark
        icon="mdi-clock-fast"
        text
        v-if="!fetchingWidgets && widgets.length == 0"
      >
        <img src="@/assets/images/providers/reviewplatforms-collection.png" alt="" class="mt-5" style="max-width: 100px; float: right;">

        Add your first widget
        <br /><br />

        <v-btn
          tile
          color="blue-grey mb-10"
          @click="createWidget()"
        >
        <br />
        <v-icon left>
          mdi-plus
        </v-icon>
          Create First Widget
        </v-btn>
      </v-alert>

      <template v-if="!fetchingWidgets && widgets.length > 0">

        <div class="flex flex-row flex-wrap justify-between items-start mb-6">
          <div class="text-sm mb-4 text-gray-700">Generate widgets to be embedded on your website.</div>
          <div>
            <div class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded cursor-pointer float-left" @click="createWidget()"><i class="fa fa-plus"> </i> Create Widget</div>
          </div>
        </div>

        <div class="mb-6">
          <div v-for="widget in widgets" :key="widget.id" style="float: left; width: 50%;">
            <div class="bg-gray-100 rounded-l flex justify-between rounded w-full mb-2" style="border-right: solid 11px #FFFFFF; padding: 10px;">

              <div class="flex flex-row items-center truncate" style="margin-top: -14px;">
                <div class="truncate p-3 text-gray-400">
                  <router-link :to="'/widgets/edit/' + widget.token"><span class="text-gray-900">{{ widget.name }}</span></router-link>
                  <br />
                  <span class="text-gray-700" style="font-size: 12px;">{{ formatDate(widget.created_at) }} · {{ formatTemplate(widget.template) }}</span>

                  <br />

                  <v-btn
                    color="blue lighten-1"
                    dark
                    small
                    class="mt-2 mr-2"
                    @click="$router.push('/widgets/edit/' + widget.token)"
                  >
                    <i class="fa fa-edit"></i> &nbsp;&nbsp; Edit
                  </v-btn>

                  <v-btn
                    color="purple lighten-3"
                    dark
                    small
                    class="mt-2"
                    @click="getEmbedCode(widget)"
                  >
                    <i class="fa fa-code"></i> &nbsp;&nbsp; Embed Code
                  </v-btn>
                  
                </div>
              </div>

              <menu-widget-actions :widget="widget" class="mr-2">
                <div class="cursor-pointer">
                  <svg class="text-gray-800 fill-current" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 1248v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68V736q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28H800q-40 0-68-28t-28-68V224q0-40 28-68t68-28h192q40 0 68 28t28 68z"/></svg>
                </div>
              </menu-widget-actions>
            </div>
          </div>
          <br clear="all" />
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
import MenuWidgetActions from '@/components/menus/menuWidgetActions.vue'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Widgets | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuWidgetActions
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      widgets: state => state.widgets.widgets,
      fetchingWidgets: state => state.widgets.fetchingWidgets
    })
  },
  methods: {
    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
    formatTemplate: function(template) {
      return template.replace("-", " ");
    },
    createWidget: async function() {
      let self = this
      try {
        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/widgets/create-widget', {

        } , {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
        })
        
        self.$router.push('/widgets/edit/' + response.data.widget.token);
      }catch(e){
        console.log(e)
      }
    },
    getEmbedCode: function(widget) {
      this.$router.push('/widgets/edit/' + widget.token + "/embed");
    }
  },
  created() {
    this.$store.state.widgets.fetchingWidgets = true
    this.$store.dispatch('widgets/fetch', { dashboard: false })
  }
}
</script>

<style>
  input, select {
    border-style: solid;
  }
</style>