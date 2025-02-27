<template>

  <div>
    <dialog-add-business ref="dialogAddBusiness" is_business="true"></dialog-add-business>

    <panel-navigation>
      <h1 class="text-lg font-semibold mb-4">Locations</h1>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingBusinesses || !me" type="article, article, article"></v-skeleton-loader>

      <template v-if="!fetchingBusinesses && me">

        <div v-show="me.subscription.product_details.limits.locations != 1" class="justify-between items-start mb-3">
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

          <div class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogAddBusiness.show()"><i class="fa fa-plus"> </i> Add Location</div>

          <br clear="all" /><br clear="all" />
        </div>

        <div class="overflow-x-scroll">
        <table class="w-full">
          <thead class="border-b border-gray-100 w-full">
            <tr>
              <th></th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/2 uppercase">Location</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/3 uppercase">Email</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/3 uppercase">Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="w-full" style="">
            <tr v-for="business in sortedBusinesses" :key="business.id" class="hover:bg-gray-100">
              <td class="border-l border-b border-r border-gray-100 px-2">
                <input class="styled-checkbox" v-if="business.company_type != 'business'" :id="business.id+'-checkbox'" type="checkbox" v-model="selectedBusinessIds" :value="business.id">
                <label :for="business.id+'-checkbox'"></label>
              </td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ business.address }} {{ business.street_number }}<span v-if="(business.address || business.street_number)">, </span>{{ business.city }} <span v-if="!business.city">{{ business.country }}</span> <span v-if="business.company_type == 'business'" style="font-weight: bold;">(Main)</span></td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ business.email ? business.email : '-' }}</td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ formatDate(business.created_at) }}</td>
              <td class="border-b border-r border-gray-100 pl-2">
              <div v-if="me.email != business.email" class="flex flex-row items-center justify-end">
                <div class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center hover:bg-orange-200" @click="manageAccount(business)">
                  <i class="fa fa-sign-in-alt mr-2"></i>
                  <span class="whitespace-no-wrap">Manage Location</span>
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
      title: "Locations | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuBusinessActions,
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
      me: state => state.me.me
    }),
    sortedBusinesses() {
      return this.businesses
      // .slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  },
  methods: {
    async bulkDelete() {
      console.log(this.selectedBusinessIds)
      await this.$store.dispatch('businesses/bulkDelete', {businessesIds: this.selectedBusinessIds})
      this.$store.dispatch('businesses/fetch')
      this.selectedBusinessIds = []
      this.$store.dispatch('locations/fetch')
    },

    async manageAccount(business) {
      let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/get-child-jwt-token?id=${business.id}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.$router.push({ name: 'login', query: {alt: btoa(response.data.jwt_token) }});
    },

    formatDate(date) {
      return moment(date).format("MMM D, YYYY")
    }
  },
  mounted() {
    this.$store.state.businesses.fetchingBusinesses = true
    this.$store.dispatch('businesses/fetch')
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
</style>
