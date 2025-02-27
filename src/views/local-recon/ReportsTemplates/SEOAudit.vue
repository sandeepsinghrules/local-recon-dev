<template>
    <div>
        <div v-if="show_seo_on_page_category_description" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
            <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">

            <div class="rg-modal-header">
                {{ seo_on_page_category_title }} Details

                <a href="javascript: void(0);" class="rg-modal-close-btn" @click="show_seo_on_page_category_description = false"><i class="fa fa-times"></i></a>
            </div>


            <div class="p-6">

                <div v-html="seo_on_page_category_description" style="color: #757B89; font-size: 12px;"></div>

                <div style="clear: both;"></div>
            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">
                <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 float-right" @click="show_seo_on_page_category_description = false">
                    CLOSE
                </button>

                <div class="clearfix"></div>
            </div>

            </div>
        </div>

        <div v-if="!this_search.properties.success">
          <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
        </div>

        <div v-else>
          <div v-if="this_search.properties.data.output.message" >
              <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                  <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                    <div class="flex flex-row flex-wrap">
                      <div class="w-full lg:w-full" style="position: relative;">
                        <strong class="mt-2 text-lg">Error Occured </strong>
                        <strong class="mt-2 text-lg">Seoptimer Api Failed </strong>

                        <div class="mb-2" style="color: #757B89; font-size: 12px; line-height: 25px; padding-top: 25px;">
                            {{ this_search.properties.data.output.message }}
                          </div>
                      </div>
                    </div>
                  </div>
                  </v-card>
              </div>
          </div>
          <div v-else>
              <div class="dashboard-box stats-box w-full px-2 mb-5">
                <v-card
                  class="pa-2"
                  tile
                >
                  <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                    <div class="flex flex-row flex-wrap">
                      <div class="w-full lg:w-2/3" style="position: relative;">
                        <strong class="mt-2 text-lg">Website Report for {{ this_search.keyword }}</strong>

                        <div class="mb-2" style="color: #757B89; font-size: 12px; line-height: 25px; padding-top: 25px;">
                          This report grades your website on the strength of a range of important factors such as on-page SEO
                          optimization, off-page backlinks, social, performance, security and more. The overall grade is on a A+ to Fscale, with most major industry leading websites in the A range. Improving a website's grade is
                          recommended to ensure a better website experience for your users and improved ranking and visibility by
                          search engines.
                        </div>

                        <div class="clearfix"></div>
                      </div>

                      <div class="lr-seo-audit-photo w-full lg:w-1/3">
                        <img :src="this_search.properties.data.output.screenshot" style="border: solid 1px #efefef; max-height: 160px;" />
                      </div>
                    </div>

                    <hr class="mt-3" />

                    <v-tabs v-if="!$vuetify.breakpoint.xs  && !this.$route.query.download" class="-mb-6" v-model="seo_tab">
                      <v-tab>Summary</v-tab>
                      <v-tab>Recommendations</v-tab>
                      <v-tab>On Page SEO Results</v-tab>
                      <v-tab>Links</v-tab>
                      <v-tab>Usability</v-tab>
                      <v-tab>Performance Results</v-tab>
                      <v-tab>Social Results</v-tab>
                      <v-tab>Technology Results</v-tab>
                    </v-tabs>
                  </div>
                </v-card>
              </div>

              <div v-show="seo_tab == 0 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Overview</div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2" style="position: relative;">
                          <div class="lr-overall-box-left">
                            <div class="lr-doughnut-wrapper">
                              <div class="lr-doughnut-title">
                                {{ this_search.properties.data.output.scores.overall.grade }}
                              </div>
                              <apexchart type="donut" :options="overallDoughnut.chartOptions" :series="overallDoughnut.series" width="200"></apexchart>
                            </div>
                          </div>

                          <div class="lr-overall-box-right pt-4">
                            <div class="" style="font-size: 20px; font-weight: bold;">
                              {{ this_search.properties.data.output.scores.overall.title }}
                            </div>

                            <div class="lr-recommendations-nr">
                              RECOMMENDATIONS: {{ this_search.properties.data.output.recommendation_count }}
                            </div>
                          </div>

                          <div class="clearfix"></div>

                          <div class="flex flex-row flex-wrap pt-3">
                            <div class="w-full lg:w-1/3" style="position: relative;">
                              <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                  {{ this_search.properties.data.output.scores.seo.grade }}
                                </div>
                                <apexchart type="donut" :options="onPageSeoDoughnut.chartOptions" :series="onPageSeoDoughnut.series" width="200"></apexchart>

                                <div class="lr-doughnut-subtitle">On Page SEO</div>
                              </div>
                            </div>
                            <div class="w-full lg:w-1/3" style="position: relative;">
                              <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                  {{ this_search.properties.data.output.scores.links.grade }}
                                </div>
                                <apexchart type="donut" :options="linksDoughnut.chartOptions" :series="linksDoughnut.series" width="200"></apexchart>

                                <div class="lr-doughnut-subtitle">Links</div>
                              </div>
                            </div>
                            <div class="w-full lg:w-1/3" style="position: relative;">
                              <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                  {{ this_search.properties.data.output.scores.ui.grade }}
                                </div>
                                <apexchart type="donut" :options="usabilityDoughnut.chartOptions" :series="usabilityDoughnut.series" width="200"></apexchart>

                                <div class="lr-doughnut-subtitle">Usability</div>
                              </div>
                            </div>
                          </div>

                          <div class="flex flex-row flex-wrap pt-3">
                            <div class="w-full lg:w-1/3" style="position: relative;">
                              <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                  {{ this_search.properties.data.output.scores.performance.grade }}
                                </div>
                                <apexchart type="donut" :options="performanceDoughnut.chartOptions" :series="performanceDoughnut.series" width="200"></apexchart>

                                <div class="lr-doughnut-subtitle">Performance</div>
                              </div>
                            </div>
                            <div class="w-full lg:w-1/3" style="position: relative;">
                              <div class="lr-doughnut-wrapper">
                                <div class="lr-doughnut-title">
                                  {{ this_search.properties.data.output.scores.social.grade }}
                                </div>
                                <apexchart type="donut" :options="socialDoughnut.chartOptions" :series="socialDoughnut.series" width="200"></apexchart>

                                <div class="lr-doughnut-subtitle">Social</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="lr-radar-wrapper w-full lg:w-1/2" style="position: relative;">
                          <apexchart type="radar" height="350" :options="radarChart.chartOptions" :series="radarChart.series"></apexchart>
                        </div>
                      </div>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 1 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Recommendations</div>

                      <table class="w-full rg-datatable mt-5">
                        <thead class="border-b border-gray-100 w-full">
                          <tr>
                            <th>Description</th>
                            <th>Section</th>
                            <th>Priority</th>
                          </tr>
                        </thead>
                        <tbody class="w-full" style="">
                          <tr v-for="(item, index) in this_search.properties.data.output.recommendations" :key="index">
                            <td class="">
                              {{ item.recommendation }}
                            </td>
                            <td class="">
                              <v-chip
                                small
                                style="background: rgba(25, 35, 58, 0.05); color: #757B89"
                              >
                              
                              <span v-if="item.section == 'seo'">On Page SEO</span>
                              <span v-if="item.section == 'links'">Links</span>
                              <span v-if="item.section == 'ui'">Usability</span>
                              <span v-if="item.section == 'performance'">Performance</span>
                              <span v-if="item.section == 'social'">Social</span>
                              <span v-if="item.section == 'localseo'">Other</span>
                            </v-chip>
                            </td>
                            <td class="">
                              <v-chip
                                v-if="item.priority == 'low'"
                                small
                                style="background: rgba(62, 187, 128, 0.1); color: #3EBB80"
                              >Low Priority</v-chip>

                              <v-chip
                                v-if="item.priority == 'medium'"
                                small
                                style="background: #FFF0D9; color: #FFB443"
                              >Medium Priority</v-chip>

                              <v-chip
                                v-if="item.priority == 'high'"
                                small
                                style="background: #FCD7D7; color: #F03737"
                              >High Priority</v-chip>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 2 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">On Page SEO Results</div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2" style="position: relative;">
                          <div class="lr-seo-box-left">
                            <div class="lr-doughnut-wrapper">
                              <div class="lr-doughnut-title">
                                {{ this_search.properties.data.output.scores.seo.grade }}
                              </div>
                              <apexchart type="donut" :options="onPageSeoDoughnut.chartOptions" :series="onPageSeoDoughnut.series" width="200"></apexchart>
                            </div>
                          </div>

                          <div class="lr-seo-box-right pt-4">
                            <div class="" style="font-size: 20px; font-weight: bold;">
                              {{ this_search.properties.data.output.scores.seo.title }}
                            </div>

                            <div style="color: #757B89; font-size: 12px;">
                              {{ this_search.properties.data.output.scores.seo.description }}
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">
                        <div v-for="(item, index) in seo_on_page_seo_categories" :key="index">
                          <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                            <div class="float-left pr-2" style="width: 25px;">
                              <i v-if="this_search.properties.data.output[item.key].passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                            </div>

                            <div class="float-left" style="width: calc(100% - 25px);">
                              <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                              <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                {{ this_search.properties.data.output[item.key].shortAnswer }}<span v-if="this_search.properties.data.output[item.key].passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output[item.key].recommendation">{{ this_search.properties.data.output[item.key].recommendation }}.</span>

                                <div v-if="item.key == 'contentLength'" style="padding-top: 10px;">
                                  Word Count: {{ this_search.properties.data.output.contentLength.value }}
                                </div>

                                <div v-if="item.key == 'imageAlt'" style="padding-top: 10px;">
                                  We found {{ this_search.properties.data.output.imageAlt.data.total }} images on your page and {{ this_search.properties.data.output.imageAlt.data.noAltCount }} of them are missing the attribute.
                                </div>

                                <div v-if="item.subtitle" style="padding-top: 10px;">
                                  {{  item.subtitle }}
                                </div>

                                <div v-if="item.key == 'googleSearchPreview'">
                                  <v-card
                                    elevation="2"
                                    outlined
                                    class="mt-2"
                                  >
                                    <v-card-text>
                                      <a :href="this_search.properties.data.output.googleSearchPreview.data.url" target="lr-snippet-link">{{ this_search.properties.data.output.googleSearchPreview.data.url }}</a>
                                      <br />
                                      <span style="">
                                        {{ this_search.properties.data.output.googleSearchPreview.data.title }}
                                      </span>
                                    </v-card-text>
                                  </v-card>
                                </div>

                                <div v-if="item.key == 'langCheck'" style="padding-top: 10px;">
                                  Declared: {{ this_search.properties.data.output.langCheck.data }}
                                </div>

                                <div v-if="item.key == 'hasH1Header' && this_search.properties.data.output.hasH1Header.data.length > 0 && this_search.properties.data.output.hasH1Header.data.h1.length > 0" style="padding-top: 10px; width: 100%;">
                                  <table class="w-full rg-datatable mt-5" style="width: 100%;">
                                    <thead class="border-b border-gray-100 w-full">
                                      <tr>
                                        <th style="width: 150px;">Tag</th>
                                        <th>Value</th>
                                      </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                      <tr v-for="(item, index) in this_search.properties.data.output.hasH1Header.data.h1" :key="index">
                                        <td class="">
                                          H1
                                        </td>
                                        <td class="">
                                          {{ item }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div v-if="item.key == 'headers' && this_search.properties.data.output.headers.data" style="padding-top: 10px; width: 100%;">
                                  <table class="w-full rg-datatable mt-5" style="width: 100%;">
                                    <thead class="border-b border-gray-100 w-full">
                                      <tr>
                                        <th style="width: 150px;">Tag</th>
                                        <th>Frequency</th>
                                      </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                      <tr v-for="(item, index) in this_search.properties.data.output.headers.data" :key="index">
                                        <td class="">
                                          {{  index }}
                                        </td>
                                        <td class="">
                                          {{ item.length }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div v-if="item.key == 'keywords' && this_search.properties.data.output.keywords.data.keywords.length > 0" style="padding-top: 10px; width: 100%;">
                                  <strong>Individual Keywords</strong>
                                  <table class="w-full rg-datatable mt-3 mb-5" style="width: 100%;">
                                    <thead class="border-b border-gray-100 w-full">
                                      <tr>
                                        <th style="width: 20%;">Keyword</th>
                                        <th style="width: 20%;">Title</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Meta Description Tag</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Headings Tags</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Page Frequency</th>
                                      </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                      <tr v-for="(item, index) in this_search.properties.data.output.keywords.data.keywords" :key="index">
                                        <td class="">
                                          {{ item.word }}
                                        </td>
                                        <td class="">
                                          <i v-if="item.title === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.title === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs" class="">
                                          <i v-if="item.description === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.description === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs" class="">
                                          <i v-if="item.headers === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.headers === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs">{{ item.count }}</td>
                                      </tr>
                                    </tbody>
                                  </table>

                                  <strong>Phrases</strong>
                                  <table class="w-full rg-datatable mt-3" style="width: 100%;">
                                    <thead class="border-b border-gray-100 w-full">
                                      <tr>
                                        <th style="width: 20%;">Keyword</th>
                                        <th style="width: 20%;">Title</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Meta Description Tag</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Headings Tags</th>
                                        <th v-if="!$vuetify.breakpoint.xs" style="width: 20%;">Page Frequency</th>
                                      </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                      <tr v-for="(item, index) in this_search.properties.data.output.keywords.data.phrases" :key="index">
                                        <td class="">
                                          {{ item.word }}
                                        </td>
                                        <td class="">
                                          <i v-if="item.title === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.title === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs" class="">
                                          <i v-if="item.description === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.description === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs" class="">
                                          <i v-if="item.headers === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                          <i v-if="item.headers === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                                        </td>
                                        <td v-if="!$vuetify.breakpoint.xs">{{ item.count }}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div v-if="item.key == 'robotsTxt'" style="padding-top: 10px;">
                                  {{ this_search.properties.data.output.robotsTxt.data }}
                                </div>

                                <div v-if="item.key == 'sitemap' && this_search.properties.data.output.sitemap && this_search.properties.data.output.sitemap.data.urls" style="padding-top: 10px;">
                                  {{ this_search.properties.data.output.sitemap.data.urls[0] }}
                                </div>

                                <div v-if="item.key == 'analytics' && this_search.properties.data.output.analytics.data" style="padding-top: 10px;">
                                  <div v-for="analytic in this_search.properties.data.output.analytics.data" :key="analytic.id">
                                    - {{ analytic.name }}
                                  </div>
                                </div>

                                <div v-if="item.key == 'schemaOrg'">
                                  <span v-if="this_search.properties.data.output[item.key].passed === true">
                                    You are using JSON-LD Schema on your page.
                                  </span>
                                  <span v-else>
                                    You are NOT using JSON-LD Schema on your page.
                                  </span>
                                </div>

                              </div>
                            </div>
                          </div>

                          <div style="clear: both;"></div>  
                          <hr class="mt-5 mb-5" />
                        </div>
                        <div style="clear: both;"></div>
                      </div>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 3 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Links</div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">
                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.backlinks.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.backlinks.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.backlinks.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Number of backlinks</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.backlinks.shortAnswer }}
                          </div>

                          <div class="lr-backlinks-stats">
                            <div class="lr-backlinks-stat">
                              <div class="lr-backlinks-stat-icon">
                                <i class="mdi mdi-open-in-new"></i>
                              </div>

                              <div class="lr-backlinks-stat-value">
                                {{ this_search.properties.data.output.backlinks.data.backlinks }}
                              </div>

                              <div class="lr-backlinks-stat-description">
                                External Backlinks
                              </div>
                            </div>

                            <div class="lr-backlinks-stat">
                              <div class="lr-backlinks-stat-icon">
                                <i class="mdi mdi-web"></i>
                              </div>

                              <div class="lr-backlinks-stat-value">
                                {{ this_search.properties.data.output.backlinks.data.referring_domains }}
                              </div>

                              <div class="lr-backlinks-stat-description">
                                Referring Domains
                              </div>
                            </div>

                            <div class="lr-backlinks-stat">
                              <div class="lr-backlinks-stat-icon">
                                <i class="mdi mdi-web-check"></i>
                              </div>

                              <div class="lr-backlinks-stat-value">
                                {{ this_search.properties.data.output.backlinks.data.domain_strength }}
                              </div>

                              <div class="lr-backlinks-stat-description">
                                Moz Domain Authority
                              </div>
                            </div>

                            <div style="clear: both;"></div>
                          </div>
                        </div>

                        <div style="clear: both;"></div>
                          
                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.backlinksList.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.backlinksList.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.backlinksList.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Top Backlinks</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.backlinksList.shortAnswer }}
                          </div>
                        </div>

                        <div style="clear: both;"></div>
                          
                        <hr class="mt-5 mb-5" />

                        <div style="width: 100%; overflow: auto;">
                          <table class="w-full rg-datatable mt-5">
                            <thead class="border-b border-gray-100 w-full">
                              <tr>
                                <th style="width: 50%;">Domain Authority</th>
                                <th style="width: 50%;">URL</th>
                              </tr>
                            </thead>
                            <tbody class="w-full" style="">
                              <tr v-for="(item, index) in this_search.properties.data.output.backlinksList.data.list" :key="index">
                                <td class="">
                                  {{ item.domain_authority }}
                                </td>
                                <td class="">
                                  {{ item.url }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                          
                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.onPageLinks.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.onPageLinks.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.onPageLinks.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">On-Page Link Structure</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            We found {{ this_search.properties.data.output.onPageLinks.data.total }} total links. {{ this_search.properties.data.output.onPageLinks.data.externalPercentage }}% of your links are external links and are sending authority to other sites. {{ this_search.properties.data.output.onPageLinks.data.nofollowPercentage }}% of your links are nofollow links, meaning authority is not being passed to those destination pages.
                          </div>
                        </div>

                        <div style="clear: both;"></div>
                          
                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.friendlyUrls.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.friendlyUrls.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.friendlyUrls.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Friendly Links</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.friendlyUrls.shortAnswer }}<span v-if="this_search.properties.data.output.friendlyUrls.passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output.friendlyUrls.recommendation">{{ this_search.properties.data.output.friendlyUrls.recommendation }}.</span>
                          </div>
                        </div>

                        <div style="clear: both;"></div>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 4 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Usability</div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2" style="position: relative;">
                          <div class="lr-seo-box-left">
                            <div class="lr-doughnut-wrapper">
                              <div class="lr-doughnut-title">
                                {{ this_search.properties.data.output.scores.ui.grade }}
                              </div>
                              <apexchart type="donut" :options="usabilityDoughnut.chartOptions" :series="usabilityDoughnut.series" width="200"></apexchart>
                            </div>
                          </div>

                          <div class="lr-seo-box-right pt-4">
                            <div class="" style="font-size: 20px; font-weight: bold;">
                              {{ this_search.properties.data.output.scores.ui.title }}
                            </div>

                            <div style="color: #757B89; font-size: 12px;">
                              {{ this_search.properties.data.output.scores.ui.description }}
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">
                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.deviceRendering.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.deviceRendering.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.deviceRendering.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Device Rendering</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.deviceRendering.shortAnswer }}
                          </div>

                          <!-- <img :src="this_search.properties.data.output.deviceRendering.data.mobile" />

                          <img :src="this_search.properties.data.output.deviceRendering.data.tablet" /> -->
                        </div>

                        <div style="clear: both;"></div>
                          
                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.coreWebVitals.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.coreWebVitals.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.coreWebVitals.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Google's Core Web Vitals</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.coreWebVitals.shortAnswer }}
                          </div>
                        </div>

                        <div style="clear: both;"></div>

                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.mobilePageInsights.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.mobilePageInsights.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.mobilePageInsights.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Google's PageSpeed Insights - Mobile</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.mobilePageInsights.shortAnswer }}<span v-if="this_search.properties.data.output.mobilePageInsights.passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output.mobilePageInsights.recommendation">{{ this_search.properties.data.output.mobilePageInsights.recommendation }}.</span>
                          </div>
                        </div>

                        <div style="clear: both;"></div>

                        <div class="lr-doughnut-wrapper">
                          <div class="lr-doughnut-title not-grade">
                            {{ this_search.properties.data.output.mobilePageInsights.data.score }}
                          </div>
                          <apexchart type="donut" :options="pageInsightsMobileDoughnut.chartOptions" :series="pageInsightsMobileDoughnut.series" width="200"></apexchart>
                        </div>
                          
                        <hr class="mt-5 mb-5" />

                        <table class="w-full rg-datatable mt-5" style="width: 100%;">
                          <thead class="border-b border-gray-100 w-full">
                            <tr>
                              <th style="width: 70%;">Lab Data</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody class="w-full" style="">
                            <tr v-for="(item, index) in this_search.properties.data.output.mobilePageInsights.data.labdata" :key="index">
                              <td class="">
                                {{ item.name }}
                              </td>
                              <td class="" :style="((item.value <= 0.1) ? 'color: green;' : 'color: #F03737;')">
                                {{ item.value }} s
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr class="mt-5 mb-5" />

                        <table class="w-full rg-datatable mt-5" style="width: 100%;">
                          <thead class="border-b border-gray-100 w-full">
                            <tr>
                              <th style="width: 70%;">Opportunities</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody class="w-full" style="">
                            <tr v-for="(item, index) in this_search.properties.data.output.mobilePageInsights.data.opportunities" :key="index">
                              <td class="">
                                {{ item.name }}
                              </td>
                              <td class="" :style="((item.value <= 0.1) ? 'color: green;' : 'color: #F03737;')">
                                {{ item.value }} s
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr class="mt-5 mb-5" />

                        <div class="float-left pr-2" style="width: 25px;">
                          <i v-if="this_search.properties.data.output.desktopPageInsights.passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.desktopPageInsights.passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                          <i v-if="this_search.properties.data.output.desktopPageInsights.passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                        </div>

                        <div class="float-left" style="width: calc(100% - 25px);">
                          <div style="font-size: 14px; padding-top: 3px;">Google's PageSpeed Insights - Desktop</div>

                          <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                            {{ this_search.properties.data.output.desktopPageInsights.shortAnswer }}<span v-if="this_search.properties.data.output.desktopPageInsights.passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output.desktopPageInsights.recommendation">{{ this_search.properties.data.output.desktopPageInsights.recommendation }}.</span>
                          </div>
                        </div>

                        <div style="clear: both;"></div>

                        <div class="lr-doughnut-wrapper">
                          <div class="lr-doughnut-title not-grade">
                            {{ this_search.properties.data.output.desktopPageInsights.data.score }}
                          </div>
                          <apexchart type="donut" :options="pageInsightsDesktopDoughnut.chartOptions" :series="pageInsightsDesktopDoughnut.series" width="200"></apexchart>
                        </div>
                          
                        <hr class="mt-5 mb-5" />

                        <table class="w-full rg-datatable mt-5" style="width: 100%;">
                          <thead class="border-b border-gray-100 w-full">
                            <tr>
                              <th style="width: 70%;">Lab Data</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody class="w-full" style="">
                            <tr v-for="(item, index) in this_search.properties.data.output.desktopPageInsights.data.labdata" :key="index">
                              <td class="">
                                {{ item.name }}
                              </td>
                              <td class="" :style="((item.value <= 0.1) ? 'color: green;' : 'color: #F03737;')">
                                {{ item.value }} s
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr class="mt-5 mb-5" />

                        <table class="w-full rg-datatable mt-5" style="width: 100%;">
                          <thead class="border-b border-gray-100 w-full">
                            <tr>
                              <th style="width: 70%;">Opportunities</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody class="w-full" style="">
                            <tr v-for="(item, index) in this_search.properties.data.output.mobilePageInsights.data.opportunities" :key="index">
                              <td class="">
                                {{ item.name }}
                              </td>
                              <td class="" :style="((item.value <= 0.1) ? 'color: green;' : 'color: #F03737;')">
                                {{ item.value }} s
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr class="mt-5 mb-5" />

                        <div v-for="(item, index) in usability_categories" :key="index">
                          <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                            <div class="float-left pr-2" style="width: 25px;">
                              <i v-if="this_search.properties.data.output[item.key].passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                            </div>

                            <div class="float-left" style="width: calc(100% - 25px);">
                              <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                              <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                {{ this_search.properties.data.output[item.key].shortAnswer }}<span v-if="this_search.properties.data.output[item.key].passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output[item.key].recommendation">{{ this_search.properties.data.output[item.key].recommendation }}.</span>
                              </div>
                            </div>
                          </div>

                          <div style="clear: both;"></div>  
                          <hr class="mt-5 mb-5" />
                        </div>
                        <div style="clear: both;"></div>
                      </div>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 5 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Performance</div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2" style="position: relative;">
                          <div class="lr-seo-box-left">
                            <div class="lr-doughnut-wrapper">
                              <div class="lr-doughnut-title">
                                {{ this_search.properties.data.output.scores.performance.grade }}
                              </div>
                              <apexchart type="donut" :options="performanceDoughnut.chartOptions" :series="performanceDoughnut.series" width="200"></apexchart>
                            </div>
                          </div>

                          <div class="lr-seo-box-right pt-4">
                            <div class="" style="font-size: 20px; font-weight: bold;">
                              {{ this_search.properties.data.output.scores.performance.title }}
                            </div>

                            <div style="color: #757B89; font-size: 12px;">
                              {{ this_search.properties.data.output.scores.performance.description }}
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">

                        <div v-for="(item, index) in performance_categories" :key="index">
                          <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                            <div class="float-left pr-2" style="width: 25px;">
                              <i v-if="this_search.properties.data.output[item.key].passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                            </div>

                            <div class="float-left" style="width: calc(100% - 25px);">
                              <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                              <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                {{ this_search.properties.data.output[item.key].shortAnswer }}<span v-if="this_search.properties.data.output[item.key].passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output[item.key].recommendation">{{ this_search.properties.data.output[item.key].recommendation }}.</span>
                              </div>
                            </div>
                          </div>

                          <div style="clear: both;"></div>  

                          <div v-if="item.key == 'serverResponseTime'" style="padding-top: 10px;">
                            <div v-if="!$vuetify.breakpoint.xs" class="pt-5">
                              <div style="width: 260px; text-align: center; color: #19233A; font-weight: bold; display: inline-block;">
                                Server Response
                              </div>

                              <div style="width: 260px; text-align: center; color: #19233A; font-weight: bold; display: inline-block;">
                                All Page Content Loaded
                              </div>

                              <div style="width: 260px; text-align: center; color: #19233A; font-weight: bold; display: inline-block;">
                                All Page Scripts Complete
                              </div>
                            </div>

                            <div class="flex flex-row flex-wrap pt-1">
                              <div class="w-full" style="position: relative;">
                                <div class="lr-report-gauges">
                                  <VueGauge :refid="'lr-report-server-response'" :value="(this_search.properties.data.output.serverResponseTime.data.responseTime/30).toString()" :title="(this_search.properties.data.output.serverResponseTime.data.responseTime/1000).toFixed(2).toString() + 's'" :arc_delimiters="[17, 34]" :arc_labels="['0.5s', '1s']" :range_label="['0s', '3s']" />
                                  <VueGauge :refid="'lr-report-content-loaded'" :value="(this_search.properties.data.output.serverResponseTime.data.loadTime/250).toString()" :title="(this_search.properties.data.output.serverResponseTime.data.loadTime/1000).toFixed(2).toString() + 's'" :arc_delimiters="[17, 34]" :arc_labels="['5s', '10s']" :range_label="['0s', '20s']" />
                                  <VueGauge :refid="'lr-report-all-scripts-complete'" :value="(this_search.properties.data.output.serverResponseTime.data.completeTime/200).toString()" :title="(this_search.properties.data.output.serverResponseTime.data.completeTime/1000).toFixed(2).toString() + 's'" :arc_delimiters="[50, 75]" :arc_labels="['10s', '15s']" :range_label="['0s', '20s']" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-if="!$vuetify.breakpoint.xs && item.key == 'pageSize'" style="padding-top: 10px; padding-left: 15px;">
                            <apexchart type="donut" :options="downloadPageSizePieChart.chartOptions" :series="downloadPageSizePieChart.series" width="400"></apexchart>
                          </div>

                          <div v-if="!$vuetify.breakpoint.xs && item.key == 'gzip'" style="padding-top: 10px; padding-left: 15px;">
                            <apexchart type="donut" :options="downloadGzipPageSizePieChart.chartOptions" :series="downloadGzipPageSizePieChart.series" width="400"></apexchart>
                          </div>

                          <div v-if="item.key == 'numberOfResources'" style="padding-top: 10px; padding-left: 15px;">
                            <div class="lr-backlinks-stats">
                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/total.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.total }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  Total Objects
                                </div>
                              </div>

                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/html.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.html }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  HTML Pages
                                </div>
                              </div>

                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/js.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.js }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  JS Resources
                                </div>
                              </div>

                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/css.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.css }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  CSS Resources
                                </div>
                              </div>

                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/images.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.images }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  Images
                                </div>
                              </div>

                              <div class="lr-backlinks-stat even">
                                <div class="lr-backlinks-stat-icon">
                                  <img :src="require(`@/assets/images/icons/resources/other.png`)" />
                                </div>

                                <div class="lr-backlinks-stat-value">
                                  {{ this_search.properties.data.output.numberOfResources.data.other }}
                                </div>

                                <div class="lr-backlinks-stat-description">
                                  Other Resources
                                </div>
                              </div>

                              <div style="clear: both;"></div>
                            </div>
                          </div>

                          <hr class="mt-5 mb-5" />
                        </div>
                        <div style="clear: both;"></div>
                      </div>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 6 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Social Results</div>

                      <div class="flex flex-row flex-wrap">
                        <div class="w-full lg:w-1/2" style="position: relative;">
                          <div class="lr-seo-box-left">
                            <div class="lr-doughnut-wrapper">
                              <div class="lr-doughnut-title">
                                {{ this_search.properties.data.output.scores.social.grade }}
                              </div>
                              <apexchart type="donut" :options="socialDoughnut.chartOptions" :series="socialDoughnut.series" width="200"></apexchart>
                            </div>
                          </div>

                          <div class="lr-seo-box-right pt-4">
                            <div class="" style="font-size: 20px; font-weight: bold;">
                              {{ this_search.properties.data.output.scores.social.title }}
                            </div>

                            <div style="color: #757B89; font-size: 12px;">
                              {{ this_search.properties.data.output.scores.social.description }}
                            </div>
                          </div>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">

                        <div v-for="(item, index) in social_categories" :key="index">
                          <div v-if="this_search.properties.data.output[item.key] && 'passed' in this_search.properties.data.output[item.key] && this_search.properties.data.output[item.key].passed === false">
                            <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                              <div class="float-left pr-2" style="width: 25px;">
                                <i v-if="this_search.properties.data.output[item.key].passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                                <i v-if="this_search.properties.data.output[item.key].passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                                <i v-if="this_search.properties.data.output[item.key].passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                              </div>

                              <div class="float-left" style="width: calc(100% - 25px);">
                                <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                                <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                  {{ this_search.properties.data.output[item.key].shortAnswer }}<span v-if="this_search.properties.data.output[item.key].passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output[item.key].recommendation">{{ this_search.properties.data.output[item.key].recommendation }}.</span>
                                

                                  <div v-if="item.key == 'twitterActivity' && this_search.properties.data.output.twitterActivity" style="padding-top: 10px;">
                                    Followers: {{ this_search.properties.data.output.twitterActivity.data.followers }}
                                  </div>

                                  <div v-if="item.key == 'youtubeActivity' && this_search.properties.data.output.youtubeActivity" style="padding-top: 10px;">
                                    Subscribers: {{ this_search.properties.data.output.youtubeActivity.data.subscribers }}
                                  </div>

                                  <div v-if="item.key == 'youtubeActivity' && this_search.properties.data.output.youtubeActivity" style="padding-top: 10px;">
                                    Views: {{ this_search.properties.data.output.youtubeActivity.data.views }}
                                  </div>

                                  <div v-if="item.key == 'twitterTags' && this_search.properties.data.output.twitterTags.data" style="padding-top: 10px; width: 100%;">
                                    <table class="w-full rg-datatable mt-5" style="width: 100%;">
                                      <thead class="border-b border-gray-100 w-full">
                                        <tr>
                                          <th style="width: 150px;">Tag</th>
                                          <th>Content</th>
                                        </tr>
                                      </thead>
                                      <tbody class="w-full" style="">
                                        <tr v-for="(item, index) in this_search.properties.data.output.twitterTags.data" :key="index">
                                          <td class="">
                                            {{ index }}
                                          </td>
                                          <td class="">
                                            {{ item }}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                              </div>

                              <div style="clear: both;"></div>

                            </div>

                          <hr class="mt-5 mb-5" />
                        </div>
                        </div>
                        <div style="clear: both;"></div>
                      </div>

                    </div>
                  </v-card>
                </div>
              </div>

              <div v-show="seo_tab == 7 || $vuetify.breakpoint.xs  || this.$route.query.download">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                  <v-card
                    class="pa-2"
                    tile
                  >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                      <div class="lr-report-subtitle">Technology Results</div>

                      <div style="border: 1px solid #D9D9D9; border-radius: 5px; padding: 15px; margin-top: 20px;">

                        <div v-for="(item, index) in technology_categories" :key="index">
                          <div style="clear: both; /*cursor: pointer;*/" @click="/*showSeoOnPageCategoryDescription(item.title, item.description)*/">
                            <div class="float-left pr-2" style="width: 25px;">
                              <i v-if="this_search.properties.data.output[item.key].passed === true" class="mdi mdi-check" style="color: #54AC0E; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === null" class="mdi mdi-information-outline" style="color: #757B89; font-size: 18px;"></i>
                              <i v-if="this_search.properties.data.output[item.key].passed === false" class="mdi mdi-close" style="color: #EA170C; font-size: 18px;"></i>
                            </div>

                            <div class="float-left" style="width: calc(100% - 25px);">
                              <div style="font-weight: bold; font-size: 16px;">{{ item.title }}</div>

                              <div style="padding-top: 10px; color: #757B89; font-size: 12px;">
                                {{ this_search.properties.data.output[item.key].shortAnswer }}<span v-if="this_search.properties.data.output[item.key].passed === false">.&nbsp;</span> <span v-if="this_search.properties.data.output[item.key].recommendation">{{ this_search.properties.data.output[item.key].recommendation }}.</span>
                              

                                <div v-if="item.key == 'ip'" style="padding-top: 10px;">
                                  {{ this_search.properties.data.output.ip.data }}
                                </div>

                                <div v-if="item.key == 'dns'" style="padding-top: 10px;">
                                  <div v-html="this_search.properties.data.output.dns.data"></div>
                                </div>

                                <div v-if="item.key == 'webServer'" style="padding-top: 10px;">
                                  {{ this_search.properties.data.output.webServer.data }}
                                </div>

                                <div v-if="item.key == 'charset'" style="padding-top: 10px;">
                                  {{ this_search.properties.data.output.charset.data }}
                                </div>

                                <div v-if="item.key == 'technologies' && this_search.properties.data.output.technologies.data" style="padding-top: 10px; width: 100%;">
                                  <table class="w-full rg-datatable mt-5" style="width: 100%;">
                                    <thead class="border-b border-gray-100 w-full">
                                      <tr>
                                        <th>Technology</th>
                                      </tr>
                                    </thead>
                                    <tbody class="w-full" style="">
                                      <tr v-for="(item, index) in this_search.properties.data.output.technologies.data" :key="index">
                                        <td class="">
                                          {{ item }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                            </div>

                            <div style="clear: both;"></div>

                          </div>

                          <hr class="mt-5 mb-5" />
                        </div>
                        <div style="clear: both;"></div>
                      </div>

                    </div>
                  </v-card>
                </div>
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
  
  export default {
    props: ['search'],
    components: {
        ApexCharts,
        VueGauge,
    },
    data () {
        return {
            seo_tab: 0,

            this_search: null,

            // SEO Audit Overall Doughts and Radar charts
            seo_audit_grades: {
                "A+": 100,
                "A": 85,
                "A-": 70,
                "B+": 69,
                "B": 65,
                "B-": 60,
                "C+": 59,
                "C": 55,
                "C-": 50,
                "D+": 49,
                "D": 45,
                "D-": 40,
                "E+": 39,
                "E": 35,
                "E-": 30,
                "F+": 29,
                "F": 20,
                "F-": 10
            },

            overallDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#2477F6', 'rgba(36, 119, 246, 0.2)'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            onPageSeoDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#7AC874', '#DCE4DC'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            linksDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#3EBB80', '#D6E3DD'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            usabilityDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#FFB443', '#E9E2D7'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            performanceDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#55BEAB', '#D8E3E1'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            socialDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#7467B5', '#DCDAE2'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            pageInsightsMobileDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#F03737', '#FCD7D7'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            pageInsightsDesktopDoughnut: {
                series: [0, 0],
                chartOptions: {
                colors:['#3EBB80', '#D8F1E6'],
                plotOptions: {
                    pie: {
                    donut: {
                        size: '55%'
                    }
                    }
                },
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },

            radarChart: {
                series: [{
                name: 'Value',
                data: [0, 0, 0, 0, 0],
                }],
                chartOptions: {
                chart: {
                    height: 350,
                    type: 'radar',
                    toolbar: {
                    show: false
                    }
                },
                xaxis: {
                    categories: ['On-Page SEO', 'Links', 'Social', 'Usability', 'Performance']
                },
                yaxis: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
                }
            },
            // END SEO Audit Overall Doughts and Radar charts

            // SEO Audit On Page SEO categories
            seo_on_page_seo_categories: [
                { "key": "title", "title": "Title Tag", "description": "The Title Tag is an important HTML element that tells users and Search Engines what the topic of the webpage is and the type of keywords the page should rank for. The Title will appear in the Header Bar of a user's browser. It is also one of the most important (and easiest to improve) On-Page SEO factors. <br /><br />We recommend setting a keyword rich Title between 10–70 characters. This is often simple to enter into your CMS system or may need to be manually set in the header section of the HTML code." },
                { "key": "description", "title": "Meta Description Tag", "subtitle": "A meta description is important for search engines to understand the content of your page, and is often shown as the description text blurb in search results.", "description": "Meta Description is another important HTML element that explains more descriptively to Search Engines what your page is about. Meta Descriptions are often used as the text snippets used in Search Engine results (though Search Engines are inceasingly generating these themselves) and can help further signal to Search Engines what keywords your page should rank for. <br /><br />Make sure your page has a Meta Description included, and is at an optimum length (between 70 and 160 characters). Make your Meta Description text interesting and easy to comprehend. Use phrases and keywords relevant to the page and user that you would like to rank for. Meta Description is normally available to be updated in your CMS." },
                { "key": "googleSearchPreview", "title": "SERP Snippet Preview", "description": "The SERP Snippet illustrates how your page may be shown in Search Results for a particular query. Typically the page's Title, URL and Meta Description have been the main components utilized here, and hence could be carefully dictated, though Search Engines are more frequently building these snippets themselves to better represent the page content to their searchers.<br /><br />It's important that the SERP Snippet is enticing for your searchers to click on, and accurately represents your content to avoid bounces or heavy re-writing by the Search Engine. You should keep these factors in mind when populating the page Title, Meta Description and URL." },
                { "key": "hasHreflang", "title": "Hreflang Usage", "subtitle": "", "description": "Hreflang is an HTML attribute used to specify the language and geographical targeting of a page. It is commonly used together with the 'alternate' attribute in the code of a page to signal to Search Engines a list of alternative language or geographic versions of the current page.<br /><br />If you have multiple versions of the same page in different languages, it is important to add Hreflang tags to tell Search Engines about these variations. This code may need to be manually added into the HTML code of your page, but is also often controlled by your CMS or plugin system if multi-lingual features are enabled." },
                { "key": "langCheck", "title": "Language", "subtitle": "", "description": "The lang attribute is used to describe the intended language of the current page to user's browsers and Search Engines. Search Engines may use the lang attribute to return language specific search results to a searcher, and in the browser, lang attribute can signal the need to switch to a different language if it is different to the user's own preferred language.<br /><br />We recommend adding the lang attribute to the HTML tag of every page to avoid any chance of misinterpretation of language. This may need to be manually added to the site's HTML code, or may be controlled by your CMS." },
                { "key": "hasH1Header", "title": "H1 Header Tag Usage", "subtitle": "The H1 Header Tag is an important way of signaling to search engines what your content is about, and subsequently the keywords it should rank for.", "description": "The H1 Header Tag is one of the most important ways of signaling to Search Engines the topic of a page and subsequently the keywords it should rank for. The H1 Tag normally appears as visible text in the largest font size on the page.<br /><br />We recommend adding a H1 Header Tag near the top of your page content and include important keywords you would like to rank for. You should have one, and only one H1 tag on each page. If you are using a CMS, this would normally be entered into the core content section of the page." },
                { "key": "headers", "title": "H2-H6 Header Tag Usage", "subtitle": "", "description": "The H2-H6 Header Tags are an important way of organizing the content of your page and signaling to Search Engines the longer tail topics your page should rank for.<br /><br />We recommend including at least 2 other Header Tag levels on your page (such as H2 and H3) in addition to the H1. It is useful to also include important keywords in these Header Tags. These would be added to the core content section of your page." },
                { "key": "keywords", "title": "Keyword Consistency", "subtitle": "", "description": "Generally a page should be targeted to rank for particular set of keywords or phrases. These keywords should be used with some consistency in page content (naturally and without stuffing) to maximize ranking potential for those keywords. This means these keywords should be present across the most important HTML tags of the page, and used with some frequency in the general page text content. The keyword consistency check illustrates the keywords we have identified appearing most frequently in these areas.<br /><br />If the keywords and phrases identified don't match your intended ranking keywords, and do not show a level of consistency, you should consider amending your core page content to better include these." },
                { "key": "contentLength", "title": "Amount of Content", "subtitle": "It has been well researched that higher text content volumes are related to better ranking ability in general.", "description": "Numerous studies have shown that there is a relationship between the amount of content on a page (typically measured in word count) and it's ranking potential - generally longer content will rank higher. Obviously content also needs to be topically relevant, keyword rich and highly readable for the visitor. Note, in our assessment, we look at all selectable text on the page at load time, not hidden content. As a general guideline, it is recommended to have atleast 500 words of content on a page to give it some ranking potential. However this should be considered on a case by case basis. It may not be relevant for particular pages like 'contact us' pages for example." },
                { "key": "imageAlt", "title": "Image Alt Attributes", "subtitle": "Alt attributes are an often overlooked and simple way to signal to Search Engines what an image is about, and help it rank in image search results.", "description": "Alternate Image Text or Alt Text is descriptive text that is displayed in place of an image if it can't be loaded, as well as a label on an image when it is moused over in the browser, to give more information to the visitor. Additionally, Search Engines use provided Alt Text to better understand the content of an image. Image SEO is not widely known, but having your image rank for image searches is an overlooked way of gaining traffic and backlinks to your site.<br /><br />We recommend adding useful and keyword rich Alt Text for pages's main images, in particular those that could have ranking potential. This should be considered on a case-by-case basis. Often there may be imagery such as UI components or tracking pixels where it may not be useful to add Alt Text, though we have tried to filter a number of these out in our analysis." },
                { "key": "canonicalCheck", "title": "Canonical Tag", "subtitle": "The Canonical Tag tells Search Engines the primary URL of a page. Google recommends all pages specify a Canonical.", "description": "The Canonical Tag is a HTML Tag that tells Search Engines the primary URL of a page. URLs can have multiple versions due to things like parameters being passed or www and non-www versions, resulting in potential duplicate content. Google recommends all pages specify a Canonical for this reason.<br /><br />You may need to determine what the primary preferred version of the page is. Often the CMS may manage this, or provide the ability to specify it." },
                { "key": "noindexTags", "title": "Noindex Tag Test", "subtitle": "Using the Noindex Tag will instruct Search Engines to ignore a page, completely removing it`s ranking ability. This has a significant impact which is often overlooked.", "description": "A critical part of a page's ranking potential is ensuring that it can actually be accessed by Search Engines. The Noindex Tag, when used on pages, tells Search Engines to ignore a page, and can destroy out it's ranking ability. Sometimes these tags are added intentionally for low value pages, but sometimes they are left over unintentionally from a theme or template that has been used on the site, or forgotten to be removed by a developer when a website moves from design and testing to live usage.<br /><br />If you want the page to rank and it's using a Noindex Tag, you will need to remove the tag from your page's HTML entirely. This may require access to the frontend HTML code, and may need to be done by a developer. If you are using a CMS, you may have an option enabled to prevent indexing of the page, which should be turned off." },
                { "key": "noindexHeaders", "title": "Noindex Header Test", "subtitle": "", "description": "A critical part of a page's ranking potential is ensuring that it can actually be accessed by Search Engines. The Noindex Header is another Noindexing method that tells Search Engines to ignore a page, and can destroy out it's ranking ability. Sometimes these tags are added intentionally for low value pages, but sometimes they are left over unintentionally from a theme or template that has been used on the site, or forgotten to be removed by a developer when a website moves from design and testing to live usage.<br /><br />If you want the page to rank and it's using a Noindex Header, you will need to remove the Noindex Header from your page. This may require access to the backend code, and may need to be done by a developer. If you are using a CMS, you may have an option enabled to prevent indexing of the page, which should be turned off." },
                { "key": "sslEnabled", "title": "SSL Enabled", "subtitle": "", "description": "SSL or Secure Socket Layer, is a security technology that encrypts data between your website and a visitor. It ensures that the transfer of sensitive data like passwords and credit cards are done securely. Using SSL on all pages is a modern standard, and Search Engines have made it a ranking signal in recent years.<br /><br />SSL can often be switched on quite simply in systems like Wordpress, Wix etc. Often in more custom websites though, it may require the help of a technical resource to install and configure this on your website. After installation, test that your website loads successfully at a HTTPS:// location." },
                { "key": "httpsRedirect", "title": "HTTPS Redirect", "subtitle": "", "description": "SSL is a security technology which ensures sensitive data like passwords and credit cards are sent securely between your website and visitors. If you have SSL enabled, it is also very important to ensure that your page is actually forcing usage of HTTPS by redirecting from a non-secure HTTP version to secure HTTPS version. Not doing this means users and Search Engines may continue to access insecure versions, which can also reduce your ranking ability.<br /><br />Often systems like Wix or Shopify will make it easy to enable, and redirect to SSL versions. If you have Wordpress, or a custom built site, you may require a developer's involvement to ensure that pages are being redirected to their new HTTPS versions. This can be done within a site's configuration or htaccess rules." },
                { "key": "robotsTxt", "title": "Robots.txt", "subtitle": "", "description": "Robots.txt is a text file that provides instructions to Search Engine crawlers on how to crawl your site, including types of pages to access or not access. It is often the gatekeeper of your site, and normally the first thing a Search Engine bot will access.<br /><br />We recommend always having a robots file in place for your site. These can be automatically created using a free online utility, Wordpress plugin, or your CMS's robots.txt creation process." },
                { "key": "blockedByRobotsTxt", "title": "Blocked by Robots.txt", "subtitle": "", "description": "The robots.txt file includes important instructions to Search Engines on how to crawl a site, including instructions to ignore particular pages (effectively 'blocking' them). Sometimes these instructions are added intentionally for low value pages, but sometimes they are left over by mistake when a website goes live, or can be written incorrectly excluding more pages than desired.<br /><br />If you want the page to rank and it's blocked by a rule in robots.txt, you may need to review your robots rules to understand why it's being blocked, and remove the rule. Because robots.txt instructions are a type of code, this may require the help of a developer to correct." },
                { "key": "sitemap", "title": "XML Sitemaps", "subtitle": "", "description": "A Sitemap is an XML data file on your site that lists all of your site's pages that are available for crawling together with other useful information like last update times and crawling priority. Sitemap files help Search Engines find all your pages to give them the highest chance of being indexed and ranked.<br /><br />We recommend always having a Sitemaps file in place for your site. Sitemaps can be created manually using a utility, Wordpress plugin, or your CMS's Sitemap creation process. Additionally, the Sitemap should be referenced in your robots.txt file." },
                { "key": "analytics", "title": "Analytics", "subtitle": "", "description": "Web Analytics Tools like Google Analytics allow you to analyze your website’s performance and understand your visitors better.<br /><br />We recommend using an analytics tool on your site. Analytics tracking code can be installed manually into page code with the help of a developer or enabled as a feature of your CMS." },
                { "key": "schemaOrg", "title": "Schema.org Structured Data", "subtitle": "", "description": "Schema.org Structured Data Markup is a collection of data tags that can be added to your site to allow Search Engines to more easily interpret the content and use it to enhance Search Results. For example there are tags for providing information about your Local Business such as address and phone number, or adding product information on e-commerce pages so that these products can be displayed in shopping aggregators like Google Shopping.<br /><br />It is a good idea to start incorporating some relevant Schema.org tags into your site to improve interpretation and display by Search Engines." }
            ],

            seo_on_page_category_description: "",
            seo_on_page_category_title: "",
            show_seo_on_page_category_description: false,
            // END SEO Audit On Page SEO categories

            // SEO Audit Usability categories
            usability_categories: [
                { "key": "flash", "title": "Flash Used?", "description": "" },
                { "key": "iframe", "title": "iFrames Used?", "subtitle": "", "description": "" },
                { "key": "favicon", "title": "Favicon", "subtitle": "", "description": "" },
                { "key": "email", "title": "Email Privacy", "description": "" },
                { "key": "legibleFonts", "title": "Legible Font Sizes", "subtitle": "", "description": "" },
                { "key": "tapTargetSizing", "title": "Tap Target Sizing", "subtitle": "", "description": "" }
            ],
            // END SEO Audit Usability categories

            // SEO Audit Performance categories
            performance_categories: [
                { "key": "serverResponseTime", "title": "Page Speed Info", "description": "" },
                { "key": "pageSize", "title": "Download Page Size", "subtitle": "", "description": "" },
                { "key": "gzip", "title": "Website Compression (Gzip, Deflate, Brotli)", "subtitle": "", "description": "" },
                { "key": "numberOfResources", "title": "Number of Resources", "description": "" },
                { "key": "hasAmp", "title": "Google Accelerated Mobile Pages (AMP)", "subtitle": "", "description": "" },
                { "key": "javascriptErrors", "title": "JavaScript Errors", "subtitle": "", "description": "" },
                { "key": "http2", "title": "HTTP2 Usage", "subtitle": "", "description": "" },
                { "key": "optimizedImages", "title": "Optimize Images", "subtitle": "", "description": "" },
                { "key": "minified", "title": "Minification", "subtitle": "", "description": "" },
                { "key": "deprecated", "title": "Deprecated HTML", "subtitle": "", "description": "" },
                { "key": "inlineCss", "title": "Inline Styles", "subtitle": "", "description": "" }
            ],

            serverResponseChart: {
                series: [76],
                chartOptions: {
                chart: {
                    type: 'radialBar',
                    offsetY: -20,
                    sparkline: {
                    enabled: true
                    }
                },
                plotOptions: {
                    radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                        show: false
                        },
                        value: {
                        offsetY: -2,
                        fontSize: '22px'
                        }
                    }
                    }
                },
                grid: {
                    padding: {
                    top: -10
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91]
                    },
                },
                labels: ['Average Results'],
                },
            },

            downloadPageSizePieChart: {
                series: [0, 0, 0, 0, 0],
                chartOptions: {
                chart: {
                    type: 'donut',
                },
                labels: ["HTML", "CSS", "JS", "Images", "Others"],
                title: {
                    text: ""
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                    }
                }]
                }
            },

            downloadGzipPageSizePieChart: {
                series: [0, 0, 0, 0, 0],
                chartOptions: {
                chart: {
                    type: 'donut',
                },
                labels: ["HTML", "CSS", "JS", "Images", "Others"],
                title: {
                    text: ""
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                    }
                }]
                }
            },
            // END SEO Audit Performance categories

            // SEO Audit Social categories
            social_categories: [
                { "key": "facebookLink", "title": "Facebook Connected", "description": "" },
                { "key": "openGraphTags", "title": "Facebook Open Graph Tags", "subtitle": "", "description": "" },
                { "key": "facebookPixel", "title": "Facebook Pixel", "subtitle": "Facebook's Pixel is a useful piece of analytics code that allows you to retarget visitors if you decide to run Facebook Ads in future.", "description": "" },
                { "key": "twitterLink", "title": "Twitter Connected", "description": "" },
                { "key": "twitterActivity", "title": "Twitter Activity", "subtitle": "", "description": "" },
                { "key": "twitterTags", "title": "Twitter Cards", "subtitle": "", "description": "" },
                { "key": "instagramLink", "title": "Instagram Connected", "subtitle": "", "description": "" },
                { "key": "youtubeLink", "title": "Youtube Connected", "subtitle": "", "description": "" },
                { "key": "youtubeActivity", "title": "Youtube Activity", "subtitle": "", "description": "" },
                { "key": "linkedInLink", "title": "LinkedIn Connected", "subtitle": "", "description": "" }
            ],
            // END SEO Audit Social categories

            // SEO Audit Social categories
            technology_categories: [
                { "key": "technologies", "title": "Technology List", "description": "" },
                { "key": "ip", "title": "Server IP Address", "subtitle": "", "description": "" },
                { "key": "dns", "title": "DNS Servers", "subtitle": ".", "description": "" },
                { "key": "webServer", "title": "Web Server", "description": "" },
                { "key": "charset", "title": "Charset Activity", "subtitle": "", "description": "" }
            ],
            // END SEO Audit Social categories
        }
    },
    methods: {
        showSeoOnPageCategoryDescription(title, description) {
            this.seo_on_page_category_description = description;
            this.seo_on_page_category_title = title;
            this.show_seo_on_page_category_description = true;
        },
        runCreated() {
          let self = this;

          if (this.this_search.properties.data && this.this_search.properties.data.output) {

            this.overallDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.overall.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.overall.grade])];
            this.onPageSeoDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.seo.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.seo.grade])];
            this.linksDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.links.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.links.grade])];
            this.usabilityDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.ui.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.ui.grade])];
            this.performanceDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.performance.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.performance.grade])];
            this.socialDoughnut.series = [this.seo_audit_grades[this.this_search.properties.data.output.scores.social.grade], (100 - this.seo_audit_grades[this.this_search.properties.data.output.scores.social.grade])];

            this.pageInsightsMobileDoughnut.series = [this.this_search.properties.data.output.mobilePageInsights.data.score, 100 - this.this_search.properties.data.output.mobilePageInsights.data.score];
            this.pageInsightsDesktopDoughnut.series = [this.this_search.properties.data.output.desktopPageInsights.data.score, 100 - this.this_search.properties.data.output.desktopPageInsights.data.score];

            this.radarChart.series[0].data[0] = this.seo_audit_grades[this.this_search.properties.data.output.scores.seo.grade];
            this.radarChart.series[0].data[1] = this.seo_audit_grades[this.this_search.properties.data.output.scores.links.grade];
            this.radarChart.series[0].data[2] = this.seo_audit_grades[this.this_search.properties.data.output.scores.social.grade];
            this.radarChart.series[0].data[3] = this.seo_audit_grades[this.this_search.properties.data.output.scores.ui.grade];
            this.radarChart.series[0].data[4] = this.seo_audit_grades[this.this_search.properties.data.output.scores.performance.grade];

            this.downloadPageSizePieChart.series[0] = parseFloat((this.this_search.properties.data.output.pageSize.data.htmlSize/1024/1024).toFixed(2));
            this.downloadPageSizePieChart.series[1] = parseFloat((this.this_search.properties.data.output.pageSize.data.cssSize/1024/1024).toFixed(2));
            this.downloadPageSizePieChart.series[2] = parseFloat((this.this_search.properties.data.output.pageSize.data.jsSize/1024/1024).toFixed(2));
            this.downloadPageSizePieChart.series[3] = parseFloat((this.this_search.properties.data.output.pageSize.data.imageSize/1024/1024).toFixed(2));
            this.downloadPageSizePieChart.series[4] = parseFloat((this.this_search.properties.data.output.pageSize.data.otherSize/1024/1024).toFixed(2));

            this.downloadPageSizePieChart.chartOptions.labels[0] = "HTML (" + parseFloat((this.this_search.properties.data.output.pageSize.data.htmlSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadPageSizePieChart.chartOptions.labels[1] = "CSS (" + parseFloat((this.this_search.properties.data.output.pageSize.data.cssSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadPageSizePieChart.chartOptions.labels[2] = "JS (" + parseFloat((this.this_search.properties.data.output.pageSize.data.jsSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadPageSizePieChart.chartOptions.labels[3] = "Images (" + parseFloat((this.this_search.properties.data.output.pageSize.data.imageSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadPageSizePieChart.chartOptions.labels[4] = "Other (" + parseFloat((this.this_search.properties.data.output.pageSize.data.otherSize/1024/1024).toFixed(2)) + " MB)";

            this.downloadPageSizePieChart.chartOptions.title.text = "Total " + parseFloat((this.this_search.properties.data.output.pageSize.data.totalSize/1024/1024).toFixed(2)) + " MB";

            this.downloadGzipPageSizePieChart.series[0] = parseFloat((this.this_search.properties.data.output.gzip.data.htmlOriginalSize/1024/1024).toFixed(2));
            this.downloadGzipPageSizePieChart.series[1] = parseFloat((this.this_search.properties.data.output.gzip.data.cssOriginalSize/1024/1024).toFixed(2));
            this.downloadGzipPageSizePieChart.series[2] = parseFloat((this.this_search.properties.data.output.gzip.data.jsOriginalSize/1024/1024).toFixed(2));
            this.downloadGzipPageSizePieChart.series[3] = parseFloat((this.this_search.properties.data.output.gzip.data.imageOriginalSize/1024/1024).toFixed(2));
            this.downloadGzipPageSizePieChart.series[4] = parseFloat((this.this_search.properties.data.output.gzip.data.otherOriginalSize/1024/1024).toFixed(2));

            this.downloadGzipPageSizePieChart.chartOptions.labels[0] = "HTML (" + parseFloat((this.this_search.properties.data.output.gzip.data.htmlOriginalSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadGzipPageSizePieChart.chartOptions.labels[1] = "CSS (" + parseFloat((this.this_search.properties.data.output.gzip.data.cssOriginalSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadGzipPageSizePieChart.chartOptions.labels[2] = "JS (" + parseFloat((this.this_search.properties.data.output.gzip.data.jsOriginalSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadGzipPageSizePieChart.chartOptions.labels[3] = "Images (" + parseFloat((this.this_search.properties.data.output.gzip.data.imageOriginalSize/1024/1024).toFixed(2)) + " MB)";
            this.downloadGzipPageSizePieChart.chartOptions.labels[4] = "Other (" + parseFloat((this.this_search.properties.data.output.gzip.data.otherOriginalSize/1024/1024).toFixed(2)) + " MB)";

            this.downloadGzipPageSizePieChart.chartOptions.title.text = "Total " + parseFloat((this.this_search.properties.data.output.gzip.data.totalOriginalSize/1024/1024).toFixed(2)) + " MB";
          }
          else {
            setTimeout(function() {
              let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + self.$route.query.s + '&p=' + self.this_search.place_id + '&si=' + self.this_search.id + '&loads=' + this.loads;
      
              axios.get(url, {

              }).then(function(response) {
                self.this_search = response.data.search;
                self.runCreated();
              });
            }, 1000);
          }
        }
    },
    created() {
        this.this_search = this.search;
        this.runCreated();
    }
  }
  </script>