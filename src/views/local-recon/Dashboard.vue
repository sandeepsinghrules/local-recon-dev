<template>

    <panel-navigation>
        
        <LocalAdminDashboard v-if="me && me.company_type == 'admin'" />
        <div v-else>
            <h1 class="text-lg font-semibold mb-3">Dashboard</h1>

            <hr class="border-b border-gray-100 mb-3" />

            <v-skeleton-loader v-if="fetchingData" type="article, table, table"></v-skeleton-loader>

            <div class="-mx-2" v-if="!fetchingData">
                <div class="flex flex-row flex-wrap mb-4">
                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                        <div class="dashboard-box-title">Leads <a href="javascript: void(0);" @click="$router.push('/local-recon/leads')"><i class="mdi mdi-logout-variant"></i></a></div>

                        <div class="stats-box-number">{{ dashboard_data.leads_count }}</div>
                        
                        <div class="stats-box-icon-bg"></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-account-multiple"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                        <div class="dashboard-box-title">Reports <a href="javascript: void(0);" @click="$router.push('/local-recon/reports')"><i class="mdi mdi-logout-variant"></i></a></div>

                        <div class="stats-box-number">{{ dashboard_data.searches_count }}</div>
                        
                        <div class="stats-box-icon-bg"></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-text-box-outline"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                        <div class="dashboard-box-title">Widgets <a href="javascript: void(0);" @click="$router.push('/local-recon/widgets')"><i class="mdi mdi-logout-variant"></i></a></div>

                        <div class="stats-box-number">{{ dashboard_data.widgets_count }}</div>
                        
                        <div class="stats-box-icon-bg"></div>
                        <div class="stats-box-icon">
                            <i class="mdi mdi-widgets-outline"></i>
                        </div>
                        </div>
                    </v-card>
                    </div>
                </div>
            </div>

            <div class="mb-4">

                <div class="dashboard-box">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <div class="dashboard-box-title">Create Report</div>

                            <v-tabs>
                                <v-tab>Reputation Report</v-tab>
                                <v-tab>SEO Audit</v-tab>
                                <v-tab>Geo Grid</v-tab>
                                <v-tab>GBP Audit</v-tab>
                                <v-tab>Review Link Generator</v-tab>
                                <v-tab>Citation Audit</v-tab>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-combobox
                                                    v-model="autocompleteLocationModel"
                                                    label="Business Name"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(100% - 160px); float: left;"
                                                ></v-combobox>

                                                <!-- <v-autocomplete
                                                    label="Business Name"
                                                    prepend-inner-icon="mdi-briefcase-outline"
                                                    v-model="autocompleteLocationModel"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(100% - 160px); float: left;"
                                                    >
                                                </v-autocomplete> -->

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="createReputationReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-text-field
                                                    label="Website"
                                                    prepend-inner-icon="mdi-web"
                                                    v-model="seo_audit_website"
                                                    outlined
                                                    placeholder="example.com"
                                                    dense
                                                    hide-details
                                                    style="margin-top: 5px; width: calc(100% - 160px); float: left;"
                                                ></v-text-field>

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="createSEOReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-combobox
                                                    label="Business Name"
                                                    prepend-inner-icon="mdi-briefcase-outline"
                                                    v-model="autocompleteLocationModel"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(50% - 80px); float: left;"
                                                    >
                                                </v-combobox>

                                                <v-text-field
                                                    label="Keyword"
                                                    prepend-inner-icon="mdi-magnify"
                                                    v-model="geo_grid_keyword"
                                                    outlined
                                                    placeholder="hvac"
                                                    dense
                                                    hide-details
                                                    style="margin-top: 5px; width: calc(50% - 90px); margin-left: 10px; float: left;"
                                                ></v-text-field>

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="createGridReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-combobox
                                                    label="Business Name"
                                                    prepend-inner-icon="mdi-briefcase-outline"
                                                    v-model="autocompleteLocationModel"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(50% - 80px); float: left;"
                                                    >
                                                </v-combobox>

                                                <v-text-field
                                                    label="City"
                                                    prepend-inner-icon="mdi-magnify"
                                                    v-model="gmb_city"
                                                    outlined
                                                    placeholder="Miami"
                                                    dense
                                                    hide-details
                                                    style="margin-top: 5px; width: calc(25% - 70px); margin-left: 10px; float: left;"
                                                ></v-text-field>

                                                <v-text-field
                                                    label="Keyword"
                                                    prepend-inner-icon="mdi-magnify"
                                                    v-model="gmb_keyword"
                                                    outlined
                                                    placeholder="hvac"
                                                    dense
                                                    hide-details
                                                    style="margin-top: 5px; width: calc(25% - 70px); margin-left: 10px; float: left;"
                                                ></v-text-field>

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="createGMBReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-combobox
                                                    label="Business Name"
                                                    prepend-inner-icon="mdi-briefcase-outline"
                                                    v-model="autocompleteLocationModel"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(100% - 160px); float: left;"
                                                    >
                                                </v-combobox>

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="createReviewLinkReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>

                                <v-tab-item class="pt-3">
                                    <div class="flex flex-row flex-wrap">
                                        <div class="w-full">
                                            <div class="">
                                                <v-combobox
                                                    label="Business Name"
                                                    prepend-inner-icon="mdi-briefcase-outline"
                                                    v-model="autocompleteLocationModel"
                                                    :items="locationFoundItems"
              :search-input.sync="locationSearchText"
                                                    item-text="value"
                                                    item-value="id"
                                                    hide-no-data
                                                    return-object
                                                    outlined
                                                    dense
                                                    hide-details
                                                    @change="selectPlace()"
                                                    :custom-filter="filterPlaces()"
                                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px; width: calc(100% - 160px); float: left;"
                                                    >
                                                </v-combobox>

                                                <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer ml-2 mt-2 float-right" @click="CreateCitationReport()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORT</div>

                                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                                    <i class="fa fa-spin fa-spinner"></i>
                                                </div>

                                            <hr v-if="$vuetify.breakpoint.xs" class="mt-2 mb-4 ml-3 -mr-3" />
                                            </div>
                                        </div>
                                        </div>
                                </v-tab-item>
                            </v-tabs>

                            <div class="pt-2">
                                <router-link :to="'/local-recon/bulk-reports'" style="font-size: 12px;">+ Create Bulk Reports</router-link>

                                &nbsp;&nbsp;

                                

                                &nbsp;&nbsp;

                                <router-link :to="'/local-recon/own-report'" style="font-size: 12px;">+ Create Your Own Report</router-link>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>

            <div v-if="!fetchingData" class="mb-4">

                <div class="dashboard-box">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <div class="dashboard-box-title">Latest Leads</div>

                            <div class="w-full mb-4">
                                <div v-if="dashboard_data.latest_leads.length == 0">
                                    <br /><br /><br /><br />

                                    <div class="dashboard-box-iconsquare">
                                    <div class="dashboard-box-icon-background"></div>
                                    <div class="dashboard-box-icon">
                                        <i class="mdi mdi-account-multiple"></i>
                                    </div>
                                    </div>

                                    <div style="text-align: center;">
                                        <div class="pt-2 pb-2">
                                            <strong>No Leads Yet</strong>
                                        </div>
                                    </div>
                                    
                                    <br /><br /><br /><br /><br />
                                </div>

                                <table v-else class="w-full rg-datatable mt-4">
                                    <thead class="border-b border-gray-100 w-full">
                                    <tr>
                                        <th>Lead Details</th>
                                        <th>Business</th>
                                        <th>Address</th>
                                        <th>Request Type</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                    <tr v-for="lead in dashboard_data.latest_leads" :key="lead.id">
                                        <td>
                                            <div v-if="lead.first_name || lead.last_name">
                                                <router-link :to="'/local-recon/lead/' + lead.id">{{ lead.first_name }} {{ lead.last_name }}</router-link>
                                            </div>
                                            <a :href="'mailto:' + lead.email">{{ lead.email }}</a>
                                        </td>
                                        <td>{{ lead.company_name || "-" }}</td>
                                        <td>{{ getLeadAddress(lead) }}</td>
                                        <td>{{ ((lead.optin_type == 'view_gate') ? "Optin" : "Help Request") }}</td>
                                        <td>{{ formatDate(lead.created_at) }}</td>
                                        <td style="text-align: right;">
                                            <a v-if="lead.optin_type != 'webhook'" href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openLeadReport(lead)">
                                                <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                            </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>

            <div class="-mx-2" v-if="!fetchingData">
                <div class="flex flex-row flex-wrap mb-3">
                    <div class="w-full md:w-1/2 lg:w-1/2">
                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest Reputation Reports</div>

                                    <div v-if="dashboard_data.latest_reputation_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_reputation_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-map-marker" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.properties.formatted_address }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>

                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest SEO Reports</div>

                                    <div v-if="dashboard_data.latest_seo_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_seo_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-web" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.keyword }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>

                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest Citation Reports</div>

                                    <div v-if="dashboard_data.latest_citation_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_citation_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-web" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.properties.business.formatted_address }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/2">
                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest GBP Reports</div>

                                    <div v-if="dashboard_data.latest_gmb_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_gmb_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong><span v-if="search.properties.gmb_keyword"> - {{ search.properties.gmb_keyword }}</span>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-web" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.properties.business.formatted_address }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>

                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest Review Link Generator Reports</div>

                                    <div v-if="dashboard_data.latest_review_link_generator_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_review_link_generator_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-web" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.properties.business.formatted_address }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>

                        <div class="dashboard-box stats-box w-full px-2 mb-4">
                            <v-card
                                class="pa-2"
                                tile
                            >
                                <div class="p-3">
                                    <div class="dashboard-box-title mb-2">Latest Grid Reports</div>

                                    <div v-if="dashboard_data.latest_grid_searches.length == 0" class="flex flex-col justify-center items-center">

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-text-box-outline"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div v-else class="">
                                        <div v-for="search in dashboard_data.latest_grid_searches" :key="search.id" class="text-sm pt-3 text-gray-800 bg-white rounded">
                                            <div class="dashboard-activity-item mb-3">
                                                <div class="float-right not-mobile" style="font-size: 12px;">
                                                    <div class="mb-2">
                                                        {{ formatDate(search.created_at) }}
                                                    </div>
                                                    <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                        <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                        <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span class="mb-3">
                                                        <strong>{{ search.keyword }}</strong>
                                                    </span>
                                                    <br />
                                                    <i class="mdi mdi-web" style="font-size: 16px;"></i>
                                                    &nbsp;
                                                    {{ search.properties.location.name }}
                                                </div>
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </panel-navigation>

</template>

<script>
    import { mapState } from 'vuex'
    import PanelNavigation from '@/components/PanelNavigation.vue'
    import moment from 'moment'
    import $ from 'jquery'
    import axios from 'axios'
    import { GetSuggestions } from '@/utils/PlaceUtils'
    import LocalAdminDashboard from '@/views/panel/Dashboard/LocalReconAdmin.vue'
    // import { GetSuggestionsNew } from '@/utils/GetSuggestionsNew'

    export default {
        metaInfo () {
            return {
                title: "Local Recon | Dashboard "
            }
        },
        components: {
            PanelNavigation,
            LocalAdminDashboard
        },
        computed: {
            ...mapState({
                me: state => state.me.me
            }),
            locationFoundItems () {
                return this.locationEntries
            }
        },
        data() {
            return {
                fetchingData: true,
                dashboard_data: false,

                company_name: "",

                autocompleteLocationModel: null,
                locationSearchText: null,
                searchBusinessesText: null,
                locationEntries: [],
                locationFoundItemsNew: [],
                search_location: null,

                seo_audit_website: "",

                geo_grid_keyword: "",

                gmb_city: "",
                gmb_keyword: "",
                fullLocation: null,
                searchingBusinesses: false,
                typingCounter: 0
            }
        },
        methods: {
            formatDate: function(date) {
                return moment(String(date)).format('MMM DD, YYYY')
            },
            async fetchDashboardData() {
                let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/dashboard', {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                this.dashboard_data = response.data;
                this.fetchingData = false;
            },
            getLeadAddress(lead) {
                let items = [];

                if (lead.company_address)
                    items.push(lead.company_address);

                if (lead.city)
                    items.push(lead.city);

                if (lead.state)
                    items.push(lead.state);

                if (lead.zip)
                    items.push(lead.zip);

                if (items.length == 0)
                    return "-";
                
                return items.join(", ");
            },
            openLeadReport(lead) {
                window.open(window.location.origin + '/rf?s=' + ((lead.search.widget && lead.search.widget) ? lead.search.widget.uuid : '') + '&p=' + lead.search.place_id + '&si=' + lead.search.id);
            },
            openSearchReport(search) {
                window.open(this.getSearchReportUrl(search));
            },
            getSearchReportUrl(search) {
                return window.location.origin + '/rf?s=' + ((search.widget) ? search.widget.uuid : '') + '&p=' + search.place_id + '&si=' + search.id;
            },
            onCopy: function (e) {
                this.$swal({
                    title: "Copied",
                    text: "URL copied successfully!",
                    showCancelButton: false,
                    });
            },
            onError: function (e) {
                alert('Failed to copy the text to the clipboard')
                console.log(e);
            },

            getAddressObject(address_components) {

                // console.log('address_components', address_components)

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
                    "colloquial_area",
                    "political",
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

                let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-place-details?place_id=' + that.autocompleteLocationModel.id + '&business_name=' + encodeURIComponent(that.autocompleteLocationModel.value), {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                // console.log(response.data.result);

                that.company_name = response.data.result.name;
                that.business_location = response.data.result;

              
                if (that.business_location.types.length > 1 && that.business_location.types[0] === 'point_of_interest' ){
                        that.gmb_keyword = that.business_location.types[1].replace(/_/g, ' '); 
                    } else { 
                         that.gmb_keyword = that.business_location.types[0].replace(/_/g, ' '); // Use first item
                    } 
                that.geo_grid_keyword = that.business_location.types[0].replace(/\_/g, " ");
                let theAddress = that.getAddressObject(that.business_location.address_components);
                that.fullLocation = theAddress;
                that.gmb_city = theAddress.city + " " + theAddress.state;
            },

            async createReputationReport() {
                let self = this;
                this.business_location.custom_keyword = this.business_location.keyword;
                if (!self.company_name) return;

                $(".lr-input input").prop('disabled', true);

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-search', {
                    company_name: self.company_name,
                    widget_uuid: null,
                    place_id: self.autocompleteLocationModel.id,
                    properties: self.business_location
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                window.open(window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si);
                
                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            async createSEOReport() {
                let self = this;
                if(this.business_location){
                    this.business_location.custom_keyword = (this.business_location && this.business_location.keyword) || '';
                }

                let website_url = this.seo_audit_website;

                website_url = website_url.replace("http://", "");
                website_url = website_url.replace("https://", "");

                if (!website_url) {
                    return;
                }
    
                if (!this.validateDomain(website_url)) {
                    return;
                }

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-seo-audit', {
                    widget_uuid: null,
                    website_url: website_url
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                });

                window.open(window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si);
                
                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            async createGMBReport() {
                let self = this;
                this.business_location.custom_keyword = this.business_location.keyword;
                if (!self.company_name) return;

                if (!self.gmb_keyword) return;

                this.business_location.types[0] = self.gmb_keyword;

                $(".lr-input input").prop('disabled', true);
                if (!this.fullLocation.city) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the city from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                if (!this.fullLocation.country) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the country from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                if (!this.fullLocation.zip) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the zip code from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                if (!this.me.integrations.google_maps.settings.api_key) {
                    this.$swal({
                    title: "Error",
                    text: "Kindly add the Google Places API key before proceeding with the GBP audit.",
                    showCancelButton: false,
                    });
                    return;
                }
                // console.log('business_location',this.business_location);
                // console.log('business_gmb',this.gmb_keyword);
                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-gmb-audit', {
                    widget_uuid: null,
                    business_location: this.business_location,
                    gmb_keyword: this.gmb_keyword + " in " + this.gmb_city
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                window.open(window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si);
                
                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            async createReviewLinkReport() {
                let self = this;
                this.business_location.custom_keyword = this.business_location.keyword;
                if (!self.company_name) return;

                $(".lr-input input").prop('disabled', true);

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-link-generator', {
                    widget_uuid: null,
                    business_location: this.business_location,
                    gmb_keyword: this.gmb_keyword + " in " + this.gmb_city
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                window.open(window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si);
                
                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            async CreateCitationReport() {
                let self = this;
                this.business_location.custom_keyword = this.business_location.keyword;
                if (!self.company_name) return;
                $(".lr-input input").prop('disabled', true);

                if (!this.fullLocation.city) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the city from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                if (!this.fullLocation.country) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the country from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                if (!this.fullLocation.zip) {
                    this.$swal({
                    title: "Error",
                    text: "Unable to fetch the zip code from Google",
                    showCancelButton: false,
                    });
                    return;
                }
                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-citation-audit', {
                    widget_uuid: null,
                    business_location: this.business_location,
                    gmb_keyword: this.gmb_keyword + " in " + this.gmb_city
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                window.open(window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si);
                
                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            async createGridReport() {
                let self = this;
                this.business_location.custom_keyword = this.business_location.keyword;
                if (!this.business_location) {
                    return;
                }

                if (!this.business_location.place_id) {
                    return;
                }

                let gridTrackerBusinessObject = {
                    name: this.business_location.name,
                    lat: this.business_location.geometry.location.lat,
                    lng: this.business_location.geometry.location.lng,
                    place_id: this.business_location.place_id
                };

                let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-grid-hidden-widget', {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                window.open(window.location.origin + "/grid-tracker/app?w=" + response.data.widget.uuid + '&u=' + self.me.uuid + '&g=' + btoa(JSON.stringify(gridTrackerBusinessObject)) + '&q=' + self.geo_grid_keyword.trim());

                setTimeout(function() {
                    location.reload(true);
                }, 500);
            },

            validateDomain(domain) {
                domain = domain.replace("www.", "");
                var res = domain.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,15}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                return (res !== null)
            },
        },
        created() {
            this.fetchDashboardData();
        },
        watch: {
            searchBusinessesText (newVal) {
                // If less than 3 chars typed, do not search
                if (!newVal || newVal.length <= 3) return;

                if (newVal.split(",").length > 1)
                    return;

                let that = this

                var thisCounter = this.typingCounter;

                this.typingCounter++;
                
                that.searchingBusinesses = true;

                that.locationFoundItemsNew = []; 
                // [{id: 1, value: "Alex1"}, {id: 2, value: "Alex2"}, {id: 3, value: "Alex3"}];

                setTimeout(function() {
                    console.log('thisCounter', thisCounter)
                    console.log('this.typingCounter', that.typingCounter)
                    if (thisCounter == that.typingCounter - 1) {
                        axios.post(process.env.VUE_APP_API_ENDPOINT + '/search_place/autoComplete', {
                                keyword: newVal,
                                value_serp_key: that.me.integrations.value_serp.settings.api_key
                            }, {
                            headers: {
                                'Authorization': 'Bearer ' + that.$store.state.auth.jwt
                            },
                        }).then(function(response) {
                            console.log('response', response)

                            for (var i in response.data.suggestions) {
                                that.locationFoundItemsNew.push({
                                    id: response.data.suggestions[i].data_id,
                                    value: response.data.suggestions[i].title + ((response.data.suggestions[i].address) ? ", " + response.data.suggestions[i].address : "")
                                })
                            }

                            that.searchingBusinesses = false;
                        })
                    }
                }, 300);
            },

            locationSearchText (newVal) {
            var that = this;

            // If less than 3 chars typed, do not search
            if (!newVal || newVal.length <= 3) return

            // Call the method from the previous section here
            GetSuggestions(newVal)
                .then(function (res) {
                    if (res === null) {
                        that.$swal({
                            title: "Selected Business Alert",
                            text: "The selected business is a service area business.",
                            icon: "info",
                            confirmButtonText: "OK"
                        });
                        
                    } else {
                        that.locationEntries = res;
                    }
                })
                .catch(function () {
                that.business = false;  
                that.step = 1;
                })
            }
        }
    }
</script>