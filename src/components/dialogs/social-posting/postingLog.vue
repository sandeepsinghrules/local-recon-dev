<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-3/4 lg:w-1/2 bg-white rounded-lg mx-6" style="max-height: 100%; max-width: 550px;">

      <div class="p-6" style="height: calc(100% - 70px); overflow: hidden;">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">View Posting Log</h2>

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
                        sm="4"
                      >
                        <a href="javascript: void(0);" @click="openSocialUrl(item);" target="view-posting-image"><img :src="item.params.generatedImage" style="width: 120px;" /></a>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="5"
                        class="mt-2"
                      >
                        <img v-if="item.account_type == 'facebook'" src="@/assets/images/review-services/www.facebook.com.png" alt="" class="rounded" style="height: 16px; display: inline-block; vertical-align: top;">
                        <img v-if="item.account_type == 'twitter'" src="@/assets/images/review-services/www.twitter.com.png" alt="" class="rounded" style="height: 16px; display: inline-block; vertical-align: top;">
                        <img v-if="item.account_type == 'google'" src="@/assets/images/review-services/www.google.com.png" alt="" class="rounded" style="height: 16px; display: inline-block; vertical-align: top;">
                        <img v-if="item.account_type == 'instagram'" src="@/assets/images/review-services/www.instagram.com.png" alt="" class="rounded" style="height: 16px; display: inline-block; vertical-align: top;">

                        <strong v-if="item.account_type != 'instagram'" class="ml-1" style="font-size: 14px;">{{ item.account_name }}</strong>

                        <strong v-if="item.account_type == 'instagram'" class="ml-1" style="font-size: 14px;">{{ item.result.username }}</strong>

                        <!-- <span v-if="item.account_type == 'instagram'" class=""> via <img src="@/assets/images/review-services/www.facebook.com.png" alt="" class="rounded" style="height: 16px; display: inline-block; vertical-align: top;"> {{ item.account_name }}</span> -->

                        <div class="">
                          <em class="text-sm text-gray-700">
                            {{ formatDate(item.created_at) }}
                          </em>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="3"
                        class="pt-4"
                        style="text-align: right;"
                      >
                        <a v-if="item.status == 1" href="javascript: void(0);" @click="openSocialUrl(item);"><i class="fa fa-check-circle" style="color: green; font-size: 30px;"></i></a>

                        <v-tooltip v-if="item.status == 0" bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <i class="fa fa-times-circle" v-bind="attrs" v-on="on" style="color: red; font-size: 30px;"></i>
                          </template>
                          <span>{{ item.result.error }}</span>
                        </v-tooltip>
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
import bigInt from 'big-integer';

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

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/get-social-posting-log`,
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
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    },
    openSocialUrl: function(item) {
      let url;
      if (item.account_type == "facebook")
        url = "https://facebook.com/" + item.result.post_id
      else if (item.account_type == "twitter")
        url = item.result.post_url
      else if (item.account_type == "google")
        url = item.result.searchUrl
      else if (item.account_type == "instagram")
        url = item.result.permalink

      window.open(url)
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