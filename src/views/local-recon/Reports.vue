<template>

  <panel-navigation>

      <div class="float-right ml-5 -mt-1">
        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_dashboard'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
      </div>

    <h1 class="text-lg font-semibold mb-3">Reports</h1>

    <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

      <div v-if="!fetchingData" class="dashboard-box">
        <v-card
            class="pa-2"
            tile
        >
            <div class="p-3">
                <div class="w-full mb-4">
                    <div v-if="searches.length == 0">
                        <br /><br /><br /><br />

                        <div class="dashboard-box-iconsquare">
                        <div class="dashboard-box-icon-background"></div>
                        <div class="dashboard-box-icon">
                            <i class="mdi mdi-account-multiple"></i>
                        </div>
                        </div>

                        <div style="text-align: center;">
                            <div class="pt-2 pb-2">
                                <strong>No Reports Yet</strong>
                            </div>
                        </div>
                        
                        <br /><br /><br /><br /><br />
                    </div>

                    <div v-else>
                      <div class="justify-between items-start mb-3 float-right">
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

                      <table class="w-full rg-datatable mt-4">
                          <thead class="border-b border-gray-100 w-full">
                          <tr>
                              <th></th>
                              <th>Business</th>
                              <th>Location/Keyword</th>
                              <th>Type</th>
                              <th>Date</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody class="w-full" style="">
                          <tr v-for="search in searches" :key="search.id">
                            <td class="">
                              <v-checkbox
                                :id="search.id+'-checkbox'"
                                :value="search.id"
                                v-model="selectedIds"
                                hide-details
                                 :ripple="false"
                              >
                              </v-checkbox>
                            </td>
                            <td>
                              <span v-if="search.search_type == 'grid_tracker_scan'">
                                <a href="javascript: void(0);" @click="openSearchReport(search)">{{ search.properties.location.name }}</a>
                              </span>
                              <span v-else>
                                <a href="javascript: void(0);" @click="openSearchReport(search)">{{ search.keyword }}</a>
                              </span>
                            </td>
                          <td>
                            <span v-if="search.search_type == 'grid_tracker_scan'" style="text-transform: capitalize;">
                              {{ search.keyword }}
                            </span>
                            <span v-else-if="search.search_type == 'seo_audit'">
                              {{ search.keyword }}
                            </span>
                            <span v-else style="text-transform: capitalize;">
                              {{ search.properties.formatted_address || search.properties.gmb_keyword || "-" }}
                            </span>
                          </td>
                          <td>{{ search.search_type.replace("gmb", "gbp").replace(/\_/g, ' ') }}</td>
                          <td>{{ formatDate(search.created_at) }}</td>
                              <td style="text-align: right; width: 21%;">
                                  <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                      <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                      <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                  </a>

                                  <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer ml-6" v-clipboard:copy="getSearchReportUrl(search)" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                      <span class="whitespace-no-wrap text-blue">Copy REPORT</span>
                                  </a>
                              </td>
                          </tr>
                          </tbody>
                      </table>

                      <v-pagination v-if="!fetchingData && searches.length > 0"
                        class="float-right mt-6 -mb-3"
                        v-model="page"
                        :length="count"
                        color="blue"
                        circle
                      ></v-pagination>

                      <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </v-card>
    </div>

    </panel-navigation>
  

</template>

<script>
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuReportsActions from '@/components/menus/menuReportsActions.vue'
import moment from 'moment-timezone'
import axios from 'axios'

export default {
  metaInfo () {
    return {
      title: "Reports | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuReportsActions
  },
  data() {
    return {
      selectedIds: [],
      searches: [],
      count: 0,
      page: 1,
      fetchingData: true
    }
  },
  methods: {
    async getSearches(page = 1) {
      let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/searches?page=' + page, {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      this.searches = response.data.searches;
      this.count = response.data.count;
      this.fetchingData = false;
    },
    
    async bulkDelete() {
      await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-reports', {
          ids: this.selectedIds
        },
        {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      await this.getSearches();

      this.selectedIds = []
    },
    
    openSearchReport(search) {
        window.open(window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id + '&si=' + search.id);
    },
    
    getSearchReportUrl(search) {
        return window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id + '&si=' + search.id;
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
    
    onCopy: function (e) {
        this.$swal({
            title: "Copied",
            text: "URL copied successfully!",
            showCancelButton: false,
            });
    },
    onError: function (e) {
        alert('Failed to copy the text to the clipboard')
        console.log(e);
    },
  },
  created() {
    this.getSearches();
  },
  watch: {
    page: function(val, oldVal) {
      this.getSearches(this.page);
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
</style>
