<template>
    <div>
        <div>
            <h2 class="text-lg font-semibold mb-3 mt-5">Api Details</h2>
            <hr class="border-b border-gray-100 mb-3">

            

            <div class="dashboard-box">
                <v-card
                    class=""
                    tile
                >
                    <v-container class="">
                            <table class="table table-bordered" >
                                <tbody>
                                    <tr>
                                        <th scope="row" class="text-left">Api</th>
                                        <td> <strong> Status </strong></td>
                                        <td> <strong> Start Time </strong></td>
                                        <td> <strong> End TIme </strong></td>
                                        <td> <strong> Duration </strong></td>
                                    </tr>

                                    <tr>
                                        <th scope="row" class="text-left">Google Extract (Instantly Api):</th>
                                        <td class="text-left text-capitalize">
                                            <span>
                                                <v-chip
                                                        v-if="this.googleExtractStatus == 'success'"
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                        completed
                                                    </v-chip>

                                                    <v-chip
                                                        v-else
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                    {{ formatText(this.googleExtractStatus) }}
                                                    </v-chip>
                                            </span>
                                        </td>
                                        <td class="">
                                             {{ this.report.properties.competitors_start_time ? formattedDate(this.report.properties.competitors_start_time) : '-' }}

                                        </td>

                                        <td> 
                                            <span v-if ="formatText(this.googleExtractStatus) == 'completed' || this.googleExtractStatus == 'success'">
                                                {{ this.report.properties.competitors_end_time ? formattedDate(this.report.properties.competitors_end_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        
                                        <td> 
                                            <span v-if ="formatText(this.googleExtractStatus) == 'completed' || this.googleExtractStatus == 'success'">
                                                {{ this.report.properties.competitors_fetching_time ? formattedTime(this.report.properties.competitors_fetching_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        <th scope="row" class="text-left">Google Review Api (Instantly Api):</th>
                                        <td class="text-left text-capitalize">
                                            <span>
                                                <v-chip
                                                        v-if="this.googleReviewStatus == 'success'"
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                        Success
                                                    </v-chip>

                                                    <v-chip
                                                        v-else
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                    {{ formatText(this.googleReviewStatus) }}
                                                    </v-chip>
                                            </span>
                                        </td>

                                        <td class=""> {{ this.report.properties.reviews_start_time ? formattedDate(this.report.properties.reviews_start_time) : '-' }}</td>

                                        <td> 
                                            <span v-if ="formatText(this.googleReviewStatus) == 'completed' || formatText(this.googleReviewStatus) == 'failed'">
                                                {{ this.report.properties.reviews_end_time ? formattedDate(this.report.properties.reviews_end_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        
                                        <td> 
                                            <span v-if ="formatText(this.googleReviewStatus) == 'completed'  || formatText(this.googleReviewStatus) == 'failed'">
                                                {{ this.report.properties.reviews_fetching_time ? formattedTime(this.report.properties.reviews_fetching_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row" class="text-left">Google Posts Api (Instantly Api):</th>
                                        <td class="text-left text-capitalize">
                                            <span>
                                                <v-chip
                                                        v-if="this.googlePostStatus == 'success'"
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                        Success
                                                    </v-chip>

                                                    <v-chip
                                                        v-else
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                    {{ formatText(this.googlePostStatus) }}
                                                    </v-chip>
                                            </span>
                                        </td>

                                        <td class=""> {{ this.report.properties.posts_start_time ? formattedDate(this.report.properties.posts_start_time) : '-' }}</td>


                                        <td> 
                                            <span v-if ="formatText(this.googlePostStatus) == 'completed' || formatText(this.googlePostStatus) == 'failed'">
                                                {{ this.report.properties.posts_end_time ? formattedDate(this.report.properties.posts_end_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        
                                        <td> 
                                            <span v-if ="formatText(this.googlePostStatus) == 'completed' || formatText(this.googlePostStatus) == 'failed'">
                                                {{ this.report.properties.posts_fetching_time ? formattedTime(this.report.properties.posts_fetching_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope="row" class="text-left">Citations Api (Instantly Api):</th>
                                        <td class="text-left text-capitalize">
                                            <span>
                                                <v-chip
                                                        v-if="this.googleCitationStatus == 'success'"
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                        Success
                                                    </v-chip>

                                                    <v-chip
                                                        v-else
                                                    
                                                        small
                                                        color="blue lighten-5"
                                                        text-color="blue lighten-1"
                                                    >
                                                    
                                                    <!-- {{ formatText(this.googleCitationStatus) }} -->
                                                    {{ googleCitationStatus === 'completed' ? googleCitationStatus : 'Processing' }}
                                                    </v-chip>
                                            </span>
                                        </td>
                                        <td class=""> {{ this.report.properties.citations_start_time ? formattedDate(this.report.properties.citations_start_time) : '-' }}</td>



                                        <td> 
                                            <span v-if ="googleCitationStatus === 'completed'">
                                                {{ this.report.properties.citations_end_time ? formattedDate(this.report.properties.citations_end_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                        
                                        <td> 
                                            <span v-if ="googleCitationStatus === 'completed'">
                                              
                                                {{ this.report.properties.citations_end_time ? timeDifference(this.report.properties.citations_start_time,this.report.properties.citations_end_time) : '-' }}
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                    </v-container>
                </v-card>
            </div>
        </div>


        <div v-if="this.report.properties.competitors != 'pending'" class="mt-5">
            <h2 class="text-lg font-semibold mb-3 mt-5">Citations Logs</h2>
            <hr class="border-b border-gray-100 mb-3">
           
            <div class="dashboard-box">
                <v-card
                    class=""
                    tile
                >
                    <v-container class="">
                            <!-- CITATION Logs -->

                            <v-tabs>
                                <v-tab v-for="(item, index) in report.properties.competitors.list" :key="index" style="letter-spacing: 0;">
                                    {{ item.name }}
                                </v-tab>
                            

                           
                                <v-tab-item v-for="(item, index) in report.properties.competitors.list" :key="index">
                                   
                                    <div v-if="!item.citations_report_id  && !item.instantly_citations_report_id || item.citations_status === 'Error occured'">
                                        <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4" role="alert">
                                            <div class="flex">
                                            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                            <div>
                                                <p class="font-bold">Error Occured</p>
                                                <p class="text-sm">Failed to add citations.</p>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                       
                                        <v-skeleton-loader v-if = "instantlyfetching[index]" type="article, article, article"></v-skeleton-loader>
                                        
                                        <div v-else style="overflow-x: auto;">

                                            <table class="w-full rg-datatable mt-5">
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

                                                <tr v-for="(item, index) in instantlyReconReport[index]" :key="index">
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
                                                                color="blue lighten-5"
                                                                text-color="blue lighten-1"
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
                                    </div>
                                </v-tab-item>
                            
                            </v-tabs>

                    </v-container>
                </v-card>
            </div>
        </div>
    </div>

  </template>
  
  <script>
  import axios from 'axios'
  import moment from 'moment-timezone'
  export default {
    name: 'GMBLogAudit',
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
        localReconReport: '',
        googleExtractStatus:'',
        googleReviewStatus:'',
        googlePostStatus:'',
        googleCitationStatus:'',
        instantlyfetching: new Array(this.report.properties.competitors.list.length).fill(true),
        instantlyReconReport: new Array(this.report.properties.competitors.list.length).fill([]),
      }
    },
    methods: {
        async fetchLrCitationReport(lrReportId, index){

            const lrReportResponse = await axios.get(process.env.VUE_APP_API_ENDPOINT + `/citation-tracker/get-all-network`, {
                // const lrReportResponse = await axios.get(`https://localreconapi.ravu.me/citation-tracker/get-all-network`, {
                  params: {
                      report_id: lrReportId,
                  },

              });
            
              if (lrReportResponse.data.report.length > 0) {
                   
                    const currentReport = this.instantlyReconReport[index] || [];  
                    const newReportData = lrReportResponse.data.report;
                
                    const combinedReportData = currentReport.concat(newReportData);

                   
                    this.$set(this.instantlyReconReport, index, combinedReportData);
                    this.$set(this.instantlyfetching, index, false);  
                } else {
                    this.$set(this.instantlyfetching, index, false);  
                }
             
        },

        async fetchInstantlyCitationReport(citation_id, index) {
            
            this.$set(this.instantlyfetching, index, true);

            let instantlyReportId = citation_id;
            let instantlyUrl = process.env.NODE_ENV === 'production' ? 'https://api.instantlyapi.com' : 'http://localhost:3000';
            // let instantlyUrl = process.env.NODE_ENV != 'production' ? 'https://api.instantlyapi.com' : 'http://localhost:3000';

            try {
                let instantlyReportResponse = await axios.get(instantlyUrl + `/citation-tracker/get-all-network`, {
                    params: {
                        report_id: instantlyReportId,
                    },
                });

                
                if (instantlyReportResponse.data.report.length === 0) {
                    this.$set(this.instantlyfetching, index, false);
                } else {
                 
                    this.$set(this.instantlyReconReport, index, instantlyReportResponse.data.report);
                     this.$set(this.instantlyfetching, index, false);
                 
                }
            } catch (error) {
                this.$set(this.instantlyfetching, index, false);  
            }
        },

        fetchinstantlyAllReport() {
            
            for (let i = 0; i < this.report.properties.competitors.list.length; i++) {                  
                let item = this.report.properties.competitors.list[i];
                if(item.citations_report_id || item.citations_status != 'Error occured'){
                    let citation_id = item.citations_report_id ? item.citations_report_id : item.instantly_citations_report_id;
                    this.fetchInstantlyCitationReport(citation_id, i);
                }
                
                // Check if lr_citations_report_id exists, then fetch from LocalRecon API
                    if (item.lr_citations_report_id) {

                        this.fetchLrCitationReport(item.lr_citations_report_id, i);
                    }
            }
        },


        fetchGoogleExtractStatus(){
            if ('competitors_list_status' in this.report.properties) {
                const competitorsList = this.report.properties.competitors.list;
                const allAppointmentsExist = [0, 1, 2, 3].every(index => 
                    competitorsList[index] && 'appointments' in competitorsList[index]
                );

                if (!allAppointmentsExist && this.report.properties.competitors.status == 'completed') {
                    this.googleExtractStatus = 'failed';
                }else{
                    this.googleExtractStatus = this.report.properties.competitors_list_status;
                }

            } else {
                const competitorsList = this.report.properties.competitors.list;
                const allAppointmentsExist = [0, 1, 2, 3].every(index => 
                    competitorsList[index] && 'appointments' in competitorsList[index]
                );

                if (allAppointmentsExist) {
                    this.googleExtractStatus = 'success';
                } else {
                if(this.report.properties.competitors.status == 'completed'){
                        this.googleExtractStatus = 'failed';
                }else{
                        this.googleExtractStatus = 'processing';
                }
                }
            }
        },

        fetchGoogleReviewStatus(){
            if ('reviews_status' in this.report.properties) {
                this.googleReviewStatus =  this.report.properties.reviews_status;
            }else{
                let createdAt = this.report.created_at;
               if (this.report.properties.reviews.status === 'Error Occured' && this.isMoreThanSixMinutesOld(createdAt)) {
                    this.googleReviewStatus = 'failed';
                } else {
                    this.googleReviewStatus = this.report.properties.reviews.status;
                }
            }
        },
        fetchGooglePostStatus(){
            if ('posts_status' in this.report.properties) {
                this.googlePostStatus =  this.report.properties.posts_status;
            }else{
               let createdAt = this.report.created_at;
               if (this.report.properties.posts.status === 'Error Occured' && this.isMoreThanSixMinutesOld(createdAt)) {
                    this.googlePostStatus = 'failed';
                } else {
                    this.googlePostStatus = this.report.properties.posts.status;
                }
            }
        },
        fetchGoogleCitationStatus(){
            if ('competitors_status' in this.report.properties) {
                this.googleCitationStatus =  this.report.properties.competitors_status;
            }else{
               this.googleCitationStatus =  this.report.properties.competitors.status;
            }
        },
        formatText(text) {
                return text ? text.replace(/_/g, ' ') : '';
        },
        formattedDate(timestamp) {
            
             return moment.unix(timestamp).format('MMM D, YYYY h:mm A');

        },
        formattedTime(durationsecond) {
            const duration = moment.duration(durationsecond, 'seconds');
            
            const minutes = Math.floor(duration.asMinutes()); 
            const seconds = duration.seconds(); 
            if (minutes === 0) {
                return `${seconds}s`;
            }
            return `${minutes}m ${seconds}s`;
        },
        timeDifference(citationsStartTime,citationsEndTime) {
           
            if (citationsStartTime && citationsEndTime) {
                const startTime = moment.unix(citationsStartTime); 
                const endTime = moment.unix(citationsEndTime);     
                
               
                const differenceInSeconds = endTime.diff(startTime, 'seconds');
                
                
                const duration = moment.duration(differenceInSeconds, 'seconds');
                const minutes = Math.floor(duration.asMinutes());
                const seconds = duration.seconds();

                
                return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
            }
            return 'Invalid time';
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
        isMoreThanSixMinutesOld(createdAt) {
            const currentTime = new Date();
            const createdTime = new Date(createdAt);
            const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); // Convert milliseconds to minutes
            return differenceInMinutes > 6;
        }
    },

    created(){
        // googleExtractStatus
        
       
        this.fetchGoogleExtractStatus();
        this.fetchGoogleReviewStatus();
        this.fetchGooglePostStatus();
        this.fetchGoogleCitationStatus();
        this.fetchinstantlyAllReport()
    }
  };
  </script>
