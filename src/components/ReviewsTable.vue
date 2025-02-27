<template>
  <div>

    <v-skeleton-loader v-if="initial_loading"
      type="article, article, article"
    ></v-skeleton-loader>

    <div class="w-full mb-4 reviews-wrapper" v-if="!initial_loading">

      <div v-if="dashboard != 'true'" class="float-right mr-4" style="margin-top: -65px;">
        <p class="text-gray-600" style="font-size: 16px;">
          Left to respond: <strong>{{ notRespondedCount }}</strong>
        </p>
      </div>

      <div v-if="dashboard != 'true'" class="float-right mr-4" style="margin-top: -65px; padding-right: 160px;">
        <v-radio-group
          v-model="showByResponded"
          row
        >
          <v-radio
            label="Show All"
            value="all"
          ></v-radio>
          <v-radio
            label="Responded"
            value="responded"
          ></v-radio>
          <v-radio
            label="Not Responded"
            value="not-responded"
          ></v-radio>
        </v-radio-group>
      </div>

      <div style="clear: both;"></div>

        <v-toolbar
            dark
            class=""

            v-if="dashboard == 'true'"
        >
          <span v-if="!date">Recent Reviews</span>
          <span v-if="date">Reviews</span>
        </v-toolbar>

        <v-card
          class="pa-2"
          outlined
          tile
        >

        <v-data-table
            :headers="headers"
            :items="reviews"
            :options.sync="options"
            :server-items-length="totalFilteredReviews"
            :items-per-page="((social_posting == 'true') ? 9999999 : 5)"
            class="elevation-1"
            :loading="loading_reviews"
            :footer-props="{
            itemsPerPageOptions: ((social_posting == 'true') ? [9999999] : [5, 10, 20, 30, 40, 50, 100]),
            showFirstLastPage: true
            }"
            :hide-default-footer="dashboard == 'true' || social_posting == 'true'"
            mobile-breakpoint="10"
        >

        <template v-slot:header>
          <v-toolbar
              dark
              color="green lighten-1"
              class="mb-1"

              v-if="dashboard == 'false' && social_posting == 'false'"
          >
              <v-row>
              <v-col cols="12" md="3" sm="3" xs="6">
                  <v-text-field
                  v-model="searchLocal"
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
                      v-model="sortByLocal"
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
                      v-model="filterRatingLocal"
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
                      v-model="filterWebsiteLocal"
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

                <div style="float: right; padding-top: 0px; width: 100px; font-weight: bold; font-size: 17px; text-align: right;">
                  {{ reviewSitesNames["www." + getHostname(item)] }}
                  
                  <img class="source-logo -mr-2" :src="require('../assets/images/review-services/www.' + getHostname(item) + '.png')">                 

                </div>

                <div style="float: left;">
                  <span class="ml-2">
                      <img class="profile-pic" referrerPolicy="no-referrer" :src="item.profile_picture" v-if="item.profile_picture" />
                      <v-avatar color="blue" size="30" v-if="!item.profile_picture"><v-icon small color="white">mdi-account</v-icon></v-avatar>
                  </span>
                  <h3 style="padding-top: 5px;">
                      {{ item.name }}
                  </h3>
                </div>

                <v-rating
                :value="item.rating_value"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
                ></v-rating>

                <i class="ml-2">{{ formatDate(item.date) }}</i>
            </div>

            <div style="float: right;">
              <div v-if="me && (me.company_type == 'business' || me.company_type == 'location')">
                <v-btn v-show="!responding[item.id]"
                  color="deep-orange lighten-1"
                  class="mt-2 white--text float-right"
                  small
                  @click="selectReviewItem(item.id)"
                >
                  Post
                  <v-icon
                    right
                    dark
                  >
                    mdi-google-circles-extended
                  </v-icon>
                </v-btn>
              </div>

              <div v-if="item.url">
                <div v-if="item.responded" class="-mr-4">
                  <v-chip
                    class="ma-2"
                    color="gray"
                    small
                  >
                    Responded
                  </v-chip>
                </div>

                <div v-else>
                  <v-btn v-show="!responding[item.id]"
                    color="blue-grey"
                    class="mt-2 white--text"
                    small
                    @click="respondToReview(item)"
                  >
                    Respond
                    <v-icon
                      right
                      dark
                    >
                      mdi-message
                    </v-icon>
                  </v-btn>

                  <div v-if="responding[item.id]">
                    Responded? <br />

                    <v-btn
                      color="success"
                      class="mt-2 white--text"
                      small
                      @click="respondedToReview(item)"
                    >
                      <v-icon
                        dark
                      >
                        mdi-check
                      </v-icon>
                    </v-btn>

                    <v-btn
                      color="grey"
                      class="mt-2 ml-1 white--text"
                      small
                      @click="notRespondedToReview(item)"
                    >
                      <v-icon
                        dark
                      >
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>

            </div>

            <div style="padding-top: 10px;">
                 {{ item.review_text }}
            </div>

            <div v-if="me.company_type == 'admin' || me.company_type == 'agency'" class="mt-3" style="font-size: 12px;">
              <i class="fa fa-briefcase"></i>
              {{ item.user.company_name }}
              <span class="not-mobile">&nbsp;&nbsp;
              |
              &nbsp;&nbsp;
              </span>
              <br class="mobile-only" />
              <span>
                <span class="not-mobile">&nbsp;&nbsp;</span>
                <i class="fa fa-map-marker"></i>
                <span class="not-mobile">&nbsp;</span>&nbsp;
                {{ item.user.address }} {{ item.user.street_number }}<span v-if="(item.user.address || item.user.street_number)">, </span>{{ item.user.city }} <span v-if="!item.user.city">{{ item.user.country }}</span> &nbsp;<span v-if="item.user.company_type == 'business'" style="font-weight: bold;">(Main)</span>
              </span>
            </div>
            </template>
        </v-data-table>

        </v-card>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import moment from 'moment'
  import reviewSitesNames from '@/config/review_sites/names';
  import reviewSites from '@/config/review_sites/list';

  export default {
    components: {
        PanelNavigation
    },
    props: ['dashboard', 'social_posting', 'sortBy', 'sortDesc', 'page', 'itemsPerPage', 'search', 'filter_rating', 'filter_website', 'review_sites', 'date'],
    data () {
      return {
        options: {
          sortBy: "Newest First",
          sortDesc: true
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
        filter_website_keys: reviewSites,
        showByResponded: "all",
        searchLocal: "",
        sortByLocal: "Newest First",
        filterRatingLocal: "",
        filterWebsiteLocal: "",
        review_manage_items: [
          { title: 'Social Post' }
        ],
        reviewSitesNames: reviewSitesNames,
        responding: {}
      }
    },
    computed: {
      ...mapState({
        reviews: state => state.reviews.reviews,
        loading_reviews: state => state.reviews.loading_reviews,
        initial_loading: state => state.reviews.initial_loading,
        totalFilteredReviews: state => state.reviews.totalFilteredReviews,
        totalReviews: state => state.reviews.totalReviews,
        notRespondedCount: state => state.reviews.notRespondedCount,
        me: state => state.me.me
      })
    },
    methods: {
      getReviews: function(ignore_loading) {

        const { sortBy, sortDesc, page, itemsPerPage } = this.options

        let params = {
          dashboard: this.dashboard,
          social_posting: this.social_posting,
          social_posting_rating: ((this.$parent && this.$parent.$parent.me) ? this.$parent.$parent.me.social_posting_rating : 'undefined'),
          social_posting_review_sites: ((this.$parent && this.$parent.$parent.me) ? this.$parent.$parent.me.social_posting_review_sites : 'undefined'),
          sortBy: sortBy,
          sortDesc: sortDesc,
          page: page,
          itemsPerPage: itemsPerPage,
          search: this.searchLocal || "",
          filter_rating: this.filterRatingLocal || "",
          filter_website: this.filterWebsiteLocal || "",
          showByResponded: this.showByResponded
        };

        if (typeof(this.review_sites) != "undefined")
          params.review_sites = this.review_sites;
        
        if (typeof(this.date) != "undefined")
          params.date = this.date;

        this.$store.dispatch('reviews/fetch', params);

        return;
      },
      getHostname: function(item) {
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
      },
      selectReviewItem(review_id) {
        this.$router.push('social-share/' + review_id)
      },
      respondToReview(item) {
        this.responding[item.id] = true;
        window.open(item.url);
        this.getReviews()
      },
      async respondedToReview(item) {
        this.responding[item.id] = false;

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/reviews/responded`, {
          id: item.id
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })

        this.getReviews();
      },
      notRespondedToReview(item) {
        this.responding[item.id] = false;
        this.getReviews()
      }
    },
    watch: {
      options: {
        handler () {
          this.getReviews()
        }
      },
      showByResponded: {
        handler () {
          this.getReviews();
        }
      },
      sortByLocal: {
        handler () {
          if (this.sortByLocal == 'Newest First') {
              this.options.sortBy = "date";
              this.options.sortDesc = true;
            }
            else if (this.sortByLocal == 'Oldest First') {
              this.options.sortBy = "date";
              this.options.sortDesc = false;
            }
            this.getReviews()
        }
      },
      searchLocal: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      },
      filterRatingLocal: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      },
      filterWebsiteLocal: {
        handler () {
          this.options.page = 1
          this.getReviews()
        }
      }
    },
    mounted () {
      var that = this
      this.$store.state.reviews.initial_loading = true
      setTimeout(function() {
        that.getReviews()
      }, 1000)
    },
  }
</script>

<style>
  .reviews-wrapper table td {
    padding: 20px !important;
  }

	.v-avatar {
		cursor: pointer;
		border: solid 1px #CCCCCC !important;
	}

	.v-avatar.add-more {
    border: solid 1px #58c1d6 !important;
    color: #58c1d6 !important;
	}

	.v-avatar.selected {
		cursor: pointer;
		border: solid 3px #58c1d6 !important;
	}

  .searching .v-card__title {
    font-size: 15px;
  }

  .reviewer {
    padding-bottom: 10px;
  }

  table .v-rating {
    display: inline-block;
    margin-left: 20px;
    margin-top: -1px;
  }

  table h3 {
    display: inline-block;
    padding-left: 8px;
    padding-top: 3px;
    font-weight: bold;
  }

  .reviews-wrapper table .v-chip {
    float: right;
  }

  .manage-btn {
    float: right;
  }

  .searching .v-card__title {
    font-size: 15px;
  }

  .source-logo {
    /* float: right; */
    display: inline-block;
    width: 22px;
    height: 22px;
    opacity: 0.8;
    margin-right: 0px;
    margin-top: 0px;
  }

  .profile-pic {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    float: left;
  }

  /* .v-data-table-header, .v-data-table__mobile-row__header {
    display: none;
  } */
  
  header .v-toolbar__content {
    width: auto;
  }

  .v-application .elevation-1 {
      border: 0px;
      webkit-box-shadow: none !important;
      box-shadow: none !important;
  }

  .reviewer {
    padding-bottom: 10px;
    position: relative;
  }

  .reviewer .v-rating {
    display: inline-block;
    margin-left: 20px;
    margin-top: -1px;
  }

  .reviewer h3 {
    display: inline-block;
    padding-left: 8px;
    padding-top: 3px;
    font-weight: bold;
  }

  @media screen and (max-width: 767px) {
    .reviews-wrapper table td {
      padding: 5px !important;
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
    
    .reviewer .v-rating {
      display: block;
      margin-left: 10px;
    }

    .manage-btn {
      position: absolute;
      top: 0px;
      right: 30px;
    }

    .source-logo {
      position: absolute;
      top: 0px;
      right: 0px;
    }

    .reviews-wrapper table .v-chip {
      float: none;
    }
  }
</style>