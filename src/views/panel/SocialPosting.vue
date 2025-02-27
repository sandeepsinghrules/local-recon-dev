<template>

  <div>

    <dialog-customize-themes ref="customizeThemes"></dialog-customize-themes>
    <dialog-matching-reviews ref="dialogMatchingReviews"></dialog-matching-reviews>
    <dialog-posting-log ref="dialogPostingLog"></dialog-posting-log>
    
    <panel-navigation>


      <div v-if="$route.params.review_id" class="flex flex-wrap">
        <div class="w-full sm:pr-6 mb-8">
          <h2 class="text-lg font-semibold mb-2 pt-1">Social Sharing</h2>
          <hr class="border-b border-gray-100">
          <p class="text-sm mb-4 text-gray-700 mt-2">Select your social channel(s), customize your image and edit your post content. Then share your post or download your image.</p>

          <!-- <v-card
              elevation="2"
          >
            <v-skeleton-loader v-if="!review" type="article"></v-skeleton-loader>

            <div class="reviewer" v-if="review">
                <v-avatar color="blue" size="30" v-if="!review.profile_picture || 1"><v-icon small color="white">mdi-account</v-icon></v-avatar>
                <h3>{{ review.name }}</h3>

                <v-rating
                :value="review.rating_value"
                color="amber"
                dense
                half-increments
                readonly
                size="20"
                ></v-rating>

                <img class="source-logo" :src="require('../../assets/images/review-services/www.' + getHostname(review) + '.png')">
            </div>

            <em v-if="review">
                <div v-html='review.review_text' />
            </em>
          </v-card> -->

        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 sm:pr-10 mb-6">
          <h2 class="text-lg font-semibold mb-2 pt-1">Connected Accounts</h2>
          <hr class="border-b border-gray-100">
          <p v-if="!$route.params.review_id" class="text-sm mb-4 text-gray-700 mt-2">Connect your accounts to share on social media automatically.</p>
          <p v-if="$route.params.review_id" class="text-sm mb-4 text-gray-700 mt-2">Select which accounts you would like.</p>

          <div class="">
            <div @click="AuthProvider('facebook')" class="auth-provider bg-super-light border-2 rounded float-left mr-2 mb-2 cursor-pointer" style="position: relative;">
              <div class="float-left">
                <img src="@/assets/images/review-services/www.facebook.com.png" alt="" style="height: 36px;" v-bind:style="{ opacity: ((me && !me.facebook) ? 0.5 : 1) }">
              </div>
              <!-- <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">facebook</div> -->

              <div v-if="me && me.facebook" class="float-left pl-1 text-center" style="font-size: 12px; padding-top: 6px;">
                <v-checkbox
                  v-model="me.social_posting_accounts"
                  :label="me.facebook.name"
                  value="facebook"
                  hide-details
                ></v-checkbox>

                <button v-if="!$route.params.review_id" class="bg-red-600 text-white inline-block rounded px-2 cursor-pointer ml-1" style="padding-top: 2px; position: absolute; top: 10px; right: 5px;" @click="removeSocialAccount('facebook')"><i class="fa fa-times text-red"></i></button>
              </div>

              <div v-if="me && !me.facebook" class="text-right" style="padding-top: 6px; padding-right: 2px;">
                <button class="bg-blue-700 hover:bg-blue-600 text-white inline-block rounded px-2 cursor-pointer" style="padding-top: 2px; font-size: 12px;">Connect</button>
              </div>

            </div>

            <div v-show="false" @click="AuthProvider('instagram')" class="auth-provider bg-super-light border-2 rounded float-left mr-2 mb-2 cursor-pointer" style="position: relative;">
              <div class="float-left">
                <img src="@/assets/images/review-services/www.instagram.com.png" alt="" style="height: 36px;" v-bind:style="{ opacity: ((me && !me.instagram) ? 0.5 : 1) }">
              </div>
              <!-- <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">instagram</div> -->

              <div v-if="me && me.instagram" class="float-left pl-1 text-center" style="font-size: 12px; padding-top: 6px;">
                <v-checkbox
                  v-model="me.social_posting_accounts"
                  :label="me.instagram.name"
                  value="instagram"
                  hide-details
                ></v-checkbox>

                <button v-if="!$route.params.review_id" class="bg-red-600 text-white inline-block rounded px-2 cursor-pointer ml-1" style="padding-top: 2px; position: absolute; top: 10px; right: 5px;" @click="removeSocialAccount('instagram')"><i class="fa fa-times text-red"></i></button>
              </div>

              <div v-if="me && !me.instagram" class="text-right" style="padding-top: 6px; padding-right: 2px;">
                <button class="bg-indigo-700 hover:bg-indigo-600 text-white inline-block rounded px-2 cursor-pointer" style="padding-top: 2px; font-size: 12px;">Connect</button>
              </div>

            </div>

            <div @click="AuthProvider('google')" class="auth-provider bg-super-light border-2 rounded float-left mr-2 mb-2 cursor-pointer" style="position: relative;">
              <div class="float-left">
                <img src="@/assets/images/review-services/www.google.com.png" alt="" style="height: 36px;" v-bind:style="{ opacity: ((me && !me.google) ? 0.5 : 1) }">
              </div>
              <!-- <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">google</div> -->

              <div v-if="me && me.google" class="float-left pl-1 text-center" style="font-size: 12px; padding-top: 6px;">
                <v-checkbox
                  v-model="me.social_posting_accounts"
                  :label="me.google.name"
                  value="google"
                  hide-details
                ></v-checkbox>

                <button v-if="!$route.params.review_id" class="bg-red-600 text-white inline-block rounded px-2 cursor-pointer ml-1" style="padding-top: 2px; position: absolute; top: 10px; right: 5px;" @click="removeSocialAccount('google')"><i class="fa fa-times text-red"></i></button>
              </div>

              <div v-if="me && !me.google" class="text-right" style="padding-top: 6px; padding-right: 2px;">
                <button class="bg-red-500 hover:bg-red-400 text-white inline-block rounded px-2 cursor-pointer" style="padding-top: 2px; font-size: 12px;">Connect</button>
              </div>

            </div>

            <div @click="AuthProvider('twitter')" class="auth-provider bg-super-light border-2 rounded float-left mr-2 mb-2 cursor-pointer" style="position: relative;">
              <div class="float-left">
                <img src="@/assets/images/review-services/www.twitter.com.png" alt="" class="" style="height: 36px;" v-bind:style="{ opacity: ((me && !me.twitter) ? 0.5 : 1) }">
              </div>
              
              <!-- <div class="bg-gray-300 text-gray-600 text-sm text-center py-1 rounded-b-sm">Twitter</div> -->

              <div v-if="me && me.twitter" class="float-left pl-1 text-center" style="font-size: 12px; padding-top: 6px;">
                <v-checkbox
                  v-model="me.social_posting_accounts"
                  :label="me.twitter.name"
                  value="twitter"
                  hide-details
                ></v-checkbox>
                
                <button v-if="!$route.params.review_id" class="bg-red-600 text-white inline-block rounded px-2 cursor-pointer ml-1" style="padding-top: 2px; position: absolute; top: 10px; right: 5px;" @click="removeSocialAccount('twitter')"><i class="fa fa-times text-red"></i></button>
              </div>

              <div v-if="me && !me.twitter" class="text-right" style="padding-top: 6px; padding-right: 2px;">
                <button class="bg-blue-400 hover:bg-blue-300 text-white inline-block rounded px-2 cursor-pointer" style="padding-top: 2px; font-size: 12px;">Connect</button>
              </div>

            </div>

            <br clear="all" /><br clear="all" />

          </div>

          <template v-if="me">
            <v-row class="-mt-3">
              <v-col v-if="me.facebook" cols="12" md="12" sm="12" xs="12">
                <p class="text-sm mb-2 text-gray-700">Select Facebook Page:</p>

                <div>
                  <i class="fa fa-spin fa-spinner" v-if="!facebook_pages_loaded"></i>

                  <v-select v-if="facebook_pages_loaded"
                      v-model="me.selected_facebook_page"
                      flat
                      solo-inverted
                      hide-details
                      :items="facebook_pages"
                      item-value='id'
                      item-text='name'
                      prepend-inner-icon="mdi-facebook"
                      label="No FB Page Selected"
                  ></v-select>
                </div>
              </v-col>

              <v-col v-if="me.google" cols="12" md="12" sm="12" xs="12">
                <p class="text-sm mb-4 text-gray-700">Select GMB Listing:</p>

                <div>
                  <i class="fa fa-spin fa-spinner" v-if="!gmb_listings_loaded"></i>

                  <v-select v-if="gmb_listings_loaded"
                      v-model="me.selected_gmb"
                      flat
                      solo-inverted
                      hide-details
                      :items="gmb_listings"
                      item-value='id'
                      item-text='name'
                      prepend-inner-icon="mdi-google"
                      label="No GMB Listing Selected"
                  ></v-select>
                </div>
              </v-col>

              <v-col v-if="me.instagram" cols="12" md="12" sm="12" xs="12">
                <p class="text-sm mb-4 text-gray-700">Select Instagram Business Account:</p>

                <div>
                  <i class="fa fa-spin fa-spinner" v-if="!instagram_profiles_loaded"></i>

                  <v-select v-if="instagram_profiles_loaded"
                      v-model="me.selected_insta"
                      flat
                      solo-inverted
                      hide-details
                      :items="instagram_profiles"
                      item-value='id'
                      item-text='name'
                      prepend-inner-icon="mdi-instagram"
                      label="No Instagram Profiles Available"
                  ></v-select>
                </div>
              </v-col>
            </v-row>
          </template>

          <br clear="all" />
          
          <div v-show="!$route.params.review_id">
            <div class="float-right" style="font-size: 12px;">
              <div class="float-left pr-3" v-if="me">
                <v-text-field class="auto-posting-frequency" style="width: 140px; margin-top: -20px;"
                  v-model="me.social_posting_frequency"
                  prefix="Every"
                  suffix="days"
                  type="number"
                  hide-details
                  single-line
                  min="1"
                ></v-text-field>
              </div>

              <v-switch v-if="me"
                v-model="me.social_posting_enabled"
              ></v-switch>
            </div>
            
            <h2 class="text-lg font-semibold mb-2">Auto-Posting</h2>
            <hr class="border-b border-gray-100">
            <div class="text-sm mb-1 text-gray-700 mt-2">
              Setup auto posting based on specific filters.

              <v-btn
                  class="float-right"
                  color="primary"
                  style="width: 120px;"
                  outlined
                  plain
                  small
                  @click="$refs.dialogPostingLog.show()"
                >
                  <i class="fa fa-file-alt"></i> &nbsp; &nbsp; View Log
                </v-btn>
            </div>

            <div class="clearfix"></div>
            <br clear="all" />

            <div class="">
              <template v-if="me">
                <v-row class="">
                  <v-col cols="12" md="6" sm="6" xs="6">
                    <v-select
                        v-model="me.social_posting_rating"
                        flat
                        solo-inverted
                        hide-details
                        :items="rating_value_options"
                        item-value='id'
                        item-text='text'
                        prepend-inner-icon="mdi-star"
                        label="Rating Value"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xs="6">
                    <v-select
                        v-model="me.social_posting_long_reviews"
                        flat
                        solo-inverted
                        hide-details
                        :items="long_reviews_options"
                        item-value='id'
                        item-text='text'
                        prepend-inner-icon="mdi-vector-polyline"
                        label="Long Reviews"
                    ></v-select>
                  </v-col>
                </v-row>
              </template>

              <div class="clearfix"></div>

              <div class="float-right">
                <v-btn
                  class=" mt-3"
                  color="primary"
                  style="width: 120px;"
                  outlined
                  plain
                  small
                  @click="$refs.dialogMatchingReviews.show()"
                >
                  <i class="fa fa-star"></i> &nbsp; &nbsp;
                  <i v-if="matching_reviews_loading" class="fa fa-spinner fa-spin"></i>
                  <span v-if="!matching_reviews_loading">{{ matching_reviews_count }} Found</span>
                </v-btn>
              </div>
            </div>
          </div>
 
          <template v-if="me && !$route.params.review_id && !fetchingListings">

            <br />

            <div class="flex flex-row flex-wrap justify-between items-start mb-6">
              <div class="text-sm mb-1 text-gray-700">Select review platforms to post from:</div>
            </div>

            <div v-if="listings.length > 0" class="mb-6">
              <div v-for="reviewplatform in listings" :key="reviewplatform.id" class="bg-gray-100 rounded-l flex flex-row items-center justify-between bg-white rounded w-full mb-2">

                <div class="flex flex-row items-center truncate">
                  <div class="w-12 flex-shrink-0">
                    <img :src="getIconUrl(reviewplatform.url)" alt="" class="rounded-l border border-gray-100">
                  </div>
                  <div class="truncate p-3 text-gray-400">
                    <div class="float-left">
                      <v-checkbox
                        :value="reviewplatform.id"
                        v-model="me.social_posting_review_sites"
                        hide-details
                      >
                      </v-checkbox>
                    </div>

                    <span class="text-gray-900">{{ getHostname(reviewplatform.url) }}</span>{{ getPathname(reviewplatform.url) }}</div>
                </div>

              </div>

              <div v-if="listings.length == 0">
                You don't have any review platforms. <a href="#">Click here</a> to add review platforms.
              </div>
            </div>

          </template>

          <br clear="all" />



        </div>

        

        <div class="w-full md:w-1/2 sm:pl-2 mb-6">
          <div class="flex flex-row items-top justify-between">
            <h1 class="text-lg font-semibold">Social Content</h1>
            <!-- <div class="bg-green-500 hover:bg-green-400 text-white inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': saving}" @click="save">Save</div> -->
          </div>
          <hr class="border-b border-gray-100">
          <p class="text-sm mb-4 text-gray-700 mt-2">Edit or enter your default text to post along with the social review image.</p>
          <div class="">
            <div>
              <template class="mt-5"  v-if="me">
                <v-textarea
                    name="input-7-1"
                    filled
                    auto-grow
                    v-model="me.social_content"
                ></v-textarea>
              </template>
            </div>

            <div class="clearfix"></div>
          </div>

          <h2 class="text-lg font-semibold mb-2">Themes</h2>
          <hr class="border-b border-gray-100">
          <p class="text-sm mb-4 text-gray-700 mt-2">Select Theme, or <a href="javascript: void(0);" @click="$refs.customizeThemes.show()"><i class="fa fa-cog"></i> customize</a>, up to 10 themes.</p>

          <div class="">
            <template v-if="me">
              <v-row class="pl-2 pt-3">
                <v-avatar v-for="theme in me.social_posting_themes" :key="theme.id" :class="'mr-7 mb-3 ' + ((selected_theme == theme.id) ? 'selected' : '')" v-bind:style="{ backgroundColor: theme.background_color, color: theme.text_color }" @click="selectTheme(theme)">
                  <img
                    :src="theme.background_image"

                    class="social-share-circle"

                    v-if="theme.background_image"
                  >
                  <span class="headline" style="position: absolute;">Aa</span>
                </v-avatar>

                <v-avatar class="add-more" @click="$refs.customizeThemes.show()">
                  <span class="headline"><i class="fa fa-images"></i></span>
                </v-avatar>
              </v-row>
            </template>

            <div class="clearfix"></div>
          </div>


          <h2 class="text-lg font-semibold mb-2 mt-2">Preview</h2>
          <hr class="border-b border-gray-100">
          <p class="text-sm mb-4 text-gray-700 mt-2">Use filters to preview theme for Facebook, Google, Twitter or Instagram at different sizes.</p>
          <div class="">

            <div>
              <v-row>
                    <v-col cols="12" md="6" sm="6" xs="6">
                        <v-select
                            v-model="previewOption"
                            flat
                            solo-inverted
                            hide-details
                            :items="preview_options"
                            prepend-inner-icon="mdi-eye"
                            label="Preview"
                            @change="runGenerateImage()"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" sm="6" xs="6">
                        <v-select
                          v-model="previewSize"
                          flat
                          solo-inverted
                          hide-details
                          :items="preview_sizes"
                          prepend-inner-icon="mdi-sort"
                          label="Size"
                          @change="runGenerateImage()"
                        ></v-select>
                    </v-col>
                  </v-row>

                  <div class="mt-4">
                    <v-card
                    elevation="2"
                >

                  <div v-if="!generatingImage && !generatedImage" style="text-align: center; padding: 100px;">
                    Please select a theme to generate preview.
                  </div>

                  <div v-if="generatingImage" style="text-align: center; padding: 100px;">
                    <i class="fa fa-spin fa-spinner"></i>
                    <br />
                    Generating Image...
                  </div>

                  <img :src="generatedImage" v-if="!generatingImage && generatedImage" style="width: 100%;" />

                </v-card>
              </div>

              <div class="mt-2">
                <a :href="generatedImage" v-if="!generatingImage && generatedImage" target="download-graphic"><i class="fa fa-download"></i> Download Graphic</a>
              </div>
            </div>

            <div class="clearfix"></div>
          </div>

        </div>

      </div>


      <div class="flex flex-wrap">
        <div v-if="$route.params.review_id" class="flex flex-wrap pt-2">
          <div class="w-full sm:pr-6">
            <hr class="border-b border-gray-100">

            <div class="text-center">
              <v-btn
                class=" mt-5"
                :loading="loading2"
                :disabled="loading2 || generatingImage || !generatedImage || !selected_theme || me.social_posting_accounts.length == 0"
                color="success"
                @click="publishSocialPost()"
              >
                <i class="fa fa-check"></i> &nbsp; &nbsp; Publish Social Post
                <template v-slot:loader>
                  <span>Posting... Please wait</span>
                </template>
              </v-btn>
            </div>
          </div>
        </div>

        <div v-if="!$route.params.review_id" class="flex flex-wrap pt-2">
          <div class="w-full sm:pr-6">
            <hr class="border-b border-gray-100">

            <div class="text-center">
              <v-btn
                class="mt-5"
                :loading="loading2"
                :disabled="loading2"
                color="success"
                @click="save()"
              >
                <i class="fa fa-check"></i> &nbsp; &nbsp; Save Settings
                <template v-slot:loader>
                  <span>Saving... Please wait</span>
                </template>
              </v-btn>

              <v-chip
                v-if="saved"
                class="ma-2 mt-6 ml-3"
                color="green"
                outlined
                @click="saved = false"
                style="position: absolute;"
              >
                <v-icon left>
                  mdi-check
                </v-icon>
                Saved
              </v-chip>
            </div>
          </div>
        </div>

      </div>

    </panel-navigation>

  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import DialogCustomizeThemes from '@/components/dialogs/dialogCustomizeThemes.vue'
import moment from 'moment'
import urlParser from 'url-parse'
import DialogMatchingReviews from '@/components/dialogs/social-posting/matchingReviews.vue'
import DialogPostingLog from '@/components/dialogs/social-posting/postingLog.vue'

export default {
  metaInfo () {
    return {
      title: "Social Posting | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    DialogCustomizeThemes,
    DialogMatchingReviews,
    DialogPostingLog
  },
  data: function() {
    return {
      saved: false,

      previewOption: "Facebook",
      preview_options: [
        'Facebook',
        'Google',
        'Twitter',
        'Instagram (download only)'
      ],
      previewSize: "Text: Medium",
      preview_sizes: [
        'Text: Small',
        'Text: Medium',
        'Text: Large'
      ],
      rating_value_options: [
        {id: 3, text: 'Rating at least 3'},
        {id: 4, text: 'Rating at least 4'},
        {id: 5, text: 'Rating at least 5'}
      ],
      long_reviews_options: [
        {id: 'truncate', text: 'Truncate long reviews'},
        {id: 'filter out', text: 'Filter out long reviews'}
      ],
      matching_reviews_loading: true,
      matching_reviews_count: false,
      saving: false,
      window_open: null,
      window_proc: null,
      selected_theme: null,
      generatingImage: false,
      review: null,
      generatedImage: null,
      loader: false,
      loading2: false,
      facebook_pages_loaded: false,
      facebook_pages: [],
      gmb_listings_loaded: false,
      gmb_listings: false,
      instagram_profiles_loaded: false,
      instagram_profiles: []
    }
  },
  computed: {
    ...mapState({
      fetchingListings: state => state.listings.fetchingListings,
      listings: state => state.listings.listings,
      integrations: state => state.integrations.integrations,
      me: state => state.me.me
    })
  },
  methods: {

    async save() {
      let self = this
      this.saving = true
      this.error = null

      try {
        this.saved = true
        await this.$store.dispatch('me/save', {
          social_content: this.me.social_content.trim(),
          company_name: this.me.company_name.trim(),
          templateEmail1: this.me.templateEmail1.trim(),
          templateSMS1: this.me.templateSMS1.trim(),
          templateEmail2: this.me.templateEmail2.trim(),
          templateSMS2: this.me.templateSMS2.trim(),
          templateEmail3: this.me.templateEmail3.trim(),
          templateSMS3: this.me.templateSMS3.trim(),
          userSegmentation: this.me.userSegmentation,
          social_posting_accounts: this.me.social_posting_accounts,
          social_posting_enabled: ((this.me.social_posting_enabled) ? 1 : 0),
          social_posting_frequency: this.me.social_posting_frequency,
          social_posting_theme: this.selected_theme,
          social_posting_size: this.previewSize,
          social_posting_rating: this.me.social_posting_rating,
          social_posting_long_reviews: this.me.social_posting_long_reviews,
          social_posting_review_sites: this.me.social_posting_review_sites,
          selected_facebook_page: this.me.selected_facebook_page,
          selected_gmb: this.me.selected_gmb,
          selected_insta: this.me.selected_insta
          })
          this.$store.dispatch('me/fetch')
        }catch(error){
          console.log(error)
          this.error = error
        }

        this.saving = false

        setTimeout(function() {
          self.saved = false
        }, 2000)

      },


       AuthProvider(provider) {

          if (this.me[provider])
            return;

          let self = this;

          this.window_open = this.popupCenter(process.env.VUE_APP_API_ENDPOINT + '/auth/'+provider + "?jwt=" + this.$store.state.auth.jwt + "&host=" + window.location.origin, 'window_open', 800, 900);

          if (this.window_proc) {
            clearInterval(this.window_proc);
            this.window_proc = null;
          }

          this.window_proc = setInterval(function() {
            try {
              // console.log(self.window_open.location.pathname);
              if (self.window_open.location.pathname == "/social-login-done") {
                self.window_open.close();
                self.window_open = null;
                clearInterval(self.window_proc);
                self.window_proc = null;

                self.$store.dispatch('me/fetch')
              }
            }
            catch (e) {
              console.log(e);
            }
          }, 300);

          return;

        },

        popupCenter(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
          },

      selectTheme(theme) {
        this.selected_theme = theme.id;
        this.runGenerateImage()
      },

      async runGenerateImage() {
        this.generatingImage = true
        let review_id = (this.review) ? this.review.id : '';

        // this.generatingImage = false
        // this.generatedImage = process.env.VUE_APP_API_ENDPOINT + '/me/generate-image?review_id=' + review_id + '&selected_theme=' + this.selected_theme + '&previewOption=' + this.previewOption + '&previewSize=' + this.previewSize;

        // + '&preview=1'

        try {
          let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/generate-image?review_id=' + review_id + '&selected_theme=' + this.selected_theme + '&previewOption=' + this.previewOption + '&previewSize=' + this.previewSize + '&preview=1', {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })
          this.generatingImage = false
          this.generatedImage = response.data.url
        }catch(e){
          console.log(e)
        }
      },

      removeSocialAccount(type) {
        let self = this
        this.$swal({
            title: "Are you sure?",
            text: "This will delete the account permanently!",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
         }).then(function(result) {

            if (result.isConfirmed) {
              try {
                axios.delete(process.env.VUE_APP_API_ENDPOINT + '/me/delete-social-account/' + type, {
                  headers: {
                    'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                  }
                })

              }catch(e){
                console.log(e)
              }

              self.me[type] = null;
            }

         });
      },

      async getReview() {
        let self = this
        if (this.$route.params.review_id) {
          try {
            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/reviews/' + this.$route.params.review_id, {
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              }
            })
            this.review = response.data.review
            if (self.me.social_posting_theme)
              self.selected_theme = JSON.parse(JSON.stringify(self.me.social_posting_theme));
            else
              self.selected_theme = JSON.parse(JSON.stringify(self.me.social_posting_themes[0].id));
            
            // self.selected_theme = self.me.social_posting_themes[0].id;

            this.runGenerateImage()
          }catch(e){
            console.log(e)
          }
        }
        else {
          if (self.me.social_posting_theme)
            self.selected_theme = JSON.parse(JSON.stringify(self.me.social_posting_theme));
          else
            self.selected_theme = JSON.parse(JSON.stringify(self.me.social_posting_themes[0].id));

          this.runGenerateImage()
        }
      },

      async getFacebookPages() {
        this.facebook_pages = []
        this.facebook_pages_loaded = false
        if (this.me.facebook) {
          try {
            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/get-fb-pages', {
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              }
            })
            this.facebook_pages = response.data.pages
            this.facebook_pages_loaded = true

            if (!this.me.selected_facebook_page && this.facebook_pages.length > 0)
              this.me.selected_facebook_page = this.facebook_pages[0].id

          }catch(e){
            console.log(e)
          }
        }
      },

      async getGMBListings() {
        this.gmb_listings = []
        this.gmb_listings_loaded = false
        console.log("MEEEE2")
        console.log(this.me)
        if (this.me.google) {
          try {
            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/get-gmb-listings', {
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              }
            })
            this.gmb_listings = response.data.listings

            console.log('gmbbbb1')
            console.log(this.me.selected_gmb)

            if (!this.me.selected_gmb && this.gmb_listings.length > 0)
              this.me.selected_gmb = this.gmb_listings[0].id

            console.log('gmbbbb2')
            console.log(this.me.selected_gmb)

            this.gmb_listings_loaded = true

          }catch(e){
            console.log(e)
          }
        }
      },

      async getInstagramProfiles() {
        this.instagram_profiles = []
        this.instagram_profiles_loaded = false
        console.log("MEEEE2")
        console.log(this.me)
        if (this.me.google) {
          try {
            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/get-instagram-profiles', {
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              }
            })
            this.instagram_profiles = response.data.profiles
            this.instagram_profiles_loaded = true

            console.log('instaaaa1')
            console.log(this.me.selected_insta)

            if (!this.me.selected_insta && this.instagram_profiles.length > 0)
              this.me.selected_insta = this.instagram_profiles[0].id

            console.log('instaaaa2')
            console.log(this.me.selected_insta)

          }catch(e){
            console.log(e)
          }
        }
      },

      async publishSocialPost() {
        let self = this
        this.loader = 'loading2'
        this.loading2 = true

        try {
            await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/publish-social-post', {
              review_id: this.$route.params.review_id,
              social_content: this.me.social_content.trim(),
              selected_accounts: this.me.social_posting_accounts,
              selected_theme: this.selected_theme,
              generatedImage: this.generatedImage,
              selected_facebook_page: this.me.selected_facebook_page,
              selected_gmb: this.me.selected_gmb,
              selected_insta: this.me.selected_insta
            } , {
              headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              },
            })
            
            this.$swal({
                title: "Posting completed!",
                text: "Your post has been published successfully! Please give it a few minutes before checking it on the social accounts.",
                showCancelButton: false,
                confirmButtonText: 'Back to reviews'
             }).then(function() {
                self.$router.push('/reviews')
             });

          }catch(e){
            console.log(e)
          }
      },

      async getMatchingReviewsCount() {
        let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/social-posting-matching-reviews-count?social_posting_rating=' + this.me.social_posting_rating + "&review_platforms=" + this.me.social_posting_review_sites, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        this.matching_reviews_loading = false
        this.matching_reviews_count = response.data.matching_reviews_count
      },

      getHostname(url) {
        return urlParser(url).hostname.replace("www.", "")
      },
      getPathname(url) {
        return urlParser(url).pathname + decodeURIComponent(urlParser(url).query);
      },
      formatDate: function(date) {
        return moment(String(date)).format('MM/DD/YYYY')
      },
      getIconUrl(url) {
        return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");
      },
  },
  watch: {
      me: function(val, oldVal) {
        if (!val || !oldVal)
          return;

        if (val.facebook !== oldVal.facebook) {
          this.getFacebookPages()
        }

        if (val.google !== oldVal.google) {
          this.getGMBListings()
        }

        if (val.instagram !== oldVal.instagram) {
          this.getInstagramProfiles()
        }
      },

      'me.social_posting_frequency': function() {
        console.log('me.social_posting_frequency');
        console.log(this.me.social_posting_frequency);

        if (parseInt(this.me.social_posting_frequency) < 1 || this.me.social_posting_frequency == "") {
          this.me.social_posting_frequency = 1;
        }
      },

      'me.social_posting_rating': function() {
        console.log('me.social_posting_rating');
        console.log(this.me.social_posting_rating);

        this.getMatchingReviewsCount()
      },

      'me.social_posting_review_sites': function() {
        console.log('me.social_posting_review_sites');
        console.log(this.me.social_posting_review_sites);

        this.getMatchingReviewsCount()
      }
  },
  created() {
    var self = this;

    runStartScripts();

    function runStartScripts() {
      if (!self.me || self.me === null) {
        setTimeout(function() {
          runStartScripts();
        }, 1000);
        return;
      }

      self.getReview()

      setTimeout(function() {
        self.getFacebookPages()
      }, 1000)

      setTimeout(function() {
        self.getGMBListings()
      }, 1000)

      setTimeout(function() {
        self.getInstagramProfiles()
      }, 1000)

      setTimeout(function() {
        self.getMatchingReviewsCount();
      }, 1000)

      // self.selected_theme = self.me.social_posting_themes[0].id;
      // self.runGenerateImage()
    }
    // this.$store.dispatch('integrations/fetch')

    this.$store.state.listings.fetchingListings = true
    this.$store.dispatch('listings/fetch', { dashboard: false })
  }
}
</script>

<style>
  header .v-toolbar__content {
    width: auto;
  }

  .v-application .elevation-1 {
      border: 0px;
      webkit-box-shadow: none !important;
      box-shadow: none !important;
  }

  .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
    font-size: 12px;
  }

  .v-input--selection-controls.v-input {
    margin-bottom: -4px;
  }

  .auto-posting-frequency input[type="number"] {
    text-align: center;
  }

  .auth-provider {
    width: 48%;
    text-align: center;
    padding: 3px;
    /* padding-bottom: 3px; */
  }
</style>

<style lang="scss" scoped>
/*
.integrations {
  .integration {
    width: 160px;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: transform .2s;
    cursor: pointer;

    border-radius: 5px;
    opacity: 0.8;

    &:hover {
      transform: scale(1.05);
      opacity: 1.0;
    }

    .integration-icon {
      height: 60px;
      background-color: rgb(247, 247, 247);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(221, 221, 221);
      font-size: 34px;
      
    }

    .integration-title {
      background-color: rgb(243, 243, 243);
      text-align: center;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      color: rgb(114, 114, 114);
    }
  }
}*/
</style>


