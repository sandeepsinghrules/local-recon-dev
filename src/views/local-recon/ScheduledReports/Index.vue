<template>

  <panel-navigation>

    <dialog-webhook ref="dialogWebhook"></dialog-webhook>

      <div class="float-right ml-5 -mt-1">
        <div class="border-1 bg-blue border-blue text-white text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="$router.push('/local-recon/scheduled-reports/create')" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> Create Scheduled Report</div>
        <!-- <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_dashboard'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div> -->
      </div>

    <h1 class="text-lg font-semibold mb-3">Scheduled Reports</h1>

    <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

      <div v-if="!fetchingData" class="dashboard-box">
        <v-card
            class="pa-2"
            tile
        >
            <div class="p-3">
                <div class="w-full mb-4">
                    <div v-if="scheduled_reports.length == 0">
                        <br /><br /><br /><br />

                        <div class="dashboard-box-iconsquare">
                        <div class="dashboard-box-icon-background"></div>
                        <div class="dashboard-box-icon">
                            <i class="mdi mdi-calendar"></i>
                        </div>
                        </div>

                        <div style="text-align: center;">
                            <div class="pt-2 pb-2">
                                <strong>No Scheduled Reports Yet</strong>
                            </div>
                        </div>
                        
                        <br /><br /><br /><br /><br />
                    </div>

                    <div v-else>
                      <div class="justify-between items-start mb-3 float-right">
                        <v-menu
                          bottom
                          left
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <div
                              v-bind="attrs"
                              v-on="on"
                              class="flex flex-row items-center px-4 py-2 rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer">
                              <span class="mr-2">Actions</span>
                              <span class="text-xs" style="padding-top: 3px;">
                                <font-awesome-icon icon="chevron-down"  />
                              </span>
                            </div>
                          </template>

                          <v-list class="table-menu-actions">
                            <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                          </v-list>
                        </v-menu>
                      </div>

                      <br clear="all" />

                      <table class="w-full rg-datatable mt-4">
                          <thead class="border-b border-gray-100 w-full">
                          <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Frequency</th>
                              <th>Notification Emails</th>
                              <th>Created On</th>
                              <th>Last Ran Date</th>
                              <!-- <th></th> -->
                          </tr>
                          </thead>
                          <tbody class="w-full" style="">
                          <tr v-for="scheduled_report in scheduled_reports" :key="scheduled_report.id">
                            <td class="">
                              <v-checkbox
                                :id="scheduled_report.id+'-checkbox'"
                                :value="scheduled_report.id"
                                v-model="selectedIds"
                                hide-details
                                 :ripple="false"
                              >
                              </v-checkbox>
                            </td>
                              <td>
                              	<a href="javascript: void(0);" @click="$router.push('/local-recon/scheduled-reports/edit/' + scheduled_report.id)">{{ scheduled_report.name }}</a></td>
                              <td>
                              	{{ scheduled_report.frequency }}

                              	<span v-if="scheduled_report.frequency == 'Weekly'">
                              		on {{ scheduled_report.week_day }}
                              	</span>

                              	<span v-if="scheduled_report.frequency == 'Monthly'">
                              		on day {{ scheduled_report.month_day }}
                              	</span>

                              	at

                              	{{ displayHour(scheduled_report.hour) }}

                              </td>
                              <td>{{ JSON.parse(scheduled_report.email_addresses).join(', ') }}</td>
	                          <td>{{ formatDate(scheduled_report.created_at) }}</td>
	                          <td>{{ scheduled_report.last_ran_date || "-" }}</td>
                              <!-- <td style="text-align: right;">
			                      <v-menu
			                        bottom
			                        left
			                      >
			                        <template v-slot:activator="{ on, attrs }">
			                          <v-btn
			                            dark
			                            icon
			                            v-bind="attrs"
			                            v-on="on"
			                            class="ml-3"
			                            color="grey darken-1"
			                          >
			                            <i class="mdi mdi-dots-vertical"></i>
			                          </v-btn>
			                        </template>

			                        <v-list class="table-menu-actions">
			                          <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="$router.push('/local-recon/scheduled-reports/edit/' + scheduled_report.id)"><span class="table-menu-action-icon"><i class="fa fa-pen"></i></span> Edit</a></v-list-item-title></v-list-item>
			                        </v-list>
			                      </v-menu>
			                    </td> -->
                          </tr>
                          </tbody>
                      </table>

                      <v-pagination v-if="!fetchingData && scheduled_reports.length > 0"
                        class="float-right mt-6 -mb-3"
                        v-model="page"
                        :length="count"
                        color="blue"
                        circle
                      ></v-pagination>

                      <div class="clearfix"></div>
                    </div>
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

export default {
  metaInfo () {
    return {
      title: "Scheduled Reports | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuLeadActions,
    DialogWebhook
  },
  data() {
    return {
      selectedIds: [],
      scheduled_reports: [],
      count: 0,
      page: 1,
      fetchingData: true
    }
  },
  methods: {
    async getScheduledReports(page = 1) {
      let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-scheduled-reports', {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      this.scheduled_reports = response.data.scheduled_reports;
      this.count = response.data.count;
      this.fetchingData = false;
    },
    async bulkDelete() {
      await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-scheduled-reports', {
          ids: this.selectedIds
        },
        {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      await this.getScheduledReports();

      this.selectedIds = []
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

    displayHour(hour) {
    	let hours = [
			'12 AM',
			'1 AM',
			'2 AM',
			'3 AM',
			'4 AM',
			'5 AM',
			'6 AM',
			'7 AM',
			'8 AM',
			'9 AM',
			'10 AM',
			'11 AM',
			'12 PM',
			'1 PM',
			'2 PM',
			'3 PM',
			'4 PM',
			'5 PM',
			'6 PM',
			'7 PM',
			'8 PM',
			'9 PM',
			'10 PM',
			'11 PM'
		];

		return hours[hour];
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
  },
  created() {
    this.getScheduledReports();
  },
  watch: {
    page: function(val, oldVal) {
      this.getScheduledReports(this.page);
    }
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
