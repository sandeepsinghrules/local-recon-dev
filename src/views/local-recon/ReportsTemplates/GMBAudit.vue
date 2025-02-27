<template>
    <div>
    <div class="dashboard-box stats-box w-full px-2 mb-5">
            <v-card
            class="pa-2"
            tile
            >
            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                <div class="flex flex-row flex-wrap" v-if="!ignore_header">
                <div class="w-full lg:w-2/3" style="position: relative;">
                    <strong class="mt-2 text-lg">{{ this_search.keyword }}</strong>

                    <div v-if="this_search.properties.business.website" class="website mt-1 text-sm"><a :href="this_search.properties.business.website" target="lr-website-link" style="color: #2477F6 !important;">{{ this_search.properties.business.website }}</a></div>

                    <div class="clearfix pt-4"></div>

                    <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Address</div>

                        {{ this_search.properties.business.formatted_address }}
                    </div>

                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Phone</div>

                        {{ this_search.properties.business.formatted_phone_number }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Primary Category</div>

                        <span v-if="this_search.properties.business.types[0] != null">
                            {{ this_search.properties.business.custom_keyword ? ucwords(this_search.properties.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(this_search.properties.business.types[0].replace(/\_/g, ' '))  }}
                        </span>
                        <span v-else>
                            {{ this_search.properties.business.custom_keyword ? ucwords(this_search.properties.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(this_search.properties.business.types[1].replace(/\_/g, ' '))  }}
                        </span>
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Secondary Categories</div>

                        <div v-if="this_search.properties.business.categories != null">
                            <div v-if="this_search.properties.business.categories.length == 0">
                                Not Found
                            </div>
                            <div v-else>
                                {{ this_search.properties.business.categories.join(", ") }}
                            </div>
                        </div>
                        <div v-else>
                            <v-tooltip top color="#2477F6">
                                <template v-slot:activator="{ on, attrs }">
                                    <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                    v-bind="attrs"
                                    v-on="on"
                                    ></i>
                                </template>
                                <span>Please wait while we are fetching your secondary categories...</span>
                            </v-tooltip>
                        </div>
                    </div>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <div class="lr-seo-audit-photo w-full lg:w-1/3">
                    <div v-if="this_search.properties.business.photos">
                        <img :src="'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + this_search.properties.business.photos[0].photo_reference + '&maxheight=200&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs'" />
                    </div>
                </div>

                <br clear="all" />

                <hr />
                </div>
                
                <div v-if="!this_search.properties.gmb_overall_status ">
                    <v-tabs v-if="!$vuetify.breakpoint.xs && !this.$route.query.download" class="-mb-6" v-model="gmb_tab">
                        <v-tab @click="tabClicked(0)" >Top Competitors</v-tab>
                        <v-tab @click="tabClicked(1)" >Summary</v-tab>
                        <v-tab @click="handleTabClick(2)">Grid Search Results</v-tab>
                        <v-tab @click="reviewAnalysis(3)" >Review Analysis</v-tab>
                        <v-tab @click="tabClicked(4)" >Post Analysis</v-tab>
                        <v-tab @click="tabClicked(5)" >GBP Issues</v-tab>
                        <v-tab @click="tabClicked(6)" >Recommendations <span v-if="this_search.properties.recommendations.items">({{ this_search.properties.recommendations.items.length }})</span></v-tab>
                    </v-tabs>
                </div>
            </div>
            </v-card>
        </div>

        
    <div v-if="!this_search.properties.gmb_overall_status ">
        <div v-show="gmb_tab == 0 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? '' : 'px-3')">
                <strong :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3')" style="font-size: 16px; color: #273042;">Top GBP Competitors vs Your Site</strong>

                <div class="pt-3" v-if="this_search.properties.competitors.list && this_search.properties.competitors.list.length > 0">
                    <div class="flex flex-row flex-wrap">
                        <div v-for="(competitor, index) in this_search.properties.competitors.list" :key="index" class="w-full lg:w-1/4" style="position: relative;">
                            <div class="dashboard-box stats-box w-full px-2 mb-5">
                                <v-card
                                    class="pa-2 pt-6 pb-6"
                                    tile
                                    :style="((competitor.my_business) ? 'background: #19233A;' : '')"
                                >
                                    <div style="width: 100px; color: #FFFFFF;  text-align: center; padding: 5px; font-weight: bold; margin: auto; background: #2477F6; border-radius: 23px;">Rank #{{ competitor.rank }}</div>

                                    <div style="text-align: center; color: #313E42; font-weight: bold; padding: 15px; padding-bottom: 5px; font-size: 16px;"
                                        :style="((competitor.my_business) ? 'color: #FFFFFF;' : '')"
                                    ><a :href="'https://www.google.com/search?q=' + encodeURIComponent(competitor.name) + ' ' + competitor.address" target="lr-competitor">{{ competitor.name }}</a></div>

                                    <div style="text-align: center; color: #757B89; padding: 0px;"
                                        :style="((competitor.my_business) ? 'color: #FFFFFF;' : '')"
                                    >{{ competitor.address }}</div>

                                    <div :style="((competitor.my_business) ? 'color: #FFFFFF !important;' : 'color: #757B89 !important;')">
                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.99885 0.398438C1.06282 0.398438 0.300781 1.16102 0.300781 2.09705V12.5144C0.300781 13.4505 1.06285 14.213 1.99885 14.213H7.16571L8.72718 17.6233C8.7758 17.7305 8.88267 17.7995 9.00053 17.7995C9.11839 17.7995 9.22526 17.7305 9.27388 17.6233L10.8354 14.213H16.0015C16.9376 14.213 17.7001 13.4505 17.7001 12.5144V2.09705C17.7001 1.16102 16.9374 0.398438 16.0015 0.398438H1.99885ZM1.99885 0.998438H16.0015C16.6157 0.998438 17.1001 1.48286 17.1001 2.09705V12.5144C17.1001 13.1286 16.6157 13.6125 16.0015 13.6125H10.6426C10.5253 13.6126 10.419 13.6811 10.3702 13.7877L9.00146 16.7771L7.63095 13.7877H7.63082C7.58207 13.6811 7.47573 13.6126 7.35841 13.6125H1.99887C1.38467 13.6125 0.900798 13.1286 0.900798 12.5144V2.09705C0.900798 1.48286 1.38467 0.998438 1.99887 0.998438H1.99885ZM8.98079 3.09494H8.98066C8.85999 3.10271 8.75579 3.18226 8.71642 3.2965L7.7678 6.0229L4.87734 6.08264C4.74984 6.08558 4.63815 6.16875 4.59891 6.28996C4.55967 6.41117 4.60132 6.54388 4.70283 6.62103L7.00495 8.366L6.16937 11.1292C6.13201 11.2515 6.1762 11.3838 6.27959 11.4591C6.38285 11.5344 6.52254 11.5361 6.62752 11.4632L8.99992 9.81324L11.373 11.4632H11.3731C11.4781 11.5361 11.6178 11.5344 11.7211 11.4591C11.8245 11.3838 11.8687 11.2515 11.8313 11.1292L10.994 8.366L13.2973 6.62103C13.3989 6.54375 13.4406 6.41076 13.4009 6.28942C13.3613 6.16808 13.2492 6.08505 13.1216 6.08264L10.2329 6.0229L9.28425 3.2965C9.24005 3.1686 9.11576 3.08597 8.98063 3.09494H8.98079ZM9.00008 4.30848L9.73427 6.41784V6.41771C9.77539 6.53637 9.88628 6.61686 10.0119 6.61927L12.2473 6.66441L10.4649 8.01321C10.3643 8.08914 10.322 8.21972 10.3588 8.34026L11.0069 10.4772L9.17109 9.2022V9.20207C9.06837 9.13109 8.9323 9.13109 8.82958 9.20207L6.99382 10.4771L7.64068 8.34013V8.34026C7.67738 8.21973 7.63479 8.08901 7.53408 8.01321L5.75335 6.66441L7.98874 6.61927C8.11437 6.61686 8.22526 6.53637 8.26638 6.41771L9.00008 4.30848Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')" :stroke="((competitor.my_business) ? '#FFFFFF' : '#666666')" stroke-width="0.5"/>
                                                </svg>
                                            </div>
                                            <div style="float: left; padding-left: 5px;">
                                                <span>
                                                    Rating:
                                                </span>
                                            </div>
                                            <div style="float: left; padding-left: 5px;">
                                                {{ competitor.rating }}
                                            </div>
                                            <div style="float: left; padding-left: 5px;">
                                                <v-rating
                                                    style="margin-top: -2px;"
                                                    :value="(parseFloat(competitor.rating) || 0)"
                                                    :color="'orange ligten-1'"
                                                    dense
                                                    half-increments
                                                    readonly
                                                    size="18"
                                                ></v-rating>
                                            </div>
                                            <div v-show="competitor.reviews != 'pending'" style="float: left; padding-left: 5px;">
                                                ({{ competitor.user_ratings_total }})
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-select-group" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <div style="font-weight: bold; margin-bottom: 10px;">Main Category</div>

                                                <div style="float: left; padding-right: 5px;">
                                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6896 1.78231L5.62069 9.80262C5.20687 10.2139 4.55176 10.2139 4.13794 9.80262L0.310367 5.99811C-0.103456 5.58678 -0.103456 4.93563 0.310367 4.5243C0.724189 4.11297 1.3793 4.11297 1.79312 4.5243L4.87931 7.59189L12.2069 0.308496C12.6207 -0.102832 13.2758 -0.102832 13.6896 0.308496C14.1034 0.719824 14.1033 1.37111 13.6896 1.78231Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#54AC0E')"/>
                                                    </svg>
                                                </div>
                                                <div style="float: left; padding-left: 5px;">
                                                    <div v-if="competitor.categories != null">
                                                        <div v-if="competitor.types.length > 0">
                                                            <span v-if="competitor.types[0] != null">
                                                                {{ ucwords(competitor.types[0].replace(/\_/g, ' ')) }}
                                                            </span>
                                                            <span v-else>
                                                                {{ ucwords(competitor.types[1].replace(/\_/g, ' ')) }}
                                                            </span>
                                                        </div>
                                                        <div v-else>
                                                            <v-tooltip top color="#2477F6">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    ></i>
                                                                </template>
                                                                <span>Please wait while we are fetching main category...</span>
                                                            </v-tooltip>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <v-tooltip top color="#2477F6">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                ></i>
                                                            </template>
                                                            <span>Please wait while we are fetching main category...</span>
                                                        </v-tooltip>
                                                    </div>
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="0.806354" cy="0.806354" r="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                    <rect x="3.72266" width="14.8865" height="1.61271" rx="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                    <circle cx="0.806354" cy="5.76729" r="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                    <rect x="3.72266" y="4.96094" width="14.8865" height="1.61271" rx="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                    <circle cx="0.806354" cy="10.7321" r="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                    <rect x="3.72266" y="9.92578" width="14.8865" height="1.61271" rx="0.806354" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                </svg>
                                            </div>
                                            <div style="float: left; padding-left: 5px;">
                                                <div style="font-weight: bold; margin-bottom: 10px;">Secondary Categories</div>
                                                <div v-if="competitor.categories != null">
                                                    <div v-if="competitor.categories.length == 0">
                                                        <div style="padding-top: 4px;">
                                                            Not Found
                                                        </div>
                                                    </div>
                                                    <div v-else v-for="(item, index) in competitor.categories" :key="index" style="padding-bottom: 10px;">
                                                        <div v-if="competitor.categories.length > 0">
                                                            <div style="float: left; padding-top: 4px;">
                                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6896 1.78231L5.62069 9.80262C5.20687 10.2139 4.55176 10.2139 4.13794 9.80262L0.310367 5.99811C-0.103456 5.58678 -0.103456 4.93563 0.310367 4.5243C0.724189 4.11297 1.3793 4.11297 1.79312 4.5243L4.87931 7.59189L12.2069 0.308496C12.6207 -0.102832 13.2758 -0.102832 13.6896 0.308496C14.1034 0.719824 14.1033 1.37111 13.6896 1.78231Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#2477F6')"/>
                                                                </svg>
                                                            </div>
                                                            <div style="float: left; padding-left: 12px; padding-top: 5px;">
                                                                {{ item }}
                                                            </div>
                                                            <div style="clear: both;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching secondary categories...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;display: flex;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.23 0.871667C4.166 0.871667 0.871667 4.16611 0.871667 8.23C0.871667 12.2939 4.1661 15.5883 8.23 15.5883C12.2939 15.5883 15.5883 12.2939 15.5883 8.23C15.5883 4.1661 12.2939 0.871667 8.23 0.871667ZM0.5 8.23C0.5 3.96078 3.96078 0.5 8.23 0.5C12.4992 0.5 15.96 3.96078 15.96 8.23C15.96 12.4992 12.4992 15.96 8.23 15.96C3.96078 15.96 0.5 12.4992 0.5 8.23Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')" :stroke="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22878 3.42986C8.6076 3.42986 8.91461 3.73688 8.91461 4.11569V7.94641L11.1141 10.1461C11.382 10.4138 11.382 10.8481 11.1141 11.1159C10.8463 11.3838 10.4121 11.3838 10.1443 11.1159L7.7439 8.71544C7.6153 8.58684 7.54297 8.41244 7.54297 8.23052V4.11552C7.54297 3.7367 7.84999 3.42969 8.2288 3.42969L8.22878 3.42986Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#666666')"/>
                                                </svg>
                                            </div>
                                            <div style="float: left; padding-left: 5px;">
                                                <div style="font-weight: bold; margin-bottom: 10px;">Open Hours</div>

                                                <div v-if="competitor.open_hours != null">
                                                    <div v-if="competitor.open_hours == ''">
                                                        Not Found
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="competitor.open_hours == 'Open 24/7'">
                                                            Open 24/7
                                                        </div>
                                                        <div v-else>
                                                            <div v-for="(item, index) in competitor.open_hours" :key="index" style="padding-bottom: 5px;">
                                                                {{ index }} - {{ item || "Not Found" }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching open hours...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-calendar-outline" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <span>
                                                    Appointments:
                                                </span>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <div v-if="competitor.appointments != null">
                                                    {{ competitor.appointments ? 'Active' : 'Inactive' }}
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching appointments...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-post-outline" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <span>
                                                    Posts:
                                                </span>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <div v-if="competitor.has_posts != null">
                                                    {{ competitor.has_posts ? 'Yes' : 'No' }}
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching posts...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-help-box-outline" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <span>
                                                    Q&A:
                                                </span>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <div v-if="competitor.qa != null">
                                                    {{ competitor.qa ? 'Active' : 'Inactive' }}
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching Questions & Answers...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-account-multiple-outline" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px; width: calc(100% - 30px);">
                                                <div style="font-weight: bold; margin-bottom: 10px;">Social Profiles</div>

                                                <div v-if="competitor.profiles != null">
                                                    <div v-if="competitor.profiles.length == 0">
                                                        Not Found
                                                    </div>
                                                    <div v-else v-for="(item, index) in competitor.profiles" :key="index" style="padding-bottom: 10px;">
                                                        <div style="float: left; padding-top: 4px;">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6896 1.78231L5.62069 9.80262C5.20687 10.2139 4.55176 10.2139 4.13794 9.80262L0.310367 5.99811C-0.103456 5.58678 -0.103456 4.93563 0.310367 4.5243C0.724189 4.11297 1.3793 4.11297 1.79312 4.5243L4.87931 7.59189L12.2069 0.308496C12.6207 -0.102832 13.2758 -0.102832 13.6896 0.308496C14.1034 0.719824 14.1033 1.37111 13.6896 1.78231Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#2477F6')"/>
                                                            </svg>
                                                        </div>
                                                        <div style="float: left; padding-left: 12px; width: calc(100% - 20px); padding-top: 5px;">
                                                            {{ item.split(".")[0] }}
                                                        </div>
                                                        <div style="clear: both;"></div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching social profiles...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>

                                        <div style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;" :style="((competitor.my_business) ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-store-outline" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px; width: calc(100% - 30px);">
                                                <div style="font-weight: bold; margin-bottom: 10px;">Products</div>

                                                <div v-if="competitor.products != null">
                                                    <div v-if="competitor.products.length == 0">
                                                        Not Found
                                                    </div>
                                                    <div v-else v-for="(item, index) in competitor.products" :key="index" style="padding-bottom: 10px;">
                                                        <div style="float: left; padding-top: 4px;">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6896 1.78231L5.62069 9.80262C5.20687 10.2139 4.55176 10.2139 4.13794 9.80262L0.310367 5.99811C-0.103456 5.58678 -0.103456 4.93563 0.310367 4.5243C0.724189 4.11297 1.3793 4.11297 1.79312 4.5243L4.87931 7.59189L12.2069 0.308496C12.6207 -0.102832 13.2758 -0.102832 13.6896 0.308496C14.1034 0.719824 14.1033 1.37111 13.6896 1.78231Z" :fill="((competitor.my_business) ? '#FFFFFF' : '#2477F6')"/>
                                                            </svg>
                                                        </div>
                                                        <div style="float: left; padding-left: 12px; width: calc(100% - 20px); padding-top: 5px;">
                                                            {{ item }}
                                                        </div>
                                                        <div style="clear: both;"></div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching products...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>
                                        <div v-if="competitor.citations_status == 'Error Occured'" style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;">
                                            Unable to process Citation details. Please delete this report and rerun GBP audit to refetch citations.
                                        </div>
                                        <div v-else style="padding-bottom: 14px; padding-left: 10px; padding-right: 10px; padding-top: 20px;">
                                            <div style="float: left; padding-right: 5px;">
                                                <i class="mdi mdi-format-list-bulleted-triangle" style="font-size: 18px;"></i>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <span>
                                                    Citations:
                                                </span>
                                            </div>
                                            <div style="float: left; padding-left: 5px; padding-top: 5px;">
                                                <div v-if="competitor.citations_status == 'completed'">
                                                    {{ competitor.report_result.active.length }}
                                                </div>
                                                <div v-else>
                                                    <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            ></i>
                                                        </template>
                                                        <span>Please wait while we are fetching citations...</span>
                                                    </v-tooltip>
                                                </div>
                                            </div>
                                            <div style="clear: both;"></div>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="pt-3">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> We are currently gathering the information needed to show your competitors information.</div>

                    <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
                </div>

                <div :class="'text-bold ' + (($vuetify.breakpoint.xs) ? 'px-3' : 'pl-3')" style="font-size: 16px; color: #273042;">How {{ this_search.properties.business.name }} compares to these Top 3 competitors?</div>

                <div v-if="this_search.properties.short_summary.grade" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                        <v-card
                            class="pa-2 pt-6 pb-6"
                            tile

                            :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-4' : '')"
                        >
                        <div class="flex flex-row flex-wrap">
                            <div class="w-full lg:w-1/2" style="position: relative;">
                            <div class="lr-seo-box-left">
                                <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                    {{ this_search.properties.short_summary.grade.value }}
                                </div>
                                    <apexchart type="donut" :options="shortSummaryDoughnut.chartOptions" :series="shortSummaryDoughnut.series" width="200"></apexchart>
                                </div>
                            </div>

                            <div class="lr-seo-box-right pt-4">
                                <div class="" style="font-size: 20px; font-weight: bold;">
                                    {{ this_search.properties.short_summary.grade.title }}
                                </div>

                                <div style="color: #757B89; font-size: 12px;">
                                    {{ this_search.properties.short_summary.grade.description }}
                                </div>
                            </div>

                            <div class="clearfix"></div>
                            </div>
                        </div>

                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pr-2' : 'px-5')">
                            <div v-if="this_search.properties.short_summary.items" style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">
                                <div v-for="(item, index) in this_search.properties.short_summary.items" :key="index">
                                    <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                        <div class="float-left pr-2" style="width: 25px;">
                                            <div v-if="this_search.properties.competitors.status == 'pending' && item.title == 'Citations'">
                                                <i class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                                            </div>
                                            <div v-else>
                                                <i v-if="item.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                                <i v-if="item.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                                                <i v-if="item.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                            </div>
                                        </div>

                                        <div class="float-left" style="width: calc(100% - 25px);">
                                        <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                        <div v-if="this_search.properties.competitors.status == 'pending' && item.title == 'Citations'">
                                            <v-tooltip top color="#2477F6">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    ></i>
                                                </template>
                                                <span>Please wait while we are fetching this information...</span>
                                            </v-tooltip>
                                        </div>
                                        <div v-else>

                                            <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                {{ item.sub_title }}
                                            </div>

                                            <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                {{ item.description }}
                                            </div>
                                        </div>
                                    </div>

                                    <div style="clear: both;"></div>  
                                    <hr v-if="item.title != 'Citations'" class="mt-5 mb-5" />
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                        </v-card>
                </div>
                <div v-else class="pt-3">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> We are currently gathering the information needed to display your status.</div>

                    <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
                </div>
            </div>
        </div>

        <div v-show="gmb_tab == 1 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="'' + (($vuetify.breakpoint.xs) ? '' : 'px-3')">
                <!-- <div :class="'text-bold ' + (($vuetify.breakpoint.xs) ? 'px-3' : '')" style="font-size: 16px; color: #273042;">Overview</div> -->

                <div class="text-bold" v-if="this_search.properties.summary.grade">
                    <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                            <v-card
                                class="pa-2 pt-6 pb-6"
                                tile

                                :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-4' : '')"
                            >
                            <div class="flex flex-row flex-wrap">
                                <div class="w-full lg:w-1/2" style="position: relative;">
                                <div class="lr-seo-box-left">
                                    <div class="lr-doughnut-wrapper">
                                    <div class="lr-doughnut-title">
                                        {{ this_search.properties.summary.grade.value }}
                                    </div>
                                        <apexchart type="donut" :options="summaryDoughnut.chartOptions" :series="summaryDoughnut.series" width="200"></apexchart>
                                    </div>
                                </div>

                                <div class="lr-seo-box-right pt-4">
                                    <div class="" style="font-size: 20px; font-weight: bold;">
                                        {{ this_search.properties.summary.grade.title }}
                                    </div>

                                    <div style="color: #757B89; font-size: 12px;">
                                        {{ this_search.properties.summary.grade.description }}
                                    </div>
                                </div>

                                <div class="clearfix"></div>
                                </div>
                            </div>
                        </v-card>
                    </div>

                    <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-2/3" style="position: relative;">
                            <div v-if="this_search.properties.summary.left_items" style="">
                                <div v-for="(item, index) in this_search.properties.summary.left_items" :key="index">
                                    <div v-if="this_search.properties.summary.grade" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                            class="pa-2 pt-2 pb-6"
                                            tile
                                        >
                                            <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                <div class="float-right pr-2">
                                                    <span v-if="item.passed === true"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                                    <span v-if="item.passed === false"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                                </div>

                                                <div style="padding: 10px;">
                                                    <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                                    <div v-if="item.sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_title }}
                                                    </div>

                                                    <div v-if="item.sub_sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_sub_title }}
                                                    </div>

                                                    <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.description }}
                                                    </div>

                                                    <div v-if="item.title == 'Business Name'" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        Business Name: <strong>{{ this_search.properties.business.name }}</strong>
                                                    </div>

                                                    <div v-if="item.title == 'Business Description' && item.business_description" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <strong>Business Description:</strong> <div style="display: inline-block;" v-html="item.business_description"></div>
                                                    </div>

                                                    <div v-if="item.title == 'Business Category'" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        Business Categories: 

                                                        {{ this_search.properties.business.types.join(' - ').replace(/\_/g, " ") }}
                                                        
                                                        <!-- <span v-for="(item, index) in this_search.properties.business.types" :key="index" style="font-weight: bold;">
                                                            <span v-if="item">
                                                                {{ item.replace(/\_/g, " ") }} - 
                                                            </span>
                                                        </span> -->

                                                        <div v-if="missing_categories.length > 0">
                                                            <br />
                                                            <div style="padding-bottom: 10px;">Potential categories:</div>

                                                            <div v-for="(missing_category, mc_index) in missing_categories" :key="mc_index" style="padding: 8px 15px; display: inline-block; margin-right: 10px; font-size: 12px; background: rgba(25, 35, 58, 0.05); color: #19233A; border-radius: 30px;">
                                                                {{ missing_category }}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="item.title == 'Products' && potential_products.length > 0" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <div style="padding-bottom: 10px;">Potential products:</div>

                                                        <div v-for="(potential_product, mc_index) in potential_products" :key="mc_index" style="padding: 8px 15px; display: inline-block; margin-right: 10px; font-size: 12px; background: rgba(25, 35, 58, 0.05); color: #19233A; border-radius: 30px;">
                                                            {{ potential_product }}
                                                        </div>
                                                    </div>

                                                    <div v-if="item.title == 'Images'" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <div class="flex flex-row flex-wrap">
                                                            <div class="w-full lg:w-1/6" style="position: relative; text-align: center; padding: 10px;" v-for="(photo, index) in this_search.properties.business.photos" :key="index">
                                                                <img :src="'https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photo_reference=' + photo.photo_reference + '&key=' + this_search.api_key" :style="(($vuetify.breakpoint.xs) ? '' : 'max-width: 100px; max-height: 100px;')" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="item.title == 'Reviews'" :class="'py-2'">
                                                        <div class="lr-report-subtitle">Overall Ratings</div>

                                                        <div class="stats-box-number large">{{ this_search.properties.business.rating || 0 }}</div>
                                                        
                                                        <div class="stats-box-icon-bg" style="top: 100px;"></div>
                                                        <div class="stats-box-icon" style="top: 100px;">
                                                        <i class="mdi mdi-star"></i>
                                                        </div>

                                                        <div class="clearfix"></div>
                                                        
                                                        <div style="float: left;">
                                                        <v-rating
                                                            class="mt-1 -ml-1"
                                                            :value="(parseFloat(this_search.properties.business.rating) || 0)"
                                                            :color="'orange ligten-1'"
                                                            dense
                                                            half-increments
                                                            readonly
                                                            size="20"
                                                        ></v-rating>
                                                        </div>
                                                        
                                                        <div class="text-sm pl-2" style="color: #757575; float: left; font-size: 12px; padding-top: 7px;">
                                                        Based on

                                                        <span class="mr-1">{{ this_search.properties.business.user_ratings_total || 0 }}</span>

                                                        <span class="text-gray-600" v-show="this_search.properties.business.user_ratings_total == 1">Review</span>
                                                        <span class="text-gray-600" v-show="this_search.properties.business.user_ratings_total != 1">Reviews</span>
                                                        </div>

                                                        <div class="clearfix"></div>

                                                        <hr class="mt-3" />
                                                    </div>

                                                    <div v-if="item.title == 'Reviews'" v-html="reviews_html" style="padding-top: 10px; color: #757B89; font-size: 12px;"></div>

                                                    <div v-if="item.title == 'Missing Citations'" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <div v-if="this_search.properties.competitors.status == 'completed'">
                                                            <div v-if="this_search.properties.business.citations_report && this_search.properties.business.citations_report.possible !== undefined">
                                                                <div v-if="this_search.properties.business.citations_report.possible">
                                                                    <table class="w-full rg-datatable mt-5">
                                                                        <thead class="border-b border-gray-100 w-full">
                                                                        <tr>
                                                                            <th>Site/Directory</th>
                                                                            <th>Authority</th>
                                                                            <th>Citation Value</th>
                                                                            <th>Site Type</th>
                                                                            <th>Free/Paid</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody class="w-full" style="">
                                                                        <tr v-for="(item, index) in this_search.properties.business.citations_report.possible" :key="index">
                                                                            <td class="">
                                                                                <a :href="'https://www.2findlocal.com/Modules/Biz/bizPhoneLookup.php'" target='url-add-citation'>{{ item.source }}</a>
                                                                            </td>
                                                                            <td class="">
                                                                                {{ item['domain-authority'] }}/100
                                                                            </td>
                                                                            <td class="">
                                                                                {{ item['citation-value'] }}
                                                                            </td>
                                                                            <td class="">
                                                                                {{ item['site-type'] }}
                                                                            </td>
                                                                            <td class="">
                                                                                {{ item['listing-type'] }}
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>

                                                                    <!-- <div v-for="(item_citation, index_citation, counter) in this_search.properties.business.citations_report.possible" :key="index_citation">
                                                                        <strong class="pr-2">{{ (counter + 1) }}. </strong>
                                                                        <a :href="'https://' + item_citation.source" target="lr-missing-citation">{{ item_citation.source }}</a>

                                                                        <div v-if="item_citation['citation-value'] == 'Very High' || item_citation['citation-value'] == 'High'" style="padding: 8px 15px; display: inline-block; margin-left: 20px; font-size: 12px; background: rgba(36, 119, 246, 0.1); color: #2477F6; border-radius: 30px;">
                                                                            Well Known
                                                                        </div>
                                                                        <div v-else style="padding: 8px 15px; display: inline-block; margin-left: 20px; font-size: 12px; background: rgba(25, 35, 58, 0.05); color: #19233A; border-radius: 30px;">
                                                                            Local
                                                                        </div>

                                                                        <div style="clear: both;"></div>

                                                                        <hr class="mt-2 mb-2" />
                                                                    </div> -->
                                                                </div>
                                                                <div v-else>
                                                                    No missing citations.
                                                                </div>
                                                            </div>
                                                            <div v-else style="padding-top: 10px; color: rgb(117, 123, 137); font-size: 12px; font-weight: bold;">
                                                                Unable to process Citation details. Please delete this report and rerun GBP audit to refetch citations.
                                                            </div>
                                                        </div>
                                                        <div v-else><i class="fa fa-spin fa-spinner"></i></div>
                                                    </div>
                                                </div>

                                            <div style="clear: both;"></div>  

                                            </div>
                                        </v-card>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>

                        <div class="w-full lg:w-1/3" style="position: relative;">
                            <div v-if="this_search.properties.summary.right_items" style="">
                                <div v-for="(item, index) in this_search.properties.summary.right_items" :key="index">
                                    <div v-if="this_search.properties.summary.grade" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                            class="pa-2 pt-2 pb-6"
                                            tile
                                        >
                                            <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                <div class="float-right pr-2">
                                                    <span v-if="item.passed === true"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                                    <span v-if="item.passed === false"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                                </div>

                                                <div style="padding: 10px;">
                                                    <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                                    <div v-if="item.sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_title }}
                                                    </div>

                                                    <div v-if="item.sub_sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_sub_title }}
                                                    </div>

                                                    <div style="padding-top: 10px; color: #757B89; font-size: 12px; font-weight: bold;">
                                                        {{ item.description }}
                                                    </div>

                                                    <div v-if="item.title == 'Address' && item.passed" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        Area Served: <div style="font-weight: bold; padding-top: 10px;">{{ item.area_served }}</div>
                                                    </div>

                                                    <div v-if="item.title == 'Phone Number' && item.passed" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        Your Business Phone: <div style="font-weight: bold; padding-top: 10px;">{{ item.phone_number }}</div>
                                                    </div>

                                                    <div v-if="item.title == 'Website / URL' && item.passed" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        Your Business Website / URL: <div style="font-weight: bold; padding-top: 10px;"><a :href="item.website" target="lr-gmb-website">{{ item.website }}</a></div>
                                                    </div>

                                                    <div v-if="item.title == 'Business Hours' && item.passed" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <div class="mb-2"><strong style="font-size: 14px;">Your Business Hours</strong></div>
                                                        <div v-for="(business_item, index2) in item.weekday_text" :key="index2">
                                                            {{ business_item }}

                                                            <div style="clear: both;"></div>

                                                            <hr class="mt-2 mb-2" />
                                                        </div>
                                                    </div>

                                                    <div v-if="item.title == 'Checklist'" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <div v-for="(checklist_item, index3) in item.checklist" style="width: 50%; display: inline-block;" :key="index3">
                                                            <label>
                                                                <v-checkbox :label="checklist_item.title" v-model="checklist_item.checked"></v-checkbox>
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>

                                            <div style="clear: both;"></div>  

                                            </div>
                                        </v-card>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="pt-3" :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : '')">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> We still need to fetch some information to build your full summary.</div>

                    <v-skeleton-loader type="article, article, article, article, article, article, article"></v-skeleton-loader>
                </div>
            </div>
        </div>

        <div v-show="gmb_tab == 2 || $vuetify.breakpoint.xs">
            <div class="dashboard-box stats-box w-full px-2 mb-5 ifarmaWin" ref="iframewin">
                <v-card
                    class="pa-2"
                    tile
                >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <iframe v-if="loaded && (show_grid || $vuetify.breakpoint.xs)" :src="'/grid-tracker/app_for_gmb.html'" :style="(($vuetify.breakpoint.xs) ? 'width: 100%; height: 400px;' : 'width: 100%; height: 850px;')"></iframe>
                    </div>
                </v-card>
            </div>
        </div>

        <div v-show="gmb_tab == 3 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? '' : 'px-3')">
               
                <div v-if ="this_search.properties.reviews.status == 're_run'">
                    <div  class="pt-3">
                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> Please wait while we import all your reviews.</div>

                        <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                    </div>
                </div>
                <div v-else>
                    <div v-if="this_search.properties.reviews.grade">
                        <div>
                            <div v-if="this_search.properties.reviews.status === 'Error Occured'">
                                <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                    <v-card
                                            class="pa-2 pt-6 pb-6"
                                            tile

                                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                        >
                                            <div v-if="!this_search.properties.reviews.reviews_error"  class="flex flex-row flex-wrap">
                                                <div class="w-full" style="position: relative;">

                                                    <div class="lr-seo-box-right pt-3">
                                                        <strong class=""> Error :</strong> We are facing some delays because of API failure. We are retrying to fetch results for this report.
                                                    </div>

                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div v-if="this_search.properties.reviews.reviews_error"  class="flex flex-row flex-wrap">
                                                <div class="w-full" style="position: relative;">

                                                    <div class="lr-seo-box-right pt-3">
                                                        <strong class=""> {{this_search.properties.reviews.reviews_error}}</strong> 
                                                    </div>

                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div v-else  style="display: flex; justify-content: start;">
                                                <div v-if="isOlderThanSixMinutes(this_search.created_at)" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-5 float-right" @click="reRunSpecificReport('review',this_search.id)">
                                                <i class="fa fa-plus mr-2"></i> RE-RUN REVIEW REPORT
                                            </div>
                                            </div>
                                    </v-card>
                                </div>
                            </div>

                            <div v-else class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                    <v-card
                                        class="pa-2 pt-6 pb-6"
                                        tile

                                        :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-3' : '')"
                                    >
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full lg:w-1/2" style="position: relative;">
                                            <div class="lr-seo-box-left">
                                                <div class="lr-doughnut-wrapper">
                                                <div class="lr-doughnut-title">
                                                    {{ this_search.properties.reviews.grade.value }}
                                                </div>
                                                    <apexchart type="donut" :options="reviewsDoughnut.chartOptions" :series="reviewsDoughnut.series" width="200"></apexchart>
                                                </div>
                                            </div>

                                            <div class="lr-seo-box-right pt-4">
                                                <div class="" style="font-size: 20px; font-weight: bold;">
                                                    {{ this_search.properties.reviews.grade.title }}
                                                </div>

                                                <div style="color: #757B89; font-size: 12px;">
                                                    {{ this_search.properties.reviews.grade.description }}
                                                </div>
                                            </div>

                                            <div class="clearfix"></div>
                                        </div>

                                        <div class="w-full lg:w-1/2" :style="'position: relative; ' + (($vuetify.breakpoint.xs) ? '' : 'border-left: solid 1px rgba(0, 0, 0, 0.1); padding-left: 30px;') + ' '">
                                            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pt-2' : 'float-right pr-2')">
                                                <span v-if="this_search.properties.reviews.grade.value == 'A+'"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                                <span v-if="this_search.properties.reviews.grade.value != 'A+'"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                            </div>
                                            
                                            <div v-if="this_search.properties.gbp_issues.items" style="">
                                                <div :style="(($vuetify.breakpoint.xs) ? 'padding-top: 10px;' : 'padding-top: 25px;')">
                                                    <span v-if="this_search.properties.business.user_ratings_total > 100"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i>  Reviews</span>
                                                    <span v-else><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>  Reviews</span>
                                                </div>

                                                <div :style="(($vuetify.breakpoint.xs) ? 'padding-top: 10px;' : 'padding-top: 25px;')">
                                                    <span v-if="this_search.properties.business.rating >= 4.5"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i>  Rating</span>
                                                    <span v-else><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>  Rating</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-card>
                            </div>
                        </div>
                        <div>
                            
                        <div>
                            <div v-if="this_search.properties.reviews.status === 'Error Occured'">
                                <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                    <v-card
                                            class="pa-2 pt-6 pb-6"
                                            tile

                                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                        >
                                            <div v-if="!this_search.properties.reviews.reviews_error" class="flex flex-row flex-wrap">
                                                <div class="w-full" style="position: relative;">

                                                    <div class="lr-seo-box-right pt-3">
                                                        <strong class=""> Error :</strong> We are facing some delays because of API failure. We are retrying to fetch results for this report.
                                                    </div>

                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div v-if="this_search.properties.reviews.reviews_error"  class="flex flex-row flex-wrap">
                                                <div class="w-full" style="position: relative;">

                                                    <div class="lr-seo-box-right pt-3">
                                                        <strong class=""> {{this_search.properties.reviews.reviews_error}}</strong> 
                                                    </div>

                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                            <div v-else  style="display: flex; justify-content: start;">
                                                <div v-if="isOlderThanSixMinutes(this_search.created_at)" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-5 float-right" @click="reRunSpecificReport('review',this_search.id)">
                                                    <i class="fa fa-plus mr-2"></i> RE-RUN REVIEW REPORT
                                                </div>
                                            </div>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                <v-card
                                    class="pa-2 pt-2 pb-6"
                                    tile
                                >
                                    <v-container class="chart-container">
                                        <apexchart height="205" type="line" :options="reviews_options" :series="reviews_series" :key="reviews_chart_key"></apexchart>
                                    </v-container>
                                </v-card>
                            </div>
                        </div>

                        </div>

                        <div class="flex flex-row flex-wrap">
                            <div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                <div class="dashboard-box-title">Total Reviews</div>

                                <div class=""><strong class="text-xl">{{ this_search.properties.business.user_ratings_total }}</strong></div>
                                
                                <div class="stats-box-icon-bg"></div>
                                <div class="stats-box-icon">
                                    <i class="mdi mdi-star-box"></i>
                                </div>
                                </div>
                            </v-card>
                            </div>

                            <div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                <div class="dashboard-box-title">Average Rating</div>

                                <div class=""><strong class="text-xl">{{ this_search.properties.business.rating }}</strong></div>
                                
                                <div class="stats-box-icon-bg"></div>
                                <div class="stats-box-icon">
                                    <i class="mdi mdi-star"></i>
                                </div>
                                </div>
                            </v-card>
                            </div>
                            
                        </div>


                        <div v-if="this.google_review_enabled !== null" class="flex flex-row flex-wrap">
                            <div class="flex flex-row flex-wrap" v-if="this.google_review_enabled === 1 && this.google_local_guide === 1">
                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'" class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">No. Of Reviews With Photos</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_with_photos }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-image-area"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">No. Of Reviews Provided By Local Guides</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_local_guides }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account-star"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">Average Number of Reviews By Others</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_others }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>
                            </div>

                            <div class="flex flex-row flex-wrap" v-else-if="this.google_review_enabled === 1">
                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'" class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">No. Of Reviews With Photos</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_with_photos }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-image-area"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">Average Number of Reviews By Others</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_others }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                            </div>

                            <div class="flex flex-row flex-wrap" v-else-if="this.google_local_guide === 1">

                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">No. Of Reviews Provided By Local Guides</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_local_guides }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account-star"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">Average Number of Reviews By Others</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_others }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>
                            </div>

                            <div class="flex flex-row flex-wrap" v-else>
                                <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="dashboard-box stats-box w-full px-2  mb-5">
                                <v-card
                                    class="pa-2"
                                    tile
                                >
                                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                    <div class="dashboard-box-title">Average Number of Reviews By Others</div>

                                    <div class=""><strong class="text-xl">{{ this_search.properties.reviews.reviews_by_others }}</strong></div>
                                    
                                    <div class="stats-box-icon-bg"></div>
                                    <div class="stats-box-icon">
                                        <i class="mdi mdi-account"></i>
                                    </div>
                                    </div>
                                </v-card>
                                </div>

                            </div>

                        </div>


                        <div v-else class="pt-3 mb-3">

                            <v-skeleton-loader type="article"></v-skeleton-loader>
                        </div>

                        <div class="flex flex-row flex-wrap">
                            <div class="w-full" style="position: relative;">
                                <div style="">
                                    <div>
                                        <div class="dashboard-box stats-box w-full px-2">
                                            <v-card
                                                class="pa-2 pt-2 pb-6"
                                                tile
                                            >
                                                <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                    <div style="padding: 10px;">
                                                        <div style="font-weight: bold; font-size: 16px;">Number of Reviews</div>

                                                        <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                            Google reviews are important because they help showcase your company's reputation, they increase sales and improve search rankings for your website. See how your compare with other businesses.
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="flex flex-row flex-wrap">
                            <div v-for="(item2, index2) in this_search.properties.competitors.list" :key="index2" class="dashboard-box stats-box w-full px-2 mb-5 mt-3" :class="'lg:w-1/' + this_search.properties.competitors.list.length">
                                <v-card class="pa-2" tile :style="((item2.my_business) ? 'background: #19233A; color: #FFFFFF !important;' : '')">
                                    <div class="p-2 pl-3" style="position: relative;">
                                        <div style="position: absolute; padding-top: 0px; right: 10px;">

                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute;">
                                            <rect opacity="0.1" x="0.589844" y="0.5" width="50" height="50" rx="10" :fill="((item2.my_business) ? '#FFFFFF' : '#3EBB80')"/>
                                            </svg>

                                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px; margin-top: 5px;">
                                                <path d="M8.91996 7C7.3599 7 6.08984 8.27097 6.08984 9.83103V27.1933C6.08984 28.7534 7.35996 30.0243 8.91996 30.0243H17.5314L20.1338 35.7081C20.2149 35.8869 20.393 36.0018 20.5894 36.0018C20.7859 36.0018 20.964 35.8869 21.045 35.7081L23.6475 30.0243H32.2578C33.8178 30.0243 35.0888 28.7534 35.0888 27.1933V9.83103C35.0888 8.27097 33.8176 7 32.2578 7H8.91996ZM8.91996 8H32.2577C33.2813 8 34.0887 8.80737 34.0887 9.83103V27.1933C34.0887 28.217 33.2813 29.0234 32.2577 29.0234H23.3262C23.1307 29.0237 22.9535 29.1377 22.8722 29.3154L20.591 34.2977L18.3068 29.3154H18.3066C18.2253 29.1377 18.0481 29.0237 17.8526 29.0234H8.91999C7.89633 29.0234 7.08987 28.217 7.08987 27.1933V9.83103C7.08987 8.80737 7.89633 8 8.91999 8H8.91996ZM20.5565 11.4942H20.5563C20.3552 11.5071 20.1815 11.6397 20.1159 11.8301L18.5349 16.3741L13.7175 16.4737C13.5049 16.4786 13.3188 16.6172 13.2534 16.8192C13.188 17.0212 13.2574 17.2424 13.4266 17.371L17.2635 20.2793L15.8708 24.8846C15.8086 25.0884 15.8822 25.309 16.0545 25.4344C16.2266 25.5599 16.4594 25.5628 16.6344 25.4413L20.5884 22.6913L24.5436 25.4413H24.5438C24.7188 25.5628 24.9516 25.5599 25.1237 25.4344C25.296 25.309 25.3697 25.0884 25.3074 24.8846L23.9118 20.2793L27.7507 17.371C27.9201 17.2422 27.9895 17.0205 27.9235 16.8183C27.8574 16.6161 27.6705 16.4777 27.4578 16.4737L22.6433 16.3741L21.0623 11.8301C20.9886 11.6169 20.7815 11.4792 20.5563 11.4942H20.5565ZM20.5887 13.5167L21.8123 17.0323V17.0321C21.8809 17.2299 22.0657 17.364 22.2751 17.3681L26.0007 17.4433L23.03 19.6913C22.8623 19.8178 22.7918 20.0355 22.8532 20.2364L23.9333 23.798L20.8737 21.6729V21.6727C20.7025 21.5544 20.4757 21.5544 20.3045 21.6727L17.2449 23.7977L18.323 20.2361V20.2364C18.3842 20.0355 18.3132 19.8176 18.1453 19.6913L15.1775 17.4433L18.9031 17.3681C19.1125 17.364 19.2973 17.2299 19.3658 17.0321L20.5887 13.5167Z" :fill="((item2.my_business) ? '#FFFFFF' : '#3EBB80')" :stroke="((item2.my_business) ? '#FFFFFF' : '#3EBB80')" stroke-width="0.5"/>
                                            </svg>
                                        </div>
                                        <div class="dashboard-box-title" style="width: calc(100% - 70px);"><a style="font-size: 12px;" :style="((item2.my_business) ? 'color: #FFFFFF !important;' : 'color: #19233A !important;')" :href="'https://www.google.com/search?q=' + encodeURIComponent(item2.name) + ' ' + item2.address" target="lr-competitor">{{ ((item2.my_business) ? "Your Business" : unEntity(item2.name)) }}</a></div>

                                        <div class="details-box top-heading" style="width: calc(100% - 70px);">{{ item2.user_ratings_total }}</div>
                                    </div>
                                </v-card>
                            </div>
                        </div>

                        <div  class="flex flex-row flex-wrap mt-3">
                            <div class="w-full" style="position: relative;">
                                <div style="">
                                    <div>
                                        <div class="dashboard-box stats-box w-full px-2">
                                            <v-card
                                                class="pa-2 pt-2 pb-6"
                                                tile
                                            >
                                                <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                    <div style="padding: 10px;">
                                                        <div style="font-weight: bold; font-size: 16px;">Aggregate Rating</div>

                                                        <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                            A good average rating is also important for building a good reputation online.
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="this_search.properties.reviews.status !== 'Error Occured'"  class="flex flex-row flex-wrap">
                            <div v-for="(item2, index2) in this_search.properties.competitors.list" :key="index2" class="dashboard-box stats-box w-full px-2 mb-5 mt-3" :class="'lg:w-1/' + this_search.properties.competitors.list.length">
                                <v-card class="pa-2" tile :style="((item2.my_business) ? 'background: #19233A; color: #FFFFFF !important;' : '')">
                                    <div class="p-2 pl-3" style="position: relative;">
                                        <div style="position: absolute; padding-top: 0px; right: 10px;">

                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute;">
                                                <rect opacity="0.1" x="0.589844" y="0.5" width="50" height="50" rx="10" :fill="((item2.my_business) ? '#FFFFFF' : '#3EBB80')"/>
                                            </svg>

                                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px; margin-top: 5px;">
                                                <path d="M8.91996 7C7.3599 7 6.08984 8.27097 6.08984 9.83103V27.1933C6.08984 28.7534 7.35996 30.0243 8.91996 30.0243H17.5314L20.1338 35.7081C20.2149 35.8869 20.393 36.0018 20.5894 36.0018C20.7859 36.0018 20.964 35.8869 21.045 35.7081L23.6475 30.0243H32.2578C33.8178 30.0243 35.0888 28.7534 35.0888 27.1933V9.83103C35.0888 8.27097 33.8176 7 32.2578 7H8.91996ZM8.91996 8H32.2577C33.2813 8 34.0887 8.80737 34.0887 9.83103V27.1933C34.0887 28.217 33.2813 29.0234 32.2577 29.0234H23.3262C23.1307 29.0237 22.9535 29.1377 22.8722 29.3154L20.591 34.2977L18.3068 29.3154H18.3066C18.2253 29.1377 18.0481 29.0237 17.8526 29.0234H8.91999C7.89633 29.0234 7.08987 28.217 7.08987 27.1933V9.83103C7.08987 8.80737 7.89633 8 8.91999 8H8.91996ZM20.5565 11.4942H20.5563C20.3552 11.5071 20.1815 11.6397 20.1159 11.8301L18.5349 16.3741L13.7175 16.4737C13.5049 16.4786 13.3188 16.6172 13.2534 16.8192C13.188 17.0212 13.2574 17.2424 13.4266 17.371L17.2635 20.2793L15.8708 24.8846C15.8086 25.0884 15.8822 25.309 16.0545 25.4344C16.2266 25.5599 16.4594 25.5628 16.6344 25.4413L20.5884 22.6913L24.5436 25.4413H24.5438C24.7188 25.5628 24.9516 25.5599 25.1237 25.4344C25.296 25.309 25.3697 25.0884 25.3074 24.8846L23.9118 20.2793L27.7507 17.371C27.9201 17.2422 27.9895 17.0205 27.9235 16.8183C27.8574 16.6161 27.6705 16.4777 27.4578 16.4737L22.6433 16.3741L21.0623 11.8301C20.9886 11.6169 20.7815 11.4792 20.5563 11.4942H20.5565ZM20.5887 13.5167L21.8123 17.0323V17.0321C21.8809 17.2299 22.0657 17.364 22.2751 17.3681L26.0007 17.4433L23.03 19.6913C22.8623 19.8178 22.7918 20.0355 22.8532 20.2364L23.9333 23.798L20.8737 21.6729V21.6727C20.7025 21.5544 20.4757 21.5544 20.3045 21.6727L17.2449 23.7977L18.323 20.2361V20.2364C18.3842 20.0355 18.3132 19.8176 18.1453 19.6913L15.1775 17.4433L18.9031 17.3681C19.1125 17.364 19.2973 17.2299 19.3658 17.0321L20.5887 13.5167Z" :fill="((item2.my_business) ? '#FFFFFF' : '#3EBB80')" :stroke="((item2.my_business) ? '#FFFFFF' : '#3EBB80')" stroke-width="0.5"/>
                                            </svg>
                                        </div>
                                        <div class="dashboard-box-title" style="width: calc(100% - 70px);"><a style="font-size: 12px;" :style="((item2.my_business) ? 'color: #FFFFFF !important;' : 'color: #19233A !important;')" :href="'https://www.google.com/search?q=' + encodeURIComponent(item2.name) + ' ' + item2.address" target="lr-competitor">{{ ((item2.my_business) ? "Your Business" : unEntity(item2.name)) }}</a></div>

                                        <div class="details-box top-heading" style="width: calc(100% - 70px);">{{ item2.rating }}</div>
                                    </div>
                                </v-card>
                            </div>
                        </div>

                        <div class="flex flex-row flex-wrap mb-4 pt-3">
                            <div class="dashboard-box stats-box w-full px-2 md:w-2/3 lg:w-2/3 mb-5">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-2">
                                    <div class="lr-report-subtitle">Average Ratings</div>

                                    <div class="stats-box-number large">{{ this_search.properties.business.rating || 0 }}</div>
                                    
                                    <div class="stats-box-icon-bg" style="top: 100px;"></div>
                                    <div class="stats-box-icon" style="top: 100px;">
                                    <i class="mdi mdi-star"></i>
                                    </div>

                                    <div class="clearfix"></div>
                                    
                                    <div style="float: left;">
                                    <v-rating
                                        class="mt-1 -ml-1"
                                        :value="(parseFloat(this_search.properties.business.rating) || 0)"
                                        :color="'orange ligten-1'"
                                        dense
                                        half-increments
                                        readonly
                                        size="20"
                                    ></v-rating>
                                    </div>
                                    
                                    <div class="text-sm pl-2" style="color: #757575; float: left; font-size: 12px; padding-top: 7px;">
                                    Based on

                                    <span class="mr-1">{{ this_search.properties.business.user_ratings_total || 0 }}</span>

                                    <span class="text-gray-600" v-show="this_search.properties.business.user_ratings_total == 1">Review</span>
                                    <span class="text-gray-600" v-show="this_search.properties.business.user_ratings_total != 1">Reviews</span>
                                    </div>

                                    <div class="clearfix"></div>

                                    <hr class="mt-3" />

                                    <div v-html="reviews_html" style="padding-top: 10px; color: #757B89; font-size: 12px;"></div>
                                </div>
                            </v-card>
                            </div>

                            <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-2">
                                    <div class="lr-report-subtitle">Keywords </div>

                                    <div style="font-size: 12px; line-height: 20px; padding-top: 5px; color: #757B89;">The review keyword analysis works best with the English language, showing most frequenty used words in your reviews.</div>

                                    <br />

                                    <div v-for="(topic, index_topic) in topics" :key="index_topic" style="padding: 8px 15px; display: inline-block; margin-right: 20px; margin-bottom: 10px; font-size: 12px; background: rgba(25, 35, 58, 0.05); color: #19233A; border-radius: 5px; padding-top: 10px;">
                                        {{ topic }}

                                        <!-- <div style="float: right; padding: 2px; padding-left: 3px; padding-right: 3px; background: #D9D9D9; border-radius: 3px; margin-left: 5px; margin-top: -2px;">{{ topic.mentions }}</div> -->
                                    </div>
                                    

                                </div>
                            </v-card>
                            </div>
                        </div>
                    </div>
                    <div v-else class="pt-3">
                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> Please wait while we import all your reviews.</div>

                        <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                    </div>
                </div>

            </div>
        </div>

        <div v-show="gmb_tab == 4 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? '' : 'px-3')">
                
                <div v-if="this_search.properties.posts.status == 're_run'">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> Please wait while we import all your posts.</div>

                    <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                </div>
                <div v-else>
                    <div v-if="this_search.properties.posts.status == 'Error Occured'">
                        <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                <v-card
                                        class="pa-2 pt-6 pb-6"
                                        tile

                                        :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                    >
                                        <div class="flex flex-row flex-wrap">
                                            <div class="w-full" style="position: relative;">

                                                <div class="lr-seo-box-right pt-3">
                                                <strong class=""> Error :</strong> We are facing some delays because of API failure. We are retrying to fetch results for this report.
                                                </div>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                        <div style="display: flex; justify-content: start;">
                                            <div v-if="isOlderThanSixMinutes(this_search.created_at)"  class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-5 float-right" @click="reRunSpecificReport('post',this_search.id)">
                                            <i class="fa fa-plus mr-2"></i> RE-RUN POST REPORT
                                            </div>
                                        </div>
                                </v-card>
                            </div>
                    </div>
                    <div v-else>
                        <div v-if="this_search.properties.posts.grade">
                            <div v-if="this_search.properties.posts.status !== 'Error Occured'">
                                    <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                            class="pa-2 pt-6 pb-6"
                                            tile

                                            :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-3' : '')"
                                        >
                                        <div class="flex flex-row flex-wrap">
                                            <div class="w-full lg:w-1/2" style="position: relative;">
                                                <div class="lr-seo-box-left">
                                                    <div class="lr-doughnut-wrapper">
                                                    <div class="lr-doughnut-title">
                                                        {{ this_search.properties.posts.grade.value }}
                                                    </div>
                                                        <apexchart type="donut" :options="postsDoughnut.chartOptions" :series="postsDoughnut.series" width="200"></apexchart>
                                                    </div>
                                                </div>

                                                <div class="lr-seo-box-right pt-4">
                                                    <div class="" style="font-size: 20px; font-weight: bold;">
                                                        {{ this_search.properties.posts.grade.title }}
                                                    </div>

                                                    <div style="color: #757B89; font-size: 12px;">
                                                        {{ this_search.properties.posts.grade.description }}
                                                    </div>
                                                </div>

                                                <div class="clearfix"></div>
                                            </div>

                                            <div class="w-full lg:w-1/2" :style="'position: relative; ' + (($vuetify.breakpoint.xs) ? '' : 'border-left: solid 1px rgba(0, 0, 0, 0.1); padding-left: 30px;') + ' '">
                                                <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pt-2' : 'float-right pr-2')">
                                                    <span v-if="this_search.properties.posts.grade.value == 'A+'"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                                    <span v-if="this_search.properties.posts.grade.value != 'A+'"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                                </div>
                                                
                                                <div v-if="this_search.properties.gbp_issues.items" style="">
                                                    <div :style="(($vuetify.breakpoint.xs) ? 'padding-top: 10px;' : 'padding-top: 25px;')">
                                                        <span v-if="this_search.properties.posts.posted_last_week"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i>  Last week posting</span>
                                                        <span v-else><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>  Last week posting</span>
                                                    </div>

                                                    <div :style="(($vuetify.breakpoint.xs) ? 'padding-top: 10px;' : 'padding-top: 25px;')">
                                                        <span v-if="this_search.properties.posts.posting_frequency_good"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i>  Posting frequency</span>
                                                        <span v-else><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>  Posting frequency</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-card>
                                </div>

                                <div>
                                    <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                            class="pa-2 pt-2 pb-6"
                                            tile
                                        >
                                            <v-container class="chart-container">
                                                <apexchart height="205" type="line" :options="posts_options" :series="posts_series" :key="posts_chart_key"></apexchart>
                                            </v-container>
                                        </v-card>
                                    </div>
                                </div>

                                <div class="flex flex-row flex-wrap mb-4">
                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Total Posts Analyzed</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.list.length }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-file-document"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Post Frequency (Last 30 Days)</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.post_frequency }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-clock-outline"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Average Characters Per Post</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.average_characters_per_post }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-xml"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Average No. Of Words Per Post</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.average_words_per_post }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-xml"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Total No. Of Posts With Links</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.posts_with_links }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-link"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 mb-5">
                                    <v-card
                                        class="pa-2"
                                        tile
                                    >
                                        <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'p-1' : 'p-3')">
                                        <div class="dashboard-box-title">Total No. of Posts With Images</div>

                                        <div class=""><strong class="text-xl">{{ this_search.properties.posts.posts_with_images }}</strong></div>
                                        
                                        <div class="stats-box-icon-bg"></div>
                                        <div class="stats-box-icon">
                                            <i class="mdi mdi-camera-outline"></i>
                                        </div>
                                        </div>
                                    </v-card>
                                    </div>
                                </div>

                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full" style="position: relative;">
                                        <div style="">
                                            <div>
                                                <div class="dashboard-box stats-box w-full px-2">
                                                    <v-card
                                                        class="pa-2 pt-2 pb-6"
                                                        tile
                                                    >
                                                        <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                            <div style="padding: 10px;">
                                                                <div style="font-weight: bold; font-size: 16px;">Posts Comparison</div>

                                                                <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                                    Posting frequently is important because that shows your company is active, your users will love that and it will increase sales.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </v-card>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row flex-wrap">
                                    <div v-for="(item2, index2) in this_search.properties.competitors.list" :key="index2" class="dashboard-box stats-box w-full px-2 mb-5 mt-3" :class="'lg:w-1/' + this_search.properties.competitors.list.length">
                                        <v-card class="pa-2" tile :style="((item2.my_business) ? 'background: #19233A; color: #FFFFFF !important;' : '')">
                                            <div class="p-2 pl-3" style="position: relative;">
                                                <div class="dashboard-box-title" style="width: calc(100% - 70px);"><a style="font-size: 12px;" :style="((item2.my_business) ? 'color: #FFFFFF !important;' : 'color: #19233A !important;')" :href="'https://www.google.com/search?q=' + encodeURIComponent(item2.name) + ' ' + item2.address" target="lr-competitor">{{ ((item2.my_business) ? "Your Business" : unEntity(item2.name)) }}</a></div>

                                                <div class="details-box top-heading" style="width: calc(100% - 70px);">Has Posts: <strong>{{ ((item2.has_posts) ? 'Yes' : 'No') }}</strong></div>

                                                <div v-if="search.properties.competitors.competitors_frequency" class="details-box top-heading" style="width: calc(100% - 70px);">Posting Frequency: <strong>{{ item2.posts_frequency }}</strong></div>

                                                <div class="stats-box-icon-bg"></div>
                                                <div class="stats-box-icon">
                                                    <i class="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                        </v-card>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                                class="pa-2 pt-6 pb-6"
                                                tile

                                                :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                            >
                                                <div class="flex flex-row flex-wrap">
                                                    <div class="w-full" style="position: relative;">

                                                        <div class="lr-seo-box-right pt-3">
                                                        <strong class=""> Error :</strong> We are facing some delays because of API failure. We are retrying to fetch results for this report.
                                                        </div>

                                                        <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                                <div style="display: flex; justify-content: start;">
                                                    <div v-if="isOlderThanSixMinutes(this_search.created_at)" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-5 float-right" @click="reRunSpecificReport('post',this_search.id)">
                                                    <i class="fa fa-plus mr-2"></i> RE-RUN POST REPORT
                                                    </div>
                                                </div>
                                        </v-card>
                                    </div>
                            </div>
                        </div>
                        <div v-else class="pt-3">
                            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> Please wait while we import all your posts.</div>

                            <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                        </div>                                    
                    </div>
                </div>

            </div>
        </div>

        <div v-show="gmb_tab == 5 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? '' : 'px-3')">
                <!-- <strong style="font-size: 16px; color: #273042;">Overview</strong> -->

                <div v-if="this_search.properties.gbp_issues.grade">
                    <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                            <v-card
                                class="pa-2 pt-6 pb-6"
                                tile

                                :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-3' : '')"
                            >
                            <div class="flex flex-row flex-wrap">
                                <div class="w-full lg:w-1/2" style="position: relative;">
                                    <div class="lr-seo-box-left">
                                        <div class="lr-doughnut-wrapper">
                                        <div class="lr-doughnut-title">
                                            {{ this_search.properties.gbp_issues.grade.value }}
                                        </div>
                                            <apexchart type="donut" :options="gbpDoughnut.chartOptions" :series="gbpDoughnut.series" width="200"></apexchart>
                                        </div>
                                    </div>

                                    <div class="lr-seo-box-right pt-4">
                                        <div class="" style="font-size: 20px; font-weight: bold;">
                                            {{ this_search.properties.gbp_issues.grade.title }}
                                        </div>

                                        <div style="color: #757B89; font-size: 12px;">
                                            {{ this_search.properties.gbp_issues.grade.description }}
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                </div>

                                <div class="w-full lg:w-1/2" :style="'position: relative; ' + (($vuetify.breakpoint.xs) ? '' : 'border-left: solid 1px rgba(0, 0, 0, 0.1); padding-left: 30px;') + ' '">
                                    <div class="float-right pr-2">
                                        <span v-if="this_search.properties.gbp_issues.grade.value == 'A+'"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                        <span v-if="this_search.properties.gbp_issues.grade.value != 'A+'"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                    </div>
                                    
                                    <div v-if="this_search.properties.gbp_issues.items" style="">
                                        <div v-for="(item, index) in this_search.properties.gbp_issues.items" :key="index" style="padding-top: 15px;">
                                            <span v-if="item.passed === true"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i>  {{ item.title }}</span>
                                            <span v-if="item.passed === false"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>  {{ item.title }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </div>

                    <div v-if="this_search.properties.gbp_issues.items" style="">
                        <div v-for="(item, index) in this_search.properties.gbp_issues.items" :key="index">
                            <div v-if="this_search.properties.summary.grade" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                <v-card
                                    class="pa-2 pt-2 pb-6"
                                    tile
                                >
                                    <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                        <div class="float-right pr-2">
                                            <div v-if="item.title === 'NAP Comparisons' && (this_search.properties.competitors.status === 'pending' || this_search.properties.competitors.status === 'fetch_report_details')">
                                                <i class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i> Pending
                                            </div>
                                            <div v-else>
                                                <span v-if="item.passed === true"><i class="mdi mdi-check-circle-outline" style="color: #54AC0E; font-size: 18px;"></i> Passed</span>
                                                <span v-if="item.passed === false || this_search.properties.competitors.status === 'Error Occured'"><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i> Failed</span>
                                            </div>
                                        </div>

                                        <div style="padding: 10px;">
                                            <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                            <div v-if="item.sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                {{ item.sub_title }}
                                            </div>

                                            <div v-if="item.sub_sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                {{ item.sub_sub_title }}
                                            </div>

                                            <div v-if="item.title != 'NAP Comparisons' || (item.title == 'NAP Comparisons' && this_search.properties.competitors.status == 'completed')" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                {{ item.description }}
                                            </div>

                                            <div v-if="item.title == 'NAP Comparisons'">
                                                <div v-if="this_search.properties.competitors.status == 'completed'">
                                                    <div v-if="this_search.properties.business.citations_report && this_search.properties.business.citations_report.active !== undefined">
                                                        <div v-if="!this_search.properties.business.citations_detailed">
                                                            <table class="w-full rg-datatable mt-5">
                                                                <thead class="border-b border-gray-100 w-full">
                                                                <tr>
                                                                    <th>Source</th>
                                                                    <th>Need to fix</th>
                                                                    <th>&nbsp;</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody class="w-full" style="">
                                                                    <tr v-for="(item_citation, index_citation) in this_search.properties.business.citations_report.active" :key="index_citation">
                                                                        <td v-if="item_citation.need_to_fix.length > 0" class="">
                                                                            <a :href="'https://' + item_citation.source" target="lr-missing-citation">{{ item_citation.source }}</a>
                                                                        </td>
                                                                        <td v-if="item_citation.need_to_fix.length > 0" class="">
                                                                            {{ item_citation.need_to_fix.join(", ") }}

                                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M13.5201 13.6288H4.47896C3.70853 13.6304 2.99547 13.2215 2.60783 12.5556C2.22011 11.8898 2.21648 11.0678 2.59819 10.3985L7.22676 1.87117V1.87127C7.47777 1.42469 7.87926 1.08187 8.3597 0.903975C8.84005 0.726083 9.36809 0.724676 9.84933 0.900057C10.3307 1.07544 10.734 1.41614 10.9873 1.86144L15.4071 10.4125V10.4126C15.7823 11.0818 15.7743 11.9 15.3861 12.5618C14.9977 13.2237 14.2875 13.6299 13.5202 13.6289L13.5201 13.6288ZM9.11164 1.80022C8.91115 1.79872 8.71397 1.85085 8.5405 1.95129C8.36703 2.05184 8.2237 2.19689 8.12527 2.37157L3.4967 10.8938V10.903C3.2961 11.2537 3.29711 11.6846 3.49951 12.0343C3.70191 12.3839 4.07497 12.5995 4.47897 12.6002H13.5201C13.9245 12.6004 14.2985 12.3851 14.5015 12.0354C14.7045 11.6855 14.7058 11.2541 14.505 10.903L10.0852 2.35252C9.98617 2.18277 9.84384 2.04215 9.67288 1.94521C9.50192 1.84818 9.30826 1.79815 9.1117 1.80017L9.11164 1.80022Z" fill="#F03737"/>
                                                                                <path d="M9.77137 10.5429C9.77137 10.969 9.42603 11.3143 8.99994 11.3143C8.57386 11.3143 8.22852 10.969 8.22852 10.5429C8.22852 10.1168 8.57386 9.77148 8.99994 9.77148C9.42603 9.77148 9.77137 10.1168 9.77137 10.5429Z" fill="#F03737"/>
                                                                                <path d="M9.22832 9.02831C9.22028 9.14875 9.12024 9.24236 8.9995 9.24236C8.87877 9.24236 8.77872 9.14875 8.77069 9.02831L8.14017 5.24111H8.14007C8.08583 4.97492 8.14911 4.6982 8.31375 4.48213C8.47838 4.26597 8.72839 4.13156 8.99949 4.11328C9.2706 4.13156 9.52062 4.26596 9.68524 4.48213C9.84987 4.69819 9.91316 4.97492 9.85891 5.24111L9.22832 9.02831Z" fill="#F03737"/>
                                                                            </svg>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div v-else>
                                                            <table class="w-full rg-datatable mt-5">
                                                                <thead class="border-b border-gray-100 w-full">
                                                                <tr>
                                                                    <th>Site/Directory</th>
                                                                    <th style="width: 250px;">Name</th>
                                                                    <th>Address</th>
                                                                    <th>Zip/Post</th>
                                                                    <th>Phone</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody class="w-full" style="">
                                                                    <tr>
                                                                        <td>Google <br />(what we are looking for)</td>
                                                                        <td><a :href="'https://www.google.com/search?q=' + encodeURIComponent(search.properties.business.name) + ' ' + search.properties.business.formatted_address" target='citation-item.url'>{{ search.properties.business.name }}</a></td>
                                                                        <td>{{ search.properties.business.formatted_address }}</td>
                                                                        <td>{{ address_object.zip }}</td>
                                                                        <td>{{ search.properties.business.international_phone_number }}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                <tr v-for="(item, index) in search.properties.business.citations_report.active" :key="index">
                                                                    <td class="">
                                                                        {{ item.source }}
                                                                    </td>
                                                                    <td class="">
                                                                        <a :href="item.url" target='citation-item.url' :style="((item.need_to_fix.includes('name')) ? 'color: #ff3d54 !important;' : '')">{{ item['business-name'] }}</a>
                                                                    </td>
                                                                    <td class="">
                                                                        <span v-if="item.profile_details" :style="((item.need_to_fix.includes('address')) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['address'] }}</span>
                                                                    </td>
                                                                    <td class="">
                                                                        <span v-if="item.profile_details" :style="((item.need_to_fix.includes('postcode')) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['postcode'] }}</span>
                                                                    </td>
                                                                    <td class="">
                                                                        <span v-if="item.profile_details" :style="((item.need_to_fix.includes('phone')) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['contact_telephone'] }}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div v-if="!item.profile_details" :style="'display: inline-block;'">
                                                                            <v-tooltip top color="primary">
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <i class="mdi mdi-alert" style="font-size: 16px;"
                                                                                v-bind="attrs"
                                                                                v-on="on"
                                                                                ></i>
                                                                            </template>
                                                                            <span>There might be NAP issues, but we could not find your profile info.</span>
                                                                            </v-tooltip>
                                                                        </div>

                                                                        <div v-if="item.profile_details && item.need_to_fix.length > 0" :style="'display: inline-block;'">
                                                                            <v-tooltip top color="primary">
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <i class="mdi mdi-alert" style="font-size: 16px; color: #ff3d54;"
                                                                                v-bind="attrs"
                                                                                v-on="on"
                                                                                ></i>
                                                                            </template>
                                                                            <span>NAP issues were found. The following details need to be corrected: {{ item.need_to_fix.join(', ') }} </span>
                                                                            </v-tooltip>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div v-else style="padding-top: 10px; color: rgb(117, 123, 137); font-size: 12px; font-weight: bold;">Unable to process Citation details. Please delete this report and rerun GBP audit to refetch citations.</div>
                                                </div>
                                                <div v-else>
                                                    <br />
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>
                                            </div>

                                            <div v-if="item.title == 'Local Ranking Factors'">
                                                <table class="w-full rg-datatable mt-5">
                                                    <thead class="border-b border-gray-100 w-full">
                                                    <tr>
                                                        <th>Local Search Factor</th>
                                                        <th>Yes / No</th>
                                                        <th>What we looked for</th>
                                                        <th>&nbsp;</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody class="w-full" style="">
                                                    <tr v-for="(ranking_factor, index4) in item.ranking_factors" :key="index4">
                                                        <td class="">
                                                            {{ ranking_factor.title }}
                                                        </td>
                                                        <td class="">
                                                            {{ ranking_factor.value }}
                                                        </td>
                                                        <td class="">
                                                            {{ ranking_factor.what_we_looked_for }}
                                                        </td>
                                                        <td class="">
                                                            <span v-if="ranking_factor.type == 'local_number'">
                                                                {{ ranking_factor.description }}
                                                            </span>

                                                            <span v-if="this_search.properties.business.website && ranking_factor.type == 'city_title_tag' || ranking_factor.type == 'state_title_tag' || ranking_factor.type == 'name_in_website' || ranking_factor.type == 'address_in_website' || ranking_factor.type == 'zip_in_website' || ranking_factor.type == 'phone_in_website' || ranking_factor.type == 'primary_category_title_tag'">
                                                                <a :href="this_search.properties.business.website" target="gbp-issues-website">View Landing Page</a>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    <div style="clear: both;"></div>  

                                    </div>
                                </v-card>
                            </div>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div v-else class="pt-3">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> We are still gathering some information in order to check if you have any GBP issues.</div>

                    <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                </div>
            </div>
        </div>

        <div v-show="gmb_tab == 6 || $vuetify.breakpoint.xs || this.$route.query.download">
            <div :class="'' + (($vuetify.breakpoint.xs) ? '' : 'px-3')">
                <div class="text-bold" v-if="this_search.properties.gbp_issues.grade">
                    <div v-if="this_search.properties.recommendations.items" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                            <v-card
                                class="pa-2 pt-6 pb-6"
                                tile

                                :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'pl-3' : '')"
                            >
                                <div v-for="(item_recommendation, index5) in this_search.properties.recommendations.items" :key="index5" style="display: inline-block; padding-right: 15px;">
                                    <span><i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 15px;"></i>  {{ item_recommendation.title }}</span>
                                </div>
                        </v-card>
                    </div>

                    <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-2/3" style="position: relative;">
                            <div v-if="this_search.properties.recommendations.items" style="">
                                <div v-for="(item, index) in this_search.properties.recommendations.items" :key="index">
                                    <div v-if="this_search.properties.summary.grade" class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                                        <v-card
                                            class="pa-2 pt-2 pb-6"
                                            tile
                                        >
                                            <div style="/*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                                                <div class="float-left pr-2" style="width: 25px;">
                                                    <i class="mdi mdi-alert-circle-outline" style="color: red; font-size: 18px;"></i>
                                                </div>

                                                <div class="float-left" style="width: calc(100% - 25px);">
                                                    <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                                    <div v-if="item.sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_title }}
                                                    </div>

                                                    <div v-if="item.sub_sub_title" style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        {{ item.sub_sub_title }}
                                                    </div>

                                                    <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                                        <strong>{{ item.description }}</strong>
                                                    </div>
                                                </div>

                                            <div style="clear: both;"></div>  

                                            </div>
                                        </v-card>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>

                        <div class="w-full lg:w-1/3 p-3" style="position: relative;">
                            <img src="https://regro-cdn.s3.amazonaws.com/images/iphone_bg.png" style="position: absolute; width: 90%;" />
                            <img v-if="this_search.properties.mobile_screenshot" :src="this_search.properties.mobile_screenshot" style="position: relative; margin-top: 50px; width: 86%; border-radius: 10px; margin-left: 22px;" />

                            <br /><br />
                        </div>
                    </div>
                </div>
                <div v-else class="pt-3">
                    <div :class="(($vuetify.breakpoint.xs || this.$route.query.download) ? 'px-3' : 'pl-3') + ' mb-3'" style="font-size: 12px; color: #273042;"><i class="fa fa-spin fa-spinner"></i> Your report has recommendations for you, but we need to fetch more data in order to create a full list of recommendation.</div>

                    <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
            <v-card
                    class="pa-2 pt-6 pb-6"
                    tile

                    :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                >
                    <div class="flex flex-row flex-wrap">
                        <div class="w-full" style="position: relative;">

                            <div class="lr-seo-box-right pt-3">
                                <div class="" style="font-size: 20px; font-weight: bold;">
                                    {{ this_search.properties.gmb_overall_status }}
                                </div>
                                <div class="mt-4" style="font-size: 20px; font-weight: bold;">
                                    {{ this_search.properties.report_error_message }}
                                </div>
                            </div>

                            <div class="clearfix"></div>
                        </div>
                    </div>
            </v-card>
        </div>
        <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
            <v-card
                    class="pa-2 pt-6 pb-6"
                    tile

                    :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                >
                <div style = "display: flex; justify-content: center;">
                    <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="reRunReport()"><i class="fa fa-plus mr-2"> </i> RE-RUN REPORT</div>
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
  
  export default {
    props: ['search', 'ignore_header'],

    components: {
        ApexCharts,
    },

    data () {
        return {
            faq_keywords: "",
            reviews_html: "",
            negative_reviews_html: "",
        
            sentiment_data: [],

            this_search: null,

            gmb_tab: parseInt(localStorage.getItem('gmb_tab')) || 0,

            searchId: localStorage.getItem('gmb_search_id'),

            google_review_enabled:null,

            google_local_guide:null,
            loaded: false,

            show_grid: false,

            seo_audit_grades: {
                "A+": 100,
                "A": 85,
                "A-": 70,
                "B+": 69,
                "B": 65,
                "B-": 60,
                "C+": 59,
                "C": 55,
                "C-": 50,
                "D+": 49,
                "D": 45,
                "D-": 40,
                "E+": 39,
                "E": 35,
                "E-": 30,
                "F+": 29,
                "F": 20,
                "F-": 10
            },

            shortSummaryDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#3EBB80', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            summaryDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#2477F6', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            gbpDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#FFB443', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            reviewsDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#3EBB80', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            reviews_options: {
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
                }
            },
            reviews_series: [],

            reviews_chart_key: 0,

            postsDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#3EBB80', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            posts_options: {
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
                }
            },
            posts_series: [],

            posts_chart_key: 0,

            reviews_html: "",

            topics: [],

            stop_words: ["&","able","about","above","abroad","according","accordingly","across","actually","adj","after","afterwards","again","against","ago","ahead","ain't","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","a's","aside","ask","asking","associated","at","available","away","awfully","back","backward","backwards","be","became","because","become","becomes","becoming","been","before","beforehand","begin","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","came","can","cannot","cant","can't","caption","cause","causes","certain","certainly","changes","clearly","c'mon","co","co.","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","c's","currently","dare","daren't","definitely","described","despite","did","didn't","different","directly","do","does","doesn't","doing","done","don't","down","downwards","during","each","edu","eg","eight","eighty","either","else","elsewhere","end","ending","enough","entirely","especially","et","etc","even","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","fairly","far","farther","few","fewer","fifth","first","five","followed","following","follows","for","forever","former","formerly","forth","forward","found","four","from","further","furthermore","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","had","hadn't","half","happens","hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello","help","hence","her","here","hereafter","hereby","herein","here's","hereupon","hers","herself","he's","hi","him","himself","his","hither","hopefully","how","howbeit","however","hundred","i'd","ie","if","ignored","i'll","i'm","immediate","in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner","inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll","its","it's","itself","i've","just","k","keep","keeps","kept","know","known","knows","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","likewise","little","look","looking","looks","low","lower","ltd","made","mainly","make","makes","many","may","maybe","mayn't","me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus","miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my","myself","name","namely","nd","near","nearly","necessary","need","needn't","needs","neither","never","neverf","neverless","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","no-one","nor","normally","not","nothing","notwithstanding","novel","now","nowhere","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","one's","only","onto","opposite","or","other","others","otherwise","ought","oughtn't","our","ours","ourselves","out","outside","over","overall","own","particular","particularly","past","per","perhaps","placed","please","plus","possible","presumably","probably","provided","provides","que","quite","qv","rather","rd","re","really","reasonably","recent","recently","regarding","regardless","regards","relatively","respectively","right","round","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","since","six","so","some","somebody","someday","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that's","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","there'd","therefore","therein","there'll","there're","theres","there's","thereupon","there've","these","they","they'd","they'll","they're","they've","thing","things","think","third","thirty","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","till","to","together","too","took","toward","towards","tried","tries","truly","try","trying","t's","twice","two","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","upwards","us","use","used","useful","uses","using","usually","v","value","various","versus","very","via","viz","vs","want","wants","was","wasn't","way","we","we'd","welcome","well","we'll","went","were","we're","weren't","we've","what","whatever","what'll","what's","what've","when","whence","whenever","where","whereafter","whereas","whereby","wherein","where's","whereupon","wherever","whether","which","whichever","while","whilst","whither","who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why","will","willing","wish","with","within","without","wonder","won't","would","wouldn't","yes","yet","you","you'd","you'll","your","you're","yours","yourself","yourselves","you've","zero","a","how's","i","when's","why's","b","c","d","e","f","g","h","j","l","m","n","o","p","q","r","s","t","u","uucp","w","x","y","z","I","www","amount","bill","bottom","call","computer","con","couldnt","cry","de","describe","detail","due","eleven","empty","fifteen","fifty","fill","find","fire","forty","front","full","give","hasnt","herse","himse","interest","itse”","mill","move","myse”","part","put","show","side","sincere","sixty","system","ten","thick","thin","top","twelve","twenty","abst","accordance","act","added","adopted","affected","affecting","affects","ah","announce","anymore","apparently","approximately","aren","arent","arise","auth","beginning","beginnings","begins","biol","briefly","ca","date","ed","effect","et-al","ff","fix","gave","giving","heres","hes","hid","home","id","im","immediately","importance","important","index","information","invention","itd","keys","kg","km","largely","lets","line","'ll","means","mg","million","ml","mug","na","nay","necessarily","nos","noted","obtain","obtained","omitted","ord","owing","page","pages","poorly","possibly","potentially","pp","predominantly","present","previously","primarily","promptly","proud","quickly","ran","readily","ref","refs","related","research","resulted","resulting","results","run","sec","section","shed","shes","showed","shown","showns","shows","significant","significantly","similar","similarly","slightly","somethan","specifically","state","states","stop","strongly","substantially","successfully","sufficiently","suggest","thered","thereof","therere","thereto","theyd","theyre","thou","thoughh","thousand","throug","til","tip","ts","ups","usefully","usefulness","'ve","vol","vols","wed","whats","wheres","whim","whod","whos","widely","words","world","youd","youre"],

            address_object: {},
            missing_categories: [],
            potential_products: [],
            tabClickedFlag: false
        }
    },
    methods: {
        handleTabClick(tabIndex) {
            this.show_grid = true; // Activate show_grid
            this.tabClickedFlag = true; 
            this.tabClicked(tabIndex); // Call tabClicked method
        },
        reviewAnalysis(tabIndex) {
            this.fetchUserSettings();
            this.tabClicked(tabIndex); // Call tabClicked method
        },
        isOnScreen(element)
        {
            var curPos = element.offset();
            var curTop = curPos.top;
            var screenHeight = $(window).height();
            return (curTop > screenHeight) ? false : true;
        },
        handleIntersection() {
            console.log('visible')
            var ifarmaWin = document.querySelector('.ifarmaWin');

            if(window.innerWidth < 700){
                // if (ifarmaWin && this.isOnScreen($('.ifarmaWin')) ) {
                //     this.loaded = true;
                // } else {
                //     this.loaded = false;
                // }
                this.runCreated()
                
            }else{
                this.loaded = true;
            }
        },
        observeIframewin() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The target element (div with class iframewin) is visible in the viewport
                this.handleIntersection();
            }
            });
        });

        observer.observe(this.$refs.iframewin);
        },
       async fetchUserSettings(){
        
            let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/fetch-gbp?rss=${this.search.user_id}`, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })
        
          if(response.status == 200){
            this.google_review_enabled = response.data.google_review_enabled;
            this.google_local_guide = response.data.google_local_guide;
          }
        },
        tabClicked(index) {
            // Update the current tab index and store it in local storage
            this.gmb_tab = index;
            localStorage.setItem('gmb_tab', index.toString());
            localStorage.setItem('gmb_search_id', this.search.id);
        },
        getValidType(types) {
            for (let i = 0; i < types.length; i++) {
                // Remove HTML tags and extra characters
                const cleanType = types[i].replace(/(<([^>]+)>)/gi, '').replace(/[^a-zA-Z_]/g, '');
                if (cleanType.trim() !== '') {
                    return this.ucwords2(cleanType.replace(/\_/g, ' '));
                }
            }
            return '';
        },
        ucwords2(str) {
            // Function to capitalize the first letter of each word
            return str.toLowerCase().replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
        },
        ucwords (str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        },
        
        unEntity(str){
            return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        },

        displayCompetitorName(name) {
            return this.unEntity(name);
        },
        isOlderThanSixMinutes(createdAt) {
            // Convert `createdAt` to a Date object
            const createdDate = new Date(createdAt);
            // Get the current time
            const now = new Date();
            
            const difference = now - createdDate;
            
            return difference > 5 * 60 * 1000;
        },
        async runCreated() {
            let self = this

            if (!self.this_search.properties.success) {
                this.show_grid = true;
            }

            if (this.this_search.properties.grid.status != 'completed') {
                let logo = "https://reviewgrower.com/wp-content/uploads/2021/09/reviewgrower-blue-green-middle-e1652210601332.png";

                window.RG_GRID_CONFIG = {
                    API_URL: process.env.VUE_APP_API_ENDPOINT,
                    USER: {
                        uuid: this.this_search.uuid
                    },
                    LOGO: logo,
                    COMPANY_NAME: this.this_search.company_name,
                    GOOGLE_MAPS_KEY: this.this_search.api_key,
                    VALUE_SERP_KEY: "",
                    SAB_ENABLED: 0
                }

                window.RG_GRID_ACTION = {
                    ACTION: "scan_lr_gmb",
                    g: btoa(unescape(encodeURIComponent(JSON.stringify(self.this_search.properties.business)))),
                    q: self.this_search.properties.business.types[0]
                }

                window.saveGridReportId = function(scanId) {
                    let response = axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-report-grid-id', {
                        report_id: self.this_search.id,
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
                        uuid: this.this_search.uuid
                    },
                    LOGO: logo,
                    COMPANY_NAME: this.this_search.company_name,
                    GOOGLE_MAPS_KEY: this.this_search.api_key,
                    VALUE_SERP_KEY: "",
                    SAB_ENABLED: 0
                }

                window.RG_GRID_ACTION = {
                    ACTION: "view",
                    SCAN_ID: self.this_search.properties.grid.grid_id
                }
            }
            var ifarmaWin = document.querySelector('.ifarmaWin');

            if(window.innerWidth < 700){
                if (ifarmaWin && this.isOnScreen($('.ifarmaWin')) ) {
                    if(!this.loaded){
                        this.loaded = true;
                    }
                    
                } else {
                    this.loaded = false;
                }
                
            }else{
                this.loaded = true;
            }
            

            if (!this.tabClickedFlag && this.this_search.properties.competitors.status == 'pending' && this.this_search.properties.reviews.status == 'pending' && this.ignore_header) {
                setTimeout(function() {
                  let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + self.$route.query.s + '&p=' + self.this_search.place_id + '&si=' + self.this_search.id + '&loads=' + this.loads;
          
                  axios.get(url, {

                  }).then(function(response) {
                    self.this_search = response.data.search;
                    if (!self.this_search.properties.success)
                      self.runCreated();
                  });
                }, 1000);
            }
            else {
                // if (this.this_search.properties.business.types[0] === null)
                //     if (this.this_search.properties.types[1])
                //         this.this_search.properties.types[0] = this.this_search.properties.types[1];
                //     else
                //         this.this_search.properties.types[0] = "";

                if (this.this_search.properties.short_summary.grade) {
                    this.shortSummaryDoughnut.series = [this.seo_audit_grades[this.this_search.properties.short_summary.grade.value], (100 - this.seo_audit_grades[this.this_search.properties.short_summary.grade.value])];
                }

                if (this.this_search.properties.summary.grade) {
                    this.summaryDoughnut.series = [this.seo_audit_grades[this.this_search.properties.summary.grade.value], (100 - this.seo_audit_grades[this.this_search.properties.summary.grade.value])];
                }

                if (this.this_search.properties.gbp_issues.grade) {
                    this.gbpDoughnut.series = [this.seo_audit_grades[this.this_search.properties.gbp_issues.grade.value], (100 - this.seo_audit_grades[this.this_search.properties.gbp_issues.grade.value])];
                }

                setTimeout(function() {
                    if (self.this_search.properties.reviews.grade) {
                        self.reviewsDoughnut.series = [self.seo_audit_grades[self.this_search.properties.reviews.grade.value], (100 - self.seo_audit_grades[self.this_search.properties.reviews.grade.value])];

                        self.reviews_options.xaxis.categories = self.this_search.properties.reviews.chart_data.labels;
                        self.reviews_series = [];

                        if (self.$vuetify.breakpoint.xs) {
                            self.reviews_options.xaxis.labels.show = false;
                        }

                        // console.log('self.this_search.properties.reviews.chart_data', self.this_search.properties.reviews.chart_data);

                        for (var dataset_i in self.this_search.properties.reviews.chart_data.datasets) {

                            for (var j in self.this_search.properties.reviews.chart_data.datasets[dataset_i]) {
                                self.this_search.properties.reviews.chart_data.datasets[dataset_i][j] = parseFloat(self.this_search.properties.reviews.chart_data.datasets[dataset_i][j]);
                            }

                            self.reviews_series.push({
                                name: dataset_i,
                                data: self.this_search.properties.reviews.chart_data.datasets[dataset_i]
                            });
                        }

                        self.reviews_chart_key++;
                    }
                }, 100);

                setTimeout(function() {
                    if (self.this_search.properties.posts.grade) {
                        self.postsDoughnut.series = [self.seo_audit_grades[self.this_search.properties.posts.grade.value], (100 - self.seo_audit_grades[self.this_search.properties.posts.grade.value])];

                        self.posts_options.xaxis.categories = self.this_search.properties.posts.chart_data.labels;
                        self.posts_series = [];

                        if (self.$vuetify.breakpoint.xs) {
                            self.posts_options.xaxis.labels.show = false;
                        }

                        // console.log('self.this_search.properties.posts.chart_data', self.this_search.properties.posts.chart_data);

                        for (var dataset_i in self.this_search.properties.posts.chart_data.datasets) {

                            for (var j in self.this_search.properties.posts.chart_data.datasets[dataset_i]) {
                                self.this_search.properties.posts.chart_data.datasets[dataset_i][j] = parseFloat(self.this_search.properties.posts.chart_data.datasets[dataset_i][j]);
                            }

                            self.posts_series.push({
                                name: dataset_i,
                                data: self.this_search.properties.posts.chart_data.datasets[dataset_i]
                            });
                        }

                        self.posts_chart_key++;
                    }
                }, 100);

                let reviews_html = "";

                if (this.this_search.properties.business.reviews.length == 0) {
                    reviews_html = '<div class="pt-2">No reviews found.</div>';
                }
                else {
                    for (var i in this.this_search.properties.business.reviews) {
                        let stars_html = '';
            
                        // console.log('review details', this.this_search.properties.business.reviews[i])
            
                        for (var j = 0; j < 5; j++) {
                            if (j + 1 <= this.this_search.properties.business.reviews[i].rating)
                                stars_html += '<i class="mdi mdi-star" style="color: #FFB443; font-size: 14px; margin-left: 2px;"></i>';
                            else
                                stars_html += '<i class="mdi mdi-star-outline" style="font-size: 14px; margin-left: 2px;"></i>';
                        }
            
                        if (this.this_search.properties.business.reviews[i].text && this.this_search.properties.business.reviews[i].text.length > 180)
                            this.this_search.properties.business.reviews[i].text = this.this_search.properties.business.reviews[i].text.substring(0, 180) + '...';

                            // console.log('this.this_search.properties.business.reviews[i].relative_time_description', this.this_search.properties.business.reviews[i].relative_time_description)
            
                        let this_html = '<div style="padding-bottom: 10px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); margin-bottom: 10px;">\
                            <div style=""><strong>' + this.this_search.properties.business.reviews[i].author_name + '</strong> <em style="font-size: 11px;">' + this.this_search.properties.business.reviews[i].relative_time_description + '</em></div>\
                            <div style="float: right; margin-top: -25px;">\
                                <img src="https://regro-cdn.s3.amazonaws.com/images/review-services/www.google.com.png" style="height: 40px;" />\
                            </div>\
                            <div style="padding-top: 5px;">\
                            <strong>' + this.this_search.properties.business.reviews[i].rating + '</strong> ' + stars_html + '\
                            </div>\
                            <div style="font-size: 12px; line-height: 20px; padding-top: 5px; color: #757B89;">\
                                ' + this.this_search.properties.business.reviews[i].text + '\
                            </div>\
                        </div>';
            
                        reviews_html += this_html;
                    }
                }

                this.reviews_html = reviews_html;

                this.topics = [];

                let all_reviews_text = "";

                for (var i in this.this_search.properties.reviews.list) {
                    all_reviews_text += this.this_search.properties.reviews.list[i].review || this.this_search.properties.reviews.list[i].snippet;
                }

                all_reviews_text = this.replaceWhatFunction(all_reviews_text, ".", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, ",", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, "!", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, "?", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, "-", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, ";", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, ":", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, "'", " ");
                all_reviews_text = this.replaceWhatFunction(all_reviews_text, '"', " ");

                all_reviews_text = ' ' + all_reviews_text + ' ';

                for (var i in this.stop_words) {
                    all_reviews_text = this.replaceWhatFunction(all_reviews_text, ' ' + this.stop_words[i] + ' ', ' ');
                }

                let trigrams = this.trigrams(all_reviews_text);

                // console.log('trigrams', trigrams);

                for (var i in trigrams) {
                    if (trigrams[i] != "undefined")
                        this.topics.push(trigrams[i]);
                }

                let bigrams = this.bigrams(all_reviews_text);

                for (var i in bigrams) {
                    if (bigrams[i] != "undefined")
                        this.topics.push(bigrams[i]);
                }

                let nthMostComm = this. nthMostCommon(all_reviews_text, 30 - trigrams.length - bigrams.length);

                for (var i in nthMostComm) {
                    if (nthMostComm[i].word != "undefined")
                        this.topics.push(nthMostComm[i].word);
                }

                this.address_object = this.getAddressObject(this.this_search.properties.business.address_components);

                this.missing_categories = this.getMissingCategories();
                this.potential_products = this.getPotentialProducts();
            }
        },

        getMissingCategories() {
            let missing_categories = [];

            for (var i in this.this_search.properties.competitors.list) {
                for (var j in this.this_search.properties.competitors.list[i].types) {
                    if (!this.this_search.properties.business.types.includes(this.this_search.properties.competitors.list[i].types[j]) && 
                        !this.this_search.properties.business.categories.includes(this.this_search.properties.competitors.list[i].types[j]))
                        missing_categories.push(this.this_search.properties.competitors.list[i].types[j]);
                }
            }

            return missing_categories;
        },

        getPotentialProducts() {
            let potential_products = [];

            for (var i in this.this_search.properties.competitors.list) {
                for (var j in this.this_search.properties.competitors.list[i].products) {
                    if (!this.this_search.properties.business.products.includes(this.this_search.properties.competitors.list[i].products[j]))
                        potential_products.push(this.unEntity(this.this_search.properties.competitors.list[i].products[j]));
                }
            }

            return potential_products;
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

        replaceWhatFunction(str,replaceWhat,replaceTo){
            replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp(replaceWhat, 'g');
            return str.replace(re,replaceTo);
        },

        trigrams(text) {
            text = text.trim();
            let grams = [];

            text = text.split(' ');

            let this_gram = [];
            let next_gram = [];
            let next_next_gram = [];
            
            let counter = 0;
            for (var i in text) {
                if (!text[i])
                    continue;

                if (counter%3 == 0) {
                    this_gram.push(text[i]);

                    if (next_gram.length > 0) {
                        next_gram.push(text[i]);
                        grams.push(next_gram);
                        next_gram = [];
                    }

                    if (next_next_gram.length > 0) {
                        next_next_gram.push(text[i]);
                    }
                }

                if (counter%3 == 1) {
                    this_gram.push(text[i]);

                    next_gram.push(text[i]);

                    if (next_next_gram.length > 0) {
                        next_next_gram.push(text[i]);
                        grams.push(next_next_gram);
                        next_next_gram = [];
                    }
                }

                if (counter%3 == 2) {
                    this_gram.push(text[i]);
                    grams.push(this_gram);
                    this_gram = [];

                    next_gram.push(text[i]);
                    next_next_gram.push(text[i]);
                }

                counter++;
            }

            let grams_occurrences = {};

            for (var i in grams) {
                if (grams[i].length == 3)
                    if (!grams_occurrences[grams[i].join(" ")])
                        grams_occurrences[grams[i].join(" ")] = 1;
                    else
                        grams_occurrences[grams[i].join(" ")]++;
            }

            let grams_occurrences_good = [];

            for (var i in grams_occurrences) {
                if (grams_occurrences[i] > 10 && grams_occurrences_good.length < 10) {
                    grams_occurrences_good.push(i.toLowerCase().trim());
                }
            }

            return grams_occurrences_good;
        },

        bigrams(text) {
            text = text.trim();
            let grams = [];

            text = text.split(' ');

            let this_gram = [];
            let next_gram = [];

            let counter = 0;
            for (var i in text) {
                if (!text[i])
                    continue;

                if (counter%2 == 0) {
                    this_gram.push(text[i].trim());

                    if (next_gram.length > 0) {
                        next_gram.push(text[i].trim());
                        grams.push(next_gram);
                        next_gram = [];
                    }
                }

                if (counter%2 == 1) {
                    this_gram.push(text[i].trim());
                    grams.push(this_gram);
                    this_gram = [];

                    next_gram.push(text[i].trim());
                }

                counter++;
            }

            let grams_occurrences = {};

            for (var i in grams) {
                if (grams[i].length  == 2)
                    if (!grams_occurrences[grams[i].join(" ")])
                        grams_occurrences[grams[i].join(" ")] = 1;
                    else
                        grams_occurrences[grams[i].join(" ")]++;
            }

            let grams_occurrences_good = [];

            for (var i in grams_occurrences) {
                if (grams_occurrences[i] > 10 && grams_occurrences_good.length < 10) {
                    grams_occurrences_good.push(i.toLowerCase().trim().replace("  ", " "));
                }
            }

            return grams_occurrences_good;
        },

        nthMostCommon(string, amount) {
            string = string.replace(/\./g, ' ');
    
            var wordsArray = string.split(/\s/);
    
            let exclusion_list = ['the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us'];
    
            for (var i in wordsArray) {
                if (wordsArray[i].length < 4 || exclusion_list.indexOf(wordsArray[i].toLowerCase()) != -1)
                    delete wordsArray[i]
            }
    
            var wordOccurrences = {}
            for (var i = 0; i < wordsArray.length; i++) {
                wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
            }
            var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
                /* you may want to include a binary search here */
                for (var i = 0; i < amount; i++) {
                    if (!acc[i]) {
                        acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                        break;
                    } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                        acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                        if (acc.length > amount)
                            acc.pop();
                        break;
                    }
                }
                return acc;
            }, []);
    
            return result;
        },
        async reRunReport(){
            try{
                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/re-run', {
                        search_id: this.search.id,

                    } , {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                })

                if (response.status === 200) {
                    this.$swal({
                        title: "Success",
                        text: "Report re-run successfully.",
                        icon: "success",
                        showCancelButton: false,
                    }).then(() => {
                        // Reload the page or refresh data
                        window.location.reload();
                    });
                }

            } catch (error) {
                this.$swal({
                title: "Error",
                text: "Unable to re run the report.",
                showCancelButton: false,
                });
            }

        },

        async reRunSpecificReport(indi,id){
            try{
                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/re-specific-run', {
                        search_id: id,
                        type:indi

                    } , {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                })

                if (response.status === 200) {
                    this.$swal({
                        title: "Success",
                        text: "Report re-run successfully.",
                        icon: "success",
                        showCancelButton: false,
                    }).then(() => {
                        // Reload the page or refresh data
                        window.location.reload();
                    });
                }

            } catch (error) {
                this.$swal({
                title: "Error",
                text: "Unable to re run the report.",
                showCancelButton: false,
                });
            }

        }
    },
    created() {
        let self = this
        this.this_search = this.search;
        if(this.search.id != localStorage.getItem('gmb_search_id')){
            localStorage.setItem('gmb_tab', 0);
            localStorage.setItem('gmb_search_id', this.search.id);
        }
        this.fetchUserSettings()

        setTimeout(function() {
            self.runCreated();
        }, 2000);
    },
    mounted() {
        this.observeIframewin();
  },
    watch: {
        search (newVal) {
            this.runCreated();
        }
    },
    
  }
  </script>