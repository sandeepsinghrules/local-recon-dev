<template>
    <div>
    <div class="dashboard-box stats-box w-full px-2 mb-5">
            <v-card
            class="pa-2"
            tile
            >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                <div class="flex flex-row flex-wrap">
                <div class="w-full lg:w-2/3" style="position: relative;">
                    <strong class="mt-2 text-lg">{{ search.keyword }}</strong>

                    <div v-if="search.properties.website" class="website mt-1 text-sm"><a href="search.properties.website" target="lr-website-link" style="color: #2477F6 !important;">{{ search.properties.website }}</a></div>

                    <div class="clearfix pt-4"></div>

                    <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Address</div>

                        {{ search.properties.formatted_address }}
                    </div>

                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Phone</div>

                        {{ search.properties.formatted_phone_number }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Primary Category</div>
                        <span v-if="this.gmbAuditData">
                            <span v-if="this.gmbAuditData.business.types[0] != null">
                                {{ this.gmbAuditData.business.custom_keyword ? ucwords(this.gmbAuditData.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(this.gmbAuditData.business.types[0].replace(/\_/g, ' '))  }}
                            </span>
                            <span v-else>
                                {{ this.gmbAuditData.business.custom_keyword ? ucwords(this.gmbAuditData.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(this_search.properties.business.types[1].replace(/\_/g, ' '))  }}
                            </span>
                        </span>
                        <span v-else>
                            {{ search.properties.custom_keyword ? ucwords(search.properties.custom_keyword.replace(/\_/g, ' ')) : ucwords(search.properties.types[0].replace(/\_/g, ' ')) }}
                        </span>

                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Sub Category</div>
                        <span v-if="this.gmbAuditData">
                            {{ this.gmbAuditData.business.categories.join(", ") }}
                        </span>
                        <span v-else>
                            {{ ((search.properties.types[1]) ? ucwords(search.properties.types[1].replace(/\_/g, ' ')) : '-') }}
                        </span>

                    </div>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <div class="lr-seo-audit-photo w-full lg:w-1/3">
                    <div v-if="search.properties.photos">
                        <img :src="'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + search.properties.photos[0].photo_reference + '&maxheight=200&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs'" />
                    </div>
                </div>
                </div>

                <br clear="all" />
            </div>
            </v-card>

            <div class="pt-4">
                <strong class="text-lg">Your custom report results</strong>
            </div>

            <div class="pt-4">
                <v-card
                    class="pa-4"
                    tile
                >
                    <v-tabs  v-model="gmb_tab" v-if="!$vuetify.breakpoint.xs && !this.$route.query.download">
                    	<v-tab v-for="(item, index) in search.properties.reports_results" :key="index"><span @click="checkGrid(item)">{{ item.title }}</span></v-tab>
                    </v-tabs>
                    <div v-for="(item, index) in search.properties.reports_results" :key="index">

                        <div v-if="item.title == 'Geo Grid'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                            <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                            <iframe v-if="(show_grid || $vuetify.breakpoint.xs)" :src="'/grid-tracker/app_for_gmb.html'" :style="(($vuetify.breakpoint.xs) ? 'width: 100%; height: 400px;' : 'width: 100%; height: 850px;')"></iframe>
                        </div>
                        <div v-else class="pt-4">

                            <div v-if="item.search.search_type == 'business_audit'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                                <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                                <Reputation :search="item.search" :ignore_header="true" />
                            </div>

                            <div v-if="item.search.search_type == 'seo_audit'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                                <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                                <SEOAudit :search="item.search" :ignore_header="true" />
                            </div>

                            <div v-if="item.search.search_type == 'gmb_audit'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                                <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                                <GMBAudit :search="item.search" :ignore_header="true" />
                            </div>

                            <div v-if="item.search.search_type == 'citation_audit'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                                <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                                <CitationAudit :search="item.search" :ignore_header="true" />
                            </div>

                            <div v-if="item.search.search_type == 'review_link_generator'" v-show="gmb_tab == index || $vuetify.breakpoint.xs || $route.query.download">
                                <div class="text-center pt-4 mb-4"><strong class="lr-report-type-title text-black">{{item.title}}</strong></div>
                                <ReviewLinkGenerator :search="item.search" :ignore_header="true" />
                            </div>
                        </div>
                    </div>
                </v-card>
                    
            </div>
        </div>

    </div>
  </template>
  
  
  <script>
  import axios from 'axios'
  import moment from 'moment'
  import $ from 'jquery'
  import ApexCharts from 'apexcharts'
  import VueGauge from "@/views/local-recon/VueGauge";

	import Reputation from '@/views/local-recon/ReportsTemplates/Reputation.vue'
	import SEOAudit from '@/views/local-recon/ReportsTemplates/SEOAudit.vue'
	import GMBAudit from '@/views/local-recon/ReportsTemplates/GMBAudit.vue'
	import ReviewLinkGenerator from '@/views/local-recon/ReportsTemplates/ReviewLinkGenerator.vue'
	import CitationAudit from '@/views/local-recon/ReportsTemplates/CitationAudit.vue'
  
  export default {
    props: ['search'],

    components: {
        ApexCharts,
		Reputation,
		SEOAudit,
		GMBAudit,
		ReviewLinkGenerator,
		CitationAudit
    },

    data () {
        return {
        	show_grid: false,
            gmb_tab:  0,
            gmbAuditData:null
        }
    },
    methods: {
    	checkGrid(item) {
    		if (item.title == "Geo Grid")
    			this.show_grid = true;
    	},
        ucwords (str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        },
        runCreated() {
        	let self = this;
        	if (!this.search.properties.grid) {
                let logo = "https://reviewgrower.com/wp-content/uploads/2021/09/reviewgrower-blue-green-middle-e1652210601332.png";

                window.RG_GRID_CONFIG = {
                    API_URL: process.env.VUE_APP_API_ENDPOINT,
                    USER: {
                        uuid: this.search.uuid
                    },
                    LOGO: logo,
                    COMPANY_NAME: this.search.company_name,
                    GOOGLE_MAPS_KEY: this.search.api_key,
                    VALUE_SERP_KEY: "",
                    SAB_ENABLED: 0
                }

                window.RG_GRID_ACTION = {
                    ACTION: "scan_lr_gmb2",
                    g: btoa(unescape(encodeURIComponent(JSON.stringify(self.search.properties)))),
                    q: self.search.properties.types[0]
                }

                window.saveGridReportId2 = function(scanId) {
                    let response = axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-report-grid-id', {
                        report_id: self.search.id,
                        grid_id: scanId
                    } , {
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                    },
                    })
                }
            }
            else {
                let logo = "https://reviewgrower.com/wp-content/uploads/2021/09/reviewgrower-blue-green-middle-e1652210601332.png";

                window.RG_GRID_CONFIG = {
                    API_URL: process.env.VUE_APP_API_ENDPOINT,
                    USER: {
                        uuid: this.search.uuid
                    },
                    LOGO: logo,
                    COMPANY_NAME: this.search.company_name,
                    GOOGLE_MAPS_KEY: this.search.api_key,
                    VALUE_SERP_KEY: "",
                    SAB_ENABLED: 0
                }

                window.RG_GRID_ACTION = {
                    ACTION: "view",
                    SCAN_ID: self.search.properties.grid.grid_id
                }
            }
           
            for (let report of this.search.properties.reports_results) {
                if (report.search && report.search.search_type && report.search.search_type === 'gmb_audit') {
                    this.gmbAuditData = report.search.properties;
                }
            }
        }
    },
    created() {
    	let self = this;
    	setTimeout(function() {
    		self.runCreated();
    	}, 500);
    }
  }
  </script>

<style type="text/css">
    #qrcode1 canvas, #qrcode2 canvas, #qrcode3 canvas, #qrcode4 canvas, #qrcode5 canvas, #qrcode6 canvas {
        display: none !important;
    }

    #qrcode1 img, #qrcode2 img, #qrcode3 img, #qrcode4 img, #qrcode5 img, #qrcode6 img {
        width: 100px;
    }
</style>