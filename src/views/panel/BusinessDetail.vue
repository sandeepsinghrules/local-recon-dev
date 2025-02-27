<template>
    <panel-navigation>
    
        <h1 class="text-lg font-semibold mb-4">Reviews</h1>

        <hr class="border-b border-gray-100 mb-3">

        <v-container>
            <v-row class="text-center">
                <v-col class="mb-4 col-md-12">
                    <v-skeleton-loader v-if="!business" type="article"></v-skeleton-loader>

                    <v-card class="mb-4" v-if="business" elevation="2">
            <v-card-title>{{ business.name }} ({{ business.address }}, {{ business.city }} {{ business.state }})</v-card-title>
            <v-card-text>
                <v-row v-if="business" align="center" class="mx-0">
                <v-rating
                    :value="business.average_rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="28"
                ></v-rating>

                <div v-if="business" class="grey--text ml-4">
                    {{ parseFloat(business.average_rating).toFixed(2) }} ({{ totalReviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }})
                </div>
                </v-row>

            <!-- <div>{{ business.address }}, {{ business.city }} {{ business.state }}</div> -->
            </v-card-text>
            </v-card>

            <v-card class="searching" v-if="business && business.percentage_complete < 100" elevation="2">
            <v-card-title>We are searching for your reviews... Please wait ({{ parseFloat(business.percentage_complete).toFixed(2) }}%)</v-card-title>
            <v-card-text>
                <v-progress-linear
                color="teal"
                buffer-value="0"
                :value="business.percentage_complete"
                stream
                ></v-progress-linear>
            </v-card-text>
            </v-card>

            

                    <template v-if="business">
            <v-data-table
                :headers="headers"
                :items="reviews"
                :options.sync="options"
                :server-items-length="totalFilteredReviews"
                :items-per-page="5"
                class="elevation-1"
                :loading="loading_reviews"
                :footer-props="{
                itemsPerPageOptions: [5, 10, 20, 30, 40, 50, 100],
                showFirstLastPage: true
                }"
            >

            <template v-slot:header>
                <v-toolbar
                    dark
                    color="green darken-6"
                    class="mb-1"
                >
                    <v-row>
                    <v-col cols="12" md="3" sm="3" xs="6">
                        <v-text-field
                        v-model="search"
                        clearable
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        label="Search"
                        ></v-text-field>
                    </v-col>
                    <template v-if="$vuetify.breakpoint.smAndUp">
                        <v-col cols="12" md="3" sm="3" xs="6">
                        <v-select
                            v-model="options.sortBy"
                            flat
                            solo-inverted
                            hide-details
                            :items="sort_by_keys"
                            prepend-inner-icon="mdi-sort"
                            label="Sort by"
                        ></v-select>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="3" sm="3" xs="6">
                        <v-select
                            v-model="filter_rating"
                            clearable
                            flat
                            solo-inverted
                            hide-details
                            :items="filter_rating_keys"
                            prepend-inner-icon="mdi-hexagram"
                            label="Rating"
                        ></v-select>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="3" sm="3" xs="6">
                        <v-select
                            v-model="filter_website"
                            clearable
                            flat
                            solo-inverted
                            hide-details
                            :items="filter_website_keys"
                            prepend-inner-icon="mdi-earth"
                            label="Any Website"
                            item-text="name"
                            item-value="domain"
                        ></v-select>
                        </v-col>
                    </template>
                    </v-row>
                </v-toolbar>
                </template>
                <template v-slot:item.url="{ item }">
                <span v-if="item">{{ getHostname(item) }}</span>
                </template>

                <template v-slot:item.rating_value="{ item }">
                <v-rating
                    :value="item.rating_value"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                ></v-rating>
                </template>
                <template v-slot:item.review_text="{ item }">
                <div class="reviewer">
                    <img class="profile-pic" :src="item.profile_picture" v-if="item.profile_picture" />

                    <v-avatar color="blue" size="30" v-if="!item.profile_picture"><v-icon small color="white">mdi-account</v-icon></v-avatar>
                    <h3>{{ item.name }}</h3>

                    <v-rating
                    :value="item.rating_value"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                    ></v-rating>

                    <v-chip
                    class="ma-2"
                    filter
                    small
                    >
                    {{ formatDate(item.date) }}
                    </v-chip>

                    <v-chip
                    class="ma-2"
                    filter
                    small
                    color="blue"
                    text-color="white"
                    >

                    {{ getHostname(item) }}
                    </v-chip>
                    <img class="source-logo" :src="require('../../assets/images/review-services/www.' + getHostname(item) + '.png')">
                </div>

                <em>
                    <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                        {{ displayExpansionTitle(item) }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                        <div v-html='item.review_text' />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    </v-expansion-panels>

                    <!-- <div v-html='item.review_text' /> -->
                    <!-- <div v-if="read_more[item.id] !== true && item.review_text.length > 150">
                    <div v-html='item.review_text.substring(0, 150) + "..."' />
                    <a v-if="item.review_text.length > 150" v-on:click="read_more[item.id] = true; testClick();">more</a>
                    </div>
                    <div v-if="read_more[item.id] === true">
                    <div v-html='item.review_text' />
                    </div> -->
                </em>
                </template>
            </v-data-table>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </panel-navigation>
</template>

<script>
  import BusinessesAPI from '@/plugins/api/endpoints/businesses.js';
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import moment from 'moment'

  import config from '@/config';

  export default {
    components: {
        PanelNavigation
    },
    data () {
      return {
        business: null,
        loading_reviews: true,
        totalReviews: 0,
        totalFilteredReviews: 0,
        reviews: [],
        options: {
          sortBy: "Newest First"
        },
        headers: [
          // { text: 'Reviewer', value: 'name' },
          // { text: 'Date', value: 'date', width: 150 },
          // { text: 'Site', value: 'url', width: 150 },
          // { text: 'Rating', value: 'rating_value' },
          { text: 'Reviews', value: 'review_text', html: true, sortable: false }
        ],
        read_more: [],
        percentage_complete: 0,
        search: '',
        sort_by_keys: [
          'Newest First',
          'Oldest First'
        ],
        filter_rating_keys: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "Positive",
          "Negative"
        ],
        filter_rating: "",
        filter_website_keys: config.reviewSites,
        filter_website: ""
      }
    },
    mounted() {
      this.fetchBusinessDetails();
    },
    methods: {
      fetchBusinessDetails: function() {
        var that = this;
        BusinessesAPI.get(this.$route.params.id)
        .then(function( response ) {
            if (response.data.success) {
              that.business = response.data.business;

              if (that.business.percentage_complete < 100) {
                setTimeout(function() {
                  that.fetchBusinessDetails();
                  that.getReviews(true);
                }, 2000);
              }
            }
            else {
              console.log('failed');
          }
        })
        .catch( function() {
          console.log('request failed');
        })
        .finally( function() {

        });
      },
      getReviews: function(ignore_loading) {
        var that = this;
        if (typeof(ignore_loading) == "undefined")
          that.loading_reviews = true;

        const { sortBy, sortDesc, page, itemsPerPage } = this.options

        this.loading = true;
        console.log('get revs');

        BusinessesAPI.getReviews(this.$route.params.id, sortBy, sortDesc, page, itemsPerPage, that.search || "", that.filter_rating || "", that.filter_website || "")
        .then(function( response ) {
            console.log('done')
            that.reviews = response.data.reviews;
            that.totalReviews = response.data.totalReviews;
            that.totalFilteredReviews = response.data.totalFilteredReviews;
            that.loading_reviews = false;

            for (var i in that.reviews) {
              that.read_more[that.reviews[i].id] = false;
            }
        });
      },
      testClick: function() {
        console.log('tc');
        console.log(this.read_more);
      },
      getHostname: function(item) {
        console.log(item);
        return new URL(item.url || item.listing.url).hostname.replace("www.", "");
      },
      formatDate: function(date) {
        return moment(String(date)).format('MM/DD/YYYY')
      },
      displayExpansionTitle(item) {
        if (item.review_title)
          return item.review_title;

        if (item.review_text)
          return item.review_text.substring(0, 50) + '...';

        return 'No text';
      }
    },
    watch: {
      options: {
        handler () {
          if (this.options.sortBy == 'Newest First') {
            this.options.sortBy = "date";
            this.options.sortDesc = true;
          }
          else if (this.options.sortBy == 'Oldest First') {
            this.options.sortBy = "date";
            this.options.sortDesc = false;
          }
          this.getReviews()
        },
        deep: true,
      },
      search: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      },
      filter_rating: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      },
      filter_website: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      }
    }
  }
</script>

<style>
  /* table .v-chip {
    float: right;
  } */

  .searching .v-card__title {
    font-size: 15px;
  }

  .source-logo {
    float: right;
    width: 22px;
    height: 22px;
    opacity: 0.8;
    margin-right: 0px;
    margin-top: 8px;
  }

  .profile-pic {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    float: left;
  }

  .v-data-table-header, .v-data-table__mobile-row__header {
    display: none;
  }
  
  header .v-toolbar__content {
    width: auto;
  }
</style>
