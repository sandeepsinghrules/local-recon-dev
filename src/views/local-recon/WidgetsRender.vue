<template>
    <div class="lr-widget-wrapper" v-if="widget_data" style="height: 100%;">
        <div  v-if="widget_data.old_or_new == 1 && widget_data.type != 'seo-rank-tracker' && widget_data.type != 'reputation-revenue-calculator' && widget_data.type != 'customer-retention-calculator' && widget_data.type != 'star-rating-calculator'" style="height: 100%;">
            <RenderModernWidget :widget="widget_data" />
        </div>
          
        <div v-if="widget_data.old_or_new == 0 || (widget_data.old_or_new == 1 && (widget_data.type == 'seo-rank-tracker' || widget_data.type == 'reputation-revenue-calculator' || widget_data.type == 'customer-retention-calculator' || widget_data.type == 'star-rating-calculator'))">

            <div v-if="widget_data.properties.display_type == 'Popup' || widget_data.properties.display_type == 'Headerbar + Popup'" class="rg-modal-header" style="margin-bottom: -20px;">
                Get Your Audit

                <a href="javascript: void(0);" class="rg-modal-close-btn" @click="hideWidget()"><i class="fa fa-times"></i></a>
            </div>
            
            <div v-if="widget_data.type == 'default'">
                <div id="lr-widget-html" v-html="widget_data.properties.html"
                    :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding-bottom: 20px; padding-top: 20px;'"
                ></div>

                <v-combobox
                    label=""
                    v-model="autocompleteLocationModel"
                    :items="locationFoundItems"
                    :search-input.sync="locationSearchText"
                    item-text="value"
                    item-value="id"
                    hide-no-data
                    return-object
                    :filter="filterPlaces"
                    color="green"
                    @change="selectPlace()"
                >
                </v-combobox>
            </div>

            <div v-if="widget_data.type == 'seo-audit'">
                <div id="lr-widget-seo-html" v-html="widget_data.properties.seo_audit_html"
                    :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding-bottom: 20px; padding-top: 20px;'"
                ></div>
            </div>

            <div id="grid-tracker-wrapper" v-if="widget_data.type == 'grid-tracker'">
                <div id="lr-widget-grid-html" :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding: 20px;'">
                    <div class="lr-grid-tracker-title" :style="'color: ' + widget_data.properties.main.title_color">
                        The Quickest Way To Discover 
                        <br />
                        Your Local Visibility
                    </div>

                    <div id="lr-grid-tracker-subtitle">
                        Track your local SEO practice accurately and beat your competitors down the local search ranking.
                    </div>

                    <div style="clear: both; padding-top: 30px;">
                        <div class="lr-grid-location-wrapper">
                            <div style="float: left; padding-left: 12px; padding-top: 5px;">
                                <i class="mdi mdi-map-marker-outline" style="font-size: 24px; color: #090C32;"></i>
                            </div>
                            <div id="rg-grdtc-place-search-field">
                                <!-- <input type="text" placeholder="Your Location (e.g. :Pizza Hut Brooklyn)" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" /> -->
                                <v-combobox
                                    label=""
                                    v-model="autocompleteLocationModel"
                                    :items="locationFoundItems"
                                    :search-input.sync="locationSearchText"
                                    item-text="value"
                                    item-value="id"
                                    hide-no-data
                                    hide-details
                                    return-object
                                    :filter="filterPlaces"
                                    color="green"
                                    @change="selectPlace()"
                                    outlined
                                    placeholder="Your Location (e.g. :Pizza Hut)"
                                    style="boder: 0px; padding: 0px; font-size: 17px;"
                                >
                                </v-combobox>
                            </div>

                            <div class="lr-grid-divider">
                                |
                            </div>

                            <div class="lr-grid-magnify-icon">
                                <i class="mdi mdi-magnify" style="font-size: 24px; color: #090C32;"></i>
                            </div>

                            <div class="lr-query-field-wrapper">
                                <input id="rg-grdtc-search-query-field" type="text" placeholder="Search Query (e.g. : pizza)" style="padding-left: 10px;  width: 100%; height: 43px; outline: none;" />
                            </div>
                        </div>
                        <div class="lr-grid-run-scan-btn">
                            <button id="rg-grid-tracker-widget-btn" style="width: 121px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                            :style="'background: ' + widget_data.properties.main.button_color + '; color: ' + widget_data.properties.main.button_text_color"
                            >Run Scan</button>
                        </div>

                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>

            <div id="review-response-generator-tracker-wrapper" v-if="widget_data.type == 'review-response-generator'">
                <div id="lr-widget-grid-html" :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding: 20px;'">
                    <div class="lr-grid-tracker-title" :style="'color: ' + widget_data.properties.main.title_color">
                        The Quickest Way To Generate
                        <br />
                        Review Responses
                    </div>

                    <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                        We help automate generation of review responses. Use our tool to generate responses for all your customers.
                    </div>

                    <div style="clear: both; padding-top: 30px;">
                        <div class="lr-review-response-generator-left">
                            <div style="float: left; padding-left: 12px; padding-top: 5px;">
                                <i class="mdi mdi-star-outline" style="font-size: 24px; color: #090C32;"></i>
                            </div>

                            <div style="float: left; width: calc(100% - 50px); padding-left: 12px;">
                                <input v-model="review_text" type="text" placeholder="Write review..." style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                            </div>
                        </div>
                        <div class="lr-grid-run-scan-btn" style="width: 200px;">
                            <button id="rg-grid-tracker-widget-btn" style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                :style="'background: ' + widget_data.properties.main.button_color + '; color: ' + widget_data.properties.main.button_text_color"
                                @click="generateReviewResponses()"
                            >Generate Responses</button>
                        </div>

                        <div style="clear: both;"></div>

                        <div v-if="generatingResponses" class="mt-3"><div class="text-center p-4"><i class="fa fa-spin fa-spinner"></i></div></div>

                        <div style="clear: both;"></div>
                        <br clear="all "/>

                        <div v-if="!generatingResponses && generated_responses.length > 0">
                            <div v-for="(item, index) in generated_responses" :key="index" style="clear: both; position: relative; background: #F1F1F1; padding: 20px; border-left: solid 6px #2477F6; border-radius: 5px; margin-bottom: 10px; color: #757B89; font-size: 12px;">
                            {{ item }}

                            <a
                                href="javascript: void(0);"
                                v-clipboard:copy="item"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                class="text-xs float-right"
                                style="position: absolute; bottom: 7px; right: 7px;"
                            >
                                <i class="mdi mdi-content-copy"></i>
                                Copy
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="widget_data.type == 'seo-rank-tracker'">
                <SeoRankTracker :widget="widget_data" />
            </div>

            <div id="gmb-audit-tracker-wrapper" v-if="widget_data.type == 'gmb-audit'">
                <div id="lr-widget-grid-html" :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding: 20px;'">
                    <div class="lr-grid-tracker-title" :style="'color: ' + widget_data.properties.main.title_color">
                        Insights To Improve
                        <br />
                        Your Google Business Profile
                    </div>

                    <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                        Take control of your GMB profile, see why your competitors rank better and improve your Google Business Profile.
                    </div>

                    <div style="clear: both; padding-top: 30px;">
                        <div class="lr-gmb-audit-left">
                            <div style="float: left; width: calc(100% - 0px); padding-left: 12px;">

                                <v-combobox
                                    label=""
                                    v-model="autocompleteLocationModel"
                                    :items="locationFoundItems"
                                    :search-input.sync="locationSearchText"
                                    item-text="value"
                                    item-value="id"
                                    hide-no-data
                                    hide-details
                                    return-object
                                    :filter="filterPlaces"
                                    color="green"
                                    @change="selectPlace()"
                                    outlined
                                    placeholder="Your Business (e.g. :Pizza Hut)"
                                    style="boder: 0px; padding: 0px; font-size: 17px;"
                                >
                                </v-combobox>
                            </div>
                        </div>
                        <div class="lr-grid-run-scan-btn" style="width: 200px;">
                            <button id="rg-grid-tracker-widget-btn" style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                :style="'background: ' + widget_data.properties.main.button_color + '; color: ' + widget_data.properties.main.button_text_color"
                                @click="submitGMBAudit()"
                            >Get Started</button>
                        </div>

                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>

            <div id="citation-audit-tracker-wrapper" v-if="widget_data.type == 'citation-audit'">
                <div id="lr-widget-grid-html" :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding: 20px;'">
                    <div class="lr-grid-tracker-title" :style="'color: ' + widget_data.properties.main.title_color">
                        Scan Your Business
                    </div>

                    <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                        Citation Tracker looks for your business information on the most important citation sites, listing your details and highlighting inaccuracies.
                    </div>

                    <div style="clear: both; padding-top: 30px;">
                        <div class="lr-gmb-audit-left">
                            <div style="float: left; width: calc(100% - 0px); padding-left: 12px;">

                                <v-combobox
                                    label=""
                                    v-model="autocompleteLocationModel"
                                    :items="locationFoundItems"
                                    :search-input.sync="locationSearchText"
                                    item-text="value"
                                    item-value="id"
                                    hide-no-data
                                    hide-details
                                    return-object
                                    :filter="filterPlaces"
                                    color="green"
                                    @change="selectPlace()"
                                    outlined
                                    placeholder="Your Business (e.g. :Pizza Hut)"
                                    style="boder: 0px; padding: 0px; font-size: 17px;"
                                >
                                </v-combobox>
                            </div>
                        </div>
                        <div class="lr-grid-run-scan-btn" style="width: 200px;">
                            <button id="rg-grid-tracker-widget-btn" style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                :style="'background: ' + widget_data.properties.main.button_color + '; color: ' + widget_data.properties.main.button_text_color"
                                @click="submitCitationAudit()"
                            >Find Citations</button>
                        </div>

                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>

            <div id="review-link-generator-wrapper" v-if="widget_data.type == 'review-link-generator'">
                <div id="lr-widget-grid-html" :style="'border: solid 1px ' + widget_data.properties.main.border_color + '; background: #FFFFFF; border-radius: 5px; padding: 20px;'">
                    <div class="lr-grid-tracker-title" :style="'color: ' + widget_data.properties.main.title_color">
                        Google Review Link &
                        <br />
                        Place ID Generator
                    </div>

                    <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                        With our free tool, you can generate a Google review link for customers, also find the Place ID, Ludocid, and FID codes.
                    </div>

                    <div style="clear: both; padding-top: 30px;">
                        <div class="lr-gmb-audit-left">
                            <div style="float: left; width: calc(100% - 0px); padding-left: 12px;">

                                <v-combobox
                                    label=""
                                    v-model="autocompleteLocationModel"
                                    :items="locationFoundItems"
                                    :search-input.sync="locationSearchText"
                                    item-text="value"
                                    item-value="id"
                                    hide-no-data
                                    hide-details
                                    return-object
                                    :filter="filterPlaces"
                                    color="green"
                                    @change="selectPlace()"
                                    outlined
                                    placeholder="Your Business (e.g. :Pizza Hut)"
                                    style="boder: 0px; padding: 0px; font-size: 17px;"
                                >
                                </v-combobox>
                            </div>
                        </div>
                        <div class="lr-grid-run-scan-btn" style="width: 200px;">
                            <button id="rg-grid-tracker-widget-btn" style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                :style="'background: ' + widget_data.properties.main.button_color + '; color: ' + widget_data.properties.main.button_text_color"
                                @click="submitReviewLinkGenerator()"
                            >Fetch Links and Ids</button>
                        </div>

                        <div style="clear: both;"></div>

                        <div v-if="generatingResponses" class="mt-3"><div class="text-center p-4"><i class="fa fa-spin fa-spinner"></i></div></div>

                        <div style="clear: both;"></div>
                        <br clear="all "/>

                        <div v-if="!generatingResponses && generated_responses.length > 0">
                            <div v-for="(item, index) in generated_responses" :key="index" style="clear: both; position: relative; background: #F1F1F1; padding: 20px; border-left: solid 6px #2477F6; border-radius: 5px; margin-bottom: 10px; color: #757B89; font-size: 12px;">
                            {{ item }}

                            <a
                                href="javascript: void(0);"
                                v-clipboard:copy="item"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                class="text-xs float-right"
                                style="position: absolute; bottom: 7px; right: 7px;"
                            >
                                <i class="mdi mdi-content-copy"></i>
                                Copy
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              <div v-if="widget_data.type == 'star-rating-calculator'" style="padding: 20px;">
                <StarRating :widget="widget_data" :CalculatorStyle="widget_data.calculator_style" :key="widgetKey" />
              </div>

              <div v-if="widget_data.type == 'customer-retention-calculator'" style="padding: 20px;">
                <CustomerRetention :widget="widget_data" :CalculatorStyle="widget_data.calculator_style" :key="widgetKey" />
              </div>

              <div v-if="widget_data.type == 'reputation-revenue-calculator'" style="padding: 20px;">
                <ReputationRevenue :widget="widget_data" :CalculatorStyle="widget_data.calculator_style" :key="widgetKey" />
              </div>
        </div>
    </div>
</template>

<script>
import { GetSuggestions } from '@/utils/PlaceUtils'
// import { GetPlaceDetails } from '@/utils/PlaceUtils'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'
import SeoRankTracker from '@/views/local-recon/WidgetTemplates/SeoRankTracker.vue'
  
import StarRating from '@/views/local-recon/WidgetTemplates/Calculators/StarRating.vue'
import CustomerRetention from '@/views/local-recon/WidgetTemplates/Calculators/CustomerRetention.vue'
import ReputationRevenue from '@/views/local-recon/WidgetTemplates/Calculators/ReputationRevenue.vue'

import RenderModernWidget from '@/views/local-recon/Modern/Render.vue'

export default {
    components: {
      SeoRankTracker,
      StarRating,
      CustomerRetention,
      ReputationRevenue,
      RenderModernWidget
    },
    data () {
      return {
        widgetKey: 0,
        display_widget: true,
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        widget_data: false,
        scroll_working: false,
        current_visible: 0,
        show_rating: false,
        reviews_start: 0,
        finishedLoadingReviews: false,

        company_name: "",

        autocompleteLocationModel: null,
        locationSearchText: null,
        locationEntries: [],

        business_location: {},

        review_text: "",
        generatingResponses: false,
        generated_responses: []
      }
    },
    computed: {
        visibleReviews () {
            return this.widget_data.reviews.filter(p=>p.isActive).length
        },
        locationFoundItems () {
            return this.locationEntries
        }
    },
    methods: {
        onCopy: function (e) {
            this.$swal({
            title: "Copied",
            text: "Response copied! Open the review link and paste your review.",
            showCancelButton: false,
            });
        },
        onError: function (e) {
            alert('Failed to copy the text to the clipboard')
            console.log(e);
        },

        async generateReviewResponses() {
            let self = this

            if (!self.review_text)
                return;

            self.generatingResponses = true

            let new_height = document.querySelector(".lr-widget-wrapper").offsetHeight + 180;

            setTimeout(function() {
                parent.postMessage({
                    event_id: 'resizeWidgetIframe_' + self.widget_data.id,
                    data: {
                        new_height: new_height
                    }
                },"*");  //  `*` on any domain
            }, 200);

            let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/reviews/get-responses`, {
            review_text: self.review_text
            }, {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
            })

            self.generatingResponses = false
            self.generated_responses = response.data.responses;

            new_height = document.querySelector(".lr-widget-wrapper").offsetHeight + 180;

            setTimeout(function() {
                parent.postMessage({
                    event_id: 'resizeWidgetIframe_' + self.widget_data.id,
                    data: {
                        new_height: new_height
                    }
                },"*");  //  `*` on any domain
            }, 200);
        },
        
        showDialog: function() {
            let self = this
            this.dialog = true
            setTimeout(function() {
                self.show_rating = true
            }, 100);

            parent.postMessage("showReviews","*");  //  `*` on any domain  
        },
        closeDialog: function() {
            this.dialog = false, this.show_rating = false, parent.postMessage('closeReviews','*')
        },
        getWidgetData: async function() {
            let self = this
            try {
                let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + this.$route.params.token;

                // Preview
                let exploded = window.location.href.split("?fw");
                if (exploded.length > 1) {
                    url = url + "?fw=" + exploded[1];
                }
                
                let response = await axios.get(url, {

                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })
                
                this.widget_data = response.data.widget_data

                if (!this.widget_data.properties.currency)
                    this.widget_data.properties.currency = "USD";
                
                if (!this.widget_data.properties.currency_display_position)
                    this.widget_data.properties.currency_display_position = "Before Amount";

                console.log(this.widget_data);

                setTimeout(function() {
                    let els = document.querySelectorAll('*[contenteditable="true"]');
                    
                    for (var i in els) {
                        let el = els[i];

                        try {
                            el.removeAttribute("contenteditable");
                        }
                        catch(e) {}
                    }

                    let businessNameEl = document.querySelector('#business_name');
                    let websiteUrlEl = document.querySelector('#website_url');

                    let new_height = document.querySelector(".lr-widget-wrapper").offsetHeight + 60;

                    if (self.widget_data.old_or_new == 1)
                        new_height = document.querySelector(".lr-widget-wrapper").offsetHeight;

                    parent.postMessage({
                        event_id: 'resizeWidgetIframe_' + self.widget_data.id,
                        data: {
                            new_height: new_height
                        }
                    },"*");  //  `*` on any domain

                    if (self.widget_data.type == "default" || self.widget_data.type == "seo-audit") {
                        if (businessNameEl) {
                            let placeholder = businessNameEl.value;
                            let content = document.querySelector('.v-input');
                            let body = document.querySelector('.lr-input');
                            content.parentNode.removeChild(content);
                            body.innerHTML = '';
                            body.appendChild(content);
                            
                            document.querySelector(".lr-input input").setAttribute("placeholder", placeholder);
                        }

                        if (websiteUrlEl) {
                            let placeholder = websiteUrlEl.value;
                            websiteUrlEl.value = '';
                            websiteUrlEl.placeholder = 'placeholder';
                            
                            document.querySelector(".lr-input input").setAttribute("placeholder", placeholder);
                        }

                        $(".lr-button").click(function() {
                            self.submit();
                        });
                    }
                    else {
                        self.calculateDdrMrrArr();
                    }

                    console.log('self.widget_data.type', self.widget_data.type)
                    if (self.widget_data.type == "grid-tracker") {
                        $("#rg-grid-tracker-widget-btn").click(function() {
                            self.submitGridTracker();
                        });
                    }
                }, 100);

                // Apply custom CSS
                if (self.widget_data.properties.custom_css) {
                    if (document.getElementById("lr-widget-custom-css-sheet") === null) {
                        var styleSheet = document.createElement("style")
                        styleSheet.type = "text/css"
                        styleSheet.innerText = self.widget_data.properties.custom_css.replace(/\n/g, " ")
                        styleSheet.id = 'lr-widget-custom-css-sheet';
                        document.body.appendChild(styleSheet);
                    }
                    else {
                        document.getElementById("lr-widget-custom-css-sheet").innerText = self.widget_data.properties.custom_css.replace(/\n/g, " ");
                    }
                }
                else {
                    if (document.getElementById("lr-widget-custom-css-sheet") === null) {
                        var styleSheet = document.createElement("style")
                        styleSheet.type = "text/css"
                        styleSheet.innerText = ""
                        styleSheet.id = 'lr-widget-custom-css-sheet';
                        document.body.appendChild(styleSheet);
                    }
                    else {
                        document.getElementById("lr-widget-custom-css-sheet").innerText = '';
                    }
                }
                // END Apply custom CSS

            }catch(e){
                console.log('errorzzzzzzz')
                console.log(e)
            }
        },
        async submit() {
            let self = this;

            if (document.querySelector("#website_url")) {
                await this.submitSEOAudit();
                return;
            }

            if (!self.company_name) return;

            $(".lr-input input").prop('disabled', true);

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-search', {
                company_name: self.company_name,
                widget_uuid: self.widget_data.uuid,
                place_id: self.autocompleteLocationModel.id,
                properties: self.business_location
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
        },
        async submitGridTracker() {
            let self = this;

            if (!this.business_location.place_id) {
                $("#rg-grdtc-place-search-field input").focus();
                return;
            }

            if (!$("#rg-grdtc-search-query-field").val()) {
                $("#rg-grdtc-search-query-field").focus();
                return;
            }

            console.log(this.business_location);

            let gridTrackerBusinessObject = {
                name: this.business_location.name,
                lat: this.business_location.geometry.location.lat,
                lng: this.business_location.geometry.location.lng,
                place_id: this.business_location.place_id
            };

            // console.log('gridTrackerBusinessObject', gridTrackerBusinessObject)

            // let gridTrackerParameters = btoa(JSON.stringify(gridTrackerBusinessObject));

            window.top.location = window.location.origin + "/grid-tracker/app?w=" + self.widget_data.uuid + '&u=' + self.widget_data.user_uuid + '&g=' + btoa(JSON.stringify(gridTrackerBusinessObject)) + '&q=' + $("#rg-grdtc-search-query-field").val().trim();
        },
        async submitSEOAudit() {
            let self = this;

            console.log('submitting SEO Audit...')
            let website_url = document.querySelector("#website_url").value;

            website_url = website_url.replace("http://", "");
            website_url = website_url.replace("https://", "");
            // website_url = website_url.replace("www.", "");

            // console.log('website_url', website_url)

            if (!website_url) {
                document.querySelector("#website_url").focus();
                return;
            }
// console.log(this.validateDomain(website_url));
            if (!this.validateDomain(website_url)) {
                document.querySelector("#website_url").focus();
                return;
            }

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-seo-audit', {
                widget_uuid: self.widget_data.uuid,
                website_url: website_url
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            });

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
        },
        async submitGMBAudit() {
            let self = this;

            if (!this.business_location.place_id) {
                return;
            }

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-gmb-audit', {
                widget_uuid: self.widget_data.uuid,
                business_location: this.business_location
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            });

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
        },
        async submitCitationAudit() {
            let self = this;

            if (!this.business_location.place_id) {
                return;
            }

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-citation-audit', {
                widget_uuid: self.widget_data.uuid,
                business_location: this.business_location
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            });

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
        },
        async submitReviewLinkGenerator() {
            let self = this;

            if (!this.business_location.place_id) {
                return;
            }

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-link-generator', {
                widget_uuid: self.widget_data.uuid,
                business_location: this.business_location
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            });

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
        },
        getHostname: function(item) {
            return new URL(item.listing.url).hostname.replace("www.", "");
        },
        formatDate: function(date) {
            return moment(String(date)).format('MM/DD/YYYY')
        },
        validateDomain(domain) {
            domain = domain.replace("www.", "");
            var res = domain.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null)
        },
        onScroll: function(e) {
            
        },
        getAddressObject(address_components) {
        var ShouldBeComponent = {
            street_number: ["street_number"],
            zip: ["postal_code"],
            address: ["street_address", "route"],
            state: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
            ],
            city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
            ],
            country: ["country"]
        };

        var address = {
            street_number: "",
            zip: "",
            address: "",
            state: "",
            city: "",
            country: ""
        };
        address_components.forEach(component => {
            for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                if (shouldBe === "country") {
                address[shouldBe] = component.short_name;
                } else {
                address[shouldBe] = component.long_name;
                }
            }
            }
        });
        return address;
        },
        filterPlaces (item, queryText, itemText) {
        return true
        },
        async selectPlace() {
            let that = this


            /*!!!!! TODO replace this with the backend API get-place-details to retrieve more data TODO *****/

            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-place-details?place_id=' + that.autocompleteLocationModel.id, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            // console.log(response.data.result);

            that.company_name = response.data.result.name;
            that.business_location = response.data.result
        },

        youNeedReviews() {
            console.log('run2')
            // Initial input, grab these from the user entered data
            let current_google_rating=parseFloat(this.widget_data.properties.current_google_rating);
            let current_number_of_google_reviews=parseFloat(this.widget_data.properties.current_number_of_google_reviews);
            let desired_google_rating=parseFloat(this.widget_data.properties.desired_google_rating);

            console.log(desired_google_rating)

            // Initialize new variables to be used for calculations
            let number_of_new_ratings = 0;
            let total_number_of_reviews = current_number_of_google_reviews;
            let this_rating = current_google_rating

            // keep increasing the rating until we get to the designer rating
            while (desired_google_rating > this_rating && number_of_new_ratings < 1001) {
                number_of_new_ratings++;
                total_number_of_reviews++;

                this_rating = ((current_number_of_google_reviews * current_google_rating) + (number_of_new_ratings * 5)) / total_number_of_reviews
            }

            console.log('number_of_new_ratings ===> ', number_of_new_ratings)

            // output the number of new ratings
            // console.log('You need ' + number_of_new_ratings + ' more reviews');

            try {
                if (number_of_new_ratings > 1000)
                    document.querySelector("#lr_you_need_reviews").innerHTML = "1000+";
                else
                    document.querySelector("#lr_you_need_reviews").innerHTML = number_of_new_ratings;
            }
            catch (e) {}

            return number_of_new_ratings;
        },

        calculatedRevenue() {
            let self = this;
            let revenue = (this.widget_data.properties.negative_reviews_per_year * this.widget_data.properties.percentage_of_complaints) * (this.widget_data.properties.customer_lifetime_value/100);
            revenue = Math.ceil(revenue);

            revenue = ((self.widget_data.properties.currency_display_position == "Before Amount") ? self.widget_data.properties.currency + ' ' : '') + revenue + ((self.widget_data.properties.currency_display_position == "After Amount") ? ' ' + self.widget_data.properties.currency : '');
            
            try {
                document.querySelector("#lr_calculated_revenue").innerHTML = revenue;
            }
            catch (e) {}

            return revenue;
        },

        calculateDdrMrrArr() {
            let self = this;

            let ddr = 0;
            let mrr = 0;
            let arr = 0;

            let upsell_clients_nr = (this.widget_data.properties.percentage_of_clients_upsell/100) * this.widget_data.properties.number_of_local_business_clients;

            mrr = (this.widget_data.properties.number_of_local_business_clients * this.widget_data.properties.average_monthly_fee) +
                (upsell_clients_nr * this.widget_data.properties.upsell_monthly_revenue);

            mrr = Math.ceil(mrr);
            ddr = Math.ceil((mrr * 12)/366);
            arr = Math.ceil(mrr * 12);

            setTimeout(function() {
                try {
                    document.querySelector("#lr_calculated_ddr").innerHTML = ((self.widget_data.properties.currency_display_position == "Before Amount") ? self.widget_data.properties.currency + ' ' : '') + self.numberWithCommas(ddr) + ((self.widget_data.properties.currency_display_position == "After Amount") ? ' ' + self.widget_data.properties.currency : '');
                    document.querySelector("#lr_calculated_mrr").innerHTML = ((self.widget_data.properties.currency_display_position == "Before Amount") ? self.widget_data.properties.currency + ' ' : '') + self.numberWithCommas(mrr) + ((self.widget_data.properties.currency_display_position == "After Amount") ? ' ' + self.widget_data.properties.currency : '');
                    document.querySelector("#lr_calculated_arr").innerHTML = ((self.widget_data.properties.currency_display_position == "Before Amount") ? self.widget_data.properties.currency + ' ' : '') + self.numberWithCommas(arr) + ((self.widget_data.properties.currency_display_position == "After Amount") ? ' ' + self.widget_data.properties.currency : '');
                }
                catch (e) {}
            }, 1);
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        
        styleBody() {
            var styleSheet = document.createElement("style")
            styleSheet.type = "text/css"
            styleSheet.innerText = 'body::-webkit-scrollbar { display: none;  }';
            styleSheet.id = 'rg-widgets-lr-custom-css-sheet';
            document.body.appendChild(styleSheet);
        },
        hideWidget() {
            parent.postMessage({
                event_id: 'hideWidget_' + this.widget_data.id,
                data: {}
            },"*");  //  `*` on any domain
        }
    },
    created() {
        this.getWidgetData();

        this.styleBody();
    },
    watch: {
        locationSearchText (newVal) {
        var that = this;

        // If less than 3 chars typed, do not search
        if (!newVal || newVal.length <= 3) return

        // Call the method from the previous section here
        GetSuggestions(newVal)
            .then(function (res) {
            that.locationEntries = res;
            })
            .catch(function () {
            that.business = false;
            that.step = 1;
            })
        }
    }
}
</script>

<style type="text/css">
    /* body::-webkit-scrollbar { display: none;  } */

    body, html, .theme--light.v-application {
        background: none transparent;
    }

    .widgets-wrapper {
        position: absolute;
        bottom: 10px;
    }

    .lr-input input {
        height: 42px;
        line-height: 42px;
        max-height: 42px;
        margin-right: -29px;
    }

    .lr-input .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        display: none;
    }

    .lr-input .theme--light.v-text-field > .v-input__control > .v-input__slot:after {
        display: none;
    }

    #lr-widget-html, #lr-widget-seo-html {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .v-card.v-sheet.theme--light {
        border-color: rgba(0, 0, 0, 0.14);
    }

    .rg-lr-calculator {

    }

    .rg-lr-calculator .left-part {
        float: left;
        width: 70%;
        color: #7F7F7F;
    }

    .rg-lr-calculator .left-part.star {
        height: 330px;
    }

    .rg-lr-calculator .left-part.reputation {
        height: 430px;
    }

    .rg-lr-calculator .left-part.retention {
        height: 350px;
    }

    .rg-lr-calculator .right-part {
        float: right;
        text-align: center;
        width: 30%;
        padding-top: 55px;
        font-size: 24px;
    }

    .rg-lr-calculator .right-part.star {
        height: 330px;
    }

    .rg-lr-calculator .right-part.reputation {
        height: 430px;
    }

    .rg-lr-calculator .right-part.retention {
        height: 350px;
    }

    .lr-grid-tracker-title {
        text-align: center; font-size: 40px; font-weight: bold; color: #090C32;
    }

    #lr-grid-tracker-subtitle {
        text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;
    }

    .lr-grid-location-wrapper {
        float: left; width: calc(100% - 150px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;
    }

    .lr-grid-divider {
        float: left; padding-left: 22px; padding-top: 5px; font-size: 20px; color: #817F7F; opacity: 0.6;
    }

    .lr-query-field-wrapper {
        float: left; width: calc(50% - 40px); padding-left: 12px; font-size: 12px;
    }

    #rg-grdtc-place-search-field {
        float: left; width: 44%;
    }

    .lr-grid-run-scan-btn {
        float: right; width: 121px;
    }

    .lr-grid-magnify-icon {
        float: left; padding-left: 14px; padding-top: 5px;
        display: none;
    }

    .lr-review-response-generator-left {
        float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;
    }

    .lr-gmb-audit-left {
        float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;
    }

    .lr-widget-wrapper fieldset {
        border: 0px !important;
    }

    .lr-widget-wrapper .v-input__control {
        margin-top: -5px;
    }

    @media screen and (max-width: 500px) {
        .lr-gmb-audit-left {
            width: 100%;
            float: none !important;
        }

        .rg-lr-calculator .left-part, .rg-lr-calculator .right-part {
            float: none;
            width: auto;
            height: auto !important;
        }

        .rg-lr-calculator .right-part {
            padding-bottom: 55px;
        }

        .lr-grid-tracker-title {
            font-size: 20px;
        }

        #rg-grdtc-place-search-field {
            float: none; width: auto;
            padding-top: 4px;
        }

        .lr-grid-location-wrapper {
            float: none;
            width: auto;
            height: auto;
            margin-bottom: 20px;
            padding-top: 10px;
        }

        .lr-grid-divider {
            float: none;
            display: none;
        }

        .lr-query-field-wrapper {
            float: none;
            width: auto;
            border-top: solid 1px #e6e6e6;
            margin-left: 10px;
            padding-bottom: 10px;
            padding-top: 10px;
        }

        .lr-grid-run-scan-btn {
            float: none;
            width: 100% !important;
            text-align: center;
            padding-top: 15px !important;
        }

        #rg-grid-tracker-widget-btn {
            margin: auto;
            display: block;
        }

        #lr-grid-tracker-subtitle {
            font-size: 14px;
        }

        #rg-grdtc-search-query-field {
            font-size: 13px !important;
            padding-left: 11px !important;
            width: calc(100% - 30px) !important;
            margin-top: -7px;
        }

        .lr-grid-magnify-icon {
            display: block;
        }

        .lr-review-response-generator-left {
            float: none;
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>