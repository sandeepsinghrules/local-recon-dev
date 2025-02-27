<template>

  <panel-navigation>

    <div class="float-right text-md">
      On Time Unlock: 
      
      <strong v-if="me.one_time == 1" class="text-success">Yes</strong>
      <strong v-if="me.one_time == 0" class="text-danger">No</strong>
    </div>

    <div class="float-right text-md pr-10">
      Plan: <strong>{{ me.plan_name }}</strong>
    </div>
    
    <h1 class="text-lg font-semibold mb-4">Edit Profile</h1>
    <hr class="border-b border-gray-100 mb-3">

    <div v-if="me">

      <div class="dashboard-box">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3 pt-1">

            <v-tabs>
              <v-tab>Profile</v-tab>
              <v-tab>Change Password</v-tab>

              <v-tab-item class="pt-5">
                <div class="flex flew-row flex-wrap">
                  <div class="w-full sm:w-1/4 pr-6 mb-4 mt-2" style="text-align: center;">
                    <v-gravatar v-if="profile" class="gravatar-pic" :email="profile.email" default-img="https://regro-cdn.s3.amazonaws.com/images/profile_image.png" />
                    <br />
                    <strong>{{ profile.first_name }} {{ profile.last_name }}</strong>
                  </div>
                  <div class="w-full sm:w-3/4 mb-4">
                    <div class="flex flew-row flex-wrap">
                      <div class="w-full sm:w-1/2 pr-6 mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>First Name</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.first_name" />
                      </div>
                      <div class="w-full sm:w-1/2 mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>Last Name</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.last_name" />
                      </div>
                      <div class="w-full mb-4">
                        <p class="mb-1 text-xs mb-2"><strong>Email</strong></p>
                        <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="profile.email" />
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mt-3" />

                <div>
                  <div class="bg-blue-500 float-right hover:bg-blue-400 text-white text-sm inline-block rounded py-2 px-3 cursor-pointer mt-6" :class="{'spinner': saving}" @click="save()">Save</div>
                </div>
              </v-tab-item>

              <v-tab-item class="pt-5">
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>Current Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" ref="current_password" />
                </div>
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>New Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" ref="new_password" />
                </div>
                <div class="w-full sm:w-1/3 pr-6 mb-4">
                  <p class="mb-1 text-xs mb-2"><strong>Confirm Password</strong></p>
                  <input type="password" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" ref="confirm_password" />
                </div>

                <div v-if="error_password" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                  <div v-html="error_password"></div>
                </div>

                <hr class="mt-3" />

                <div class="float-right mt-6">
                  <v-chip
                    v-if="password_changed"
                    class="ma-2 mt-2 ml-3"
                    color="green"
                    outlined
                    @click="password_changed = false"
                    style="position: absolute;"
                  >
                    <v-icon left>
                      mdi-check
                    </v-icon>
                    Password changed!
                  </v-chip>

                  <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': changing}" @click="change_password">Change Password</div>
                </div>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-card>
      </div>

    </div>



  </panel-navigation>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'

export default {
  metaInfo () {
    return {
      title: "User Settings | " + this.$appName
    }
  },
  components: {
    PanelNavigation
  },
  data() {
    return {
      userSegmentation: false,
      saving: false,
      error: null,
      
      changing: false,
      error_password: null,
      password_changed: false,

      phone_number_changed: false,
      show_phone_verification_modal: false,

      phone: "",
      phone_valid: false,
      verifying_otp: false,
      otp_valid: false,
      otp_attempted: false,
      otp_generated_code: null
    }
  },
  methods: {
    sendOtpSms() {
      let self = this;

      self.verifying_otp = false;
      self.otp_valid = false;
      self.otp_attempted = false;

      self.$refs.otpInput.clearInput();
      
      this.otp_generated_code = Math.floor(100000 + Math.random() * 900000);

      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/signup/send-otp-code`, {
        phone: this.me.phone,
        otp: btoa(this.otp_generated_code)
      });
    },
    verifyOtp(value) {
      let self = this;
      this.verifying_otp = true;

      setTimeout(function() {
        if (value == self.otp_generated_code) {
          self.save(true);
          self.$refs.otpInput.clearInput();

          self.verifying_otp = false;
          self.otp_valid = false;
          self.otp_attempted = false;
          self.show_phone_verification_modal = false;
          self.phone_number_changed = false;
        }
        else {
          self.otp_attempted = true;
          self.verifying_otp = false;
          self.otp_valid = false;
        }
      }, 1000);
    },
    handleOnChange(value) {

    },
    clearOtp() {
      this.otpInput = "";
    },
    async save(ignore_number_verification = false) {
      let self = this;

      if (!ignore_number_verification) {
        if (!this.me.parent_id) {
          if (this.phone_number_changed && this.me.phone) {
            this.show_phone_verification_modal = true;
            setTimeout(function() {
              self.sendOtpSms();
            }, 300);
            return;
          }
        }
      }

      this.saving = true
      this.error = null

      try {
        await this.$store.dispatch('me/save', {
          first_name: this.me.first_name.trim(),
          last_name: this.me.last_name.trim(),
          email: this.me.email.trim()
        })
        this.$store.dispatch('me/fetch')
      }catch(error){
        console.log(error)
        this.error = error
      }

      this.saving = false

    },

    async change_password() {

      this.changing = true
      this.error_password = null

      try {
        await this.$store.dispatch('me/change_password', {
          current_password: this.$refs.current_password.value,
          new_password: this.$refs.new_password.value,
          confirm_password: this.$refs.confirm_password.value
        })
        
        this.password_changed = true

        this.$refs.current_password.value = '';
        this.$refs.new_password.value = '';
        this.$refs.confirm_password.value = '';
      } catch(error) {
        this.error_password = error
      }

      this.changing = false

      let self = this
      setTimeout(function() {
        self.password_changed = false
      }, 2000);
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      profile: state => state.me.me
    })
  },
  created() {
    this.$store.dispatch('me/fetch')
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
.gravatar-pic {
  border-radius: 50%;
  width: 100px;
  display: initial;
  margin-bottom: 6px;
}
</style>

