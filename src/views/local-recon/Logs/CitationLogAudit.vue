<template>
    <div>
        <h1 class="text-lg font-semibold mb-3 mt-5">Details</h1>
        <hr class="border-b border-gray-100 mb-3">

        

        <div class="dashboard-box">
            <v-card
                class=""
                tile
            >
                <v-container class="">
                  <!-- <v-skeleton-loader type="article, article, article"></v-skeleton-loader> -->

                    <v-tabs>
                            <v-tab style="letter-spacing: 0;">Instantly Api Citaions</v-tab>
                            <v-tab style="letter-spacing: 0;">GPT Citations</v-tab>

                            <v-tab-item>

                              <v-skeleton-loader v-if = "this.instantlyfetching" type="article, article, article"></v-skeleton-loader>
                              <div v-else style="overflow-x: auto;">

                                <div v-if="instantlyCitaionError" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4" role="alert">
                                    <div class="flex">
                                      <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                      <div>
                                        <p class="font-bold">Error</p>
                                        <p class="text-sm">Insatntly Failed.</p>
                                      </div>
                                    </div>
                                </div>

                                <table v-else class="w-full rg-datatable mt-5">
                                  <thead class="border-b border-gray-100 w-full">
                                        <tr>
                                            <th>Site/Directory</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Zip/Post</th>
                                            <th>Phone</th>
                                            <th>Failed Error</th>
                                            <th>Duration</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="w-full" style="">

                                      <tr v-for="(item, index) in instantlyReconReport" :key="index">
                                          <td class="">
                                              {{ item.source }}
                                          </td>
                                                                                
                                          <td class="">
                                              <template >
                                                
                                                  <span>{{ item.business_name ? item.business_name : '-' }}</span>
                                              </template>
                                          </td>

                                          <td class="">
                                              <template >
                                                
                                                  <span>{{ item.address ? item.address : '-' }}</span>
                                              </template>
                                          </td>

                                          <td class="">
                                              <template >
                                                
                                                  <span>{{ item.postcode ? item.postcode : '-' }}</span>
                                              </template>
                                          </td>

                                          <td class="">
                                              <template >
                                                
                                                  <span>{{ item.phone_number ? item.phone_number : '-' }}</span>
                                              </template>
                                          </td>

                                          <td class="" style="width: 10%; max-width: 200px; word-wrap: break-word; white-space: normal;">
                                              <template >
                                                
                                                  <span class="" >{{ item.failed_message ? item.failed_message : '-' }}</span>
                                              </template>
                                          </td>

                                          <td>
                                            <span v-if="item.status == 'success' || item.status == 'failed'">
                                                {{ timeDifferenceCitations(item.start_time ? item.start_time : item.created, item.run_date) }}
                                            </span>
                                            <span v-else>-</span>
                                          </td>
                                          <td class="">
                                              <template >
                                                  <v-chip
                                                      v-if="item.status == 'success'"
                                                  
                                                      small
                                                      color="green lighten-5"
                                                      text-color="green lighten-1"
                                                  >
                                                      Success
                                                  </v-chip>

                                                  <v-chip
                                                      v-else-if="item.status == 'failed'"
                                                  
                                                      small
                                                      color="red lighten-5"
                                                      text-color="red lighten-1"
                                                  >
                                                      Failed
                                                  </v-chip>

                                                  <v-chip
                                                      v-else
                                                  
                                                      small
                                                      color="blue lighten-5"
                                                      text-color="blue lighten-1"
                                                  >
                                                      Pending
                                                  </v-chip>

                                              </template>
                                          </td>


                                      </tr>

                                    </tbody>
                                </table>

                              </div>


                            </v-tab-item>

                            <v-tab-item>
                              
                                <v-skeleton-loader v-if = "this.localreconfetching" type="article, article, article"></v-skeleton-loader>
                                <div v-else style="overflow-x: auto;">

                                  <div v-if="localReconCitaionError" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4" role="alert">
                                      <div class="flex">
                                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                        <div>
                                          <p class="font-bold">Error</p>
                                          <p class="text-sm">Local Recon Citaion Failed.</p>
                                        </div>
                                      </div>
                                  </div>

                                  <table v-else class="w-full rg-datatable mt-5">
                                    <thead class="border-b border-gray-100 w-full">
                                          <tr>
                                              <th>Site/Directory</th>
                                              <th>Name</th>
                                              <th>Address</th>
                                              <th>Zip/Post</th>
                                              <th>Phone</th>
                                              <th>Failed Error</th>
                                              <th>Duration</th>
                                              <th>Status</th>
                                          </tr>
                                      </thead>
                                      <tbody class="w-full" style="">

                                        <tr v-for="(item, index) in localReconReport" :key="index">
                                            <td class="">
                                                {{ item.source }}
                                            </td>
                                                                                  
                                            <td class="">
                                                <template >
                                                  
                                                    <span>{{ item.business_name ? item.business_name : '-' }}</span>
                                                </template>
                                            </td>

                                            <td class="">
                                                <template >
                                                  
                                                    <span>{{ item.address ? item.address : '-' }}</span>
                                                </template>
                                            </td>

                                            <td class="">
                                                <template >
                                                  
                                                    <span>{{ item.postcode ? item.postcode : '-' }}</span>
                                                </template>
                                            </td>

                                            <td class="">
                                                <template >
                                                  
                                                    <span>{{ item.phone_number ? item.phone_number : '-' }}</span>
                                                </template>
                                            </td>

                                            <td class="" style="width: 10%; max-width: 200px; word-wrap: break-word; white-space: normal;">
                                                <template >
                                                  
                                                    <span class="" >{{ item.failed_message ? item.failed_message : '-' }}</span>
                                                </template>
                                            </td>

                                            <td>
                                                <span v-if="item.status == 'success' || item.status == 'failed'">
                                                    {{ timeDifferenceCitations(item.created_at,item.updated_at) }}
                                                    <!-- {{ timeDifferenceCitations(item.start_time ? item.start_time : item.created_at, item.updated_at) }} -->
                                                </span>
                                                <span v-else>-</span>
                                            </td>
                                            <td class="">
                                                <template >
                                                    <v-chip
                                                        v-if="item.status == 'success'"
                                                    
                                                        small
                                                        color="green lighten-5"
                                                        text-color="green lighten-1"
                                                    >
                                                        Success
                                                    </v-chip>

                                                    <v-chip
                                                        v-else-if="item.status == 'failed'"
                                                    
                                                        small
                                                        color="red lighten-5"
                                                        text-color="red lighten-1"
                                                    >
                                                        Failed
                                                    </v-chip>

                                                    <v-chip
                                                        v-else
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                      {{formatText(item.status)}}
                                                    </v-chip>

                                                </template>
                                            </td>


                                        </tr>

                                      </tbody>
                                  </table>

                                </div>


                            </v-tab-item>
                            
                    </v-tabs>
                </v-container>
            </v-card>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import moment from 'moment-timezone'
  export default {
    name: 'CitationLogAudit',
    props: {
      report: {
        type: Object,
        required: true
      }
    },
    computed: {
      
    },
    data() {
      return {
        localReconCitaionError:false,
        instantlyCitaionError:false,
        localreconfetching:false,
        instantlyfetching:false,
        localReconReport: '',
        instantlyReconReport: '',
      }
    },
    methods: {
        async fetchLrCitationReport(){
            const lrReportId = this.report.properties.citations.lr_citations_report_id;
            this.localreconfetching = true;
            const lrReportResponse = await axios.get(process.env.VUE_APP_API_ENDPOINT + `/citation-tracker/get-all-network`, {
            //   const lrReportResponse = await axios.get(`https://localreconapi.ravu.me/citation-tracker/get-all-network`, {
                  params: {
                      report_id: lrReportId,
                  },

              });
            
              if(lrReportResponse.data.status == 'error'){
                  this.localReconCitaionError = true;
                  this.localreconfetching = false;
              }else{
                this.localReconReport = lrReportResponse.data.report;
                this.localreconfetching = false;
              }
             
        },

        async fetchInstantlyCitationReport(){
            this.instantlyfetching = true;
            const instantlyReportId = this.report.properties.citations.instantly_citations_report_id;
            const instantlyUrl = process.env.NODE_ENV === 'production' ? 'https://api.instantlyapi.com' : 'http://localhost:3000';
            // const instantlyUrl = process.env.NODE_ENV != 'production' ? 'https://api.instantlyapi.com' : 'http://localhost:3000';

              const instantlyReportResponse = await axios.get(instantlyUrl + `/citation-tracker/get-all-network`, {
                  params: {
                      report_id: instantlyReportId,
                  },

              });

             
              if(instantlyReportResponse.data.report.length == 0){
                  this.instantlyCitaionError = true;
                  this.instantlyfetching = false;
              }else{
                this.instantlyReconReport = instantlyReportResponse.data.report;
                this.instantlyfetching = false;
              }

        },

        formatText(text) {
            return text ? text.replace(/_/g, ' ') : '';
        },

        timeDifferenceCitations(createdtime,updatedtime) {

            const created = moment(createdtime);
            const updated = moment(updatedtime);

            const duration = moment.duration(updated.diff(created));

            if (duration.minutes() === 0) {
                return `${duration.seconds()} sec`;
            } else {
                return `${duration.minutes()} min ${duration.seconds()} sec`;
            }
        },
    },
    
    created(){
      this.fetchLrCitationReport();
      this.fetchInstantlyCitationReport();
    }
  };
  </script>
