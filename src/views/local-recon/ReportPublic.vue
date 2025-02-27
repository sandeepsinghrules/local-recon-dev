<template>
  <div style="height: 100%; background: #f5f5f5;">
    <div v-if="popupOptin">
      <div v-if="popupOptin" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 800;">
        <div class="w-full sm:w-1/2 lg:w-2/6 bg-white rounded-lg mx-6" style="max-width: 92%;">

          <div class="rg-modal-header">
            Get Your Report
          </div>

          <div class="p-6">
              <div>
                  <div style="text-align: center; font-size: 12px;" class="mb-4" v-if="widget.properties.view_gate.show_headline == true">
                    <h3 class="pt-2">{{ widget.properties.view_gate.headline_text }}</h3>
                  </div>
  
                  <div class="flex flex-wrap">
                      <div v-if="widget.properties.view_gate.first_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.last_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 pr-3 mb-3 md:mb-0')">
                            <p class="mb-1 text-xs mb-2"><strong>
                                {{ widget.properties.view_gate.first_placeholder_text }}
                            </strong></p>
                          <input name="first_name" ref="view_gate_first_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.first_placeholder_text">
                      </div>
                      <div v-if="widget.properties.view_gate.last_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.first_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 md:mb-0')">
                            <p class="mb-1 text-xs mb-2"><strong>
                                {{ widget.properties.view_gate.last_placeholder_text }}
                            </strong></p>
                          <input name="last_name" ref="view_gate_last_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.last_placeholder_text">
                      </div>
                  </div>
  
                  <div class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            {{ widget.properties.view_gate.email_placeholder_text }}
                        </strong></p>
                      <input name="email" ref="view_gate_email" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.email_placeholder_text">
                  </div>
  
                  <div style="text-align: center;" class="">
                    <div v-if="widget.properties.view_gate.show_spam_disclaimer" class="text-xs text-gray-700 mt-1">
                        <i class="fa fa-lock"></i> &nbsp; {{ widget.properties.view_gate.spam_disclaimer_text }}
                    </div>

                    <div class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 mt-3" style="display: inline-block" @click="submitViewGate()" v-bind:style="{ backgroundColor: widget.properties.view_gate.submit_button_color }">{{ widget.properties.view_gate.submit_button_text }}</div>
                  </div>
              </div>

              <div style="clear: both;"></div>

              <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

          </div>
        </div>
      </div>
    </div>

    <div v-if="showHelpRequestModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
        <div class="w-full sm:w-1/2 lg:w-1/3 bg-white rounded-lg mx-6" style="max-width: 96%;">

          <div class="rg-modal-header">
            Get Help

            <a href="javascript: void(0);" class="rg-modal-close-btn" @click="showHelpRequestModal = false"><i class="fa fa-times"></i></a>
          </div>

        <div class="p-6 pt-3">

            <div>
                <div style="text-align: center; font-size: 12px;" class="mb-4">
                    <h2 class="pt-2" style="font-weight: bold;">{{ widget.properties.action_options.header_text_top_fixing_listing }}</h2>
                    <h3 class="pt-2">{{ widget.properties.action_options.header_text_bottom_fixing_listing }}</h3>
                </div>

                <div v-if="widget.properties.action_options.first_name_visible" class="mb-2">
                    <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                        {{ widget.properties.action_options.first_placeholder_text }}
                    </strong></p>
                    <input name="first_name" ref="first_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.first_placeholder_text">
                </div>

                <div v-if="widget.properties.action_options.last_name_visible" class="mb-2">
                    <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                        {{ widget.properties.action_options.last_placeholder_text }}
                    </strong></p>
                    <input name="last_name" ref="last_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.last_placeholder_text">
                </div>

                <div class="mb-2">
                    <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                        {{ widget.properties.action_options.email_placeholder_text }}
                    </strong></p>
                    <input name="email" ref="email" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.email_placeholder_text">
                </div>

                <div class="mb-2">
                    <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                        Company Name
                    </strong></p>
                    <input name="company_name" ref="company_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Name...'">
                </div>

                <div class="mb-2">
                    <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                        Company Address
                    </strong></p>
                    <input name="company_address" ref="company_address" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Address...'">
                </div>

                <div class="flex flex-wrap">
                    <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 pr-3 mb-6')">
                        <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                          City
                        </strong></p>
                        <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-first-name" type="text" ref="city" placeholder="City...">
                    </div>
                    <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 px-3 mb-6')">
                        <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                          State
                        </strong></p>
                        <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="state" placeholder="State...">
                    </div>
                    <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 pl-3 mb-6')">
                        <p class="mb-1 text-xs mb-2" v-show="!$vuetify.breakpoint.xs"><strong>
                          Zip
                        </strong></p>
                        <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="zip" placeholder="Zip...">
                    </div>
                </div>

                <div style="text-align: center;" class="">
                    <div v-if="widget.properties.action_options.spam_disclaimer_visible" class="text-xs text-gray-700 mt-1">
                        <i class="fa fa-lock"></i> &nbsp;{{ widget.properties.action_options.spam_disclaimer_text }}
                    </div>

                    <div class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 mt-3" style="display: inline-block" @click="submitGetHelp()" v-bind:style="{ backgroundColor: widget.properties.action_options.button_color }">{{ widget.properties.action_options.submit_button_text }}</div>
                </div>
            </div>

            <div style="clear: both;"></div>

            <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

        </div>

        </div>
    </div>
    <div v-if="search" style="height: 100%;">
      <div class="lr-report-header " :class="((this.$route.query.download) ? 'downloadable' : '')">
        <div class="lr-report-title">
          {{ search.keyword }}
        </div>

        <div class="lr-report-buttons">
          <div v-if="!this.$route.query.download">
            <div v-if="this.widget.properties.action_options.landing_page_action_type_id != 2 && this.widget.properties.action_options.landing_page_action_type_id != 0" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 rounded cursor-pointer mr-2" @click="getHelp()" style="margin-top: -5px; background-color: #19233a; border-color: #bfbfbf; display: inline-block;">GET HELP</div>
            
            <div class="border-1 border-blue text-xs text-bold px-4 py-2 rounded cursor-pointer" @click="downloadReport()" style="margin-top: -5px; background: #2477F6; color: #FFFFFF; display: inline-block;"><span v-if="!downloadingReport">Download Report <i class="fa fa-chevron-down ml-2" style="font-size: 10px;"> </i></span> <span v-if="downloadingReport">Downloading...</span></div>
          </div>
        </div>

        <div class="clearfix"></div>

        <div class="lr-report-type-title">
          <span v-if="search.search_type == 'business_audit'">
            Review Audit
          </span>

          <span v-if="search.search_type == 'seo_audit'">
            SEO Audit
          </span>

          <span v-if="search.search_type == 'grid_tracker_scan'">
            Grid Tracker
          </span>

          <span v-if="search.search_type == 'gmb_audit'">
            GBP Audit
          </span>

          <span v-if="search.search_type == 'review_link_generator'">
            Google Review Link & Place ID Generator
          </span>

          <span v-if="search.search_type == 'citation_audit'">
            Citation Audit
          </span>

          <span v-if="search.search_type == 'custom'">
            Custom Report
          </span>
        </div>
      </div>

      <div :class="'lr-report-container ' + ((((popupOptin && widget.properties.view_gate.visible && typeof(search.properties.view_gate_submitted) == 'undefined') || (1 && loading && !this.$route.query.download)) ? ' blur ' : '') + '') + ((this.$route.query.download) ? ' downloadable ' : '')">

        <div v-if="search.search_type == 'business_audit'">
          <Reputation :search="search" />
        </div>

        <div v-if="search.search_type == 'seo_audit'">
          <SEOAudit :search="search" />
        </div>

        <div v-if="search.search_type == 'grid_tracker_scan'"  style="height: 100%;">
          <GridTracker :search="search" />
        </div>

        <div v-if="search.search_type == 'gmb_audit'">
          <GMBAudit :search="search" :key="gmbAuditKey" />
        </div>

        <div v-if="search.search_type == 'citation_audit'">
          <CitationAudit :search="search" />
        </div>

        <div v-if="search.search_type == 'review_link_generator'">
          <ReviewLinkGenerator :search="search" />
        </div>

        <div v-if="search.search_type == 'custom'">
          <CustomReport :search="search" />
        </div>
      </div>
    </div>

    <div v-if="1 && loading && !this.$route.query.download" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
        <div class="w-full bg-white mx-6" style="width: 380px; max-width: 96%; border-radius: 5px;">

          <div class="p-6">
              <div v-if="search.search_type == 'business_audit'">
                <h4 class="main-title"><strong>Scanning To Find Your Online Presence</strong></h4>

                <h5 class="sub-title">This can take a minute...</h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-briefcase loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Company Information
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-clock loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Frequently Used Keywords
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-star loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Recent Reviews
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-star-half loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Negative Reviews
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-percent loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Sentiment Analysis
                </div>
                <div style="clear: both;"></div>
              </div>

              <div v-if="search.search_type == 'gmb_audit'">
                <h4 class="main-title"><strong>Scanning To Find Your Online Presence</strong></h4>

                <h5 class="sub-title">This can take a minute...</h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-briefcase loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Company Information
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-users loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Competitors
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-star loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Reviews
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-file-pdf loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Posts
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-list loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Citations
                </div>
                <div style="clear: both;"></div>
              </div>

              <div v-if="search.search_type == 'review_link_generator'">
                <h4 class="main-title"><strong>Scanning To Find Your Review Link</strong></h4>

                <h5 class="sub-title">This can take a minute...</h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-star loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Review Url
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-map-marker loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Place ID
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-link loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Ludo CID
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-link loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  FID
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-star loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Get Reviews
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-search loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  SERP URL
                </div>
                <div style="clear: both;"></div>
              </div>

              <div v-if="search.search_type == 'seo_audit'">
                <h4 class="main-title"><strong>Scanning To Find Your Technical and SEO mistakes</strong></h4>

                <h5 class="sub-title">This can take a minute...</h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-desktop loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  On-Page SEO
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-link loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Rankings and Backlinks
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-chart-bar loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Performance Results
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-users loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Social Results
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-memory loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Technology Results
                </div>
                <div style="clear: both;"></div>
              </div>

              <div v-if="search.search_type == 'grid_tracker_scan'">
                <h4 class="main-title"><strong>Loading Your Grid Report...</strong></h4>

                <h5 class="sub-title">Please Wait ...  </h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="mdi mdi-dots-grid loading-icon" style='margin-top: -32px;'></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Loading Grid
                </div>
                <div style="clear: both;"></div>
              </div>

              <div v-if="search.search_type == 'citation_audit'">
                <h4 class="main-title"><strong>Scanning To Find Your Online Citations</strong></h4>

                <h5 class="sub-title">This can take a minute...</h5>

                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-briefcase loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Company Information
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-hashtag loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Number of Citations
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-users loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Competitors
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-user loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Profile Accuracy
                </div>
                <div style="clear: both;"></div>

                <div style="float: left; position: relative;">
                  <v-progress-circular
                    indeterminate
                    :size="30"
                    width="3"
                    color="primary"
                    
                  ></v-progress-circular>
                  <i class="fa fa-list loading-icon"></i>
                </div>
                <div style="float: left; font-size: 12px; color: #19233A; padding-left: 8px; padding-top: 6px;">
                  Citations
                </div>
                <div style="clear: both;"></div>
              </div>

              <div style="clear: both;"></div>

              <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

          </div>
        </div>
      </div>
  </div>
</template>


<script>
import axios from 'axios'
import $ from 'jquery'
import ApexCharts from 'apexcharts'
import VueGauge from "@/views/local-recon/VueGauge";
import Reputation from '@/views/local-recon/ReportsTemplates/Reputation.vue'
import SEOAudit from '@/views/local-recon/ReportsTemplates/SEOAudit.vue'
import GridTracker from '@/views/local-recon/ReportsTemplates/GridTracker.vue'
import GMBAudit from '@/views/local-recon/ReportsTemplates/GMBAudit.vue'
import ReviewLinkGenerator from '@/views/local-recon/ReportsTemplates/ReviewLinkGenerator.vue'
import CitationAudit from '@/views/local-recon/ReportsTemplates/CitationAudit.vue'
import CustomReport from '@/views/local-recon/ReportsTemplates/CustomReport.vue'

export default {
metaInfo () {
  return {
    title: "Report | " + this.$appName
  }
},
components: {
  ApexCharts,
  VueGauge,
  Reputation,
  SEOAudit,
  GridTracker,
  GMBAudit,
  ReviewLinkGenerator,
  CitationAudit,
  CustomReport
},
data () {
  return {
    loading: true,
    currentLoadingText: 1,

    widget: false,
    search: false,

    showHelpRequestModal: false,

    downloadingReport: false,

    loads: 1,

    gmbAuditKey: 0,
    
    popupOptin:false,
  }
},
methods: {
  ucwords (str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
  },

  async loadReport() {
    let self = this;

    if(self.$route.query.widget){
        self.popupOptin = true;
    }

    let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + this.$route.query.s + '&p=' + this.$route.query.p + '&si=' + this.$route.query.si + '&loads=' + this.loads;
    
    let response = await axios.get(url, {

    })

    let previous_success = true;
    let previous_reviews_success = true;
    let previous_posts_success = true;

    if (this.search && this.search.search_type == "gmb_audit") {
      previous_success = this.search.properties.success
    }

    if (this.search && this.search.search_type == "gmb_audit") {
      if (this.search.properties.reviews) {
        if (this.search.properties.reviews.status != 'completed')
          previous_reviews_success = false
      }

      if (this.search.properties.posts) {
        if (this.search.properties.posts.status != 'completed')
          previous_posts_success = false
      }
    }

    // console.log(response);

    if (response.data.search.search_type == "gmb_audit") {
      // console.log('response.data.search.properties', response.data.search.properties);

      if (response.data.search.properties.success) {
        if(parseInt(localStorage.getItem('gmb_tab')) != 2)
        {
          self.gmbAuditKey++;
        }
        
        if (!previous_success) {
          self.gmbAuditKey++;
          // return;
        }

        if (response.data.search.properties.reviews) {
          if (response.data.search.properties.reviews.status == 'completed')
            if (!previous_reviews_success) {
              self.gmbAuditKey++;
              // return;
            }
        }

        if (response.data.search.properties.posts) {
          if (response.data.search.properties.posts.status == 'completed')
            if (!previous_posts_success) {
              self.gmbAuditKey++;
              // return;
            }
        }
        if(response.data.search.properties.posts.status == 'pending'){
          self.gmbAuditKey++;
        }
        setTimeout(function() {
          self.loading = false;
        }, 2000);

        setTimeout(function() {
          self.loadReport();
        }, 30000);
      }
      else {
        // console.log('keep retrying...');
        this.loading = true;
        setTimeout(function() {
          self.loadReport();
        }, 1000);
      }
    }

    if (response.data.search.search_type == "review_link_generator") {
      if (response.data.search.properties.success)
        self.loading = false;
      else {
        setTimeout(function() {
          self.loadReport();
        }, 1000);
      }
    }

    this.widget = response.data.widget;
    this.search = response.data.search;

    if (this.search.search_type == "business_audit") {
      setTimeout(function() {
        self.loading = false;
      }, 2000);
    }

    if (this.search.search_type == "seo_audit") {
      // console.log('this.search.properties', this.search.properties);

      if (this.search.properties.success) {
        setTimeout(function() {
          self.loading = false;
        }, 2000);
      }
      else {
        // console.log('keep retrying...');
        this.loading = true;
        setTimeout(function() {
          self.loadReport();
        }, 1000);
      }
    }

    if (this.search.search_type == "grid_tracker_scan") {
      if (this.search.properties.report_pdf) {
        setTimeout(function() {
          self.loading = false;
        }, 1000);
      }
    }

    if (this.search.search_type == "citation_audit") {
      // console.log('this.search.properties', this.search.properties);

      if (this.search.properties.success) {
        setTimeout(function() {
          self.loading = false;
        }, 2000);
      }
      else {
        // console.log('keep retrying...');
        this.loading = true;
        setTimeout(function() {
          self.loadReport();
        }, 1000);
      }
    }

    if (this.search.search_type == 'custom') {
      this.loading = false;
    }

    // console.log('this.widget', this.widget)
  // Apply custom CSS
  if (this.widget.properties.custom_css) {
      if (document.getElementById("lr-widget-custom-css-sheet") === null) {
          var styleSheet = document.createElement("style")
          styleSheet.type = "text/css"
          styleSheet.innerText = this.widget.properties.custom_css.replace(/\n/g, " ")
          styleSheet.id = 'lr-widget-custom-css-sheet';
          document.body.appendChild(styleSheet);
      }
      else {
          document.getElementById("lr-widget-custom-css-sheet").innerText = this.widget.properties.custom_css.replace(/\n/g, " ");
      }
  }
  else {
      if (document.getElementById("lr-widget-custom-css-sheet") === null) {
          var styleSheet = document.createElement("style")
          styleSheet.type = "text/css"
          styleSheet.innerText = ""
          styleSheet.id = 'lr-widget-custom-css-sheet';
          document.body.appendChild(styleSheet);
      }
      else {
          document.getElementById("lr-widget-custom-css-sheet").innerText = '';
      }
  }
  // END Apply custom CSS

  this.loads++;
  },
  async submitViewGate() {
    console.log(1);
    if (this.widget.properties.view_gate.first_name_visible && this.widget.properties.view_gate.first_name_mandatory) {
      if (this.$refs.view_gate_first_name.value.trim() == "") {
        this.$swal({
          icon: 'error',
          // title: "First Name",
          html: "Please enter your first name.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
    }
    console.log(2);
    if (this.widget.properties.view_gate.last_name_visible && this.widget.properties.view_gate.last_name_mandatory) {
      if (this.$refs.view_gate_last_name.value.trim() == "") {
        this.$swal({
          icon: 'error',
          // title: "First Name",
          html: "Please enter your last name.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
    }
    console.log(3);
    if (!this.validateEmail(this.$refs.view_gate_email.value.trim())) {
      this.$swal({
        icon: 'error',
        // title: "Error",
        html: "Please enter a valid email address.",
        confirmButtonText: 'OK'
      }).then(function() {

      });
      return;
    }
    console.log(4);
      
    let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-view-gate?s=' + this.$route.query.s + '&p=' + this.$route.query.p;


   

    let locality = null;
    if (this.search &&this.search.properties &&this.search.properties.address_components) {
      locality = this.search.properties.address_components.find(component =>component.types.includes("route"));
    } else if (this.search &&this.search.properties &&this.search.properties.business &&this.search.properties.business.address_components) {
      locality = this.search.properties.business.address_components.find(component =>component.types.includes("route"));
    }

    let postalCode = null;
    if (this.search &&this.search.properties &&this.search.properties.address_components) {
      postalCode = this.search.properties.address_components.find(component =>component.types.includes("postal_code"));
    } else if (this.search &&this.search.properties &&this.search.properties.business &&this.search.properties.business.address_components) {
      postalCode = this.search.properties.business.address_components.find(component =>component.types.includes("postal_code"));
    }

    let buscity = null;
    if (this.search &&this.search.properties &&this.search.properties.address_components) {
      buscity = this.search.properties.address_components.find(component =>component.types.includes("political"));
    } else if (this.search &&this.search.properties &&this.search.properties.business &&this.search.properties.business.address_components
    ) {
      buscity = this.search.properties.business.address_components.find(component =>component.types.includes("political"));
    }

    let busstate = null;
    if (this.search &&this.search.properties &&this.search.properties.address_components) {
      busstate = this.search.properties.address_components.find(component =>component.types.includes("administrative_area_level_1"));
    } else if ( this.search && this.search.properties && this.search.properties.business && this.search.properties.business.address_components ) {
      busstate = this.search.properties.business.address_components.find(component =>component.types.includes("administrative_area_level_1"));
    }

    let company_name = null;
    if(this.search.search_type == 'seo_audit'){
      company_name = this.search.keyword ? this.search.keyword: '';
    }else{
      company_name = this.search.properties.name ? this.search.properties.name: this.search.properties.business.name;
    }
   

    const company_address = locality ? locality.long_name: '';
    const zip = postalCode ? postalCode.long_name : "";
    const city = buscity ? buscity.long_name : "";
    const state = busstate ? busstate.long_name+ " "+ busstate.long_name : "";

    let response = await axios.post(url, {
      first_name: this.$refs.view_gate_first_name.value.trim(),
      last_name: this.$refs.view_gate_last_name.value.trim(),
      email: this.$refs.view_gate_email.value.trim(),
      company_name: company_name,
      company_address: company_address,
      city: city,
      state: state,
      zip: zip
    } , {
        headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        },
    })
    if (this.widget.properties.action_options.landing_page_action_type_id == 2 || this.widget.properties.action_options.landing_page_action_type_id == 4) {
      window.location = this.getCorrectedUrl(this.widget.properties.action_options.redirect_link_url);
    }else{
      // location.reload(true);
      const query = { ...this.$route.query };
      if (query.widget) {
        delete query.widget;
        this.$router.replace({ path: this.$route.path, query });
      }
      this.popupOptin = false;
    }
    
  },
   getCorrectedUrl(url) {
      // Check if the URL starts with "http://" or "https://"
      if (!/^https?:\/\//i.test(url)) {
          // If not, prepend "https://"
          url = "https://" + url;
      }
      return url;
  },
  async submitGetHelp() {
    if (this.widget.properties.action_options.first_name_visible && this.widget.properties.action_options.first_name_mandatory) {
      if (this.$refs.first_name.value.trim() == "") {
        this.$swal({
          icon: 'error',
          // title: "First Name",
          html: "Please enter your first name.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
    }

    if (this.widget.properties.action_options.last_name_visible && this.widget.properties.action_options.last_name_mandatory) {
      if (this.$refs.last_name.value.trim() == "") {
        this.$swal({
          icon: 'error',
          // title: "First Name",
          html: "Please enter your last name.",
          confirmButtonText: 'OK'
        }).then(function() {

        });
        return;
      }
    }

    if (!this.validateEmail(this.$refs.email.value.trim())) {
      this.$swal({
        icon: 'error',
        // title: "Error",
        html: "Please enter a valid email address.",
        confirmButtonText: 'OK'
      }).then(function() {

      });
      return;
    }
      
    let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-get-help?s=' + this.$route.query.s + '&p=' + this.$route.query.p;
    
    let response = await axios.post(url, {
      first_name: this.$refs.first_name.value.trim(),
      last_name: this.$refs.last_name.value.trim(),
      email: this.$refs.email.value.trim(),
      company_name: this.$refs.company_name.value.trim(),
      company_address: this.$refs.company_address.value.trim(),
      city: this.$refs.city.value.trim(),
      state: this.$refs.state.value.trim(),
      zip: this.$refs.zip.value.trim()
    })

    this.$swal({
      title: "Thank you!",
      text: "Thank you for contacting us! We will get back to you soon.",
      showCancelButton: false,
      confirmButtonText: 'Close'
    }).then(function() {
      
    });

    this.showHelpRequestModal = false
    if (this.widget.properties.action_options.landing_page_action_type_id == 4) {
        setTimeout(() => {
          window.location = this.getCorrectedUrl(this.widget.properties.action_options.redirect_link_url);
      }, 1000); 
    }
  },
  getHelp() {
    if (this.widget.properties.action_options.landing_page_action_type_id == 2) {
      window.location = this.getCorrectedUrl(this.widget.properties.action_options.redirect_link_url);
    }
    else {
      this.showHelpRequestModal = true
    }
  },
  validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  },

  async downloadReport() {
      this.downloadingReport = true;

      let href;

      if (this.search.search_type == 'seo_audit') {
        href = this.search.properties.data.output.pdf;
      }else if(this.search.search_type == 'grid_tracker_scan'){
        href = this.search.properties.report_pdf;
      }
      else {
        let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/download-report';
      
        let response = await axios.post(url, {
          report_url: window.location.href + "&download=1"
        });

        href = response.data.url;
      }

      var anchor = document.createElement('a');
      anchor.href = href;
      anchor.target = '_blank';
      anchor.download = 'rep-report.pdf';
      document.body.appendChild(anchor);
      anchor.click();

      this.downloadingReport = false;
  }
},
created() {
  let that = this
  setInterval(function() {
    $("#carousel").fadeOut(500);

    setTimeout(function() {
      that.currentLoadingText++;

      if (that.currentLoadingText == 6)
        that.currentLoadingText = 1;

      $("#carousel").fadeIn(500);
    }, 500);
  }, 6000);

  that.loadReport();
}
}
</script>

<style>
  html, body {
      height: 100%;
  }

  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,700,800);
  body{
    /*background: red;*/
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }

  .v-slider__thumb {
    display: none !important;
  }

  .blur {
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -ms-filter: blur(3px);
      -o-filter: blur(3px);
      filter: url(data:image/svg+xml;utf8,<svg height='0' xmlns='http://www.w3.org/2000/svg'>…eGaussianBlur in='SourceGraphic' stdDeviation='5'/></filter></svg>#svgBlur);
      filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
      filter: blur(3px);
  }

  .v-progress-circular--indeterminate:not(.v-progress-circular--visible) .v-progress-circular__overlay, .v-progress-circular--indeterminate:not(.v-progress-circular--visible)>svg {
    -webkit-animation-play-state: running !important;
    animation-play-state: running !important;
  }

  .v-progress-circular {
    margin: auto;
    display: block;
  }
  
  #report-loading-wrapper img{
    width: 164px;
    margin-top: 40px;
    margin-bottom: 35px;
    margin-left: -10px;
  }

  #report-loading-wrapper .text{
    color:#fff;
    position: absolute;
    top:230px;
    left:0px;
    right:0px;
    margin: auto;

  }
  #report-loading-wrapper h4{
    font-size: 15px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 20px;


  }

  .main-title{
    font-size: 14px !important;
    color:#000000;
    margin-bottom: 15px;
  }
  .title{
    font-size: 20px !important;
    color:#22b661;
    margin-bottom: 15px;
    padding-top: 15px;
    display: none;

  }
  #report-loading-wrapper #carousel {
    background: #e3e9ec;
    display: none;
    border-radius: 2px !important;
    margin-top: 20px;
    padding-bottom: 15px;
    opacity: 0.7;
  }
  #report-loading-wrapper .detail{
    font-size: 26px !important;
    color:#333;
    font-weight: normal;
    font-style: italic;
    margin-top: 10px;
  }
  #report-loading-wrapper .detail i{
    font-size: 18px;
  }
  #report-loading-wrapper .detail p {
      font-style:normal;
      margin-top: 7px;
  }
  .sub-title{
    font-size: 12px !important;
    color: #757B89;
    font-weight: normal;
    margin-bottom: 15px;
  }
  #report-loading-wrapper .name{
    font-size: 18px !important;
    color:#8E8A8A;
    margin-bottom: 15px;
  }

  #report-loading-wrapper .load-container {
    width: 280px;
    height: 280px;
    overflow: hidden;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top:113px;
    right:0px;
    left:0px;
    margin: auto;
  }

  #report-loading-wrapper .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 0.8em solid rgba(255,255,255, 0.3);
    border-right: 0.8em solid rgba(255,255,255, 0.3);
    border-bottom: 0.8em solid rgba(255,255,255, 0.3);
    border-left: 0.8em solid rgba(255,255,255, 0.3);
    /*-webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;*/
  }
  #report-loading-wrapper .loader,
  #report-loading-wrapper .loader:after {
    border-radius: 50%;
    width: 13em;
    height: 13em;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  #report-loading-wrapper body{
    overflow: hidden;
    margin: 0;
    position: relative;
  }

  @keyframes circle {
    from {
      transform: scale(0);
        opacity: 0.3;
    }
    to {
      transform: scale(1.2);
      opacity: 0.0;
    }
  }
  #report-loading-wrapper .circle {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: 7px solid #31af91;
    border-radius: 50%;
    position: absolute;
    top: 135px;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: -1;
    opacity: 0.3
  }
  #report-loading-wrapper .one {
    animation: circle 4s infinite linear;
  }
  #report-loading-wrapper .two {
    animation: circle 3s infinite linear;
  }
  #report-loading-wrapper .three {
    animation: circle 2s infinite linear;
  }
  #report-loading-wrapper .carousel-indicators .active{
    background-color: #31af91;
  }

  #report-loading-wrapper .carousel-indicators li {
    border: 1px solid #31af91;
  }
  #report-loading-wrapper .carousel-indicators {
      bottom: -51px;
  }
  #report-loading-wrapper .carousel-inner{
    /*background-color: #22b661 !important;*/
    border-radius: 2px;
  }

  .mx-auto.v-card, .v-list-item {
    height: 100%;
  }

  .loading-icon {
    font-size: 12px; color: #1976d2; position: absolute; margin-top: -28px; margin-left: 4px; left: 5px; right: 0px;
  }

  .v-progress-circular {
    margin: auto !important;
    margin-bottom: 8px !important;
  }

  @media (max-width : 1200px) {
    #report-loading-wrapper .detail {
      font-size: 21px !important;
    }
  }
  @media (max-width : 992px) {
    #report-loading-wrapper img {
      margin-top: 25px;
      margin-bottom: 15px;
    }
    #report-loading-wrapper .load-container {
      top:90px;
    }
    #report-loading-wrapper .text{
      top:205px;
    }
    #report-loading-wrapper .circle{
      top:70px;
    }
  }
  @media (max-width : 480px) {
    #report-loading-wrapper .main-title {
      font-size: 15px !important;
    }
    #report-loading-wrapper .detail {
      font-size: 16px !important;
    }

    .loading-icon {
      margin-top: -33px;
      margin-left: 0px;
      font-size: 12px;
    }
  }


  .lr-report-header {
    background: #19233a;
    opacity: 0.9;
    height: auto;
    padding: 35px;
    padding-bottom: 200px;
  }

  .lr-report-header.downloadable {
    padding-bottom: 0px;
  }
  
  .lr-report-title {
    float: left;
    color: #FFFFFF;
    font-size: 20px;
  }

  .lr-report-buttons {
    float: right;
  }

  .lr-report-type-title {
    color: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding-top: 20px
  }

  .lr-report-container {
    padding: 80px;
    color: #19233A !important;
    font-size: 12px;
    max-width: 1400px;
    margin: auto;
    margin-top: -240px;
  }

  .lr-report-container.downloadable {
    padding: 0px;
    margin-top: 10px;
  }

  .lr-report-subtitle {
    font-size: 18px;
    color: 16px;
    font-weight: bold;
  }

  .lr-faq-keywords {
    height: 60px; line-height: 50px; padding-top: 10px;
  }

  .lr-doughnut-wrapper {
    position: relative;
  }

  .lr-doughnut-wrapper .lr-doughnut-title {
    position: absolute;
    font-size: 36px;
    font-weight: bold;
    padding-left: 88px;
    padding-top: 47px;
  }

  .lr-doughnut-wrapper .lr-doughnut-title.not-grade {
    padding-left: 82px;
  }

  .lr-doughnut-wrapper .lr-doughnut-subtitle {
    color: #757B89;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .lr-overall-box-left {
    float: left;
    width: 45%;
  }

  .lr-overall-box-right {
    float: left;
    width: 45%;
  }

  .lr-seo-box-left {
    float: left;
    width: 35%;
    padding-top: 10px;
  }

  .lr-seo-box-right {
    float: left;
    width: 55%;
  }

  .lr-recommendations-nr {
    width: 223px; height: 45px; color: #FFFFFF; background: #19233A; border-radius: 5px; padding: 13px 20px; font-size: 12px; margin-top: 10px; font-weight: bold;
    text-align: center;
  }

  .lr-radar-wrapper {
    padding-top: 65px;
  }

  .lr-backlinks-stats {
    clear: both;
    padding-top: 30px;
  }

  .lr-backlinks-stats .lr-backlinks-stat {
    float: left;
    text-align: center;
    padding-right: 50px;
  }

  .lr-backlinks-stats .lr-backlinks-stat.even {
    width: 16.6%;
  }

  .lr-backlinks-stats .lr-backlinks-stat .lr-backlinks-stat-icon {
    color: #2477F6;
    font-size: 35px;
  }

  .lr-backlinks-stats .lr-backlinks-stat .lr-backlinks-stat-value {
    color: #273042;
    font-weight: bold;
    font-size: 16px;
  }

  .lr-backlinks-stats .lr-backlinks-stat .lr-backlinks-stat-description {
    color: #273042;
    font-size: 16px;
  }

  .lr-seo-audit-photo {
    position: relative; text-align: right;
  }

  @media (max-width : 480px) {
    .lr-report-container {
      padding: 10px;
      margin-top: -180px;
    }

    .loading-icon {
      left: 9px;
      margin-top: -30px !important;
    }

    .lr-report-buttons {
      float: none;
      padding-top: 20px;
      clear: both;
      text-align: center;
    }

    .lr-report-title {
      float: none;
      text-align: center;
    }

    .lr-faq-keywords {
      height: auto;
    }

    .lr-seo-audit-photo {
      text-align: left;
    }

    .lr-seo-audit-photo img {
      width: 100%;
      max-height: none !important;
    }

    .lr-overall-box-left {
      float: none;
      width: 100%;
    }

    .lr-overall-box-right {
      clear: both;
      float: none;
      text-align: center;
      width: 100%;
    }

    .lr-recommendations-nr {
      margin: auto;
    }

    .lr-doughnut-wrapper {
      position: relative;
      margin: auto;
      width: 197px;
    }

    .lr-seo-box-left {
      float: none;
      width: 100%;
    }

    .lr-seo-box-right {
      clear: both;
      float: none;
      width: 100%;
    }

    .lr-backlinks-stats .lr-backlinks-stat {
      float: none;
      width:100%;
      padding-right: 0px;
    }

    .lr-report-gauges {
      width: 260px;
      margin: auto;
    }

    .lr-backlinks-stats .lr-backlinks-stat.even {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .rg-dialog-button-save {
    cursor: pointer;
  }

  @media (max-width : 700px) {
    .lr-report-header {
      padding-bottom: 20px;
    }

    .lr-report-container {
      margin-top: 10px;
    }
  }
</style>