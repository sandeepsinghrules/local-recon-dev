<template>

  <panel-navigation>

    <dialog-applet-form ref="dialogAppletForm"></dialog-applet-form>

    <div class="flex flex-row items-top justify-between">
      <h1 class="text-lg font-semibold">Settings</h1>

      <div class="bg-green-500 hover:bg-green-400 text-white inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': saving}" @click="save">Save</div>
    </div>
    
    <hr class="border-b border-gray-100 mb-4">

    <div v-if="me">


    <div class="flex flex-row flex-wrap -mx-3">

      <div class="w-full sm:w-1/3 mb-4 px-3">
        <div class="mb-4">
          <h2 class="font-bold text-gray-800">Contacts</h2>
        </div>
        <div class="bg-gray-100 rounded p-4">
          <table class="mb-2">
            <tr>
              <td class="py-1 pr-6 text-sm pb-4">Auto invite</td>
              <td class="py-1 pb-4"><toggle-button color="#48bb78" :sync="true" v-model="me.settings.auto_invite_contacts" /></td>
            </tr>
            <!-- <tr>
              <td class="py-1 pr-6 text-sm">User segmentation</td>
              <td class="py-1"><toggle-button v-model="me.userSegmentation" color="#48bb78" :sync="true" /></td>
            </tr> -->
          </table>
          <!-- <p class="text-xs text-gray-600 mb-5">If activated we will show users smileys and only the happy smiley does bring them to social media links. The others display a custom feedback box.</p> -->

          <hr class="mb-5" />

          <div class="">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                <p class="text-xs text-gray-700 mt-2">
                    Ask for a review from someone who was already contacted?
                </p>
            </label>

            <v-radio-group
                class="mt-2"
                row
                v-model="me.settings.reinvite_contacts"
                >
                    <v-radio
                    label="Yes"
                    :value="1"
                    ></v-radio>
                    <v-radio
                    label="No"
                    :value="0"
                    ></v-radio>
                </v-radio-group>
            </div>

            <div v-show="me.settings.reinvite_contacts == 1" class="mb-3">
                <v-text-field class="auto-posting-frequency" style="width: 120px; margin-top: -30px;"
                    v-model="me.settings.reinvite_contacts_days"
                    type="number"
                    prefix="Wait"
                    suffix="days"
                    hide-details
                    single-line
                    min="1"
                ></v-text-field>
                
                <div style="padding-top: 10px;">
                    (since last review request to ask contact for another review)
                </div>
            </div>
          
        </div>
      </div>

      <div class="w-full sm:w-1/3 mb-4 px-3">
        <div class="mb-4">
          <h2 class="font-bold text-gray-800">Business</h2>
        </div>
        <div class="w-full">
          <p class="mb-1 text-sm mb-2">Business Name</p>
          <input type="text" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 hover:border-grey px-2 py-2 rounded text-sm" v-model="me.company_name" />
        </div>

        <div class="mt-4 mb-4">
          <h2 class="font-bold text-gray-800">Email Settings</h2>
        </div>
        <div class="w-full">
          <p class="mb-1 text-sm mb-2">From Name</p>
          <input type="text" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 hover:border-grey px-2 py-2 rounded text-sm" v-model="me.settings.from_name" />
        </div>

        <!-- <div class="w-full lg:w-1/2 mt-3">
          <p class="mb-1 text-sm mb-2">Timezone (coming soon)</p>
          <input type="text" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 hover:border-grey px-2 py-2 rounded text-sm" disabled placeholder="America/New_York" />
        </div> -->

        <div class="mt-5" v-if="$agency && $agency.settings.allow_business_to_modify_sms_from_number == 1">
          <div class="mb-4">
            <h2 class="font-bold text-gray-800">SMS Settings</h2>
          </div>
          <div class="w-full">
            <p class="mb-1 text-sm mb-2">Phone Number</p>
            <!-- <p>Select a number to send SMS to your contacts from</p> -->

            <v-alert
              color="blue-grey"
              dark
              icon="mdi-clock-fast"
              text
              v-if="$agency && !$agency.integrations.twilio.settings.numbers"
            >
              There are no phone numbers available. Please contact your account owner.
            </v-alert>

            <v-select v-else
                v-model="me.sms_phone_number"
                flat
                solo-inverted
                hide-details
                :items="$agency.integrations.twilio.settings.numbers"
                label="Choose Number"
            ></v-select>
            
          </div>

        </div>

      </div>

      <div class="w-full sm:w-1/3 mb-4 px-3">

        <div class="mt-4 mb-4">
          <h2 class="font-bold text-gray-800">Logo</h2>
        </div>
        <div class="w-full">
          <v-file-input
            accept="image/*"
            label="Click here to upload"
            style="width: calc(100% - 50px);"
            v-model="file"
            @change="onUpload"
          ></v-file-input>

          <div v-if="me.logo" style="padding-top: 0px;">
            <span v-if="me.logo" style="text-align: center;">
              <img :src="me.logo" alt="" style="display: inline-block; max-height: 40px; margin-right: 20px; border: solid 1px #CCCCCC; padding: 2px;">
              <v-btn
                depressed
                color="error"
                
                small
                @click="me.logo = ''; removeLogo()"
              >
                Remove
              </v-btn>
            </span>
          </div>

          <div class="text-sm mb-1 text-gray-700 mt-2">
            Your logo will be displayed on the contact form page and emails.
          </div>
          
        </div>
      </div>

    </div>

    <hr class="border-b border-gray-100 mb-4">


    <div class="mb-6">
      <div class="mb-4">
        <div class="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$router.push('/review-funnel');" style="margin-top: -5px;"><i class="fa fa-cog"> </i> Review Funnel</div>

        <h2 class="font-bold text-gray-800">Invite Campaign</h2>
      </div>
      <div>
        <!-- <v-timeline dense clipped>
          <v-timeline-item :icon="'fa fa-plus'">Initial Contact Email <a href="#"><i class="fa fa-cog"></i></a> <a href="#" class="ml-2"><i class="fa fa-trash" style="color: gray;"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Wait 1 hour <a href="#"><i class="fa fa-cog"></i></a> <a href="#" class="ml-2"><i class="fa fa-trash" style="color: gray;"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">
            Initial Contact SMS <a href="#"><i class="fa fa-cog"></i></a>
          </v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Wait 2 days <a href="#"><i class="fa fa-cog"></i></a> <a href="#" class="ml-2"><i class="fa fa-trash" style="color: gray;"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Secondary Contact Email <a href="#"><i class="fa fa-cog"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Wait until 3pm (America/New_York GMT +05:00) <a href="#"><i class="fa fa-cog"></i></a> <a href="#" class="ml-2"><i class="fa fa-trash" style="color: gray;"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">
            Secondary Contact SMS <a href="#"><i class="fa fa-cog"></i></a>
          </v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Wait 1 week <a href="#"><i class="fa fa-cog"></i></a> <a href="#" class="ml-2"><i class="fa fa-trash" style="color: gray;"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">Third Contact Email <a href="#"><i class="fa fa-cog"></i></a></v-timeline-item>
          <v-timeline-item :icon="'fa fa-plus'">
            Third Contact SMS <a href="#"><i class="fa fa-cog"></i></a>
          </v-timeline-item>
        </v-timeline> -->

        <div v-show="true" style="max-width: 700px; margin: auto;">

          <div style="position: relative; text-align: center;">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  x-small
                  color="white"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="addApplet(0, 'email')">
                  <v-list-item-title>Send Email</v-list-item-title>
                </v-list-item>
                <v-list-item @click="addApplet(0, 'sms')">
                  <v-list-item-title>Send SMS</v-list-item-title>
                </v-list-item>
                <v-list-item @click="addApplet(0, 'delay')">
                  <v-list-item-title>Wait</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          
          <v-timeline v-if="getReviewsCampaignLoaded">
            <v-timeline-item
              v-for="(item, index) in getReviewsCampaign.settings" 
              :key="index"
              :color="getColor(item)"
              small
              >
                <v-alert
                  :color="getColor(item)"
                  :class="getTextColor(item)"
                  @click="editApplet(index, item)"
                >
                  <i :class="getIcon(item)" style="font-size: 17px; margin-right: 10px;"></i>
                  {{ item.title }}
                  <!-- <a href="#"><i class="fa fa-cog"></i></a>-->
                  <a href="javascript: void(0);" @click.stop="removeApplet(index)" class="remove-applet-btn ml-2"><i class="fa fa-times" style="color: white; font-size: 12px;"></i></a>
                </v-alert>

                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="add-applet-btn mx-2"
                      fab
                      x-small
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="addApplet(index + 1, 'email')">
                      <v-list-item-title>Send Email</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="addApplet(index + 1, 'sms')">
                      <v-list-item-title>Send SMS</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="addApplet(index + 1, 'delay')">
                      <v-list-item-title>Wait</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-timeline-item>
          </v-timeline>
        </div>
        
        <!-- <v-expansion-panels focusable v-model="panel">
          <v-expansion-panel class=" mb-2" :key="0">
              <v-expansion-panel-header>
              Initial Contact
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <div class="flex flex-row flex-wrap -mx-3 mb-6">
                  <div class="w-full sm:w-2/3 pl-3">
                    <p class="mb-1 text-sm mb-2">Email</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="1000" v-model="me.templateEmail1" ></textarea>
                  </div>
                  <div class="w-full sm:w-1/3 pl-3">
                    <p class="mb-1 text-sm mb-2">SMS</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="140" v-model="me.templateSMS1" ></textarea>
                  </div>
                </div>
              </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class=" mb-2" :key="1">
              <v-expansion-panel-header>
              Secondary Contact
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <div class="flex flex-row flex-wrap -mx-3 mb-6">
                  <div class="w-full sm:w-2/3 pl-3">
                    <p class="mb-1 text-sm mb-2">Email</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="1000" v-model="me.templateEmail2" ></textarea>
                  </div>
                  <div class="w-full sm:w-1/3 pl-3">
                    <p class="mb-1 text-sm mb-2">SMS</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="140" v-model="me.templateSMS2" ></textarea>
                  </div>
                </div>
              </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class=" mb-6" :key="2">
              <v-expansion-panel-header>
              Third Contact
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pt-4">
                <div class="flex flex-row flex-wrap -mx-3 mb-6">
                  <div class="w-full sm:w-2/3 pl-3">
                    <p class="mb-1 text-sm mb-2">Email</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="1000" v-model="me.templateEmail3" ></textarea>
                  </div>
                  <div class="w-full sm:w-1/3 pl-3">
                    <p class="mb-1 text-sm mb-2">SMS</p>
                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" maxlength="140" v-model="me.templateSMS3" ></textarea>
                  </div>
                </div>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
      </div>


    <div class="flex flex-row flex-wrap -mx-3">
      <!-- <div class="w-full sm:w-1/2 mb-4 px-3">
        <div class="mb-4">
          <h2 class="font-bold text-gray-800">General</h2>
        </div>
        <div class="bg-gray-100 rounded p-4">
          <div class="bg-gray-100 text-xs p-3 mb-3 rounded">
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[business_name]</span> will be replaced by your defined business name above</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[link]</span> will be replaced with the actual review link</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[feedback_link]</span> will be replaced with the actual private feedback link</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[contact_first_name]</span> will be replaced by contact's first name</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[contact_last_name]</span> will be replaced by contact's last name</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[contact_email]</span> will be replaced by contact's email address</div>
            <div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[contact_phone]</span> will be replaced by contact's phone number</div>
            <div class="text-gray-600"><span class="font-semibold p-1 text-gray-900">Note!</span> Second and third email/SMS will be sent 1 day later, if contact does not click the link.</div>
          </div>
        </div>
      </div> -->

    </div>

    </div>


    </div>



  </panel-navigation>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import DialogAppletForm from '@/components/dialogs/get-reviews/dialogAppletForm.vue'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  metaInfo () {
    return {
      title: "Settings | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    ToggleButton,
    DialogAppletForm
  },
  data() {
    return {
      userSegmentation: false,
      panel: [0],
      saving: false,
      error: null,
      getReviewsCampaignLoaded: false,
      getReviewsCampaign: null,
      file: null
    }
  },
  methods: {
    async save() {

      this.saving = true
      this.error = null

      try {
        await this.$store.dispatch('me/save', {
          company_name: this.me.company_name.trim(),
          templateEmail1: this.me.templateEmail1.trim(),
          templateSMS1: this.me.templateSMS1.trim(),
          templateEmail2: this.me.templateEmail2.trim(),
          templateSMS2: this.me.templateSMS2.trim(),
          templateEmail3: this.me.templateEmail3.trim(),
          templateSMS3: this.me.templateSMS3.trim(),
          userSegmentation: this.me.userSegmentation,
          sms_phone_number: this.me.sms_phone_number,
          auto_invite_contacts: ((this.me.settings.auto_invite_contacts) ? 1 : 0),
          reinvite_contacts: ((this.me.settings.reinvite_contacts) ? 1 : 0),
          reinvite_contacts_days: this.me.settings.reinvite_contacts_days,
          from_name: ((this.me.settings.from_name) ? this.me.settings.from_name : "_EMPTY_"),
          logo: ((this.me.logo) ? this.me.logo : "_EMPTY_")
        })
        this.$store.dispatch('me/fetch')
      }catch(error){
        console.log(error)
        this.error = error
      }

      this.saving = false
    },

    async onUpload() {
      // console.log(this.file);
      if (this.file !== null) {
        this.uploading = true
        let formData = new FormData()
        formData.append("file", this.file)

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          this.me.logo = response.data.url

        }catch(e){
          console.log(e)
        }

        this.file = null
        this.uploading = false
      }
    },

    async removeLogo() {
      this.me.logo = '';
    },

    async getGetReviewsCampaign() {
      this.getReviewsCampaignLoaded = false;
      
      try {
        let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/me/get-get-reviews-campaign', {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        this.getReviewsCampaignLoaded = true
        this.getReviewsCampaign = response.data.campaign

        console.log('this.getReviewsCampaign', this.getReviewsCampaign)
      }catch(e){
        console.log(e)
      }
    },
    
    getIcon(item) {
      if (item.type == 'email')
        return 'fa fa-envelope';
      
      if (item.type == 'sms')
        return 'fa fa-sms';
      
      if (item.type == 'delay')
        return 'fa fa-clock';
    },
    
    getColor(item) {
      if (item.type == 'email')
        return 'primary lighten-1';
      
      if (item.type == 'sms')
        return 'green lighten-1';
      
      if (item.type == 'delay')
        return 'blue-grey lighten-4';
    },
    
    getTextColor(item) {
      if (item.type == 'email')
        return 'white--text';
      
      if (item.type == 'sms')
        return 'white--text';
      
      if (item.type == 'delay')
        return 'black--text';
    },

    editApplet(index, item) {
      this.$refs.dialogAppletForm.index = index
      this.$refs.dialogAppletForm.mode = 'edit'
      this.$refs.dialogAppletForm.item = item

      this.$refs.dialogAppletForm.show()
    },

    addApplet(index, type) {
      console.log('index', index)
      this.$refs.dialogAppletForm.index = index
      this.$refs.dialogAppletForm.mode = 'add'
      let self = this;

      switch (type) {
        case 'email':
          self.$refs.dialogAppletForm.item = {
            type: 'email',
            title: '',
            settings: {
              subject: "Feedback for [business_name]",
              body: "Thank you for using [business_name]! We really appreciate your business and truly value you as a customer.\
\n\n\
Customer satisfaction is extremely important to us and we'd love to hear your feedback on how you feel about your recent service! If you could take a few minutes to leave a review for us, we'd really appreciate it.\
\n\n\
To submit your review, simply click below and let us know what you think!\
\n\n\
<a href='[link]'>[link]</a>\
\n\n\
Thanks in advance for taking the time to leave a review!\
\n\n\
Sincerely,\n\
Your [business_name] team"
            }
          }
        break;

        case 'sms':
          self.$refs.dialogAppletForm.item = {
            type: 'sms',
            title: '',
            settings: {
              body: "Thank you for using [business_name]! Customer satisfaction is extremely important to us and we'd love to hear your feedback. [link]"
            }
          }
        break;

        case 'delay':
          self.$refs.dialogAppletForm.item = {
            type: 'delay',
            title: '',
            settings: {
              delay_type: 'for',
              delay_number: 1,
              delay_unit: 'hour',
              delay_hour_of_day: "9",
              delay_timezone: "America/New_York"
            }
          }
        break;
      };
      this.$refs.dialogAppletForm.show()
    },

    async removeApplet(index) {
      await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/delete-get-reviews-campaign-item`, {
          index: index
      }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
      })

      this.getGetReviewsCampaign();
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me
    })
  },
  created() {
    // this.$store.dispatch('me/fetch')

    this.getGetReviewsCampaign();
  }
}
</script>

<style scoped>
.setting-header {
  background-color: #fbfbfb;
}
.setting-body {
  background-color: #fdfdfd;
}

input, textarea {
  border-style: solid;
}

.v-icon.v-icon {
  font-size: 14px !important;
}

.remove-applet-btn {
  background: gray;
  border: solid 1px #FFFFFF;
  border-radius: 50%;
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  right: -8px;
  top: -8px;
  z-index: 10;
}

.v-timeline-item {
  padding-bottom: 35px;
}

.v-timeline-item .v-alert {
  cursor: pointer;
}

.v-timeline-item .remove-applet-btn {
  display: none;
}

.v-timeline-item:hover .remove-applet-btn {
  display: block;
}

.add-applet-btn {
  position:absolute;
  bottom: 30 px;
}

.v-timeline .v-timeline-item:nth-child(odd) .add-applet-btn {
  left: -72px;
}

.v-timeline .v-timeline-item:nth-child(even) .add-applet-btn {
  right: -72px;
}
</style>

