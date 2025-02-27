<template>
    <panel-navigation>
        <div>

            <div v-if="listings" class="float-right" style="margin-top: -23px;">
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    left
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date"
                    type="month"
                    no-title
                    scrollable
                    @input="menu = false"
                    >
                    </v-date-picker>
                </v-menu>
            </div>

            <div v-if="listings" class="float-right mr-5" style="margin-top: -30px; max-width: 300px;">
                <v-select
                    v-model="selected_review_sites"
                    :items="review_sites"
                    item-text="name"
                    item-value="id"
                    multiple
                    >
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0 || index === 1">
                        <span>{{ item.name }}</span>
                        </v-chip>
                        <span
                        v-if="index === 2"
                        class="grey--text text-caption"
                        >
                        (+{{ selected_review_sites.length - 2 }} more)
                        </span>
                    </template>
                </v-select>
            </div>
            
            <h1 class="text-lg font-semibold mb-4">Reports</h1>

            <hr class="border-b border-gray-100 mb-3">

            <v-container v-if="loading || !listings">
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

            <div v-if="!loading && listings" class="-mx-2">
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
                                :color="'amber'"
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
                                5 <i class="fa fa-star" style="color: #ffc107;"></i>
                                </div>
                                <div style="float: right;">
                                {{ chart_data.reviews_count_five_star }}
                                </div>
                            </div>

                            <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                                <div style="float: left; width: 40px;">
                                4 <i class="fa fa-star" style="color: #ffc107;"></i>
                                </div>
                                <div style="float: right;">
                                {{ chart_data.reviews_count_four_star }}
                                </div>
                            </div>

                            <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                                <div style="float: left; width: 40px;">
                                3 <i class="fa fa-star" style="color: #ffc107;"></i>
                                </div>
                                <div style="float: right;">
                                {{ chart_data.reviews_count_three_star }}
                                </div>
                            </div>

                            <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                                <div style="float: left; width: 40px;">
                                2 <i class="fa fa-star" style="color: #ffc107;"></i>
                                </div>
                                <div style="float: right;">
                                {{ chart_data.reviews_count_two_star }}
                                </div>
                            </div>

                            <div style="clear: both; height: 26px; margin-top: 10px; color: #757575; font-size: 16px;">
                                <div style="float: left; width: 40px;">
                                1 <i class="fa fa-star" style="color: #ffc107;"></i>
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
                        <div class="w-full px-2 mb-4" >
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

                    <div class="w-full px-2 mb-4" :class="calculateListingClass(listing.id)" v-for="listing in listings_displayed" :key="listing.id">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="flex flex-row flex-wrap mt-1">
              <div class="w-full md:w-1/2 px-2 pt-2" >
                <div class="mb-4" style="font-weight: bold;"><img :src="getIconUrl(listing.url)" alt="" class="source-logo-dashboard rounded-l border border-gray-100 mr-3"> {{ reviewSitesNames["www." + getHostname(listing.url)] }}</div>

                <span class="text-2xl" style="float: left;">{{ ((listing.average_rating) ? parseInt(listing.average_rating) : 0) }}
                </span>
                <span style="float: left; padding-left: 10px; padding-top: 3px;">
                  <v-rating
                    :value="parseInt(listing.average_rating)"
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

            <div v-if="!loading">

            <ReviewsTable :key="reviews_table_key" dashboard="true" social_posting="false" :review_sites="selected_review_sites" :date="date" />

            </div>

        </div>
    </panel-navigation>
</template>

<script>
import { mapState } from 'vuex'
import BarChart from '../../../utils/BarChart.js'
import PanelNavigation from '@/components/PanelNavigation.vue'
import ReviewsTable from '@/components/ReviewsTable.vue'
import urlParser from 'url-parse'
import reviewSitesNames from '@/config/review_sites/names';
import reviewSitesColors from '@/config/review_sites/colors';
import moment from 'moment'

export default {
  components: {
    BarChart,
    ReviewsTable,
    PanelNavigation
  },
  data () {
    return {
        loading: false,
      datacollection: {},
      date: new Date().toISOString().substr(0, 7),
      review_sites: [],
      selected_review_sites: [],
      listings_displayed: [],
      reviews_table_key: 1,
      menu: false,
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
      getDateFormatted() {
          return moment(this.date).format("MMM YYYY");
      },
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
        case (this.listings_displayed.length == 1):
          return ''
        break;

        case (this.listings_displayed.length == 2):
          return 'md:w-1/2 lg:w-1/2'
        break;

        case (this.listings_displayed.length == 3):
          return 'md:w-1/3 lg:w-1/3'
        break;

        case (this.listings_displayed.length == 4):
          return 'md:w-1/2 lg:w-1/2'
        break;

        case (this.listings_displayed.length == 5):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings_displayed.length == 7):
          return (thisIndex < 4) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings_displayed.length == 9):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : ((thisIndex < 5) ? 'md:w-1/3 lg:w-1/3' : 'md:w-1/4 lg:w-1/4');
        break;

        case (this.listings_displayed.length == 8):
          return (thisIndex < 2) ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/3';
        break;

        case (this.listings_displayed.length%3 == 0):
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
    async refreshReport() {
        var that = this
        that.loading = true;

        await that.$store.dispatch('listings/fetch_dashboard_chart_data', {
            review_sites: that.selected_review_sites,
            date: that.date
        })

        await that.$store.dispatch('listings/fetch', { dashboard: true, date: that.date })

        that.listings_displayed = [];
        for (var i in that.listings) {
            if (that.selected_review_sites.includes(that.listings[i].id))
                that.listings_displayed.push(that.listings[i]);
        }

        that.reviews_table_key++
        that.loading = false;
    }
  },
  created() {
      let that = this;
      this.loading = true;
    // this.$store.dispatch('contacts/fetch')
    this.$store.state.feedback.fetchingFeedback = true
    this.$store.dispatch('feedback/fetch')
    this.$store.dispatch('listings/fetch', { dashboard: true, date: this.date })

    let self = this;

    setTimeout(function() {
        for (var i in self.listings) {
            let siteName = reviewSitesNames["www." + self.getHostname(self.listings[i].url)]

            self.review_sites.push({
                id: self.listings[i].id,
                name: siteName
            });

            self.selected_review_sites.push(self.listings[i].id);
        }

        that.loading = false;
    }, 2000);
  },
  mounted () {
    var that = this
    this.$store.state.listings.chart_data.initial_loading = true
    this.$store.state.listings.listings = false

    setTimeout(function() {
        that.$store.dispatch('listings/fetch_dashboard_chart_data', {
            review_sites: that.selected_review_sites,
            date: that.date
        })

        that.listings_displayed = [];
        for (var i in that.listings) {
            if (that.selected_review_sites.includes(that.listings[i].id))
                that.listings_displayed.push(that.listings[i]);
        }
    }, 2000);
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

          this.series.push({
            name: thisHostName,
            data:this.chart_data.chart_data.datasets[url]
          });

          this.options.colors.push(reviewSitesColors["www." + thisHostName]);
        }
      }
    },

    selected_review_sites: {
        handler() {
            this.refreshReport();
        }
    },

    date: {
        handler() {
            this.refreshReport();
        }
    }
  }
}
</script>

<style>
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