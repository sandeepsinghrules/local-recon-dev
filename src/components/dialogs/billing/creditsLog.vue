<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-3/4 lg:w-3/4 bg-white rounded-lg mx-6" style="max-height: 100%;">

      <div class="p-6" style="height: calc(100% - 70px); overflow: hidden;">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">View Credits Log</h2>

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
                    <i v-if="item.direction == 'incoming'" class="fa fa-arrow-down" style="color: blue;"></i>

                    <i v-if="item.direction == 'outgoing'" class="fa fa-arrow-up" style="color: orange;"></i>

                    {{ item.message }}

                    <br />
                    <em class="text-sm text-gray-700">
                        {{ formatDate(item.created_at) }}
                    </em>

                    <span v-if="item.direction == 'incoming'">
                        <span v-if="item.amount > 0">&nbsp;&nbsp;|&nbsp;&nbsp; Cost: <strong>${{ item.amount }}</strong></span>
                        &nbsp;&nbsp;|&nbsp;&nbsp; Credits Increase: <strong>{{ commafy(item.credits_amount) }}</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp; Balance: <strong>{{ commafy(item.current_balance) }}</strong>
                    </span>

                    <span v-if="item.direction == 'outgoing'">
                        &nbsp;&nbsp;|&nbsp;&nbsp; Credits Deduction: <strong>{{ commafy(item.credits_amount) }}</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp; Balance: <strong>{{ commafy(item.current_balance) }}</strong>
                    </span>

                    <div class="float-right">
                        <i v-if="item.status == 1" class="fa fa-check-circle" style="color: green; font-size: 30px;"></i>

                        <v-tooltip v-if="item.status == 0" bottom>
                            <template v-slot:activator="{ on, attrs }">
                            <i class="fa fa-times-circle" v-bind="attrs" v-on="on" style="color: red; font-size: 30px;"></i>
                            </template>
                            <span>{{ item.error }}</span>
                        </v-tooltip>
                    </div>
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

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/billing/get-credits-log`,
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
    commafy: function( num ) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
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