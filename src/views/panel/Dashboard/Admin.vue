<template>

  <div>
    
    <h1 class="text-lg font-semibold mb-4">Admin Dashboard</h1>

    <hr class="border-b border-gray-100 mb-3">

    <v-container v-if="fetchingStats">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <div class="-mx-2" v-if="!fetchingStats">
      <div class="flex flex-row flex-wrap mb-3">
        <div class="w-full px-2 mb-4 md:w-1/2 lg:w-1/2">
            <v-toolbar
                dark
            >
              Total Agencies
            </v-toolbar>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="text-center">
                <span class="text-2xl" style="font-size: 40px;">{{ stats.stats.total_agencies }}</span>
            </div>
          </v-card>
        </div>

        <div class="w-full px-2 mb-4 md:w-1/2 lg:w-1/2">
            <v-toolbar
                dark
            >
              Total Businesses
            </v-toolbar>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="text-center">
                <span class="text-2xl" style="font-size: 40px;">{{ stats.stats.total_businesses }}</span>
            </div>
          </v-card>
        </div>

        <div class="w-full px-2 mb-4 md:w-1/2 lg:w-1/2">
            <v-toolbar
                dark
            >
              Total Locations
            </v-toolbar>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="text-center">
                <span class="text-2xl" style="font-size: 40px;">{{ stats.stats.total_locations }}</span>
            </div>
          </v-card>
        </div>

        <div class="w-full px-2 mb-4 md:w-1/2 lg:w-1/2">
            <v-toolbar
                dark
            >
              New Businesses This Month
            </v-toolbar>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="text-center">
                <span class="text-2xl" style="font-size: 40px;">{{ stats.stats.total_businesses_this_month }}</span>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <div>
      <ReviewsTable dashboard="true" /> 
    </div>

    <div v-if="fetchingActivity">
      <br /><br />
      <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
    </div>

    <div v-if="!fetchingActivity">

      <div class="w-full mb-4" >
        <v-toolbar
            dark
        >
          Recent Activity
        </v-toolbar>
        <div class="bg-gray-100 rounded-b">

          <div v-if="activity.length == 0" class="flex flex-col justify-center items-center">
            <div class="text-gray-300">
              <img src="@/assets/images/icons/empty.svg" alt="" class="mt-12" style="max-width: 200px;">
            </div>
            <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No activity yet.</div>
          </div>

          <div v-else class="p-1">
            <div v-for="activity_item in activity" :key="activity_item.id" class="border-gray-200 text-sm p-3 text-gray-800 bg-white rounded mb-1">
              <div style="word-break: break-word;">
                <strong>
                  <span v-if="activity_item.user.first_name || activity_item.user.last_name">{{ activity_item.user.first_name }} {{ activity_item.user.last_name }}</span>  
                </strong>
                {{ activity_item.details }}
                <em class="float-right not-mobile" style="font-size: 12px;">
                  {{ formatDate(activity_item.created_at) }}
                </em>
                <div class="mobile-only mt-1 text-gray-600" style="font-size: 12px; font-style: italic; display: block;">
                  <i class="fa fa-calendar"></i> {{ formatDate(activity_item.created_at) }}
                </div>
                <div v-if="activity_item.user.company_type == 'location'" class=" text-gray-600" style="font-size: 12px;">
                  <i class="fa fa-briefcase"></i>
                  {{ activity_item.user.parent.company_name }}
                  <span class="not-mobile">&nbsp;&nbsp;
                  |
                  &nbsp;&nbsp;
                  </span>
                  <br class="mobile-only" />
                  <span>
                    <span class="not-mobile">&nbsp;&nbsp;</span>
                    <i class="fa fa-map-marker"></i>
                    <span class="not-mobile">&nbsp;</span>&nbsp;
                    {{ activity_item.user.address }} {{ activity_item.user.street_number }}<span v-if="(activity_item.user.address || activity_item.user.street_number)">, </span>{{ activity_item.user.city }} <span v-if="!activity_item.user.city">{{ activity_item.user.country }}</span> &nbsp;<span v-if="activity_item.user.parent.company_type == 'business'" style="font-weight: bold;">(Main)</span>
                  </span>
                </div>

                <div v-if="activity_item.user.company_type != 'admin' && activity_item.user.company_type != 'agency' && activity_item.user.company_type != 'location'" class=" text-gray-600" style="font-size: 12px;">
                  <i class="fa fa-briefcase"></i>
                  {{ activity_item.user.company_name }}
                  <span class="not-mobile">&nbsp;&nbsp;
                  |
                  &nbsp;&nbsp;
                  </span>
                  <br class="mobile-only" />
                  <span>
                    <span class="not-mobile">&nbsp;&nbsp;</span>
                    <i class="fa fa-map-marker"></i>
                    <span class="not-mobile">&nbsp;</span>&nbsp;
                    {{ activity_item.user.address }} {{ activity_item.user.street_number }}<span v-if="(activity_item.user.address || activity_item.user.street_number)">, </span>{{ activity_item.user.city }} <span v-if="!activity_item.user.city">{{ activity_item.user.country }}</span> &nbsp;<span v-if="activity_item.user.company_type == 'business'" style="font-weight: bold;">(Main)</span>
                  </span>
                </div>

                <div v-if="activity_item.user.company_type == 'agency'" class=" text-gray-600" style="font-size: 12px;">
                  <i class="fa fa-building"></i>
                  {{ activity_item.user.company_name }}
                </div>
              </div>
            </div>
          </div>

        </div>
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
    }
  },
  computed: {
    ...mapState({
      activity: state => state.activity.activity,
      fetchingActivity: state => state.activity.fetchingActivity,
      stats: state => state.stats.stats,
      fetchingStats: state => state.stats.fetchingStats
    }),
  },
  methods: {
    formatDate: function(date) {
      return moment(String(date)).fromNow()
    },
  },
  created() {
    this.$store.state.activity.fetchingActivity = true
    this.$store.dispatch('activity/fetch')
  }
}
</script>