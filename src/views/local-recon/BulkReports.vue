<template>

    <panel-navigation>
        <div>
            <h1 class="text-lg font-semibold mb-3">Bulk Reports</h1>

            <hr class="border-b border-gray-100 mb-3" />

            <div class="mb-4">

                <div class="dashboard-box">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <div class="dashboard-box-title">Create Bulk Reports</div>

                            <div style="font-size: 12px;" class="mt-4 mb-2">Search for your business and choose which reports you would like to generate.</div>

                            <div class="mb-6">
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
                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px;"
                                    >
                                </v-combobox>

                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                    <i class="fa fa-spin fa-spinner"></i>
                                </div>
                            </div>

                            <v-checkbox label="Reputation Report" v-model="reports.reputation"></v-checkbox>

                            <v-checkbox label="SEO Audit" v-model="reports.seo"></v-checkbox>

                            <v-checkbox label="Geo Grid" v-model="reports.geo_grid"></v-checkbox>

                            <v-checkbox label="GBP Audit" v-model="reports.gmb"></v-checkbox>

                            <v-checkbox label="Review Link Generator" v-model="reports.review_link"></v-checkbox>

                            <v-checkbox label="Citation Audit" v-model="reports.citation"></v-checkbox>

                            <div v-show="reports.seo" class="mb-3">
                            	<v-text-field
                                    label="Website"
                                    prepend-inner-icon="mdi-web"
                                    v-model="business_location.website"
                                    outlined
                                    placeholder="example.com"
                                    dense
                                    hide-details
                                    style="margin-top: 5px;"
                                ></v-text-field>
                            </div>

							<div v-show="reports.geo_grid" class="mb-3">
                            	<v-text-field
                                    label="Keyword"
                                    prepend-inner-icon="mdi-magnify"
                                    v-model="business_location.keyword"
                                    outlined
                                    placeholder="hvac"
                                    dense
                                    hide-details
                                    style="margin-top: 5px;"
                                ></v-text-field>
                            </div>

                            <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer mt-2 float-left" @click="createReports()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> CREATE REPORTS</div>

                            <br clear="all" /><br clear="all" /><br clear="all" />

                           	<div v-if="form_submitted">
	                            <hr />

	                            <br clear="all" />

	                            <div class="dashboard-box-title">Results</div>

	                            <div style="font-size: 12px;">Check progress and view your reports results below. All reports will also be visible on your dashboard.</div>

	                            <div v-if="!generated_urls" style="font-size: 12px; padding-top: 10px;"><i class="fa fa-spin fa-spinner"></i> Please wait while we submit your reports for generation.</div>

	                            <div v-else>
	                            	<v-tabs>
	                            		<v-tab v-for="(item, index) in reports_results" :key="index">{{ item.title }}</v-tab>

	                            		<v-tab-item v-for="(item, index) in reports_results" :key="index">
	                            			<div class="pt-3">
	                            				<iframe :src="item.url" style="border: 0px; width: 100%; height: 1200px;"></iframe>
	                            			</div>
	                            		</v-tab-item>
	                            	</v-tabs>
	                            </div>
	                        </div>
                        </div>
                    </v-card>
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

    export default {
        metaInfo () {
            return {
                title: "Local Recon | Dashboard "
            }
        },
        components: {
            PanelNavigation
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
                reports: {
                	reputation: false,
					seo: false,
					geo_grid: false,
					gmb: false,
					review_link: false,
					citation: false
                },

                business_location: {
                	name: "",
                	website: "",
                	keyword: ""
                },

                form_submitted: false,
                generated_urls: false,

                reports_results: [],

                searchingBusinesses: false,
                typingCounter: 0
            }
        },
        methods: {
            formatDate: function(date) {
                return moment(String(date)).format('MMM DD, YYYY')
            },

            async createReports() {
            	if (!this.business_location.name) {
            		this.$swal({
	                    title: "Business Name",
	                    text: "Search for your business first.",
	                    showCancelButton: false
                    });

            		return;
            	}

            	if (!this.reports.reputation && !this.reports.seo && !this.reports.geo_grid && !this.reports.gmb && !this.reports.review_link && !this.reports.citation) {
            		this.$swal({
	                    title: "Choose Reports",
	                    text: "Select at least one report.",
	                    showCancelButton: false
                    });

            		return;
            	}

            	if (this.reports.seo && !this.business_location.website) {
            		this.$swal({
	                    title: "Website",
	                    text: "Website is needed for SEO report.",
	                    showCancelButton: false
                    });

            		return;
            	}

            	if (this.reports.geo_grid && !this.business_location.keyword) {
            		this.$swal({
	                    title: "Keyword",
	                    text: "keyword is needed for SEO report.",
	                    showCancelButton: false
                    });

            		return;
            	}

            	this.form_submitted = true;
            	this.generated_urls = false;
                this.business_location.custom_keyword = this.business_location.keyword;
            	this.reports_results = [];

            	if (this.reports.reputation) {
            		let reputation_report_url = await this.createReputationReport();

            		this.reports_results.push({
            			title: "Reputation Report",
            			url: reputation_report_url
            		})
            	}

            	if (this.reports.seo) {
            		let seo_report_url = await this.createSEOReport();

            		this.reports_results.push({
            			title: "SEO Audit",
            			url: seo_report_url
            		})
            	}

            	if (this.reports.geo_grid) {
            		let grid_report_url = await this.createGridReport();

            		this.reports_results.push({
            			title: "Geo Grid",
            			url: grid_report_url
            		})
            	}

            	if (this.reports.gmb) {
            		let gmb_report_url = await this.createGMBReport();

            		this.reports_results.push({
            			title: "GBP Audit",
            			url: gmb_report_url
            		})
            	}

            	if (this.reports.review_link) {
            		let review_link_url = await this.createReviewLinkReport();

            		this.reports_results.push({
            			title: "Review Link Generator",
            			url: review_link_url
            		})
            	}

            	if (this.reports.citation) {
            		let citation_report_url = await this.CreateCitationReport();

            		this.reports_results.push({
            			title: "Citation Audit",
            			url: citation_report_url
            		})
            	}

            	console.log(this.reports_results);

            	this.generated_urls = true;
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
            openSearchReport(search) {
                window.open(this.getSearchReportUrl(search));
            },
            getSearchReportUrl(search) {
                return window.location.origin + '/rf?s=' + ((search.widget) ? search.widget.uuid : '') + '&p=' + search.place_id;
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

                console.log('address_components', address_components)

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
                that.business_location = response.data.result
                // business_location.name = that.company_name;

                that.business_location.keyword = that.business_location.types[0].replace(/\_/g, " ");
                that.gmb_keyword = that.business_location.types[0].replace(/\_/g, " ");

                let theAddress = that.getAddressObject(that.business_location.address_components);
                that.fullLocation = theAddress;
                that.gmb_city = theAddress.city + " " + theAddress.state;
            },

            async createReputationReport() {
                let self = this;

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

                return window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
            },

            async createSEOReport() {
                let self = this;

                let website_url = this.business_location.website;

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

                return window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
            },

            async createGMBReport() {
                let self = this;

                if (!self.company_name) return;

                $(".lr-input input").prop('disabled', true);

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-gmb-audit', {
                    widget_uuid: null,
                    business_location: this.business_location,
                    gmb_keyword: this.gmb_keyword + " in " + this.gmb_city
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                return window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
            },

            async createReviewLinkReport() {
                let self = this;

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

                return window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
            },

            async CreateCitationReport() {
                let self = this;

                if (!self.company_name) return;

                $(".lr-input input").prop('disabled', true);

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-citation-audit', {
                    widget_uuid: null,
                    business_location: this.business_location,
                    gmb_keyword: this.gmb_keyword + " in " + this.gmb_city
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                return window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
            },

            async createGridReport() {
                let self = this;

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

                return window.location.origin + "/grid-tracker/app?w=" + response.data.widget.uuid + '&u=' + self.me.uuid + '&g=' + btoa(JSON.stringify(gridTrackerBusinessObject)) + '&q=' + self.business_location.keyword.trim();
            },

            validateDomain(domain) {
                domain = domain.replace("www.", "");
                var res = domain.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                return (res !== null)
            },
        },
        created() {

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