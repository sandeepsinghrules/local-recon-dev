<template>

  <div>
    
    <h1 class="text-lg font-semibold mb-4">Business Dashboard</h1>

    <hr class="border-b border-gray-100 mb-3">

    <v-alert
      color="blue-grey"
      dark
      icon="mdi-clock-fast"
      text
      v-if="listings && listings.length === 0"
    >
      <img src="@/assets/images/providers/reviewplatforms-collection.png" alt="" class="mt-5" style="max-width: 100px; float: right;">

      <div v-if="me && me.parent_id">
        <strong>Get Started!</strong>
        Ask your account owner to add your review platforms in order to bring your reviews in.
      </div>
      <div v-else>
        <strong>Get Started!</strong>
        Add your review platforms in order to bring your reviews in.
        <br /><br />

        <v-btn
          tile
          color="blue-grey mb-10"
          @click="$router.push('review-platforms')"
        >
        <br />
        <v-icon left>
          mdi-plus
        </v-icon>
          Add Review Platforms
        </v-btn>
      </div>
    </v-alert>

    <v-container v-if="listings === false">
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

    <div class="-mx-2">
      <div class="flex flex-row flex-wrap mb-3">
        <div class="w-full" :class="'md:w-1/3 lg:w-1/3'">
          <div class="flex flex-row flex-wrap mb-3" v-if="!chart_data.initial_loading">
            <div class="w-full px-2 mb-4" >
              <v-card
                class="pa-2"
                outlined
                tile
                style="height: 278px;"
              >
                <div style="float: left; width: 65%; text-align: center;">
                  <div style="font-size: 60px; font-weight: bold; padding-top: 20px; padding-bottom: 10px;">
                    {{ chart_data.overall_rating || 0 }}
                  </div>

                  <v-rating
                    :value="(parseFloat(chart_data.overall_rating) || 0)"
                    :color="'yellow darken-1'"
                    dense
                    half-increments
                    readonly
                    size="38"
                  ></v-rating>

                  <div class="text-2xl" style="color: #757575; padding: 20px;">
                    <span class="mr-2">{{ chart_data.reviews_count || 0 }}</span>

                    <span class="text-gray-600" v-show="chart_data.reviews_count == 1">Review</span>
                    <span class="text-gray-600" v-show="chart_data.reviews_count != 1">Reviews</span>
                  </div>
                </div>

                <div style="float: right; min-width: 30%; max-width: 35%; padding-right: 40px; padding-top: 30px;">
                  <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                    <div style="float: left; width: 40px;">
                      5 <i class="fa fa-star" style="color: #fdd835;"></i>
                    </div>
                    <div style="float: right;">
                      {{ chart_data.reviews_count_five_star }}
                    </div>
                  </div>

                  <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                    <div style="float: left; width: 40px;">
                      4 <i class="fa fa-star" style="color: #fdd835;"></i>
                    </div>
                    <div style="float: right;">
                      {{ chart_data.reviews_count_four_star }}
                    </div>
                  </div>

                  <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                    <div style="float: left; width: 40px;">
                      3 <i class="fa fa-star" style="color: #fdd835;"></i>
                    </div>
                    <div style="float: right;">
                      {{ chart_data.reviews_count_three_star }}
                    </div>
                  </div>

                  <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                    <div style="float: left; width: 40px;">
                      2 <i class="fa fa-star" style="color: #fdd835;"></i>
                    </div>
                    <div style="float: right;">
                      {{ chart_data.reviews_count_two_star }}
                    </div>
                  </div>

                  <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                    <div style="float: left; width: 40px;">
                      1 <i class="fa fa-star" style="color: #fdd835;"></i>
                    </div>
                    <div style="float: right;">
                      {{ chart_data.reviews_count_one_star }}
                    </div>
                  </div>
                </div>

                <div style="clear: both;"></div>
              </v-card>
            </div>
          </div>
        </div>

        <div class="w-full px-2" :class="'md:w-2/3 lg:w-2/3'">
          <div class="flex flex-row flex-wrap mb-3" v-if="!chart_data.initial_loading">
            <div class="w-full mb-4" >
              <v-card
                class="pa-2"
                outlined
                tile
              >

                <v-container class="chart-container">
                  <apexchart height="205" type="line" :options="options" :series="series"></apexchart>
                </v-container>
              </v-card>
            </div>
          </div>
        </div>

        <div class="w-full px-2 mb-4" :class="calculateListingClass(listing.id)" v-for="listing in listings" :key="listing.id">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="flex flex-row flex-wrap mt-1">
              <div class="w-full md:w-1/2 px-2 pt-2" >
                <div class="mb-4" style="font-weight: bold;"><img :src="getIconUrl(listing.url)" alt="" class="source-logo-dashboard rounded-l border border-gray-100 mr-3"> {{ reviewSitesNames["www." + getHostname(listing.url)] }}</div>

                <span class="text-2xl" style="float: left;">{{ ((listing.average_rating) ? (Math.round(parseFloat(listing.average_rating) * 10) / 10) : 0) }}
                </span>
                <span style="float: left; padding-left: 10px; padding-top: 3px;">
                  <v-rating
                    :value="(Math.round(parseFloat(listing.average_rating) * 10) / 10)"
                    :color="'yellow darken-1'"
                    dense
                    half-increments
                    readonly
                    size="26"
                  ></v-rating>
                </span>

                <div style="clear: both;"></div>

                <div class="mt-4">
                  <span class="mr-2">{{ listing.reviews_count }}</span>

                  <span class="text-gray-600" v-show="listing.reviews_count == 1">Review</span>
                  <span class="text-gray-600" v-show="listing.reviews_count != 1">Reviews</span>
                </div>
              </div>

              <div class="w-full md:w-1/2 px-2" >
                <div style="padding-left: 10px; padding-right: 10px; clear: both; height: 17px; margin-top: 5px; color: #757575; font-size: 13px;">
                  <div style="float: left; width: 30px;">
                    5 <i class="fa fa-star" style="color: #fdd835;"></i>
                  </div>
                  <div style="float: left; width: calc(100% - 70px); padding-top: 6px;">
                    <v-progress-linear
                      :value="(listing.reviews_count_five_star/listing.reviews_count) * 100"
                      color="yellow darken-1"
                      background-color="grey lighten-4"
                      height="8"
                    ></v-progress-linear>
                  </div>
                  <div style="float: right; width: 30px;">
                    {{ listing.reviews_count_five_star }}
                  </div>
                </div>

                <div style="padding-left: 10px; padding-right: 10px; clear: both; height: 17px; margin-top: 10px; color: #757575; font-size: 13px;">
                  <div style="float: left; width: 30px;">
                    4 <i class="fa fa-star" style="color: #fdd835;"></i>
                  </div>
                  <div style="float: left; width: calc(100% - 70px); padding-top: 6px;">
                    <v-progress-linear
                      :value="(listing.reviews_count_four_star/listing.reviews_count) * 100"
                      color="yellow darken-1"
                      background-color="grey lighten-4"
                      height="8"
                    ></v-progress-linear>
                  </div>
                  <div style="float: right; width: 30px;">
                    {{ listing.reviews_count_four_star }}
                  </div>
                </div>

                <div style="padding-left: 10px; padding-right: 10px; clear: both; height: 17px; margin-top: 10px; color: #757575; font-size: 13px;">
                  <div style="float: left; width: 30px;">
                    3 <i class="fa fa-star" style="color: #fdd835;"></i>
                  </div>
                  <div style="float: left; width: calc(100% - 70px); padding-top: 6px;">
                    <v-progress-linear
                      :value="(listing.reviews_count_three_star/listing.reviews_count) * 100"
                      color="yellow darken-1"
                      background-color="grey lighten-4"
                      height="8"
                    ></v-progress-linear>
                  </div>
                  <div style="float: right; width: 30px;">
                    {{ listing.reviews_count_three_star }}
                  </div>
                </div>

                <div style="padding-left: 10px; padding-right: 10px; clear: both; height: 17px; margin-top: 10px; color: #757575; font-size: 13px;">
                  <div style="float: left; width: 30px;">
                    2 <i class="fa fa-star" style="color: #fdd835;"></i>
                  </div>
                  <div style="float: left; width: calc(100% - 70px); padding-top: 6px;">
                    <v-progress-linear
                      :value="(listing.reviews_count_two_star/listing.reviews_count) * 100"
                      color="yellow darken-1"
                      background-color="grey lighten-4"
                      height="8"
                    ></v-progress-linear>
                  </div>
                  <div style="float: right; width: 30px;">
                    {{ listing.reviews_count_two_star }}
                  </div>
                </div>

                <div class="mb-2" style="padding-left: 10px; padding-right: 10px; clear: both; height: 17px; margin-top: 10px; color: #757575; font-size: 13px;">
                  <div style="float: left; width: 30px;">
                    1 <i class="fa fa-star" style="color: #fdd835;"></i>
                  </div>
                  <div style="float: left; width: calc(100% - 70px); padding-top: 6px;">
                    <v-progress-linear
                      :value="(listing.reviews_count_one_star/listing.reviews_count) * 100"
                      color="yellow darken-1"
                      background-color="grey lighten-4"
                      height="8"
                    ></v-progress-linear>
                  </div>
                  <div style="float: right; width: 30px;">
                    {{ listing.reviews_count_one_star }}
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>


      <v-skeleton-loader v-if="chart_data.initial_loading"
        type="date-picker"
      ></v-skeleton-loader>
    </div>

    <div>

      <ReviewsTable dashboard="true" social_posting="false" />

    </div>

    <div v-if="fetchingFeedback">
      <br /><br />
      <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
    </div>

    <div v-if="!fetchingFeedback">

      <div class="w-full mb-4" >
        <v-toolbar
            dark
        >
          Recent Feedback
        </v-toolbar>
        <div class="bg-gray-100 rounded-b">

          <div v-if="recentFiveFeedback.length == 0" class="flex flex-col justify-center items-center">
            <div class="text-gray-300">
              <img src="@/assets/images/icons/empty.svg" alt="" class="mt-12" style="max-width: 200px;">
            </div>
            <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No direct feedback yet.</div>
          </div>

          <div v-else class="p-4">
            <div v-for="fb in recentFiveFeedback" :key="fb.id" class="border-gray-200 text-sm p-3 text-gray-800 bg-white rounded mb-1">
              <div class="absolute text-gray-400"><svg width="20" height="20"  class="fill-current" viewBox="0 0 1941 1941" xmlns="http://www.w3.org/2000/svg"><path d="M906.667 1088v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136zm896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136z"/></svg></div>
              <div class="ml-8">
                {{ fb.text }}
                <em v-if="fb.contact.first_name || fb.contact.last_name">({{ fb.contact.first_name }} {{ fb.contact.last_name }})</em>
                -
                {{ formatDate(fb.created_at) }}
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
import ReviewsTable from '@/components/ReviewsTable.vue'
import urlParser from 'url-parse'
import reviewSitesNames from '@/config/review_sites/names';
import reviewSitesColors from '@/config/review_sites/colors';
import moment from 'moment'

export default {
  components: {
    ReviewsTable
  },
  data () {
    return {
      datacollection: {},
      myStyles: {
        height: '220px',
        width: '100%',
        position: 'relative',
      },
      options: {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false
          },
          legend: {
            show: true
          }
        },
        xaxis: {
          categories: [],
          tickAmount: 10,
          labels: {
                rotate: 0
            }
        },
        colors: []
      },
      series: [],
      reviewSitesNames: reviewSitesNames,
      loading: true,
      listingsInterval: null
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      listings: state => state.listings.listings,
      chart_data: state => state.listings.chart_data,
      feedback: state => state.feedback.feedback,
      fetchingFeedback: state => state.feedback.fetchingFeedback
    }),
    recentFiveFeedback() {
      return this.feedback.slice(0,5)
    },
    countPendingInvites() {
      return this.contacts.filter(value => {
        return (!value.invitedEmail && value.requestedInviteEmail ) || (!value.invitedPhone && value.requestedInvitePhone )
      }).length
    },
    countInvites() {
      return this.contacts.filter(value => {
        return value.invitedEmail || value.invitedPhone
      }).length
    },
    chartStyles () {
      return {
        //height: '300px',
        position: 'relative'
      }
    }
  },
  methods: {
    getHostname(url) {
      return urlParser(url).hostname.replace("www.", "")
    },
    getPathname(url) {
      return urlParser(url).pathname
    },
    getIconUrl(url) {
      return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");
    },
    calculateListingClass(key) {
      let thisIndex = this.getItemIndex(key);

      switch (true) {
        case (this.listings.length == 1):
          return ''
        break;

        case (this.listings.length == 2):
          return 'md:w-1/2 lg:w-1/2'
        break;

        case (this.listings.length == 3):
          return 'md:w-1/3 lg:w-1/3'
        break;

        case (this.listings.length == 4):
          return 'md:w-1/2 lg:w-1/2'
        break;

        case (this.listings.length == 5):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings.length == 7):
          return (thisIndex < 4) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings.length == 9):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : ((thisIndex < 5) ? 'md:w-1/3 lg:w-1/3' : 'md:w-1/4 lg:w-1/4');
        break;

        case (this.listings.length == 8):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings.length%3 == 0):
          return 'md:w-1/3 lg:w-1/3'
        break;

        // case (this.listings.length%2 == 0):
        //   return 'md:w-1/2 lg:w-1/2'
        // break;
      }

      return 'md:w-1/3 lg:w-1/3'
    },
    getItemIndex(key) {
      let index = 0;

      for (var i in this.listings) {
        if (key == this.listings[i].id)
          return index;

        index++;
      }

      return index;
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    },
  },
  created() {
    // this.$store.dispatch('contacts/fetch')
    this.$store.state.feedback.fetchingFeedback = true
    this.$store.dispatch('feedback/fetch')
    this.$store.dispatch('listings/fetch', { dashboard: true })

    let hasPending = false;

    for (var i in this.listings) {
      if (this.listings[i].crawl_status == "pending" || !this.listings[i].crawl_status)
        hasPending = true;
    }

    var that = this;

    if (hasPending) {
      that.listingsInterval = setInterval(function() {
        that.$store.dispatch('listings/fetch', { dashboard: true })
      }, 5000);
    }
  },
  mounted () {
    var that = this
    this.$store.state.listings.chart_data.initial_loading = true
    this.$store.state.listings.listings = false
    that.$store.dispatch('listings/fetch_dashboard_chart_data', {
      review_sites: null,
      date: null
    })
  },
  beforeDestroy () {
     clearInterval(this.listingsInterval)
  },
  watch: {
    chart_data: {
      handler () {

        this.options.xaxis.categories = this.chart_data.chart_data.labels;
        this.series = [];

        for (var url in this.chart_data.chart_data.datasets) {
          let thisHostName = this.getHostname(url);
          let thisName = this.reviewSitesNames["www." + thisHostName];

          this.series.push({
            name: thisName,
            data:this.chart_data.chart_data.datasets[url]
          });

          this.options.colors.push(reviewSitesColors["www." + thisHostName]);
        }
      }
    },
  }
}
</script>

<style scoped>
  .small {
    
  }

  .source-logo-dashboard {
    float: left;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    opacity: 0.8;
  }
</style>