<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Integrations Instructions</h2>

        <hr class="border-b border-gray-100 mb-4">

        <v-tabs>
            <v-tab>Twilio</v-tab>
            <v-tab>SMTP</v-tab>

            <v-tab-item class="pt-4">
                <p class="text-sm">
                    We use Twilio for sending SMS to contacts. Make sure you have a Twilio account and store your authentication credentials in Lead Finder, so you can start sending SMS. If you don't have a Twilio account, click <a href="https://www.twilio.com/try-twilio" target="twilio">here</a> to create one now.
                    <br /><br />
                    See our instructions below for required fields:
                </p>

                <hr class="mb-4" />

                <strong>
                    Account SID
                </strong>

                <p class="text-xs text-gray-700 mt-2">Located in your Twilio Dashboard, the Account SID is used for authenticating your SMS requests.</p>

                <strong>
                    Auth Token
                </strong>

                <p class="text-xs text-gray-700 mt-2">Also located in your Twilio Dashboard, the Auth Token is a secure token that is used to authenticate your SMS requests, along with the Account SID. Always store your token securely to protect your account and do not share it with anyone.</p>

                <strong>
                    Outgoing SMS Phone Number
                </strong>

                <p class="text-xs text-gray-700 mt-2">You also need an outgoing number, which can be purchased on <a href="https://console.twilio.com/us1/develop/phone-numbers/manage/incoming?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%3Fx-target-region%3Dus1" target="twilio-numbers">this page</a>.</p>

                <hr class="mb-4" />
                
                <p class="text-sm">
                    Follow <a href="https://Lead Finder.com/documentation/how-do-i-create-and-integrate-a-twilio-account/" target="twilio-documentation">this link</a> for more details on how to configure your Twilio account.
                </p>
                
                <p class="text-sm">
                    Read <a href="https://Lead Finder.com/documentation/setting-up-twilio-trust-hub/" target="twilio-documentation-trust-hub">our article</a> for setting up Twilio Trust Hub. Without this, SMS messages will fail.
                </p>
            </v-tab-item>

            <v-tab-item class="pt-2">
                <p class="text-sm">
                    To start sending emails to contacts, you need to configure your SMTP settings. These settings will be used to handle outbound emails.
                    <br /><br />
                    See our instructions for most common email providers:
                </p>

                <hr class="mb-4" />

                <v-expansion-panels>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        AWS SES
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="text-xs text-gray-700 mt-2">
                            <strong>From Name:</strong> Your full name <br />
                            <strong>From Email:</strong> Email address authorized in your SES account <br />
                            <strong>Username:</strong> Generated SMTP credentials username <br />
                            <strong>Password:</strong> Generated SMTP credentials password <br />
                            <strong>Host:</strong> email-smtp.us-east-1.amazonaws.com <br />
                            <strong>Requires SSL:</strong> Yes
                            <strong>Port:</strong> 587 <br />

                            <br /><br />

                            <a href="https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html" target="aws-ses-credentials">Click Here</a> for information on how to generate your SES SMTP credentials.
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        Sendgrid
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="text-xs text-gray-700 mt-2">
                            <strong>From Name:</strong> Your full name <br />
                            <strong>From Email:</strong> Email address authorized in your Sendgrid account <br />
                            <strong>Username:</strong> Sendgrid SMTP username <br />
                            <strong>Password:</strong> Sendgrid SMTP password <br />
                            <strong>Host:</strong> smtp.sendgrid.net <br />
                            <strong>Requires SSL:</strong> Yes <br />
                            <strong>Port:</strong> 587

                            <br /><br />
                            <a href="https://docs.bitnami.com/azure-templates/faq/configuration/use-external-smtp/" target="sendgrid-information">Click Here</a> for more information.
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        Gmail
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="text-xs text-gray-700 mt-2">
                            <strong>From Name:</strong> Your full name <br />
                            <strong>From Email:</strong> Your full Gmail address (e.g. you@gmail.com) <br />
                            <strong>Username:</strong> Your full Gmail address (e.g. you@gmail.com) <br />
                            <strong>Password:</strong> The password that you use to log in to Gmail <br />
                            <strong>Host:</strong> smtp.gmail.com <br />
                            <strong>Requires SSL:</strong> Yes <br />
                            <strong>Port:</strong> 587
                            
                            <br /><br />
                            In some cases, Google requires extra verification. <a href="https://Lead Finder.com/documentation/how-to-connect-your-gmail-account-in-review-grower/" target="sendgrid-information">Click Here</a> if you are having trouble connecting your Gmail account.
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        Yahoo
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="text-xs text-gray-700 mt-2">
                            <strong>From Name:</strong> Your full name <br />
                            <strong>From Email:</strong> Your full Yahoo address (e.g. you@yahoo.com) <br />
                            <strong>Username:</strong> Your full Yahoo address (e.g. you@yahoo.com) <br />
                            <strong>Password:</strong> The password that you use to log in to Yahoo <br />
                            <strong>Host:</strong> smtp.mail.yahoo.com <br />
                            <strong>Requires SSL:</strong> Yes <br />
                            <strong>Port:</strong> 465
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        Outlook
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="text-xs text-gray-700 mt-2">
                            <strong>From Name:</strong> Your full name <br />
                            <strong>From Email:</strong> Your full Outlook address (e.g. you@outlook.com) <br />
                            <strong>Username:</strong> Your full Outlook address (e.g. you@outlook.com) <br />
                            <strong>Password:</strong> The password that you use to log in to Outlook <br />
                            <strong>Host:</strong> smtp.office365.com />
                            <strong>Requires SSL:</strong> Yes <br />
                            <strong>Port:</strong> 587
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
        </v-tabs>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Close
        </button>

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
      sending: false,
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
      this.sending = false
    }
  }
}
</script>
