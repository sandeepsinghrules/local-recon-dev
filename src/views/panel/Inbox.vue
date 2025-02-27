<template>

  <div class="fill-height">
    <panel-navigation class="fill-height" :inbox="true">

        <div v-if="send_message_form" @click.self="send_message_form = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/3 bg-white rounded-lg mx-6">

            <div class="rg-modal-header">
                New Chat

                <a href="javascript: void(0);" class="rg-modal-close-btn" @click="send_message_form = false;"><i class="fa fa-times"></i></a>
            </div>

            <div class="p-6">

                <div class="mb-3">
                    <p class="mb-1 text-xs mb-2"><strong>
                        Phone Number
                    </strong></p>
                    <input name="new_thread_number" v-model="new_thread_number" placeholder="e.g. +18123131213" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text">
                </div>

            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right" @click="addNumber()">
                    ADD
                </button>

                <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="send_message_form = false;">
                    CANCEL
                </button>

                <div class="clearfix"></div>

            </div>

            </div>
        </div>

        <div v-if="show_send_bulk" @click.self="show_send_bulk = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/3 lg:w-1/3 bg-white rounded-lg mx-6">

                <div class="rg-modal-header">
                    <span>Send Bulk Reply</span>

                    <a href="javascript: void(0);" class="rg-modal-close-btn" @click="show_send_bulk = false"><i class="fa fa-times"></i></a>
                </div>

                <div class="p-6">

                    <div>
                        <strong>Send reply to {{ selectedIds.length }} selected businesses:</strong>

                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5">
                            Select Template
                        </label>

                        <v-select
                            :items="templates"
                            v-model="bulkSMSTemplate"
                            item-text="title"
                            item-value="id"
                            solo
                        ></v-select>
                    </div>

                    <div class="clearfix"></div>
                    

                </div>

                <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right" :class="{'spinner': sendingBulk}" @click="processSendBulk()">
                    SEND
                </button>

                <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="show_send_bulk = false">
                    CANCEL
                </button>

                <div class="clearfix"></div>

                </div>

            </div>
        </div>

        <div class="fill-height">
            <div :class="(($vuetify.breakpoint.xs) ? '' : 'pt-5 pl-8 pr-8')">

                <div v-show="$vuetify.breakpoint.xs && this.activeChat" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="activeChat = false" style="margin-top: -5px;"><i class="fa fa-chevron-left mr-2"> </i> Back</div>

                <div v-show="!$vuetify.breakpoint.xs || !this.activeChat" class="float-right -mt-2">
                    <!-- <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="send_message_form = true" style="margin-top: -5px;"><i class="fa fa-plus mr-2"> </i> NEW CHAT</div> -->

                    <div class="justify-between items-start mb-3 float-right">
                        <v-menu
                        bottom
                        left
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <div
                            v-bind="attrs"
                            v-on="on"
                            class="flex flex-row items-center px-4 py-2 rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer bg-white">
                            <span class="mr-2">Actions</span>
                            <span class="text-xs" style="padding-top: 3px;">
                                <font-awesome-icon icon="chevron-down"  />
                            </span>
                            </div>
                        </template>

                        <v-list class="table-menu-actions">
                            <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkReply()"><span class="table-menu-action-icon"><i class="fa fa-comment"></i></span> Reply</a></v-list-item-title></v-list-item>
                            <v-list-item v-if="selected_tab == 0 || selected_tab == 2" class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkArchive()"><span class="table-menu-action-icon"><i class="fa fa-archive"></i></span> Archive</a></v-list-item-title></v-list-item>
                            <v-list-item v-if="selected_tab == 1" class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkUnarchive()"><span class="table-menu-action-icon"><i class="fa fa-archive"></i></span> Unarchive</a></v-list-item-title></v-list-item>
                            <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="optOut()"><span class="table-menu-action-icon"><i class="fa fa-comment"></i></span> Opt-Out</a></v-list-item-title></v-list-item>
                            <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                        </v-list>
                        </v-menu>
                    </div>
                </div>

                <div v-if="!$vuetify.breakpoint.xs && searches" class="float-right pr-2 -mt-2">
                    <v-select
                        :items="searches"
                        v-model="selected_search_filter"
                        item-value="id"
                        outlined
                        dense
                        hide-details
                        placeholder="All Searches"
                        clearable
                        style="background: #FFFFFF; border: 0px;"
                        @change="selectedIds = [];"
                    >
                    <template slot="selection" slot-scope="data">
                        <!-- HTML that describe how select should render selected items -->
                        {{ data.item.keyword }} - {{ data.item.location }}
                    </template>
                    <template slot="item" slot-scope="data">
                        <!-- HTML that describe how select should render items when the select is open -->
                        {{ data.item.keyword }} - {{ data.item.location }}
                    </template>
                    </v-select>
                </div>

                <div class="flex flex-row items-top justify-between">
                    <h1 class="text-lg font-semibold mb-3">Inbox</h1>
                </div>
            </div>

            <div v-if="$vuetify.breakpoint.xs && searches && !this.activeChat" class="mb-4">
                <v-select
                    :items="searches"
                    v-model="selected_search_filter"
                    item-value="id"
                    outlined
                    dense
                    hide-details
                    placeholder="All Searches"
                    clearable
                    style="background: #FFFFFF; border: 0px;"
                    @change="selectedIds = [];"
                >
                <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->
                    {{ data.item.keyword }} - {{ data.item.location }}
                </template>
                <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    {{ data.item.keyword }} - {{ data.item.location }}
                </template>
                </v-select>
            </div>

            <v-row class=" no-gutters ">
            
            <v-col
                cols="12" sm="3"
                class="fill-height flex-grow-1 flex-shrink-0"
                style="padding: 0px !important; margin: 0px !important;"

                v-show="!$vuetify.breakpoint.xs || !this.activeChat"
            >
                <div :class="(($vuetify.breakpoint.xs) ? '-ml-4 -mr-2' : 'pl-4')" style="padding-top: 1px;">
                    <div class="ml-4 mr-2" style="padding-bottom: 10px;">
                        <div class="dashboard-box mb-6">
                            <v-card
                            class="pa-2"
                            tile
                            >
                                <div class="">
                                    <v-select
                                        v-model="filter_tags"
                                        :items="searchable_tags"
                                        multiple
                                        outlined
                                        dense
                                        label="Filter"
                                        style="background: #FFFFFF;"
                                        append-icon="mdi-chevron-down"
                                        hide-details
                                        small-chips
                                        placeholder="All"
                                        @change="getThreads();"
                                        >
                                        <template v-slot:selection="{ item, index }">
                                            <v-chip x-small v-if="index === 0 || index === 1"
                                                :class="tags[item]"
                                            >
                                                <span>{{ item }}</span>
                                            </v-chip>
                                            <span
                                            v-if="index === 2"
                                            class="grey--text text-caption"
                                            >
                                            (+{{ filter_tags.length - 2 }} more)
                                            </span>
                                        </template>
                                    </v-select>
                                </div>
                            </v-card>
                        </div>
                    </div>

                    <div v-if="selected_tab == '0' || selected_tab == '2' || selected_tab == '3'" class="lf-search-form pl-4 pr-2 -mt-6" style="margin-bottom: -16px;">
                        <div class="dashboard-box mb-6">
                            <v-card
                            class=""
                            tile
                            >
                                <div class="">
                                    <v-text-field
                                        v-model="search"
                                        label="Search"
                                        prepend-inner-icon="mdi-magnify"
                                        outlined
                                        dense
                                        hide-details
                                        class=""
                                    ></v-text-field>
                                </div>
                            </v-card>
                            <div class="text-right text-xs p-1 -mb-3">
                                <a href="javascript: void(0);" class="text-xs" @click="selectAll()">Select All</a> / 
                                <a href="javascript: void(0);" class="text-xs" @click="selectNone()">Select None</a>
                            </div>
                        </div>
                    </div>
                </div>

                <v-skeleton-loader v-if="!threadsLoaded" class="ml-3" type="article, article, article"></v-skeleton-loader>

                <div v-if="threadsLoaded" class="lf-inbox-chat-list" 
                    
                    :style="(($vuetify.breakpoint.xs) ? 'padding-left: 0px; padding-right: 0px;' : 'float: left; width: 100%;')"
                    
                    >
                    <div v-show="showLoading">
                        <i class="fa fa-spin fa-spinner"></i>
                    </div>
                    <div v-show="!showLoading" v-for="(item, index) in threads" :key="`parent${index}`"

                        @mouseover="mouseovered_item = item.id" @mouseout="mouseovered_item = null"
                    >
                        <div :id="'thread-' + item.id" class="dashboard-box lf-inbox-chat-item mb-4">
                            <v-card
                                class="pa-2"
                                tile

                                :style="((item.unread_messages_count > 0) ? 'background: #FFFFFF !important;' : '')"
                            >
                                <div class="p-1" @click="selectThread(item.id)"
                                    :style="'position: relative;' + ((item.unread_messages_count > 0) ? 'font-weight: bold;' : '')"
                                >
                                    <div v-if="item.unread_messages_count > 0" class="lf-chat-unread-circle"></div>

                                    <div class="lf-inbox-chat-item-avatar"><i class="mdi mdi-account-outline"></i></div>

                                    <div class="lf-chat-inbox-item-middle">
                                        <div class="lf-chat-inbox-item-contact" style="font-weight: normal;" :style="((item.unread_messages_count > 0) ? 'font-weight: bold !important;' : '')">
                                            <span v-if="item.name">
                                                {{ item.name }}
                                            </span>
                                            <span v-else>{{ item.phone_number }}</span>
                                        </div>
                                        <div class="lf-chat-inbox-item-message">
                                            <span v-if="item.last_message">
                                                {{ ((item.last_message.length > 50) ? item.last_message.substring(0, 50) + '...' : item.last_message) }}
                                            </span>

                                            <span v-else>
                                                
                                            </span>

                                            <br />

                                            <span v-for="(item, index) in item.tags" :key="index">
                                                <v-chip
                                                    small
                                                    :class="tags[item]"
                                                    style="font-weight: bold;"
                                                >
                                                    {{ item }}
                                                </v-chip>
                                            </span>

                                            <a v-show="mouseovered_item == item.id && item.opted_out == 0" href="javascript: void(0);" @click.stop="showTagSelection = item.id"><i class="mdi mdi-pencil-outline"></i></a>

                                            <v-select
                                                v-model="selectedTags"
                                                :items="available_tags"
                                                v-if="showTagSelection == item.id"
                                                label="tag"
                                                multiple
                                                :append-outer-icon="'mdi-check'"
                                                @click:append-outer="saveSelectedTags(item.id)"
                                                hide-details
                                                class="-mt-3"
                                            >
                                                <template v-slot:selection="{ item, index }">
                                                    <v-chip x-small>
                                                        <span>{{ item }}</span>
                                                    </v-chip>
                                                </template>
                                            </v-select>

                                            <!-- <v-chip v-if="item.unread_messages_count > 0" color="primary" small>
                                                {{ item.unread_messages_count }} unread
                                            </v-chip> -->

                                            <span v-if="item.unread_messages_count > 0" class="lf-chat-inbox-item-unread">+ {{ item.unread_messages_count }} unread</span>
                                        </div>
                                    </div>

                                    <div class="lf-chat-inbox-item-when">
                                        {{ formatDate(item.updated_at) }}
                                        <br />

                                        <div v-show="(mouseovered_item == item.id || itemSelected(item) || $vuetify.breakpoint.xs) && item.opted_out == 0" class="float-right pt-3">
                                            <input type="checkbox" @click="item.selected = true" :value="item.id" v-model="selectedIds" style="width: 16px; height: 16px;" @click.stop />
                                            
                                            <!-- <v-checkbox
                                                :id="item.id+'-checkbox'"
                                                :value="item.id"
                                                v-model="selectedIds"
                                                hide-details
                                                :ripple="false"
                                            >

                                            </v-checkbox> -->
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col
                cols="auto"
                class="flex-grow-1 flex-shrink-0"
            >
                <div :class="(($vuetify.breakpoint.xs) ? '' : 'pl-2 pr-5')" style="height: 100%;">
                    <div v-if="activeChat">
                        <v-skeleton-loader v-if="loadingThred" class="ml-3" type="article, article, article"></v-skeleton-loader>
                        <InboxThread v-else :key="activeChatKey" :activeChat="activeChat" :search_results="search_results" :business="selected_business" :search="selected_search"></InboxThread>
                    </div>

                    <v-responsive v-else
                        class="overflow-y-hidden fill-height"
                        :height="calculateHeight()"
                        >
                        <v-card
                            flat
                            class="d-flex flex-column fill-height"
                            style="border-radius: 5px;"
                        >
                            <div style="position: absolute; left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto; 
        width: 200px; margin-top: 20%; text-align: center; font-size: 14px;">
                                No messages to display.
                            </div>
                        </v-card>
                    </v-responsive>
                </div>
            </v-col>
            </v-row>
        </div>

    </panel-navigation>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import InboxThread from '@/views/panel/InboxThread.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Inbox | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    InboxThread
  },
  data() {
    return {
        selected_tab: '2',
        search: "",
        send_message_form: false,
        new_thread_number: "",
        activeChat: false,
        activeChatKey: 0,
        threadsLoaded: false,
        loadingThreads: false,
        showLoading: false,
        threads: [],
        thread_interval: null,

        search_results: false,
        selected_business: null,
        selected_search: null,

        selected_search_filter: null,

        selectedIds: [],

        loadingThred: false,

        mouseovered_item: null,
        showTagSelection: null,

        show_send_bulk: false,
        bulkSMSTemplate: null,
        sendingBulk: false,

        tags: {
            "Not Contacted": "orange lighten-5 orange--text text--lighten-1 mr-1 mb-1",
            "Contacted": "blue lighten-5 blue--text text--lighten-1 mr-1 mb-1",
            "Responded": "green lighten-5 green--text text--lighten-1 mr-1 mb-1",
            "Archived": "gray lighten-5 gray--text text--lighten-1 mr-1 mb-1",
            "Opted-Out": "purple lighten-7 text-white mr-1 mb-1",
            "Hot": "red lighten-5 red--text text--lighten-1 mr-1 mb-1",
            "Followup": "orange lighten-5 orange--text text--lighten-1 mr-1 mb-1",
            "Cold": "blue lighten-5 blue--text text--lighten-1 mr-1 mb-1",
        },

        selectedTags: null,

        searchable_tags: ['Not Contacted', 'Contacted', 'Responded', 'Archived', 'Opted-Out', 'Hot', 'Followup', 'Cold'],

        filter_tags: ['Responded'],

        available_tags: ['Hot', 'Followup', 'Cold']
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      searches: state => state.searches.searches,
      templates: state => state.templates.templates,
    }),
  },
  methods: {
    async saveSelectedTags(thread_id) {
        console.log('this.selectedTags', this.selectedTags)

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/save-thread-tags', {
            thread_id: thread_id,
            selectedTags: this.selectedTags
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.showTagSelection = null
        this.selectedTags = null

        this.getThreads();
    },
    selectAll() {
        this.selectedIds = [];
        for (var i in this.threads) {
            this.selectedIds.push(this.threads[i].id);
        }
    },
    selectNone() {
        this.selectedIds = [];
    },
    itemSelected(item) {
        for (var i in this.selectedIds) {
            if (item.id == this.selectedIds[i]) {
                return true;
                break;
            }
        }

        return false;
    },
    async bulkDelete() {
        let self = this;
        if (this.selectedIds.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one thread.",
                confirmButtonText: 'OK'
            });

            return;
        }

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/delete-threads', {
            ids: this.selectedIds
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.selectedIds = [];
        this.activeChat = null;
        this.getThreads();
    },
    async optOut() {
        let self = this;
        if (this.selectedIds.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one thread.",
                confirmButtonText: 'OK'
            });

            return;
        }

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/opt-out', {
            ids: this.selectedIds
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.selectedIds = [];
        this.activeChat = null;
        this.getThreads();
    },

      calculateHeight() {
          return window.outerHeight - 226;
      },
      calculateHeightLeft() {
          return window.outerHeight - 366;
      },
      async addNumber() {
            if (!this.new_thread_number)
                return;
            
            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/add-thread', {
                new_thread_number: this.new_thread_number
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            // if (!response.data.exists)
            //     this.threads.push(response.data.thread);

            // this.selectThread(response.data.thread.id);

            let self = this;

            this.getThreads(function() {
                self.selectThread(response.data.thread.id);
            })

            this.new_thread_number = ''
            this.send_message_form = false;
      },
      selectTab(tab_nr) {
          this.selected_tab = tab_nr;
          this.activeChat = null;
          this.showLoading = true;
          this.selectedIds = [];
        //   this.getThreads();
      },
    async getThreads(callback = null) {
        if (this.loadingThreads)
            return;
        
        this.loadingThreads = true;

        let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/inbox?filter_tags=' + this.filter_tags + "&search=" + encodeURIComponent(this.search) + "&selected_search_filter=" + encodeURIComponent(this.selected_search_filter), {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.threads = response.data.threads;
        this.threadsLoaded = true;

        if (this.threads.length == 0) {
            this.activeChat = null;
        }
        else {
            if (!this.activeChat && !this.$vuetify.breakpoint.xs) {
                if (this.$route.query.t)
                    this.selectThread(this.$route.query.t);
                else
                    this.selectThread(this.threads[0].id);
            }
        }

        if (callback) {
            callback();
        }

        this.loadingThreads = false;
        this.showLoading = false;
    },
    selectThread(thread_id) {
        let self = this

        self.loadingThred = true;

        setTimeout(function() {
            for (var i in document.querySelectorAll('.lf-inbox-chat-item')) {
                try {
                    document.querySelectorAll('.lf-inbox-chat-item')[i].classList.remove("active");
                }
                catch (e) {
                    // console.log(e);
                }
            }
            
            document.querySelector('#thread-' + thread_id).classList.add("active")
        }, 100);

        setTimeout(function() {
            axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/get-search-details', {
                thread_id: thread_id
            }, {
                headers: {
                    'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                },
            }).then(function(response) {
                console.log('response', response);

                if (response.data.business && response.data.search) {
                    self.selected_business = response.data.business;
                    self.selected_search = response.data.search;
                    self.search_results = false;
                }
                else {
                    self.selected_business = null;
                    self.selected_search = null;
                    self.search_results = false;
                }

                self.activeChat = thread_id;
                self.activeChatKey++;

                self.loadingThred = false;
            })
        }, 0);
    },
    formatDate: function(date) {
      return moment(String(date)).fromNow()
    },

    bulkReply() {
        let self = this;
        if (this.selectedIds.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one thread.",
                confirmButtonText: 'OK'
            });

            return;
        }

        this.show_send_bulk = true;
    },

    async processSendBulk() {
        this.sendingBulk = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-bulk-reply', {
            selectedIds: this.selectedIds,
            bulkSMSTemplate: this.bulkSMSTemplate,
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        this.$swal({
			title: "Done!",
			text: "Messages sent!",
			showCancelButton: false,
		});

        this.sendingBulk = false;
        this.show_send_bulk = false;
        this.selectedIds = false;
    },

    async bulkArchive() {
        let self = this;
        if (this.selectedIds.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one thread.",
                confirmButtonText: 'OK'
            });

            return;
        }

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/archive-threads', {
            ids: this.selectedIds
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.selectedIds = [];
        this.activeChat = null;
        this.getThreads();
    },

    async bulkUnarchive() {
        let self = this;
        if (this.selectedIds.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one thread.",
                confirmButtonText: 'OK'
            });

            return;
        }

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/unarchive-threads', {
            ids: this.selectedIds
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.selectedIds = [];
        this.activeChat = null;
        this.getThreads();
    },

    async getTemplates() {
        await this.$store.dispatch('templates/fetch');

        if (this.templates.length > 0) {
            this.bulkSMSTemplate = this.templates[0].id;
        }
    }
  },
  mounted() {
        let self = this;

        this.$store.dispatch('searches/fetch', {
            page: 1,
            itemsPerPage: 9999999
        });
      
        self.getThreads();
        
        this.thread_interval = setInterval(function() {
            let currentActiveChat = self.activeChat;

            // console.log('THREADS NOW')
            // console.log(JSON.parse(JSON.stringify(self.threads)));

            let previousSignature = btoa(unescape(encodeURIComponent(JSON.stringify(self.threads))));

            self.getThreads(function() {
                setTimeout(function() {
                    let newSignature = btoa(unescape(encodeURIComponent(JSON.stringify(self.threads))));

                    // console.log('THREADS AFTER')
                    // console.log(JSON.parse(JSON.stringify(self.threads)));

                    if (previousSignature != newSignature && self.selectedIds.length == 0) {
                        // self.selectThread(currentActiveChat);
                    }
                }, 10);
            });
        }, 1000);

        function setThreadsHeight() {
            try {
                if (!self.$vuetify.breakpoint.xs) {
                    let new_height = window.outerHeight - 360;
                    document.querySelector(".lf-inbox-chat-list").style.height = new_height + "px";
                }
            }
            catch(e) {
                setTimeout(function() {
                    setThreadsHeight();
                }, 100);
            }
        }

        setThreadsHeight();

        self.getTemplates();
  },
  beforeDestroy() {
    clearInterval(this.thread_interval);
    this.thread_interval = null
  },
  watch: {
        selected_search_filter: {
            handler () {
                let self = this;

                this.activeChat = null;
                this.getThreads();
            }
        }
    }
}
</script>

<style lang='scss'>
    .col {
        padding: 0px !important;
    }

    .lf-inbox-chat-list {
        padding-left: 32px;
        padding-right: 10px;
        overflow-y: auto;
    }

    .lf-inbox-chat-item {
        cursor: pointer;
        border-radius: 5px;
        border: solid 1px #FFFFFF;
    }

    .lf-inbox-chat-item.active {
        border: solid 1px #3A9BDB;
    }

    .lf-inbox-chat-item-avatar {
        background: rgba(58, 155, 219, 0.1);
        float: left;
        width: 60px;
        height: 60px;
        padding: 10px;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
        margin-right: 13px;
        margin-left: 6px;
    }

    .lf-inbox-chat-item-avatar i {
        color: #3A9BDB;
        font-size: 26px;
    }

    .lf-chat-inbox-item-middle {
        float: left;
        width: 37%;
    }

    .lf-chat-inbox-search-details {
        float: left;
        font-size: 14px;
    }

    .lf-chat-inbox-item-when {
        position: absolute;
        right: 7px;
        top: 7px;
        color: #757B89;
        font-size: 12px;
    }

    .lf-chat-inbox-item-contact {
        color: #313E42;
        font-size: 13px;
        // font-weight: bold;
        padding-top: 2px;
        padding-right: 10px;
    }

    .lf-chat-inbox-item-message {
        color: #757B89;
        opacity: 0.9;
        font-size: 14px;
        padding-top: 0px;
        // margin-top: -5px;
    }

    .lf-chat-inbox-item-unread {
        color: #3A9BDB;
    }

    .v-card.v-sheet.theme--light {
        border: 0px !important;
    }

    .lf-chat-unread-circle {
        width: 8px;
        height: 8px;
        background: #1976d2;
        position: absolute;
        border-radius: 10px;
        margin-left: -7px;
        margin-top: 25px;
    }
</style>