<template>

    <div v-if="review_funnel" style="height: 100%;">
        <div :style="'width: 100%; height: 100%; position: relative; font-family: ' + review_funnel.font_family.replace(' (Google)', '') + ';'">
            <div class="rgrf-header" :style="'background-color: ' + review_funnel.header_background_color + '; color: ' + review_funnel.header_text_color + '; text-align: ' + review_funnel.header_alignment.toLowerCase() + ';'">
                <div class="rgrf-business-name">
                    {{ review_funnel.company_name }}
                </div>

                <div class="rgrf-subtitle">
                    {{ review_funnel.header_subtitle }}
                </div>
            </div>

            <div class="rgrf-body" :style="'background-color: ' + review_funnel.background_color + '; color: ' + review_funnel.text_color">
                <div class="rgrf-logo" v-if="review_funnel.logo">
                    <img :src="review_funnel.logo" alt="" style="height: 60px;">
                </div>

                <div class="rgrf-review-process" :style="((review_funnel.direct_links_display == 'Icon + URL') ? '' : 'max-width: 500px;')">
                    <div class="shadow p-6" v-if="selected_view == 1">
                        <div class="text-center text-lg mb-4">
                            {{ review_funnel.positive_feedback_text }}
                        </div>

                        <div class="" :style="((review_funnel.direct_links_display == 'Icon' || review_funnel.direct_links_display == 'Icon + Site Name') ? 'text-align: center;' : '')">
                            <a :href="source.url" v-for="(source, index) in review_funnel.sources" :key="index" class="rounded-l shadow items-center rounded mb-2 p-3"
                                :class="((review_funnel.direct_links_display == 'Icon + Site Name' || review_funnel.direct_links_display == 'Icon') ? 'rgrf-icon-diret-link' : ' flex flex-row w-full')"
                                :style="'background-color: ' + review_funnel.direct_links_button_background + '; color: ' + review_funnel.direct_links_button_text_color + ';'"
                            target="review-platform">
                                <div v-if="review_funnel.direct_links_display == 'Icon + URL'" class="w-12 flex-shrink-0">
                                    <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded">
                                </div>
                                <div v-if="review_funnel.direct_links_display == 'Icon + URL'" class="truncate p-3"><span class="">{{ getHostname(source.site) }}</span>{{ getPathname(source.site) }}</div>

                                <div v-if="review_funnel.direct_links_display == 'Icon + Site Name'" class="flex-shrink-0 icon_site_name text-center">
                                    <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded" style="width: 70px; height: 70px;">
                                </div>
                                <div v-if="review_funnel.direct_links_display == 'Icon + Site Name'" class="truncate pt-3 text-center"><span class="" style="font-size: 14px;">{{ reviewSitesNamesAll["www." + getHostname(source.site)] || source.site_name }}</span></div>

                                <div v-if="review_funnel.direct_links_display == 'Icon'" class="w-12 flex-shrink-0">
                                    <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded">
                                </div>
                            </a>

                            <br clear="all" v-if="review_funnel.direct_links_display == 'Icon'" />
                        </div>
                    </div>

                    <div class="shadow p-6" v-if="selected_view == 0">
                        <div class="text-center text-lg mb-4">
                            {{ review_funnel.segmentation_text }}
                        </div>

                        <div v-if="review_funnel.segmentation_option == 'Faces'" class="flex flex-row items-center justify-center rounded-lg">

                            <img @click="performAction(2)" @mouseover="rating_selected = 'Bad';" @mouseout="rating_selected = '';" src="@/assets/images/icons/sad.svg" class="wp-3 cursor-pointer rounded-l-lg rgrf-face-image" style="" alt="sad">
                            <img @click="performAction(2)" @mouseover="rating_selected = 'Not Bad';" @mouseout="rating_selected = '';" src="@/assets/images/icons/confused.svg" class="wp-3 cursor-pointer rgrf-face-image" alt="indifferent">
                            <img @click="performAction(1)" @mouseover="rating_selected = 'Good';" @mouseout="rating_selected = '';" src="@/assets/images/icons/smiling.svg" class="wp-3 cursor-pointer rounded-r-lg rgrf-face-image" alt="happy">

                        </div>

                        <div v-if="review_funnel.segmentation_option == 'Thumbs'" class="flex flex-row items-center justify-center rounded-lg">

                            <i @click="performAction(2)" class="fa fa-thumbs-down rgrf-segmentation-thumbs red--text text--lighten-1" @mouseover="rating_selected = 'Bad';" @mouseout="rating_selected = '';"></i>
                            <i @click="performAction(1)" class="fa fa-thumbs-up rgrf-segmentation-thumbs green--text text--lighten-1" @mouseover="rating_selected = 'Good';" @mouseout="rating_selected = '';"></i>

                        </div>

                        <div v-if="review_funnel.segmentation_option == 'Hearts'" class="flex flex-row items-center justify-center rounded-lg">

                            <i @click="performAction(2)" class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 0) ? 'color: red' : '')" @mouseover="rating_selected = 'Bad'; hovered_item = 0;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(2)" class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 1) ? 'color: red' : '')" @mouseover="rating_selected = 'Subpar'; hovered_item = 1;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(2)" class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 2) ? 'color: red' : '')" @mouseover="rating_selected = 'Okay'; hovered_item = 2;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(1)" class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 3) ? 'color: red' : '')" @mouseover="rating_selected = 'Good'; hovered_item = 3;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(1)" class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 4) ? 'color: red' : '')" @mouseover="rating_selected = 'Great!'; hovered_item = 4;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>

                        </div>

                        <div v-if="review_funnel.segmentation_option == 'Stars'" class="flex flex-row items-center justify-center rounded-lg">

                            <i @click="performAction(2)" class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 0) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Bad'; hovered_item = 0;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(2)" class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 1) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Subpar'; hovered_item = 1;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(2)" class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 2) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Okay'; hovered_item = 2;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(1)" class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 3) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Good'; hovered_item = 3;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                            <i @click="performAction(1)" class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 4) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Great!'; hovered_item = 4;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>

                        </div>

                            <div v-if="review_funnel.segmentation_option == 'NPS'" class="flex flex-row items-center justify-center rounded-lg">

                                <v-rating
                                    v-model="rating"
                                    length="11"
                                    large
                                >
                                    <template v-slot:item="props">
                                    <v-icon
                                        :color="getNpsColor(props)"
                                        v-text="`mdi-numeric-${props.index}-box`"
                                        @click="rating = props.index + 1; chooseNpsScore(props.index)"
                                        @mouseover="selectNpsScore(props.index)"
                                        large
                                    ></v-icon>
                                    </template>
                                </v-rating>

                            </div>

                        <div class="rgrf-rating-selected">{{ rating_selected }}</div>
                    </div>

                    <div class="shadow p-6" v-if="selected_view == 2">

                        <div v-if="!submittedFeedback">
                            <div class="text-center text-lg mb-4">
                                {{ review_funnel.negative_feedback_text }}
                            </div>

                            <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <div v-html="error"></div>
                            </div>

                            <div v-show="!invite" class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.first_name_text }}
                                </label>
                                <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                            </div>

                            <div v-show="!invite" class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.last_name_text }}
                                </label>
                                <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                            </div>

                                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's name.</p> -->

                            <div v-show="!invite" class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.email_text }}
                                </label>
                                <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                            </div>

                                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's email.</p> -->

                            <div v-show="!invite" class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.phone_text }}
                                </label>
                                <input name="phone" ref="phone" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                            </div>

                            <div>
                                <textarea name="" id="" rows="10" class="w-full border rounded p-2" v-model="text" :placeholder="review_funnel.enter_feedback_text"></textarea>
                                <button class="border bg-gray-200 w-full p-2 rounded hover:bg-gray-100" style="cursor: pointer;" @click="submitFeedback()">{{ review_funnel.send_feedback_button_text }}</button>
                            </div>
                        </div>

                        <div v-if="submittedFeedback">
                            <div class="text-center text-lg mb-4">
                                Thank you for having taken your time to provide us with your valuable feedback.
                            </div>
                        </div>
                    </div>
                </div>

                <div id="rgrf-reviews_widget">
                    <WidgetsRender v-if="widget" :preview_widget="widget" />
                </div>
            </div>

            <div class="rgrf-footer" :style="'background-color: ' + review_funnel.footer_background_color + '; color: ' + review_funnel.footer_text_color + '; text-align: ' + review_funnel.footer_alignment.toLowerCase() + ';'">

                <div class="rgrf-google-compliant-link-wrapper text-center" v-if="selected_view == 2 && review_funnel.google_compliant_link_enabled">
                    <a :href="review_funnel.google_compliant_link" target="google-leave-review-link">{{ review_funnel.google_compliant_link_text }}</a>
                </div>

                <div class="rgrf-footer-text">
                    {{ review_funnel.footer_text }}
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import axios from 'axios'
import urlParser from 'url-parse'
import WidgetsRender from '@/views/panel/Business/Widgets/Render/Index.vue'
import reviewSitesNames from '@/config/review_sites/names';
import reviewSitesNamesAll from '@/config/review_sites/names_all';
import reviewSitesUrls from '@/config/review_sites/urls';

export default {
  metaInfo () {
    return {
      title: "Review Funnel Builder | " + this.$appName
    }
  },
  components: {
	WidgetsRender
  },
  data () {
    return {
        review_funnel: null,
        rating_selected: "",
        widget: null,
        text: "",

        rating: 8,

        error: null,

        selected_view: 0,

        hovered_item: -1,

        reviewSitesUrls: reviewSitesUrls,
        reviewSitesNames: reviewSitesNames,
        reviewSitesNamesAll: reviewSitesNamesAll,

        funnelLoaded: false,

        invite: null,

        submittedFeedback: false
    }
  },
  methods: {
    getHostname(url) {
      return urlParser(url).hostname.replace("www.", "")
    },
    getPathname(url) {
      let parsed_url = urlParser(url)

      if (url.includes("google"))
        return parsed_url.pathname + decodeURIComponent(parsed_url.query)

      return parsed_url.pathname
    },
    getIconUrl(url) {

      return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");

    },
	getReviewFunnel: async function() {
        let self = this;
		try {
			let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/review-funnels/get-review-funnel-by-short-name?short_name=' + this.$route.params.review_funnel_short_name, {
			headers: {
				'Authorization': 'Bearer ' + this.$store.state.auth.jwt
			},
			})
			
			this.review_funnel = response.data.review_funnel

            if (this.review_funnel.leave_a_review_process == 'Direct Links')
                this.selected_view = 1
            
            this.short_name = this.review_funnel.short_name;

			this.funnelLoaded = true

            if (this.review_funnel.reviews_widget) {
                try {
                    let exploded = this.review_funnel.reviews_widget.split('token=');
                    let exploded2 = exploded[1].split('"');
                    let exploded3 = exploded2[0].split('&');

                    let widget_token = exploded3[0];

                    let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + widget_token;


                    axios.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                    }).then(function(response) {
                        self.widget = response.data.widget_data.widget
                    });
                }
                catch(e) {
                    self.widget = null
                }
            }

            self.setCustomCSS();
		}catch(e){
		}
	},

    setCustomCSS() {
        // Apply custom CSS
        if (this.review_funnel.custom_css) {
            if (document.getElementById("rgrf-custom-css-sheet") === null) {
                var styleSheet = document.createElement("style")
                styleSheet.type = "text/css"
                styleSheet.innerText = this.review_funnel.custom_css.replace(/\n/g, " ")
                styleSheet.id = 'rgrf-custom-css-sheet';
                document.body.appendChild(styleSheet);
            }
            else {
                document.getElementById("rgrf-custom-css-sheet").innerText = this.review_funnel.custom_css.replace(/\n/g, " ");
            }
        }
        else {
            if (document.getElementById("rgrf-custom-css-sheet") === null) {
                var styleSheet = document.createElement("style")
                styleSheet.type = "text/css"
                styleSheet.innerText = ""
                styleSheet.id = 'rgrf-custom-css-sheet';
                document.body.appendChild(styleSheet);
            }
            else {
                document.getElementById("rgrf-custom-css-sheet").innerText = '';
            }
        }
        // END Apply custom CSS
    },

    async loadInvite(inviteCode) {
      try {
        let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/invite/${inviteCode}?t=${this.$route.query.t}&n=${this.$route.query.n}`, {})
        if (response.status == 200) {
          this.invite = response.data
        }
      } catch (error) {
      }
    },


    async submitFeedback() {
      try {
        
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/feedback`, {
            review_funnel_id: this.review_funnel.id,
            inviteCode: ((this.invite) ? this.invite.inviteCode : null),
            first_name: this.$refs.first_name.value,
            last_name: this.$refs.last_name.value,
            email: this.$refs.email.value,
            phone: this.$refs.phone.value,
            text: this.text,
        })

        this.submittedFeedback = true

      } catch (error) {
        this.error = error.response.data.message
      }
    },

    getNpsColor(props) {
        if (props.isFilled) {
            if (props.index == 0)
                return "blue lighten-2";

            if (props.index == 1)
                return "blue lighten-1";

            if (props.index == 2)
                return "blue";

            if (props.index == 3)
                return "blue darken-1";

            if (props.index == 4)
                return "blue darken-2";

            if (props.index == 5)
                return "green lighten-2";

            if (props.index == 6)
                return "green lighten-1";

            if (props.index == 7)
                return "green";

            if (props.index == 8)
                return "green darken-1";

            if (props.index == 9)
                return "green darken-2";

            if (props.index == 10)
                return "green darken-3";
        }

        return '';
    },

    selectNpsScore(score) {
        this.rating = score + 1;

        if (score == 0)
            this.rating_selected = "Not At All";

        if (score <= 4)
            this.rating_selected = "Not Likely";

        if (score == 5)
            this.rating_selected = "Neutral";
        
        if (score == 6)
            this.rating_selected = "Likely";
        
        if (score == 7 || score == 8)
            this.rating_selected = "Very Likely";
        
        if (score == 9 || score == 10)
            this.rating_selected = "Extreemly Likely";
    },

    chooseNpsScore(score) {
        let sel_view;

        if (score < 7)
            sel_view = 2;
        else
            sel_view = 1;

        if (this.review_funnel.links_type == "External Links") {
            if (sel_view == 2) {
                window.open(this.review_funnel.external_link_frowny_face);
            }
            else {
                window.open(this.review_funnel.external_link_smiley_face);
            }
        }
        else {
            this.selected_view = sel_view;
        }
    },

    performAction(sel_view) {
        if (this.review_funnel.links_type == "External Links") {
            if (sel_view == 2) {
                window.open(this.review_funnel.external_link_frowny_face);
            }
            else {
                window.open(this.review_funnel.external_link_smiley_face);
            }
        }
        else {
            this.selected_view = sel_view;
        }
    }
  },
  created() {
    this.getReviewFunnel();

    if(this.$route.query.i) {
        this.loadInvite(this.$route.query.i)
    }

    if (this.$route.query.fd)
      this.choosedSmiley = true;
  },
	watch: {
		'review_funnel.custom_css': {
			handler() {
				this.setCustomCSS()
			}
		},
        "source_form_url": {
            handler () {
                this.checkUrlValid()
            }
        },
        "review_funnel.reviews_widget": {
            handler () {
                let self = this;
                try {
                    let exploded = this.review_funnel.reviews_widget.split('token=');
                    let exploded2 = exploded[1].split('"');
                    let exploded3 = exploded2[0].split('&');

                    let widget_token = exploded3[0];

                    let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + widget_token;

                    axios.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                    }).then(function(response) {
                        self.widget = response.data.widget_data.widget
                    });
                }
                catch(e) {
                    self.widget = null
                }
            }
        },
	}
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&family=Source+Sans+Pro&family=Roboto&family=Lato&family=PT+Sans&family=EB+Garamond&family=Raleway&family=Ubuntu&family=Montserrat&family=Courgette');
  
  a {
      text-decoration: none !important;
  }

  .rgrf-header {
      width: 100%;
      min-height: 80px;
      padding: 20px;
  }

  .rgrf-footer {
      /* margin-top: 30px; */
      width: 100%;
      min-height: 60px;
      background-color: #f5f5f5;
      padding: 20px;
  }

  .rgrf-footer-text {
      font-size: 15px;
  }

  .rgrf-business-name {
      font-size: 20px;
  }

  .rgrf-subtitle {
      padding-top: 10px;
      font-size: 14px;
  }

  .rgrf-body {
      /* background-color: #f5f5f5; */
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      min-height: calc(100% - 165px);
  }

  .rgrf-body .rgrf-logo {
      padding-top: 20px;
      padding-bottom: 10px;
      text-align: center;
  }

  .rgrf-body .rgrf-logo img {
      display: initial;
  }

  .rgrf-review-process {
      width: 100%;
      max-width: 800px;
      margin: auto;
      padding-top: 40px;
  }

  .rgrf-review-process img.rgrf-face-image {
      height: 100px;
      margin: 20px;
  }
  
  .rgrf-icon-diret-link {
      margin-right: 10px;
      display: inline-block;
  }

  .rgrf-segmentation-thumbs {
      cursor: pointer;
      font-size: 70px;
      color: #727272;
      margin: 30px;
  }

  .rgrf-segmentation-heart, .rgrf-segmentation-star {
      cursor: pointer;
      font-size: 70px;
      color: grey;
      margin: 10px;
  }

  /* .rgrf-segmentation-heart:hover {
      color: red;
  }

  .rgrf-segmentation-star:hover {
      color: #FFCA28;
  } */

  .rgrf-rating-selected {
      padding-top: 10px;
      text-align: center;
      height: 20px;
  }

  div#rgrf-reviews_widget {
      padding-top: 40px;
      position: relative;
  }

  div.rgrf-google-compliant-link-wrapper {
      position: absolute;
      width: 100%;
      left: 0px;
      margin-top: -50px;
  }

  div.rgrf-google-compliant-link-wrapper a {
      color: #CCCCCC;
      font-size: 12px;
  }

  .v-rating {
      text-align: center;
      white-space: break-spaces;
  }

  @media screen and (max-width: 500px) {
      .rgrf-review-process img.rgrf-face-image {
            height: 70px;
            margin: 17px;
      }

      .rgrf-segmentation-heart, .rgrf-segmentation-star {
          font-size: 40px;
      }
  }
</style>