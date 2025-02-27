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
 
                    <div class=" mb-3" style = "display:  flex; justify-content: space-between;">

                        <div class="w-full md:w-1/3 pr-3">
                            <v-text-field
                                v-model="search"
                                clearable
                                outlined
                                dense
                                hide-details
                                prepend-inner-icon="mdi-magnify"
                                label="Search"
                            ></v-text-field>
                        </div>

                        <div v-if="searches.length != 0" class="justify-between items-start float-right">
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

                    </div>
    
                    
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
  
                        <table class="w-full rg-datatable mt-4">
                            <thead class="border-b border-gray-100 w-full">
                            <tr>
                                <th></th>
                                <th>Business</th>
                                <th>User Email</th>
                                <th>Location/Keyword</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Duration</th>
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
                                  <a href="javascript: void(0);" @click="openSearchReportSingle(search)">{{ search.properties.location.name }}</a>
                                </span>
                                <span v-else>
                                  <a href="javascript: void(0);" @click="openSearchReportSingle(search)">{{ search.keyword }}</a>
                                </span>
                              </td>
                            <td>{{ search.user.email}}</td>
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


                            <td>
                              <span v-if="search.search_type == 'gmb_audit' || search.search_type == 'citation_audit'  ">
                                <span v-if="search.search_type == 'citation_audit' ">
                                      <v-chip
                                          v-if="search.properties.citations.status == 'citation_completed'"
                                      
                                          small
                                          color="green lighten-5"
                                          text-color="green lighten-1"
                                      >
                                        Success
                                      </v-chip>
                                      <v-chip
                                           v-else-if="search.properties.citations.status == 'Error Occured'"
                                      
                                          small
                                          color="red lighten-5"
                                          text-color="red lighten-1"
                                      >
                                          Failed
                                      </v-chip>
                                      <v-chip
                                          v-else
                                      
                                          small
                                          color="blue lighten-5"
                                          text-color="blue lighten-1"
                                      >
                                          Porcessing
                                      </v-chip>
                                </span>
                                <span v-else>
                                   <v-chip
                                        v-if="search.properties.gmb_overall_status"
                                    
                                        small
                                        color="red lighten-5"
                                        text-color="red lighten-1"
                                    >
                                        Failed
                                    </v-chip>
                                    <v-chip
                                        v-else-if="search.properties.reviews.status === 'completed' && search.properties.posts.status === 'completed' && search.properties.competitors.status === 'completed'"
                                    
                                        small
                                        color="green lighten-5"
                                        text-color="green lighten-1"
                                    >
                                      Success
                                    </v-chip>
                                    <v-chip
                                      v-else-if="(
                                        search.properties.reviews.status === 'completed' && 
                                        search.properties.posts.status === 'completed' && 
                                        search.properties.competitors.status === 'completed'
                                      ) || (
                                        search.properties.competitors.status === 'completed' &&
                                        isMoreThanSixMinutesOld(search.created_at) &&
                                        (
                                          search.properties.reviews.status === 'completed' || 
                                          search.properties.reviews.status === 'Error Occured' ||
                                          search.properties.posts.status === 'completed' || 
                                          search.properties.posts.status === 'Error Occured'
                                        )
                                      )"
                                      small
                                      color="green lighten-5"
                                      text-color="green lighten-1"
                                    >
                                      Success
                                    </v-chip>
                                    <v-chip
                                        v-else
                                    
                                        small
                                        color="blue lighten-5"
                                        text-color="blue lighten-1"
                                    >
                                        Porcessing
                                    </v-chip>
                                </span>
                              </span>
                              <span v-else>-</span>
                            </td>
                            
                            <td>
                              <span v-if="search.search_type == 'gmb_audit' || search.search_type == 'citation_audit'  ">
                                <span v-if="search.search_type == 'citation_audit' ">
                                      <span v-if="search.properties.citations.status == 'citation_completed'">
                                        {{calculateDuration(search.created_at,search.updated_at)}}
                                      </span>
                                      <span v-else-if="search.properties.citations.status == 'Error Occured'">
                                        {{calculateDuration(search.created_at,search.updated_at)}}
                                      </span>
                                      <span v-else>
                                        {{ formatDateWithTime(search.created_at) }}
                                    </span>
                                </span>
                                <span v-else>
                                    <span v-if="search.properties.reviews.status === 'completed' && search.properties.posts.status === 'completed' && search.properties.competitors.status === 'completed'">

                                      {{calculateDuration(search.created_at,search.updated_at)}}
                                    </span>
                                    
                                    <span v-else-if="(
                                        search.properties.reviews.status === 'completed' && 
                                        search.properties.posts.status === 'completed' && 
                                        search.properties.competitors.status === 'completed'
                                      ) || (
                                        search.properties.competitors.status === 'completed' &&
                                        isMoreThanSixMinutesOld(search.created_at) &&
                                        (
                                          search.properties.reviews.status === 'completed' || 
                                          search.properties.reviews.status === 'Error Occured' ||
                                          search.properties.posts.status === 'completed' || 
                                          search.properties.posts.status === 'Error Occured'
                                        )
                                      )"> {{calculateDuration(search.created_at,search.updated_at)}}</span>
                                    <span v-else >
                                     {{ formatDateWithTime(search.created_at) }}
                                    </span>
                                </span>
                              </span>

                              <span v-else>
                                {{ formatDateWithTime(search.created_at) }}
                              </span>
                            </td>

                            <td>{{ formatDate(search.created_at) }}</td>
                                <td style="text-align: right; width: 10%;">
                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                    </a>
  
                                    <!-- <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer ml-6" v-clipboard:copy="getSearchReportUrl(search)" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                        <span class="whitespace-no-wrap text-blue">Copy REPORT</span>
                                    </a> -->
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
        search: '',
        fetchingData: true
      }
    },
    methods: {
        async getSearches(page = 1) {
            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon-admin/searches', {
                params: {
                page: page,
                search: this.search 
                },
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                }
            });

            this.searches = response.data.searches;
            this.count = response.data.count;
            this.fetchingData = false;
        },

      
      async bulkDelete() {
        await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-reports-admin', {
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
      
      openSearchReportSingle(search) {
          window.open(window.location.origin + '/admin/report-logs/' + search.id);
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
      formatDateWithTime: function(date) {
            return moment(String(date)).format('MMM DD, YYYY h:mm A')
      },
      onCopy: function (e) {
          this.$swal({
              title: "Copied",
              text: "URL copied successfully!",
              showCancelButton: false,
              });
      },
      calculateDuration(created_at,updated_at){
                            
          const createdAt = moment(created_at);
          const updatedAt = moment(updated_at);

          const duration = moment.duration(updatedAt.diff(createdAt));

          const minutes = Math.floor(duration.asMinutes()); 
          const seconds = duration.seconds(); 

          return `${minutes} minutes ${seconds} seconds`;
      },
      onError: function (e) {
          alert('Failed to copy the text to the clipboard')
          console.log(e);
      },
      isMoreThanSixMinutesOld(createdAt) {
        const currentTime = new Date();
        const createdTime = new Date(createdAt);
        const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); 
        return differenceInMinutes > 6;
      },
    },
    created() {
      this.getSearches();
    },
    watch: {
      page: function(val, oldVal) {
        this.getSearches(this.page);
      },
      search: function(val, oldVal) {
        this.getSearches(1);
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
  