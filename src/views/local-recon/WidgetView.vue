<template>

    <panel-navigation>

        <div class="float-right ml-5 -mt-1">
        
        <div class="justify-between items-start mb-3 float-right ml-3" style="margin-top: -6px;">
            <v-menu
            bottom
            left
            >
            <template v-slot:activator="{ on, attrs }">
                <div
                v-bind="attrs"
                v-on="on"
                class="border-1 border-grey bg-white text-grey text-xs text-bold px-4 py-2 rounded cursor-pointer cursor-pointer" style="padding-top: 9px !important; padding-bottom: 9px !important;">
                    <span class="mr-2">Actions</span>
                    <span class="text-xs" style="padding-top: 3px;">
                        <font-awesome-icon icon="chevron-down"  />
                    </span>
                </div>
            </template>

            <v-list class="table-menu-actions">
                <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid)"><span class="table-menu-action-icon"><i class="fa fa-edit"></i></span> Edit</a></v-list-item-title></v-list-item>
                <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid + '/embed')"><span class="table-menu-action-icon"><i class="fa fa-code"></i></span> Get Code</a></v-list-item-title></v-list-item>
                <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid)"><span class="table-menu-action-icon"><i class="fa fa-eye"></i></span> View</a></v-list-item-title></v-list-item>
                <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="deleteWidget(widget)"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
            </v-list>
            </v-menu>
        </div>
        
        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_widgets'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
        </div>
  
        <h1 v-if="fetchingData" class="text-lg font-semibold mb-3">Widget Details</h1>

        <h1 v-if="!fetchingData && widget" class="text-lg font-semibold mb-3">{{ widget.name }}</h1>
  
        <hr class="border-b border-gray-100 mb-3">
  
        <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

        <div class="-mx-2" v-if="!fetchingData">
            <div class="flex flex-row flex-wrap mb-4" style="align-items: stretch; flex-wrap: wrap;">
                <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                <v-card
                    class="pa-2"
                    tile
                    style="height: 100%;"
                >
                    <div class="p-3">
                        <img :src="require('@/assets/images/widget-templates/local-recon/' + widget.type + '.png')" style="width: 100%;" />

                        <div style="float: left;">
                            
                        </div>

                        <div style="clear: both;"></div>
                    </div>
                </v-card>
                </div>

                <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                <v-card
                    class="pa-2"
                    tile
                    style="height: 100%;"
                >
                    <div class="p-3">
                        <div class="flex flex-row flex-wrap mb-4">
                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <i class="mdi mdi-cogs" style="font-size: 40px;"></i>
                            </div>
                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <div style="font-size: 14px; padding-top: 5px;">
                                    <strong style="font-size: 26px;">{{  widget.reports_count }}</strong>
                                    <br />
                                    Reports
                                </div>
                            </div>

                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <div style="font-size: 14px; padding-top: 5px;">
                                    <strong style="font-size: 26px;">{{  widget.leads_count }}</strong>
                                    <br />
                                    Leads
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row flex-wrap mb-4" style="padding-top: 20px;">
                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <i class="mdi mdi-account-multiple" style="font-size: 40px;"></i>
                            </div>

                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <div style="font-size: 14px; padding-top: 5px;">
                                    <strong style="font-size: 26px;">{{  widget.leads_help_requests_count }}</strong>
                                    <br />
                                    Help Requests
                                </div>
                            </div>

                            <div class="w-full px-2 md:w-1/3 lg:w-1/3">
                                <div style="font-size: 14px; padding-top: 5px;">
                                    <strong style="font-size: 26px;">{{  widget.leads_help_optins_count }}</strong>
                                    <br />
                                    Opt-Ins
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
                </div>

                <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                <v-card
                    class="pa-2"
                    tile
                    style="height: 100%;"
                >
                    <div class="p-3" style="padding-bottom: 18px !important;">
                        <div class="dashboard-box-title">Quick Actions</div>
                        
                        <table style="width: 100%; font-size: 14px; line-height: 40px; margin-left: 15px;">
                            <tr>
                                <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid + '/embed')">Get Code</a></th>
                            </tr>
                            <tr>
                                <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid)">View Widget</a></th>
                            </tr>
                            <tr>
                                <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="$router.push('/local-recon/widgets/edit/' + widget.uuid)">Edit Widget</a></th>
                            </tr>
                        </table>

                    </div>
                </v-card>
                </div>
            </div>

            <div class="flex flex-row flex-wrap mb-4" style="align-items: stretch; flex-wrap: wrap;">
                <div class="dashboard-box  stats-box w-full px-2">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <apexchart height="250" type="line" :options="options" :series="series" :key="chartKey"></apexchart>
                        </div>
                    </v-card>
                </div>
            </div>

            <div class="flex flex-row flex-wrap mb-4" style="align-items: stretch; flex-wrap: wrap;">
                <div class="dashboard-box  stats-box w-full px-2">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <div class="w-full mb-4">
                                <v-tabs>
                                    <v-tab>Reports</v-tab>
                                    <v-tab>Leads</v-tab>

                                    <v-tab-item>
                                        <div v-if="widget.searches.length == 0">
                                        <br /><br /><br /><br />

                                        <div class="dashboard-box-iconsquare">
                                        <div class="dashboard-box-icon-background"></div>
                                        <div class="dashboard-box-icon">
                                            <i class="mdi mdi-account-multiple"></i>
                                        </div>
                                        </div>

                                        <div style="text-align: center;">
                                            <div class="pt-2 pb-2">
                                                <strong>No Reports Yet</strong>
                                            </div>
                                        </div>
                                        
                                        <br /><br /><br /><br /><br />
                                    </div>

                                    <div v-else>

                                    <table class="w-full rg-datatable mt-4">
                                        <thead class="border-b border-gray-100 w-full">
                                        <tr>
                                            <th>Business</th>
                                            <th>Location/Keyword</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody class="w-full" style="">
                                        <tr v-for="search in widget.searches" :key="search.id">
                                            <td>
                                            <span v-if="search.search_type == 'grid_tracker_scan'">
                                                <a href="javascript: void(0);" @click="openSearchReport(search)">{{ search.properties.location.name }}</a>
                                            </span>
                                            <span v-else>
                                                <a href="javascript: void(0);" @click="openSearchReport(search)">{{ search.keyword }}</a>
                                            </span>
                                            </td>
                                        <td>
                                            <span v-if="search.search_type == 'grid_tracker_scan'">
                                            {{ search.keyword }}
                                            </span>
                                            <span v-else>
                                            {{ search.properties.formatted_address || "-" }}
                                            </span>
                                        </td>
                                        <td>{{ formatDate(search.created_at) }}</td>
                                            <td style="text-align: right;">
                                                <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="openSearchReport(search)">
                                                    <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                    <span class="whitespace-no-wrap text-blue">View REPORT</span>
                                                </a>

                                                <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer ml-6" v-clipboard:copy="getSearchReportUrl(search)" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                                    <i class="fa mdi mdi-text-box-outline mr-2 text-blue"></i>
                                                    <span class="whitespace-no-wrap text-blue">Copy REPORT</span>
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div class="clearfix"></div>
                                    </div>
                                    </v-tab-item>
                                    
                                    <v-tab-item>
                                        <div v-if="widget.leads.length == 0">
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

                                    <div v-else>

                                    <table class="w-full rg-datatable mt-4">
                                        <thead class="border-b border-gray-100 w-full">
                                        <tr>
                                            <th>Lead Details</th>
                                            <th>Business</th>
                                            <th>Address</th>
                                            <th>Added Via</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody class="w-full" style="">
                                        <tr v-for="lead in widget.leads" :key="lead.id">
                                            <td>
                                            <div v-if="lead.first_name || lead.last_name">
                                                <router-link :to="'/local-recon/lead/' + lead.id">{{ lead.first_name }} {{ lead.last_name }}</router-link>
                                            </div>
                                            <a :href="'mailto:' + lead.email">{{ lead.email }}</a>
                                        </td>
                                        <td>{{ lead.company_name || "-" }}</td>
                                        <td>{{ getLeadAddress(lead) }}</td>
                                        <td>{{ ((lead.optin_type == 'view_gate') ? "Optin" : ((lead.optin_type == 'webhook') ? "Webhook" : "Help Request")) }}</td>
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

                                    <div class="clearfix"></div>
                                    </div>
                                    </v-tab-item>
                                </v-tabs>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
      
    </panel-navigation>
  
  </template>
  
  <script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import urlParser from 'url-parse'
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import Editable from '@/components/common/Editable';
  import ColorPicker from '@/components/common/ColorPicker.vue'
  import moment from 'moment'

  export default {
    metaInfo () {
      return {
        title: "Widgets Edit | " + this.$appName
      }
    },
    components: {
      PanelNavigation,
      Editable,
      ColorPicker
    },
    data () {
      return {
        fetchingData: true,
        widget: null,

        widget_templates: [
              {
                  type: "default",
                  name: "Reputation Report"
              },
              {
                  type: "seo-audit",
                  name: "SEO Audit"
              },
              {
                  type: "grid-tracker",
                  name: "Grid Tracker"
              },
              {
                  type: "review-response-generator",
                  name: "Review Responses"
              },
                {
                    type: "gmb-audit",
                    name: "GBP Audit"
                },
              {
                  type: "reputation-revenue-calculator",
                  name: "Reputation Revenue Calculator"
              },
              {
                  type: "customer-retention-calculator",
                  name: "Customer Retention Calculator"
              },
              {
                  type: "star-rating-calculator",
                  name: "Star Rating Calculator"
              }
          ],

          options: {
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
            series: [],

            chartKey: 0
      }
    },
    computed: {
      ...mapState({
        me: state => state.me.me,
        profile: state => state.me.profile
      })
    },
    methods: {
        getWidget: async function() {
          try {
              let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/get-widget/' + this.$route.params.token, {
                detail_page: 1
              } , {
              headers: {
                  'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              },
              })
              
              this.widget = response.data.widget
  
              if (!this.widget.properties.current_google_rating)
                  this.widget.properties.current_google_rating = 1;
  
              if (!this.widget.properties.current_number_of_google_reviews)
                  this.widget.properties.current_number_of_google_reviews = 15;
  
              if (!this.widget.properties.desired_google_rating)
                  this.widget.properties.desired_google_rating = 1;
  
              if (!this.widget.properties.negative_reviews_per_year)
                  this.widget.properties.negative_reviews_per_year = 10;
  
              if (!this.widget.properties.percentage_of_complaints)
                  this.widget.properties.percentage_of_complaints = 5;
  
              if (!this.widget.properties.customer_lifetime_value)
                  this.widget.properties.customer_lifetime_value = 10000;
  
              if (!this.widget.properties.number_of_local_business_clients)
                  this.widget.properties.number_of_local_business_clients = 30;
  
              if (!this.widget.properties.average_monthly_fee)
                  this.widget.properties.average_monthly_fee = 250;
  
              if (!this.widget.properties.percentage_of_clients_upsell)
                  this.widget.properties.percentage_of_clients_upsell = 35;
  
              if (!this.widget.properties.upsell_monthly_revenue)
                  this.widget.properties.upsell_monthly_revenue = 350;
  
              if (!this.widget.properties.titles_color)
                  this.widget.properties.titles_color = "#7F7F7F";
              
              if (!this.widget.properties.sliders_color)
                  this.widget.properties.sliders_color = "#EC407A";
              
              if (!this.widget.properties.result_background_color)
                  this.widget.properties.result_background_color = "#2A73FF";
              
              if (!this.widget.properties.result_text_color)
                  this.widget.properties.result_text_color = "#FFFFFF";
              
              if (!this.widget.properties.currency)
                  this.widget.properties.currency = "USD";
              
              if (!this.widget.properties.currency_display_position)
                  this.widget.properties.currency_display_position = "Before Amount";
              
              this.widget.properties.you_need_reviews = this.youNeedReviews();
  
              this.widget.properties.calculated_revenue = this.calculatedRevenue();
  
              this.calculateDdrMrrArr();

              // Apply custom CSS
              if (this.widget.properties.custom_css) {
                if (document.getElementById("lr-widget-custom-css-sheet") === null) {
                    var styleSheet = document.createElement("style")
                    styleSheet.type = "text/css"
                    styleSheet.innerText = this.widget.properties.custom_css.replace(/\n/g, " ")
                    styleSheet.id = 'lr-widget-custom-css-sheet';
                    document.body.appendChild(styleSheet);
                }
                else {
                    document.getElementById("lr-widget-custom-css-sheet").innerText = this.widget.properties.custom_css.replace(/\n/g, " ");
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
  
              // alert(this.widget.properties.calculated_revenue);

              console.log('response.data.chart_data.labels', response.data.chart_data.labels)
              console.log('response.data.chart_data.datasets', response.data.chart_data.datasets)

              this.options.xaxis.categories = response.data.chart_data.labels;
              this.options.xaxis.series = [];

              for (var url in response.data.chart_data.datasets) {
                this.series.push({
                    name: url,
                    data: response.data.chart_data.datasets[url]
                });
              }

              this.chartKey++;
  
              this.fetchingData = false
              console.log(this.widget)
          }catch(e){
              console.log(e)
          }
      },
      youNeedReviews_delayed() {
          let self = this;
          setTimeout(function() {
              self.youNeedReviews();
          }, 30);
      },
      youNeedReviews() {
          console.log('run2')
          // Initial input, grab these from the user entered data
          let current_google_rating=parseFloat(this.widget.properties.current_google_rating);
          let current_number_of_google_reviews=parseFloat(this.widget.properties.current_number_of_google_reviews);
          let desired_google_rating=parseFloat(this.widget.properties.desired_google_rating);
  
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
      calculatedRevenue_delayed() {
          let self = this;
          setTimeout(function() {
              self.calculatedRevenue();
          }, 30);
      },
      calculatedRevenue() {
          let self = this
          let revenue = (this.widget.properties.negative_reviews_per_year * this.widget.properties.percentage_of_complaints) * (this.widget.properties.customer_lifetime_value/100);
          revenue = Math.ceil(revenue);
  
          console.log('revenue', revenue)
  
          // revenue = this.widget.properties.currency + ' ' + revenue;
  
          revenue = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + revenue + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
          
          try {
              document.querySelector("#lr_calculated_revenue").innerHTML = this.numberWithCommas(revenue);
          }
          catch (e) {}
  
          return revenue;
      },
      calculateDdrMrrArr_delayed() {
          let self = this;
          setTimeout(function() {
              self.calculateDdrMrrArr();
          }, 30);
      },
      calculateDdrMrrArr() {
          let self = this;
  
          let ddr = 0;
          let mrr = 0;
          let arr = 0;
  
          let upsell_clients_nr = (this.widget.properties.percentage_of_clients_upsell/100) * this.widget.properties.number_of_local_business_clients;
  
          mrr = (this.widget.properties.number_of_local_business_clients * this.widget.properties.average_monthly_fee) +
              (upsell_clients_nr * this.widget.properties.upsell_monthly_revenue);
  
          mrr = Math.ceil(mrr);
          ddr = Math.ceil((mrr * 12)/366);
          arr = Math.ceil(mrr * 12);
  
          try {
              setTimeout(function() {
                  document.querySelector("#lr_calculated_ddr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(ddr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
                  document.querySelector("#lr_calculated_mrr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(mrr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
                  document.querySelector("#lr_calculated_arr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(arr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
              }, 1);
          }
          catch (e) {}
      },
      numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      getEmbedCode: function() {
          let self = this
  
          let url = ((process.env.NODE_ENV == 'development') ? "http://localhost:8002" : "https://" + window.location.host) + "/js/v1/embed.js?token=" + self.$route.params.token;
  
          // Dev
          if (process.env.NODE_ENV == 'development') {
              url = url + "&env=dev";
          }
  
          return url;
      },
      async deleteWidget(widget) {
        await this.$store.dispatch('local_recon_widgets/delete', widget.id)
        this.$store.dispatch('local_recon_widgets/fetch', { dashboard: false })

        this.$router.push('/local-recon/widgets');
      
        },
        formatDate: function(date) {
            return moment(String(date)).format('MMM DD, YYYY')
        },
        formatTemplate: function(template) {
            if (template == 'default')
                return "Business Audit Widget";

            return template.replace("-", " ");
        },
        openSearchReport(search) {
            window.open(window.location.origin + '/rf?s=' + this.widget.uuid + '&p=' + search.place_id);
        },
        
        getSearchReportUrl(search) {
            return window.location.origin + '/rf?s=' + this.widget.uuid + '&p=' + search.place_id;
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
        openLeadReport(lead) {
            window.open(window.location.origin + '/rf?s=' + lead.search.widget.uuid + '&p=' + lead.search.place_id);
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
    },
    created() {
      this.getWidget()
  
      
    },
      watch: {

      }
  }
  </script>
  
  <style scoped>
    
  </style>