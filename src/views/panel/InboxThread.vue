<template>

  <div>
        <div v-if="sendScreenshot" @click.self="sendScreenshot = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/3 lg:w-2/3 bg-white rounded-lg mx-6">

                <div class="p-6">

                    <h2 class="text-lg font-semibold text-gray-800 mb-3">Select Competitor Google Business Screenshot</h2>

                    <div v-if="screenshotUrl" style="text-align: center;">
                        <img :src="screenshotUrl" style="width: 185px; height: 400px;" />
                    </div>

                    <div v-else>
                        <v-text-field
                            placeholder="Search competitor..."
                            dense
                            outlined
                            hide-details
                            style="border: solid 1px #CCCCCC; width: 100%; background: white; margin-bottom: 10px;"
                            v-model="search_competitor"
                        ></v-text-field>
                        
                        <div style="max-height: 600px; overflow: auto;">
                            <div v-for="(business, index) in search.search_results" :key="index"
                                class="pb-1 text-sm"

                                v-show="business.name.toLowerCase().indexOf(search_competitor.toLowerCase()) != -1"
                            >
                                <div class="float-right">
                                    <a href="javascript: void(0);" class="float-right" @click="selectCompetitor(item, 'Competitor mobile screenshot')"><i class="fa fa-mobile"></i> Mobile</a>

                                    <a href="javascript: void(0);" class="float-right mr-5" @click="selectCompetitor(item, 'Competitor desktop screenshot')"><i class="fa fa-desktop"></i> Desktop</a>
                                </div>
                                
                                <strong class="text-lg">{{ business.name }}</strong>

                                <div style="display: inline-block; padding-left: 10px;">
                                    <v-rating
                                        :value="business.rating"
                                        color="amber"
                                        size="16"
                                    ></v-rating>
                                </div>

                                <span style="font-size: 12px;">(<strong>{{ business.user_ratings_total }}</strong>)</span>

                                <div class="text-gray-600 text-xs">
                                    Chat: <i :class="((business.on_mobile_using_chat) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.on_mobile_using_chat) ? 'color: green;' : 'color: red;')"></i>
                                    |
                                    Quote: <i :class="((business.on_mobile_using_quote) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.on_mobile_using_quote) ? 'color: green;' : 'color: red;')"></i>
                                    |
                                    Claimed: <i :class="((business.google_claimed_business) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.google_claimed_business) ? 'color: green;' : 'color: red;')"></i>
                                    |
                                    Posts: <i :class="((business.google_posts) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.google_posts) ? 'color: green;' : 'color: red;')"></i>

                                    <span v-if="business.website || business.url">
                                        | 
                                        <a :href="business.website" target="_BLANK"><i class="fa fa-globe" style="font-size: 14px !important; margin-right: 6px;"></i></a>
                                        <a :href="business.url" target="_BLANK"><i class="fa fa-map-marker" style="font-size: 14px !important;"></i></a>
                                    </span>
                                </div>

                                <div class="clearfix"></div>

                                <hr class="mb-2 mt-1" />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                    <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="sendScreenshot = false">
                        CANCEL
                    </button>

                    <div class="clearfix"></div>

                </div>

            </div>
        </div>

        <div v-if="personalizedImage" @click.self="personalizedImage = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-4/5 lg:w-4/5 bg-white rounded-lg mx-6">

                <div class="p-6">

                    <h2 class="text-lg font-semibold text-gray-800 mb-3">Send Personalized Image</h2>

                    <div :class="(($vuetify.breakpoint.xs) ? '' : 'float-left')" :style="(($vuetify.breakpoint.xs) ? '' : 'width: 40%;')">
                        <div class="mb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Select Template
                            </label>

                            <v-select
                                :items="images"
                                v-model="personalizedImageTemplate"
                                item-text="title"
                                item-value="id"
                                solo
                            ></v-select>
                        </div>

                        <div v-show="requireCompetitor" class="mb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Select Competitor
                            </label>

                            <v-select
                                :items="search.search_results"
                                v-model="personalizedImageCompetitor"
                                item-text="name"
                                item-value="id"
                                solo
                            ></v-select>
                        </div>
                    </div>

                    <div :class="(($vuetify.breakpoint.xs) ? '' : 'float-right')" :style="(($vuetify.breakpoint.xs) ? '' : 'width: 58%; padding-left: 2%;')">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Preview
                        </label>

                        <div v-show="personalizedImageTemplate">
                            <iframe id="imageEditorIframe" :src="getEditorPreviewUrl()" 
                                :style="(($vuetify.breakpoint.xs) ? 'width: 100%; height: 300px;' : 'width: 100%; height: 700px;')"></iframe>
                        </div>
                    </div>

                    <br clear="all" />

                </div>

                <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                    <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="personalizedImage = false">
                        Cancel
                    </button>

                    <button v-if="personalizedImageTemplate && ((personalizedImageCompetitor) || !requireCompetitor)" class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': personalizedImageSending}" @click="sendPersonalizedImagePush()">
                        Send
                    </button>

                </div>
            </div>
        </div>

        <div v-if="showPreviewImage" @click.self="showPreviewImage = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="bg-white rounded-lg mx-6">

                <div class="">

                    <v-btn
                        v-if="thread.archived == 0"
                        class="float-right -mt-3 -mr-3"
                        fab
                        color="gray"
                        dark
                        x-small
                        elevation="0"
                        @click="showPreviewImage = false"
                        :ripple="false"
                        >
                        <v-icon >
                            mdi-close
                        </v-icon>
                    </v-btn>

                    <div class="text-center">
                        <img :src="previewImageUrl" style="max-height: 700px;" />
                    </div>

                </div>

            </div>
        </div>

        <v-card
            flat
            class="d-flex flex-column fill-height"
            style="border-radius: 5px;"
        >
            <v-skeleton-loader v-if="!threadLoaded" class="ml-3" type="article, article, article"></v-skeleton-loader>
            <div v-else>
                <v-card-title style="color: #424242;">
                    <div class="w-full">
                        <div class="lf-inbox-chat-item-avatar"><i class="mdi mdi-account-outline"></i></div>

                        <div class="lf-chat-inbox-item-middle">
                            <div class="lf-chat-inbox-item-contact" style="line-height: 22px; font-size: 14px;">
                                <div v-if="business">
                                    {{ business.name }}
                                
                                    <br />
                                </div>

                                {{ thread.name }}
                                
                                <span v-if="business">
                                    &nbsp;&nbsp;

                                    <span v-if="business.phone_number_type == 'mobile'" style="color: green">{{ business.phone_number_type }}</span>
                                    <span v-if="business.phone_number_type == 'voip'" style="color: orange">{{ business.phone_number_type }}</span>
                                    <span v-if="business.phone_number_type == 'landline'" style="color: red">{{ business.phone_number_type }}</span>
                                </span>
                            </div>
                            <div class="lf-chat-inbox-item-message -mt-2" style="font-size: 11px;">
                                Last response {{ formatDate(thread.updated_at) }}
                            </div>
                        </div>

                        <div v-if="business && search" class="lf-chat-inbox-search-details">
                            <i class="mdi mdi-map-marker-outline"></i> {{ search.location }}
                            |
                            <i class="mdi mdi-magnify"></i> {{ search.keyword }}

                            <br />

                            <i class="mdi mdi-details"></i>

                            Chat: <i :class="((business.on_mobile_using_chat) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.on_mobile_using_chat) ? 'color: green;' : 'color: red;')"></i>
                            |
                            Quote: <i :class="((business.on_mobile_using_quote) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.on_mobile_using_quote) ? 'color: green;' : 'color: red;')"></i>
                            |
                            Claimed: <i :class="((business.google_claimed_business) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.google_claimed_business) ? 'color: green;' : 'color: red;')"></i>
                            |
                            Posts: <i :class="((business.google_posts) ? 'mdi mdi-check-circle-outline' : 'mdi mdi-close-circle-outline')" :style="((business.google_posts) ? 'color: green;' : 'color: red;')"></i>

                            <span v-if="business.website || business.url">
                                | 
                                <a :href="business.website" target="_BLANK"><i class="fa fa-globe" style="font-size: 14px !important; margin-right: 6px;"></i></a>
                                <a :href="business.url" target="_BLANK"><i class="fa fa-map-marker" style="font-size: 14px !important;"></i></a>
                            </span>
                        </div>
                        
                        <div v-if="search_results != true" :class="'float-right ' + (($vuetify.breakpoint.xs) ? '' : 'mt-3')">
                            <v-btn
                                class="-mt-1"
                                fab
                                color="white"
                                x-small
                                elevation="0"
                                @click="deleteThread()"
                                >
                                <v-icon >
                                    mdi-delete-outline
                                </v-icon>
                            </v-btn>
                        </div>
                        
                        <div v-if="search_results != true" :class="'float-right ' + (($vuetify.breakpoint.xs) ? 'mt-2' : 'mr-2 mt-3')">
                            <v-btn
                                v-if="thread.archived == 0"
                                class="-mt-1"
                                fab
                                color="white"
                                x-small
                                elevation="0"
                                @click="archiveThread()"
                                :ripple="false"
                                >
                                <v-icon >
                                    mdi-archive-outline
                                </v-icon>
                            </v-btn>

                            <v-btn
                                v-if="thread.archived == 1"
                                class="-mt-1"
                                fab
                                color="white"
                                x-small
                                elevation="0"
                                @click="unarchiveThread()"
                                :ripple="false"
                                >
                                <v-icon style="color: grey;">
                                    mdi-reload
                                </v-icon>
                            </v-btn>
                        </div>

                        <div v-else class="float-right mr-2">
                            <div>
                                <v-btn
                                    v-if="thread.archived == 0"
                                    class="float-right -mt-1"
                                    fab
                                    color="white"
                                    x-small
                                    elevation="0"
                                    @click="$parent.$parent.showConversationDialog = false"
                                    :ripple="false"
                                    >
                                    <v-icon >
                                        mdi-close
                                    </v-icon>
                                </v-btn>

                                <div class="clearfix"></div>
                            </div>

                            <div class="pt-2">
                                <v-btn
                                    v-if="thread.archived == 0"
                                    class="-mt-1"
                                    fab
                                    color="white"
                                    x-small
                                    elevation="0"
                                    @click="$parent.$parent.previousConversation()"
                                    :ripple="false"
                                    >
                                    <v-icon >
                                        mdi-chevron-left
                                    </v-icon>
                                </v-btn>

                                <v-btn
                                    v-if="thread.archived == 0"
                                    class="-mt-1 ml-2"
                                    fab
                                    color="white"
                                    x-small
                                    elevation="0"
                                    @click="$parent.$parent.nextConversation()"
                                    :ripple="false"
                                    >
                                    <v-icon >
                                        mdi-chevron-right
                                    </v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    
                </v-card-title>

                <v-card-text id="lfp-messages-list" class="overflow-y-auto" :style="'height: ' + calculateMessagesHeight() + 'px'">

                <div v-if="messages.length == 0" style="position: absolute; left: 0; 
                    right: 0; 
                    margin-left: auto; 
                    margin-right: auto; 
                    width: 200px; margin-top: 20%; text-align: center;">
                    Conversation is empty. Send your first message.
                </div>

                <div v-for="(msg, i) in messages" :key="msg.id">
                    <div
                    :class="{ 'd-flex ': (msg.direction == 'inbound') }"
                    >
                            <div>
                                <v-chip
                                :color="(msg.direction == 'outbound') ? '#3A9BDB' : 'grey lighten-3'"
                                :text-color="(msg.direction == 'outbound') ? 'white' : '#424242'"
                                dark
                                style="height:auto;white-space: normal; max-width: 500px;"
                                class="pa-3 mt-2 float-right"
                                >
                                    <span v-if="msg.message.substring(0, 23) == 'https://ravu-uploads.s3'">
                                        <span v-if="msg.message.indexOf('pending') != -1">
                                            <img :src="msg.message.replace('|pending...', '')" style="width: 100%; max-width: 200px;" @click="previewImage(msg.message.replace('|pending...', ''))" />
                                            <br />
                                            <div class="text-bold mt-2">Image ready. Send it?</div>

                                            <div class="border-1 border-white text-white text-xs text-bold px-3 py-1 rounded cursor-pointer float-left mt-2" @click="declineSendImage(msg.message)" style="margin-top: -5px;"><i class="mdi mdi-close mr-2"> </i> NO</div>

                                            <div class="border-1 border-white bg-white text-blue text-xs text-bold px-3 py-1 rounded cursor-pointer float-left ml-2 mt-2" @click="confirmSendImage(msg.message)" style="margin-top: -5px;"><i class="mdi mdi-check mr-2"> </i> YES</div>

                                        </span>
                                        <span v-else>
                                            <img :src="msg.message" style="width: 100%; max-width: 200px;" @click="previewImage(msg.message)" />
                                        </span>
                                    </span>
                                    <span v-else>
                                        <span v-if="msg.message.substring(0, 4) == 'http'">
                                            <a :href="msg.message" target="_BLANK" style="color: #FFFFFF !important; text-decoration: underline !important;">{{ msg.message }}</a>
                                        </span>
                                        <span v-else>
                                            <span v-if="msg.message == '[screenshot_pending]'">
                                                generating screenshot...
                                                <i class="fa fa-spin fa-spinner"></i>
                                            </span>
                                            <span v-else>
                                                <span v-if="msg.message.indexOf('pending') != -1">
                                                    {{ msg.message.replace('|pending...', '') }}
                                                    <br />
                                                    pending message... <i class="fa fa-spin fa-spinner"></i>
                                                </span>
                                                <span v-else>
                                                    {{ msg.message }}
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                    <!-- <v-icon
                                        v-if="hover"
                                        small
                                    >
                                        expand_more
                                    </v-icon> -->
                                </v-chip>
                                <br clear="all" />
                                <div
                                    class="ml-2"
                                    :style="'font-size: 0.5rem;' + ((msg.direction == 'outbound') ? 'text-align: right; padding-right: 13px;' : 'text-align: left; padding-left: 4px;')"
                                >{{ formatDate(msg.created_at) }}</div>
                            </div>
                    </div>
                </div>
                </v-card-text>

                <template v-if="thread.opted_out == 0">
                    <v-menu offset-y v-if="business" top>
                        <template v-slot:activator="{ on, attrs }">
                            <a
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            class="choose_template_link"
                            >
                                Choose Template
                            </a>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in templates"
                            :key="index"
                            >
                            <v-list-item-title><a href="javascript: void(0);" style="text-decoration: none;" @click="selectTemplate(item)">{{ item.title }}</a></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu offset-y v-if="business" top>
                        <template v-slot:activator="{ on, attrs }">
                            <a
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            class="send_screenshot_link"
                            >
                                Send Screenshot
                            </a>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in screenshot_options"
                            :key="index"
                            >
                            <v-list-item-title><a href="javascript: void(0);" style="text-decoration: none;" @click="sendScreenshotAction(item)">{{ item }}</a></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <div style="position: relative; box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.05); padding-top: 3px; border-radius: 0px 0px 5px 5px; padding-top: 14px;">

                        <a v-if="business"
                            color="primary"
                            dark
                            class="send_image_link"
                            @click="openPersonalizedImagePopup()"
                        >
                            Send Image
                        </a>

                        <div v-if="attached_image.attached" class="lfp-attached-image">
                            <v-btn
                                v-if="thread.archived == 0"
                                class="float-right -mt-8 -mr-8"
                                fab
                                color="gray"
                                dark
                                x-small
                                elevation="0"
                                @click="attached_image.attached = false; attached_image.src = ''"
                                :ripple="false"
                                >
                                <v-icon >
                                    mdi-close
                                </v-icon>
                            </v-btn>
                            
                            <img v-if="attached_image.src" :src="attached_image.src" style="width: 100px;" />
                            <div v-else style="padding: 50px;">
                                <i class="fa fa-spin fa-spinner"></i>
                            </div>
                        </div>

                        <v-file-input
                            accept="image/*"
                            label="Click here to upload"
                            style="position: absolute; right: 80px; top: 18px; z-index: 10;"
                            v-model="file"
                            @change="onUpload"
                            hide-input
                        ></v-file-input>

                        <v-btn
                            style="position: absolute; right: 24px; top: 33px;"
                            class="-mt-1"
                            fab
                            color="#3A9BDB"
                            dark
                            small
                            elevation="0"
                            @click="sendMessage(messageForm)"
                            >
                            <v-icon class="m-2">
                                mdi-send
                            </v-icon>
                        </v-btn>

                        <v-card-text class="flex-shrink-1">
                            <v-text-field
                            class="mr-16 lf-inbox-new-message-field"
                            v-model="messageForm.content"
                            type="text"
                            outlined
                            dense
                            style="background: rgba(25, 35, 58, 0.05); color: #757B89; border: 0px;"
                            @keyup.enter="sendMessage(messageForm)"
                            :placeholder="((sendingMessage) ? 'Sending...' : 'Type message...')"
                            hide-details
                            :disabled="sendingMessage"
                        />
                        </v-card-text>
                    </div>
                </template>

                <template v-else>
                    <div style="position: relative; box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.05); padding-top: 3px; border-radius: 0px 0px 5px 5px; padding-top: 14px; padding: 26px; font-size: 12px;">
                        This contact has opted-out. Please don't contact them anymore.
                    </div>
                </template>
            </div>
        </v-card>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import AddImageCanvas from '@/components/dialogs/images/addImageCanvas.vue'

export default {
    props: ['activeChat', 'search_results', 'business', 'search'],
    data() {
        return {
            thread: null,
            thisThreadId: null,
            threadLoaded: false,
            messages: [],
            messageForm: {
                content: ""
            },
            sendingMessage: false,
            file: null,

            screenshot_options: ["Their mobile Google Business screenshot", "Their desktop Google Business screenshot", "Competitor screenshot"],
            screenshotUrl: null,
            sendScreenshot: false,
            competitors: [],

            personalizedImage: false,
            personalizedImageTemplate: null,
            personalizedImageCompetitor: null,
            personalizedImageSending: false,
            image: null,
            competitor: null,

            thread_interval: null,

            showPreviewImage: false,

            attached_image: {
                attached: false,
                src: ""
            },

            search_competitor: ""
        }
    },
    components: {
        AddImageCanvas
    },
    computed: {
        ...mapState({
        me: state => state.me.me,
        templates: state => state.templates.templates,
        images: state => state.personalization_images.images,
        }),
        requireCompetitor() {
            if (!this.image)
                return false;

            return JSON.stringify(this.image.settings).indexOf('[competitor') > -1;
        }
    },
    methods: {
        selectElement(item) {

        },
        elementMoved(item) {

        },
        unselectElement() {

        },
        calculateHeight() {
            return window.outerHeight - ((this.search_results) ? 200 : 243);
        },

        calculateMessagesHeight() {
            if (this.$vuetify.breakpoint.xs)
                return window.outerHeight - 330;

            return window.outerHeight - ((this.search_results) ? 350 : 394);
        },

        async loadThread(callback = null) {
            let self = this

            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/inbox/get-thread?id=' + this.thisThreadId, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            this.thread = response.data.thread;
            this.messages = this.thread.messages;

            setTimeout(function() {
                self.threadLoaded = true;
            }, 0);


            if (callback) {
                callback();
            }
            else {

                setTimeout(function() {
                    var objDiv = document.getElementById("lfp-messages-list");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 10);

                setTimeout(function() {
                    var objDiv = document.getElementById("lfp-messages-list");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 100);

                setTimeout(function() {
                    var objDiv = document.getElementById("lfp-messages-list");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 500);

                setTimeout(function() {
                    var objDiv = document.getElementById("lfp-messages-list");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 1000);
            }
        },

        async sendMessage() {
            if (!this.messageForm.content && !this.attached_image.src)
                return;
            
            this.sendingMessage = true;

            let params = {
                threadId: this.thisThreadId,
                messageForm: this.messageForm,
                attached_image: this.attached_image
            };
            
            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-message', params, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            this.sendingMessage = false;
            this.messageForm.content = "";
            this.attached_image.attached = false;
            this.attached_image.src = "";

            let self = this
            setTimeout(function() {
                self.loadThread();
            }, 500);
        },

        async archiveThread() {
            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/archive-thread', {
                threadId: this.thisThreadId
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            this.$parent.$parent.activeChat = null;
            this.$parent.$parent.getThreads();
        },

        async unarchiveThread() {
            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/unarchive-thread', {
                threadId: this.thisThreadId
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            this.$parent.$parent.activeChat = null;
            this.$parent.$parent.getThreads();
        },

        async deleteThread() {
            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/delete-thread', {
                threadId: this.thisThreadId
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            this.$parent.$parent.activeChat = null;
            this.$parent.$parent.getThreads();
        },

        formatDate: function(date) {
            return moment(String(date)).calendar();
        },

        async onUpload() {           
            // this.sendingMessage = true;

            this.attached_image.attached = true;

            if (this.file !== null) {
                this.uploading = true
                let formData = new FormData()
                formData.append("file", this.file)

                let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    }
                });

                this.file = null

                this.attached_image.src = response.data.url;

                // this.messageForm.content = response.data.url;
            
                // let response2 = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-message', {
                //     threadId: this.thisThreadId,
                //     messageForm: this.messageForm
                // }, {
                //     headers: {
                //     'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                //     },
                // })

                // this.sendingMessage = false;
                // this.messageForm.content = "";

                // let self = this
                // setTimeout(function() {
                //     self.loadThread();
                // }, 500);
            }
        },
        
        selectTemplate(template) {
            let self = this;

            setTimeout(function() {
                if (self.business) {
                    template.content = template.content.replace('[business_name]', self.business.name || "");
                    template.content = template.content.replace('[rating]', self.business.rating || "");
                    template.content = template.content.replace('[reviews]', self.business.user_ratings_total || "");
                    template.content = template.content.replace('[formatted_phone_number]', self.business.formatted_phone_number || "");
                    template.content = template.content.replace('[international_phone_number]', self.business.international_phone_number || "");
                    template.content = template.content.replace('[phone_number_type]', self.business.phone_number_type || "");
                    template.content = template.content.replace('[carrier]', self.business.phone_number_carrier_name || "");
                    template.content = template.content.replace('[address]', self.business.formatted_address || "");

                    let address_components = JSON.parse(self.business.address_components);

                    let city = "";
                    let state = "";
                    let street = "";
                    let zip = "";
                    let country = "";

                    for (var i in address_components) {
                        let component = address_components[i];

                        console.log('component', component)

                        // if (component.types.contains("street_number"))
                        //     street = component.long_name;

                        if (component.types.includes("country")) {
                            country = component.long_name; continue;
                        }

                        if (component.types.includes("administrative_area_level_1") || component.types.includes("administrative_area_level_2") || component.types.includes("administrative_area_level_3") || component.types.includes("administrative_area_level_4") || component.types.includes("administrative_area_level_5")) {
                            state = component.long_name; continue;
                        }
                        
                        if (component.types.includes("route"))
                            street = component.long_name
                        
                        if (component.types.includes("neighborhood") || component.types.includes("political") || component.types.includes("locality"))
                            city = component.long_name

                        if (component.types.includes("postal_code"))
                            zip = component.long_name
                    }

                    template.content = template.content.replace('[city]', city);
                    template.content = template.content.replace('[state]', state);
                    template.content = template.content.replace('[street]', street);
                    template.content = template.content.replace('[zip]', zip);
                    template.content = template.content.replace('[country]', country);

                    template.content = template.content.replace('[website]', self.business.website || "");
                }

                self.messageForm.content = template.content;
            }, 100);
        },

        sendScreenshotAction(selection) {
            this.sendScreenshot = true;

            if (selection == "Competitor screenshot") {
                this.screenshotUrl = null;
            }
            else {
                this.sendSelectedScreenshotPush(selection);
            }
            
            // if (selection == "Their mobile screenshot") {
            //     this.screenshotUrl = this.business.mobile_screenshot;
            // }
            // else {
            //     this.screenshotUrl = null;
            // }
        },

        selectCompetitor(item, type) {
            this.sendSelectedScreenshotPush(type, item);
        },

        async confirmSendImage(image_url) {
            let response2 = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/confirm-send-image', {
                threadId: this.thisThreadId,
                image_url: image_url
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            let self = this
            setTimeout(function() {
                self.loadThread();
            }, 500);
        },

        async declineSendImage(image_url) {
            let response2 = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/decline-send-image', {
                threadId: this.thisThreadId,
                image_url: image_url
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            let self = this
            setTimeout(function() {
                self.loadThread();
            }, 500);
        },

        async sendSelectedScreenshotPush(selection, business = null) {
            this.sendScreenshot = false;

            this.messageForm.content = this.screenshotUrl;

            let response2 = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-screenshot', {
                threadId: this.thisThreadId,
                searchResultId: ((business) ? business.id : this.business.id),
                screenshotType: selection
            }, {
                headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            let self = this
            setTimeout(function() {
                self.loadThread();
            }, 500);
        },

        openPersonalizedImagePopup() {
            this.personalizedImage = true;
            this.personalizedImageTemplate = null;
            this.personalizedImageCompetitor = null;
        },

        async sendPersonalizedImagePush() {
            let self = this;
            this.personalizedImageSending = true

            if (self.image.type == 'Custom') {
                let dataURL = await document.getElementById('imageEditorIframe').contentWindow.store.toDataURL();

                axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, {
                    file_code: dataURL
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                    }
                }).then(function(response) {
                    self.sendingMessage = true;
                    self.messageForm.content = response.data.url;
            
                    axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-message', {
                        threadId: self.thisThreadId,
                        messageForm: self.messageForm
                    }, {
                        headers: {
                        'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                        },
                    }).then(function(response2) {
                        self.personalizedImageSending = false;
                        self.personalizedImage = false;

                        self.sendingMessage = false;
                        self.messageForm.content = "";
                    });
                });
            }
            else {
                html2canvas(document.querySelector(".lfpr-pi-wrapper")).then(function(canvas) {
                    var dataURL = canvas.toDataURL();

                    console.log('dataURL', dataURL)

                    axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, {
                        file_code: dataURL
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                        }
                    }).then(function(response) {
                        self.screenshotUrl = response.data.url;
                        self.sendSelectedScreenshotPush();

                        self.personalizedImageSending = false;
                        self.personalizedImage = false;
                    });
                });
            }
        },

        replaceTokensInImage() {
            if (this.image && this.business) {
                for (var i in this.image.settings.text_elements) {
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[business_name]', this.business.name || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[rating]', this.business.rating || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[reviews]', this.business.user_ratings_total || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[formatted_phone_number]', this.business.formatted_phone_number || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[international_phone_number]', this.business.international_phone_number || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[phone_number_type]', this.business.phone_number_type || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[carrier]', this.business.phone_number_carrier_name || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[address]', this.business.formatted_address || "");
                    this.image.settings.text_elements[i].text = this.image.settings.text_elements[i].text.replace('[website]', this.business.website || "");
                }
            }
        },

        previewImage(url) {
            this.showPreviewImage = true;
            this.previewImageUrl = url;
        },

        getEditorPreviewUrl() {
        return ((process.env.NODE_ENV == 'development') ?
                    'http://localhost:3000/?preview=1' :
                    'https://editor.localleadsniper.com/?preview=1');
        },
    },
    mounted() {
        let self = this;
        this.thisThreadId = this.activeChat;
        this.loadThread();

        this.thread_interval = setInterval(function() {
            let currentActiveChat = self.activeChat;

            let previousSignature = btoa(JSON.stringify(self.messages));

            self.loadThread(function() {
                setTimeout(function() {
                    let newSignature = btoa(JSON.stringify(self.messages));

                    if (previousSignature != newSignature) {
                        // self.selectThread(currentActiveChat);
                        var objDiv = document.getElementById("lfp-messages-list");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }
                }, 10);
            });
        }, 5000);

        this.$store.state.templates.fetchingTemplates = true
        this.$store.dispatch('templates/fetch')

        this.$store.dispatch('personalization_images/fetch')

        window.selectedBusiness = self.business;

        console.log('search', this.search);
    },

    beforeDestroy() {
        clearInterval(this.thread_interval);
        this.thread_interval = null
    },

    watch: {
        personalizedImageTemplate: {
            handler () {
                let self = this;
                window.selectedBusiness = self.business;
                
                for (var i in this.images) {
                    if (this.images[i].id == this.personalizedImageTemplate) {
                        self.image = {
                            id: self.images[i].id,
                            type: self.images[i].type,
                            settings: JSON.parse(self.images[i].settings)
                        };

                        try {
                            applyStoreSettings();
                        }
                        catch(e) {
                            console.log('trying...');
                            setTimeout(function() {
                            applyStoreSettings();
                            }, 200);
                        }

                        function applyStoreSettings() {
                            document.getElementById('imageEditorIframe').contentWindow.applyStoreJson(JSON.stringify(self.image.settings));
                        };
                    }
                }
                
                // this.replaceTokensInImage();
            }
        },

        personalizedImageCompetitor: {
            handler () {
                let self = this
                for (var i in self.search.search_results) {
                    if (self.search.search_results[i].id == self.personalizedImageCompetitor) {
                        self.competitor = self.search.search_results[i]

                        console.log('self.competitor', self.competitor)

                        window.selectedCompetitor = self.competitor;

                        try {
                            applyStoreSettings();
                        }
                        catch(e) {
                            console.log('trying...');
                            setTimeout(function() {
                            applyStoreSettings();
                            }, 200);
                        }

                        function applyStoreSettings() {
                            document.getElementById('imageEditorIframe').contentWindow.applyStoreJson(JSON.stringify(self.image.settings));
                        };
                    }
                }

                this.replaceTokensInImage();
            }
        }
    }
}
</script>

<style scoped>
    .v-card__title {
        background: rgba(31, 36, 47, 0.07);
        border: 0px !important;
    }

    .v-card.v-sheet.theme--light {
        border: 0px !important;
    }

    .theme--light.v-btn {
        color: #757B89 !important;
    }

    .lfp-attached-image {
        position: absolute;
        background: #FFFFFF;
        position: absolute;
        right: 80px;
        bottom: 70px;
        z-index: 10;
        box-shadow: 0px -1px 20px rgba(0, 0, 0, 0.05);
        padding: 20px;
    }

    .lfp-attached-image img {
        border: solid 1px #CCCCCC;
    }

    a.choose_template_link {
        position: absolute; margin-left: 18px; margin-top: 5px; font-size: 16px; color: #064EBC; font-weight: bold; z-index: 2;
    }

    a.send_screenshot_link {
        position: absolute; left: 160px; margin-top: 5px; font-size: 16px; color: #064EBC; font-weight: bold; z-index: 1;
    }

    a.send_image_link {
        position: absolute; left: 300px; margin-top: -9px; font-size: 16px; color: #064EBC; font-weight: bold; z-index: 1;
    }

    @media screen and (max-width: 900px) {
        a.choose_template_link {
            font-size: 13px;
        }

        a.send_screenshot_link {
            font-size: 13px;
            left: 140px;
        }

        a.send_image_link {
            font-size: 13px;
            left: 260px;
        }
    }
</style>