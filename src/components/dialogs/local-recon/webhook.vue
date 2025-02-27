<template>

    <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
      <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">
  
        <div class="rg-modal-header">
          Webhook
  
          <a href="javascript: void(0);" class="rg-modal-close-btn" @click="hide"><i class="fa fa-times"></i></a>
        </div>
  
        <div class="p-6">
  
          <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            {{success}}
          </div>
  
          <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <div v-html="error"></div>
          </div>
  
          <div class="mb-3">
            <p class="mb-1 text-xs mb-1"><strong>
              URL
            </strong></p>
            <input name="link" ref="link" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text"
              :value="getExternalContactFormLink()"
            >
          </div>
  
          <div class="mb-3">
            <p class="mb-1 text-xs mb-1"><strong>
              Method
            </strong></p>
            <input name="method" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text"
              value="POST" readonly
            >
          </div>
  
          <div class="mb-3">
            <p class="mb-1 text-xs mb-1"><strong>
              PARAMETERS
            </strong></p>
            <div style="border: solid 1px #CCCCCC; padding: 15px; padding-top: 20px; border-radius: 10px;">
              <code style="padding: 5px;">first_name</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's first name</span>
              <v-chip
                class="ma-2"
                x-small
                color="pink"
                text-color="white"
              >
                required
              </v-chip>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px;">last_name</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's last name</span>
              <v-chip
                class="ma-2"
                x-small
                color="pink"
                text-color="white"
              >
                required
              </v-chip>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px;">email</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's email address</span>
              <v-chip
                class="ma-2"
                x-small
                color="pink"
                text-color="white"
              >
                required
              </v-chip>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px;">company_name</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's company name</span>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px;">company_address</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's company address</span>
              <div class="mt-2"></div>
              
              
              <code style="padding: 5px;">city</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's city</span>
              <div class="mt-2"></div>
              
              
              <code style="padding: 5px;">state</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's state</span>
              <div class="mt-2"></div>
              
              
              <code style="padding: 5px;">zip</code>
              <span class="text-xs text-gray-700 ml-2"> Lead's zip code</span>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px;">api_token</code>
              <span class="text-xs text-gray-700 ml-2"> <strong>{{ $store.state.me.me.uuid }}</strong></span>
              <v-chip
                class="ma-2"
                x-small
                color="pink"
                text-color="white"
              >
                required
              </v-chip>
              <div class="mt-2"></div>
            </div>
          </div>
  
          <div class="mb-3">
            <p class="mb-1 text-xs mb-1"><strong>
              RESPONSES
            </strong></p>
            <div style="border: solid 1px #CCCCCC; padding: 15px; padding-top: 20px; border-radius: 10px;">
              <code style="padding: 5px; font-size: 11px;">{"success":true}</code>
              <span class="text-xs text-gray-700 ml-2"> Success</span>
              <div class="mt-2"></div>
  
  
              <code style="padding: 5px; font-size: 11px;">{"success":false,"message":"API Token Invalid."}</code>
              <span class="text-xs text-gray-700 ml-2"> Failure</span>
              <div class="mt-2"></div>
            </div>
          </div>
  
          <!-- <div class="mb-3">
            <p class="mb-1 text-xs mb-1"><strong>
              Example CURL
            </strong></p>
            <div style="border: solid 1px #CCCCCC; padding: 15px; padding-top: 20px; border-radius: 10px;">
              <code style="padding: 5px; font-size: 11px;">curl -X POST --data 'first_name=John&last_name=Doe&email=myemail@gmail.com&phone=+12311241214&api_token={{ $store.state.me.me.uuid }}' '{{ getExternalContactFormLink() }}'</code>
              <div class="mt-2"></div>
            </div>
          </div> -->
  
        </div>
  
        <div class="bg-gray-100 rounded-b-lg px-6 py-4">
  
          <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right"
            v-clipboard:copy="'curl -X POST --data \'first_name=John&last_name=Doe&email=myemail@gmail.com&api_token=' + $store.state.me.me.uuid + '\' \'' + getExternalContactFormLink() + '\''"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
              COPY CURL EXAMPLE
          </button>
  
          <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="hide">
              CLOSE
          </button>
  
          <div class="clearfix"></div>
  
        </div>
  
      </div>
    </div>
  
  </template>
  
  <script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  
  export default {
    data: function() {
      return {
        showModal: false,
        saving: false,
        success: null,
        error: null
      }
    },
    methods: {
      show() {
        this.showModal = true
      },
      hide() {
        this.showModal = false
        this.saving = false
      },
      onCopy: function (e) {
          this.$swal({
              title: "Copied",
              text: "Example CURL copied successfully!",
              showCancelButton: false,
              });
      },
      onError: function (e) {
          alert('Failed to copy the link to the clipboard')
          console.log(e);
      },
      copy() {
        
      },
      getExternalContactFormLink() {
          // if (this.$agency.settings.contacts_webhook == "white_labeled")
          //   return this.getExternalContactFormLinkWhiteLabeled();
  
          let url = process.env.VUE_APP_API_ENDPOINT + "/leads/add-lead-externally"
      //this.$store.state.me.me.uuid
          return url;
      },
  
      getExternalContactFormLinkWhiteLabeled() {
          let url = window.location.origin + "/api/contacts/add-lead-externally/"
          return url;
      }
    }
  }
  </script>
  