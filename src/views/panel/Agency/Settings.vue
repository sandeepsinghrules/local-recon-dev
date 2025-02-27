<template>

  <div>
    <dialog-send-test-email ref="dialogSendTestEmail"></dialog-send-test-email>
    <dialog-view-integrations-instructions ref="dialogViewIntegrationsInstructions"></dialog-view-integrations-instructions>
    <panel-navigation>
    <dialog-buy-number ref="dialogBuyNumber"></dialog-buy-number>

      <div class="float-right ml-5 -mt-1">
        <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right" @click="openGuide()" style="margin-top: -5px;"><i class="fa fa-link mr-2"> </i> GETTING STARTED GUIDE</div>
      </div>
      
      <div class="flex flex-row items-top justify-between">
        <h1 class="text-lg font-semibold mb-3">Settings</h1>
        <!-- <div class="bg-green-500 hover:bg-green-400 text-white inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': saving}" @click="save">Save</div> -->
      </div>
      
      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader
        type="article"
        v-if="!$agency"
      ></v-skeleton-loader>

      <div class="dashboard-box" v-if="me && $agency">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3 pt-1">

            <template>
              <div v-if="profile.settings.role == 'Manager (readonly)'">
                You do not have permission to change the settings of the agency. Contact your account owner.
              </div>
              <v-tabs v-else>
                <!-- <v-tab>Main Settings</v-tab>
                <v-tab>Registration</v-tab>
                <v-tab>White Label</v-tab> -->
                <v-tab>Integrations</v-tab>
                <v-tab>Grid Tracker</v-tab>
                <v-tab>API</v-tab>
                <v-tab>GBP Audit</v-tab>
                <v-tab>Webhook</v-tab>
                <!-- <v-tab>Custom Javascript/HTML</v-tab> -->

                <!-- <v-tab-item class="pt-5">
                  <div class="flex flex-row flex-wrap -mx-3">
                    <div class="w-full lg:w-1/3  px-3">
                      <p class="mb-1 text-xs mb-2"><strong>Agency Name</strong></p>
                      <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                      v-model="me.company_name"  />
                      <p class="text-xs text-gray-500 mt-2">This will also replace "Reviewgrower" all over the app.</p>
                    </div>
                    <div class="w-full lg:w-2/3  px-3">
                      <div class="flex flex-row flex-wrap -mx-3">
                        <div class="w-full lg:w-1/2  px-3">
                          <p class="mb-1 text-xs mb-2"><strong>Privacy Policy Link</strong></p>
                          <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="me.integrations.stripe.settings.privacy_policy_link" placeholder="https://"  />
                        </div>
                        <div class="w-full lg:w-1/2 pl-3" style="position: relative;">
                          <p class="mb-1 text-xs mb-2"><strong>Terms of Service Link</strong></p>
                          <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" v-model="me.integrations.stripe.settings.terms_of_service_link" placeholder="https://" />
                        </div>
                      </div>

                      <p class="text-xs text-gray-500 mt-2">Your Privacy Policy and Terms of Service links are used to generate your customer portal in Stripe and in Local Recon reports.</p>
                    </div>
                  </div>

                  <hr class="mt-4 mb-4">

                  <div class="w-full">
                    <p class="mb-1 text-xs mb-2"><strong>Contacts Webhook</strong></p>

                    <p class="text-xs text-gray-500">Select which webhook your customers will use for adding contacts.</p>
                    
                    <v-radio-group
                      class="mt-2"
                    v-model="me.settings.contacts_webhook"
                    >
                      <v-radio
                        :label="getExternalContactFormLink()"
                        value="regular"
                        on-icon="mdi-circle"
                        off-icon="mdi-circle-outline"
                        :ripple="false"
                      ></v-radio>
                      <v-radio
                        :label="getExternalContactFormLinkWhiteLabeled()"
                        value="white_labeled"
                        on-icon="mdi-circle"
                        off-icon="mdi-circle-outline"
                        :ripple="false"
                      ></v-radio>
                    </v-radio-group>
                  </div>

                  <hr class="mt-4 mb-4">

                  <div class="w-full">
                    <p class="mb-1 text-xs mb-2"><strong>Custom CSS</strong></p>
                    
                    <textarea name="" id="" rows="14" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-gray-100 hover:border-grey px-4 py-4 rounded" maxlength="1000" v-model="me.settings.custom_css" placeholder="/* Example */
header {
    background-color: purple !important;
}

nav.v-navigation-drawer {
    background-color: purple !important;
}

.me-icon {
    background-color: #b794f4 !important;  
}" ></textarea>

                    <p class="text-xs text-gray-500 mt-2">Enter custom CSS to change the UI of the app. <a href="https://reviewgrower.com/documentation/how-to-customize-your-user-interface-using-custom-css/" target="custom-css-documentation">Custom CSS Documentation</a></p>
                  </div>

                  <hr class="mt-3" />

                  <div class="float-right mt-6">
                    <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingAgencySettings}" @click="saveAgencySettings()">Save</div>
                  </div>
                </v-tab-item> -->

                <!-- <v-tab-item class="pt-5">
                  <div class="w-full">
                    <p class="mb-1 text-xs mb-2"><strong>Signup</strong></p>
                    
                    <v-checkbox
                       :ripple="false"
                      v-model="me.settings.signup_link"
                      label="Enable signup"
                      hide-details
                    ></v-checkbox>
                  </div>

                  <div v-show="me.settings.signup_link == 0" class="w-full mt-3">
                    <p class="mb-1 text-xs mb-2"><strong>Signup Page</strong></p>
                    
                    <v-checkbox
                       :ripple="false"
                      v-model="me.settings.signup_page"
                      label="Allow opening the signup page directly"
                      hide-details
                    ></v-checkbox>
                  </div>

                  <div v-show="me.settings.signup_link == 0 && me.settings.signup_page == 0" class="w-full mt-3">
                    <p class="mb-1 text-xs mb-2"><strong>Stripe Plams</strong></p>
                    
                    <v-checkbox
                      :ripple="false"
                      v-model="me.settings.allow_stripe_plans_signups"
                      label="Only Allow Signup for Stripe Plans"
                      hide-details
                    ></v-checkbox>
                  </div>

                  <hr class="mt-3" />

                  <div class="float-right mt-6">
                    <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingAgencySettings}" @click="saveAgencySettings()">Save</div>
                  </div>
                </v-tab-item> -->
                
                <!-- <v-tab-item class="pt-5">
                  <div class="flex flex-row flex-wrap -mx-3">
                    <div class="w-full mb-4 px-3">
                      <div class="bg-gray-100 rounded p-4">

                        <h2 class="font-bold text-sm text-gray-800 mb-4">Domain</h2>

                        <a href="javascript: void(0);" v-if="!show_subdomain_field" @click="show_subdomain_field = true" style="font-size: 17px;">{{ me.domain || '- none, click here to setup -' }}</a>

                        <input type="text" ref="domain" v-if="show_subdomain_field === true" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border hover:border-grey px-2 py-2 rounded" placeholder="e.b. mydomain.com" style="width: calc(100% - 100px); display: inline-block; margin-right: 10px;"  />

                        <div v-if="show_subdomain_field === true" class="bg-blue text-white inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingDomain}" @click="saveDomain()">Save</div>

                        <div v-if="errorDomain" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-1" role="alert">
                          <div v-html="errorDomain"> </div>
                        </div>

                        <div class="flex flex-row flex-wrap -mx-3 mt-3" style="font-size: 13px;">
                          <div class="w-full sm:w-1/3 px-3">
                            <div class="">
                              DNS Settings:
                              <div class="mt-2">
                                <strong>CNAME:</strong> dns.reviewgrower.com
                                <br />
                                <strong>A Record:</strong> 54.163.86.186
                              </div>
                            </div>
                          </div>
                          <div class="w-full sm:w-1/3">
                            <p class="" style="margin-bottom: 0px;">
                              Domain Status: 
                            </p>

                            <div v-if="!me.domain">
                              <i class="fa fa-exclamation-circle" style="color: orange; font-size: 24px;"></i>
                              <br />
                              <p class="0">
                                No domain setup <i v-if="me.domain && (me.domain_status == 0 || me.ssl_status == 0)" class="fa fa-spin fa-spinner" style="margin-left: 4px; font-size: 14px;"></i>
                              </p>
                            </div>

                            <div v-if="me.domain && me.domain_status == 0">
                              <i class="fa fa-times-circle" style="color: red; font-size: 24px;"></i>
                              <br />
                              <p class="0">
                                Check DNS settings <i v-if="me.domain && (me.domain_status == 0 || me.ssl_status == 0)" class="fa fa-spin fa-spinner" style="margin-left: 4px; font-size: 14px;"></i>
                              </p>
                            </div>

                            <div v-if="me.domain && me.domain_status == 1">
                              <i class="mdi mdi-check-circle-outline" style="color: green; font-size: 24px;"></i>
                            </div>
                          </div>
                          <div class="w-full sm:w-1/3">
                            <p class="" style="margin-bottom: 0px;">
                              SSL Status: 
                            </p>

                            <p class="" style="display: inline-block;">
                              <i v-if="me.ssl_status == 1" class="mdi mdi-check-circle-outline float-left" style="color: green; font-size: 24px;"></i>
                              <span v-if="me.ssl_status == 1" class="float-right mt-2 ml-2">expires {{ formatDate(me.ssl_expiration) }}</span>
                              <i v-if="me.ssl_status == 0" class="fa fa-times-circle" style="color: red; font-size: 24px;"></i>
                              <span v-if="me.ssl_status == 0 && me.domain_status == 1">&nbsp;&nbsp;(please check later)</span>
                              <span v-if="me.ssl_status == 0 && me.domain_status == 0">&nbsp;&nbsp;(check DNS Settings)</span>

                              <i v-if="me.domain && (me.domain_status == 0 || me.ssl_status == 0)" class="fa fa-spin fa-spinner" style="margin-left: 5px; font-size: 14px;"></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="w-full px-3">
                      <div class="" >

                        <div class="float-left" style="width: 200px; max-width: 100%;">
                          <strong class="text-sm">Agency Logo</strong>
                          <br />

                          <v-file-input
                            accept="image/*"
                            v-model="file"
                            @change="onUpload"
                            class="rg-uploader"
                            prepend-icon="mdi-camera"
                            outlined
                            hide-input
                          ></v-file-input>

                          <div v-if="$agency.logo" style="padding-top: 0px;">
                            <span v-if="$agency.logo" style="text-align: center;">
                              <img :src="$agency.logo" alt="" style="display: inline-block; max-height: 40px; margin-right: 20px; border: solid 1px #CCCCCC; padding: 2px;">
                              <v-btn
                                depressed
                                color="error"
                                icon
                                small
                                @click="$agency.logo = ''; removeLogo()"
                              >
                                <i class="mdi mdi-trash-can-outline" style="font-size: 20px;"></i>
                              </v-btn>
                            </span>
                          </div>

                          <i v-if="uploading" class="fa fa-spin fa-spinner" style=""></i>
                        </div>

                        <div class="float-left" style="width: 200px; max-width: 100%;">
                          <strong class="text-sm">Agency Mobile Logo</strong>
                          <br />

                          <v-file-input
                            accept="image/*"
                            v-model="file_mobile"
                            @change="onUploadMobile"
                            class="rg-uploader"
                            prepend-icon="mdi-camera"
                            outlined
                            hide-input
                          ></v-file-input>

                          <div v-if="$agency.settings.logo_mobile" style="padding-top: 0px;">
                            <span v-if="$agency.settings.logo_mobile" style="text-align: center;">
                              <img :src="$agency.settings.logo_mobile" alt="" style="display: inline-block; max-height: 40px; margin-right: 20px; border: solid 1px #CCCCCC; padding: 2px;">
                              <v-btn
                                depressed
                                color="error"
                                icon
                                small
                                @click="$agency.settings.logo_mobile = ''; removeLogoMobile()"
                              >
                                <i class="mdi mdi-trash-can-outline" style="font-size: 20px;"></i>
                              </v-btn>
                            </span>
                          </div>

                          <i v-if="uploading_mobile" class="fa fa-spin fa-spinner" style=""></i>
                        </div>

                        <div class="float-left" style="width: 200px; max-width: 100%;">
                          <strong class="text-sm">Agency Favicon</strong>
                          <br />

                          <v-file-input
                            accept="image/*"
                            v-model="file_favicon"
                            @change="onUploadFavicon"
                            class="rg-uploader"
                            prepend-icon="mdi-camera"
                            outlined
                            hide-input
                          ></v-file-input>

                          <div v-if="$agency.settings.favicon" style="padding-top: 0px;">
                            <span v-if="$agency.settings.favicon" style="text-align: center;">
                              <img :src="$agency.settings.favicon" alt="" style="display: inline-block; max-height: 40px; margin-right: 20px; border: solid 1px #CCCCCC; padding: 2px;">
                              <v-btn
                                depressed
                                color="error"
                                icon
                                small
                                @click="$agency.settings.favicon = ''; removeFavicon()"
                              >
                                <i class="mdi mdi-trash-can-outline" style="font-size: 20px;"></i>
                              </v-btn>
                            </span>
                          </div>

                          <i v-if="uploading_favicon" class="fa fa-spin fa-spinner" style=""></i>
                        </div>

                        <br clear="all" />

                        <br clear="all" /><br clear="all" />

                        <p class="-mb-2"><strong>Dashboard Link (for businesses)</strong></p>


                        <toggle-button v-model="me.settings.dashboard_link" color="#48bb78" :sync="true" />

                        <div class="flex flex-row flex-wrap -mx-3" v-show="me.settings.dashboard_link">
                          <div class="w-full lg:w-1/3  px-3">
                            <p class="mb-1 text-xs mb-2"><strong>Link</strong></p>
                            <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                            v-model="me.settings.dashboard_link_url"  />
                          </div>

                          <div class="w-full lg:w-1/3  px-3">
                            <p class="mb-1 text-xs mb-2"><strong>Text</strong></p>
                            <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                            v-model="me.settings.dashboard_link_text"  />
                          </div>

                          <div class="w-full lg:w-1/3  px-3">
                            <p class="mb-1 text-xs mb-2"><strong>Icon</strong></p>
                            
                            <div class="float-left">
                              <v-icon-picker v-model="me.settings.dashboard_link_icon" direction="up"></v-icon-picker>
                            </div>

                            <div class="float-left pl-2">
                              <i :class="me.settings.dashboard_link_icon" style="font-size: 20px;"></i>
                            </div>
                          </div>
                        </div>

                        <hr class="mt-3" />

                        <div class="float-right mt-6">
                          <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingAgencySettings}" @click="saveAgencySettings()">Save</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-tab-item> -->
                
                <v-tab-item class="pt-5">

                  <!-- <v-chip
                    v-if="agency_settings_saved"
                    class="ma-2"
                    color="green"
                    outlined
                    @click="agency_settings_saved = false"
                  >
                    <v-icon left>
                      mdi-check
                    </v-icon>
                    Saved
                  </v-chip>

                  <div class="mb-4 mt-4">
                    <h2 class="font-bold text-gray-800">Twilio Settings</h2>
                  </div>

                  <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/3 pr-3">
                      <p class="mb-1 text-xs mb-2"><strong>Account SID</strong></p>
                      <input type="text" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                      v-model="me.integrations.twilio.settings.account_sid"  />
                    </div>
                    <div class="w-full lg:w-1/3 px-3" style="position: relative;">
                      <p class="mb-1 text-xs mb-2"><strong>Auth Token</strong></p>
                      <input :type="((show_auth_token) ? 'text' : 'password')" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"  v-model="me.integrations.twilio.settings.auth_token" style="padding-right: 35px !important;" />

                      <a href="javascript: void(0);" @click="show_auth_token = !show_auth_token" class="token_password_toggle">
                        <i v-if="show_auth_token" class="fa fa-eye"></i>
                        <i v-if="!show_auth_token" class="fa fa-eye-slash"></i>
                      </a>
                    </div>

                    <div class="w-full lg:w-1/3 pr-3">
                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2 pl-3">
                          <div v-if="errorTwilio" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-1" role="alert">
                            <div v-html="errorTwilio"> </div>
                          </div>

                          <p v-if="me.integrations.twilio.status == 1" class="mb-1 text-xs mb-2"><strong>Outgoing SMS Phone Number</strong></p>
                          
                          <v-select v-if="me.integrations.twilio.status == 1 && !gettingTwilioNumbers"
                                v-model="me.integrations.twilio.settings.phone_number"
                                flat
                                solo-inverted
                                hide-details
                                :items="me.integrations.twilio.settings.numbers"
                                label="Select Number"
                                class="-mt-2"
                            ></v-select>

                          <div v-if="me.integrations.twilio.status == 1 && me.integrations.twilio.settings.numbers.length == 0 && !gettingTwilioNumbers" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 mt-1" role="warning">
                            <div>Please purchase a phone number.</div>
                          </div>

                            <i v-if="gettingTwilioNumbers" class="fa fa-spin fa-spinner" style="font-size: 14px;"></i>
                        </div>
                        <div class="w-full lg:w-1/2 px-3 pl-10">
                          <p class="mb-1 text-xs mb-2"><strong>Link Shortening</strong>
                            <a href="https://www.twilio.com/docs/messaging/how-to-send-messages-with-link-shortening" target="twilio-link-shortening" class="ml-2"><i class="mdi mdi-information" style="font-size: 16px;"></i></a>
                          </p>

                          <v-checkbox
                            class="mt-4"
                            label="Enabled"
                            value="yes"
                            hide-details
                            v-model="me.integrations.twilio.settings.link_shortening"
                              :ripple="false"
                          ></v-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-blue text-white inline-block rounded py-2 px-3 cursor-pointer mt-2" :class="{'spinner': savingTwilio}" @click="saveTwilioSettings()">Save</div>

                  <v-chip
                    v-if="me.integrations.twilio.status == 1 && me.integrations.twilio.settings.phone_number"
                    class="ma-2"
                    color="green"
                    outlined
                    @click="saved = false"
                  >
                    <v-icon left>
                      mdi-check
                    </v-icon>
                    Valid
                  </v-chip> -->

                  <div v-if="me.integrations.twilio.status == 1 && me.integrations.twilio.settings.phone_number"
                    class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer mt-2 ml-2  float-right" @click="$refs.dialogBuyNumber.show()"><i class="fa fa-plus"></i> Buy Number</div>


                  <div v-show="agencyHasGridTrackerAddon">
                  
                    <div class="w-full mb-4">

                      <div class="mb-4">
                        <h2 class="font-bold text-gray-800">Google Maps</h2>
                      </div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/3 pr-3" style="position: relative;">
                          <p class="mb-1 text-xs mb-2"><strong>API Key</strong></p>
                          <input :type="((show_maps_key) ? 'text' : 'password')" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"  v-model="me.integrations.google_maps.settings.api_key" style="padding-right: 35px !important;" />

                          <a href="javascript: void(0);" @click="show_maps_key = !show_maps_key" class="token_password_toggle">
                            <i v-if="show_maps_key" class="fa fa-eye"></i>
                            <i v-if="!show_maps_key" class="fa fa-eye-slash"></i>
                          </a>
                        </div>
                      </div>

                      <div v-if="errorGoogleMaps" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-1" role="alert">
                        <div v-html="errorGoogleMaps"> </div>
                      </div>

                      <div class="bg-blue text-white inline-block rounded py-2 px-3 cursor-pointer mt-2" :class="{'spinner': savingGoogleMapsKey}" @click="saveGoogleMapsKey()">Save</div>

                      <v-chip
                        v-if="me.integrations.google_maps.settings.api_key && me.integrations.google_maps.status == 1"
                        class="ma-2"
                        small
                        color="green lighten-5"
                        text-color="green lighten-1"
                        @click="saved = false"
                      >
                        <i class="mdi mdi-checkbox-marked-circle-outline mr-1"></i>
                        Valid
                      </v-chip>

                    </div>

                    <hr class="mt-5 mb-5" />
                  
                    <div class="w-full mb-4">

                      <div class="mb-4">
                        <h2 class="font-bold text-gray-800">Value Serp</h2>

                        <a href="https://valueserp.com" class="text-sm">Sign Up for ValueSerp</a>
                      </div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/3 pr-3" style="position: relative;">
                          <p class="mb-1 text-xs mb-2"><strong>API Key</strong></p>
                          <input :type="((show_value_serp_key) ? 'text' : 'password')" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"  v-model="me.integrations.value_serp.settings.api_key" style="padding-right: 35px !important;" />

                          <a href="javascript: void(0);" @click="show_value_serp_key = !show_value_serp_key" class="token_password_toggle">
                            <i v-if="show_value_serp_key" class="fa fa-eye"></i>
                            <i v-if="!show_value_serp_key" class="fa fa-eye-slash"></i>
                          </a>
                        </div>
                      </div>

                      <div v-if="errorValueSerp" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-1" role="alert">
                        <div v-html="errorValueSerp"> </div>
                      </div>

                      <div class="bg-blue text-white inline-block rounded py-2 px-3 cursor-pointer mt-2" :class="{'spinner': savingValueSerpKey}" @click="saveValueSerpKey()">Save</div>

                      <v-chip
                        v-if="me.integrations.value_serp.settings.api_key && me.integrations.value_serp.status == 1"
                        class="ma-2"
                        small
                        color="green lighten-5"
                        text-color="green lighten-1"
                        @click="saved = false"
                      >
                        <i class="mdi mdi-checkbox-marked-circle-outline mr-1"></i>
                        Valid
                      </v-chip>

                    </div>

                  

                    <hr class="mt-5 mb-2" />

                  </div>
                </v-tab-item>

                <v-tab-item class="pt-5">
                  
                    <div class="w-full mb-4">

                      <div class="mb-4">
                        <h2 class="font-bold text-gray-800">Grid Tracker</h2>
                      </div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/3 pr-3" style="position: relative;">
                          <p class="mb-1 text-xs mb-2"><strong>Business Search Preferred API</strong></p>
                          <v-radio-group
                            class="mt-2"
                          v-model="me.settings.grid_use_which_api"
                          >
                            <v-radio
                              :label="'Google Maps'"
                              value="google_maps"
                              on-icon="mdi-circle"
                              off-icon="mdi-circle-outline"
                              :ripple="false"
                            ></v-radio>
                            <v-radio
                              :label="'Value Serp'"
                              value="value_serp"
                              on-icon="mdi-circle"
                              off-icon="mdi-circle-outline"
                              :ripple="false"
                            ></v-radio>
                          </v-radio-group>

                          <p class="text-xs text-gray-700 mt-2">Choose your preferred method of searching for businesses.</p>
                        </div>
                      </div>

                      <hr class="mb-5" />

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/3 pr-3" style="position: relative;">
                          <p class="mb-1 text-xs mb-2"><strong>Service Area Search</strong></p>
                          
                          <toggle-button v-model="me.settings.grid_sab_enabled" color="#48bb78" :sync="true" />

                          <p class="text-xs text-gray-700 mt-2">When enabled, a SAB option will be displayed on the grid to search for service areas.</p>
                        </div>
                      </div>

                      <hr class="mt-3" />

                      <div class="float-right mt-6">
                        <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingAgencySettings}" @click="saveAgencySettings()">Save</div>
                      </div>

                    </div>
                </v-tab-item>

                <v-tab-item class="pt-5">

                  <hr class="mt-4 mb-4">

                  <div class="flex flex-row flex-wrap">

                    <div class="w-full lg:w-1/2 pr-3">
                      <p class="mb-1 text-xs mb-2"><strong>API Key</strong></p>
                      
                      <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"  v-model="me.uuid" style="padding-right: 35px !important;" readonly />

                      <p class="text-xs text-gray-700 mt-2">Use this API key to create reports programatically.</p>

                      <a :href="getApiDocsEndpoint()" target="lr-api-docs" style="font-size: 12px;">View API Docs</a>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item class="pt-5">
                  
                  <div class="w-full mb-4">

                    <div class="mb-4">
                      <h2 class="font-bold text-gray-800"> GBP Aduit</h2>
                    </div>


                    <hr class="mb-5" />

                    <div class="flex flex-row flex-wrap">
                      <div class="w-full  pr-3" style="position: relative;">
                        <p class="mb-1 text-xs mb-2"><strong>Analyze Every Google Reviews For</strong></p>

                        <p class="mb-1 text-xs mb-2 mt-5"><strong>Images</strong></p>
                        <toggle-button v-model="me.settings.google_review_enabled" color="#48bb78" :sync="true" />


                        <p class="mb-1 text-xs mb-2 mt-4"><strong>Google Local Guides</strong></p>
                        <toggle-button v-model="me.settings.google_local_guide" color="#48bb78" :sync="true" />

                        <p class="text-xs text-gray-700 mt-2"><strong>Warning: </strong>Enabling this will cause major loading delays with businesses with many reviews. We get 8 google reviews at a time, and it takes on average approximately 8 seconds per 8 reviews. If a business has 1,800 reviews this will take roughly 1,800 seconds/30 minutes.</p>
                      </div>
                    </div>

                    <hr class="mt-3" />

                    <div class="float-right mt-6">
                      <div class="bg-blue text-white text-sm inline-block rounded py-2 px-3 cursor-pointer" :class="{'spinner': savingGoogleReviewSettings}" @click="saveGoogleReviewSettings()">Save</div>
                    </div>

                  </div>
              </v-tab-item>


              <v-tab-item class="pt-5">

                  <hr class="mt-4 mb-4">

                  <div class="flex flex-row flex-wrap">

                    <div class="w-full lg:w-1/2 pr-3">
                      <p class="mb-1 text-xs mb-2"><strong>Webhook URL</strong></p>
                      
                      <v-alert
                        v-if="webhookErrorMessage"
                        color="error"
                        type="error"
                        dense
                        >
                        {{ webhookErrorMessage }}
                    </v-alert>
                      <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded mb-4"  placeholder="Enter Webhook URL" v-model="me.settings.webhook_url" style="padding-right: 35px !important;" />
                      
                      <div class="bg-blue text-white inline-block rounded py-2 px-3 cursor-pointer mt-2" :class="{'spinner': savingWebhookUrl}" @click="saveWebhookUrl()">Save</div>

                      <div v-if="me.settings.webhook_url" class="bg-warning text-white inline-block rounded py-2 px-3 cursor-pointer ml-5 mt-2" :class="{'spinner': testingWebhookUrl}" @click="testWebhookUrl()">Test Webhook</div>

                    </div>
                  </div>
              </v-tab-item>

              </v-tabs>
            </template>
          </div>
        </v-card>
      </div>
    </panel-navigation>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import { ToggleButton } from 'vue-js-toggle-button'
import DialogSendTestEmail from '@/components/dialogs/integrations/sendTestEmail.vue'
import DialogViewIntegrationsInstructions from '@/components/dialogs/integrations/viewInstructions.vue'
import DialogBuyNumber from '@/components/dialogs/integrations/buyNumber.vue'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Agency Settings | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    ToggleButton,
    DialogSendTestEmail,
    DialogViewIntegrationsInstructions,
    DialogBuyNumber
  },
  data() {
    return {
      show_subdomain_field: false,
      userSegmentation: false,
      panel: [0],
      saving: false,
      error: null,

      savingDomain: false,
      errorDomain: null,

      file: null,
      file_mobile: null,
      file_favicon: null,
      uploading: false,
      uploading_mobile: false,
      uploading_favicon: false,

      agency_settings_saved: false,
      savingAgencySettings: false,
      savingGoogleReviewSettings:false,
      savingWebhookUrl:false,
      testingWebhookUrl:false,
      webhookErrorMessage:null,
      savingTwilio: false,
      errorTwilio: null,
      gettingTwilioNumbers: false,
      show_auth_token: false,

      savingSMTP: false,
      errorSMTP: null,
      show_smtp_password: false,
      
      savingStripeSettings: false,
      stripeSettingsError:null,
      show_stripe_key: false,

      savingGoogleMapsKey: false,
      errorGoogleMaps: null,

      show_maps_key: false,

      savingValueSerpKey: false,
      errorValueSerp: null,

      show_value_serp_key: false,
    }
  },
  methods: {
    async saveDomain() {

      this.savingDomain = true
      this.errorDomain = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-white-label-domain`, {
        domain: ((this.$refs.domain) ? this.$refs.domain.value.trim() : this.me.domain)
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingDomain = false
        this.show_subdomain_field = false
        this.me.domain = ((this.$refs.domain) ? this.$refs.domain.value.trim() : this.me.domain)
        this.me.domain_status = response.data.domain_status
        this.me.ssl_status = response.data.ssl_status
        this.me.ssl_expiration = response.data.ssl_expiration
      }
      else {
        this.errorDomain = response.data.error
      }

      this.savingDomain = false
      let self = this

      setTimeout(function() {
        if (self.me.domain && (self.me.domain_status == 0 || self.me.ssl_status == 0)) {
          if (!self.show_subdomain_field)
            self.saveDomain();
        }
      }, 5000)

    },

    async saveAgencySettings() {

      this.savingAgencySettings = true
      this.agencySettingsError = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-stripe-settings`, {
        privacy_policy_link: this.me.integrations.stripe.settings.privacy_policy_link,
        terms_of_service_link: this.me.integrations.stripe.settings.terms_of_service_link,
        only_links: true
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      this.me.integrations.stripe.status = response.data.integration.status;
      this.me.integrations.stripe.settings = response.data.integration.settings;

      try {
        await this.$store.dispatch('me/save', {
          company_name: this.me.company_name.trim(),
          contacts_webhook: this.me.settings.contacts_webhook,

          grid_use_which_api: this.me.settings.grid_use_which_api,
          grid_sab_enabled: this.me.settings.grid_sab_enabled ? '1' : '0'
        })
        this.$store.dispatch('me/fetch')
      }catch(error){
        console.log(error)
        this.agencySettingsError = error
      }

      this.savingAgencySettings = false
      this.agency_settings_saved = true

      let self = this

      if (this.me.company_name.trim()) {
        this.$agency.company_name = this.me.company_name.trim()
        this.$appName = this.me.company_name.trim()
      }

      setTimeout(() => {
        self.agency_settings_saved = false
      }, 2000);
    },

    async saveGoogleReviewSettings(){
      this.savingGoogleReviewSettings = true;
      try {
        await this.$store.dispatch('me/save', {
          grid_use_which_api: this.me.settings.grid_use_which_api,
          grid_sab_enabled: this.me.settings.grid_sab_enabled ? '1' : '0',
          google_review_enabled: this.me.settings.google_review_enabled ? '1' : '0',
          google_local_guide: this.me.settings.google_local_guide ? '1' : '0'
          
        })
        this.$store.dispatch('me/fetch')
      }catch(error){
        console.log(error)
        this.agencySettingsError = error
      }
      this.savingGoogleReviewSettings = false;

    },

    async saveWebhookUrl(){
      this.savingWebhookUrl = true;
      this.webhookErrorMessage = null;

      const url = this.me.settings.webhook_url;

      if (url) {
        const urlPattern = new RegExp(
                    '^(https?:\\/\\/)?' + // protocol
                    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3})|' + // OR ip (v4) address
                    'localhost)' + // OR localhost
                    '(\\:\\d+)?' + // port
                    '(\\/[-a-zA-Z\\d%_.~+]*)*' + // path
                    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
                    'i'
                );

        if (urlPattern.test(url)) {
          if (url.startsWith('https://')) {
             
            try {
                await this.$store.dispatch('me/save', {
                  webhook_url: this.me.settings.webhook_url
                  
                })
                this.$store.dispatch('me/fetch')
              }catch(error){
                this.webhookErrorMessage = error;
                this.me.settings.webhook_url  = null;
              }

          }else{
           this.webhookErrorMessage = 'The Webhook URL must use HTTPS.';
           this.me.settings.webhook_url  = null;


          }
        }else {
          this.webhookErrorMessage = 'Invalid URL';
          this.me.settings.webhook_url  = null;

        }
      } 
      this.savingWebhookUrl = false;
    
      
    },

    async testWebhookUrl(){
      this.testingWebhookUrl = true;
      let webhookUrl = this.me.settings.webhook_url;
      try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/tools/test-webhook`, {
            url: webhookUrl,
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          });

          console.log(response.data);
          if (response.data.status === 'success') {
              this.$swal({
              icon: 'success',
              title: 'Success',
              html: "Webhook hit sent successfully.",
              confirmButtonText: 'OK'
            }).then(function() {

            });
          } else {
              this.$swal({
              icon: 'error',
              title: 'Error',
              html: "Failed to send webhook hit. Please check your configuration and try again",
              confirmButtonText: 'OK'
            }).then(function() {

            });
          }
      } catch (error) {
          this.$swal({
            icon: 'error',
            title: 'Error',
            html: "Failed to send webhook hit. Please check your configuration and try again",
            confirmButtonText: 'OK'
          }).then(function() {

          });
      } finally {
        this.testingWebhookUrl = false;
      }

    },

    async saveStripeSettings() {

      this.savingStripeSettings = true
      this.stripeSettingsError = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-stripe-settings`, {
        publishable_key: this.me.integrations.stripe.settings.publishable_key,
        secret_key: this.me.integrations.stripe.settings.secret_key,
        privacy_policy_link: this.me.integrations.stripe.settings.privacy_policy_link,
        terms_of_service_link: this.me.integrations.stripe.settings.terms_of_service_link
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingStripeSettings = false
        this.me.integrations.stripe.status = response.data.integration.status;
        this.me.integrations.stripe.settings = response.data.integration.settings;
      }
      else {
        this.stripeSettingsError = response.data.error
      }

      this.savingStripeSettings = false
    },

    async saveTwilioSettings() {

      this.savingTwilio = true
      this.errorTwilio = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-twilio-settings`, {
        account_sid: this.me.integrations.twilio.settings.account_sid,
        auth_token: this.me.integrations.twilio.settings.auth_token,
        phone_number: this.me.integrations.twilio.settings.phone_number || null,
        link_shortening: this.me.integrations.twilio.settings.link_shortening
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingTwilio = false
        this.me.integrations.twilio.status = response.data.integration.status;

        if (response.data.integration.status == 0)
          this.errorTwilio = "Your Twilio credentials are invalid."
        else {
          // if (this.me.integrations.twilio.settings.numbers.length == 0)
          this.getTwilioNumbers()
        }
      }
      else {
        this.errorTwilio = response.data.error
      }

      this.savingTwilio = false

    },

    async saveGoogleMapsKey() {
      this.savingGoogleMapsKey = true
      this.errorGoogleMaps = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-google-maps-settings`, {
        api_key: this.me.integrations.google_maps.settings.api_key
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingGoogleMapsKey = false
        this.me.integrations.google_maps.status = response.data.integration.status;

        if (response.data.integration.status == 0)
          this.errorGoogleMaps = "Your Google Maps key is invalid."
      }
      else {
        this.errorGoogleMaps = response.data.error
      }

      this.savingGoogleMapsKey = false
    },

    async saveValueSerpKey() {
      this.savingValueSerpKey = true
      this.errorValueSerp = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-value-serp-settings`, {
        api_key: this.me.integrations.value_serp.settings.api_key
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingValueSerpKey = false
        this.me.integrations.value_serp.status = response.data.integration.status;

        if (response.data.integration.status == 0)
          this.errorValueSerp = "Your Value Serp key is invalid."
      }
      else {
        this.errorValueSerp = response.data.error
      }

      this.savingValueSerpKey = false
    },

    async getTwilioNumbers() {

      this.gettingTwilioNumbers = true

      let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/agency/get-twilio-numbers`, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.gettingTwilioNumbers = false
        this.me.integrations.twilio.settings.numbers = response.data.integration.settings.numbers;
        this.me.integrations.twilio.settings.phone_number = response.data.integration.settings.phone_number;
      }

      this.gettingTwilioNumbers = false

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

          let response2 = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-logo`, {
            logo: response.data.url
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          this.me.logo = response.data.url
          this.$agency.logo = response.data.url

        }catch(e){
          console.log(e)
        }

        this.file = null
        this.uploading = false
      }
    },

    async onUploadMobile() {
      // console.log(this.file);
      if (this.file_mobile !== null) {
        this.uploading_mobile = true
        let formData = new FormData()
        formData.append("file", this.file_mobile)

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          let response2 = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-mobile-logo`, {
            logo: response.data.url
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          this.me.settings.logo_mobile = response.data.url
          this.$agency.settings.logo_mobile = response.data.url

        }catch(e){
          console.log(e)
        }

        this.file_mobile = null
        this.uploading_mobile = false
      }
    },

    async onUploadFavicon() {
      // console.log(this.file);
      if (this.file_favicon !== null) {
        this.uploading_favicon = true
        let formData = new FormData()
        formData.append("file", this.file_favicon)

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          let response2 = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-favicon`, {
            favicon: response.data.url
          }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          this.$agency.settings.favicon = response.data.url

          const favicon = document.getElementById("ReviewGrowerFavicon");
          favicon.href = this.$agency.settings.favicon;

        }catch(e){
          console.log(e)
        }

        this.file_favicon = null
        this.uploading_favicon = false
      }
    },

    async saveSMTPSettings() {

      this.savingSMTP = true
      this.errorSMTP = null

      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/save-smtp-settings`, {
        from_name: this.me.integrations.smtp.settings.from_name,
        from_email: this.me.integrations.smtp.settings.from_email,
        host: this.me.integrations.smtp.settings.host,
        port: this.me.integrations.smtp.settings.port,
        username: this.me.integrations.smtp.settings.username,
        password: this.me.integrations.smtp.settings.password,
        ssl_tls: this.me.integrations.smtp.settings.ssl_tls
      }, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      if (response.data.success) {
        this.savingSMTP = false
        this.me.integrations.smtp = response.data.integration;

        if (response.data.integration.status == 0)
          this.errorSMTP = "Your SMTP settings are invalid."
      }
      else {
        this.errorSMTP = response.data.error
      }

      this.savingSMTP = false

    },

    getExternalContactFormLink() {
        let url = process.env.VUE_APP_API_ENDPOINT + "/contacts/add-contact-externally"
        return url;
    },

    getExternalContactFormLinkWhiteLabeled() {
        let url = window.location.origin + "/api/contacts/add-contact-externally"
        return url;
    },

    async removeLogo() {
      await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/remove-logo`, {}, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      let self = this
      setTimeout(function() {
        window.location = window.location.href
      }, 200);
    },

    async removeLogoMobile() {
      await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/remove-mobile-logo`, {}, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      let self = this
      setTimeout(function() {
        window.location = window.location.href
      }, 200);
    },

    async removeFavicon() {
       await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/agency/remove-favicon`, {}, {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        }
      })

      let self = this
      setTimeout(function() {
        window.location = window.location.href
      }, 200);
    },

    formatDate(date) {
      return moment(date).format("MMM D, YYYY")
    },

    openGuide() {
      // window.open('https://reviewgrower.com/documentation/getting-started-guide/');
      window.open('https://localrecon.com/help/');
    },

    getApiDocsEndpoint() {
      return process.env.VUE_APP_DOCS_ENDPOINT;
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      profile: state => state.me.profile,
      agency: state => state.agency
    }),

    agencyHasGridTrackerAddon() {
      return true;

      for (var i in this.me.subscription.addons) {
        let userAddon = this.me.subscription.addons[i];
        for (var j in this.me.subscription.product_details.addons) {
          let productAddon = this.me.subscription.product_details.addons[j];
          if (productAddon.key == 'grid-tracker') {
            for (var x in this.me.subscription.product_details.addons[j].prices) {
              let price = this.me.subscription.product_details.addons[j].prices[x];
              if (userAddon.stripe_price == price.id) {
                return true;
              }
            }
          }
        }
      }

      return false;
    }
  },
  mounted() {
    let self = this
    setTimeout(function() {
      if (self.me.domain && (self.me.domain_status == 0 || self.me.ssl_status == 0)) {
        self.saveDomain();
      }

      if (self.me.integrations.twilio.settings.account_sid && self.me.integrations.twilio.status == 0)
        self.errorTwilio = "Your Twilio credentials are invalid."

      if (self.me.integrations.smtp.settings.host && self.me.integrations.smtp.status == 0)
        self.errorSMTP = "Your SMTP settings are invalid."

    }, 1000)

    if (typeof(self.$agency) == "undefined" || self.$agency == null) {
      self.$agency = self.me
    }
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

.token_password_toggle {
  position: absolute;
  margin-top: -30px;
  right: 20px;
}
</style>

