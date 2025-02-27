<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-3/4 lg:w-3/4 bg-white rounded-lg mx-6" style="max-height: 100%;">

      <div class="p-6" style="height: calc(100% - 70px); overflow: hidden;">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">View Invites Log</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div style="height: calc(100% - 50px); overflow: auto;">
            <div v-if="log_items.length == 0 && !fetching_log">
              Nothing found in the log.
            </div>
            <v-data-table
              v-if="(fetching_log) || (log_items.length > 0 && !fetching_log)"
              :headers="headers"
              :items="log_items"
              :options.sync="options"
              :server-items-length="totalFilteredItems"
              :items-per-page="10"
              class="elevation-1"
              :loading="fetching_log"
              :footer-props="{ disableItemsPerPage : true, itemsPerPageOptions: [5] }"
            >

              <template v-slot:item.log_item="{ item }">
                <div class="reviewer">
                    <!-- <img class="profile-pic" :src="item.profile_picture" v-if="item.profile_picture" /> -->
                    <v-row>
                      <v-col
                        cols="12"
                        sm="2"
                      >
                          <i class="fa fa-user"></i>
                          
                          <strong class="ml-1" style="font-size: 14px;">{{ item.first_name }} {{ item.last_name }}</strong>
                          <br />

                            <div class="mt-1">

                                <v-tooltip v-if="item.responded == 1" bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <i v-bind="attrs" v-on="on" class="fa fa-check-circle" style="color: green; font-size: 30px;"></i>
                                    </template>
                                    <span>Success! Contact responded!</span>
                                </v-tooltip>

                                <v-tooltip v-if="item.responded == 0" bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <i v-bind="attrs" v-on="on" class="fa fa-sync" style="color: orange; font-size: 30px;"></i>
                                    </template>
                                    <span>Pending. Contact has not responded yet...</span>
                                </v-tooltip>
                            </div>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="5"
                        class=""
                      >
                        <div v-if="item.email.length > 0">
                            <div class="" v-for="item_log in item.email" :key="item_log.id">
                                <i class="fa fa-envelope"></i> 
                                <span v-if="item_log.key == 0" class="ml-1">Initial</span>
                                <span v-if="item_log.key == 1" class="ml-1">Secondary</span>
                                <span v-if="item_log.key == 2" class="ml-1">Third</span>
                                :
                                <em class="text-sm text-gray-700">
                                    {{ formatDate(item_log.created_at) }}
                                </em>

                                <v-chip
                                    class="mr-1"
                                    color="blue"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 0"
                                >
                                    sending...
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="blue"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 1"
                                >
                                    sent
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="green"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.clicked == 1"
                                >
                                    clicked
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="orange"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 2"
                                >
                                    scheduled
                                </v-chip>

                                <v-tooltip v-if="item_log.status == 3" bottom class="mr-1">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip
                                            color="red"
                                            text-color="white"
                                            x-small
                                            v-bind="attrs" v-on="on"
                                            style="cursor: pointer;"
                                            @click="retryInvitesLogItem(item_log)"
                                        >
                                            failed
                                        </v-chip>
                                    </template>
                                    <span>{{ item_log.result.error }}. Click to retry</span>
                                </v-tooltip>

                                <v-chip
                                    class="mr-1"
                                    color="purple"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 4"
                                >
                                    retrying...
                                </v-chip>

                                <v-tooltip v-if="item_log.status == 5" bottom class="mr-1">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip
                                            color="gray"
                                            
                                            x-small
                                            v-bind="attrs" v-on="on"
                                        >
                                            canceled
                                        </v-chip>
                                    </template>
                                    <span>Success! Link clicked! Follow up complete.</span>
                                </v-tooltip>

                            </div>
                        </div>

                        <div v-if="item.email.length == 0">
                          <div class="">
                              <i class="fa fa-envelope"></i> Initial: -
                          </div>

                          <div class="">
                              <i class="fa fa-envelope"></i> Secondary: -
                          </div>

                          <div class="">
                              <i class="fa fa-envelope"></i> Third: -
                          </div>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="5"
                        class=""
                      >

                        <div v-if="item.sms.length > 0">
                            <div class="" v-for="item_log in item.sms" :key="item_log.id">
                                <i class="fa fa-envelope"></i> 
                                <span v-if="item_log.key == 0" class="ml-1">Initial</span>
                                <span v-if="item_log.key == 1" class="ml-1">Secondary</span>
                                <span v-if="item_log.key == 2" class="ml-1">Third</span>
                                :
                                <em class="text-sm text-gray-700">
                                    {{ formatDate(item_log.created_at) }}
                                </em>

                                <v-chip
                                    class="mr-1"
                                    color="blue"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 0"
                                >
                                    sending...
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="blue"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 1"
                                >
                                    sent
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="green"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.clicked == 1"
                                >
                                    clicked
                                </v-chip>

                                <v-chip
                                    class="mr-1"
                                    color="orange"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 2"
                                >
                                    scheduled
                                </v-chip>

                                <v-tooltip v-if="item_log.status == 3" bottom class="mr-1">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip
                                            color="red"
                                            text-color="white"
                                            x-small
                                            v-bind="attrs" v-on="on"
                                            style="cursor: pointer;"
                                            @click="retryInvitesLogItem(item_log)"
                                        >
                                            failed
                                        </v-chip>
                                    </template>
                                    <span>{{ item_log.result.error }}. Click to retry</span>
                                </v-tooltip>

                                <v-chip
                                    class="mr-1"
                                    color="purple"
                                    text-color="white"
                                    x-small
                                    v-if="item_log.status == 4"
                                >
                                    retrying...
                                </v-chip>

                                <v-tooltip v-if="item_log.status == 5" bottom class="mr-1">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-chip
                                            color="gray"
                                            
                                            x-small
                                            v-bind="attrs" v-on="on"
                                        >
                                            canceled
                                        </v-chip>
                                    </template>
                                    <span>Success! Link clicked! Follow up complete.</span>
                                </v-tooltip>

                            </div>
                        </div>

                        <div v-if="item.sms.length == 0">
                          <div class="">
                              <i class="fa fa-sms"></i> Initial: -
                          </div>

                          <div class="">
                              <i class="fa fa-sms"></i> Secondary: -
                          </div>

                          <div class="">
                              <i class="fa fa-sms"></i> Third: -
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                </div>
              </template>
          </v-data-table>
        </div>
      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Close
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  props: ['page', 'itemsPerPage'],
  data () {
    return {
      showModal: false,
      headers: [
        { text: 'Log Item', value: 'log_item', html: true, sortable: false }
      ],
      totalFilteredItems: 0,
      totalItems: 0,
      fetching_log: true,
      options: {
        page: 1,
        itemsPerPage: 10,
      },
      log_items: []
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me
    })
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    getLogItems: async function(ignore_loading) {
      const { page, itemsPerPage } = this.options

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/get-invites-log`,
        { 
          page: page,
          itemsPerPage: itemsPerPage
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        }
      )

      this.log_items = response.data.log_items
      this.totalFilteredItems = response.data.totalFilteredItems
      this.totalItems = response.data.totalItems
      this.fetching_log = false

      // Keep refreshing if there are retrying or sending items
      let hasRetryingItems = false
      
      for (var i in this.log_items) {
        let item = this.log_items[i];

        for (var j in item.email) {
          let item_log = item.email[j]
          if (item_log.status == 4 || item_log.status == 0)
            hasRetryingItems = true
        }

        for (var j in item.sms) {
          let item_log = item.sms[j]
          if (item_log.status == 4 || item_log.status == 0)
            hasRetryingItems = true
        }
        // END Keep refreshing if there are retrying or sending items
      }
      console.log(hasRetryingItems);

      let self = this
      if (hasRetryingItems) {
        setTimeout(function() {
          self.getLogItems();
        }, 3000);
      }
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    },
    retryInvitesLogItem: async function(item_log) {
      item_log.status = 4

      const { page, itemsPerPage } = this.options

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/retry-invites-log`,
        { 
          id: item_log.id
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        }
      )

      let self = this
      setTimeout(function() {
        self.getLogItems();
      }, 3000);
    }
  },
  mounted () {
    this.getLogItems()
  },
  watch: {
    options: {
      handler () {
        this.getLogItems()
      }
    }
  }
}
</script>

<style tyle="text/css">
  .v-data-table__progress {
    display: none;
  }
</style>