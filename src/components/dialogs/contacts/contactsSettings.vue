<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Contacts Settings</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div class="mb-3">
            <div style="float: left;">
                <v-checkbox
                    v-model="me.settings.auto_invite_contacts"
                    :label="'Auto Invite'"
                    hide-details
                ></v-checkbox>
            </div>
          
          <div style="float: left; padding-left: 10px;">
            <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                    <i class="fa fa-question-circle" style="font-size: 16px;"
                        v-bind="attrs"
                        v-on="on"
                    ></i>
                    </template>
                    <span>Enabling auto invite will automatically send an email/SMS invite to the contact when added.</span>
            </v-tooltip>
          </div>

          <br clear="all" />
        </div>

        <hr class="mb-3" />

        <div class="mb-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                <p class="text-xs text-gray-700 mt-2">
                    Ask for a review from someone who was already contacted?
                </p>
            </label>

            <v-radio-group
                class="mt-2"
                row
            v-model="me.settings.reinvite_contacts"
            >
                <v-radio
                label="Yes"
                :value="1"
                ></v-radio>
                <v-radio
                label="No"
                :value="0"
                ></v-radio>
            </v-radio-group>
        </div>

        <div v-show="me.settings.reinvite_contacts == 1" class="mb-3">
            <v-text-field class="auto-posting-frequency" style="width: 120px; margin-top: -30px;"
                v-model="me.settings.reinvite_contacts_days"
                type="number"
                prefix="Wait"
                suffix="days"
                hide-details
                single-line
                min="1"
            ></v-text-field>
            
            <div style="padding-top: 10px;">
                (since last review request to ask contact for another review)
            </div>

            <br clear="all" />
        </div>
      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': saving}" @click="save">
            Save
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
      saving: false,
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
    async save() {
        axios.post(`${process.env.VUE_APP_API_ENDPOINT}/contacts/save-contacts-settings`, {
            auto_invite_contacts: ((this.me.settings.auto_invite_contacts) ? 1 : 0),
            reinvite_contacts: ((this.me.settings.reinvite_contacts) ? 1 : 0),
            reinvite_contacts_days: this.me.settings.reinvite_contacts_days
        }, {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
        })
        
        this.hide()
    	this.$store.dispatch('contacts/fetch')
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