<template>
    <div>
    <div class="dashboard-box stats-box w-full px-2 mb-5" v-if="!ignore_header">
            <v-card
            class="pa-2"
            tile
            >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                <div class="flex flex-row flex-wrap">
                <div class="w-full lg:w-2/3" style="position: relative;">
                    <strong class="mt-2 text-lg">{{ search.keyword }}</strong>

                    <div v-if="search.properties.business.website" class="website mt-1 text-sm"><a :href="search.properties.business.website" target="lr-website-link" style="color: #2477F6 !important;">{{ search.properties.business.website }}</a></div>

                    <div class="clearfix pt-4"></div>

                    <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Address</div>

                        {{ search.properties.business.formatted_address }}
                    </div>

                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Phone</div>

                        {{ search.properties.business.formatted_phone_number }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Primary Category</div>
                        {{ search.properties.business.custom_keyword ? ucwords(search.properties.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(search.properties.business.types[0].replace(/\_/g, ' '))  }}
                        
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Sub Category</div>

                        {{ ((search.properties.business.types[1]) ? ucwords(search.properties.business.types[1].replace(/\_/g, ' ')) : '-') }}
                    </div>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <div class="lr-seo-audit-photo w-full lg:w-1/3">
                    <div v-if="search.properties.business.photos">
                        <img :src="'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + search.properties.business.photos[0].photo_reference + '&maxheight=200&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs'" />
                    </div>
                </div>
                </div>

                <!-- <v-tabs v-if="!$vuetify.breakpoint.xs" class="-mb-6" v-model="gmb_tab">
                    <v-tab>Top Competitors</v-tab>
                    <v-tab>Summary</v-tab>
                    <v-tab @click="show_grid = true">Grid Search Results</v-tab>
                    <v-tab>Review Analysis</v-tab>
                    <v-tab>Post Analysis</v-tab>
                    <v-tab>GBP Issues</v-tab>
                    <v-tab>Rcommendations <span v-if="search.properties.recommendations.items">({{ search.properties.recommendations.items.length }})</span></v-tab>
                </v-tabs> -->
            </div>
            </v-card>
        </div>

        <div>
            
            <div v-if="this_search.properties.summary.grade">
                <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                        <v-card
                            class="pa-2 pt-6 pb-6"
                            tile

                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
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

                            <div class="w-full lg:w-1/2" :style="'position: relative; ' + (($vuetify.breakpoint.xs) ? '' : 'border-left: solid 1px rgba(0, 0, 0, 0.1); padding-left: 30px;') + ' '">
                                
                            	 <div class="flex flex-row flex-wrap pt-6">
                    				<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pr-3">
                    					<div style='font-weight: bold; padding-bottom: 10px;'>Business Name</div>

                    					<v-progress-linear height="15" color="green lighten-1" background-color="#ff9eaa" rounded :value="this_search.properties.summary.business_name.percentage"></v-progress-linear>
                    				</div>

                    				<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pr-3">
                    					<div style='font-weight: bold; padding-bottom: 10px;'>Address</div>

                    					<v-progress-linear height="15" color="green lighten-1" background-color="#ff9eaa" rounded :value="this_search.properties.summary.address.percentage"></v-progress-linear>
                    				</div>
                    			</div>
                                
                            	 <div class="flex flex-row flex-wrap pt-6">
                    				<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pr-3">
                    					<div style='font-weight: bold; padding-bottom: 10px;'>Zip / Post Code</div>

                    					<v-progress-linear height="15" color="green lighten-1" background-color="#ff9eaa" rounded :value="this_search.properties.summary.zip.percentage"></v-progress-linear>
                    				</div>

                    				<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pr-3">
                    					<div style='font-weight: bold; padding-bottom: 10px;'>Phone Number</div>

                    					<v-progress-linear height="15" color="green lighten-1" background-color="#ff9eaa" rounded :value="this_search.properties.summary.phone.percentage"></v-progress-linear>
                    				</div>
                    			</div>

                            </div>
                        </div>
                    </v-card>
                </div>

                <div class="flex flex-row flex-wrap">
                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Found</div>

                        <div class=""><strong class="text-xl">{{ this_search.properties.summary.found }}</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #398cfa;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-magnify" style="color: #398cfa;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Not Found</div>

                        <div class=""><strong class="text-xl">{{ this_search.properties.summary.not_found }}</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #46474a;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-magnify-minus" style="color: #46474a;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Correct</div>

                        <div class=""><strong class="text-xl">{{ this_search.properties.summary.correct }}</strong></div>
                        
                        <div class="stats-box-icon-bg"></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-check"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">With NAP Errors</div>

                        <div class=""><strong class="text-xl">{{ this_search.properties.summary.with_nap_errors }}</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #ff3d54;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-alert-circle" style="color: #ff3d54;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>
                </div>

                <div style="font-weight: bold; font-size: 16px; color: #273042; padding-left: 10px;">Citations List</div>

                <div class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                	<v-card
	                        class="pa-2"
	                        tile

	                        :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
	                    >
                		<v-tabs>
                			<v-tab>Found</v-tab>
                			<v-tab>Not Found</v-tab>
                		
                			<v-tab-item>
		                        <v-card
		                            class="pa-2"
		                            tile

		                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
		                        >
		                        
		                        	<div>
		                        		<table class="w-full rg-datatable mt-5">
		                                    <thead class="border-b border-gray-100 w-full">
		                                    <tr>
		                                        <th>Site/Directory</th>
		                                        <th>Name</th>
		                                        <th>Address</th>
		                                        <th>Zip/Post</th>
		                                        <th>Phone</th>
		                                        <th>Status</th>
		                                    </tr>
		                                    </thead>
		                                    <tbody class="w-full" style="">
		                                    <tr v-for="(item, index) in this_search.properties.citations.result.response.results.active" :key="index">
		                                        <td class="">
		                                            {{ item.source }}
		                                        </td>
		                                        <td class="">
		                                            <a :href="item.url" target='citation-item.url' :style="((!item.name_correct) ? 'color: #ff3d54 !important;' : '')">{{ item['business-name'] }}</a>
		                                        </td>
		                                        <td class="">
		                                            <span v-if="item.profile_details" :style="((!item.address_correct) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['address'] }}</span>
		                                        </td>
		                                        <td class="">
		                                            <span v-if="item.profile_details" :style="((!item.zip_correct) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['postcode'] }}</span>
		                                        </td>
		                                        <td class="">
		                                            <span v-if="item.profile_details" :style="((!item.phone_correct) ? 'color: #ff3d54 !important;' : '')">{{ item['profile_details']['contact_telephone'] }}</span>
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

                                                    <div v-if="item.profile_details && item.has_nap_errors" style="display: inline-block;">
                                                        
                                                        <v-tooltip top color="primary">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <i class="mdi mdi-alert" style="font-size: 16px; color: #ff3d54;" v-bind="attrs" v-on="on"></i>
                                                            </template>
                                                            <span>NAP Issue Found:  
                                                                <template>
                                                                    {{ 
                                                                        [
                                                                            item.need_to_fix.includes('name') ? (item['business-name']  ? 'Name Mismatch' : 'Name Missing') : null,
                                                                            item.need_to_fix.includes('address') ? (item['profile_details']['address'] ? 'Address Mismatch' : 'Address Missing') : null,
                                                                            item.need_to_fix.includes('postcode') ? (item['profile_details']['postcode'] ? 'Zip/Post Mismatch' : 'Zip/Post Missing') : null,
                                                                            item.need_to_fix.includes('phone') ? (item['profile_details']['contact_telephone'] ? 'Phone Mismatch' : 'Phone Missing') : null
                                                                        ].filter(Boolean).join(' & ') 
                                                                    }}
                                                                </template>
                                                            </span>
                                                        </v-tooltip>
                                                    </div>

		                                        </td>
		                                    </tr>
		                                    </tbody>
		                                </table>
		                        	</div>
		                    	</v-card>
		                    </v-tab-item>
                		
                			<v-tab-item>
		                        <v-card
		                            class="pa-2"
		                            tile

		                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
		                        >
		                        
		                        	<div>
		                        		<table class="w-full rg-datatable mt-5">
		                                    <thead class="border-b border-gray-100 w-full">
		                                    <tr>
		                                        <th>Site/Directory</th>
		                                        <th>Date Identified</th>
		                                        <th>Authority</th>
		                                        <th>Citation Value</th>
		                                        <th>Site Type</th>
		                                        <th>Free/Paid</th>
		                                        <th>Actions</th>
		                                    </tr>
		                                    </thead>
		                                    <tbody class="w-full" style="">
		                                    <tr v-for="(item, index) in this_search.properties.citations.result.response.results.possible" :key="index">
		                                        <td class="">
		                                            <a :href="'https://' + item.source" target='url-add-citation'>{{ item.source }}</a>
		                                        </td>
		                                        <td class="">
		                                            {{ item['date-identified'] }}
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
		                                        <td>
		                                        	<a :href="item['get-citation-url']" target='url-add-citation'>Add Citation</a>
		                                        </td>
		                                    </tr>
		                                    </tbody>
		                                </table>
		                        	</div>
		                    	</v-card>
		                    </v-tab-item>
		                </v-tabs>
		            </v-card>
                </div>
            </div>
            <div v-else-if="this_search.properties.citations.status === 'Error Occured'">

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
                                            {{ this_search.properties.citations.status }}
                                        </div>
                                        <div v-if="this_search.properties.report_error_message" class="mt-2" style="font-size: 14px; font-weight: 400;">
                                            {{ this_search.properties.report_error_message }}
                                        </div>
                                        <div style="color: #757B89; font-size: 12px;">
                                            <div style="font-weight: bold; padding-bottom: 10px;color:black" v-if="this_search.properties.citations.result.errors">
                                                <!-- Render specific error messages based on error keys -->
                                                <div style="font-weight: bold; padding-bottom: 10px;color:black" v-if="this_search.properties.citations.result.errors.city">Error: Unable to fetch city details.</div>
                                                <div style="font-weight: bold; padding-bottom: 10px;color:black" v-else-if="this_search.properties.citations.result.errors.country">Error: Unable to fetch country details.</div>
                                                <div style="font-weight: bold; padding-bottom: 10px;color:black" v-else-if="this_search.properties.citations.result.errors.zip">Error: Unable to fetch zip code details.</div>
                                                <div style="font-weight: bold; padding-bottom: 10px;color:black" v-else-if="this_search.properties.citations.result.errors.postal_code">Error: Unable to fetch postal code details.</div>
                                                <!-- If none of the specific errors are present, display general error message -->
                                                <div style="font-weight: bold; padding-bottom: 10px;color:black" v-else>Error: Unable to process the request</div>
                                            </div>
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
            <div v-else-if="this_search.properties.citations.status === 'fetch_report_details' && this_search.properties.citations.pre_complete">

                <div class="w-full mx-auto mt-10 mb-10" style="width: 97%;">
                    <!-- Progress Bar Container -->
                    <div 
                        class="relative w-full bg-white rounded-full h-6 overflow-hidden shadow-lg border-2"
                        v-if="this_search.properties.citations && this_search.properties.citations.pre_complete_progress !== undefined"
                        style="border-radius: 5px; border-color:white"
                    >
                        <!-- Progress Bar -->
                        <div
                            class="absolute top-0 left-0 h-full"
                            :style="{ width: this_search.properties.citations.pre_complete_progress + '%', backgroundColor: '#19233a', transition: 'width 0.6s ease', borderRadius: '5px' }"
                        ></div>
                        <!-- Percentage Display -->
                        <span
                            class="absolute inset-0 flex items-center justify-center font-bold"
                            :style="{ color: this_search.properties.citations.pre_complete_progress > 50 ? 'white' : 'black' }"
                        >
                            {{ this_search.properties.citations.pre_complete_progress }}%
                        </span>
                    </div>

                    <!-- Show this when pre_complete_progress does not exist -->
                    <div 
                        class="relative w-full bg-white rounded-full h-6 overflow-hidden shadow-lg border-2"
                        v-else
                        style="border-radius: 5px; border-color:white"
                    >
                        <!-- Progress Bar with 0% width -->
                        <div
                            class="absolute top-0 left-0 h-full"
                            :style="{ width: '0%', backgroundColor: '#19233a', transition: 'width 0.6s ease', borderRadius: '5px' }"
                        ></div>
                        <!-- Percentage Display -->
                        <span
                            class="absolute inset-0 flex items-center justify-center font-bold"
                            style="color: black;"
                        >
                            0%
                        </span>
                    </div>
                </div>

                <div class="flex flex-row flex-wrap">
                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Found</div>

                        <div class=""><strong class="text-xl">{{ (this_search.properties.citations.instantly_citations_count + this_search.properties.citations.lr_citations_count)}}</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #398cfa;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-magnify" style="color: #398cfa;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Not Found</div>

                        <div class=""><strong class="text-xl">{{ ((42 + this_search.properties.citations.lr_citations_count) - (this_search.properties.citations.instantly_citations_count + this_search.properties.citations.lr_citations_count)) }}</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #46474a;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-magnify-minus" style="color: #46474a;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">Correct</div>

                        <div class=""><strong class="text-xl">-</strong></div>
                        
                        <div class="stats-box-icon-bg"></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-check"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/4 lg:w-1/4 mb-5">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="dashboard-box-title">With NAP Errors</div>

                        <div class=""><strong class="text-xl">-</strong></div>
                        
                        <div class="stats-box-icon-bg" style='background: #ff3d54;'></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-alert-circle" style="color: #ff3d54;"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>
                </div>

                <div v-if="this_search.properties.citations.pre_complete">

                    
                    <div style="font-weight: bold; font-size: 16px; color: #273042; padding-left: 10px;">Citations List</div>
                    <div  class="dashboard-box stats-box w-full px-2 mb-5 mt-3">
                    <v-card
                            class="pa-2"
                            tile

                            :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                        >
                        <v-tabs>
                            <v-tab>Found</v-tab>
                            <v-tab>Not Found</v-tab>
                        
                            <v-tab-item>
                                <v-card
                                    class="pa-2"
                                    tile

                                    :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                >
                                
                                    <div>
                                        <table class="w-full rg-datatable mt-5">
                                            <thead class="border-b border-gray-100 w-full">
                                            <tr>
                                                <th>Site/Directory</th>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Zip/Post</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                            </tr>
                                            </thead>
                                            <tbody class="w-full" style="">
                                            <tr v-for="(item, index) in this_search.properties.citations.pre_complete.active" :key="index">
                                                <td class="">
                                                    {{ item.source }}
                                                </td>
                                                <td class="">
                                                    <template v-if="!item.profile_details || !item.profile_details.business_name">
                                                        <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on">
                                                            </i>
                                                        </template>
                                                        <span>Please wait while we are fetching details...</span>
                                                        </v-tooltip>
                                                    </template>
                                                    
                                                    <template v-else>
                                                        <span>{{ item.profile_details.business_name }}</span>
                                                    </template>
                                                </td>
                                                <td class="">
                                                    <template v-if="!item.profile_details || !item.profile_details.address">
                                                        <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on">
                                                            </i>
                                                        </template>
                                                        <span>Please wait while we are fetching details...</span>
                                                        </v-tooltip>
                                                    </template>
                                                    
                                                    <template v-else>
                                                        <span>{{ item.profile_details.address }}</span>
                                                    </template>
                                                </td>
                                                <td class="">
                                                    <template v-if="!item.profile_details || !item.profile_details.postcode">
                                                        <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on">
                                                            </i>
                                                        </template>
                                                        <span>Please wait while we are fetching details...</span>
                                                        </v-tooltip>
                                                    </template>
                                                    
                                                    <template v-else>
                                                        <span>{{ item.profile_details.postcode }}</span>
                                                    </template>
                                                </td>
                                                <td class="">
                                                    <template v-if="!item.profile_details || !item.profile_details.phone_number">
                                                        <v-tooltip top color="#2477F6">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <i class="fa fa-spin fa-spinner" style="font-size: 16px;"
                                                            v-bind="attrs"
                                                            v-on="on">
                                                            </i>
                                                        </template>
                                                        <span>Please wait while we are fetching details...</span>
                                                        </v-tooltip>
                                                    </template>
                                                    
                                                    <template v-else>
                                                        <span>{{ item.profile_details.phone_number }}</span>
                                                    </template>
                                                </td>
                                                <td>
                                                    <v-tooltip top color="primary">
										                  <template v-slot:activator="{ on, attrs }">
										                    <i class="mdi mdi-alert" style="font-size: 16px; color: #ff3d54;"
										                      v-bind="attrs"
										                      v-on="on"
										                    ></i>
										                  </template>
										                  <span>Please wait while we are fetching details...</span>
                                                    </v-tooltip>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-card>
                            </v-tab-item>
                        
                            <v-tab-item>
                                <v-card
                                    class="pa-2"
                                    tile

                                    :class="(($vuetify.breakpoint.xs) ? 'pl-3' : '')"
                                >
                                
                                    <div>
                                        <table class="w-full rg-datatable mt-5">
                                            <thead class="border-b border-gray-100 w-full">
                                            <tr>
                                                <th>Site/Directory</th>
                                                <th>Date Identified</th>
                                                <th>Authority</th>
                                                <th>Citation Value</th>
                                                <th>Site Type</th>
                                                <th>Free/Paid</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody class="w-full" style="">
                                            <tr v-for="(item, index) in this_search.properties.citations.pre_complete.possible" :key="index">
                                                <td class="">
                                                    <a :href="'https://' + item.source" target='url-add-citation'>{{ item.source }}</a>
                                                </td>
                                                <td class="">
                                                    {{ item['date-identified'] }}
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
                                                <td>
                                                    <a :href="item['get-citation-url']" target='url-add-citation'>Add Citation</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                    </div>
                </div>
            </div>
            <div v-else class="pt-3">
                <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
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
            gmb_tab: 0,

            loaded: false,

            this_search: null,

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
        }
    },
    methods: {
        ucwords (str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        },
    
        async runCreated() {
            let self = this

            this.loaded = true;

            if (this.search.properties.summary.grade) {
                this.summaryDoughnut.series = [this.seo_audit_grades[this.search.properties.summary.grade.value], (100 - this.seo_audit_grades[this.search.properties.summary.grade.value])];
            }
            else {
                setTimeout(function() {
                  let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + self.$route.query.s + '&p=' + self.this_search.place_id + '&si=' + self.this_search.id + '&loads=' + this.loads;
          
                  axios.get(url, {

                  }).then(function(response) {
                    self.this_search = response.data.search;
                    console.log(response.data.search.properties.citations.status)
                    self.runCreated();
                  });
                }, 10000);
            }
        },

        showDuplicates(item) {
        	let html = [];

        	for (var i in item.duplicates) {
        		html.push(item.duplicates[i].url);
        	}

        	return html.join('<br />');
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

        }
    },
    created() {
        let self = this
        this.this_search = this.search;
        // console.log('search', this.search);

        setTimeout(function() {
            self.runCreated();
        }, 2000);
    }
  }
  </script>