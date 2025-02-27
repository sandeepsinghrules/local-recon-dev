<template>

    <panel-navigation>
  
      <v-app-bar v-if="me && profile" app color="" class="header-top px-5" elevation="0" height="80">
          <a href="javascript: void(0);" @click="$router.go(-1)"><i class="mdi mdi-chevron-left text-gray-700" style="font-size: 40px;"></i></a>
  
          <img :src="require('@/assets/icon-green.png')" alt="" class="ml-10" />
  
          <div>
              <hr role="separator" aria-orientation="vertical" class="ml-6 mr-6 v-divider v-divider--vertical theme--light" style="height: 60px;" />
          </div>
  
          <h1 v-if="widget" v-show="!edit_name" class="text-lg font-semibold">{{ widget.name }}</h1>
  
          <i  v-show="!edit_name" class="mdi mdi-pencil-outline cursor-pointer ml-4" @click="edit_name = true;" style="font-size: 20px;"></i>
  
          <v-text-field
              v-if="widget"
              v-show="edit_name"
              placeholder="Widget name..."
              hide-details="true"
              v-model="widget.name"
              :readonly="profile.settings.role == 'Manager (readonly)'"
              outlined
              dense
              style="max-width: 300px !important;"
              :append-icon="'mdi-check'"
              @click:append="edit_name = false"
          ></v-text-field>
  
        <div class="bg-blue text-white text-bold text-xs inline-block rounded py-2 px-3 cursor-pointer float-right" :class="{'spinner': savingWidget}" @click="saveWidget()" style="margin-left: auto;">SAVE WIDGET</div>
      </v-app-bar>
  
  
      <div v-if="showHelpRequestModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
          <div class="w-full sm:w-1/2 lg:w-3/5 bg-white rounded-lg mx-6">
  
          <div class="rg-modal-header">
              Help Request Settings
  
              <a href="javascript: void(0);" class="rg-modal-close-btn" @click="showHelpRequestModal = false"><i class="fa fa-times"></i></a>
          </div>
  
          <div class="p-6">
  
              <div class="float-left pt-1" style="width: 40%;">
                  <br /><br /><br />
  
                  <v-expansion-panels accordion flat dense>
                      <v-expansion-panel>
                          <v-expansion-panel-header>First Name</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.action_options.first_name_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.action_options.first_name_mandatory"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.action_options.first_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Last Name</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.action_options.last_name_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.action_options.last_name_mandatory"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.action_options.last_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Email</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  disabled
                                  v-model="help_request_email_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  disabled
                                  v-model="help_request_email_required"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.action_options.email_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Button</v-expansion-panel-header>
                          <v-expansion-panel-content>
                              <br />
                              <div class="has-color-picker">
                                  <color-picker v-model="widget.properties.action_options.button_color"></color-picker>
                              </div>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Spam</v-expansion-panel-header>
                          <v-expansion-panel-content>
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.action_options.spam_disclaimer_visible"
                                  label="Visible"
                              ></v-switch>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
                  </v-expansion-panels>
              </div>
  
              <div class="float-right" style="width: 55%;">
                    <div style="text-align: center; font-size: 12px;" class="mb-4">
                      <h2 class="pt-2" style="font-weight: bold;"><Editable v-model="widget.properties.action_options.header_text_top_fixing_listing" /></h2>
                      <h3 class="pt-2"><Editable v-model="widget.properties.action_options.header_text_bottom_fixing_listing" /></h3>
                  </div>
  
                  <div v-if="widget.properties.action_options.first_name_visible" class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            {{ widget.properties.action_options.first_placeholder_text }}
                        </strong></p>
                        <input name="first_name" ref="first_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.first_placeholder_text">
                    </div>

                    <div v-if="widget.properties.action_options.last_name_visible" class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            {{ widget.properties.action_options.last_placeholder_text }}
                        </strong></p>
                        <input name="last_name" ref="last_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.last_placeholder_text">
                    </div>

                    <div class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            {{ widget.properties.action_options.email_placeholder_text }}
                        </strong></p>
                        <input name="email" ref="email" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.email_placeholder_text">
                    </div>

                    <div class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            Company Name
                        </strong></p>
                        <input name="company_name" ref="company_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Name...'">
                    </div>

                    <div class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            Company Address
                        </strong></p>
                        <input name="company_address" ref="company_address" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Address...'">
                    </div>

                    <div class="flex flex-wrap">
                        <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 pr-3 mb-6')">
                            <p class="mb-1 text-xs mb-2"><strong>
                            City
                            </strong></p>
                            <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-first-name" type="text" ref="city" placeholder="City...">
                        </div>
                        <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 px-3 mb-6')">
                            <p class="mb-1 text-xs mb-2"><strong>
                            State
                            </strong></p>
                            <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="state" placeholder="State...">
                        </div>
                        <div :class="(($vuetify.breakpoint.xs) ? 'w-full md:w-1/3 mb-2' : 'w-full md:w-1/3 pl-3 mb-6')">
                            <p class="mb-1 text-xs mb-2"><strong>
                            Zip
                            </strong></p>
                            <input class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="zip" placeholder="Zip...">
                        </div>
                    </div>

                    <div style="text-align: center;" class="">
                        <div v-if="widget.properties.action_options.spam_disclaimer_visible" class="text-xs text-gray-700 mt-1">
                            <i class="fa fa-lock"></i> &nbsp;<Editable v-model="widget.properties.action_options.spam_disclaimer_text" />
                        </div>

                        <div class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 mt-3" style="display: inline-block" v-bind:style="{ backgroundColor: widget.properties.action_options.button_color }"><Editable v-model="widget.properties.action_options.submit_button_text" /></div>
                    </div>
              </div>
  
              <div style="clear: both;"></div>
  
              <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->
  
          </div>
  
          <div class="bg-gray-100 rounded-b-lg px-6 py-4">
              <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 float-right" @click="showHelpRequestModal = false">
                  CLOSE
              </button>
  
              <div class="clearfix"></div>
          </div>
          </div>
      </div>
  
      <div v-if="showRedirectUrlModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
          <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">
  
          <div class="rg-modal-header">
              Redirect
  
              <a href="javascript: void(0);" class="rg-modal-close-btn" @click="showRedirectUrlModal = false"><i class="fa fa-times"></i></a>
          </div>

          <div class="p-6">
            <v-alert
                v-if="errorMessage"
                type="error"
                dense
                outlined
                >
                {{ errorMessage }}
            </v-alert>
              <h2 class="text-lg font-semibold text-gray-800 mb-3">Redirect</h2>
  
              <hr class="border-b border-gray-100 mb-4">
  
              <v-text-field
                  label="Enter Redirect URL"
                  hide-details="auto"
                  v-model="widget.properties.action_options.redirect_link_url"
                  dense
                  outlined
              ></v-text-field>
  
              <div style="clear: both;"></div>
          </div>
  
          <div class="bg-gray-100 rounded-b-lg px-6 py-4">
              <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 float-right" @click="redirectValidation">
                  CLOSE
              </button>
  
              <div class="clearfix"></div>
          </div>
  
          </div>
      </div>
  
      <div v-if="showOptinModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 9999;">
          <div class="w-full sm:w-1/2 lg:w-3/5 bg-white rounded-lg mx-6">
  
          <div class="rg-modal-header">
              Optin Settings
  
              <a href="javascript: void(0);" class="rg-modal-close-btn" @click="showOptinModal = false"><i class="fa fa-times"></i></a>
          </div>
  
          <div class="p-6">
  
              <div class="float-left pt-1" style="width: 40%;">
                  <v-expansion-panels accordion flat dense>
                      <v-expansion-panel>
                          <v-expansion-panel-header>Headline</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.show_headline"
                                  label="Visible"
                              ></v-switch>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>First Name</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.first_name_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.first_name_mandatory"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.view_gate.first_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Last Name</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.last_name_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.last_name_mandatory"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.view_gate.last_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Email</v-expansion-panel-header>
                          <v-expansion-panel-content>
                          
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  disabled
                                  v-model="help_request_email_visible"
                                  label="Visible"
                              ></v-switch>
  
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  disabled
                                  v-model="help_request_email_required"
                                  label="Required"
                              ></v-switch>
  
                              <p class="mb-1 text-xs mb-2"><strong>Placeholder Text</strong></p>
                              <v-text-field
                                  outlined
                                  dense
                                  hide-details="auto"
                                  v-model="widget.properties.view_gate.email_placeholder_text"
                              ></v-text-field>
  
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Button</v-expansion-panel-header>
                          <v-expansion-panel-content>
                              <br />
                              <div class="has-color-picker">
                                  <color-picker v-model="widget.properties.view_gate.submit_button_color"></color-picker>
                              </div>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Spam</v-expansion-panel-header>
                          <v-expansion-panel-content>
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.show_spam_disclaimer"
                                  label="Visible"
                              ></v-switch>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
  
                      <v-expansion-panel class="mt-1">
                          <v-expansion-panel-header>Name</v-expansion-panel-header>
                          <v-expansion-panel-content>
                              <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                  v-model="widget.properties.view_gate.first_last_one_line"
                                  label="On one line"
                              ></v-switch>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
                  </v-expansion-panels>
              </div>
  
              <div class="float-right" style="width: 55%;">
                  <div style="text-align: center; font-size: 12px;" class="mb-4" v-if="widget.properties.view_gate.show_headline == true">
                      <h3 class="pt-2"><Editable v-model="widget.properties.view_gate.headline_text" /></h3>
                  </div>
  
                  <div class="flex flex-wrap">
                      <div v-if="widget.properties.view_gate.first_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.last_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 pr-3 mb-3 md:mb-0')">
                            <p class="mb-1 text-xs mb-2"><strong>
                                {{ widget.properties.view_gate.first_placeholder_text }}
                            </strong></p>
                          <input name="first_name" ref="first_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.first_placeholder_text">
                      </div>
                      <div v-if="widget.properties.view_gate.last_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.first_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 md:mb-0')">
                            <p class="mb-1 text-xs mb-2"><strong>
                                {{ widget.properties.view_gate.last_placeholder_text }}
                            </strong></p>
                          <input name="last_name" ref="last_name" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.last_placeholder_text">
                      </div>
                  </div>
  
                  <div class="mb-2">
                        <p class="mb-1 text-xs mb-2"><strong>
                            {{ widget.properties.view_gate.email_placeholder_text }}
                        </strong></p>
                      <input name="email" ref="email" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.email_placeholder_text">
                  </div>
  
                  <div style="text-align: center;" class="">
                    <div v-if="widget.properties.view_gate.show_spam_disclaimer" class="text-xs text-gray-700 mt-1">
                        <i class="fa fa-lock"></i> &nbsp;<Editable v-model="widget.properties.view_gate.spam_disclaimer_text" />
                    </div>

                    <div class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 mt-3" style="display: inline-block" v-bind:style="{ backgroundColor: widget.properties.view_gate.submit_button_color }"><Editable v-model="widget.properties.view_gate.submit_button_text" /></div>
                  </div>
              </div>
  
              <div style="clear: both;"></div>
  
              <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->
  
          </div>
  
          <div class="bg-gray-100 rounded-b-lg px-6 py-4">
              <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 float-right" @click="showOptinModal = false">
                  CLOSE
              </button>
  
              <div class="clearfix"></div>
          </div>
  
          </div>
      </div>
  
      <v-skeleton-loader v-if="!widgetLoaded && !$route.params.action" type="article, article, article, article, article"></v-skeleton-loader>
  
      <div v-if="me && profile && widgetLoaded" class="bg-white" style="height: 100%;">
          <div class="flex flex-row flex-wrap -mx-3" style="height: 100%;">
  
              <div class="w-full lg:w-1/3 md:w-1/3 sm:w-1/3 pl-12 pt-6 border-t border-gray-100">
                  <h2 class="text-lg font-semibold">Widget Preferences</h2>
  
                  <div class="pr-3">
                      <v-tabs v-if="profile" class="pr-4">
                          <v-tab v-show="profile.settings.role != 'Manager (readonly)'">Layout</v-tab>
                          <v-tab v-if="widget.type != 'seo-rank-tracker' && widget.type != 'reputation-revenue-calculator' && widget.type != 'customer-retention-calculator'  && widget.type != 'star-rating-calculator' " v-show="profile.settings.role != 'Manager (readonly)'">Appearance</v-tab>
                          <v-tab v-show="profile.settings.role != 'Manager (readonly)'">Settings</v-tab>
                          <v-tab>Embed Code</v-tab>
                          
                          <v-tab-item>
                              <v-tabs v-if="profile" small v-model="widget.old_or_new" align-tabs="center" color="purple">
                                <v-tab :value="'Classic'">Classic</v-tab>
                                <v-tab :value="'Modern'">Modern</v-tab>

                                <v-tab-item>

                                  <div class="pt-4 rg-widget-templates1"
                                      style="overflow: auto;"
                                      >
                                      <div v-for="(template, index) in widget_templates" :key="index" class="rg-widget-template"
                                          @click="widget.type = template.type"
                                          :class="((widget.type == template.type) ? 'selected' : '')"
                                      >
                                          <div v-if="widget.type == template.type" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/' + template.type + '.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">{{ template.name }}</div>
                                      </div>
                                  </div>
                                </v-tab-item>

                                <v-tab-item>
                                  <div class="mt-3 pr-6">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Report Type</strong></p>

                                      <v-select
                                          v-model="widget.report_type"
                                          outlined
                                          dense
                                          hide-details
                                          :items="report_type_options"
                                      ></v-select>
                                  </div>

                                  <div v-if="widget.report_type == 'Reputation' || widget.report_type == 'SEO' || widget.report_type == 'Grid Tracker' || widget.report_type == 'GBP Audit' || widget.report_type == 'Review Link Generator' || widget.report_type == 'Citation Audit'" class="pt-4 rg-widget-templates2"
                                      style="overflow: auto;"
                                      >
                                      <div v-for="(template, index) in widget_templates_modern" :key="index" class="rg-widget-template"
                                          @click="widget.type = template.type"
                                          :class="((widget.type == template.type) ? 'selected' : '')"
                                      >
                                          <div v-if="widget.type == template.type" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image2">
                                            <img :src="require('@/assets/images/widget-templates/local-recon/' + template.type + '.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">{{ template.name }}</div>
                                      </div>
                                  </div>

                                  <div
                                      v-if="widget.report_type == 'Local SEO Rank Tracker'"
                                      class="pt-4 rg-widget-templates1"
                                      style="overflow: auto;"
                                      >
                                      <div v-for="(template, index) in widget_templates" :key="index" class="rg-widget-template"
                                          @click="widget.type = template.type"
                                          :class="((widget.type == template.type) ? 'selected' : '')"
                                          v-show="template.name == 'Local SEO Rank Tracker'"
                                      >
                                          <div v-if="widget.type == template.type" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/' + template.type + '.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">{{ template.name }}</div>
                                      </div>
                                  </div>

                                  <div
                                      v-if="widget.report_type == 'Reputation Revenue Calculator' || widget.report_type == 'Customer Retention Calculator' || widget.report_type == 'Star Rating Calculator'"
                                      class="pt-4 rg-widget-templates1"
                                      style="overflow: auto;"
                                      >
                                      
                                      <div class="rg-widget-template"
                                          @click="widget.type = widget.report_type.replace(' ', '-').replace(' ', '-').toLowerCase(); widget.calculator_style = 'Style1'"
                                          :class="((widget.calculator_style == 'Style1') ? 'selected' : '')"
                                      >
                                          <div v-if="widget.calculator_style == 'Style1'" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/calculator-style-1.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">Style 1</div>
                                      </div>

                                      <div class="rg-widget-template"
                                          @click="widget.type = widget.report_type.replace(' ', '-').replace(' ', '-').toLowerCase(); widget.calculator_style = 'Style2'"
                                          :class="((widget.calculator_style == 'Style2') ? 'selected' : '')"
                                      >
                                          <div v-if="widget.calculator_style == 'Style2'" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/calculator-style-2.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">Style 2</div>
                                      </div>

                                      <div class="rg-widget-template"
                                          @click="widget.type = widget.report_type.replace(' ', '-').replace(' ', '-').toLowerCase(); widget.calculator_style = 'Style3'"
                                          :class="((widget.calculator_style == 'Style3') ? 'selected' : '')"
                                      >
                                          <div v-if="widget.calculator_style == 'Style3'" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/calculator-style-3.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">Style 3</div>
                                      </div>

                                      <div class="rg-widget-template"
                                          @click="widget.type = widget.report_type.replace(' ', '-').replace(' ', '-').toLowerCase(); widget.calculator_style = 'Style4'"
                                          :class="((widget.calculator_style == 'Style4') ? 'selected' : '')"
                                      >
                                          <div v-if="widget.calculator_style == 'Style4'" class="rg-widget-template-selected-icon">
                                              <div class="rg-widget-template-selected-icon-inner"></div>
                                          </div>
                                          <div class="rg-widget-template-image">
                                              <img :src="require('@/assets/images/widget-templates/local-recon/calculator-style-4.png')" />
                                          </div>
                                          <div class="rg-widget-template-name">Style 4</div>
                                      </div>
                                  </div>
                                </v-tab-item>
                              </v-tabs>
  
                              <br clear="all" />
                          </v-tab-item>
  
                          <v-tab-item v-if="widget.type != 'seo-rank-tracker' && widget.type != 'reputation-revenue-calculator' && widget.type != 'customer-retention-calculator'  && widget.type != 'star-rating-calculator' ">
                            <div v-show="widget.old_or_new == 1">
                              <div class="flex flex-wrap pt-2">
                                <div :class="((modern_widget_styles.length > 0) ? 'w-full md:w-1/2 pr-2' : 'w-full')">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Color Scheme</strong></p>
  
                                  <v-select
                                      v-model="widget.color_scheme"
                                      outlined
                                      dense
                                      hide-details
                                      :items="color_schemes"
                                  ></v-select>
                                </div>
                                <div v-show="modern_widget_styles.length > 0" class="w-full md:w-1/2 pl-2">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Style</strong></p>
  
                                  <v-select
                                      v-model="widget.widget_style"
                                      outlined
                                      dense
                                      hide-details
                                      :items="modern_widget_styles"
                                  ></v-select>
                                </div>
                              </div>

                              <div class="flex flex-wrap pt-2">
                                <div class="w-full md:w-1/2 pr-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Background</strong></p>
  
                                  <color-picker :key="colorPickerKeys" v-model="widget.background"></color-picker>
                                </div>
                                <div class="w-full md:w-1/2 pl-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Text Color</strong></p>

                                  <color-picker :key="colorPickerKeys" v-model="widget.text_color"></color-picker>
                                </div>
                              </div>

                              <div class="flex flex-wrap pt-2">
                                <div class="w-full md:w-1/2 pr-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Field Color</strong></p>
  
                                  <color-picker :key="colorPickerKeys" v-model="widget.field_color"></color-picker>
                                </div>
                                <div class="w-full md:w-1/2 pl-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Field Text Color</strong></p>
  
                                  <color-picker :key="colorPickerKeys" v-model="widget.field_text_color"></color-picker>
                                </div>
                              </div>

                              <div class="flex flex-wrap pt-2">
                                <div class="w-full md:w-1/2 pr-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Button Color</strong></p>
  
                                  <color-picker :key="colorPickerKeys" v-model="widget.button_color"></color-picker>
                                </div>
                                <div class="w-full md:w-1/2 pl-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Button Text Color</strong></p>
  
                                  <color-picker :key="colorPickerKeys" v-model="widget.button_text_color"></color-picker>
                                </div>
                              </div>

                              <div v-show="widget.type == 'FloatingHeader' || widget.type == 'FloatingFooter' || widget.type == 'HelloBar' || widget.type == 'HeaderBaner' || widget.type == 'InLine'" class="flex flex-wrap pt-2">
                                <div class="w-full md:w-1/2 pr-2 has-color-picker">
                                  <p class="mb-1 text-xs mb-2 mt-2"><strong>Container Width (px)</strong></p>
  
                                  <v-text-field
                                      v-model="widget.container_width"
                                      placeholder="1000"
                                      label=""
                                      outlined
                                      dense
                                      hide-details
                                      type="number"
                                  ></v-text-field>
                                </div>
                              </div>

                              <div v-if="widget.type == 'LightboxPopUp'">
                                      <div class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Popup Trigger</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_trigger"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_trigger_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger == 'Delay'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Delay</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_delay_seconds"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_delay_seconds_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger != 'Never'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Popup Frequency</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_frequency"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_frequency_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger != 'Never'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Pages</strong></p>
  
                                          <p class="text-xs text-gray-600">
                                              Leave empty to enable to enable all pages.
                                          </p>
  
                                          <a href="javascript: void(0);" @click="addPopupPage();" class="text-xs">+ Add Page</a>
  
                                          <div class="mt-2" v-for="(page, index) in widget.properties.popup_pages" :key="index">
                                              <v-text-field
                                                  v-model="widget.properties.popup_pages[index]"
                                                  placeholder="https://www.example.com/path/to/url"
                                                  label=""
                                                  outlined
                                                  dense
                                                  hide-details
                                                  :append-outer-icon="'mdi-trash-can-outline'"
                                                  @click:append-outer="removePopupPage(index)"
                                              ></v-text-field>
                                          </div>
                                      </div>
                                  </div>
                            </div>


                            <div v-show="widget.old_or_new == 0">
                              <div v-show="widget.type == 'default' || widget.type == 'seo-audit' || widget.type == 'grid-tracker' || widget.type == 'review-response-generator' || widget.type == 'gmb-audit' || widget.type == 'review-link-generator' || widget.type == 'seo-rank-tracker' || widget.type == 'citation-audit'">
                                  <div class="float-left has-color-picker pr-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Title Color</strong></p>
  
                                      <color-picker v-model="widget.properties.main.title_color"></color-picker>
                                  </div>
  
  
                                  <div class="float-left has-color-picker pl-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Box Border Color</strong></p>
  
                                      <color-picker v-model="widget.properties.main.border_color"></color-picker>
                                  </div>
  
  
                                  <div class="float-left has-color-picker pr-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Button Color</strong></p>
  
                                      <color-picker v-model="widget.properties.main.button_color"></color-picker>
                                  </div>
  
  
                                  <div class="float-left has-color-picker pl-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Button Text Color</strong></p>
  
                                      <color-picker v-model="widget.properties.main.button_text_color"></color-picker>
                                  </div>
  
                                  <div class="clearfix"></div>
  
                                  <div class="mt-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Display</strong></p>
  
                                      <v-select
                                          v-model="widget.properties.display_type"
                                          outlined
                                          dense
                                          hide-details
                                          :items="display_types"
                                      ></v-select>
                                  </div>
  
                                  <div v-show="widget.properties.display_type == 'Popup'">
                                      <div class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Popup Trigger</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_trigger"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_trigger_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger == 'Delay'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Delay</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_delay_seconds"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_delay_seconds_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger != 'Never'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Popup Frequency</strong></p>
  
                                          <v-select
                                              v-model="widget.properties.popup_frequency"
                                              outlined
                                              dense
                                              hide-details
                                              :items="popup_frequency_options"
                                          ></v-select>
                                      </div>
  
                                      <div v-show="widget.properties.popup_trigger != 'Never'" class="mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-2"><strong>Pages</strong></p>
  
                                          <p class="text-xs text-gray-600">
                                              Leave empty to enable to enable all pages.
                                          </p>
  
                                          <a href="javascript: void(0);" @click="addPopupPage();" class="text-xs">+ Add Page</a>
  
                                          <div class="mt-2" v-for="(page, index) in widget.properties.popup_pages" :key="index">
                                              <v-text-field
                                                  v-model="widget.properties.popup_pages[index]"
                                                  placeholder="https://www.example.com/path/to/url"
                                                  label=""
                                                  outlined
                                                  dense
                                                  hide-details
                                                  :append-outer-icon="'mdi-trash-can-outline'"
                                                  @click:append-outer="removePopupPage(index)"
                                              ></v-text-field>
                                          </div>
                                      </div>
                                  </div>
  
                                  <div v-show="widget.properties.display_type == 'Headerbar + Popup'">
  
  
                                      <v-switch
                                          class="mt-4 ml-1"
                                          color="#48bb78" inset dense hide-details
                                          v-model="widget.properties.headerbar_shadow"
                                          label="Shadow"
                                          :ripple="false"
                                      ></v-switch>
  
                                      <br clear="all" />
  
                                      <div class="float-left has-color-picker pr-4 mb-3 -mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Background Color</strong></p>
  
                                          <color-picker v-model="widget.properties.headerbar_background"></color-picker>
                                      </div>
  
                                      <div class="float-left has-color-picker mb-3 -mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Text Color</strong></p>
  
                                          <color-picker v-model="widget.properties.headerbar_text_color"></color-picker>
                                      </div>
  
                                      <br clear="all" />
  
                                      <p class="mb-1 text-xs mb-2 mt-4"><strong>Text </strong></p>
  
                                      <v-text-field
                                          v-model="widget.properties.headerbar_text"
                                          label=""
                                          outlined
                                          dense
                                          hide-details
                                      ></v-text-field>
  
                                      <br clear="all" />
  
                                      <div class="float-left has-color-picker pr-4 mb-3 -mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Button Background</strong></p>
  
                                          <color-picker v-model="widget.properties.headerbar_button_background"></color-picker>
                                      </div>
  
                                      <div class="float-left has-color-picker mb-3 -mt-3">
                                          <p class="mb-1 text-xs mb-2 mt-4"><strong>Text Color</strong></p>
  
                                          <color-picker v-model="widget.properties.headerbar_button_text_color"></color-picker>
                                      </div>
  
                                      <br clear="all" />
  
                                      <p class="mb-1 text-xs mb-2 mt-4"><strong>Button Text </strong></p>
  
                                      <v-text-field
                                          v-model="widget.properties.headerbar_button_text"
                                          label=""
                                          outlined
                                          dense
                                          hide-details
                                      ></v-text-field>
                                  </div>
                              </div>
  
                              <div v-show="widget.type != 'default' && widget.type != 'seo-audit' && widget.type != 'grid-tracker' && widget.type != 'review-response-generator' && widget.type != 'gmb-audit' && widget.type != 'review-link-generator' && widget.type != 'seo-rank-tracker' && widget.type != 'citation-audit'">
                                  <div class="float-left has-color-picker pr-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Titles Color</strong></p>
  
                                      <color-picker v-model="widget.properties.titles_color"></color-picker>
                                  </div>
  
  
                                  <div class="float-left has-color-picker pl-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Sliders Color</strong></p>
  
                                      <color-picker v-model="widget.properties.sliders_color"></color-picker>
                                  </div>

                                  <div class="float-left has-color-picker pr-4">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Calculator Style</strong></p>
  
                                      <v-select
                                          :items="calculator_styles"
                                          label=""
                                          v-model="widget.calculator_style"
                                          outlined
                                          dense
                                          @change="widgetKey++"
                                      ></v-select>
                                  </div>
  
                                  <br clear="all" />
  
                                  <div v-show="widget.calculator_style == 'Style1'" class="float-left has-color-picker pr-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Result Background Color</strong></p>
  
                                      <color-picker v-model="widget.properties.result_background_color"></color-picker>
                                  </div>
  
  
                                  <div v-show="widget.calculator_style == 'Style1'" class="float-left has-color-picker pl-4 mb-3">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Result Text Color</strong></p>
  
                                      <color-picker v-model="widget.properties.result_text_color"></color-picker>
                                  </div>
  
                                  <br clear="all" />
                              </div>
                            </div>
                          </v-tab-item>
  
                          <v-tab-item>
                               <div v-show="widget.type == 'default' || widget.type == 'seo-audit' || widget.type == 'review-response-generator' || widget.type == 'gmb-audit' || widget.type == 'review-link-generator' || widget.type == 'seo-rank-tracker' || widget.type == 'citation-audit' || widget.report_type == 'Reputation' || widget.report_type == 'SEO' || widget.report_type == 'GBP Audit' || widget.report_type == 'Review Link Generator' || widget.report_type == 'Citation Audit'" class="mt-2">
                                  <div class="float-right">
                                      <p class="mb-1 text-xs mb-2"><strong>Optin</strong></p>
                                      <v-switch color="#48bb78" inset dense hide-details :ripple="false" class="pt-1 mb-2"
                                          v-model="widget.properties.view_gate.visible"
                                          @click="showOptinModal = widget.properties.view_gate.visible"
                                      ></v-switch>
                                  </div>
                                  
                                  <p class="mb-1 text-xs mb-2"><strong>Action</strong></p>
  
                                  <div class="mt-2 p-2">
                                        <v-switch
                                            v-model="isHelpRequestEnabled"
                                            label="Help Request"
                                            @change="updateLandingPageAction"
                                            @click="handleHelpRequestClick"
                                            on-icon="mdi-circle"
                                            off-icon="mdi-circle-outline"
                                            :ripple="false"
                                        ></v-switch>
                                        <v-switch
                                            v-model="isRedirectEnabled"
                                            label="Redirect"
                                            @change="updateLandingPageAction"
                                            @click="handleRedirectClick"
                                            on-icon="mdi-circle"
                                            off-icon="mdi-circle-outline"
                                            :ripple="false"
                                        ></v-switch>
                                    </div>
                              </div>
  
                              <div v-show="widget.type != 'default' && widget.type != 'seo-audit' && widget.type != 'grid-tracker' && widget.type != 'review-response-generator' && widget.type != 'gmb-audit' && widget.type != 'review-link-generator' && widget.type != 'seo-rank-tracker' && widget.type != 'citation-audit'">
                                  <div v-if="widget.type == 'reputation-revenue-calculator' || widget.type == 'customer-retention-calculator'">
                                      <p class="mb-1 text-xs mb-2 mt-2"><strong>Currency</strong></p>
  
                                      <v-select
                                          :items="currency_options"
                                          label=""
                                          v-model="widget.properties.currency"
                                          outlined
                                          dense
                                          @change="calculateDdrMrrArr_delayed(); calculatedRevenue_delayed();"
                                      ></v-select>
                                  </div>
  
                                  <div v-if="widget.type == 'reputation-revenue-calculator' || widget.type == 'customer-retention-calculator'">
                                      <p class="mb-1 text-xs mb-2"><strong>Currency Position</strong></p>
  
                                      <v-select
                                          :items="currency_display_options"
                                          label=""
                                          v-model="widget.properties.currency_display_position"
                                          outlined
                                          dense
                                          @change="calculateDdrMrrArr_delayed(); calculatedRevenue_delayed();"
                                      ></v-select>
                                  </div>
                              </div>

                              <p class="mb-1 text-xs mb-2"><strong>Custom CSS</strong></p>
                    
                                <textarea name="" id="" rows="14" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-gray-100 hover:border-grey px-4 py-4 rounded" maxlength="1000" v-model="widget.properties.custom_css" placeholder="/* Example */
.lr-title {
    color: purple !important;
}

.lr-button button {
    background-color: purple !important;
}

.lr-report-header {
    background-color: purple !important;
}" ></textarea>

                             <p class="text-xs text-gray-500 mt-2">Enter custom CSS to change the UI of the widget and reports.</p>
                          </v-tab-item>
                          
                          <v-tab-item>
                              <br />
                              <p class="text-xs text-gray-600">Copy and paste the following code snippet into your website, before the end of the &lt;body&gt; tag.</p>
  
                              <div class="bg-gray-100 rounded p-1">
                                  <div class="tab-pane-content p-2">
                                      <div class="card card-code bg-gray-100 border-0 text-gray-700" style="word-break: break-all; padding: 10px; font-size: 12px; min-height: 100px;">
                                          &lt;script src="{{ getEmbedCode() }}" type="text/javascript"&gt;&lt;/script&gt;
  
                                          <a
                                              href="javascript: void(0);"
                                              v-clipboard:copy="message"
                                              v-clipboard:success="onCopy"
                                              v-clipboard:error="onError"
                                              class="text-xs float-right"
                                              style="position: absolute; bottom: 0px; right: 10px;"
                                          >
                                              <i class="mdi mdi-content-copy"></i>
                                              Copy
                                          </a>
                                      </div>
                                  </div>
                              </div>
  
                          </v-tab-item>
  
                      </v-tabs>
                  </div>
              </div>
  
              <div class="w-full sm:w-2/3 px-3 bg-gray-100 p-3 -mt-7" >
                  <div class="w-full" style="height: 100%;">
                      <div class="p-4 bg-white" style="height: 100%;">
                          <div class="mb-4">
                              <h2 class="font-bold text-gray-800">Preview </h2>
                          </div>

                          <div v-if="widget.old_or_new == 1 && widget.type != 'seo-rank-tracker' && widget.type != 'reputation-revenue-calculator' && widget.type != 'customer-retention-calculator' && widget.type != 'star-rating-calculator'" style="height: 100%;">
                            <PreviewModernWidget :widget="widget" />
                          </div>
                          
                          <div v-if="widget.old_or_new == 0 || (widget.old_or_new == 1 && (widget.type == 'seo-rank-tracker' || widget.type == 'reputation-revenue-calculator' || widget.type == 'customer-retention-calculator' || widget.type == 'star-rating-calculator'))">
                            <div
                                v-if="widget.type == 'default' || widget.type == 'seo-audit' || widget.type == 'grid-tracker' || widget.type == 'review-response-generator' || widget.type == 'gmb-audit' || widget.type == 'review-link-generator' || widget.type == 'seo-rank-tracker' || widget.type == 'citation-audit'"
                                :class="'lr-widget-wrapper ' + ((widget.properties.display_type))"
                            >
                                <div v-if="widget.properties.display_type == 'Popup' || widget.properties.display_type == 'Headerbar + Popup'" class="lr-widget-back-shadow"
                                    :style="((widget.properties.display_type == 'Headerbar + Popup') ? 'top: 70px; height: calc(100% - 90px);' : '')"
                                >
                                
                                </div>
    
                                <div v-show="widget.properties.display_type == 'Headerbar + Popup'" id="rg-hellobar-bar" 
                                
                                    :style="'background-color: ' + widget.properties.headerbar_background + '; border-color: rgb(255, 255, 255); margin: 0 0; font-size: 17px; font-weight: 400;\
                                        width: 100%;\
                                        height: auto;\
                                        min-height: 50px;' +
                                        ((widget.properties.headerbar_shadow) ? 'box-shadow: 0 1px 3px 0px rgb(0 0 0 / 15%);' : '') + 
                                        'text-align: center;\
                                        line-height: 50px;'
    
                                    ">
                                    <p class="notedited">
                                        <span :style="'color: ' + widget.properties.headerbar_text_color + ' !important;'">{{ widget.properties.headerbar_text }} </span>
    
                                        <button 
                                            :style="'padding-left: 20px; padding-right: 20px; height: 30px; background: ' + widget.properties.headerbar_button_background + '; border-radius: 5px; color: ' + widget.properties.headerbar_button_text_color+ ' !important;\
                                                line-height: 30px;\
                                                font-size: 14px;\
                                                margin-left: 20px;\
                                                display: inline-block;'"
                                        >{{ widget.properties.headerbar_button_text }}</button>
                                    </p>
                                </div>
    
                                <div class="lr-widget-content"
                                    :style="'border: solid 1px ' + widget.properties.main.border_color + '; border-radius: 5px; padding-bottom: 20px; padding-top: 20px;'"
                                >
                                    <div v-if="widget.type == 'default'">
                                        <div id="lr-widget-html" v-html="widget.properties.html"></div>
                                    </div>
    
                                    <div v-if="widget.type == 'seo-audit'">
                                        <div id="lr-widget-seo-html" v-html="widget.properties.seo_audit_html"></div>
                                    </div>
    
                                    <div v-if="widget.type == 'grid-tracker'">
                                        <div id="lr-widget-grid-html" style="padding-left: 20px; padding-right: 20px;">
                                            <div style="text-align: center; font-size: 40px; font-weight: bold; color: #090C32;"
                                                :style="'color: ' + widget.properties.main.title_color"
                                            >
                                                The Quickest Way To Discover 
                                                <br />
                                                Your Local Visibility
                                            </div>
    
                                            <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                                                Track your local SEO practice accurately and beat your competitors down the local search ranking.
                                            </div>
    
                                            <div style="clear: both; padding-top: 30px;">
                                                <div style="float: left; width: calc(100% - 150px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;">
                                                    <div style="float: left; padding-left: 12px; padding-top: 5px;">
                                                        <i class="mdi mdi-map-marker-outline" style="font-size: 24px; color: #090C32;"></i>
                                                    </div>
                                                    <div style="float: left; width: 44%;">
                                                        <input type="text" placeholder="Your Location (e.g. :Pizza Hut)" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                    </div>
    
                                                    <div style="float: left; padding-left: 22px; padding-top: 5px; font-size: 20px; color: ##817F7F; opacity: 0.6;">
                                                        |
                                                    </div>
    
                                                    <div style="float: left; width: calc(50% - 40px); padding-left: 12px;">
                                                        <input type="text" placeholder="Search Query (e.g. Pizza)" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                    </div>
                                                </div>
                                                <div style="float: right; width: 121px;">
                                                    <button style="width: 121px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                                        :style="'background: ' + widget.properties.main.button_color + '; color: ' + widget.properties.main.button_text_color"
                                                    >Run Scan</button>
                                                </div>
    
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div v-if="widget.type == 'review-response-generator'">
                                        <div id="lr-widget-grid-html" style="padding-left: 20px; padding-right: 20px;">
                                            <div style="text-align: center; font-size: 40px; font-weight: bold; color: #090C32;"
                                                :style="'color: ' + widget.properties.main.title_color"
                                            >
                                                The Quickest Way To Generate
                                                <br />
                                                Review Responses
                                            </div>
    
                                            <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                                                We help automate generation of review responses. Use our tool to generate responses for all your customers.
                                            </div>
    
                                            <div style="clear: both; padding-top: 30px;">
                                                <div style="float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;">
                                                    <div style="float: left; padding-left: 12px; padding-top: 5px;">
                                                        <i class="mdi mdi-star-outline" style="font-size: 24px; color: #090C32;"></i>
                                                    </div>
    
                                                    <div style="float: left; width: calc(100% - 50px); padding-left: 12px;">
                                                        <input type="text" placeholder="Write review..." style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                    </div>
                                                </div>
                                                <div style="float: right; width: 200px;">
                                                    <button style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                                        :style="'background: ' + widget.properties.main.button_color + '; color: ' + widget.properties.main.button_text_color"
                                                    >Generate Responses</button>
                                                </div>
    
                                                <div style="clear: both;"></div>
                                            </div>
                                        </div>
                                    </div>
    
                                      <div v-if="widget.type == 'gmb-audit'">
                                          <div id="lr-widget-grid-html" style="padding-left: 20px; padding-right: 20px;">
                                              <div style="text-align: center; font-size: 40px; font-weight: bold; color: #090C32;"
                                                  :style="'color: ' + widget.properties.main.title_color"
                                              >
                                                  Insights To Improve
                                                  <br />
                                                  Your Google Business Profile
                                              </div>

                                              <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                                                  Take control of your GMB profile, see why your competitors rank better and improve your Google Business Profile.
                                              </div>

                                              <div style="clear: both; padding-top: 30px;">
                                                  <div style="float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;">
                                                      <div style="float: left; width: calc(100% - 50px); padding-left: 12px;">
                                                          <input type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                      </div>
                                                  </div>
                                                  <div style="float: right; width: 200px;">
                                                      <button style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                                          :style="'background: ' + widget.properties.main.button_color + '; color: ' + widget.properties.main.button_text_color"
                                                      >Get Started</button>
                                                  </div>

                                                  <div style="clear: both;"></div>
                                              </div>
                                          </div>
                                      </div>

                                      <div v-if="widget.type == 'review-link-generator'">
                                          <div id="lr-widget-grid-html" style="padding-left: 20px; padding-right: 20px;">
                                              <div style="text-align: center; font-size: 40px; font-weight: bold; color: #090C32;"
                                                  :style="'color: ' + widget.properties.main.title_color"
                                              >
                                                  Google Review Link &
                                                  <br />
                                                  Place ID Generator
                                              </div>

                                              <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                                                  With our free tool, you can generate a Google review link for customers, also find the Place ID, Ludocid, and FID codes.
                                              </div>

                                              <div style="clear: both; padding-top: 30px;">
                                                  <div style="float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;">
                                                      <div style="float: left; width: calc(100% - 50px); padding-left: 12px;">
                                                          <input type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                      </div>
                                                  </div>
                                                  <div style="float: right; width: 200px;">
                                                      <button style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                                          :style="'background: ' + widget.properties.main.button_color + '; color: ' + widget.properties.main.button_text_color"
                                                      >Fetch Links and Ids</button>
                                                  </div>

                                                  <div style="clear: both;"></div>
                                              </div>
                                          </div>
                                      </div>


    
                                    <div v-if="widget.type == 'seo-rank-tracker'">
                                          <SeoRankTracker :widget="widget" />
                                    </div>

                                      <div v-if="widget.type == 'citation-audit'">
                                          <div id="lr-widget-grid-html" style="padding-left: 20px; padding-right: 20px;">
                                              <div style="text-align: center; font-size: 40px; font-weight: bold; color: #090C32;"
                                                  :style="'color: ' + widget.properties.main.title_color"
                                              >
                                                  Scan Your Business
                                              </div>

                                              <div style="text-align: center; font-size: 16px; color: #090C32; padding-top: 15px;">
                                                  Citation Tracker looks for your business information on the most important citation sites, listing your details and highlighting inaccuracies.
                                              </div>

                                              <div style="clear: both; padding-top: 30px;">
                                                  <div style="float: left; width: calc(100% - 220px); height: 43px; background: #FFFFFF; box-shadow: 1px 5px 19px rgba(6, 26, 56, 0.06); border-radius: 5px;">
                                                      <div style="float: left; width: calc(100% - 50px); padding-left: 12px;">
                                                          <input type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none;" />
                                                      </div>
                                                  </div>
                                                  <div style="float: right; width: 200px;">
                                                      <button style="width: 200px; height: 43px; background: #2972FF; border-radius: 5px; color: #FFFFFF;"
                                                          :style="'background: ' + widget.properties.main.button_color + '; color: ' + widget.properties.main.button_text_color"
                                                      >Find Citations</button>
                                                  </div>

                                                  <div style="clear: both;"></div>
                                              </div>
                                          </div>
                                      </div>
                                </div>
                            </div>
    
                            <div v-if="widget.type == 'star-rating-calculator'">
                              <StarRating :widget="widget" :CalculatorStyle="widget.calculator_style" :key="widgetKey" />
                            </div>
    
                            <div v-if="widget.type == 'customer-retention-calculator'">
                              <CustomerRetention :widget="widget" :CalculatorStyle="widget.calculator_style" :key="widgetKey" />
                            </div>
    
                            <div v-if="widget.type == 'reputation-revenue-calculator'">
                              <ReputationRevenue :widget="widget" :CalculatorStyle="widget.calculator_style" :key="widgetKey" />
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
      <!--<div>
        <button class="bg-gray-200 py-2 px-3 text-gray-600 hover:bg-gray-300 rounded" @click="$refs.dialogPlatform.show()"><font-awesome-icon icon="plus-circle" class="mr-1"></font-awesome-icon> Add platform</button>
      </div>-->
    </panel-navigation>
  
  </template>
  
  <script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import urlParser from 'url-parse'
  import PanelNavigation from '@/components/PanelNavigation.vue'
  import Editable from '@/components/common/Editable';
  import ColorPicker from '@/components/common/ColorPicker.vue'
  import SeoRankTracker from '@/views/local-recon/WidgetTemplates/SeoRankTracker.vue'
  
  import StarRating from '@/views/local-recon/WidgetTemplates/Calculators/StarRating.vue'
  import CustomerRetention from '@/views/local-recon/WidgetTemplates/Calculators/CustomerRetention.vue'
  import ReputationRevenue from '@/views/local-recon/WidgetTemplates/Calculators/ReputationRevenue.vue'

  import PreviewModernWidget from '@/views/local-recon/Modern/Preview.vue'

  export default {
    metaInfo () {
      return {
        title: "Widgets Edit | " + this.$appName
      }
    },
    components: {
      PanelNavigation,
      Editable,
      ColorPicker,
      SeoRankTracker,
      StarRating,
      CustomerRetention,
      ReputationRevenue,
      PreviewModernWidget
    },
    data () {
      return {
          widgetKey: 0,
          edit_name: false,
          widget_templates: [
              {
                  type: "default",
                  name: "Reputation Report"
              },
              {
                  type: "seo-audit",
                  name: "SEO Audit"
              },
              {
                  type: "grid-tracker",
                  name: "Grid Tracker"
              },
              {
                  type: "review-response-generator",
                  name: "Review Responses"
              },
                {
                    type: "gmb-audit",
                    name: "GBP Audit"
                },
                {
                    type: "review-link-generator",
                    name: "Review Link Generator"
                },
                {
                    type: "citation-audit",
                    name: "Citation Audit"
                },
                {
                    type: "seo-rank-tracker",
                    name: "Local SEO Rank Tracker"
                },
              {
                  type: "reputation-revenue-calculator",
                  name: "Reputation Revenue Calculator"
              },
              {
                  type: "customer-retention-calculator",
                  name: "Customer Retention Calculator"
              },
              {
                  type: "star-rating-calculator",
                  name: "Star Rating Calculator"
              }
          ],

          widget_templates_modern: [
              {
                  type: "LightboxPopUp",
                  name: "Lightbox PopUp"
              },
              {
                  type: "HeaderBaner",
                  name: "Header / Banner"
              },
              {
                  type: "FloatingHeader",
                  name: "Floating Header"
              },
              {
                  type: "FloatingFooter",
                  name: "Floating Footer"
              },
              {
                  type: "InLine",
                  name: "In Line"
              },
              {
                  type: "Embed",
                  name: "Embed"
              },
              {
                  type: "HelloBar",
                  name: "Hello Bar / Sticky Bar"
              },
              {
                  type: "FullPage",
                  name: "Full Page"
              }
          ],

          // , 'Review Responses'

          report_type_options: ['Reputation', 'SEO', 'Grid Tracker', 'GBP Audit', 'Review Link Generator', 'Citation Audit', 'Local SEO Rank Tracker', 'Reputation Revenue Calculator', 'Customer Retention Calculator', 'Star Rating Calculator'],

          color_schemes: ['Dark', 'Light'],

          modern_widget_styles: ['Centered', 'Left Aligned'],

          colorPickerKeys: 0,

        help_request_email_visible: true,
        help_request_email_required: true,
        widgetLoaded: false,
        showHelpRequestModal: false,
        showRedirectUrlModal: false,
        showOptinModal: false,
        message: '<script src="' + this.getEmbedCode() + '" type="text/javascript"><\/script>',
        preview_url: "",
        widget: {
          name: "",
            properties: {
            }
        },
        widget: {
            properties: {
            action_options: {
                landing_page_action_type_id: 1, // Default value
            },
            },
        },
        errorMessage: '',
        isHelpRequestEnabled: false,

        isRedirectEnabled: false,

        display_types: ['Embed', 'Popup', 'Headerbar + Popup'],
  
        popup_trigger_options: ['Never', 'On Load', 'Delay', 'On Exit'],
  
        popup_delay_seconds_options: ['1s', '2s', '3s', '4s', '5s', '10s', '20s', '30s', '60s'],
  
        popup_frequency_options: ['Every Page Load', '1 Time Per Visitor', '1 Time Per 24 Hours'],
  
        currency_options: [
            'USD',
            'AED',
            'AUD',
            'BGN',
            'BRL',
            'CAD',
            'CHF',
            'CZK',
            'DKK',
            'EUR',
            'GBP',
            'HKD',
            'HRK',
            'HUF',
            'INR',
            'JPY',
            'MXN',
            'MYR',
            'NOK',
            'NZD',
            'PLN',
            'RON',
            'SEK',
            'SGD'
          ],
  
        currency_display_options: [
          'Before Amount',
          'After Amount'
        ],
  
        savingWidget: false,

        calculator_styles: ['Style1', 'Style2', 'Style3', 'Style4']
      }
    },
    computed: {
      ...mapState({
        me: state => state.me.me,
        profile: state => state.me.profile
      })
    },
    mounted() {
        this.initializeSwitchStates();
    },
    methods: {
        updateLandingPageAction() {
            if(this.isHelpRequestEnabled && this.isRedirectEnabled){
                this.widget.properties.action_options.landing_page_action_type_id = 4;
            }
            else if (this.isHelpRequestEnabled) {
                this.widget.properties.action_options.landing_page_action_type_id = 3;
            } else if (this.isRedirectEnabled) {
                this.widget.properties.action_options.landing_page_action_type_id = 2;
            } else {
                this.widget.properties.action_options.landing_page_action_type_id = 0;
            }
        },
        handleHelpRequestClick() {
        if (this.isHelpRequestEnabled) {
            this.showHelpRequestModal = true;
        }
        },
        handleRedirectClick() {
        if (this.isRedirectEnabled) {
            this.showRedirectUrlModal = true;
        }
        }, 
        initializeSwitchStates() {
            const typeId = this.widget.properties.action_options.landing_page_action_type_id;
            console.log(typeId);
            this.isHelpRequestEnabled = typeId === 3 || typeId === 4 || typeId === 1;
            this.isRedirectEnabled = typeId === 2 || typeId === 4;
        },
        redirectValidation(){
            if(this.widget.properties.action_options.redirect_link_url){
                const url = this.widget.properties.action_options.redirect_link_url;
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

                if (!urlPattern.test(url)) {
                    this.showRedirectUrlModal = true;
                    this.errorMessage = 'Invalid URL format.';
                } else {
                    this.showRedirectUrlModal = false;
                    this.errorMessage = '';
                }
            }else{
                this.isRedirectEnabled = false;
                this.showRedirectUrlModal = false;
            }
                 
        },
      onCopy: function (e) {
          this.$swal({
              title: "Copied",
              text: "Embed code copied successfully!",
              showCancelButton: false,
              });
      },
      onError: function (e) {
          alert('Failed to copy the text to the clipboard')
          console.log(e);
      },
      getHostname(url) {
        return urlParser(url).hostname.replace("www.", "")
      },
      getPathname(url) {
        return urlParser(url).pathname
      },
      getIconUrl(url) {
  
        return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");
  
      },
      getWidget: async function() {
          try {
              let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/get-widget/' + this.$route.params.token, {
  
              } , {
              headers: {
                  'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              },
              })
              
              this.widget = response.data.widget
  
              if (!this.widget.properties.current_google_rating)
                  this.widget.properties.current_google_rating = 1;
  
              if (!this.widget.properties.current_number_of_google_reviews)
                  this.widget.properties.current_number_of_google_reviews = 15;
  
              if (!this.widget.properties.desired_google_rating)
                  this.widget.properties.desired_google_rating = 1;
  
              if (!this.widget.properties.negative_reviews_per_year)
                  this.widget.properties.negative_reviews_per_year = 10;
  
              if (!this.widget.properties.percentage_of_complaints)
                  this.widget.properties.percentage_of_complaints = 5;
  
              if (!this.widget.properties.customer_lifetime_value)
                  this.widget.properties.customer_lifetime_value = 10000;
  
              if (!this.widget.properties.number_of_local_business_clients)
                  this.widget.properties.number_of_local_business_clients = 30;
  
              if (!this.widget.properties.average_monthly_fee)
                  this.widget.properties.average_monthly_fee = 250;
  
              if (!this.widget.properties.percentage_of_clients_upsell)
                  this.widget.properties.percentage_of_clients_upsell = 35;
  
              if (!this.widget.properties.upsell_monthly_revenue)
                  this.widget.properties.upsell_monthly_revenue = 350;
  
              if (!this.widget.properties.titles_color)
                  this.widget.properties.titles_color = "#7F7F7F";
              
              if (!this.widget.properties.sliders_color)
                  this.widget.properties.sliders_color = "#EC407A";
              
              if (!this.widget.properties.result_background_color)
                  this.widget.properties.result_background_color = "#2A73FF";
              
              if (!this.widget.properties.result_text_color)
                  this.widget.properties.result_text_color = "#FFFFFF";
              
              if (!this.widget.properties.currency)
                  this.widget.properties.currency = "USD";
              
              if (!this.widget.properties.currency_display_position)
                  this.widget.properties.currency_display_position = "Before Amount";
              
              this.widget.properties.you_need_reviews = this.youNeedReviews();
  
              this.widget.properties.calculated_revenue = this.calculatedRevenue();
  
              this.calculateDdrMrrArr();

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
  
              // alert(this.widget.properties.calculated_revenue);
  
              this.widgetLoaded = true
              console.log(this.widget)
          }catch(e){
              console.log(e)
          }
      },
      youNeedReviews_delayed() {
          let self = this;
          setTimeout(function() {
              self.youNeedReviews();
          }, 30);
      },
      youNeedReviews() {
          console.log('run2')
          // Initial input, grab these from the user entered data
          let current_google_rating=parseFloat(this.widget.properties.current_google_rating);
          let current_number_of_google_reviews=parseFloat(this.widget.properties.current_number_of_google_reviews);
          let desired_google_rating=parseFloat(this.widget.properties.desired_google_rating);
  
          console.log(desired_google_rating)
  
          // Initialize new variables to be used for calculations
          let number_of_new_ratings = 0;
          let total_number_of_reviews = current_number_of_google_reviews;
          let this_rating = current_google_rating
  
          // keep increasing the rating until we get to the designer rating
          while (desired_google_rating > this_rating && number_of_new_ratings < 1001) {
              number_of_new_ratings++;
              total_number_of_reviews++;
  
              this_rating = ((current_number_of_google_reviews * current_google_rating) + (number_of_new_ratings * 5)) / total_number_of_reviews
          }
  
          console.log('number_of_new_ratings ===> ', number_of_new_ratings)
  
          // output the number of new ratings
          // console.log('You need ' + number_of_new_ratings + ' more reviews');
  
          try {
              if (number_of_new_ratings > 1000)
                  document.querySelector("#lr_you_need_reviews").innerHTML = "1000+";
              else
                  document.querySelector("#lr_you_need_reviews").innerHTML = number_of_new_ratings;
          }
          catch (e) {}
  
          return number_of_new_ratings;
      },
      calculatedRevenue_delayed() {
          let self = this;
          setTimeout(function() {
              self.calculatedRevenue();
          }, 30);
      },
      calculatedRevenue() {
          let self = this
          let revenue = (this.widget.properties.negative_reviews_per_year * this.widget.properties.percentage_of_complaints) * (this.widget.properties.customer_lifetime_value/100);
          revenue = Math.ceil(revenue);
  
          console.log('revenue', revenue)
  
          // revenue = this.widget.properties.currency + ' ' + revenue;
  
          revenue = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + revenue + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
          
          try {
              document.querySelector("#lr_calculated_revenue").innerHTML = this.numberWithCommas(revenue);
          }
          catch (e) {}
  
          return revenue;
      },
      calculateDdrMrrArr_delayed() {
          let self = this;
          setTimeout(function() {
              self.calculateDdrMrrArr();
          }, 30);
      },
      calculateDdrMrrArr() {
          let self = this;
  
          let ddr = 0;
          let mrr = 0;
          let arr = 0;
  
          let upsell_clients_nr = (this.widget.properties.percentage_of_clients_upsell/100) * this.widget.properties.number_of_local_business_clients;
  
          mrr = (this.widget.properties.number_of_local_business_clients * this.widget.properties.average_monthly_fee) +
              (upsell_clients_nr * this.widget.properties.upsell_monthly_revenue);
  
          mrr = Math.ceil(mrr);
          ddr = Math.ceil((mrr * 12)/366);
          arr = Math.ceil(mrr * 12);
  
          try {
              setTimeout(function() {
                  document.querySelector("#lr_calculated_ddr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(ddr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
                  document.querySelector("#lr_calculated_mrr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(mrr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
                  document.querySelector("#lr_calculated_arr").innerHTML = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + self.numberWithCommas(arr) + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
              }, 1);
          }
          catch (e) {}
      },
      numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      getEmbedCode: function() {
          let self = this
  
          let url = ((process.env.NODE_ENV == 'development') ? "http://localhost:8002" : "https://" + window.location.host) + "/js/v1/embed.js?token=" + self.$route.params.token;
  
          // Dev
          if (process.env.NODE_ENV == 'development') {
              url = url + "&env=dev";
          }
  
          return url;
      },
      saveWidget: async function() {
          this.savingWidget = true
          let self = this
          this.updateLandingPageAction();
          try {
              document.querySelector("#business_name").setAttribute("value", document.querySelector("#business_name").value);
              self.widget.properties.html = document.querySelector("#lr-widget-html").innerHTML;
          }
          catch (e) {}
              
          if (self.widget.type == 'seo-audit')
              self.widget.properties.seo_audit_html = document.querySelector("#lr-widget-seo-html").innerHTML;
  
          try {
              let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/update-widget/' + this.$route.params.token, {
                  widget: self.widget
              } , {
              headers: {
                      'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                  },
              })
  
              setTimeout(function() {
                  self.savingWidget = false
              }, 500)
          }catch(e){
              console.log(e)
          }
      },
      updatePreview: function() {
          if (document.getElementById('preview_iframe')) {
              let widget_stringified = JSON.stringify(this.widget);
              let widget_encoded = btoa(widget_stringified);
              let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded;
  
              document.getElementById('preview_iframe').src = new_preview_url;
          }
      },
      previewUrl() {
          let widget_stringified = JSON.stringify(this.widget);
          let widget_encoded = btoa(widget_stringified);
          let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded + "&url=" + encodeURIComponent(this.preview_url);
      
          window.open(new_preview_url)
      },
      addPopupPage() {
          this.widget.properties.popup_pages.push('');
      },
      removePopupPage(index) {
          let all_pages = this.widget.properties.popup_pages;
          let new_pages = [];
  
          for (var i in all_pages) {
              if (i != index) {
              new_pages.push(all_pages[i]);
              }
          }
  
          this.widget.properties.popup_pages = new_pages;
      }
    },
    created() {
      this.getWidget()
  
      if (this.$route.params.action) {
          function clickEmbedTab() {
              try {
                  document.querySelectorAll('.v-tabs div[role="tab"]')[3].click()
              }
              catch(e) {
                  setTimeout(function() {
                      clickEmbedTab();
                  }, 100);
              }
          }
          
          clickEmbedTab();
      }
  
      // let new_height = window.height - 200;
      // document.getElementById("preview_iframe").style.height = new_height + "px";
      
      function setTemplatesHeight() {
          try {
              let new_height = window.outerHeight - 350;
              document.querySelector(".rg-widget-templates1").style.height = new_height + "px";
              let new_height2 = window.outerHeight - 450;
              document.querySelector(".rg-widget-templates2").style.height = new_height2 + "px";
          }
          catch(e) {
              setTimeout(function() {
                  setTemplatesHeight();
              }, 100);
          }
      }
  
      setTemplatesHeight();
    },
      watch: {
            'widget.properties.action_options.landing_page_action_type_id': {
                handler() {
                    this.initializeSwitchStates();
                },
                immediate: true,
            },
          'widget.template': {
              handler() {
                  this.updatePreview()
              }
          },
          'widget.properties.main.title_color': {
              handler() {
                  try {
                      document.querySelector(".lr-title").style.color = this.widget.properties.main.title_color;
                  }
                  catch(e) {}
              }
          },
          'widget.properties.main.button_color': {
              handler() {
                  try {
                      document.querySelector(".lr-banner-full .lr-button button").style.backgroundColor = this.widget.properties.main.button_color;
                  }
                  catch(e) {}
              }
          },
         'widget.properties.main.button_text_color': {
              handler() {
                  try {
                      document.querySelector(".lr-banner-full .lr-button button").style.color = this.widget.properties.main.button_text_color;
                  }
                  catch(e) {}
              }
          },
         'widget.properties.titles_color': {
              handler() {
                  console.log('titiles colors')
              }
          },
          'widget.properties.custom_css': {
              handler() {
                    let css_el = document.querySelector("#lr-widget-custom-css-sheet");
                    css_el.innerText = this.widget.properties.custom_css.replace(/\n/g, " ")
              }
          },
          'widget.color_scheme': {
              handler() {
                if (this.widget.color_scheme == 'Dark') {
                  this.widget.background = "#19233A";
                  this.widget.text_color = "#FFFFFF";
                  this.widget.field_color = "#30394E";
                  this.widget.field_text_color = "#FFFFFF";
                  this.widget.button_color = "#2477F6";
                  this.widget.button_text_color = "#FFFFFF";
                }
                else if (this.widget.color_scheme == 'Light') {
                  this.widget.background = "#19233a0d";
                  this.widget.text_color = "#19233A";
                  this.widget.field_color = "#FFFFFF";
                  this.widget.field_text_color = "#757B89";
                  this.widget.button_color = "#2477F6";
                  this.widget.button_text_color = "#FFFFFF";
                }

                this.colorPickerKeys++;
              }
          },
          'widget.type': {
              handler() {
                if (this.widget.type == 'LightboxPopUp') {
                  this.modern_widget_styles = ['Wide', 'Narrow'];
                }
                else if (this.widget.type == 'HeaderBaner') {
                  this.modern_widget_styles = ['Centered', 'Centered Wide', 'Left Aligned'];
                }
                else if (this.widget.type == 'FloatingHeader') {
                  this.modern_widget_styles = [];
                }
                else if (this.widget.type == 'FloatingFooter') {
                  this.modern_widget_styles = [];
                }
                else if (this.widget.type == 'InLine') {
                  this.modern_widget_styles = ['Wide', 'Wide No Text', 'Wide Centered', 'Narrow Centered', 'Narrow Centered Left Aligned'];
                }
                else if (this.widget.type == 'Embed') {
                  this.modern_widget_styles = ['Centered', 'Left Aligned'];
                }
                else if (this.widget.type == 'HelloBar') {
                  this.modern_widget_styles = [];
                }
                else if (this.widget.type == 'FullPage') {
                  this.modern_widget_styles = ['Style1', 'Style2', 'Style3', 'Style4'];
                }

                if (!this.modern_widget_styles.includes(this.widget.widget_style))
                  this.widget.widget_style = this.modern_widget_styles[0];

                if (!this.widget.widget_style)
                  this.widget.widget_style = 'Left Aligned';
              }
          }
      }
  }
  </script>
  
  <style scoped>
    input, select {
      border-style: solid;
    }
  
    .v-label, label {
        /*font-size: 14px;*/
    }
  
    .has-color-picker {
        width: 50% !important;
    }
  
    #preview_iframe {
        width: 100%;
        height: 650px;
        border: solid 1px #CCCCCC;
    }
  
    .v-slider--horizontal .v-slider__track-container {
        height: 7px;
    }
  
    .v-input--radio-group.v-input--radio-group--row .v-radio {
        width: 100% !important;
    }
  
    .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
      padding-top: 7px;
    }
  
    div.v-slider__thumb-container span {
        font-size: 15px !important;
    }
  
    .lr-widget-wrapper {
      position: relative;
      height: 100%;
    }
  
    .lr-widget-back-shadow {
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 8;
      position: absolute;
      width: 100%;
      height: calc(100% - 20px);
    }
    
    .lr-widget-wrapper.Popup .lr-widget-content {
      background: #FFFFFF;
      min-width: 750px;
      z-index: 10;
      position: absolute;
      /* top: 50%; */
      left: 50%;
      /* transform: translate(-50%, -50%); */
      transform: translate(-50%);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; /**Newly added */
    }
  
  </style>