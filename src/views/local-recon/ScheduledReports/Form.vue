<template>

    <panel-navigation>
        <div>
            <h1 class="text-lg font-semibold mb-3">Create Scheduled Report</h1>

            <hr class="border-b border-gray-100 mb-3" />

            <div class="mb-4">

                <div class="dashboard-box" style='max-width: 600px;'>
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="pl-3 pr-3 pb-3">
                            <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Report Name</div>

                            <div class="">
                                <v-text-field
                                    label="Report Name"
                                    v-model="scheduled_report.name"
                                    return-object
                                    outlined
                                    dense
                                    hide-details
                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px;"
                                    >
                                </v-text-field>
                            </div>

                            <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Business</div>

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
                                    style="height: 40px; border: 0px; margin-top: 5px; margin-bottom: 5px;"
                                    >
                                </v-combobox>

                                <div v-show="searchingBusinesses" style="clear: both; padding-top: 10px;">
                                    <i class="fa fa-spin fa-spinner"></i>
                                </div>
                            </div>

                            <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Reports</div>

                            <div style="display: inline-block; width: 50%;"><v-checkbox label="Reputation Report" v-model="scheduled_report.report_types.reputation"></v-checkbox></div>

                            <div style="display: inline-block; width: 50%;"><v-checkbox label="SEO Audit" v-model="scheduled_report.report_types.seo"></v-checkbox></div>

                            <div style="display: inline-block; width: 50%;"><v-checkbox label="Geo Grid" v-model="scheduled_report.report_types.geo_grid"></v-checkbox></div>

                            <div style="display: inline-block; width: 50%;"><v-checkbox label="GBP Audit" v-model="scheduled_report.report_types.gmb"></v-checkbox></div>

                            <div style="display: inline-block; width: 50%;" class="-mb-6"><v-checkbox label="Review Link Generator" v-model="scheduled_report.report_types.review_link"></v-checkbox></div>

                            <div style="display: inline-block; width: 50%;" class="-mb-6"><v-checkbox label="Citation Audit" v-model="scheduled_report.report_types.citation"></v-checkbox></div>

                            <div v-show="scheduled_report.report_types.seo" class="mb-3">
                                <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Website</div>

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

                            <div v-show="scheduled_report.report_types.geo_grid" class="mb-3">
                                <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Keyword</div>

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

                            <div class="flex flex-row flex-wrap">
                                <div class="dashboard-box stats-box w-full md:w-1/2 lg:w-1/2 pr-2">
                                    <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Frequency</div>

                                    <v-select
                                          outlined
                                          dense
                                          hide-details
                                        :items="frequencies"
                                        v-model="scheduled_report.frequency"
                                    >

                                    </v-select>
                                </div>

                                <div class="dashboard-box stats-box w-full md:w-1/2 lg:w-1/2 pl-2">
                                    <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">At</div>

                                    <v-select
                                      outlined
                                      dense
                                      hide-details
                                        :items="times"
                                        v-model="scheduled_report.hour"
                                        item-text="title"
                                        item-value="value"
                                    >

                                    </v-select>
                                </div>
                            </div>

                            <div v-show="scheduled_report.frequency == 'Weekly'">

	                            <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">On</div>

	                            <v-select
	                              outlined
	                              dense
	                              hide-details
	                                :items="week_days"
	                                v-model="scheduled_report.week_day"
	                                item-text="title"
	                                item-value="value"
	                            >

	                            </v-select>
                            </div>

                            <div v-show="scheduled_report.frequency == 'Monthly'">

	                            <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">On Day</div>

	                            <v-select
	                              outlined
	                              dense
	                              hide-details
	                                :items="month_days"
	                                v-model="scheduled_report.month_day"
	                                item-text="title"
	                                item-value="value"
	                            >

	                            </v-select>
                            </div>

                            <div>

                                <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Timezone</div>

                                <v-autocomplete
                                      outlined
                                      dense
                                      hide-details
                                    :items="timezones"
                                    label="Timezone"
                                    v-model="scheduled_report.timezone"
                                ></v-autocomplete>
                            </div>

                            <div>

                                <div style="font-size: 12px; font-weight: bold;" class="mt-4 mb-2">Notification Emails</div>

                                <v-combobox
                                  v-model="scheduled_report.email_addresses"
                                  multiple
                                  small-chips
                                  color="blue"
                                  outlined
                                  dense
                                ></v-combobox>
                            </div>


                            <div class="border-1 border-blue bg-white text-blue text-xs text-bold px-4 py-2 rounded cursor-pointer float-left mr-2" @click="$router.push('/local-recon/scheduled-reports')"><i class="fa fa-arrow-left"></i> BACK</div>

                            <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-left" @click="saveScheduledReport()"><i v-show="saving" class="fa fa-spin fa-spinner"></i> SAVE</div>

                            <br clear="all" />
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
                saving: false,
                timezones: [
                    'Europe/Andorra',
                    'Asia/Dubai',
                    'Asia/Kabul',
                    'Europe/Tirane',
                    'Asia/Yerevan',
                    'Antarctica/Casey',
                    'Antarctica/Davis',
                    'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
                    'Antarctica/Mawson',
                    'Antarctica/Palmer',
                    'Antarctica/Rothera',
                    'Antarctica/Syowa',
                    'Antarctica/Troll',
                    'Antarctica/Vostok',
                    'America/Argentina/Buenos_Aires',
                    'America/Argentina/Cordoba',
                    'America/Argentina/Salta',
                    'America/Argentina/Jujuy',
                    'America/Argentina/Tucuman',
                    'America/Argentina/Catamarca',
                    'America/Argentina/La_Rioja',
                    'America/Argentina/San_Juan',
                    'America/Argentina/Mendoza',
                    'America/Argentina/San_Luis',
                    'America/Argentina/Rio_Gallegos',
                    'America/Argentina/Ushuaia',
                    'Pacific/Pago_Pago',
                    'Europe/Vienna',
                    'Australia/Lord_Howe',
                    'Antarctica/Macquarie',
                    'Australia/Hobart',
                    'Australia/Currie',
                    'Australia/Melbourne',
                    'Australia/Sydney',
                    'Australia/Broken_Hill',
                    'Australia/Brisbane',
                    'Australia/Lindeman',
                    'Australia/Adelaide',
                    'Australia/Darwin',
                    'Australia/Perth',
                    'Australia/Eucla',
                    'Asia/Baku',
                    'America/Barbados',
                    'Asia/Dhaka',
                    'Europe/Brussels',
                    'Europe/Sofia',
                    'Atlantic/Bermuda',
                    'Asia/Brunei',
                    'America/La_Paz',
                    'America/Noronha',
                    'America/Belem',
                    'America/Fortaleza',
                    'America/Recife',
                    'America/Araguaina',
                    'America/Maceio',
                    'America/Bahia',
                    'America/Sao_Paulo',
                    'America/Campo_Grande',
                    'America/Cuiaba',
                    'America/Santarem',
                    'America/Porto_Velho',
                    'America/Boa_Vista',
                    'America/Manaus',
                    'America/Eirunepe',
                    'America/Rio_Branco',
                    'America/Nassau',
                    'Asia/Thimphu',
                    'Europe/Minsk',
                    'America/Belize',
                    'America/St_Johns',
                    'America/Halifax',
                    'America/Glace_Bay',
                    'America/Moncton',
                    'America/Goose_Bay',
                    'America/Blanc-Sablon',
                    'America/Toronto',
                    'America/Nipigon',
                    'America/Thunder_Bay',
                    'America/Iqaluit',
                    'America/Pangnirtung',
                    'America/Atikokan',
                    'America/Winnipeg',
                    'America/Rainy_River',
                    'America/Resolute',
                    'America/Rankin_Inlet',
                    'America/Regina',
                    'America/Swift_Current',
                    'America/Edmonton',
                    'America/Cambridge_Bay',
                    'America/Yellowknife',
                    'America/Inuvik',
                    'America/Creston',
                    'America/Dawson_Creek',
                    'America/Fort_Nelson',
                    'America/Vancouver',
                    'America/Whitehorse',
                    'America/Dawson',
                    'Indian/Cocos',
                    'Europe/Zurich',
                    'Africa/Abidjan',
                    'Pacific/Rarotonga',
                    'America/Santiago',
                    'America/Punta_Arenas',
                    'Pacific/Easter',
                    'Asia/Shanghai',
                    'Asia/Urumqi',
                    'America/Bogota',
                    'America/Costa_Rica',
                    'America/Havana',
                    'Atlantic/Cape_Verde',
                    'America/Curacao',
                    'Indian/Christmas',
                    'Asia/Nicosia',
                    'Asia/Famagusta',
                    'Europe/Prague',
                    'Europe/Berlin',
                    'Europe/Copenhagen',
                    'America/Santo_Domingo',
                    'Africa/Algiers',
                    'America/Guayaquil',
                    'Pacific/Galapagos',
                    'Europe/Tallinn',
                    'Africa/Cairo',
                    'Africa/El_Aaiun',
                    'Europe/Madrid',
                    'Africa/Ceuta',
                    'Atlantic/Canary',
                    'Europe/Helsinki',
                    'Pacific/Fiji',
                    'Atlantic/Stanley',
                    'Pacific/Chuuk',
                    'Pacific/Pohnpei',
                    'Pacific/Kosrae',
                    'Atlantic/Faroe',
                    'Europe/Paris',
                    'Europe/London',
                    'Asia/Tbilisi',
                    'America/Cayenne',
                    'Africa/Accra',
                    'Europe/Gibraltar',
                    'America/Godthab',
                    'America/Danmarkshavn',
                    'America/Scoresbysund',
                    'America/Thule',
                    'Europe/Athens',
                    'Atlantic/South_Georgia',
                    'America/Guatemala',
                    'Pacific/Guam',
                    'Africa/Bissau',
                    'America/Guyana',
                    'Asia/Hong_Kong',
                    'America/Tegucigalpa',
                    'America/Port-au-Prince',
                    'Europe/Budapest',
                    'Asia/Jakarta',
                    'Asia/Pontianak',
                    'Asia/Makassar',
                    'Asia/Jayapura',
                    'Europe/Dublin',
                    'Asia/Jerusalem',
                    'Asia/Kolkata',
                    'Indian/Chagos',
                    'Asia/Baghdad',
                    'Asia/Tehran',
                    'Atlantic/Reykjavik',
                    'Europe/Rome',
                    'America/Jamaica',
                    'Asia/Amman',
                    'Asia/Tokyo',
                    'Africa/Nairobi',
                    'Asia/Bishkek',
                    'Pacific/Tarawa',
                    'Pacific/Enderbury',
                    'Pacific/Kiritimati',
                    'Asia/Pyongyang',
                    'Asia/Seoul',
                    'Asia/Almaty',
                    'Asia/Qyzylorda',
                    'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
                    'Asia/Aqtobe',
                    'Asia/Aqtau',
                    'Asia/Atyrau',
                    'Asia/Oral',
                    'Asia/Beirut',
                    'Asia/Colombo',
                    'Africa/Monrovia',
                    'Europe/Vilnius',
                    'Europe/Luxembourg',
                    'Europe/Riga',
                    'Africa/Tripoli',
                    'Africa/Casablanca',
                    'Europe/Monaco',
                    'Europe/Chisinau',
                    'Pacific/Majuro',
                    'Pacific/Kwajalein',
                    'Asia/Yangon',
                    'Asia/Ulaanbaatar',
                    'Asia/Hovd',
                    'Asia/Choibalsan',
                    'Asia/Macau',
                    'America/Martinique',
                    'Europe/Malta',
                    'Indian/Mauritius',
                    'Indian/Maldives',
                    'America/Mexico_City',
                    'America/Cancun',
                    'America/Merida',
                    'America/Monterrey',
                    'America/Matamoros',
                    'America/Mazatlan',
                    'America/Chihuahua',
                    'America/Ojinaga',
                    'America/Hermosillo',
                    'America/Tijuana',
                    'America/Bahia_Banderas',
                    'Asia/Kuala_Lumpur',
                    'Asia/Kuching',
                    'Africa/Maputo',
                    'Africa/Windhoek',
                    'Pacific/Noumea',
                    'Pacific/Norfolk',
                    'Africa/Lagos',
                    'America/Managua',
                    'Europe/Amsterdam',
                    'Europe/Oslo',
                    'Asia/Kathmandu',
                    'Pacific/Nauru',
                    'Pacific/Niue',
                    'Pacific/Auckland',
                    'Pacific/Chatham',
                    'America/Panama',
                    'America/Lima',
                    'Pacific/Tahiti',
                    'Pacific/Marquesas',
                    'Pacific/Gambier',
                    'Pacific/Port_Moresby',
                    'Pacific/Bougainville',
                    'Asia/Manila',
                    'Asia/Karachi',
                    'Europe/Warsaw',
                    'America/Miquelon',
                    'Pacific/Pitcairn',
                    'America/Puerto_Rico',
                    'Asia/Gaza',
                    'Asia/Hebron',
                    'Europe/Lisbon',
                    'Atlantic/Madeira',
                    'Atlantic/Azores',
                    'Pacific/Palau',
                    'America/Asuncion',
                    'Asia/Qatar',
                    'Indian/Reunion',
                    'Europe/Bucharest',
                    'Europe/Belgrade',
                    'Europe/Kaliningrad',
                    'Europe/Moscow',
                    'Europe/Simferopol',
                    'Europe/Kirov',
                    'Europe/Astrakhan',
                    'Europe/Volgograd',
                    'Europe/Saratov',
                    'Europe/Ulyanovsk',
                    'Europe/Samara',
                    'Asia/Yekaterinburg',
                    'Asia/Omsk',
                    'Asia/Novosibirsk',
                    'Asia/Barnaul',
                    'Asia/Tomsk',
                    'Asia/Novokuznetsk',
                    'Asia/Krasnoyarsk',
                    'Asia/Irkutsk',
                    'Asia/Chita',
                    'Asia/Yakutsk',
                    'Asia/Khandyga',
                    'Asia/Vladivostok',
                    'Asia/Ust-Nera',
                    'Asia/Magadan',
                    'Asia/Sakhalin',
                    'Asia/Srednekolymsk',
                    'Asia/Kamchatka',
                    'Asia/Anadyr',
                    'Asia/Riyadh',
                    'Pacific/Guadalcanal',
                    'Indian/Mahe',
                    'Africa/Khartoum',
                    'Europe/Stockholm',
                    'Asia/Singapore',
                    'America/Paramaribo',
                    'Africa/Juba',
                    'Africa/Sao_Tome',
                    'America/El_Salvador',
                    'Asia/Damascus',
                    'America/Grand_Turk',
                    'Africa/Ndjamena',
                    'Indian/Kerguelen',
                    'Asia/Bangkok',
                    'Asia/Dushanbe',
                    'Pacific/Fakaofo',
                    'Asia/Dili',
                    'Asia/Ashgabat',
                    'Africa/Tunis',
                    'Pacific/Tongatapu',
                    'Europe/Istanbul',
                    'America/Port_of_Spain',
                    'Pacific/Funafuti',
                    'Asia/Taipei',
                    'Europe/Kiev',
                    'Europe/Uzhgorod',
                    'Europe/Zaporozhye',
                    'Pacific/Wake',
                    'America/New_York',
                    'America/Detroit',
                    'America/Kentucky/Louisville',
                    'America/Kentucky/Monticello',
                    'America/Indiana/Indianapolis',
                    'America/Indiana/Vincennes',
                    'America/Indiana/Winamac',
                    'America/Indiana/Marengo',
                    'America/Indiana/Petersburg',
                    'America/Indiana/Vevay',
                    'America/Chicago',
                    'America/Indiana/Tell_City',
                    'America/Indiana/Knox',
                    'America/Menominee',
                    'America/North_Dakota/Center',
                    'America/North_Dakota/New_Salem',
                    'America/North_Dakota/Beulah',
                    'America/Denver',
                    'America/Boise',
                    'America/Phoenix',
                    'America/Los_Angeles',
                    'America/Anchorage',
                    'America/Juneau',
                    'America/Sitka',
                    'America/Metlakatla',
                    'America/Yakutat',
                    'America/Nome',
                    'America/Adak',
                    'Pacific/Honolulu',
                    'America/Montevideo',
                    'Asia/Samarkand',
                    'Asia/Tashkent',
                    'America/Caracas',
                    'Asia/Ho_Chi_Minh',
                    'Pacific/Efate',
                    'Pacific/Wallis',
                    'Pacific/Apia',
                    'Africa/Johannesburg'
            ],
            	frequencies: ['Daily', 'Weekly', 'Monthly'],
            	times: [
	            	{ value: 0, title: '12 AM' },
					{ value: 1, title: '1 AM' },
					{ value: 2, title: '2 AM' },
					{ value: 3, title: '3 AM' },
					{ value: 4, title: '4 AM' },
					{ value: 5, title: '5 AM' },
					{ value: 6, title: '6 AM' },
					{ value: 7, title: '7 AM' },
					{ value: 8, title: '8 AM' },
					{ value: 9, title: '9 AM' },
					{ value: 10, title: '10 AM' },
					{ value: 11, title: '11 AM' },
					{ value: 12, title: '12 PM' },
					{ value: 13, title: '1 PM' },
					{ value: 14, title: '2 PM' },
					{ value: 15, title: '3 PM' },
					{ value: 16, title: '4 PM' },
					{ value: 17, title: '5 PM' },
					{ value: 18, title: '6 PM' },
					{ value: 19, title: '7 PM' },
					{ value: 20, title: '8 PM' },
					{ value: 21, title: '9 PM' },
					{ value: 22, title: '10 PM' },
					{ value: 23, title: '11 PM' }
				],
				week_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				month_days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                scheduled_report: {
                	name: "",
                	frequency: "Daily",
                	hour: 9,
                	week_day: "Sunday",
                	month_day: 31,
                    report_types: {
                        reputation: false,
                        seo: false,
                        geo_grid: false,
                        gmb: false,
                        review_link: false,
                        citation: false
                    },
                    timezone: "America/New_York",
                    email_addresses: []
                },

                company_name: "",

                autocompleteLocationModel: null,
                locationSearchText: null,
                searchBusinessesText: null,
                locationEntries: [],
                locationFoundItemsNew: [],
                search_location: null,

                business_location: {
                    name: "",
                    website: "",
                    keyword: ""
                },

                searchingBusinesses: false,
                typingCounter: 0
            }
        },
        methods: {
            formatDate: function(date) {
                return moment(String(date)).format('MMM DD, YYYY')
            },

            async saveScheduledReport() {
            	let self = this;

                if (!self.scheduled_report.name) return;

                if (!this.business_location) return;

                this.saving = true;

                this.scheduled_report.business_location = this.business_location;

                let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-scheduled-report', {
                    scheduled_report: self.scheduled_report
                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                self.$router.push('/local-recon/scheduled-reports');
            },

            async getReportDetails() {
                let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/scheduled-report-details/' + this.$route.params.id, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                this.scheduled_report = response.data.scheduled_report;
                this.business_location = this.scheduled_report.business_location;
                this.autocompleteLocationModel = { value: this.business_location.name };
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
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getReportDetails();
            }
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