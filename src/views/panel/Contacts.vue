<template>

  <div>
    <dialog-add-contact ref="dialogAddContact"></dialog-add-contact>
    <dialog-integration-csvfile ref="dialogCsvFile"></dialog-integration-csvfile>
    <dialog-invites-log ref="dialogInvitesLog"></dialog-invites-log>
    <dialog-contacts-settings ref="dialogContactsSettings"></dialog-contacts-settings>
    <dialog-copy-link-to-form ref="dialogCopyLinkToForm"></dialog-copy-link-to-form>
    <dialog-webhook ref="dialogWebhook"></dialog-webhook>

    <panel-navigation>

      <div class="float-right ml-5">
        <div class="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="openReviewFunnelLink()" style="margin-top: -5px;"><i class="fa fa-link"> </i> Review Funnel</div>
      </div>

      <!-- <div class="float-right ml-5">
          <div class="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogInvitesLog.show()" style="margin-top: -5px;"><i class="fa fa-history"> </i> View Log</div>
      </div> -->

      <!-- <div class="float-right ml-5">
          <div class="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogContactsSettings.show()" style="margin-top: -5px;"><i class="fa fa-cog"> </i> Settings</div>
      </div> -->
      
      <h1 class="text-lg font-semibold mb-4">Contacts</h1>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingContacts" type="article, article, article"></v-skeleton-loader>

      <template v-if="!fetchingContacts && contacts.length == 0">
        <v-alert
          color="blue-grey"
          dark
          icon="mdi-clock-fast"
          text
          v-if="!fetchingContacts && contacts.length == 0"
        >
          <i class="fa fa-users" style="font-size: 50px; float: right;"></i>

          You have no contacts. Use our import tools to add contacts.
          <br /><br />

          <v-btn
            tile
            color="blue-grey mb-10"
            @click="$refs.dialogAddContact.show()"
          >
          <br />
          <v-icon left>
            mdi-plus
          </v-icon>
            Add a Contact
          </v-btn>

          <v-divider vertical class="ml-4 mr-4"></v-divider>

          <v-btn
            tile
            color="blue mb-10"
            @click="$refs.dialogCsvFile.show()"
          >
          <br />
          <v-icon left>
            mdi-magnify-plus-outline
          </v-icon>
            Import Contacts
          </v-btn>

          <v-divider vertical class="ml-4 mr-4"></v-divider>

          <v-btn
            tile
            color="indigo mb-10"
            @click="$refs.dialogCopyLinkToForm.show()"
          >
          <br />
          <v-icon left>
            mdi-link
          </v-icon>
            Copy link to form
          </v-btn>

          <v-divider vertical class="ml-4 mr-4"></v-divider>

          <v-btn
            tile
            color="purple mb-10"
            @click="$refs.dialogWebhook.show()"
          >
          <br />
          <v-icon left>
            mdi-laptop
          </v-icon>
            Webhook
          </v-btn>
        </v-alert>

      </template>

      <template v-if="!fetchingContacts && contacts.length > 0">

        <div class="justify-between items-start mb-3">
          <menu-contact-actions 
            @invite="bulkInvite"
            @archive="bulkArchive"
            @unarchive="bulkUnarchive"
            @delete="bulkDelete"

            class="float-left"
            >

            <div class="flex flex-row items-center px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
              <span class="mr-2">Actions</span>
              <span class="text-xs" style="padding-top: 3px;">
                <font-awesome-icon icon="chevron-down"  />
              </span>
            </div>

          </menu-contact-actions>

          <div class="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded cursor-pointer float-right ml-4" @click="$refs.dialogWebhook.show()"><i class="fa fa-laptop"> </i> Webhook</div>

          <div class="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded cursor-pointer float-right ml-4" @click="$refs.dialogCopyLinkToForm.show()"><i class="fa fa-link"> </i> Copy link to form</div>

          <div class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer float-right ml-4" @click="$refs.dialogCsvFile.show()"><i class="fa fa-upload"> </i> Import Contacts</div>

          <div class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogAddContact.show()"><i class="fa fa-plus"> </i> Add Contact</div>
        </div>

        <br clear="all" /><br clear="all" />

        <div class="overflow-x-scroll">
        <table class="w-full">
          <thead class="border-b border-gray-100 w-full">
            <tr>
              <th></th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Name</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Email</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Phone</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">~ Customer Age</th>
              <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/5 uppercase">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="w-full" style="">
            <tr v-for="contact in sortedContacts" :key="contact.id" class="hover:bg-gray-100">
              <td class="border-l border-b border-r border-gray-100 px-2">
                <input class="styled-checkbox" :id="contact.id+'-checkbox'" type="checkbox" v-model="selectedContactIds" :value="contact.id">
                <label :for="contact.id+'-checkbox'"></label>
              </td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100" :class="{'line-through text-gray-400': contact.archived}">{{ getContactName(contact) }}</td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100" :class="{'line-through text-gray-400': contact.archived}">{{ contact.email ? contact.email : '-' }}</td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100" :class="{'line-through text-gray-400': contact.archived}">{{ contact.phone ? contact.phone : '-' }}</td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ fromNow(contact.firstSeenAt) }}</td>
              <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">
                <span v-if="!contact.campaign_to_contact" class="text-gray-500">
                  <span v-if="contact.invitedEmail == 1 || contact.invitedPhone == 1">
                    <a href="javascript: void(0);" @click="$refs.dialogInvitesLog.show()">invited (static)</a>
                  </span>
                  <span v-else>
                    not invited
                  </span>
                </span>
                <span v-else>
                  Campaign Initiated
                  <br />
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <a href="javascript: void(0)"
                        v-bind="attrs"
                        v-on="on"
                      >{{ contact.campaign_to_contact.status }}</a>
                    </template>
                    <v-list>
                      <v-list-item v-for="item in contact.campaign_to_contact.log" :key="item.id">
                        <i v-if="item.status == 'pending'" class="fa fa-clock" style="color: orange; width: 20px;"></i>
                        <i v-if="item.status == 'in-progress'" class="fa fa-sync fa-spin" style="color: gray; margin-right: 7px;"></i>
                        <i v-if="item.status == 'completed' || item.status == 'clicked'" class="fa fa-check" style="color: green; width: 20px;"></i>
                        <i v-if="item.status == 'canceled'" class="fa fa-ban" style="color: orange; width: 20px;"></i>
                        {{ item.title }}

                        <v-chip
                            class="ml-2"
                            color="green"
                            text-color="white"
                            x-small
                            v-if="item.status == 'clicked'"
                        >
                            clicked
                        </v-chip>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
              </td>
              <td class="border-b border-r border-gray-100 pl-2">
              <div class="flex flex-row items-center justify-end">
                <div v-if="!contact.campaign_to_contact" class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center mr-2" :class="{'opacity-25 cursor-not-allowed': contact.campaign_to_contact, 'hover:bg-orange-200': contact.email && !contact.campaign_to_contact}" @click="startInviteCampaign(contact)">
                  <span class="whitespace-no-wrap">Start Invite Campaign</span>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </template>

    </panel-navigation>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuContactActions from '@/components/menus/menuContactActions.vue'
import DialogIntegrationCsvfile from '@/components/dialogs/dialogIntegrationCsvFile.vue'
import DialogAddContact from '@/components/dialogs/contacts/addContact.vue'
import DialogInvitesLog from '@/components/dialogs/contacts/invitesLog.vue'
import DialogContactsSettings from '@/components/dialogs/contacts/contactsSettings.vue'
import DialogCopyLinkToForm from '@/components/dialogs/contacts/copyLinkToForm.vue'
import DialogWebhook from '@/components/dialogs/contacts/webhook.vue'
import moment from 'moment-timezone'

export default {
  metaInfo () {
    return {
      title: "Contacts | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuContactActions,
    DialogIntegrationCsvfile,
    DialogAddContact,
    DialogInvitesLog,
    DialogContactsSettings,
    DialogCopyLinkToForm,
    DialogWebhook
  },
  data() {
    return {
      selectedContactIds: [],
      contactsInt: null,

      review_funnel: null
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      contacts: state => state.contacts.contacts,
      fetchingContacts: state => state.contacts.fetchingContacts
    }),
    sortedContacts() {
      return this.contacts.slice().sort((a, b) => new Date(b.firstSeenAt) - new Date(a.firstSeenAt))
    }
  },
  methods: {
    async inviteEmail(contact) {
      if (!contact.invitedEmail) {
        await this.$store.dispatch('contacts/inviteEmail', {contactId: contact.id})
        this.$store.dispatch('contacts/fetch')
      }
    },
    async startInviteCampaign(contact) {
      await this.$store.dispatch('contacts/invite', {contactId: contact.id})
      this.$store.dispatch('contacts/fetch')
    },
    async invitePhone(contact) {
      if (!contact.invitedPhone) {
        await this.$store.dispatch('contacts/invitePhone', {contactId: contact.id})
        this.$store.dispatch('contacts/fetch')
      }
    },
    async bulkInvite() {
      await this.$store.dispatch('contacts/bulkInvite', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },
    async bulkInviteEmail() {
      await this.$store.dispatch('contacts/bulkInviteEmail', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },
    async bulkInviteSms() {
      await this.$store.dispatch('contacts/bulkInvitePhone', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },
    async bulkArchive() {
      await this.$store.dispatch('contacts/bulkArchive', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },
    async bulkUnarchive() {
      await this.$store.dispatch('contacts/bulkUnarchive', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },
    async bulkDelete() {
      await this.$store.dispatch('contacts/bulkDelete', {contactIds: this.selectedContactIds})
      this.$store.dispatch('contacts/fetch')
      this.selectedContactIds = []
    },

    getContactName(contact) {
      let name = contact.first_name + ' ' + contact.last_name;
      name = name.trim();

      if (!name)
        return "-";

      return name;
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    async getGetReviewsCampaign() {
      this.getReviewsCampaignLoaded = false;
      
      try {
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/get-get-reviews-campaign', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })

      }catch(e){
        console.log(e)
      }
    },

    getReviewFunnel: async function() {
        try {
          let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/review-funnels/get-settings', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
          })
          
          this.review_funnel = response.data.review_funnel
        }
        catch (e) {}
	  },

    openReviewFunnelLink() {
      window.open(this.getFunnelLink());
    },

    getFunnelLink() {
        return window.location.origin + '/' + this.review_funnel.short_name;
    },
  },
  created() {
    this.$store.state.contacts.fetchingContacts = true
    this.$store.dispatch('contacts/fetch')

    let self = this;
    this.contactsInt = setInterval(function() {
      self.$store.dispatch('contacts/fetch')
      self.getGetReviewsCampaign();
    }, 10000);

    self.getReviewFunnel();
  },

  beforeDestroy() {
    clearInterval(this.contactsInt);
    this.contactsInt = null;
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

.v-list-item {
  min-height: 27px;
  font-size: 13px;
}
</style>
