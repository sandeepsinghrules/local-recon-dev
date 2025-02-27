<template>

  <div>
    <dialog-add-business ref="dialogAddBusiness"></dialog-add-business>

    <panel-navigation>
      <div class="float-right">
          <v-select class="agencies-filter"
              v-model="sort_by"
              flat
              solo-inverted
              hide-details
              :items="agencies_sort_items"
              item-value='id'
              item-text='text'
              prepend-inner-icon="mdi-office-building-outline"
              label="Show all Agencies"
          ></v-select>
      </div>

      <h1 class="text-lg font-semibold mb-4">Agencies</h1>

      <hr class="border-b border-gray-100 mb-3">

      <div class="text-md text-gray-600 float-right mb-2" style="word-break: break-all">
        <strong>Free Plan Signup URL:
        <br class="mobile-only" />  
        <a href="javascript: void(0);" v-clipboard:copy="getFreeSignupUrl()" v-clipboard:success="onCopy" v-clipboard:error="onError">{{ getFreeSignupUrl() }}</a> </strong>
      </div>
      <br clear="all" />

      <v-skeleton-loader v-if="fetchingBusinesses" type="article, article, article"></v-skeleton-loader>

      <template v-if="!fetchingBusinesses && businesses.length == 0">
        <v-alert
          color="blue-grey"
          dark
          icon="mdi-clock-fast"
          text
          v-if="!fetchingBusinesses && businesses.length == 0"
        >
          <i class="fa fa-briefcase" style="font-size: 50px; float: right;"></i>

          You have no businesses.
          <br /><br />

          <v-btn
            tile
            color="blue-grey mb-10"
            @click="$refs.dialogAddBusiness.show()"
          >
          <br />
          <v-icon left>
            mdi-plus
          </v-icon>
            Add First Business
          </v-btn>
        </v-alert>

      </template>

      <template v-if="!fetchingBusinesses && businesses.length > 0">

        <!-- <div class="justify-between items-start mb-3">
          <menu-business-actions
            @delete="bulkDelete"

            class="float-left"
            >

            <div class="flex flex-row items-center px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
              <span class="mr-2">Actions</span>
              <span class="text-xs" style="padding-top: 3px;">
                <font-awesome-icon icon="chevron-down"  />
              </span>
            </div>

          </menu-business-actions>

        </div>

        <br clear="all" /><br clear="all" /> -->

        <div class="overflow-x-scroll">

        <table class="w-full agencies-table">
          <thead class="border-b border-gray-100 w-full">
            <tr>
              <!-- <th></th> -->
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Agency</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Businesses</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Domain</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Added</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Plan</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="w-full" style="">
            <tr v-for="business in sortedBusinesses" :key="business.id" class="hover:bg-gray-100">
              <!-- <td class="border-l px-2">
                <input class="styled-checkbox" :id="business.id+'-checkbox'" type="checkbox" v-model="selectedBusinessIds" :value="business.id">
                <label :for="business.id+'-checkbox'"></label>
              </td> -->
              <td class="py-2 text-sm pl-2">
                <strong class="company-name">{{ business.company_name }}</strong>
                <br class="not-mobile" />
                <span class="mobile-only">&nbsp;&nbsp;&nbsp;</span>
                {{ business.email }}
              </td>
              <td class="py-2 text-sm pl-2"><span class="mobile-only"><i class="fa fa-briefcase"></i> </span> {{ business.businesses_count }} <span class="mobile-only">businesses</span></td>
              <td class="py-2 text-sm pl-2">
                <div class="mobile-only float-left" style="padding-right: 5px;"><i class="fa fa-globe"></i></div>

                <div v-if="!business.domain">-</div>

                <div v-if="business.domain">
                  <span style="font-size: 16px; font-weight: bold;">{{ business.domain }}</span>

                  <!-- <span v-if="business.domain && !show_subdomain_field" style="padding-left: 10px; font-size: 12px;">(click to edit)</span> -->

                  <div v-if="business.domain">
                    <div class="text-sm text-gray-600" style="display: inline-block;">
                      <span class="mobile-only">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Valid: 
                      <i v-if="business.domain_status == 1" class="fa fa-check-circle" style="color: green; font-size: 20px;"></i>
                      <i v-if="business.domain_status == 0" class="fa fa-times-circle" style="color: red; font-size: 20px;"></i>
                      &nbsp;&nbsp;&nbsp;
                      SSL: 
                      <i v-if="business.ssl_status == 1" class="fa fa-check-circle" style="color: green; font-size: 20px;"></i>
                      <i v-if="business.ssl_status == 0" class="fa fa-times-circle" style="color: red; font-size: 20px;"></i>

                      <div v-if="business.ssl_status == 1"><span class="mobile-only">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Expiration: {{ formatDate(business.ssl_expiration) }}</div>

                      <v-chip
                        v-if="isSSLExpiring(business)"
                        class="mt-2"
                        color="orange"
                        text-color="white"
                        small
                      >
                        Expiring Soon!
                      </v-chip>
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-2 text-sm pl-2"><span class="mobile-only"><i class="fa fa-calendar"></i></span> {{ formatDate(business.created_at) }}</td>
              <td class="py-2 text-sm pl-2">
                <span class="mobile-only"><i class="fa fa-credit-card"></i></span>
                <span v-if="business.subscription">
                  {{ business.subscription.product_details.name }}
                  <br class="not-mobile" />
                  <strong>${{ business.subscription.product_details.price.toFixed(2) }}/mo</strong>
                  <br class="not-mobile" />

                  <v-chip
                    v-if="business.subscription.stripe_status == 'pending'"
                    class=""
                    small
                    color="orange"
                    text-color="white"
                  >
                    {{ business.subscription.stripe_status }}
                  </v-chip>

                  <v-chip
                    v-else-if="business.subscription.stripe_status == 'active'"
                    class=""
                    small
                    color="green"
                    text-color="white"
                  >
                    {{ business.subscription.stripe_status }}
                  </v-chip>

                  <v-chip
                    v-else
                    class=""
                    small
                    color="gray"
                  >
                    {{ business.subscription.stripe_status }}
                  </v-chip>
                </span>

                <span v-if="!business.subscription">
                  -
                </span>
                
              </td>
              <td class="border-b border-r border-gray-100 pl-2">
              <div class="">
                <div class="action-button bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center hover:bg-orange-200 mr-2" @click="manageAccount(business)">
                  <i class="fa fa-sign-in-alt mr-2"></i>
                  <span class="whitespace-no-wrap">Manage Agency</span>
                </div>

                <div v-if="!business.subscription" class="action-button bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center hover:bg-orange-200 mr-2 mt-1" @click="enableFreeAccess(business)">
                  <i class="fa fa-check mr-2"></i>
                  <span class="whitespace-no-wrap">Enable Free Access</span>
                </div>

                <div v-if="business.subscription && business.subscription.stripe_price == 0" class="action-button bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center hover:bg-orange-200 mr-2 mt-1" @click="removeFreeAccess(business)">
                  <i class="fa fa-times mr-2"></i>
                  <span class="whitespace-no-wrap">Remove Free Access</span>
                </div>

                <div v-if="isSSLExpiring(business)" class="mt-3">
                  <div class="action-button bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center hover:bg-orange-200 mr-2" @click="renewSSL(business)">
                    <i class="fa fa-globe mr-2"></i>
                    <span class="whitespace-no-wrap">Renew SSL</span>
                  </div>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </template>

    </panel-navigation>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuBusinessActions from '@/components/menus/menuBusinessActions.vue'
import dialogAddBusiness from '@/components/dialogs/businesses/addBusiness.vue'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Businesses | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuBusinessActions,
    dialogAddBusiness
  },
  data() {
    return {
      selectedBusinessIds: [],
      sort_by: 1,
      agencies_sort_items: [
        {id: 1, text: 'Show all Agencies'},
        {id: 2, text: 'Sort by SSL Expiration'}
      ],
    }
  },
  computed: {
    ...mapState({
      businesses: state => state.businesses.businesses,
      fetchingBusinesses: state => state.businesses.fetchingBusinesses,
      me: state => state.me.me
    }),
    sortedBusinesses() {
      // return this.businesses.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      return this.businesses
    }
  },
  methods: {
    async bulkDelete() {
      console.log(this.selectedBusinessIds)
      await this.$store.dispatch('businesses/bulkDelete', {businessesIds: this.selectedBusinessIds})
      this.$store.dispatch('businesses/fetch')
      this.selectedBusinessIds = []
      this.$store.dispatch('locations/fetch')
      
      if (this.me.company_type == 'agency')
        this.$store.dispatch('stats/fetch')
    },

    async manageAccount(business) {
      let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?id=${business.id}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      // this.$router.push({ name: 'login', query: {alt: btoa(response.data.jwt_token), admin: true, admin_jwt_token: btoa(this.$store.state.auth.jwt) }});
      window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token) + "&admin=true&admin_jwt_token=" + btoa(this.$store.state.auth.jwt);
    },

    formatDate(date) {
      return moment(date).format("MMM D, YYYY")
    },

    isSSLExpiring(business) {
      if (!business.ssl_expiration)
        return false

      let moment_expiring = moment(new Date(business.ssl_expiration))
      let moment_10days = moment().add(10, 'd')
      
      if (moment_10days.unix() > moment_expiring.unix())
        return true

      return false
    },

    async renewSSL(business) {
      this.$store.state.businesses.fetchingBusinesses = true

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/admin/renew-ssl`, {
          id: business.id
        },
        {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$store.dispatch('businesses/fetch')
    },

    async enableFreeAccess(business) {
      this.$store.state.businesses.fetchingBusinesses = true

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/admin/enable-free-access`, {
          id: business.id
        },
        {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$store.dispatch('businesses/fetch')
    },

    async removeFreeAccess(business) {
      this.$store.state.businesses.fetchingBusinesses = true

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/admin/remove-free-access`, {
          id: business.id
        },
        {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$store.dispatch('businesses/fetch')
    },

    getFreeSignupUrl() {
      return window.location.origin.replace("admin", "app") + "/signup/plan/902873785b03";
    },

    onCopy: function (e) {
      this.$swal({
        title: "Copied",
        text: "URL copied successfully!",
        showCancelButton: false,
        });
    },
    onError: function (e) {
      alert('Failed to copy the URL to the clipboard')
      console.log(e);
    },

  },
  mounted() {
    this.$store.state.businesses.fetchingBusinesses = true
    this.$store.state.businesses.sort_by = this.sort_by
    this.$store.dispatch('businesses/fetch')

    let self = this
    setTimeout(function() {
      if (self.me.company_type != 'admin') {
        self.$router.push('/dashboard')
      }
    }, 1000);
  },
  watch: {
    sort_by: {
      handler() {
        this.$store.state.businesses.sort_by = this.sort_by
        this.$store.dispatch('businesses/fetch')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.styled-checkbox {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: 0px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: rgb(228, 228, 228);
  }

  // Box hover
  /*&:hover + label:before {
    background: #f35429;
  }*/
  
  // Box focus
  &:focus + label:before {
    
    border-width: 0;
  }

  // Box checked
  &:checked + label:before {
    background: #48bb78;
  }
  
  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
}

.btn-invite {
  background-color: #00ad9e;
}

table tbody tr {
  transition: all 0.1s linear;
}

table tbody tr:hover {
  background-color: rgb(245, 245, 245);
}

.agencies-filter {
  margin-top: -10px; max-width: 300px;
}

table.agencies-table tr, table.agencies-table td {
  border-bottom: solid 1px #f5f5f5;
  color: #616161;
  padding: 5px;
}

@media screen and (max-width: 767px) {
  .agencies-filter {
    max-width: 200px;
  }

  table.agencies-table thead {
    display: none;
  }

  table.agencies-table tr, table.agencies-table td {
    display: block;
    border-bottom: 0px;
    font-size: 12px;
  }

  table.agencies-table td {
    padding: 0px !important;
  }

  table.agencies-table td .company-name {
    font-size: 20px;
  }

  table.agencies-table tr {
    border: thin solid rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    line-height: 26px;
  }

  table.agencies-table tr td:last-child {
    border: 0px;
    padding-bottom: 10px;
  }

  table.agencies-table tr td .v-chip {
    margin-left: 10px;
    margin-bottom: 5px;
  }

  table.agencies-table tr td i {
    width: 20px;
    text-align: center;
  }

  table.agencies-table tr td .action-button {
    display: inline-block;
  }

  table.agencies-table tr td .v-chip {
    padding: 8px;
  }

  table.agencies-table tr td .v-chip {
    font-size: 12px !important;
  }
}
</style>
