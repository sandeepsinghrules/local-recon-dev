<template>

    <div>
      
      <h1 class="text-lg font-semibold mb-4">Admin Dashboard</h1>
  
      <hr class="border-b border-gray-100 mb-3">
      <v-skeleton-loader v-if="adminFetchingData" type="article, table, table"></v-skeleton-loader>

      <div class="-mx-2" v-if="!adminFetchingData">
          <div class="flex flex-row flex-wrap mb-4">
              <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
              <v-card
                  class="pa-2"
                  tile
              >
                  <div class="p-3">
                  <div class="dashboard-box-title">Total Users 
                    <!-- <a href="javascript: void(0);" @click="$router.push('/local-recon/leads')"><i class="mdi mdi-logout-variant"></i></a> -->
                  </div>

                  <div class="stats-box-number">{{ admin_dashboard_data.users_count }}</div>
                  
                  <div class="stats-box-icon-bg"></div>
                  <div class="stats-box-icon">
                      <i class="mdi mdi-account-multiple"></i>
                  </div>
                  </div>
              </v-card>
              </div>

              <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
              <v-card
                  class="pa-2"
                  tile
              >
                  <div class="p-3">
                  <div class="dashboard-box-title">Total Reports
                     <!-- <a href="javascript: void(0);" @click="$router.push('/local-recon/reports')"><i class="mdi mdi-logout-variant"></i></a> -->
                  </div>

                  <div class="stats-box-number">{{ admin_dashboard_data.searches_count }}</div>
                  
                  <div class="stats-box-icon-bg"></div>
                  <div class="stats-box-icon">
                      <i class="mdi mdi-text-box-outline"></i>
                  </div>
                  </div>
              </v-card>
              </div>

              <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
              <v-card
                  class="pa-2"
                  tile
              >
                  <div class="p-3">
                  <div class="dashboard-box-title">Total Widgets
                     <!-- <a href="javascript: void(0);" @click="$router.push('/local-recon/widgets')"><i class="mdi mdi-logout-variant"></i></a> -->
                  </div>

                  <div class="stats-box-number">{{ admin_dashboard_data.widgets_count }}</div>
                  
                  <div class="stats-box-icon-bg"></div>
                  <div class="stats-box-icon">
                      <i class="mdi mdi-widgets-outline"></i>
                  </div>
                  </div>
              </v-card>
              </div>
          </div>
      </div>

      <div v-if="!fetchingActivity" class="flex flex-row flex-wrap mb-3">
        <div class="dashboard-box stats-box w-full px-2 ">
          <v-card
            class="pa-2"
            tile
          >
            <div class="p-3">
              <div class="dashboard-box-title">Recent Activity</div>

              <div v-if="activity.length == 0" class="flex flex-col justify-center items-center">
                <div class="text-gray-300">
                  <img src="@/assets/images/icons/empty.svg" alt="" class="mt-12" style="max-width: 200px;">
                </div>
                <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No activity yet.</div>
              </div>

              <div v-else class="">
                <div v-for="activity_item in activity" :key="activity_item.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                  <!-- <div class="float-left mr-2"><svg width="20" height="20"  class="fill-current" viewBox="0 0 1941 1941" xmlns="http://www.w3.org/2000/svg"><path d="M906.667 1088v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136zm896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136z"/></svg></div> -->
                  <div class="dashboard-activity-item">
                    <strong>
                      <span v-if="activity_item.user.first_name || activity_item.user.last_name">{{ activity_item.user.first_name }} {{ activity_item.user.last_name }}</span>  
                    </strong>
                    {{ activity_item.details.toLowerCase() }}
                    <span class="float-right not-mobile" style="font-size: 12px;">
                      {{ formatDate(activity_item.created_at) }}
                    </span>
                    <div class="mobile-only mt-1" style="font-size: 12px; font-style: italic;">
                      <i class="fa fa-calendar"></i> {{ formatDate(activity_item.created_at) }}
                    </div>
                    <br class="not-mobile" clear="all" />
                    <div v-if="activity_item.user.company_type == 'location'" class="" style="font-size: 12px;">
                      <i class="mdi mdi-briefcase-outline" style="font-size: 16px;"></i>
                      &nbsp;
                      {{ activity_item.user.parent.company_name }}
                      <span class="not-mobile">&nbsp;&nbsp;
                      |
                      &nbsp;&nbsp;
                      </span>
                      <br class="mobile-only" />
                      <span>
                        <span class="not-mobile">&nbsp;&nbsp;</span>
                        <i class="mdi mdi-map-marker-outline" style="font-size: 16px;"></i>
                        <span class="not-mobile">&nbsp;</span>&nbsp;
                        {{ activity_item.user.address }} {{ activity_item.user.street_number }}<span v-if="(activity_item.user.address || activity_item.user.street_number)">, </span>{{ activity_item.user.city }} <span v-if="!activity_item.user.city">{{ activity_item.user.country }}</span> &nbsp;<span v-if="activity_item.user.parent.company_type == 'business'" style="font-weight: bold;">(Main)</span>
                      </span>
                    </div>

                    <div v-if="activity_item.user.company_type != 'location'" class="" style="font-size: 12px;">
                      <i class="mdi mdi-briefcase-outline" style="font-size: 16px;"></i>
                      &nbsp;
                      {{ activity_item.user.company_name }}
                      <span class="not-mobile">&nbsp;&nbsp;
                      |
                      &nbsp;&nbsp;
                      </span>
                      <br class="mobile-only" />
                      <span>
                        <span class="not-mobile">&nbsp;&nbsp;</span>
                        <i class="mdi mdi-map-marker-outline" style="font-size: 16px;"></i>
                        <span class="not-mobile">&nbsp;</span>&nbsp;
                        {{ activity_item.user.address }} {{ activity_item.user.street_number }}<span v-if="(activity_item.user.address || activity_item.user.street_number)">, </span>{{ activity_item.user.city }} <span v-if="!activity_item.user.city">{{ activity_item.user.country }}</span> &nbsp;<span v-if="activity_item.user.company_type == 'business'" style="font-weight: bold;">(Main)</span>
                      </span>
                    </div>
                  </div>
                  <div style="clear: both;"></div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
  
    </div>
  
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import ReviewsTable from '@/components/ReviewsTable.vue'
  import moment from 'moment'
  
  export default {
    components: {
      ReviewsTable
    },
    data () {
      return {
        adminFetchingData: true,
        admin_dashboard_data: false,
      }
    },
    computed: {
        ...mapState({
                me: state => state.me.me,
                fetchingActivity: state => state.activity.fetchingActivity,
                activity: state => state.activity.activity,
            }),
    },
    methods: {
      formatDate: function(date) {
        return moment(String(date)).fromNow()
      },
      async fetchAdminDashboardData(){
        let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/admin-dashboard', {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.admin_dashboard_data = response.data;
        this.adminFetchingData = false;
      }
    },
    created() {
      this.fetchAdminDashboardData();
      this.$store.state.activity.fetchingActivity = true
      this.$store.dispatch('activity/fetch')
    }
  }
  </script>