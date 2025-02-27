<template>

    <div>
      
      <panel-navigation>
  
        <div class="float-right ml-5 -mt-1">
          <!-- <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="$refs.dialogAddUser.createUser(); $refs.dialogAddUser.show()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> ADD USER</div> -->
        </div>
  
        <h1 class="text-lg font-semibold mb-3">Users</h1>
  
        <hr class="border-b border-gray-100 mb-3">
  
      

  
        <template>
          <div class="dashboard-box">
            <v-card
              class="pa-2"
              tile
            >
              <div class="p-3">
                
                <div class="w-full md:w-1/3 pr-3">
                    <v-text-field
                      v-model="search"
                      clearable
                      outlined
                      dense
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
                      @input="handleSearch"
                    ></v-text-field>
                </div>
                <br clear="all" />
  
                <div  v-if="!fetchingUsers && users.length >= 0" class="overflow-x-scroll" >
                  <div class="p-3 custom-data-table">
                    <div style="clear: both; padding-top: 0px;">
                      <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="50"
                        class="rg-datatable elevation-1"
                        mobile-breakpoint="10"
                        :search="search"
                      >

                        <template v-slot:item.first_name="{ item }">
                          <span >
                            <!-- <router-link :to="'/user-details/' + item.id">{{ item.first_name }} {{ item.last_name }}</router-link> -->
                            <span >{{ item.first_name }} {{ item.last_name }}</span>
                          </span>
                            
                        </template>

                        <template v-slot:item.email="{ item }">
                          <!-- <router-link :to="'/user-details/' + item.id">{{ item.email ? item.email : '-' }}</router-link> -->
                          <span>{{ item.email ? item.email : '-' }}</span>
                        </template>

                        <template v-slot:item.last_activity="{ item }">
                          <span >{{ item.last_activity ? formatDate(item.last_activity.created_at) : '-' }}</span>
                        </template>

                        <template v-slot:item.last_login="{ item }">
                          <span >{{ item.last_login ? formatDate(item.last_login.created_at) : '-' }}</span>
                        </template>

                        <template v-slot:item.subscription_name="{ item }">
                          <span >{{ getSubscriptionName(item.subscription_name)  }}</span>
                        </template>

                        <template v-slot:item.created_at="{ item }">
                          <span >{{ formatDate(item.created_at) }}</span>
                        </template>

                        <template v-slot:item.signup_ip="{ item }">
                          <span >{{item.signup_ip ? item.signup_ip : '-'}}</span>
                        </template>

                        <template v-slot:item.login_ip="{ item }">
                          <span >{{item.login_ip ? item.login_ip : '-'}}</span>
                        </template>

                        <template v-slot:item.stripe_id="{ item }">
                            <a :href="'https://dashboard.stripe.com/customers/' + item.stripe_id" target="_blank" style="text-decoration: none;   cursor: pointer;">
                              <v-chip 
                              small
                              color="blue lighten-5"
                              text-color="blue lighten-1"
                              style="cursor: pointer;"  
                              >
                              View Account
                              </v-chip>
                          </a>
                        </template>

                        <template  v-slot:item.uuid="{ item }">
                          <v-btn 
                            color="red" 
                            @click="openPasswordResetModal(item.id)" 
                            icon 
                            small
                            >
                            <v-icon>mdi-lock-reset</v-icon> 
                          </v-btn>
                        </template>

                        <template v-slot:item.subscription_status="{ item }">
                         
                         <v-chip
                           v-if="item.subscription_status === 'active'"
                           small
                           color="green lighten-5"
                           text-color="green lighten-1"
                         >
                           Enabled
                         </v-chip>

                         <v-chip
                           v-else-if="item.subscription_status"
                           small
                           color="grey lighten-3"
                           text-color="grey"
                           class="capitalize"
                         >
                           {{ item.subscription_status }}
                         </v-chip>

                         <v-chip
                           v-else
                           small
                           color="red lighten-5"
                           text-color="red"
                         >
                           No Subscription
                         </v-chip>

                       </template>

                      </v-data-table>

                    </div>
                </div>
               </div>
              
               <div v-if="!fetchingUsers && users.length > 0"  class="mt-5">
                        <v-pagination
                            v-model="currentPage"
                            :length="totalPages"
                            :total-visible="9"
                            color="primary"
                            rounded="circle"
                            @input="fetchUsers"
                        ></v-pagination>
                </div>
            </div>
            </v-card>
          </div>

            <!-- Password Reset Modal -->
            <div v-if="isModalVisible" @click.self="closeModal" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
              <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">
                  <div class="rg-modal-header">
                      <span>Reset your password</span>
                      <a href="javascript: void(0);" class="rg-modal-close-btn" @click="closeModal">
                          <i class="fa fa-times"></i>
                      </a>
                  </div>

                  <div class="p-4">
                      <div class="text-center text-sm mb-4 pt-2" style="font-weight: normal;">
                          Please enter your new password.
                      </div>

                      <!-- Alert Message Section -->
                      <div v-if="alertMessage" :class="['text-center', 'py-2', 'rounded', alertType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
                          {{ alertMessage }}
                      </div>

                      <!-- Password Form -->
                      <form>
                          <!-- New Password Field -->
                          <div class="mb-3">
                              <p class="mb-1 text-xs mb-2"><strong>New Password</strong></p>
                              <input
                                  v-model="newPassword"
                                  id="newPassword"
                                  name="newPassword"
                                  type="password"
                                  placeholder="Enter new password"
                                  class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                                  required
                              />
                              <p v-if="newPassword && newPassword.length < 6" class="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
                          </div>

                          <!-- Confirm Password Field -->
                          <div class="mb-3">
                              <p class="mb-1 text-xs mb-2"><strong>Confirm Password</strong></p>
                              <input
                                  v-model="confirmPassword"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="Confirm new password"
                                  class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded"
                                  required
                              />
                              <!-- Validation: Passwords must match -->
                              <p v-if="confirmPassword && confirmPassword !== newPassword" class="text-red-500 text-xs mt-1">Passwords must match</p>
                          </div>
                      </form>

                  </div>


                  <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                      <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right"  @click="updatePassword">
                          SAVE
                      </button>

                      <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="closeModal">
                          CANCEL
                      </button>

                      <div class="clearfix"></div>

                    </div>

              </div>
          </div>

        </template>

        <v-skeleton-loader v-if="fetchingUsers" type="article, article, article"></v-skeleton-loader>

      </panel-navigation>
    </div>
  
    
  </template>
  
  <script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import moment from 'moment'
  
  export default {
    metaInfo () {
      return {
        title: "Users | " + this.$appName
      }
    },
    components: {
      PanelNavigation,
    },
    data() {
      return {
        selectedIds: [],
        fetchingUsers : false,
        users: [],
        currentPage: 1,
        totalItems: 0,
        perPage: 50,
        totalPages: 0,
        isModalVisible: false,
        newPassword: '',
        confirmPassword: '',
        alertMessage: '', // Alert message text
        alertType: '',
        userId: null,
        valid: false,
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters',
        ],
        headers: [
        { text: 'Name', value: 'first_name' },
        { text: 'Email', value: 'email' },
        { text: 'Last Activity', value: 'last_activity' },
        { text: 'Last Login', value: 'last_login' },
        { text: 'Subscription', value: 'subscription_name' },
        { text: 'Added', value: 'created_at' },
        { text: 'Signup Ip', value: 'signup_ip' },
        { text: 'Login Ip', value: 'login_ip' },
        { text: 'Stripe Account', value: 'stripe_id' },
        { text: 'Reset Password', value: 'uuid', sortable: false },
        { text: 'Status', value: 'subscription_status' },

      ],

      show_contact_log: false,

      searchLocal: "",
      search: "",
      }
    },
    computed: {
      ...mapState({
        me: state => state.me.me
      }),
      sortedUsers() {
        return this.users.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }
    },
    methods: {
        getSubscriptionName(subscriptionString) {
            if (subscriptionString) {
                // Split the string by ' | '
                const parts = subscriptionString.split(' | ');

                // Check the number of parts and return accordingly
                if (parts.length === 1) {
                return parts[0].trim(); // Only one part, return it as is
                } else if (parts.length >= 3) {
                return parts[1].trim(); // Return the middle part for 3 or more parts
                } else {
                return subscriptionString; // Fallback for other cases
                }
            }
            return 'No Subscription'; // Handle case where subscriptionString is empty or null
        },

      async bulkDelete() {
        console.log(this.selectedIds)
        // await this.$store.dispatch('users/bulkDelete', {Ids: this.selectedIds})
        // this.$store.dispatch('users/fetch')
      },
  

        openPasswordResetModal(id) {
            this.userId = id;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false
            this.resetForm();
        },
        resetForm() {
            this.newPassword = '';
            this.confirmPassword = '';
            this.valid = false;
        },
        async updatePassword() {
            if (this.newPassword.length >= 6 && this.newPassword === this.confirmPassword) {
                try {
                    await axios.post(
                        `${process.env.VUE_APP_API_ENDPOINT}/me/updatepassword`,
                        {
                        user_id: this.userId,
                        password: this.newPassword,
                        password_confirmation: this.confirmPassword,
                        },
                        {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
                        },
                    }
                );

                    // Show success message inside the modal
                    this.alertMessage = 'Password updated successfully!';
                    this.alertType = 'success';

                    // Optionally, close the modal after a short delay
                    setTimeout(() => {
                    this.closeModal();
                    }, 2000);
                } catch (error) {
                   // Show error message inside the modal
                    this.alertMessage = 'Failed to update password. Please try again.';
                    this.alertType = 'error';
                }
            }
        },

  
      formatDate(date) {
        return moment(date).format("MMM D, YYYY")
      },
      async fetchUsers() {
            this.fetchingUsers = true;
            
            try {
                // Prepare the request parameters
                const params = {
                    page: this.currentPage,  // Current page
                    perPage: this.perPage,
                    search: this.search  
                };

                let response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/adminusers`, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                    params: params 
                });

                if (response.status === 200) {
                    this.fetchingUsers = false;
                    this.users = response.data.data;
                    this.totalItems = response.data.total; 
                    this.totalPages = response.data.last_page; 
                }
            } catch (error) {
                this.fetchingUsers = false;
                console.log(error);
            }
      },
      handleSearch() {
        this.currentPage = 1;
        this.fetchUsers();
      }
    },
    mounted() {
        this.fetchUsers();
    //   this.fetchingUsers = true
    //   this.$store.dispatch('users/fetch')
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
  