<template>

    <panel-navigation>
  
        <div v-if="showAddNode" @click.self="showAddNode = false" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

            <div class="p-6">

                <h2 class="text-lg font-semibold text-gray-800 mb-3">Add a Note</h2>

                <hr class="border-b border-gray-100 mb-4">

                <div class="mb-3">
                <textarea name="note" ref="note" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded"></textarea>
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showAddNode = false">
                    Cancel
                </button>

                <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': savingNote}" @click="saveNote">
                    Save
                </button>

            </div>



            </div>
        </div>

        <div v-if="showVcardDialog" @click.self="showVcardDialog = false" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/2 lg:w-1/4 bg-white rounded-lg mx-6">

            <div class="p-6">

                <h2 class="text-lg font-semibold text-gray-800 mb-3">Contact QR Code</h2>

                <hr class="border-b border-gray-100 mb-4">

                <div class="lr-contact-qr-code mb-3" style="text-align: center;">
                    <vue-vcard 
                        :orgPost="lead.zip"
                        :orgStreet="lead.company_address"
                        :orgRegion="lead.state"
                        :orgCity="lead.city"
                        :orgCountry="'US'"
                        :orgName="lead.company_name"
                        :firstName="lead.first_name"
                        :lastName="lead.last_name"
                        :workPhone="''"
                        :homePhone="''"
                    />

                    <a href="javascript: void(0);" @click="downloadQrCode()">Download</a>
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showVcardDialog = false">
                    Close
                </button>

            </div>

            </div>
        </div>

        <div v-if="showEditLead && lead" @click.self="showEditLead = false" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

            <div class="p-6">

                <h2 class="text-lg font-semibold text-gray-800 mb-3">Edit Lead Information</h2>

                <hr class="border-b border-gray-100 mb-4">

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    First Name
                </label>
                <input v-model="lead.first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                </div>

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Last Name
                </label>
                <input v-model="lead.last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's name.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Email
                </label>
                <input v-model="lead.email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's email.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Company Name
                </label>
                <input  v-model="lead.company_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Address
                </label>
                <input  v-model="lead.company_address" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    City
                </label>
                <input  v-model="lead.city" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    State
                </label>
                <input  v-model="lead.state" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    Zip
                </label>
                <input  v-model="lead.zip" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                </div>

                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showEditLead = false">
                    Cancel
                </button>

                <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': savingLead}" @click="saveLead">
                    Save
                </button>

            </div>



            </div>
        </div>
  
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
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="showEditLead = true"><span class="table-menu-action-icon"><i class="fa fa-edit"></i></span> Edit</a></v-list-item-title></v-list-item>
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="showAddNode = true"><span class="table-menu-action-icon"><i class="fa fa-plus"></i></span> Add Note</a></v-list-item-title></v-list-item>
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a :href="'mailto:' + lead.email"><span class="table-menu-action-icon"><i class="fa fa-envelope"></i></span> Send Email</a></v-list-item-title></v-list-item>
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="openLeadReport(lead)"><span class="table-menu-action-icon"><i class="fa fa-file"></i></span> View Report</a></v-list-item-title></v-list-item>
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="showVcardDialog = true"><span class="table-menu-action-icon"><i class="fa fa-code"></i></span> Contact QR Code</a></v-list-item-title></v-list-item>
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                </v-list>
                </v-menu>
            </div>
            
          <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_leads'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
        </div>
  
        <h1 v-if="fetchingData" class="text-lg font-semibold mb-3">Lead Details</h1>

        <h1 v-if="!fetchingData && lead" class="text-lg font-semibold mb-3">{{ lead.first_name }} {{ lead.last_name }} | {{ lead.email }}</h1>
  
      <hr class="border-b border-gray-100 mb-3">
  
        <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

        <div class="-mx-2" v-if="!fetchingData">
                <div class="flex flex-row flex-wrap mb-4">
                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <table style="width: 100%; font-size: 14px; line-height: 30px;">
                                <tr>
                                    <th><i class="mdi mdi-format-list-bulleted-type"></i> Added Via</th>
                                    <td style="padding-left: 10px;">{{ ((lead.optin_type == 'view_gate') ? "Optin" : ((lead.optin_type == 'webhook') ? "Webhook" : "Help Request")) }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-account"></i> Contact</th>
                                    <td style="padding-left: 10px;">{{ lead.first_name }} {{ lead.last_name }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-email"></i> Email</th>
                                    <td style="padding-left: 10px;">{{ lead.email || "-" }}</td>
                                </tr>
                                <!-- <tr>
                                    <th><i class="mdi mdi-cellphone"></i> Phone</th>
                                    <td style="padding-left: 10px;">{{ lead.phone || "-" }}</td>
                                </tr> -->
                                <tr>
                                    <th><i class="mdi mdi-calendar-range"></i> Date Created</th>
                                    <td style="padding-left: 10px;">{{ formatDate(lead.created_at) }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-map-marker-outline"></i> Location</th>
                                    <td style="padding-left: 10px;">{{ ((lead.city && lead.state) ? lead.city + ', ' + lead.state : '-') }}</td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3">
                            <table style="width: 100%; font-size: 14px; line-height: 30px;">
                                <tr>
                                    <th><i class="mdi mdi-briefcase-outline"></i> Company Name</th>
                                    <td style="padding-left: 10px;">{{ lead.company_name || "-" }}</td>
                                </tr>
                                <!-- <tr>
                                    <th><i class="mdi mdi-phone"></i> Business Phone</th>
                                    <td style="padding-left: 10px;">{{ lead.phone || "-" }}</td>
                                </tr> -->
                                <tr>
                                    <th><i class="mdi mdi-map-marker-outline"></i> Business Address</th>
                                    <td style="padding-left: 10px;">{{ lead.company_address || "-" }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-city"></i> City</th>
                                    <td style="padding-left: 10px;">{{ lead.city || "-" }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-city-variant-outline"></i> State</th>
                                    <td style="padding-left: 10px;">{{ lead.state || "-" }}</td>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-zip-box"></i> Zip Code</th>
                                    <td style="padding-left: 10px;">{{ lead.zip || "-" }}</td>
                                </tr>
                            </table>
                        </div>
                    </v-card>
                    </div>

                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                    <v-card
                        class="pa-2"
                        tile
                    >
                        <div class="p-3" style="padding-bottom: 18px !important;">
                            <div class="dashboard-box-title">Quick Actions</div>
                            
                            <table style="width: 100%; font-size: 14px; line-height: 29px;">
                                <tr>
                                    <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="showAddNode = true">Add Note</a></th>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a :href="'mailto:' + lead.email">Send Email</a></th>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="openLeadReport(lead)">View Report</a></th>
                                </tr>
                                <tr>
                                    <th><i class="mdi mdi-chevron-right" style="font-size: 15px;"></i> <a href="javascript: void(0);" @click="showVcardDialog = true;">Contact QR Code</a></th>
                                </tr>
                            </table>

                        </div>
                    </v-card>
                    </div>
                </div>
            </div>
  
        <div v-if="!fetchingData" class="dashboard-box">
          <v-card
              class="pa-2"
              tile
          >
              <div class="p-3">
                  <div class="w-full mb-4">
                    <v-tabs>
                        <v-tab>Activity</v-tab>
                        <!-- <v-tab>Notes</v-tab> -->

                        <v-tab-item>
                            <div>
                            <br clear="all" />
    
                            <table class="w-full rg-datatable mt-4">
                                <thead class="border-b border-gray-100 w-full">
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Activity</th>
                                </tr>
                                </thead>
                                <tbody v-if="lead.activity.length == 0" class="w-full" style="">
                                    <tr>
                                        <td>
                                            No activity yet.
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody velse class="w-full" style="">
                                    <tr v-for="item in lead.activity" :key="item.id">
                                        <td>
                                            {{ formatDate(item.created_at) }}
                                        </td>
                                        <td>
                                            <v-chip
                                            v-if="item.type == 'get_help'"
                                            class="ma-2"
                                            color="green"
                                            text-color="white"
                                            >
                                                <i class="mdi mdi-flash" style="margin-right: 10px;"></i> Submit Help Request
                                            </v-chip>

                                            <v-chip
                                            v-if="item.type == 'scan_report'"
                                            class="ma-2"
                                            color="gray"
                                            
                                            >
                                            <i class="mdi mdi-magnify" style="margin-right: 10px;"></i> Scan Report
                                            </v-chip>

                                            <v-chip
                                            v-if="item.type == 'view_gate'"
                                            class="ma-2"
                                            color="orange"
                                            text-color="white"
                                            >
                                            <i class="mdi mdi-cursor-default-click-outline" style="margin-right: 10px;"></i> Opt In
                                            </v-chip>

                                            <v-chip
                                            v-if="item.type == 'note'"
                                            class="ma-2"
                                            color="blue"
                                            text-color="white"
                                            >
                                            <i class="mdi mdi-note-outline" style="margin-right: 10px;"></i> Note
                                            </v-chip>
                                        </td>
                                        <td>
                                            {{ item.description }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                            <!-- <v-pagination v-if="!fetchingData && leads.length > 0"
                            class="float-right mt-6 -mb-3"
                            v-model="page"
                            :length="count"
                            color="blue"
                            circle
                            ></v-pagination> -->
    
                            <div class="clearfix"></div>
                        </div>
                        
                        </v-tab-item>
                        <v-tab-item>
                            Send email here...
                        </v-tab-item>
                    </v-tabs>
                  </div>
              </div>
          </v-card>
      </div>
  
      </panel-navigation>
    </div>
  
  </template>
  
  <script>
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import MenuLeadActions from '@/components/menus/menuLeadActions.vue'
  import moment from 'moment-timezone'
  import axios from 'axios'
  import DialogWebhook from '@/components/dialogs/local-recon/webhook.vue'
  
  import VueVcard from 'vue-vcard';

  export default {
    metaInfo () {
      return {
        title: "Lead Details| " + this.$appName
      }
    },
    components: {
      PanelNavigation,
      MenuLeadActions,
      DialogWebhook,
      VueVcard
    },
    data() {
      return {
        lead: [],
        fetchingData: true,
        showAddNode: false,
        savingNote: false,
        showVcardDialog: false,
        showEditLead: false,
        savingLead: false
      }
    },
    methods: {
      async getLead(page = 1) {
        let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/lead-details/' + this.$route.params.id, {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })
  
        this.lead = response.data.lead;
        this.fetchingData = false;
      },
      async bulkDelete() {
        await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-leads', {
            ids: [this.lead.id]
          },
          {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })
  
        this.$router.push('/local-recon/leads');

      },

      downloadQrCode() {
        axios({
            url: document.querySelector(".lr-contact-qr-code img").attributes[0].value,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
        
            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.lead.first_name + ' ' + this.lead.last_name + ' Contact.png');
            document.body.appendChild(fileLink);
        
            fileLink.click();
        });
      },

      async saveNote() {
        this.saving = true
        this.error = null
        try {

            let formData = new FormData();
            // formData.append("name", this.name);
            formData.append("lead_id", this.lead.id);
            formData.append("note", this.$refs.note.value);
            await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/local-recon/add-lead-note`, formData, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                }
            })

            this.$refs.note.value = '';
            this.showAddNode = false;
            this.getLead();

        } catch (e) {
            this.error = e.response.data.message
        }
        this.saving = false
      },

        async saveLead() {
        this.savingLead = true
        try {
            await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/local-recon/update-lead`, this.lead, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                }
            })

        } catch (e) {
        }
        this.savingLead = false
        this.showEditLead = false
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
          window.open(window.location.origin + '/rf?s=' + lead.search.widget.uuid + '&p=' + lead.search.place_id);
      },
  
      fromNow(date) {
        return moment.utc(date).local().fromNow();
      },
  
      formatDate: function(date) {
        return moment(String(date)).format('MMM DD, YYYY hh:mm A')
      },
    },
    created() {
      this.getLead();
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
  