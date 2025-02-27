<template>

    <panel-navigation>
  
        <div class="float-right ml-5 -mt-1">
          <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'admin_local_recon_reports'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
        </div>
  
      <h1 class="text-lg font-semibold mb-3">Report Log</h1>
  
      <hr class="border-b border-gray-100 mb-3">
  
        <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>
  
        <div v-if="!fetchingData" class="dashboard-box">
            <v-card
                class=""
                tile
            >
                <div class="">
                    
                    <v-container v-if = "report">
                        <table class="table table-bordered" >
                            <tbody>
                                <tr>
                                    <th scope="row" class="text-left">Bussiness:</th>
                                    <td class="text-left text-capitalize">
                                         <span v-if="report.search_type == 'grid_tracker_scan'">
                                            {{ report.properties.location.name }}
                                         </span>
                                         <span v-else>
                                            {{ report.keyword }}
                                         </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" class="text-left">User Email:</th>
                                    <td class="text-left ">
                                         <span >
                                            {{ report.user.email }}
                                         </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" class="text-left">Report Type:</th>
                                    <td class="text-left text-capitalize">
                                         <span >
                                            {{  report.search_type.replace("gmb", "gbp").replace(/\_/g, ' ')  }}
                                         </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" class="text-left">Report Created At:</th>
                                    <td class="text-left text-capitalize">
                                         <span >
                                            {{  formatDateWithTime(report.created_at)  }}
                                         </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" class="text-left">Report Updated At:</th>
                                    <td class="text-left text-capitalize">
                                         <span >
                                            {{  formatDateWithTime(report.updated_at)  }}
                                         </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" class="text-left">Report Current Status:</th>
                                    <td class="text-left text-capitalize">
                                         <div v-if = "report.search_type == 'citation_audit'">
                                            <span>{{ formatText(report.properties.citations.status) }}</span>
                                         </div>

                                         <div v-else-if = "report.search_type == 'gmb_audit'">
                                            <span v-if="report.properties.gmb_overall_status">
                                                <v-chip small color="red lighten-5"text-color="red lighten-1">
                                                    Failed
                                                </v-chip>
                                            </span>
                                            <span v-else>
                                                <v-chip small color="blue lighten-5" text-color="blue lighten-1">
                                                    {{
                                                    (report.properties.competitors.status === 'completed' && 
                                                        isMoreThanSixMinutesOld(report.created_at) && 
                                                        (report.properties.reviews.status === 'completed' || report.properties.reviews.status === 'Error Occurred' ||
                                                        report.properties.posts.status === 'completed' || report.properties.posts.status === 'Error Occurred')
                                                    ) || (
                                                        report.properties.reviews.status === 'completed' &&
                                                        report.properties.posts.status === 'completed' &&
                                                        report.properties.competitors.status === 'completed'
                                                    )
                                                    ? 'completed'
                                                    : 'processing'
                                                    }}
                                                </v-chip>
                                                </span>

                                         </div>
                                    </td>
                                </tr>

                                <tr v-if = "this.reportStatus">
                                    <th scope="row" class="text-left">Report Status:</th>
                                    <td class="text-left text-capitalize">
                                         <div >
                                                <v-chip
                                                    v-if="this.reportStatus == 'success'"
                                                
                                                    small
                                                    color="green lighten-5"
                                                    text-color="green lighten-1"
                                                >
                                                    Success
                                                </v-chip>

                                                <v-chip
                                                    v-else-if="this.reportStatus == 'failed'"
                                                
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
                                                    Porcessing
                                                </v-chip>
                                         </div>
                                    </td>
                                </tr>

                                <tr v-if="this.reportError">
                                  <th scope="row" class="text-left">Report Error Message:</th>
                                    <td class="text-left text-capitalize">
                                            <span>{{ this.reportError }}</span>
                                    </td>
                                </tr>
                                
                                <tr v-if = 'this.reportDuration'>
                                    <th scope="row" class="text-left">Report Duration:</th>
                                    <td class="text-left text-capitalize">
                                            <span>{{ this.reportDuration }}</span>
                                    </td>
                                </tr>

                                <tr v-if = "report.search_type == 'citation_audit'">
                                    <th scope="row" class="text-left">Scale Serp:</th>
                                    <td class="text-left text-capitalize">
                                            <v-chip
                                                    v-if="this.scaleSerpStatus == 'success'"
                                                
                                                    small
                                                    color="green lighten-5"
                                                    text-color="green lighten-1"
                                                >
                                                    Success
                                                </v-chip>

                                                <v-chip
                                                    v-else
                                                
                                                    small
                                                    color="red lighten-5"
                                                    text-color="red lighten-1"
                                                >
                                                    Failed
                                                </v-chip>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </v-container>
                        
                </div>
            </v-card>
      </div>
      

      <!-- Dynamically render the appropriate component -->
        <component
            :is="getComponentForReportType(report.search_type)"
            :report="report"
            v-if="report && report.search_type"
        >
        </component>

        
      </panel-navigation>
    
  
  </template>
  
  <script>
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import CitationLogAudit from '@/views/local-recon/Logs/CitationLogAudit.vue';
  import GMBLogAudit from '@/views/local-recon/Logs/GMBLogAudit.vue';
  import moment from 'moment-timezone'
  import axios from 'axios'
  
  export default {
    metaInfo () {
      return {
        title: "Reports | " + this.$appName
      }
    },
    components: {
      PanelNavigation,
      CitationLogAudit,
      GMBLogAudit,

    },
    data() {
      return {
        fetchingData: true,
        reportStatus:'',
        reportDuration:'',
        reportError:'',
        scaleSerpStatus:'success',
      }
    },
    methods: {
        
        async fetchReport() {

            const reportId = this.$route.params.id; 
            
            try {
                const response = await axios.get(process.env.VUE_APP_API_ENDPOINT + `/local-recon/get-search-report`, {
                    params: {
                        report_id: reportId,
                    },
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
                    },

                });
                this.report = response.data.report;
                this.fetchingData = false;
                
                if(this.report.search_type == 'citation_audit'){
                    if(this.report.properties.citations.status == 'citation_completed'){
                        this.reportStatus = 'success'
                    }else if(this.report.properties.citations.status == 'Error Occured'){
                        this.reportStatus = 'failed';
                        if (this.report.properties.report_error_message) {
                              this.reportError = this.report.properties.report_error_message;
                              if(this.report.properties.report_error_message == 'Scale Serp failed'){
                                  this.scaleSerpStatus = 'failed'
                              }
                              
                          }
                    }else{
                        this.reportStatus = 'processing'
                    }

                    if(this.reportStatus == 'success' || this.reportStatus == 'failed'){
                          this.calculateDuration();
                      }

                }else if(this.report.search_type == 'gmb_audit'){
                    
                   if(this.report.properties.reviews.status === 'completed' && this.report.properties.posts.status === 'completed' && this.report.properties.competitors.status === 'completed'){

                      this.calculateDuration();
                    }else if(this.report.properties.gmb_overall_status){
                        if (this.report.properties.report_error_message) {
                            this.reportError = this.report.properties.report_error_message;
                        }
                    }
                }




            } catch (error) {
               
            }
        },
        getComponentForReportType(searchType) {
            switch (searchType) {
                case 'citation_audit':
                    return 'CitationLogAudit';
                case 'gmb_audit':
                    return 'GMBLogAudit'; 
                // case 'grid_tracker_scan':
                //     return 'GridTrackerScan'; 
                
                default:
                    return null;
            }
        },
        fromNow(date) {
            return moment.utc(date).local().fromNow();
        },

        formatDate: function(date) {
            return moment(String(date)).format('MMM DD, YYYY')
        },
        formatDateWithTime: function(date) {
            return moment(String(date)).format('MMM DD, YYYY h:mm A')
        },
        formatText(text) {
            return text ? text.replace(/_/g, ' ') : '';
        },
        calculateDuration(){
                              
            const createdAt = moment(this.report.created_at);
            const updatedAt = moment(this.report.updated_at);

            const duration = moment.duration(updatedAt.diff(createdAt));

            const minutes = Math.floor(duration.asMinutes()); 
            const seconds = duration.seconds(); 

            this.reportDuration = `${minutes} minutes ${seconds} seconds`;
        },
        isMoreThanSixMinutesOld(createdAt) {
            const currentTime = new Date();
            const createdTime = new Date(createdAt);
            const differenceInMinutes = (currentTime - createdTime) / (1000 * 60); 
            return differenceInMinutes > 6;
        },
    
    },
    created() {
      this.fetchReport();
    },
    watch: {
     
      
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  .styled-checkbox {
    position: absolute; // take it out of document flow
    opacity: 0; // hide it
  
    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
    }
  
    // Box.
    & + label:before {
      content: '';
      margin-right: 0px;
      display: inline-block;
      vertical-align: text-top;
      width: 20px;
      height: 20px;
      background: rgb(228, 228, 228);
    }
  
    // Box hover
    /*&:hover + label:before {
      background: #f35429;
    }*/
    
    // Box focus
    &:focus + label:before {
      
      border-width: 0;
    }
  
    // Box checked
    &:checked + label:before {
      background: #48bb78;
    }
    
    // Disabled state label.
    &:disabled + label {
      color: #b8b8b8;
      cursor: auto;
    }
  
    // Disabled box.
    &:disabled + label:before {
      box-shadow: none;
      background: #ddd;
    }
  
    // Checkmark. Could be replaced with an image
    &:checked + label:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 9px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 
        2px 0 0 white,
        4px 0 0 white,
        4px -2px 0 white,
        4px -4px 0 white,
        4px -6px 0 white,
        4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
  
  .btn-invite {
    background-color: #00ad9e;
  }
  
  table tbody tr {
    transition: all 0.1s linear;
  }
  
  table tbody tr:hover {
    background-color: rgb(245, 245, 245);
  }
  </style>
  