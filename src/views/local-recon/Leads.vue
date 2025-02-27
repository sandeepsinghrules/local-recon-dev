<template>

  <panel-navigation>

    <dialog-webhook ref="dialogWebhook"></dialog-webhook>

      <div class="float-right ml-5 -mt-1">
        <div class="border-1 bg-blue border-blue text-white text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="$refs.dialogWebhook.show();" style="margin-top: -5px;"><i class="fa fa-globe mr-2"> </i> WEBHOOK</div>
        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="$router.push({ name: 'local_recon_dashboard'})" style="margin-top: -5px;"><i class="fa fa-arrow-left mr-2"> </i> BACK</div>
      </div>

    <h1 class="text-lg font-semibold mb-3">Leads</h1>

    <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

      <div v-if="!fetchingData" class="dashboard-box">
        <v-card
            class="pa-2"
            tile
        >
            <div class="p-3">
                <div class="w-full mb-4">
                    <div v-if="leads.length == 0">
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
                              <th>Lead Details</th>
                              <th>Business/Site</th>
                              <th>Address</th>
                              <th>Added Via</th>
                              <th>Date</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody class="w-full" style="">
                          <tr v-for="lead in leads" :key="lead.id">
                            <td class="">
                              <v-checkbox
                                :id="lead.id+'-checkbox'"
                                :value="lead.id"
                                v-model="selectedIds"
                                hide-details
                                 :ripple="false"
                              >
                              </v-checkbox>
                            </td>
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

                      <v-pagination v-if="!fetchingData && leads.length > 0"
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
      title: "Leads | " + this.$appName
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
      leads: [],
      count: 0,
      page: 1,
      fetchingData: true
    }
  },
  methods: {
    async getLeads(page = 1) {
      let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/leads?page=' + page, {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      this.leads = response.data.leads;
      this.count = response.data.count;
      this.fetchingData = false;
    },
    async bulkDelete() {
      await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-leads', {
          ids: this.selectedIds
        },
        {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      await this.getLeads();

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
    openLeadReport(lead) {
        window.open(window.location.origin + '/rf?s=' + lead.search.widget.uuid + '&p=' + lead.search.place_id + '&si=' + lead.search.id);
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
  },
  created() {
    this.getLeads();
  },
  watch: {
    page: function(val, oldVal) {
      this.getLeads(this.page);
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
