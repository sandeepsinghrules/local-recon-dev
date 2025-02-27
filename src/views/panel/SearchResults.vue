<template>

  <div>
    <panel-navigation>

        <div v-if="showConversationDialog" @click.self="showConversationDialog = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">

                <div class="">
                    
                    <v-skeleton-loader v-if="!activeChat" class="ml-3" type="article, article, article"></v-skeleton-loader>

                    <InboxThread v-if="activeChat" :key="activeChatKey" :activeChat="activeChat" :search_results="true" :business="selected_business" :search="search"></InboxThread>

                </div>

            </div>
        </div>

        <div v-if="show_send_bulk" @click.self="show_send_bulk = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
            <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">

                <div class="rg-modal-header">
                    <span>Send Bulk Message</span>

                    <a href="javascript: void(0);" class="rg-modal-close-btn" @click="show_send_bulk = false"><i class="fa fa-times"></i></a>
                </div>

                <div class="p-6">
                    
                    <div class="float-left" style="border-right: solid 1px #CCCCCC; padding-right: 15px; width: 50%;">
                        <div class="pb-3"><strong>Businesses ({{ selected_searches.length }})</strong></div>
                        <div style="min-height: 180px; max-height: 400px; overflow: auto; font-size: 12px;">
                            <div v-for="(search, index) in selected_searches" :key="index">
                                <strong>{{ search.name }}</strong> - {{ search.formatted_phone_number }}
                            </div>
                        </div>
                    </div>

                    <div class="float-right" style="width: 50%; padding-left: 15px;">
                        <div class="mb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Select Screenshot
                            </label>

                            <v-select
                                :items="screenshot_options"
                                v-model="bulkSMSScreenshot"
                                solo
                            ></v-select>
                        </div>
                        <div class="mb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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

        <div v-if="me && me.one_time" class="float-right mb-3 -mt-2 ml-3">
            <div>
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
                        <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="contactSelected()"><span class="table-menu-action-icon"><i class="fa fa-comment"></i></span> Reply</a></v-list-item-title></v-list-item>
                        <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                    </v-list>
                    </v-menu>
                </div>
            </div>
        </div>

        <div class="float-right mb-3">
            <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-2" @click="downloadCsv();" style="margin-top: -5px;"><i class="fa fa-download mr-2"> </i> DOWNLOAD CSV</div>
        </div>

      <h1 :class="(($vuetify.breakpoint.xs) ? 'text-sm text-bold' : 'text-lg font-semibold mb-3')">
        <div v-if="search" class="float-right">{{ search.search_results.length }} leads</div>
          <span v-if="search">
              {{ search.keyword }} in {{ search.location }}
          </span>
      </h1>

      <hr class="border-b border-gray-100 mb-3">

        <div class="dashboard-box mb-6">
            <v-card
            class="pa-2"
            tile
            >
                <div class="pl-2 pr-2 pb-3 search-results-filter">
                    <v-form class="pt-3 mb-6">
                        <v-row>
                            <v-col
                                cols="12"
                                lg="3"
                                md="3"
                                sm="6"
                                class="pl-4">
                                    <v-text-field
                                        placeholder="Search..."
                                        dense
                                        outlined
                                        hide-details
                                        v-model="filters.search"
                                    ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="3"
                                md="3"
                                sm="6"
                                class="pl-4">
                                <v-select
                                    v-model="filters.phone_number_type"
                                    :items="items_phone_number_type"
                                    label="Phone Number Type"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                    multiple
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="3"
                                md="3"
                                sm="6"
                                class="pl-4">
                                <v-select
                                    v-model="filters.rating"
                                    :items="items_rating"
                                    label="Rating"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="3"
                                md="3"
                                sm="6"
                                class="pl-4">
                            <v-text-field
                                v-model="filters.reviews"
                                prefix="Less than"
                                suffix="reviews"
                                placeholder="0"
                                @blur="getSearch()"
                                center
                                outlined
                                dense
                                hide-details
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4">
                                <v-select
                                    v-model="filters.quote"
                                    :items="items_yes_no"
                                    label="Quote"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4">
                                <v-select
                                    v-model="filters.chat"
                                    :items="items_yes_no"
                                    label="Chat"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4">
                                <v-select
                                    v-model="filters.claimed"
                                    :items="items_yes_no"
                                    label="Claimed"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4 pr-4">
                                <v-select
                                    v-model="filters.posts"
                                    :items="items_yes_no"
                                    label="Posts"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4 pr-4">
                                <v-select
                                    v-model="filters.contacted"
                                    :items="contacted_items"
                                    label="Contacted"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>

                            <v-col
                                cols="12"
                                lg="2"
                                md="4"
                                sm="6"
                                class="pl-4 pr-4">
                                <v-select
                                    v-model="filters.website"
                                    :items="items_yes_no"
                                    label="Website"
                                    outlined
                                    dense
                                    hide-details
                                    clearable
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-form>

                    <v-skeleton-loader v-if="!search" type="article, article, article"></v-skeleton-loader>

                    <AwesomeLocalTable v-if="me && search" v-model="dados" :options="options" />
                </div>
            </v-card>
        </div>

    </panel-navigation>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
// import MenuBusinessActions from '@/components/menus/menuBusinessActions.vue'
// import dialogAddBusiness from '@/components/dialogs/businesses/addBusiness.vue'
import InboxThread from '@/views/panel/InboxThread.vue'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery';

import { TabulatorComponent } from "vue-tabulator";
import { BIconNodeMinusFill } from 'bootstrap-vue';
import { unset } from 'lodash'

export default {
  metaInfo () {
    return {
      title: "Search Results | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    'AwesomeLocalTable': TabulatorComponent,
    InboxThread
  },
  data() {
    return {
        search: null,

        items_rating: ['4.5 stars and up', '4.0 stars and up', '3.5 stars and up', '3.0 stars and up', '2.5 stars and up', '2 stars and up', '4.5 stars and down', '4.0 stars and down', '3.5 stars and down', '3.0 stars and down', '2.5 stars and down', '2 stars and down'],

        items_phone_number_type: ['voip', 'landline', 'mobile'],

        items_yes_no: ['Yes', 'No'],

        contacted_items: ['Yes', 'No', 'Responded'],

        filters: {
            search: "",
            phone_number_type: null,
            rating: null,
            reviews: null,
            quote: null,
            chat: null,
            claimed: null,
            posts: null,
            contacted: null,
            website: null
        },

        showConversationDialog: false,

        selected_business: null,

        activeChat: null,
        activeChatKey: 0,

        dados: [],
        options: {
            columns: [
            {formatter:"rowSelection", titleFormatter:"rowSelection", align:"center", headerSort:false, width: 30},    
            {
                title: 'Business Info',
                field: 'name',
                sorter: 'string',
                width: 500,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    // console.log('cell.getRow', cell.getRow().getData().formatted_address)
                    let cell_html =  "<div class='business-name-wrapper' style='font-weight: bold; font-size: 15px;'><span class='business-name-text business-name-text-" + cell.getRow().getData().id + "'><span class='business-name-text-foreal-" + cell.getRow().getData().id + "'>" + cell.getValue() + '</span> <a class="business-name-edit-link" href="javascript: void(0);" onclick="document.querySelector(\'.business-name-text-' + cell.getRow().getData().id + '\').style.display = \'none\'; document.querySelector(\'.business-name-edit-' + cell.getRow().getData().id + '\').style.display = \'inline-block\'; document.querySelector(\'.business-name-edit-' + cell.getRow().getData().id + '\').focus();"><i class="mdi mdi-pencil-outline cursor-pointer ml-2" style="font-size: 17px;"></i></a></span><span class="business-name-edit business-name-edit-' + cell.getRow().getData().id + '" style="display: none;"><input type="text" onblur="window.saveBusinessName(\'' + cell.getRow().getData().id + '\', this.value)" style="padding: 4px; border: solid 1px #CCCCCC; width: 250px; font-size: 12px;" value="' + cell.getValue() + '" /></span>' + "</div><div class='result-row' id='result-row-" + cell.getRow().getData().id + "'></div>"
                        + '<div style="margin-top: 0px; font-size: 11px !important; color: gray; width: 100%;">' + cell.getRow().getData().formatted_address + "</div>";

                        let number_type = cell.getRow().getData().phone_number_type;

                    // number_type = "mobile";

                    let showSendSms = true;

                    if (number_type == "mobile") {
                        showSendSms = true;
                    }

                    let color = 'red';

                    switch (number_type) {
                        case "mobile":
                            color = 'green';
                        break;

                        case "voip":
                            color = 'orange';
                        break;
                    }

                    cell_html += "<div style='padding-top: 10px; float: left; width: 250px;'>";

                    let international_phone_number = cell.getRow().getData().international_phone_number;
                    international_phone_number = international_phone_number.replace(" ", "");
                    international_phone_number = international_phone_number.replace(/\-/g, "");

                    if (showSendSms) {
                        cell_html += `<span class="business-phone-wrapper">
                                <span class='business-phone-text business-phone-text-` + cell.getRow().getData().id + `'>
                                    <a href='javascript: void(0);' class='lfp-clickable-number business-phone-text-foreal-` + cell.getRow().getData().id + `' data-number='` + cell.getRow().getData().international_phone_number + `' data-search-id='` + cell.getRow().getData().id + `' style='font-weight: bold; margin-top: 10px; font-size: 15px !important;'><i class='fa fa-sms' style='font-size: 16px !important;'></i> ` + cell.getRow().getData().formatted_phone_number + `</a>
                                    <a class="business-phone-edit-link" href="javascript: void(0);" onclick="document.querySelector('.business-phone-text-` + cell.getRow().getData().id + `').style.display = 'none'; document.querySelector('.business-phone-edit-` + cell.getRow().getData().id + `').style.display = 'inline-block'; document.querySelector('.business-phone-edit-` + cell.getRow().getData().id + `').focus(); window.runPhoneInput(` + cell.getRow().getData().id + `)"><i class="mdi mdi-pencil-outline cursor-pointer ml-2" style="font-size: 17px;"></i></a>
                                </span>
                                <span class="business-phone-edit business-phone-edit-` + cell.getRow().getData().id + `" style="display: none;"><input class="business-phone-text-field" id="business-phone-text-field-` + cell.getRow().getData().id + `" type="text" onblur="window.saveBusinessPhone('` + cell.getRow().getData().id + `', this.value)" style="padding: 4px; border: solid 1px #CCCCCC; width: 250px; font-size: 12px;" value="` + international_phone_number + `" /></span>
                            </span>`;
                    }
                    else {
                        cell_html += cell.getRow().getData().formatted_phone_number;
                    }

                    let contacted_html = '<span class="v-chip theme--light v-size--small orange lighten-5 orange--text text--lighten-1"><span class="v-chip__content" style="font-size: 11px !important; font-weight: bold;">Not contacted</span></span>';

                    if (cell.getRow().getData().contacted)
                        contacted_html = '<span class="v-chip theme--light v-size--small blue lighten-5 blue--text text--lighten-1"><span class="v-chip__content" style="font-size: 11px !important; font-weight: bold;">Contacted</span></span>';

                    if (cell.getRow().getData().responded)
                        contacted_html = '<span class="v-chip theme--light v-size--small green lighten-5 green--text text--lighten-1"><span class="v-chip__content" style="font-size: 11px !important; font-weight: bold;">Responded</span></span>';

                    return cell_html + " - <span style='font-size: 12px !important; word-wrap: break-all; color: " + color + "; font-weight: bold;'>" + (number_type || 'N/A') + "</span></div>"
                                    // ' - <span style="font-size: 11px !important; color: gray;">' + (cell.getRow().getData().phone_number_carrier_name || 'N/A') + "</span></div>";

                                    +

                                    "<div style='padding-top: 10px; float: left;'>" +
                                        ((cell.getRow().getData().website) ? 
                                            '<a href="' + cell.getRow().getData().website + '" target="_BLANK"><i class="fa fa-globe" style="font-size: 14px !important;"></i></a>' :
                                            '') +
                                            '<a href="' + cell.getRow().getData().url + '" target="_BLANK"><i class="fa fa-map-marker" style="font-size: 14px !important; margin-left: 5px;"></i></a>' +
                                        '</div><br clear="all" /><div style="padding-top: 5px;">' + contacted_html + '</div>';
                },
            },
            // {
            //     title: '',
            //     field: '',
            //     sorter: 'string',
            //     formatter:"link", formatterParams:{
            //         labelField:"international_phone_number",
            //         urlPrefix:"mailto://",
            //         target:"_blank",
            //     },
            //     // width: 200,
            //     editor: false,
            // },
            {
                title: 'Rating',
                field: 'rating',
                sorter: 'number',
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (!cell.getValue())
                        return '0';

                    return '<span class="v-chip theme--light v-size--small orange lighten-5 orange--text text--lighten-1"><span class="v-chip__content"><i class="fa fa-star mr-1"></i> ' + cell.getValue() + '</span></span>';
                },
            },{
                title: 'Reviews',
                field: 'user_ratings_total',
                sorter: "number",
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (!cell.getValue())
                        return '-';

                    return '<strong>' + cell.getValue() + '</strong>';
                },
            },
            // {
            //     title: 'Screenshot',
            //     field: 'mobile_screenshot',
            //     sorter: 'string',
            //     // width: 200,
            //     editor: false,
            //     formatter:function(cell, formatterParams, onRendered){
            //         let screenshot_url = cell.getValue();

            //         if (!screenshot_url)
            //             return "-";
                    
            //         let thisId = cell.getRow().getData().id;

            //         return '<div class="screenshot-wrapper" data-id="' + thisId + '" style="position: relative;">\
            //                 <img src="' + screenshot_url + '" style="width: 20px;" />\
            //                 <div  class="full-img-' + thisId + '" style="background-image: url(' + screenshot_url + '); background-size: 250px 500px; width: 250px !important; height: 500px !important; position: absolute; visibility: hidden; left: 0px; top: 0px; z-index: 5;" />\
            //             </div>';
            //     },
            // },
            {
                title: 'Category',
                field: 'types',
                sorter: 'string',
                width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    try {
                        let categories = cell.getValue();
                        categories = JSON.parse(categories);
                        let category = categories[0];

                        category = category.replace(/\_/g, " ");

                        category = category.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                            return letter.toUpperCase();
                        });

                        return category;
                    }
                    catch (e) {
                        return '-';
                    }
                },
            },{
                title: 'Quote',
                field: 'on_mobile_using_quote',
                sorter: 'string',
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (cell.getValue() == 1) {
                        return '<i class="mdi mdi-check-circle-outline" style="color: green;"></i>';
                    }
                    else {
                        return '<i class="mdi mdi-close-circle-outline" style="color: gray;"></i>';
                    }
                },
            },{
                title: 'Chat',
                field: 'on_mobile_using_chat',
                sorter: 'string',
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (cell.getValue() == 1) {
                        return '<i class="mdi mdi-check-circle-outline" style="color: green;"></i>';
                    }
                    else {
                        return '<i class="mdi mdi-close-circle-outline" style="color: gray;"></i>';
                    }
                },
            },{
                title: 'Claim',
                field: 'google_claimed_business',
                sorter: 'string',
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (cell.getValue() == 1) {
                        return '<i class="mdi mdi-check-circle-outline" style="color: green;"></i>';
                    }
                    else {
                        return '<i class="mdi mdi-close-circle-outline" style="color: gray;"></i>';
                    }
                },
            },{
                title: 'Posts',
                field: 'google_posts',
                sorter: 'string',
                // width: 200,
                editor: false,
                formatter:function(cell, formatterParams, onRendered){
                    if (cell.getValue() == 1) {
                        return '<i class="mdi mdi-check-circle-outline" style="color: green;"></i>';
                    }
                    else {
                        return '<i class="mdi mdi-close-circle-outline" style="color: gray;"></i>';
                    }
                },
            }, ],
            layout:"fitColumns",
        },

        screenshot_options: ["No screenshot", "Their mobile Google Business screenshot", "Their desktop Google Business screenshot"],
        
        selected_searches: [],
        show_send_bulk: false,
        bulkSMSTemplate: null,
        bulkSMSScreenshot: "No screenshot",
        sendingBulk: false
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      templates: state => state.templates.templates,
    }),
  },
  methods: {
    async bulkDelete() {
        let self = this;
        let selectedIds = [];

        $('.tabulator-tableHolder input[type="checkbox"]:checked').each(function() {
            let parent = $(this).parents('.tabulator-row');
            let theSpan = parent.find('.result-row');

            let theId = parseInt(theSpan.attr("id").replace("result-row-", ""));

            for (var i in self.search.search_results) {
                let searchResult = self.search.search_results[i];

                if (searchResult.id == theId) {
                    selectedIds.push(searchResult.id);
                }
            }
        });
            
        await this.$store.dispatch('searches/bulkDeleteResults', {ids: selectedIds})
        this.getSearch();
    },

    async getSearch(ignoreLoading = false) {
        if (!ignoreLoading)
            this.search = null

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/searches/get-search?id=' + this.$route.params.id, {
            filters: this.filters
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.search = response.data.search;
        // console.log('this.search', this.search);

        if (!this.me.one_time)
            this.options.columns[0].visible = false;

        this.dados = this.search.search_results;

        let self = this;
        setTimeout(function() {
            $(".lfp-clickable-number").click(function() {
                self.activeChat = null;

                $('.lfp-clickable-number').removeClass('selected');
                $(this).addClass("selected");

                // console.log($(this).index(this));

                // self.selected_business = { id: "asdplm" };

                let phone_number = $(this).attr('data-number');

                let search_id = $(this).attr('data-search-id');

                // console.log('search_id', search_id);

                for (var i in self.search.search_results) {
                    console.log('self.search.search_results[i].id', self.search.search_results[i].id)
                    if (self.search.search_results[i].id == search_id) {
                        self.selected_business = self.search.search_results[i];
                    }
                }

                // console.log('self.selected_business', self.selected_business);

                phone_number = phone_number.replace(/ /g, '');
                phone_number = phone_number.replace(/\(/g, '');
                phone_number = phone_number.replace(/\)/g, '');
                phone_number = phone_number.replace(/\-/g, '');
                
                self.showConversationDialog = true;

                axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/add-thread', {
                    new_thread_number: phone_number
                }, {
                    headers: {
                    'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                    },
                }).then(function(response) {
                    self.activeChat = response.data.thread.id;
                });
            });
        }, 500);
    },

    previousConversation() {
        let currentSelectedNumber = $('.lfp-clickable-number.selected');

        let parent = currentSelectedNumber.parents('.tabulator-row');
        let previousParent = parent.prev();

        previousParent.find(".lfp-clickable-number").click();
    },

    nextConversation() {
        let currentSelectedNumber = $('.lfp-clickable-number.selected');

        let parent = currentSelectedNumber.parents('.tabulator-row');
        let nextParent = parent.next();

        nextParent.find(".lfp-clickable-number").click();
    },

    downloadCsv() {
        let csv = 'Business, Address, Phone Number, Carrier, Number Type, Website, Rating, Reviews, Maps URL, Category, Quote, Chat, Claimed, Posts\n';
        this.search.search_results.forEach((row) => {
            // console.log('row', row)

            let categories = row.types;
            categories = JSON.parse(categories);
            let category = categories[0];

            category = category.replace(/\_/g, " ");

            category = category.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });

            let csv_data = [
                '"' + row.name + '"',
                '"' + row.formatted_address + '"',
                row.formatted_phone_number,
                '"' + row.phone_number_carrier_name + '"',
                row.phone_number_type,
                '"' + ((row.website) ? row.website.split("?")[0] : "") + '"',
                row.rating,
                row.user_ratings_total,
                '"' + row.url + '"',
                category,
                ((row.on_mobile_using_quote == 1) ? "Yes" : "No"),
                ((row.on_mobile_using_chat == 1) ? "Yes" : "No"),
                ((row.google_claimed_business == 1) ? "Yes" : "No"),
                ((row.google_posts == 1) ? "Yes" : "No"),
            ]

            csv += csv_data.join(',');
            csv += "\n";
        });
    
        const anchor = document.createElement('a');
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        anchor.target = '_blank';
        anchor.download = this.search.keyword + ' - ' + this.search.location + ".csv";
        anchor.click();
    },

    contactSelected() {
        let self = this
        let selectedSearches = [];

        $('.tabulator-tableHolder input[type="checkbox"]:checked').each(function() {
            let parent = $(this).parents('.tabulator-row');
            let theSpan = parent.find('.result-row');

            let theId = parseInt(theSpan.attr("id").replace("result-row-", ""));

            for (var i in self.search.search_results) {
                let searchResult = self.search.search_results[i];

                if (searchResult.id == theId) {
                    selectedSearches.push({
                        id: searchResult.id,
                        name: searchResult.name,
                        formatted_phone_number: searchResult.formatted_phone_number
                    });
                }
            }
        });

        console.log('selectedSearches', selectedSearches);

        if (selectedSearches.length == 0) {
            self.$swal({
                icon: 'error',
                // title: "Error",
                html: "Please select at least one result.",
                confirmButtonText: 'OK'
            });

            return;
        }

        this.selected_searches = selectedSearches;
        this.show_send_bulk = true;
    },

    async processSendBulk() {
        this.sendingBulk = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/inbox/send-bulk', {
            selected_searches: this.selected_searches,
            bulkSMSScreenshot: this.bulkSMSScreenshot,
            bulkSMSTemplate: this.bulkSMSTemplate,
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        this.$swal({
			title: "Done!",
			text: "Messages are scheduled to be sent in the next few minutes.",
			showCancelButton: false,
		});

        this.sendingBulk = false;
        this.show_send_bulk = false;
        this.selected_searches = false;
        this.bulkSMSScreenshot = "No screenshot";

        $('.tabulator-tableHolder input[type="checkbox"]').prop('checked', false);
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
      
      self.getSearch();

      $("body").on("mouseover", ".screenshot-wrapper", function() {
        let thisId = $(this).attr("data-id");

        $(".full-img-" + thisId).css("visibility", "visible");
      });

      $("body").on("mouseout", ".screenshot-wrapper", function() {
        let thisId = $(this).attr("data-id");

        $(".full-img-" + thisId).css("visibility", "hidden");
      });

      this.getTemplates();

      if (typeof(window.saveBusinessName) == 'undefined') {
        window.saveBusinessName = function(id, business_name) {
            document.querySelector('.business-name-text-foreal-' + id).innerText = business_name;
            document.querySelector('.business-name-text-' + id).style.display = 'inline-block';
            document.querySelector('.business-name-edit-' + id).style.display = 'none';

            axios.post(process.env.VUE_APP_API_ENDPOINT + '/searches/save-business-name', {
                id: id,
                business_name: business_name
            }, {
                headers: {
                'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                },
            })
        }
      }

      if (typeof(window.itiInputs) == 'undefined') {
        window.itiInputs = {};
      }

      if (typeof(window.runPhoneInput) == 'undefined') {
        window.runPhoneInput = function(id) {
            if (!window.itiInputs['input-' + id]) {
                let input = document.querySelector("#business-phone-text-field-" + id);
                window.itiInputs['input-' + id] = window.intlTelInput(input, {
                    utilsScript: "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js?1638200991544" // just for formatting/placeholders etc
                });
            }
        }
      }

        if (typeof(window.saveBusinessPhone) == 'undefined') {
            window.saveBusinessPhone = function(id) {
                console.log('new number ' + window.itiInputs['input-' + id].getNumber());

                if (!window.itiInputs['input-' + id].isValidNumber()) {
                    console.log('not valid!');
                    return;
                }

                let international_phone_number = intlTelInputUtils.formatNumber(window.itiInputs['input-' + id].getNumber(), null, intlTelInputUtils.numberFormat.INTERNATIONAL);
                let formatted_phone_number = intlTelInputUtils.formatNumber(window.itiInputs['input-' + id].getNumber(), null, intlTelInputUtils.numberFormat.NATIONAL);

                document.querySelector('.business-phone-text-foreal-' + id).innerText = formatted_phone_number;
                document.querySelector('.business-phone-text-' + id).style.display = 'inline-block';
                document.querySelector('.business-phone-edit-' + id).style.display = 'none';

                axios.post(process.env.VUE_APP_API_ENDPOINT + '/searches/save-business-phone', {
                    id: id,
                    international_phone_number: international_phone_number,
                    formatted_phone_number: formatted_phone_number
                }, {
                    headers: {
                    'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                    },
                })
            }
        }
  },

  watch: {
    'filters.search'(newVal) {
      this.getSearch(true);
    },
    'filters.phone_number_type'(newVal) {
      this.getSearch();
    },
    'filters.rating'(newVal) {
      this.getSearch();
    },
    // 'filters.reviews'(newVal) {
    //   this.getSearch();
    // },
    'filters.quote'(newVal) {
      this.getSearch();
    },
    'filters.chat'(newVal) {
      this.getSearch();
    },
    'filters.claimed'(newVal) {
      this.getSearch();
    },
    'filters.posts'(newVal) {
      this.getSearch();
    },
    'filters.contacted'(newVal) {
      this.getSearch();
    },
    'filters.website'(newVal) {
      this.getSearch();
    },
  }
}
</script>

<style lang='scss'>
    @import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";

    .tabulator * {
        font-size: 14px !important;
    }

    img, svg, video, canvas, audio, iframe, embed, object {
        display: initial !important;
    }

    .tabulator-cell, .tabulator-row {
        overflow: inherit !important;
    }

    .search-results-filter .v-text-field--outlined fieldset {
       border: 1px solid rgba(25, 35, 58, 0.3) !important;
    }

    .business-name-wrapper a.business-name-edit-link {
        display: none;
    }

    .business-name-wrapper:hover a.business-name-edit-link {
        display: inline-block;
    }

    .business-phone-wrapper a.business-phone-edit-link {
        display: none;
    }

    .business-phone-wrapper:hover a.business-phone-edit-link {
        display: inline-block;
    }

    .business-phone-text-field {
        padding-left: 50px !important;
        width: 180px !important;
    }
</style>