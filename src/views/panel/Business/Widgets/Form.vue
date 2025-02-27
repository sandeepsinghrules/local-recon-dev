<template>

  <panel-navigation>

    <h1 class="text-lg font-semibold mb-4">Create Widget</h1>

    <hr class="border-b border-gray-100 mb-3">

	<v-skeleton-loader v-if="!widgetLoaded && !$route.params.action" type="article, article, article, article, article"></v-skeleton-loader>

    <div v-if="widgetLoaded || $route.params.action" class="flex flex-row flex-wrap -mx-3">

      <div class="w-full lg:w-1/3 md:w-1/3 sm:w-1/3 mb-4 pl-3">
        <v-text-field
	      label="Widget Name"
	      hide-details="true"
		  v-model="widget.name"
	    ></v-text-field>

    	<hr class="border-b border-gray-100 mb-3">

	    <v-tabs>
		    <v-tab>Settings</v-tab>
		    <v-tab>Embed Code</v-tab>
			<v-tab>Schema</v-tab>
	        
	        <v-tab-item class="widget-form">
	          	<div class="bg-gray-100 rounded p-2" v-if="widgetLoaded">

					<v-expansion-panels accordion>
						<v-expansion-panel>
							<v-expansion-panel-header>General Settings</v-expansion-panel-header>
							<v-expansion-panel-content>

								<v-switch v-if="me"
									v-model="widget.settings.show_widget_on_website"
									label="Show widget on website"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.show_widget_on_mobile"
									label="Show widget on mobile"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.auto_add_new_reviews"
									label="Auto add new reviews"
								></v-switch>

								<label class="mt-3">Font Family</label>

								<v-select
									v-model="widget.settings.font_family"
									flat
									solo-inverted
									hide-details
									:items="font_family_values"
									prepend-inner-icon="mdi-text"
								></v-select>
							

							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Layout</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-radio-group
									class="mt-2"
									row
									v-model="widget.template"
									>
									<v-radio
										label="Embed - Grid"
										value="embed-grid"
									></v-radio>
									<v-radio
										label="Embed - Column"
										value="embed-column"
									></v-radio>
									<v-radio
										label="Embed - Page"
										value="embed-page"
									></v-radio>
									<v-radio
										label="Embed - Table"
										value="embed-table"
									></v-radio>
									<v-radio
										label="Embed - Slider"
										value="embed-slider"
									></v-radio>
									<v-radio
										label="Embed - Carousel"
										value="embed-carousel"
									></v-radio>

									<v-radio
										label="Hover 1"
										value="hover-1"
									></v-radio>
									<v-radio
										label="Hover 2"
										value="hover-2"
									></v-radio>
									<v-radio
										label="Hover 3"
										value="hover-3"
									></v-radio>
									<v-radio
										label="Hover 4"
										value="hover-4"
									></v-radio>
									<v-radio
										label="Hover 5"
										value="hover-5"
									></v-radio>
									<v-radio
										label="Hover 6"
										value="hover-6"
									></v-radio>
									</v-radio-group>

									<div v-if="widget.template == 'hover-1'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_1_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_1_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-2'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_2_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_2_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-3'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_3_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_3_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-4'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_4_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_4_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-5'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_5_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_5_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-6'" class="mb-5">
										<label class="mt-5">Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_6_title"
											label=""
										></v-text-field>

										<label class="mt-5">Sub Title </label>

										<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
											v-model="widget.settings.hover_6_subtitle"
											label=""
										></v-text-field>
									</div>

									<div v-if="widget.template == 'hover-1' || widget.template == 'hover-2' || widget.template == 'hover-3' || widget.template == 'hover-4' || widget.template == 'hover-5' || widget.template == 'hover-6'" class="bg-gray-100 rounded p-2 mb-4">
										<div class="bg-gray-100 text-xs rounded">
											<div class="text-gray-600 mb-2"><span class="font-semibold p-1 text-gray-900">[reviews_nr]</span> will be replaced by the number of total reviews</div>
											<div class="text-gray-600"><span class="font-semibold p-1 text-gray-900">[rating_nr]</span> will be replaced with the current average rating</div>
										</div>
									</div>

									<div class="float-left has-color-picker pr-4">
										<label style="font-size: 13px;">Star Color</label>
										<br />

										<v-menu offset-y :close-on-content-click="false">
											<template v-slot:activator="{ on }">
											<v-btn
												:color="widget.settings.star_color"
												dark
												v-on="on"
											>
											</v-btn>
											</template>
											<v-color-picker
											v-model="widget.settings.star_color"
											mode="hexa"
											class="mx-auto"
											style="width: 200px"
											></v-color-picker>
										</v-menu>
									</div>


									<div class="float-left has-color-picker pr-4">
										<label style="font-size: 13px;">Background</label>
										<br />

										<v-menu offset-y :close-on-content-click="false">
											<template v-slot:activator="{ on }">
											<v-btn
												:color="widget.settings.background_color"
												dark
												v-on="on"
											>
											</v-btn>
											</template>
											<v-color-picker
											v-model="widget.settings.background_color"
											mode="hexa"
											class="mx-auto"
											style="width: 200px"
											></v-color-picker>
										</v-menu>
									</div>


									<div class="float-left has-color-picker">
										<label style="font-size: 13px;">Text Color</label>
										<br />

										<v-menu offset-y :close-on-content-click="false">
											<template v-slot:activator="{ on }">
											<v-btn
												:color="widget.settings.text_color"
												dark
												v-on="on"
											>
											</v-btn>
											</template>
											<v-color-picker
											v-model="widget.settings.text_color"
											mode="hexa"
											class="mx-auto"
											style="width: 200px"
											></v-color-picker>
										</v-menu>
									</div>

									<br clear="all" /><br clear="all" />

									<div class="float-left has-color-picker pr-4">
										<label style="font-size: 13px;">Footer Text Color</label>
										<br />

										<v-menu offset-y :close-on-content-click="false">
											<template v-slot:activator="{ on }">
											<v-btn
												:color="widget.settings.footer_text_color"
												dark
												v-on="on"
											>
											</v-btn>
											</template>
											<v-color-picker
											v-model="widget.settings.footer_text_color"
											mode="hexa"
											class="mx-auto"
											style="width: 200px"
											></v-color-picker>
										</v-menu>
									</div>

									<div class="float-left has-color-picker pr-4">
										<label style="font-size: 13px;">Footer Link Color</label>
										<br />

										<v-menu offset-y :close-on-content-click="false">
											<template v-slot:activator="{ on }">
											<v-btn
												:color="widget.settings.footer_link_color"
												dark
												v-on="on"
											>
											</v-btn>
											</template>
											<v-color-picker
											v-model="widget.settings.footer_link_color"
											mode="hexa"
											class="mx-auto"
											style="width: 200px"
											></v-color-picker>
										</v-menu>
									</div>

									<br clear="all" />
									<br clear="all" />
									
									<template v-if="widget.template != 'embed-column' && widget.template != 'embed-page' && widget.template != 'embed-table' && widget.template != 'embed-slider' && widget.template != 'embed-grid' && widget.template != 'embed-carousel'">
										<label>Position</label>

										<v-select
											v-model="widget.settings.align"
											flat
											solo-inverted
											hide-details
											:items="align_values"
											prepend-inner-icon="mdi-format-horizontal-align-center"
										></v-select>
										
										<br />
									</template>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Header</v-expansion-panel-header>
							<v-expansion-panel-content>
								<label>Header alignment</label>

								<v-btn-toggle
									v-model="widget.settings.header_alignment"
									borderless
								>
									<v-btn value="left" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon right>
										mdi-format-align-left
									</v-icon>
									</v-btn>

									<v-btn value="center" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon right>
										mdi-format-align-center
									</v-icon>
									</v-btn>

									<v-btn value="right" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon right>
										mdi-format-align-right
									</v-icon>
									</v-btn>
								</v-btn-toggle>

								<label class="mt-5">Space between header and feed</label>

								<v-select
									v-model="widget.settings.space_between_header_and_feed"
									flat
									solo-inverted
									hide-details
									:items="space_between_header_and_feed_values"
								></v-select>

								<label class="mt-5">Title </label>

								<v-switch v-if="me"
									v-model="widget.settings.show_title"
									label="Show title"
								></v-switch>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
									v-model="widget.settings.title"
									label=""
									required
								></v-text-field>

								<label class="mt-5">Title Font Size</label>

								<v-select
									v-model="widget.settings.title_font_size"
									flat
									solo-inverted
									hide-details
									:items="title_font_sizes"
								></v-select>

								<label class="mt-5">Title Color</label>
								<v-menu offset-y :close-on-content-click="false">
									<template v-slot:activator="{ on }">
									<v-btn class="ml-2"
										:color="widget.settings.title_color"
										dark
										v-on="on"
									>
									</v-btn>
									</template>
									<v-color-picker
									v-model="widget.settings.title_color"
									mode="hexa"
									class="mx-auto"
									style="width: 200px"
									></v-color-picker>
								</v-menu>

								<div style="clear: both;"></div>

								<label class="mt-5">Subtitle</label>

								<v-switch v-if="me"
									v-model="widget.settings.show_subtitle"
									label="Show subtitle"
								></v-switch>

								<label class="mt-5">Subtitle Font Size</label>

								<v-select
									v-model="widget.settings.subtitle_font_size"
									flat
									solo-inverted
									hide-details
									:items="subtitle_font_sizes"
								></v-select>

								<label class="mt-5">Subtitle Color</label>
								<v-menu offset-y :close-on-content-click="false">
									<template v-slot:activator="{ on }">
									<v-btn class="ml-2"
										:color="widget.settings.subtitle_color"
										dark
										v-on="on"
									>
									</v-btn>
									</template>
									<v-color-picker
									v-model="widget.settings.subtitle_color"
									mode="hexa"
									class="mx-auto"
									style="width: 200px"
									></v-color-picker>
								</v-menu>

								<div style="clear: both;"></div>

							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Feed</v-expansion-panel-header>
							<v-expansion-panel-content>

								<div v-show="widget.template != 'embed-slider' && widget.template != 'embed-carousel'">
									<label>Padding between reviews</label>

									<v-select
										v-model="widget.settings.padding_between_reviews"
										flat
										solo-inverted
										hide-details
										:items="padding_between_reviews_options"
									></v-select>
								</div>

								<div v-show="widget.template == 'embed-slider' || widget.template == 'embed-carousel'">
									<label>Autoplay Span</label>

									<v-select
										v-model="widget.settings.auto_play_span"
										flat
										solo-inverted
										hide-details
										:items="auto_play_span_options"
									></v-select>
								</div>

								<div v-show="widget.template == 'embed-grid'">
									<label class="mt-5">Columns</label>

									<v-select
										v-model="widget.settings.feed_columns"
										flat
										solo-inverted
										hide-details
										:items="feed_columns_options"
									></v-select>
								</div>

								<label class="mt-5">Review Box</label>

								<v-select
									v-model="widget.settings.reviewer_name"
									flat
									solo-inverted
									hide-details
									:items="reviewer_name_options"
								></v-select>

								<v-switch v-if="me"
									v-model="widget.settings.show_profile_pic"
									label="Show avatar"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.show_date"
									label="Show date"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.show_review_site"
									label="Show review site"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.show_stars"
									label="Show stars"
								></v-switch>

								<v-switch v-if="me"
									v-model="widget.settings.show_only_profile_pic"
									label="Only show reviews with profile pic"
								></v-switch>

								<label class="mt-5">Review text</label>

								<v-radio-group
									row
									v-model="widget.settings.feed_review_text"
									>
									<v-radio
										label="Full Text"
										value="full-text"
									></v-radio>
									<v-radio
										label="Short Text"
										value="short-text"
									></v-radio>
								</v-radio-group>

								<label class="">Text toggle</label>

								<v-switch
									v-model="widget.settings.show_text_toggle"
									label="Show text toggle"
								></v-switch>

								<v-text-field style="margin-top: -10px; margin-bottom: -20px;"
									v-model="widget.settings.text_toggle"
									label=""
									required
									value="See More"
								></v-text-field>

								<label class="mt-5">Pagination</label>

								<v-radio-group
									row
									v-model="widget.settings.feed_pagination"
									>
									<v-radio
										label="Pagination"
										value="pagination"
									></v-radio>
									<v-radio
										label="Button"
										value="button"
									></v-radio>
								</v-radio-group>

								<template v-if="me && !fetchingListings">

								<label class="mt-5">Sources</label>

								<div v-if="listings.length > 0 && widget.settings.platforms" class="mb-6 mt-2">
								<div v-for="reviewplatform in listings" :key="reviewplatform.id" class="bg-gray-100 rounded-l flex flex-row items-center justify-between bg-white rounded w-full mb-2">

									<div class="flex flex-row items-center truncate">
									<div class="w-12 flex-shrink-0">
										<img :src="getIconUrl(reviewplatform.url)" alt="" class="rounded-l border border-gray-100">
									</div>
									<div class="truncate p-3 text-gray-400">
										<div class="float-left">
										<v-checkbox
											:value="reviewplatform.id"
											v-model="widget.settings.platforms"
											hide-details
										>
										</v-checkbox>
										</div>

										<span class="text-gray-900">{{ getHostname(reviewplatform.url) }}</span>{{ getPathname(reviewplatform.url) }}</div>
									</div>

								</div>

								<div v-if="listings.length == 0">
									You don't have any review platforms.
								</div>
								</div>

							</template>
								
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Filters</v-expansion-panel-header>
							<v-expansion-panel-content>

								<label>Reviews Sorting</label>

								<v-select
									v-model="widget.settings.reviews_sorting"
									flat
									solo-inverted
									hide-details
									:items="sorting_values"
									prepend-inner-icon="mdi-sort"
									class="mt-1"
								></v-select>

								<label class="mt-5">Minimum rating</label>

								<v-select
									v-model="widget.settings.minimum_rating"
									flat
									solo-inverted
									hide-details
									:items="ratings_values"
									prepend-inner-icon="mdi-star"
								></v-select>

								<label class="mt-5">Filter by keyword</label>

								<v-combobox
									v-model="widget.settings.filter_keywords"
									:items="[]"
									label=""
									multiple
									chips
								></v-combobox>

								<p class="text-xs text-gray-600">Use a comma (,) to filter reviews by one OR more keywords, and minus (-) to exclude. Press 'Enter' to apply a keyword.</p>
								
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Custom CSS</v-expansion-panel-header>
							<v-expansion-panel-content>
								
								<div class="w-full">
										<textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" style="border: solid 1px #e0e0e0 !important;" maxlength="1000" v-model="widget.settings.custom_css" placeholder="/* Example */
h3.reviewer-title {
	font-size: 15px;
}" ></textarea>

										<p class="text-xs text-gray-700 mt-2">Enter custom CSS to change the UI of the widget.</p>
									</div>

							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
		          	
                    <br />
		        </div>

				<br />

				<v-btn
					class="ma-2"
					color="success"
					@click="saveWidget()"
				>
					Save Widget
					<template v-slot:loader>
						<span class="custom-loader">
							<v-icon light>mdi-cached</v-icon>
						</span>
					</template>
				</v-btn>

				<v-chip
					v-if="saved"
					class="ma-2"
					color="green"
					outlined
					@click="saved = false"
				>
					<v-icon left>
						mdi-check
					</v-icon>
					Saved
				</v-chip>
	        </v-tab-item>
	        
	        <v-tab-item>
				<br />
				<p>Copy and paste the following code snippet into your website, before the end of the &lt;body&gt; tag.</p>

	        	<div class="bg-gray-100 rounded p-1">
	          		<div class="tab-pane-content p-2">
						<div class="card card-code" style="word-break: break-all; padding: 10px; font-size: 12px;">
							&lt;script src="{{ getEmbedCode() }}" type="text/javascript"&gt;&lt;/script&gt;
						</div>
					</div>
	          	</div>

				  <br />

				<v-btn 
					v-clipboard:copy="message"
					v-clipboard:success="onCopy"
					v-clipboard:error="onError"

					depressed
      				color="primary"
				>
					Copy Code
				</v-btn>

	        </v-tab-item>
	        
	        <v-tab-item>
				<br />
				<p>Paste this code in your website's &lt;head&gt; section.</p>

	        	<div v-if="widgetLoaded" class="bg-gray-100 rounded p-1">
	          		<div class="tab-pane-content p-2">
						<div class="card card-code" style="word-break: break-all; padding: 10px; font-size: 12px;">
							&lt;script type="application/ld+json" class="rg-reviews-schema"&gt;<div v-html="getReviewsSchemaCode()"></div>&lt;/script&gt;
						</div>
					</div>
	          	</div>

				  <br />

				<v-btn v-if="widgetLoaded" 
					v-clipboard:copy="getMessage2()"
					v-clipboard:success="onCopy"
					v-clipboard:error="onError"

					depressed
      				color="primary"
				>
					Copy Code
				</v-btn>

	        </v-tab-item>
        
		</v-tabs>
      </div>

      <div class="w-full lg:w-2/3 md:w-2/3 sm:w-2/3 mb-4 px-3">
        <div class="mb-4">
          <h2 class="font-bold text-gray-800">Preview</h2>
        </div>
        <div class="w-full">
          	<!-- <iframe id="preview_iframe" :src="'/widgets/preview/' + $route.params.token"></iframe> -->

			<div style="width: 100%; min-height: 500px; position: relative; padding-top: 20px;">
				<WidgetsRender :preview_widget="widget" :fw="fw" :key="widgetPreviewKey" />
			</div>

			<br />
			<v-row v-show="widget.template != 'embed-column' && widget.template != 'embed-page' && widget.template != 'embed-table' && widget.template != 'embed-slider' && widget.template != 'embed-grid' && widget.template != 'embed-carousel'">
				<v-col
					cols="12"
					md="8"
				>
					<v-text-field
						label="Preview URL"
						hide-details="true"
						v-model="preview_url"
						placeholder="https://..."
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					md="4"
					style="padding-top: 25px;"
				>
					<v-btn
					depressed
					color="primary"
					style="width: 100%;"
					@click="previewUrl()"
					>
						Preview
					</v-btn>
				</v-col>
			</v-row>
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
import WidgetsRender from '@/views/panel/Business/Widgets/Render/Index.vue'

export default {
  metaInfo () {
    return {
      title: "Widgets Edit | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
	WidgetsRender
  },
  data () {
    return {
      saved: false,
      widget: {
		name: "",
      	settings: {
			star_color: "#FFAA00",
			background_color: "#FFFFFF",
			text_color: "#000000",
      		minimum_rating: "5 stars",
      		reviews_sorting: "Most Recent First"
      	}
      },
	  widgetPreviewKey: 1,
	  fw: null,
	  widgetLoaded: false,
	  font_family_values: [
		  "Open Sans (Google)",
		  "Source Sans Pro (Google)",
		  "Roboto (Google)",
		  "Lato (Google)",
		  "PT Sans (Google)",
		  "EB Garamond (Google)",
		  "Raleway (Google)",
		  "Ubuntu (Google)",
		  "Montserrat (Google)",
		  "Courgette (Google)",
		  "Arial",
		  "Helvetica",
		  "Sans-serif",
	  ],
	  space_between_header_and_feed_values: ['0px','5px','10px','15px','20px','25px','30px','35px','40px','45px','50px','55px','60px','65px','70px','75px','80px','85px','90px','95px','100px','105px','110px','115px','120px','125px','130px','135px','140px','145px','150px','155px','160px','165px','170px','175px','180px','185px','190px','195px','200px'],
	  title_font_sizes: ['10px','11px','12px','13px','14px','15px','16px','17px','18px','19px','20px','21px','22px','23px','24px','25px','26px','27px','28px','29px','30px','31px','32px','33px','34px'],
      subtitle_font_sizes: ['10px','11px','12px','13px','14px','15px','16px','17px','18px','19px','20px','21px','22px','23px','24px','25px','26px','27px','28px','29px','30px','31px','32px','33px','34px'],
	  padding_between_reviews_options: ['None','1px','2px','3px','4px','5px','6px','7px','8px','9px','10px','15px','20px','25px','30px'],
	  auto_play_span_options: ['No autoplay','1.5s','2s','2.5s','3s','3.5s','4s','4.5s','5s','5.5s','6s','6.5s','7s','7.5s','8s','8.5s','9s','9.5s','10s','15s','30s','45s','60s','90s','120s'],
	  feed_columns_options: ["Dynamic", "1", "2", "3", "4", "5"],
	  reviewer_name_options: ["Show name", "Show first name", "Hide name"],
      ratings_values: [
      	"5 stars",
      	"4 stars",
      	"3 stars",
      	"2 stars",
      	"All",
      ],
      sorting_values: [
      	"Most Recent First",
		"Oldest First",
		"Best Rating First",
		"Reviews With Text First",
      	"Random",
      ],
	  align_values: [
		  "Left",
		  "Right"
	  ],
	  message: '<script src="' + this.getEmbedCode() + '" type="text/javascript"><\/script>',
	  preview_url: ""
    }
  },
  computed: {
    ...mapState({
      listings: state => state.listings.listings,
      fetchingListings: state => state.listings.fetchingListings,
      me: state => state.me.me
    })
  },
  methods: {
	  getMessage2: function() {
		  return '<script type="application/ld+json" class="rg-reviews-schema">' + this.getReviewsSchemaCode2() +  '<\/script>';
	  },
	onCopy: function (e) {
		this.$swal({
			title: "Copied",
			text: "Code copied successfully!",
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
			// let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/widgets/get-widget/' + this.$route.params.token, {

			// } , {
			// headers: {
			// 	'Authorization': 'Bearer ' + this.$store.state.auth.jwt
			// },
			// })

			let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + this.$route.params.token, {

			} , {
			headers: {
				'Authorization': 'Bearer ' + this.$store.state.auth.jwt
			},
			})
			
			this.widget = response.data.widget_data.widget
            this.widget_data = response.data.widget_data
			
			// this.widget = response.data.widget
			this.widgetLoaded = true
		}catch(e){
			console.log(e)
		}
	},
	getEmbedCode: function() {
		let self = this

		let url = ((process.env.NODE_ENV == 'development') ? "http://localhost:8000" : "https://" + window.location.host) + "/js/v1/embed.js?token=" + self.$route.params.token;

		// Dev
		if (process.env.NODE_ENV == 'development') {
			url = url + "&env=dev";
		}

		return url;
	},
	getReviewsSchemaCode: function() {
		console.log('this.widget_data', this.widget_data);

		return "{<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;\"@context\": \"http://schema.org\",<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;\"@type\": \"Product\",<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;\"name\": \"" + this.widget.name + "\",<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;\"aggregateRating\":<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;{<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"@type\": \"AggregateRating\",<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"ratingValue\": \"" + this.widget_data.average_rating + "\",<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"reviewCount\": \"" + this.widget_data.total_reviews + "\"<br />\
    &nbsp;&nbsp;&nbsp;&nbsp;}<br />\
}";
	},
	getReviewsSchemaCode2: function() {
		console.log('this.widget_data', this.widget_data);

		return "\n{\n\
    \"@context\": \"http://schema.org\",\n\
    \"@type\": \"Product\",\n\
    \"name\": \"" + this.widget.name + "\",\n\
    \"aggregateRating\":\n\
    {\n\
		\"@type\": \"AggregateRating\",\n\
		\"ratingValue\": \"" + this.widget_data.average_rating + "\",\n\
		\"reviewCount\": \"" + this.widget_data.total_reviews + "\"\n\
    }\n\
}\n";
	},
	saveWidget: async function() {
		this.saved = true
		let self = this
		try {
			let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/me/widgets/update-widget/' + this.$route.params.token, {
				widget: self.widget
			} , {
			headers: {
					'Authorization': 'Bearer ' + this.$store.state.auth.jwt
				},
			})
			setTimeout(function() {

				self.saved = false
			}, 2000)
		}catch(e){
			console.log(e)
		}
	},
	updatePreview: function() {
		if (this.widget.template == "embed-column" || this.widget.template == "embed-page" || this.widget.template == "embed-table" || this.widget.template == "embed-slider" || this.widget.template == "embed-grid" || this.widget.template == "embed-carousel") {
			this.align_values = ["Full"];
			this.widget.settings.align = "Full";
		}
		else {
			this.align_values = ["Left", "Right"];
			if (this.widget.settings.align == "Full")
				this.widget.settings.align = "Left";
		}

		let widget_stringified = JSON.stringify(this.widget);

		let widget_encoded = btoa(unescape(encodeURIComponent(widget_stringified)));
		this.fw = widget_encoded;

		this.widgetPreviewKey++;

		// if (document.getElementById('preview_iframe')) {
		// 	let widget_stringified = JSON.stringify(this.widget);
		// 	let widget_encoded = btoa(widget_stringified);
		// 	let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded;

		// 	document.getElementById('preview_iframe').src = new_preview_url;
		// }
	},
	previewUrl() {
		let widget_stringified = JSON.stringify(this.widget);
		let widget_encoded = btoa(widget_stringified);
		let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded + "&url=" + encodeURIComponent(this.preview_url);
	
		window.open(new_preview_url)
	}
  },
  created() {
    this.$store.state.listings.fetchingListings = true
    this.$store.dispatch('listings/fetch', { dashboard: false })
    this.getWidget()

	if (this.$route.params.action) {
		setTimeout(function() {
			document.querySelectorAll('.v-tabs div[role="tab"]')[1].click()
		}, 20);
	}

	// let new_height = window.height - 200;
	// document.getElementById("preview_iframe").style.height = new_height + "px";
  },
	watch: {
		'widget.template': {
			handler() {
				this.updatePreview()
			}
		},
		'widget.settings': {
			deep: true,

			handler() {
				this.updatePreview()
			}
		}
	}
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&family=Source+Sans+Pro&family=Roboto&family=Lato&family=PT+Sans&family=EB+Garamond&family=Raleway&family=Ubuntu&family=Montserrat&family=Courgette');

  .widget-form input, select {
    border-style: solid;
  }

  .widget-form .has-color-picker button {
  	width: 90px !important;
  }

  .widget-form #preview_iframe {
	  width: 100%;
	  height: 650px;
	  border: solid 1px #CCCCCC;
  }

  .widget-form .v-input--radio-group.v-input--radio-group--row .v-radio {
	  width: 130px;
  }

  .widget-form .v-label {
	  padding-top: 10px !important;
  }

  .widget-form .v-input--selection-controls.v-input--switch {
	  height: 35px;
  }

  .widget-form label {
	  font-weight: bold;
	  font-size: 14px;
	  /* margin-top: 10px; */
  }
</style>