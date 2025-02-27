<template>

  <div>
    <dialog-purchase-credits v-if="me" ref="dialogPurchaseCredits"></dialog-purchase-credits>
    <dialog-credits-log ref="dialogCreditsLog"></dialog-credits-log>

    <panel-navigation>

      <!-- <div class="float-right">
          <div v-if="me && getCreditsAvailable() != 'Unlimited'" class="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded cursor-pointer float-right" @click="$refs.dialogCreditsLog.show()" style="margin-top: -5px;"><i class="fa fa-history"> </i> View Credits Log</div>
      </div> -->
      
      <h1 class="text-lg font-semibold mb-4">Billing</h1>
      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="!me || (me.subscription && me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing')" type="article, article, article"></v-skeleton-loader>

      <div v-else>

        <v-alert
          border="top"
          colored-border
          type="info"
          elevation="2"

          v-if="!me.subscription"
        >
          Please choose a subscription plan to continue.
        </v-alert>

        <v-alert
          border="top"
          colored-border
          type="warning"
          elevation="2"

          v-if="me.subscription && me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing'"
        >
          <span v-if="me.company_type == 'agency' && me.subscription.stripe_status != 'pending'">
            Your subscription is not active. Please re-subscribe below or contact us at <a href="mailto:support@reviewgrower.com" class="text-green-500">support@reviewgrower.com</a>
          </span>

          <span v-if="me.company_type == 'agency' && me.subscription.stripe_status == 'pending'">
            You have been given access to our <strong>{{ me.subscription.name.split("|")[1] }}</strong> plan. Please complete checkout below, you will not be billed.
          </span>

          <span v-if="me.company_type != 'agency'">
            Your subscription is not active. Please re-subscribe below or contact <strong>{{ $agency.company_name }}</strong> via email <a :href="'mailto:' + $agency.email" class="text-green-500">{{ $agency.email }}</a>
          </span>
        </v-alert>

        <div v-if="!me.subscription" class="flex flex-row justify-between items-center mb-4">
          <h2 class="text-gray-900">Choose Subscription</h2>
          <!-- <router-link to="/" class="text-sm text-gray-500">See all features</router-link> -->
        </div>

        <div v-if="me.subscription && me.subscription.stripe_status == 'canceled'" class="flex flex-row justify-between items-center mb-4">
          <h2 class="text-gray-900">Rejoin</h2>
          <!-- <router-link to="/" class="text-sm text-gray-500">See all features</router-link> -->
        </div>


        <div v-if="!me.subscription || (me.subscription.stripe_status != 'active' && me.subscription.stripe_status != 'trialing')" class="flex flex-row justify-center flex-wrap mb-8 -mx-1">

          <billing-product-plan v-for="(product, index) in me.available_products" :key="index" :name="product.name" :plan="index" buttonText="Subscribe" :active="me.currentProductSlug == 'starter'" @subscribe="subscribe">
            <div v-if="product.price > 0" class="whitespace-no-wrap py-4"><span class="text-3xl font-bold mr-1">{{ product.price }} {{ product.currency || me.subscription.product_details.currency }}</span>/mo</div>
            <div v-if="product.price == 0" class="whitespace-no-wrap py-4"><span class="text-3xl font-bold mr-1">0.00 {{ product.currency || me.subscription.product_details.currency }}</span>/mo</div>
            <div v-for="(feature, index) in product.features" :key="index" class="text-sm mb-1">{{ feature }}</div>
          </billing-product-plan>

          <!-- <billing-product-plan name="Enterprise" buttonText="Contact sales" :active="me.currentProductSlug == 'enterprise'">
            <div class="text-3xl">
              <font-awesome-icon icon="leaf" class="text-gray-200"/>
            </div>
          </billing-product-plan> -->

        </div>

        <div v-if="me.subscription && (me.subscription.stripe_status == 'active' || me.subscription.stripe_status == 'trialing')">
          <!-- <i class="fa fa-spin fa-spinner" style="font-size: 50px;"></i>
          <br /><br />
          Please wait, you are being redirected... -->

          <div class="flex flex-row flex-wrap">
            <div class="w-full sm:w-1/3 pr-6 mb-4">
              <div class="dashboard-box">
                <v-card
                  class="pa-2"
                  tile
                >
                  <div class="p-3">
                    <div style="text-align: center;">
                      <strong>{{ me.subscription.product_details.name }}</strong>

                      <br /><br />
                    
                      <strong style="font-size: 24px;" v-if="me.subscription.stripe_price > 0">{{ me.subscription.stripe_price }} {{ me.subscription.product_details.currency || me.subscription.product_details.currency }} <span style="font-size: 12px; color: #757B89;">/ {{ me.subscription.product_details.frequency || "month" }}</span></strong>
                      <strong style="font-size: 24px;" v-if="me.subscription.stripe_price == 0">0.00 {{ me.subscription.product_details.currency || me.subscription.product_details.currency }} <span style="font-size: 12px; color: #757B89;">/ {{ me.subscription.product_details.frequency || "month" }}</span></strong>
                      
                      <br /><br />
                    </div>

                    <div class="mb-2">
                      <strong style="font-size: 12px;">Features</strong>
                    </div>

                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; More Widgets</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; More Reports</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Better Design</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Custom CSS</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Webhooks</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; API's</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Scheduled Reports</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Bulk Reports</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Google Analytics</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Lead Details Page</p>
                    <p class="text-sm"><i class="fa fa-check text-green-600"></i>&nbsp;&nbsp;&nbsp; Widget Details Page</p>
                    
                    <div v-if="me.subscription.stripe_id == 'starter'" class="mb-4 mt-4">
                      <v-btn
                        color="success"
                        @click="window.location = upgradeFromFree()"
                      >
                        <i class="fa fa-arrow-up"></i> &nbsp; &nbsp; Upgrade
                      </v-btn>
                    </div>
                </div>
                </v-card>
                
                <!-- <p class="text-sm text-gray-600">Reviews Credits: {{ me.credits_monthly }}</p> -->
              </div>

              <div v-if="me.subscription.product_details.addons" class="dashboard-box mt-3">
                <v-card
                  class="pa-2"
                  tile
                >
                  <div class="p-3">
                    <div style="text-align: center;">
                      <strong>Addons</strong>

                      <br /><br />
                    </div>

                    <div class="mb-2 text-sm">
                      <i v-if="loadingAddons" class="fa fa-spin fa-spinner"></i>

                      <div v-else>
                        <div v-for="(item, index) in me.subscription.product_details.addons" :key="index"
                        >
                          <div v-if="isAddonActive(item)">
                            <div class="float-left">
                              <i class="fa fa-check text-green-600 mr-2"></i>  
                              <strong>{{ item.name }}</strong> - ${{ item.prices[0].amount.toFixed(2) }} / {{item.prices[0].frequency}}
                            </div>

                            <div class="float-right">
                              <div class="bg-danger text-white text-xs text-bold inline-block rounded py-1 px-2 cursor-pointer -mt-2" @click="deActivateAddon(item, item.prices[0])"><i class="fa fa-stop mr-1"> </i> DEACTIVATE</div>
                            </div>
                          </div>

                          <div v-else>
                            <div class="float-left">
                              <i class="fa fa-times text-red-600 mr-2"></i>  
                              <strong>{{ item.name }}</strong> - ${{ item.prices[0].amount.toFixed(2) }} / {{item.prices[0].frequency}}
                            </div>

                            <div class="float-right">
                              <div class="bg-blue text-white text-xs text-bold inline-block rounded py-1 px-2 cursor-pointer -mt-2" @click="activateAddon(item, item.prices[0])"><i class="fa fa-plus mr-1"> </i> ACTIVATE</div>
                            </div>
                          </div>

                          <div class="clearfix"></div>

                          <div v-if="item.prices[0].price_per_seat" class="pl-6">
                            <p class="text-sm text-gray-600">And ${{ item.prices[0].price_per_seat.toFixed(2) }} per business. </p>
                          </div>

                        </div>
                      </div>
                      
                    </div>
                </div>
                </v-card>
                
                <!-- <p class="text-sm text-gray-600">Reviews Credits: {{ me.credits_monthly }}</p> -->
              </div>
            </div>

            <div v-if="profile.settings.role != 'Manager (readonly)'" class="w-full sm:w-2/3 pr-6 mb-4">
              <!-- <div class="mb-4">
                <h2 class="font-bold text-gray-800">Reviews Credits</h2>
              </div>
              <div class="bg-gray-100 rounded p-4">
                <p style="font-size: 20px;">
                  Available: <strong>{{ getCreditsAvailable() }}</strong>
                </p>
                <div v-if="getCreditsAvailable() != 'Unlimited'">
                  <p v-if="me.credits_monthly > 0" class="text-sm text-gray-600">Usage This Month: <strong>{{ commafy(me.credits_used) }}/{{ commafy(me.credits_monthly) }}</strong> &nbsp; <i class="fa fa-redo"></i> {{ formatDate(me.credits_reset_date) }}</p>
                  <p class="text-sm text-gray-600">One-Time Credits: <strong>{{ commafy(me.credits_extra) }}</strong> | <a href="javascript: void(0);" @click="$refs.dialogPurchaseCredits.show()">Buy More</a></p>
                  <p class="text-sm text-gray-600"><i class="fa fa-sync"></i> Auto-Recharge <strong>{{ commafy(me.subscription.product_details.credits.reviews_scraping.recharge_amount) }}</strong> when it drops under <strong>{{ commafy(me.subscription.product_details.credits.reviews_scraping.recharge_threshold) }}</strong> credits</p>
                </div>
              </div> -->

              <div class="dashboard-box">
                <v-card
                  class="pa-2"
                  tile
                >
                  <div class="p-3">

                    <br /><br /><br />

                    <div class="dashboard-box-iconsquare">
                      <div class="dashboard-box-icon-background"></div>
                      <div class="dashboard-box-icon">
                        <i class="mdi mdi-credit-card-outline"></i>
                      </div>
                    </div>

                    <div style="text-align: center;">
                      <div class="pt-2 pb-2">
                        <strong>Manage Your Billing</strong>
                      </div>

                      <div v-if="(me.subscription.product_details && me.subscription.product_details.use_stripe == 1) || me.company_type == 'agency'">
                        <div class="text-sm mb-4 text-gray-600">
                          Click the button below to change your plan, payment method,<br /> cancel subscription or view your invoices.
                        </div>

                        <br />

                        <div class="bg-blue text-white text-xs text-bold inline-block rounded py-2 px-3 cursor-pointer" @click="goToCustomerPorta()"><i class="fa fa-credit-card mr-2"> </i> MANAGE BILLING</div>
                      </div>
                      <div v-else>
                        <div class="text-sm mb-4 text-gray-600">
                          Please contact your account owner in order to manage your billing.
                        </div>
                      </div>


                      <br v-if="!me.parent_id" />

                      <div v-if="!me.parent_id" class="bg-red-500 text-white text-xs text-bold inline-block rounded py-2 px-3 mt-3 cursor-pointer" @click="openRaaftCancelFlow()"><i class="fa fa-times mr-2"> </i> CANCEL MY ACCOUNT</div>
                    </div>
                    
                    <br /><br /><br />
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>

        <!--
        <h2 class="mb-4 text-gray-900">Credit Card Information</h2>
        <div class="flex flex-row justify-between items-center bg-gray-100 p-3 rounded mb-8 text-gray-800">
          <div class="flex flex-row justify-start">
            <div class="mr-4">VISA ending in <span class="font-mono">1234</span></div>
            <div>Expires <span class="font-bold">05/22</span></div>
          </div>
          <div class="rounded px-2 py-1 bg-gray-300 cursor-pointer text-sm text-gray-700 hover:bg-gray-200">Update</div>
        </div>
        -->

        <div v-if="me.currentProductSlug" class="">
          <div v-if="me.stripeStatus == 'canceled'" class="text-sm float-right">Your subscription will end at the next billing cycle.</div>
          <div v-else @click="cancel" class="text-red-500 text-sm float-right cursor-pointer hover:text-red-400">Cancel subscription</div>
          <div class="clearfix"></div>
        </div>


        <div v-if="invoices.length > 0" class="mt-6">
          <h2 class="mb-4">Invoices</h2>
          <a v-for="invoice in invoices" :key="invoice.number" target="_blank" :href="invoice.invoice_pdf" class="flex flex-row justify-between border-b border-gray-100 font-mono text-sm hover:bg-gray-100">
            <div class="">Invoice {{invoice.number}}</div>
            <div class="text-gray-600">{{ new Date(invoice.created * 1000) | moment('YYYY-MM-DD') }}</div>
          </a>
        </div>


      </div>

      <!-- <dialog-stripe-payment ref="dialogStripePayment" :plan="paymentPlan" :price="paymentPrice"></dialog-stripe-payment> -->


    </panel-navigation>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
// import DialogStripePayment from '@/components/dialogs/dialogStripePayment.vue'
import BillingProductPlan from '@/components/billing/billingProductPlan.vue'
import moment from 'moment'
import DialogPurchaseCredits from '@/components/dialogs/billing/purchaseCredits.vue'
import DialogCreditsLog from '@/components/dialogs/billing/creditsLog.vue'

// const stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

export default {
  metaInfo () {
    return {
      title: "Billing | " + this.$appName
    }
  },
  data() {
    return {
      complete: false,
      paymentPlan: null,
      paymentPrice: null,
      invoices: [],
      loadingAddons: false
    }
  },
  components: {
    PanelNavigation,
    BillingProductPlan,
    DialogPurchaseCredits,
    DialogCreditsLog
  },
  computed: {
    ...mapState({
      profile: state => state.me.profile,
      me: state => state.me.me
    })
  },
  methods: {
    upgradeFromFree() {
      let product = {
        plan: "growth"
      };

      this.subscribe(product);
    },
    subscribe(product) {
      window.location = process.env.VUE_APP_API_ENDPOINT + "/billing/checkout/" + this.me.uuid + "?product=" + product.plan + "&origin=" + window.location.origin + "&tid=" + this.getCookie("_fprom_tid");
    },
    goToCustomerPorta() {
      window.location = this.getCustomerPortalUrl()
    },
    getCustomerPortalUrl() {
      console.log(process.env.VUE_APP_API_ENDPOINT + "/billing/portal/" + this.me.uuid)
      return process.env.VUE_APP_API_ENDPOINT + "/billing/portal/" + this.me.uuid;
    },
    getCheckoutUrl() {
      return process.env.VUE_APP_API_ENDPOINT + "/billing/checkout/" + this.me.uuid + "?product=" + this.me.subscription.name.split("|")[2].trim() + "&origin=" + window.location.origin + "&as=1" + "&tid=" + this.getCookie("_fprom_tid");
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    async cancel(){
      try {
        await this.$store.dispatch('me/cancelSubscription')
        this.$store.dispatch('me/fetch')
      }catch(e){
        console.log(e)
      }
    } ,
    async fetchInvoices() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/stripe/invoices`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })
        this.invoices = response.data.invoices
      } catch (e) {
        console.log(e)
      }
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    },
    commafy: function( num ) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    },
    getCreditsAvailable() {
      let available_credits = this.me.credits_monthly + this.me.credits_extra - this.me.credits_used

      if (available_credits < 0)
        return "Unlimited"

      return this.commafy(available_credits)
    },

    openRaaftCancelFlow() {
      window.location = "mailto: deejayundoo@gmail.com?subject=Cancel Local Recon";
      return;

      raaft('startCancelFlow', {
          authKey: this.me.settings.raaft_security_token, //generated in step 2
          subscriptionId: this.me.subscription.stripe_id
      });
    },

    isAddonActive(addon) {
      for (var i in this.me.subscription.addons) {
        let userAddon = this.me.subscription.addons[i];

        if (userAddon.stripePrice == addon.id) {
          return true;
        }
      }

      return false;
    },

    activateAddon(addon, price) {
      let self = this;

      this.$swal({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          cancelButtonText: "No",
          showLoading: true,
          html: "This action will activate addon <strong>" + addon.name + "</strong> for <strong>USD " + price.amount + " / " + price.frequency,
        }).then(function(result) {

          if (result.isConfirmed) {
            self.loadingAddons = true;
            axios.post(`${process.env.VUE_APP_API_ENDPOINT}/billing/activate-addon`, {
              addon: addon,
              price: price
            }, {
              headers: {
                'Authorization': 'Bearer ' + self.$store.state.auth.jwt
              }
            }).then(function() {
              self.$store.dispatch('me/fetch');
              self.loadingAddons = false;
            })
          }

        });
    },
    deActivateAddon(addon, price) {
      let self = this;
      console.log('addon', addon)
      console.log('price', price)

      this.$swal({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          cancelButtonText: "No",
          html: "This action will deactivate addon <strong>" + addon.name + "</strong>.",
        }).then(function(result) {

          if (result.isConfirmed) {
            self.loadingAddons = true;
            axios.post(`${process.env.VUE_APP_API_ENDPOINT}/billing/deactivate-addon`, {
              addon: addon,
              price: price
            }, {
              headers: {
                'Authorization': 'Bearer ' + self.$store.state.auth.jwt
              }
            }).then(function() {
              self.$store.dispatch('me/fetch');
              self.loadingAddons = false;
            })
          }

        });
    }
  },
  mounted() {
    this.$store.dispatch('me/fetch')
    // this.fetchInvoices()

    var self = this;

    runStartScripts();

    function runStartScripts() {
      if (!self.me || self.me === null) {
        setTimeout(function() {
          runStartScripts();
        }, 1000);
        return;
      }

      if (self.me.subscription && self.me.subscription.stripe_status != "active" && self.me.subscription.stripe_status != "trialing")
        window.location = self.getCheckoutUrl()

      if (self.$route.query.ad) {
        let addon = self.$route.query.ad;
        let frequency = self.$route.query.f;

        for (var i in self.me.subscription.product_details.addons) {
          let thisAddon = self.me.subscription.product_details.addons[i];
          if (thisAddon.key == addon) {
            let whichPrice = thisAddon.prices[0];

            if (self.$route.query.f) {
              for (var j in thisAddon.prices) {
                let thisPrice = thisAddon.prices[j];
                if (thisPrice.frequency == self.$route.query.f) {
                  whichPrice = thisPrice;
                }
              }
            }

            if (!self.isAddonActive(thisAddon))
              self.activateAddon(thisAddon, whichPrice);
          }
        }
      }
    }
  }
}
</script>

