<template>
    <div id="lr-widget-seo-rank-tracker-html" style="padding-left: 20px; padding-right: 20px;">
        <div style="text-align: center; font-weight: bold; color: #090C32;"
            :style="'color: ' + widget.properties.main.title_color + ';' + (($vuetify.breakpoint.xs) ? 'font-size: 25px;' : 'font-size: 40px;')"
        >
            Free Local Rank Checker & Tracker Tool
        </div>
  
        <div class="flex flex-row flex-wrap mb-3 pt-8">
            <div class="w-full md:w-1/2 lg:w-1/2" :class="(($vuetify.breakpoint.xs) ? '' : 'pr-2')">
                <div style="font-size: 20px; font-weight: bold;">Choose Your Region</div>
                <div class="pt-3">
                    <v-select v-model="region" :items="regions"
                        hide-details
                        outlined
                        style="border: 1px solid rgba(0, 0, 0, 0.15);"
                    >
                        
                        <template slot="selection" slot-scope="data">
                            <!-- HTML that describe how select should render selected items -->
                            {{ data.item.name }} ({{ data.item.value }})
                        </template>
                        <template slot="item" slot-scope="data">
                            <!-- HTML that describe how select should render items when the select is open -->
                            {{ data.item.name }} ({{ data.item.value }})
                        </template>
                    </v-select>
                </div>

                <div style="font-size: 20px; font-weight: bold; padding-top: 25px;">Choose Your Device</div>
                <div class="pt-3">
                    <v-btn-toggle
                        v-if="!$vuetify.breakpoint.xs"
                        v-model="device"
                        color="#2972FF"
                        group
                        style="border: 1px solid rgba(0, 0, 0, 0.15); width: 100%; padding: 0px;"
                        class="flex"
                    >
                        <v-btn value="Desktop" class="w-full md:w-1/3 lg:w-1/3" style="margin: 0px;">
                            Desktop
                        </v-btn>

                        <v-btn value="Mobile" class="w-full md:w-1/3 lg:w-1/3" style="margin: 0px;">
                            Mobile
                        </v-btn>

                        <v-btn value="Tablet" class="w-full md:w-1/3 lg:w-1/3" style="margin: 0px;">
                            Tablet
                        </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle
                        v-else
                        v-model="device"
                        color="#2972FF"
                        group
                        style="border: 1px solid rgba(0, 0, 0, 0.15); width: 100%; padding: 0px;"
                    >
                        <v-btn value="Desktop">
                            Desktop
                        </v-btn>

                        <v-btn value="Mobile">
                            Mobile
                        </v-btn>

                        <v-btn value="Tablet">
                            Tablet
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <div style="font-size: 20px; font-weight: bold; padding-top: 25px;">Search Location</div>
                <div class="pt-3">
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
                        placeholder="Your Location"
                        style="border: 1px solid rgba(0, 0, 0, 0.15); padding: 0px; font-size: 17px;"
                    >
                    </v-combobox>
                </div>

                <div style="font-size: 20px; font-weight: bold; padding-top: 25px;">Enter Your Domain Name</div>
                <div class="pt-3">
                    <div style="position: relative;">
                        <div style="position: absolute; right: 0px; padding: 15px; padding-left: 10px; padding-right: 10px; padding-top: 20px; color: #817F7F; font-size: 12px; border-left: solid 1px rgba(0, 0, 0, 0.15); z-index: 1;">
                            <input type="checkbox" /> Allow URL
                        </div>
                        <v-text-field
                            v-model="domain"
                            placeholder="you-domain.com*"
                            style="border: 1px solid rgba(0, 0, 0, 0.15); padding-right: 90px;"
                            outlined
                            hide-details
                        >
                        </v-text-field>
                        <div class="pt-2">
                            <a href="javascript: void(0);" @click="toggleCompetitors" style="color: #817F7F !important; font-size: 14px; text-decoration: underline;">Check for competitors URLs?</a>
                        </div>
                    </div>

                    <div style="border-radius: 4px; background: #f0f4fc; color: #2972FF; padding: 12px; margin-top: 10px; font-size: 12px;">
                        <i class="mdi mdi-information-outline" style="font-size: 16px;"></i>
                        Note: You do not need to enter the https:// or www. of a domain
                    </div>

                    <div v-if="show_competitors">
                        <div v-for="(item, index) in competitor_sites" :key="index" style="position: relative; margin-top: 10px;">
                            <div style="position: absolute; right: 0px; padding: 15px; padding-left: 10px; padding-right: 10px; padding-top: 20px; color: #817F7F; font-size: 12px; border-left: solid 1px rgba(0, 0, 0, 0.15); z-index: 1;">
                                <input type="checkbox" /> Allow URL
                            </div>
                            <v-text-field
                                v-model="item.site"
                                placeholder="competitorsite.com"
                                style="border: 1px solid rgba(0, 0, 0, 0.15); padding-right: 90px;"
                                outlined
                                hide-details
                            >
                            </v-text-field>
                        </div>
                    </div>
                </div>

                <div style="font-size: 20px; font-weight: bold; padding-top: 25px;">Enter Your Keywords</div>
                <div class="pt-3">
                    <div v-for="(item, index) in keywords" :key="index" style="position: relative; margin-top: 10px;">
                        <v-text-field
                            v-model="item.keyword"
                            placeholder="Keyword"
                            style="border: 1px solid rgba(0, 0, 0, 0.15);"
                            outlined
                            hide-details
                        >
                        </v-text-field>
                    </div>

                    <div style="text-align: right; padding-top: 10px;">
                        <a href="javascript: void(0);" @click="addKeywords" style="color: #2972FF !important; font-size: 14px;"><i class="mdi mdi-plus-circle-outline"></i> Add Keywords</a>
                    </div>
                </div>

                <div class="pt-5">
                    <v-button style="cursor: pointer; background: #2972FF; color: #FFFFFF; width: 100%; display: block; padding: 10px; border-radius: 5px; font-weight: bold; text-align: center;" @click="checkRank();">
                        <span v-if="loading"><i class="fa fa-spin fa-spinner"></i></span>
                        <span v-else>Check Rank</span>
                    </v-button>

                    <div v-if="errors.length > 0">
                        <div v-for="(item, index) in errors" :key="index" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                            <div v-html="item"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/2 lg:w-1/2" :class="(($vuetify.breakpoint.xs) ? '' : 'pl-2')" style="padding-top: 42px; color: #090C32;">
                <div style="border-radius: 5px; border: 1px solid rgba(0, 0, 0, 0.10); padding: 15px;">
                    <div style="font-size: 16px; font-weight: bold;">Result Details</div>

                    <div class="pt-3" style="color: #817F7F;">
                        <div v-if="view == 1" class="text-center">
                            <img :src="require('@/assets/images/seo_tracker_no_search.png')" alt="" />

                            No Results Yet. Setup Your rank check, and <br /> click check rank.
                        </div>
                        <div v-else>
                            <div v-for="(item, index) in results" :key="index" style="padding-top: 20px; padding-bottom: 20px; border-bottom: solid 1px rgba(0, 0, 0, 0.10);"
                                :style="((index == results.length - 1) ? 'border: 0px;' : '')"
                            >
                                <div v-if="item.status == 'pending'">
                                    <div style="float: left;">
                                        <strong>Keyword:</strong> {{ item.keyword }}
                                    </div>
                                    <div style="float: right; font-size: 12px;">
                                        <i class="fa fa-spin fa-spinner"></i> <span v-if="!$vuetify.breakpoint.xs">Please wait... Checking SERP!</span>
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>
                                <div v-else>
                                    <div class="pb-1">
                                        <strong>Keyword:</strong> {{ item.keyword }}
                                    </div>
                                    <div class="pb-1">
                                        <strong>Position:</strong> {{ ((item.results.position == 0) ? 'Not in top 100!' : item.results.position) }}
                                    </div>
                                    <div class="pb-1">
                                        <div v-if="item.results.position == 0">
                                            <strong>URL:</strong> {{ ((item.results.position == 0) ? 'Not in top 100!' : item.results.url) }}
                                        </div>
                                        <div v-else>
                                            <strong>URL: </strong> <a :href="item.results.url" style="color: #2972FF !important; font-size: 14px;" target="lr-item-url">{{ item.results.url }}</a>
                                        </div>
                                    </div>

                                    <div v-if="item.results.competitors.length > 0">
                                        <div class="pb-1">
                                            <strong>Competitors:</strong>

                                            <div v-for="(item3, index3) in item.results.competitors" :key="index3" style="padding-left: 15px;">
                                                {{ item3.domain }} - Position: {{ ((item3.position == 0) ? 'Not in top 100!' : item3.position) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div style="clear: both;"></div>

                                    <div style="float: left; padding-top: 10px;">
                                        <a href="javascript: void(0);" @click="item.show_top_10 = !item.show_top_10; resizeIframe()" style="color: #2972FF !important; font-size: 14px; font-weight: bold;">Top Ten</a>
                                    </div>

                                    <div style="float: right; padding-top: 10px;">
                                        <a :href="item.results.search_url" target="lr-run-search" style="color: #2972FF !important; font-size: 14px; font-weight: bold;">Run Search</a>
                                    </div>

                                    <div style="clear: both;"></div>

                                    <div v-if="item.show_top_10" style="padding-top: 10px; font-size: 12px;">
                                        <div class="pb-1" v-for="(item2, index2) in item.results.top_10_list" :key="index2">
                                            {{ item2 }}
                                        </div>
                                    </div>
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
  import { GetSuggestions } from '@/utils/PlaceUtilsCities'
  import axios from 'axios'
  import moment from 'moment'
  
  export default {
    props: ['widget'],
    data () {
        return {
            regions: [{ 'value':'google.com', 'name': 'Global / US'},{ 'value':'google.ac', 'name': 'Ascension Island'},{ 'value':'google.ad', 'name': 'Andorra'},{ 'value':'google.ae', 'name': 'United Arab Emirates'},{ 'value':'google.com.af', 'name': 'Afghanistan'},{ 'value':'google.com.ag', 'name': 'Antigua and Barbuda'},{ 'value':'google.com.ai', 'name': 'Anguilla'},{ 'value':'google.al', 'name': 'Albania'},{ 'value':'google.am', 'name': 'Armenia'},{ 'value':'google.co.ao', 'name': 'Angola'},{ 'value':'google.com.ar', 'name': 'Argentina'},{ 'value':'google.as', 'name': 'American Samoa'},{ 'value':'google.at', 'name': 'Austria'},{ 'value':'google.com.au', 'name': 'Australia'},{ 'value':'google.az', 'name': 'Azerbaijan'},{ 'value':'google.ba', 'name': 'Bosnia and Herzegovina'},{ 'value':'google.com.bd', 'name': 'Bangladesh'},{ 'value':'google.be', 'name': 'Belgium'},{ 'value':'google.bf', 'name': 'Burkina Faso'},{ 'value':'google.bg', 'name': 'Bulgaria'},{ 'value':'google.com.bh', 'name': 'Bahrain'},{ 'value':'google.bi', 'name': 'Burundi'},{ 'value':'google.bj', 'name': 'Benin'},{ 'value':'google.com.bn', 'name': 'Brunei'},{ 'value':'google.com.bo', 'name': 'Bolivia'},{ 'value':'google.com.br', 'name': 'Brazil'},{ 'value':'google.bs', 'name': 'Bahamas'},{ 'value':'google.bt', 'name': 'Bhutan'},{ 'value':'google.co.bw', 'name': 'Botswana'},{ 'value':'google.by', 'name': 'Belarus'},{ 'value':'google.com.bz', 'name': 'Belize'},{ 'value':'google.ca', 'name': 'Canada'},{ 'value':'google.com.kh', 'name': 'Cambodia'},{ 'value':'google.cc', 'name': 'Cocos (Keeling) Islands'},{ 'value':'google.cd', 'name': 'Democratic Republic of the Congo'},{ 'value':'google.cf', 'name': 'Central African Republic'},{ 'value':'google.cat', 'name': 'Catalan Countries'},{ 'value':'google.cg', 'name': 'Republic of the Congo'},{ 'value':'google.ch', 'name': 'Switzerland'},{ 'value':'google.ci', 'name': 'Ivory Coast'},{ 'value':'google.co.ck', 'name': 'Cook Islands'},{ 'value':'google.cl', 'name': 'Chile'},{ 'value':'google.cm', 'name': 'Cameroon'},{ 'value':'google.cn', 'name': 'China'},{ 'value':'google.com.co', 'name': 'Colombia'},{ 'value':'google.co.cr', 'name': 'Costa Rica'},{ 'value':'google.com.cu', 'name': 'Cuba'},{ 'value':'google.cv', 'name': 'Cape Verde'},{ 'value':'google.com.cy', 'name': 'Cyprus'},{ 'value':'google.cz', 'name': 'Czech Republic'},{ 'value':'google.de', 'name': 'Germany'},{ 'value':'google.dj', 'name': 'Djibouti'},{ 'value':'google.dk', 'name': 'Denmark'},{ 'value':'google.dm', 'name': 'Dominica'},{ 'value':'google.com.do', 'name': 'Dominican Republic'},{ 'value':'google.dz', 'name': 'Algeria'},{ 'value':'google.com.ec', 'name': 'Ecuador'},{ 'value':'google.ee', 'name': 'Estonia'},{ 'value':'google.com.eg', 'name': 'Egypt'},{ 'value':'google.es', 'name': 'Spain'},{ 'value':'google.com.et', 'name': 'Ethiopia'},{ 'value':'google.fi', 'name': 'Finland'},{ 'value':'google.com.fj', 'name': 'Fiji'},{ 'value':'google.fm', 'name': 'Federated States of Micronesia'},{ 'value':'google.fr', 'name': 'France'},{ 'value':'google.ga', 'name': 'Gabon'},{ 'value':'google.ge', 'name': 'Georgia'},{ 'value':'google.gf', 'name': 'French Guiana'},{ 'value':'google.gg', 'name': 'Guernsey'},{ 'value':'google.com.gh', 'name': 'Ghana'},{ 'value':'google.com.gi', 'name': 'Gibraltar'},{ 'value':'google.gl', 'name': 'Greenland'},{ 'value':'google.gm', 'name': 'Gambia'},{ 'value':'google.gp', 'name': 'Guadeloupe'},{ 'value':'google.gr', 'name': 'Greece'},{ 'value':'google.com.gt', 'name': 'Guatemala'},{ 'value':'google.gy', 'name': 'Guyana'},{ 'value':'google.com.hk', 'name': 'Hong Kong'},{ 'value':'google.hn', 'name': 'Honduras'},{ 'value':'google.hr', 'name': 'Croatia'},{ 'value':'google.ht', 'name': 'Haiti'},{ 'value':'google.hu', 'name': 'Hungary'},{ 'value':'google.co.id', 'name': 'Indonesia'},{ 'value':'google.iq', 'name': 'Iraq'},{ 'value':'google.ie', 'name': 'Ireland'},{ 'value':'google.co.il', 'name': 'Israel'},{ 'value':'google.im', 'name': 'Isle of Man'},{ 'value':'google.co.in', 'name': 'India'},{ 'value':'google.io', 'name': 'British Indian Ocean Territory'},{ 'value':'google.is', 'name': 'Iceland'},{ 'value':'google.it', 'name': 'Italy'},{ 'value':'google.je', 'name': 'Jersey'},{ 'value':'google.com.jm', 'name': 'Jamaica'},{ 'value':'google.jo', 'name': 'Jordan'},{ 'value':'google.co.jp', 'name': 'Japan'},{ 'value':'google.co.ke', 'name': 'Kenya'},{ 'value':'google.ki', 'name': 'Kiribati'},{ 'value':'google.kg', 'name': 'Kyrgyzstan'},{ 'value':'google.co.kr', 'name': 'South Korea'},{ 'value':'google.com.kw', 'name': 'Kuwait'},{ 'value':'google.kz', 'name': 'Kazakhstan'},{ 'value':'google.la', 'name': 'Laos'},{ 'value':'google.com.lb', 'name': 'Lebanon'},{ 'value':'google.com.lc', 'name': 'Saint Lucia'},{ 'value':'google.li', 'name': 'Liechtenstein'},{ 'value':'google.lk', 'name': 'Sri Lanka'},{ 'value':'google.co.ls', 'name': 'Lesotho'},{ 'value':'google.lt', 'name': 'Lithuania'},{ 'value':'google.lu', 'name': 'Luxembourg'},{ 'value':'google.lv', 'name': 'Latvia'},{ 'value':'google.com.ly', 'name': 'Libya'},{ 'value':'google.co.ma', 'name': 'Morocco'},{ 'value':'google.md', 'name': 'Moldova'},{ 'value':'google.me', 'name': 'Montenegro'},{ 'value':'google.mg', 'name': 'Madagascar'},{ 'value':'google.mk', 'name': 'Macedonia'},{ 'value':'google.ml', 'name': 'Mali'},{ 'value':'google.com.mm', 'name': 'Myanmar'},{ 'value':'google.mn', 'name': 'Mongolia'},{ 'value':'google.ms', 'name': 'Montserrat'},{ 'value':'google.com.mt', 'name': 'Malta'},{ 'value':'google.mu', 'name': 'Mauritius'},{ 'value':'google.mv', 'name': 'Maldives'},{ 'value':'google.mw', 'name': 'Malawi'},{ 'value':'google.com.mx', 'name': 'Mexico'},{ 'value':'google.com.my', 'name': 'Malaysia'},{ 'value':'google.co.mz', 'name': 'Mozambique'},{ 'value':'google.com.na', 'name': 'Namibia'},{ 'value':'google.ne', 'name': 'Niger'},{ 'value':'google.com.nf', 'name': 'Norfolk Island'},{ 'value':'google.com.ng', 'name': 'Nigeria'},{ 'value':'google.com.ni', 'name': 'Nicaragua'},{ 'value':'google.nl', 'name': 'Netherlands'},{ 'value':'google.no', 'name': 'Norway'},{ 'value':'google.com.np', 'name': 'Nepal'},{ 'value':'google.nr', 'name': 'Nauru'},{ 'value':'google.nu', 'name': 'Niue'},{ 'value':'google.co.nz', 'name': 'New Zealand'},{ 'value':'google.com.om', 'name': 'Oman'},{ 'value':'google.com.pk', 'name': 'Pakistan'},{ 'value':'google.com.pa', 'name': 'Panama'},{ 'value':'google.com.pe', 'name': 'Peru'},{ 'value':'google.com.ph', 'name': 'Philippines'},{ 'value':'google.pl', 'name': 'Poland'},{ 'value':'google.com.pg', 'name': 'Papua New Guinea'},{ 'value':'google.pn', 'name': 'Pitcairn Islands'},{ 'value':'google.co.pn', 'name': 'Pitcairn Islands'},{ 'value':'google.com.pr', 'name': 'Puerto Rico'},{ 'value':'google.ps', 'name': 'Palestine'},{ 'value':'google.pt', 'name': 'Portugal'},{ 'value':'google.com.py', 'name': 'Paraguay'},{ 'value':'google.com.qa', 'name': 'Qatar'},{ 'value':'google.ro', 'name': 'Romania'},{ 'value':'google.rs', 'name': 'Serbia'},{ 'value':'google.ru', 'name': 'Russia'},{ 'value':'google.rw', 'name': 'Rwanda'},{ 'value':'google.com.sa', 'name': 'Saudi Arabia'},{ 'value':'google.com.sb', 'name': 'Solomon Islands'},{ 'value':'google.sc', 'name': 'Seychelles'},{ 'value':'google.se', 'name': 'Sweden'},{ 'value':'google.com.sg', 'name': 'Singapore'},{ 'value':'google.com.sg', 'name': 'Singapore'},{ 'value':'google.sh', 'name': 'Saint Helena'},{ 'value':'google.si', 'name': 'Slovenia'},{ 'value':'google.sk', 'name': 'Slovakia'},{ 'value':'google.com.sl', 'name': 'Sierra Leone'},{ 'value':'google.sn', 'name': 'Senegal'},{ 'value':'google.sm', 'name': 'San Marino'},{ 'value':'google.so', 'name': 'Somalia'},{ 'value':'google.st', 'name': 'São Tomé and Príncipe'},{ 'value':'google.sr', 'name': 'Suriname'},{ 'value':'google.com.sv', 'name': 'El Salvador'},{ 'value':'google.td', 'name': 'Chad'},{ 'value':'google.tg', 'name': 'Togo'},{ 'value':'google.co.th', 'name': 'Thailand'},{ 'value':'google.com.tj', 'name': 'Tajikistan'},{ 'value':'google.tk', 'name': 'Tokelau'},{ 'value':'google.tl', 'name': 'Timor-Leste'},{ 'value':'google.tm', 'name': 'Turkmenistan'},{ 'value':'google.to', 'name': 'Tonga'},{ 'value':'google.tn', 'name': 'Tunisia'},{ 'value':'google.com.tr', 'name': 'Turkey'},{ 'value':'google.tt', 'name': 'Trinidad and Tobago'},{ 'value':'google.com.tw', 'name': 'Taiwan'},{ 'value':'google.co.tz', 'name': 'Tanzania'},{ 'value':'google.com.ua', 'name': 'Ukraine'},{ 'value':'google.co.ug', 'name': 'Uganda'},{ 'value':'google.co.uk', 'name': 'United Kingdom'},{ 'value':'google.com', 'name': 'United States'},{ 'value':'google.com.uy', 'name': 'Uruguay'},{ 'value':'google.co.uz', 'name': 'Uzbekistan'},{ 'value':'google.com.vc', 'name': 'Saint Vincent and the Grenadines'},{ 'value':'google.co.ve', 'name': 'Venezuela'},{ 'value':'google.vg', 'name': 'British Virgin Islands'},{ 'value':'google.co.vi', 'name': 'United States Virgin Islands'},{ 'value':'google.com.vn', 'name': 'Vietnam'},{ 'value':'google.vu', 'name': 'Vanuatu'},{ 'value':'google.ws', 'name': 'Samoa'},{ 'value':'google.co.za', 'name': 'South Africa'},{ 'value':'google.co.zm', 'name': 'Zambia'},{ 'value':'google.co.zw', 'name': 'Zimbabwe'}],
            region: { 'value':'google.com', 'name': 'Global / US'},
            device: 'Desktop',

            autocompleteLocationModel: null,
            locationSearchText: null,
            locationEntries: [],

            business_location: {},

            domain: "",

            show_competitors: false,
            competitor_sites: [
                {site: ''}, {site: ''}, {site: ''}
            ],

            keywords: [
                {keyword: ''}, {keyword: ''}, {keyword: ''}, {keyword: ''}, {keyword: ''}
            ],

            errors: [],

            view: 1,

            results: [],

            loading: false
        }
    },
    computed: {
        locationFoundItems () {
            return this.locationEntries
        }
    },
    methods: {
        toggleCompetitors() {
            this.show_competitors = !this.show_competitors;
        },
        addKeywords() {
            this.keywords.push({keyword: ''});
            this.keywords.push({keyword: ''});
            this.keywords.push({keyword: ''});
            this.keywords.push({keyword: ''});
            this.keywords.push({keyword: ''});
        },
        resizeIframe() {
            let self = this;
            setTimeout(function() {
                let new_height = document.querySelector(".lr-widget-wrapper").offsetHeight + 180;

                parent.postMessage({
                    event_id: 'resizeWidgetIframe_' + self.widget.id,
                    data: {
                        new_height: new_height
                    }
                },"*");  //  `*` on any domain
            }, 200);
        },
        async checkRank() {
            let self = this;

            if (this.loading)
                return;

            self.errors = [];
            self.results = [];

            if (!this.business_location.name) {
                this.errors.push('Please select a location.');
            }

            if (!this.domain) {
                this.errors.push('Please enter domain.');
            }
            
            let keywordsValid = false;

            for (var i in this.keywords) {
                if (this.keywords[i].keyword)
                    keywordsValid = true;
            }
            
            if (!keywordsValid) {
                this.errors.push('Please enter at least one keyword.');
            }

            this.resizeIframe();

            if (this.errors.length > 0)
                return;

            if (self.$vuetify.breakpoint.xs) {
                parent.postMessage({
                    event_id: 'scrollToIframeBottom_' + self.widget.id,
                    data: {}
                },"*");  //  `*` on any domain
            }
            else {
                parent.postMessage({
                    event_id: 'scrollToIframeTop_' + self.widget.id,
                    data: {}
                },"*");  //  `*` on any domain
            }

            this.view = 2;
            this.loading = true;

            let keywordsTotal = 0;

            for (var i in this.keywords) {
                if (this.keywords[i].keyword) {
                    keywordsTotal++;
                }
            }

            let keywordsCompleted = 0;

            for (var i in self.keywords) {
                let keyword = self.keywords[i];
                if (keyword.keyword) {
                    self.results.push({
                        keyword: keyword.keyword,
                        status: 'pending',
                        show_top_10: false,
                        results: {}
                    });

                    axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-seo-rank-tracker-results', {
                        region: self.region,
                        device: self.device,
                        location: self.business_location,
                        domain: self.domain,
                        competitors: self.competitor_sites,
                        keyword: keyword.keyword,
                        i: i
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                        },
                    }).then(function(response) {
                        console.log('response', response)
                        self.results[response.data.i].status = 'completed';
                        self.results[response.data.i].results = {
                            position: response.data.position,
                            url: response.data.url,
                            competitors: response.data.competitors,
                            top_10_list: response.data.top_10_list,
                            search_url: response.data.search_url
                        };

                        keywordsCompleted++;

                        self.resizeIframe()

                        if (keywordsTotal == keywordsCompleted) {
                            self.loading = false;
                        }
                    });
                }
            }
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
    },
    created() {
        
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