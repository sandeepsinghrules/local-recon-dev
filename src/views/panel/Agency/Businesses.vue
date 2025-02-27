<template>

  <div>
    <dialog-add-business ref="dialogAddBusiness"></dialog-add-business>

    <panel-navigation>

      <div class="float-right ml-5 -mt-1" v-if="!fetchingBusinesses && businesses.length > 0">
        <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="$refs.dialogAddBusiness.show()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> ADD BUSINESS</div>

        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push('/plans')" style="margin-top: -5px;"><i class="fa fa-building mr-2"> </i> MANAGE PLANS</div>
      </div>

      <div v-if="me" class="float-right text-sm float-right mb-2">
        <!-- <div v-for="plan in me.integrations.stripe.settings.products" :key="plan.product_id"> -->
          <strong>Sign Up URL: <a href="javascript: void(0);" v-clipboard:copy="getFreeSignupUrl()" v-clipboard:success="onCopy" v-clipboard:error="onError">{{ getFreeSignupUrl() }} <i class="mdi mdi-content-copy ml-2"></i></a> </strong>
        <!-- </div> -->
      </div>

      <h1 class="text-lg font-semibold mb-3">Businesses</h1>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingBusinesses" type="article, article, article"></v-skeleton-loader>

      <div class="dashboard-box" v-if="!fetchingBusinesses && businesses.length == 0">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3">

            <br /><br /><br /><br />

            <div class="dashboard-box-iconsquare">
              <div class="dashboard-box-icon-background"></div>
              <div class="dashboard-box-icon">
                <i class="mdi mdi-briefcase-outline"></i>
              </div>
            </div>

            <div style="text-align: center;">
              <div class="pt-2 pb-2">
                <strong>No Businesses Yet</strong>
              </div>

              <div class="text-sm mb-4 text-gray-600">
                You have no businesses yet. Use our tools to add businesses.
              </div>

              <br />

              <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="$refs.dialogAddBusiness.show()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"></i> ADD NEW BUSINESS</div>
            </div>
            
            <br /><br /><br /><br /><br />
          </div>
        </v-card>
      </div>

      <template v-if="!fetchingBusinesses && businesses.length > 0">
        <div class="dashboard-box">
          <v-card
            class="pa-2"
            tile
          >
            <div class="p-3">
              <div v-if="profile.settings.role != 'Manager (readonly)'" class="justify-between items-start mb-3 float-right">
                <v-menu
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="flex flex-row items-center px-4 py-2 rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer">
                      <span class="mr-2">Actions</span>
                      <span class="text-xs" style="padding-top: 3px;">
                        <font-awesome-icon icon="chevron-down"  />
                      </span>
                    </div>
                  </template>

                  <v-list class="table-menu-actions">
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <br clear="all" />

              <div class="overflow-x-scroll">
              <table class="w-full rg-datatable">
                <thead class="border-b border-gray-100 w-full">
                  <tr>
                    <th v-if="profile.settings.role != 'Manager (readonly)'"></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Locations</th>
                    <th>Joined Date</th>
                    <th>Plan</th>
                    <th>Plan Status</th>
                    <th>Access</th>
                    <th v-if="profile.settings.role != 'Manager (readonly)'"></th>
                  </tr>
                </thead>
                <tbody class="w-full" style="">
                  <tr v-for="business in sortedBusinesses" :key="business.id">
                    <td v-if="profile.settings.role != 'Manager (readonly)'" class="">
                      <v-checkbox
                        :id="business.id+'-checkbox'"
                        :value="business.id"
                        v-model="selectedBusinessIds"
                        hide-details
                         :ripple="false"
                      >
                      </v-checkbox>
                    </td>
                    <td>{{ business.company_name }}</td>
                    <td>{{ business.email ? business.email : '-' }}</td>
                    <td>{{ business.locations_count + 1 }}</td>
                    <td>{{ formatDate(business.created_at) }}</td>
                    <td>
                      <span v-if="business.subscription">
                        {{ business.subscription.name.split(" | ")[1] }}
                        <span class="text-xs text-gray-600">
                          -
                          ${{ business.subscription.stripe_price }}/mo

                          <v-chip
                            v-if="business.subscription.stripe_status == 'pending'"
                          
                            x-small
                            outlined
                            color="gray"
                          >
                            Pending
                          </v-chip>

                          <br />

                          Total Collected: ${{ business.total_collected }}
                        </span>
                      </span>                
                      <span v-else>-</span>
                    </td>
                    <td>
                      <span v-if="business.subscription">
                        <v-chip
                          v-if="business.subscription.stripe_status == 'active'"
                          x-small
                          outlined
                          color="green"
                          text-color="green lighten-1"
                        >
                          Active
                        </v-chip>

                        <v-chip
                          v-if="business.subscription.stripe_status == 'canceled'"
                        
                          x-small
                          outlined
                          color="orange"
                        >
                          Canceled
                        </v-chip>

                        <v-chip
                          v-if="business.subscription.stripe_status == 'trialing'"
                        
                          x-small
                          outlined
                          color="blue"
                        >
                          In Trial
                        </v-chip>
                      </span>                
                      <span v-else>-</span>
                    </td>
                    <td>
                      <v-chip
                        v-if="business.status == 1"
                       
                        small
                        color="green lighten-5"
                        text-color="green lighten-1"
                      >
                        Enabled
                      </v-chip>

                      <v-chip
                        v-if="business.status == 0"
                       
                        small
                        color="grey lighten-3"
                        text-color="grey"
                      >
                        Disabled
                      </v-chip>
                    </td>
                    <td v-if="profile.settings.role != 'Manager (readonly)'" style="text-align: right;">
                      <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="manageAccount(business)">
                        <i class="fa fa-sign-in-alt mr-2 text-blue"></i>
                        <span class="whitespace-no-wrap text-blue">Manage ACCOUNT</span>
                      </a>

                      <v-menu
                        bottom
                        left
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            dark
                            icon
                            v-bind="attrs"
                            v-on="on"
                            class="ml-3"
                            color="grey darken-1"
                          >
                            <i class="mdi mdi-dots-vertical"></i>
                          </v-btn>
                        </template>

                        <v-list class="table-menu-actions">
                          <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="manageLocations(business)"><span class="table-menu-action-icon"><i class="fa fa-map-marker"></i></span> Manage Locations</a></v-list-item-title></v-list-item>
                          <v-list-item v-if="business.status == 1" class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="disableAccess(business)"><span class="table-menu-action-icon"><i class="fa fa-times"></i></span> Disable Access</a></v-list-item-title></v-list-item>
                          <v-list-item v-if="business.status == 0" class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="enableAccess(business)"><span class="table-menu-action-icon"><i class="fa fa-check"></i></span> Enable Access</a></v-list-item-title></v-list-item>
                          <v-list-item v-if="business.hosted_payment_url" class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" v-clipboard:copy="business.hosted_payment_url" v-clipboard:success="onCopy" v-clipboard:error="onError"><span class="table-menu-action-icon"><i class="fa fa-link"></i></span> Hosted Token URL</a></v-list-item-title></v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </v-card>
        </div>
      </template>

    </panel-navigation>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
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
    dialogAddBusiness
  },
  data() {
    return {
      selectedBusinessIds: []
    }
  },
  computed: {
    ...mapState({
      businesses: state => state.businesses.businesses,
      fetchingBusinesses: state => state.businesses.fetchingBusinesses,
      me: state => state.me.me,
      profile: state => state.me.profile
    }),
    sortedBusinesses() {
      return this.businesses.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  },
  methods: {
    async bulkDelete() {
      let self = this

      if (self.selectedBusinessIds.length == 0)
        return;

      let selectedNames = [];

      for (var i in this.businesses) {
        if (self.selectedBusinessIds.includes(this.businesses[i].id))
          selectedNames.push(this.businesses[i].company_name)
      }

      this.$swal({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          cancelButtonText: "No",
          html: "The following businesses will be permamently deleted: <br /><br /><strong>" + selectedNames.join("<br />") + "</strong>",
        }).then(function(result) {

          if (result.isConfirmed) {
            console.log(self.selectedBusinessIds)
            self.$store.dispatch('businesses/bulkDelete', {businessesIds: self.selectedBusinessIds})

            setTimeout(function() {
              self.$store.dispatch('businesses/fetch')
              self.selectedBusinessIds = []
              self.$store.dispatch('locations/fetch')
              
              if (self.me.company_type == 'agency')
                self.$store.dispatch('stats/fetch')
            }, 1000);
          }

        });
    },

    async manageAccount(business) {
      let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?id=${business.id}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$router.push({ name: 'login', query: {alt: btoa(response.data.jwt_token), owner: true, owner_jwt_token: btoa(this.$store.state.auth.jwt) }});
      // window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token) + "&owner=true&owner_jwt_token=" + btoa(this.$store.state.auth.jwt);
    },

    async manageLocations(business) {
      let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?id=${business.id}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      // window.location = window.location.origin + '/login?alt=' + btoa(response.data.jwt_token) + "&owner=true&owner_jwt_token=" + btoa(this.$store.state.auth.jwt) + "&redirect=locations";
      this.$router.push({ name: 'login', query: {alt: btoa(response.data.jwt_token), owner: true, owner_jwt_token: btoa(this.$store.state.auth.jwt), redirect: "locations" }});
    },

    async disableAccess(business) {
      this.$store.state.businesses.fetchingBusinesses = true

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/disable-access`, {
          id: business.id
        },
        {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$store.dispatch('businesses/fetch')
    },

    async enableAccess(business) {
      this.$store.state.businesses.fetchingBusinesses = true

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/enable-access`, {
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

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/enable-free-access`, {
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

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/remove-free-access`, {
          id: business.id
        },
        {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$store.dispatch('businesses/fetch')
    },

    formatDate(date) {
      return moment(date).format("MMM D, YYYY")
    },

    getFreeSignupUrl() {
      return window.location.origin + "/signup";
    },

    // getFreeSignupUrl(plan) {
    //   return window.location.origin + "/signup/plan/" + plan.product_price_free_id.replace("price_", "");
    // },

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
    this.$store.dispatch('businesses/fetch')

    let self = this
    setTimeout(function() {
      if (self.me.company_type != 'agency') {
        self.$router.push('/dashboard')
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
  
</style>
