<template>

  <panel-navigation>

      <div v-if="source_form_show" @click.self="source_form_show = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
        <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

            <div class="p-6">

                <h2 v-if="source_form_mode == 'add'" class="text-lg font-semibold text-gray-800 mb-3">Add a Source</h2>
                <h2 v-if="source_form_mode == 'edit'" class="text-lg font-semibold text-gray-800 mb-3">Edit Source</h2>

                <hr class="border-b border-gray-100 mb-4">

                <div v-if="source_form_error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <div v-html="source_form_error"></div>
                </div>

                <div class="mb-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    URL
                </label>
                <input v-model="source_form_url" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                </div>

                <p class="text-xs text-gray-700">You can add any review platform (Google Maps, Facebook, Yelp, Tripadvisor, Zomato etc.), even add your own custom platforms.</p>

                <div v-if="source_form_url && !valid_url" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 mt-1" role="alert">
                    <div>
                        We could not find that platform. In order to add a custom platform, please add a site name and upload an icon for it. Recomended sizes: 48x48px OR 128x128px

                        <div class="mt-3 mb-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Site Name
                        </label>
                        <input v-model="source_site_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" placeholder="Add your custom site name here..." maxlength="12">
                        </div>
                        
                        <v-file-input
                            accept="image/*"
                            label="Click here to upload"
                            style="width: calc(100% - 50px);"
                            v-model="file_source_logo"
                            @change="onUploadSourceLogo"
                        ></v-file-input>

                        <div v-if="source_logo" style="padding-top: 0px;">
                            <img :src="source_logo" alt="" style="display: inline-block; max-height: 40px; margin-right: 20px; border: solid 1px #CCCCCC; padding: 2px;">
                        </div>

                        <!-- URL is invalid, please enter a valid URL.
                    
                        <div v-if="current_url_format" class="mt-2">
                            <strong>Correct URL format for this platform:</strong>
                            <br />
                            {{ current_url_format }}
                        </div> -->
                    </div>
                </div>

            </div>

            <div class="bg-gray-100 rounded-b-lg px-6 py-4">

                <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="source_form_show = false">
                    Cancel
                </button>

                <button v-if="source_form_url" class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" @click="addSource()">
                    Save
                </button>

            </div>

        </div>
    </div>
      
    <!-- <div style="float: right; margin-top: -7px;">
        <a :href="getFunnelLink()" target="review-funnel-link"><i class="fa fa-link"></i> {{ getFunnelLink() }}</a>
    </div> -->

    <h1 class="text-lg font-semibold mb-4">Review Funnel Editor</h1>

    <hr class="border-b border-gray-100 mb-3">

	<v-skeleton-loader v-if="!funnelLoaded && !$route.params.action" type="article, article, article, article, article"></v-skeleton-loader>

    <div v-if="funnelLoaded || $route.params.action" class="flex flex-row flex-wrap -mx-3">

      <div class="w-full lg:w-1/3 md:w-1/3 sm:w-1/3 mb-4 pl-3">
	          	<div class="bg-gray-100 rounded p-2" v-if="funnelLoaded">

					<v-expansion-panels accordion>
						<v-expansion-panel>
							<v-expansion-panel-header>General Settings</v-expansion-panel-header>
							<v-expansion-panel-content>

                                <label>Brand/Business Name </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.company_name"
									label=""
									required
								></v-text-field>

                                <label class="mt-5">URL </label>

                                <div v-if="!edit_url">
                                    <a :href="getFunnelLink()" target="review-funnel-link"><i class="fa fa-link"></i> {{ getFunnelLink() }}</a>

                                    <a href="javascript: void(0);" @click="edit_url = true" class="ml-3 green--text lighten-2"><i class="fa fa-edit"></i></a>

                                    <br />
                                </div>

                                <div v-if="edit_url">
                                    <v-text-field style="margin-top: -20px; margin-bottom: -20px;"
                                        :prefix="getFunnelPrefix()"
                                        v-model="short_name"
                                        label=""
                                        required
                                        :append-icon="'mdi-check'"
                                        clear-icon="mdi-close-circle"
                                        clearable
                                        @click:clear="cancelEditShortName()"
                                        @click:append="saveShortName()"
                                    ></v-text-field>

                                    <v-alert
                                        v-if="short_name_error"
                                        color="red lighten-2 white--text mt-3"
                                    >
                                        {{ short_name_error }}
                                    </v-alert>
                                </div>

								<label class="mt-5">Font Family</label>

								<v-select
									v-model="review_funnel.font_family"
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

                                <label>Logo </label>

                                <v-file-input
                                    accept="image/*"
                                    label="Click here to upload"
                                    style="width: calc(100% - 50px);"
                                    v-model="file"
                                    @change="onUpload"
                                    ></v-file-input>

                                    <div v-if="review_funnel.logo" style="padding-top: 0px;">
                                    <span v-if="review_funnel.logo" style="text-align: center;">
                                        <v-btn
                                        depressed
                                        color="error"
                                        
                                        small
                                        @click="review_funnel.logo = ''; removeLogo()"
                                        >
                                        Remove
                                        </v-btn>
                                    </span>
                                </div>

                                <div class="float-left has-color-picker pr-4" style="width: 45%;">
                                    <label style="font-size: 13px;">Header</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.header_background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.header_background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4" style="width: 45%;">
                                    <label style="font-size: 13px;">Header Text</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.header_text_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.header_text_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mt-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Background</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mt-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Text Color</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.text_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.text_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mt-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Footer</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.footer_background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.footer_background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mt-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Footer Text</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.footer_text_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.footer_text_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <br clear="all" /><br />

								<label>Header alignment</label>

                                <br />

								<v-btn-toggle
									v-model="review_funnel.header_alignment"
									borderless
								>
									<v-btn value="Left" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-left
									</v-icon>
									</v-btn>

									<v-btn value="Center" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-center
									</v-icon>
									</v-btn>

									<v-btn value="Right" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-right
									</v-icon>
									</v-btn>
								</v-btn-toggle>

                                <br /><br />

								<label>Footer alignment</label>

                                <br />

								<v-btn-toggle
									v-model="review_funnel.footer_alignment"
									borderless
								>
									<v-btn value="Left" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-left
									</v-icon>
									</v-btn>

									<v-btn value="Center" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-center
									</v-icon>
									</v-btn>

									<v-btn value="Right" small>
									<span class="hidden-sm-and-down"></span>

									<v-icon>
										mdi-format-align-right
									</v-icon>
									</v-btn>
								</v-btn-toggle>

                                <br /><br />

                                <label style="font-size: 13px;">Custom CSS</label>

                                <div class="w-full">
										<textarea name="" id="" rows="12" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" style="border: solid 1px #e0e0e0 !important;" maxlength="1000" v-model="review_funnel.custom_css" placeholder="/* Example */
.rgrf-header {
    height: 120px !important;
}

.rgrf-subtitle {
    font-size: 17px !important;
    font-weight: bold;
}

.rgrf-face-image {
    height: 50px !important;
}
" ></textarea>

										<p class="text-xs text-gray-700 mt-2">Enter custom CSS to change the UI of the funnel.</p>
									</div>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Content</v-expansion-panel-header>
							<v-expansion-panel-content>
                                <label>Header Subtitle </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.header_subtitle"
									label=""
								></v-text-field>

                                <label class="mt-5">Footer Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.footer_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Positive Feedback Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 1"
									v-model="review_funnel.positive_feedback_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Negative Feedback Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 2"
									v-model="review_funnel.negative_feedback_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Negative Feedback Confirmation </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.negative_feedback_confirmation_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form First Name Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.first_name_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form Last Name Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.last_name_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form Email Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.email_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form Phone Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.phone_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form Enter Feedback Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.enter_feedback_text"
									label=""
								></v-text-field>

                                <label class="mt-5">Feedback Form Button Text </label>

								<v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
									v-model="review_funnel.send_feedback_button_text"
									label=""
								></v-text-field>

                                <v-switch class="mt-10" v-if="me"
									v-model="review_funnel.google_compliant_link_enabled"
                                     @click="selected_view = 2"
									label="Google compliant review link"
								></v-switch>

                                <label v-if="review_funnel.google_compliant_link_enabled" class="">Link Text</label>

								<v-text-field v-if="review_funnel.google_compliant_link_enabled" style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 2"
									v-model="review_funnel.google_compliant_link_text"
									label=""
								></v-text-field>

                                <label v-if="review_funnel.google_compliant_link_enabled" class="mt-5">URL</label>

								<v-text-field v-if="review_funnel.google_compliant_link_enabled" style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 2"
									v-model="review_funnel.google_compliant_link"
									label=""
								></v-text-field>

							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Leave a review process</v-expansion-panel-header>
							<v-expansion-panel-content>
								<!-- <label class="mt-10">Leave a review process</label> -->

								<v-select
                                    @change="((review_funnel.leave_a_review_process == 'Segmentation') ? selected_view = 0 : selected_view = 1)"
									v-model="review_funnel.leave_a_review_process"
									flat
									solo-inverted
									hide-details
									:items="leave_a_review_process_items"
								></v-select>

                                <label v-show="review_funnel.leave_a_review_process == 'Segmentation'" class="mt-5">Segmentation Text </label>

								<v-text-field @click="selected_view = 0" v-show="review_funnel.leave_a_review_process == 'Segmentation'" style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.segmentation_text"
									label=""
								></v-text-field>

								<label v-show="review_funnel.leave_a_review_process == 'Segmentation'" class="mt-5">Segmentation Style</label>

								<v-select @click="selected_view = 0" v-show="review_funnel.leave_a_review_process == 'Segmentation'"
									v-model="review_funnel.segmentation_option"
									flat
									solo-inverted
									hide-details
									:items="segmentation_options"
								></v-select>

                                <label class="mt-5">Action</label>

								<v-select
                                    @change="selected_view = 0"
									v-model="review_funnel.links_type"
									flat
									solo-inverted
									hide-details
									:items="links_type_items"
								></v-select>


                                <label v-if="review_funnel.links_type == 'External Links'" class="mt-5">Negative Action Link</label>

								<v-text-field v-if="review_funnel.links_type == 'External Links'" style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.external_link_frowny_face"
									label=""
								></v-text-field>

                                <label v-if="review_funnel.links_type == 'External Links'" class="mt-5">Positive Action Link</label>

								<v-text-field v-if="review_funnel.links_type == 'External Links'" style="margin-top: -20px; margin-bottom: -20px;"
									v-model="review_funnel.external_link_smiley_face"
									label=""
								></v-text-field>


                                <label class="mt-5">Links Display</label>

                                <v-select @click="selected_view = 1"
									v-model="review_funnel.direct_links_display"
									flat
									solo-inverted
									hide-details
									:items="direct_links_display_options"
								></v-select>

								<div class="float-left has-color-picker pr-4 mt-5" style="width: 45%;">
                                    <label style="font-size: 13px;">Button Background</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.direct_links_button_background"
                                                dark
                                                v-on="on"
                                                @click="selected_view = 1"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.direct_links_button_background"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mt-5" style="width: 45%;">
                                    <label style="font-size: 13px;">Button Text Color</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="review_funnel.direct_links_button_text_color"
                                                dark
                                                v-on="on"
                                                @click="selected_view = 1"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="review_funnel.direct_links_button_text_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel class="mt-1">
							<v-expansion-panel-header>Feed</v-expansion-panel-header>
							<v-expansion-panel-content>
                                <label>Sources</label>

                                <div v-for="(source, index) in review_funnel.sources" :key="index" class="bg-gray-100 rounded-l flex flex-row items-center justify-between bg-white rounded w-full mb-2">

                                    <div class="flex flex-row items-center truncate">
                                    <div class="w-12 flex-shrink-0">
                                        <img :src="getIconUrl(source)" alt="" class="rounded-l border border-gray-100">
                                    </div>
                                    <div class="truncate p-3 text-gray-400">
                                        <div class="float-right">
                                            <v-btn
                                                class="mx-2"
                                                fab
                                                dark
                                                x-small
                                                color="red lighten-2"
                                                @click="deleteSource(index, source)"
                                                >
                                                <v-icon dark>
                                                    mdi-close
                                                </v-icon>
                                            </v-btn>
                                        </div>

                                        <span class="text-gray-900">{{ getHostname(source.site) }}</span>{{ getPathname(source.site) }}</div>
                                    </div>
                                </div>

                                <v-btn
                                    color="blue-grey"
                                    class="ma-2 white--text"
                                    @click="source_form_mode = 'add'; source_form_show = 'true'; source_form_url = ''; source_form_error = '', selected_view = 1;"
                                    small
                                >
                                    <v-icon
                                        dark
                                    >
                                        mdi-plus
                                    </v-icon>
                                    Add Source
                                </v-btn>

                                <br /><br />

                                <label class="mt-5">Reviews Widget</label>

								<div class="w-full">
                                    <textarea name="" id="" rows="10" class="text-sm block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" style="border: solid 1px #e0e0e0 !important;" maxlength="1000" v-model="review_funnel.reviews_widget" placeholder="Add your code here..." ></textarea>

                                    <p class="text-xs text-gray-700 mt-2">Enter your reviews widget code to be displayed on the funnel page.</p>
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
					@click="saveFunnel()"
				>
					Save Funnel
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
      </div>

      <div class="w-full lg:w-2/3 md:w-2/3 sm:w-2/3 px-3">

        <v-tabs v-model="selected_view">
            <v-tab v-show="review_funnel.leave_a_review_process == 'Segmentation'" >Segmentation</v-tab>
            <v-tab >Links</v-tab>
            <v-tab >Feedback</v-tab>
        </v-tabs>

        <div class="w-full" style="border: solid 1px #CCCCCC; margin-top: 10px;">
			<div :style="'width: 100%; position: relative; font-family: ' + review_funnel.font_family.replace(' (Google)', '') + ';'">
				<div class="rgrf-header" :style="'background-color: ' + review_funnel.header_background_color + '; color: ' + review_funnel.header_text_color + '; text-align: ' + review_funnel.header_alignment.toLowerCase() + ';'">
                    <div class="rgrf-business-name">
                        {{ review_funnel.company_name }}
                    </div>

                    <div class="rgrf-subtitle">
                        {{ review_funnel.header_subtitle }}
                    </div>
                </div>

                <div class="rgrf-body" :style="'background-color: ' + review_funnel.background_color + '; color: ' + review_funnel.text_color">
                    <div class="rgrf-logo" v-if="review_funnel.logo">
                        <img :src="review_funnel.logo" alt="" style="height: 60px;">
                    </div>

                    <div class="rgrf-review-process" :style="((review_funnel.direct_links_display == 'Icon + URL') ? '' : 'max-width: 500px;')">
                        <div class="shadow p-6" v-if="selected_view == 1">
                            <div class="text-center text-lg mb-4">
                                {{ review_funnel.positive_feedback_text }}
                            </div>

                            <div class="" :style="((review_funnel.direct_links_display == 'Icon' || review_funnel.direct_links_display == 'Icon + Site Name') ? 'text-align: center;' : '')">
                                <a :href="source.url" v-for="(source, index) in review_funnel.sources" :key="index" class="rounded-l shadow items-center rounded mb-2 p-3"
                                    :class="((review_funnel.direct_links_display == 'Icon + Site Name' || review_funnel.direct_links_display == 'Icon') ? 'rgrf-icon-diret-link' : ' flex flex-row w-full')"
                                    :style="'background-color: ' + review_funnel.direct_links_button_background + '; color: ' + review_funnel.direct_links_button_text_color + ';'"
                                target="review-platform">
                                    <div v-if="review_funnel.direct_links_display == 'Icon + URL'" class="w-12 flex-shrink-0">
                                        <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded">
                                    </div>
                                    <div v-if="review_funnel.direct_links_display == 'Icon + URL'" class="truncate p-3"><span class="">{{ getHostname(source.site) }}</span>{{ getPathname(source.site) }}</div>

                                    <div v-if="review_funnel.direct_links_display == 'Icon + Site Name'" class="flex-shrink-0 icon_site_name text-center">
                                        <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded" style="width: 70px; height: 70px;">
                                    </div>
                                    <div v-if="review_funnel.direct_links_display == 'Icon + Site Name'" class="truncate pt-3 text-center"><span class="" style="font-size: 14px;">{{ reviewSitesNamesAll["www." + getHostname(source.site)] || source.site_name }}</span></div>

                                    <div v-if="review_funnel.direct_links_display == 'Icon'" class="w-12 flex-shrink-0">
                                        <img :src="source.logo || require('@/assets/images/review-services/www.' + getHostname(source.site) + '.png')" alt="" class="rounded" style="width: 48px; height: 48px;">
                                    </div>
                                </a>

                                <br clear="all" v-if="review_funnel.direct_links_display == 'Icon'" />
                            </div>
                        </div>

                        <div class="shadow p-6" v-if="selected_view == 0">
                            <div class="text-center text-lg mb-4">
                                {{ review_funnel.segmentation_text }}
                            </div>

                            <div v-if="review_funnel.segmentation_option == 'Faces'" class="flex flex-row items-center justify-center rounded-lg">

                                <img @click="happy = false; choosedSmiley = true" @mouseover="rating_selected = 'Bad';" @mouseout="rating_selected = '';" src="@/assets/images/icons/sad.svg" class="wp-3 cursor-pointer rounded-l-lg rgrf-face-image" style="" alt="sad">
                                <img @click="happy = false; choosedSmiley = true" @mouseover="rating_selected = 'Not Bad';" @mouseout="rating_selected = '';" src="@/assets/images/icons/confused.svg" class="wp-3 cursor-pointer rgrf-face-image" alt="indifferent">
                                <img @click="happy = true; choosedSmiley = true" @mouseover="rating_selected = 'Good';" @mouseout="rating_selected = '';" src="@/assets/images/icons/smiling.svg" class="wp-3 cursor-pointer rounded-r-lg rgrf-face-image" alt="happy">

                            </div>

                            <div v-if="review_funnel.segmentation_option == 'Thumbs'" class="flex flex-row items-center justify-center rounded-lg">

                                <i class="fa fa-thumbs-down rgrf-segmentation-thumbs red--text text--lighten-1" @mouseover="rating_selected = 'Bad';" @mouseout="rating_selected = '';"></i>
                                <i class="fa fa-thumbs-up rgrf-segmentation-thumbs green--text text--lighten-1" @mouseover="rating_selected = 'Good';" @mouseout="rating_selected = '';"></i>

                            </div>

                            <div v-if="review_funnel.segmentation_option == 'Hearts'" class="flex flex-row items-center justify-center rounded-lg">

                                <i class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 0) ? 'color: red' : '')" @mouseover="rating_selected = 'Bad'; hovered_item = 0;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 1) ? 'color: red' : '')" @mouseover="rating_selected = 'Subpar'; hovered_item = 1;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 2) ? 'color: red' : '')" @mouseover="rating_selected = 'Okay'; hovered_item = 2;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 3) ? 'color: red' : '')" @mouseover="rating_selected = 'Good'; hovered_item = 3;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-heart rgrf-segmentation-heart" :style="((hovered_item >= 4) ? 'color: red' : '')" @mouseover="rating_selected = 'Great!'; hovered_item = 4;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>

                            </div>

                            <div v-if="review_funnel.segmentation_option == 'Stars'" class="flex flex-row items-center justify-center rounded-lg">

                                <i class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 0) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Bad'; hovered_item = 0;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 1) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Subpar'; hovered_item = 1;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 2) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Okay'; hovered_item = 2;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 3) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Good'; hovered_item = 3;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>
                                <i class="fa fa-star rgrf-segmentation-star" :style="((hovered_item >= 4) ? 'color: #FFCA28' : '')" @mouseover="rating_selected = 'Great!'; hovered_item = 4;" @mouseout="rating_selected = ''; hovered_item = -1;"></i>

                            </div>

                            <div v-if="review_funnel.segmentation_option == 'NPS'" class="flex flex-row items-center justify-center rounded-lg">

                                <v-rating
                                    v-model="rating"
                                    length="11"
                                    large
                                >
                                    <template v-slot:item="props">
                                    <v-icon
                                        :color="getNpsColor(props)"
                                        v-text="`mdi-numeric-${props.index}-box`"
                                        @click="rating = props.index + 1;"
                                        @mouseover="selectNpsScore(props.index)"
                                        large
                                    ></v-icon>
                                    </template>
                                </v-rating>

                            </div>

                            <div class="rgrf-rating-selected">{{ rating_selected }}</div>
                        </div>

                        <div class="shadow p-6" v-if="selected_view == 2">
                            <div class="text-center text-lg mb-4">
                                {{ review_funnel.negative_feedback_text }}
                            </div>

                            <div class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.first_name_text }}
                                </label>
                                <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                                </div>

                                <div class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.last_name_text }}
                                </label>
                                <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                                </div>

                                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's name.</p> -->

                                <div class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.email_text }}
                                </label>
                                <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                                </div>

                                <!-- <p class="text-xs text-gray-700 mb-4">Your contact's email.</p> -->

                                <div class="mb-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {{ review_funnel.phone_text }}
                                </label>
                                <input name="phone" ref="phone" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" v-on:keyup.enter="save">
                            </div>

                            <div>
                                <textarea name="" id="" rows="10" class="w-full border rounded p-2" v-model="text" :placeholder="review_funnel.enter_feedback_text"></textarea>
                                <button :disabled="!text" class="border bg-gray-200 w-full p-2 rounded hover:bg-gray-100">{{ review_funnel.send_feedback_button_text }}</button>
                            </div>
                        </div>
                    </div>

                    <div id="rgrf-reviews_widget">
                        <WidgetsRender v-if="widget" :preview_widget="widget" />
                    </div>
                </div>

                <div class="rgrf-footer" :style="'background-color: ' + review_funnel.footer_background_color + '; color: ' + review_funnel.footer_text_color + '; text-align: ' + review_funnel.footer_alignment.toLowerCase() + ';'">

                    <div class="rgrf-google-compliant-link-wrapper text-center" v-if="selected_view == 2 && review_funnel.google_compliant_link_enabled">
                        <a :href="review_funnel.google_compliant_link" target="google-leave-review-link">{{ review_funnel.google_compliant_link_text }}</a>
                    </div>

                    <div class="rgrf-footer-text">
                        {{ review_funnel.footer_text }}
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
import WidgetsRender from '@/views/panel/Business/Widgets/Render/Index.vue'
import reviewSitesNames from '@/config/review_sites/names';
import reviewSitesNamesAll from '@/config/review_sites/names_all';
import reviewSitesUrls from '@/config/review_sites/urls';

export default {
  metaInfo () {
    return {
      title: "Review Funnel Builder | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
	WidgetsRender
  },
  data () {
    return {
        saved: false,
        file: null,

        rating: 8,

        short_name: "",
        short_name_error: "",

        edit_url: false,

        review_funnel: {},

        rating_selected: "",

        hovered_item: -1,

        selected_view: 0,

        source_form_show: false,
        source_form_mode: 'add',
        source_form_url: '',
        file_source_logo: null,
        source_logo: "",
        source_site_name: "",
        source_form_error: '',
        valid_url: true,
        current_url_format: '',

        widget: null,

        text: "",

        reviewSitesUrls: reviewSitesUrls,

        leave_a_review_process_items: [
            "Direct Links",
            "Segmentation"
        ],

        links_type_items: [
            "Internal Links/Feedback",
            "External Links"
        ],

        reviewSitesNames: reviewSitesNames,

        reviewSitesNamesAll: reviewSitesNamesAll,

        segmentation_options: [
            "Faces",
            "Thumbs",
            "Hearts",
            "Stars",
            "NPS"
        ],

        direct_links_display_options: [
            "Icon + URL",
            "Icon + Site Name",
            "Icon",
        ],

	  funnelLoaded: false,
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
	  align_values: [
		  "Left",
          "Center",
		  "Right"
	  ]
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
      async onUpload() {
      if (this.file !== null) {
        this.uploading = true
        let formData = new FormData()
        formData.append("file", this.file)

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

        //   let response2 = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/review-funnels/save-logo`, {
        //     logo: response.data.url
        //   }, {
        //     headers: {
        //       'Authorization': 'Bearer ' + this.$store.state.auth.jwt
        //     }
        //   })

          this.review_funnel.logo = response.data.url

        }catch(e){
        }

        this.file = null
        this.uploading = false
      }
    },

    async onUploadSourceLogo() {
      if (this.file_source_logo !== null) {
        this.uploading = true
        let formData = new FormData()
        formData.append("file", this.file_source_logo)

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/upload-image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
          })

          this.source_logo = response.data.url

        }catch(e){
        }

        this.file_source_logo = null
        this.uploading = false
      }
    },

    saveFunnel: async function() {
		this.saved = true
		let self = this
		try {
			let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/review-funnels/save-funnel', {
				review_funnel: self.review_funnel
			} , {
			headers: {
					'Authorization': 'Bearer ' + this.$store.state.auth.jwt
				},
			})
			setTimeout(function() {

				self.saved = false
			}, 2000)
		}catch(e){
		}
	},

    getFunnelPrefix() {
        return window.location.origin + '/';
    },

    getFunnelLink() {
        return window.location.origin + '/' + this.review_funnel.short_name;
    },

    async saveShortName() {
        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/review-funnels/check-short-name`, {
            short_name: this.short_name
        }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
        })

        if (response.data.success) {
            this.review_funnel.short_name = this.short_name;
            this.edit_url = false;
            this.short_name_error = '';
        }
        else {
            this.short_name_error = response.data.error;
            // this.short_name_error = "Invalid URL. Please only add letters, numbers, hyphens and underscore characters. No spaces allowed.";
        }
    },

    cancelEditShortName() {
        this.short_name = this.review_funnel.short_name;
        this.edit_url = false;
        this.short_name_error = '';
    },

    setCustomCSS() {
        // Apply custom CSS
        if (this.review_funnel.custom_css) {
            if (document.getElementById("rgrf-custom-css-sheet") === null) {
                var styleSheet = document.createElement("style")
                styleSheet.type = "text/css"
                styleSheet.innerText = this.review_funnel.custom_css.replace(/\n/g, " ")
                styleSheet.id = 'rgrf-custom-css-sheet';
                document.body.appendChild(styleSheet);
            }
            else {
                document.getElementById("rgrf-custom-css-sheet").innerText = this.review_funnel.custom_css.replace(/\n/g, " ");
            }
        }
        else {
            if (document.getElementById("rgrf-custom-css-sheet") === null) {
                var styleSheet = document.createElement("style")
                styleSheet.type = "text/css"
                styleSheet.innerText = ""
                styleSheet.id = 'rgrf-custom-css-sheet';
                document.body.appendChild(styleSheet);
            }
            else {
                document.getElementById("rgrf-custom-css-sheet").innerText = '';
            }
        }
        // END Apply custom CSS
    },

    async removeLogo() {
    //    await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/review-funnels/remove-logo`, {}, {
    //     headers: {
    //       'Authorization': 'Bearer ' + this.$store.state.auth.jwt
    //     }
    //   })

      this.review_funnel.logo = '';
    },
    getHostname(url) {
      return urlParser(url).hostname.replace("www.", "")
    },
    getPathname(url) {
      let parsed_url = urlParser(url)

      if (url.includes("google"))
        return parsed_url.pathname + decodeURIComponent(parsed_url.query)

      return parsed_url.pathname
    },
    getIconUrl(source) {
        if (source.logo)
            return source.logo;

        return require('@/assets/images/review-services/www.' + this.getHostname(source.site) + ".png");
    },
	getReviewFunnel: async function() {
        let self = this;

		try {
			let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/review-funnels/get-settings', {
			headers: {
				'Authorization': 'Bearer ' + this.$store.state.auth.jwt
			},
			})
			
			this.review_funnel = response.data.review_funnel

            if (this.review_funnel.leave_a_review_process == 'Direct Links')
                this.selected_view = 1
            
            this.short_name = this.review_funnel.short_name;

			this.funnelLoaded = true

            if (this.review_funnel.reviews_widget) {
                let self = this;
                try {
                    let exploded = this.review_funnel.reviews_widget.split('token=');
                    let exploded2 = exploded[1].split('"');
                    let exploded3 = exploded2[0].split('&');

                    let widget_token = exploded3[0];

                    let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + widget_token;

                    axios.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                    }).then(function(response) {
                        self.widget = response.data.widget_data.widget
                    });
                }
                catch(e) {
                    self.widget = null
                }
            }

            self.setCustomCSS();
		}catch(e){
		}
	},

    addSource() {
        let theSourceUrl = this.source_form_url;

        if (!this.source_site_name) {
            this.source_form_error = 'Please add site name.';
            return;
        }

        if (!this.source_logo) {
            this.source_form_error = 'Please upload an icon.';
            return;
        }

        if (theSourceUrl.indexOf('facebook') !== -1) {
            theSourceUrl = theSourceUrl + "/reviews";
            theSourceUrl = theSourceUrl.replace("//reviews", "/reviews");
        }

        let newSource = {
            url: theSourceUrl,
            site: this.source_form_url
        };

        if (this.source_logo)
            newSource.logo = this.source_logo;

        if (this.source_site_name)
            newSource.site_name = this.source_site_name;

        this.review_funnel.sources.push(newSource);

        this.source_form_show = false;
        this.file_source_logo = null;
        this.source_logo = "";
        this.source_site_name = "";
    },

    checkUrlValid() {
        // return true;
        
      try {
        let parsed_url = new URL(this.source_form_url)

        let reviewSiteUrl = this.reviewSitesUrls[parsed_url.host.replace("www.", "")]

        if (!reviewSiteUrl) {
          this.valid_url = false;
          return;
        }

        let explodedSlashes1 = reviewSiteUrl.split("/");
        let explodedSlashes2 = this.source_form_url.split("/");

        if (reviewSiteUrl.indexOf('facebook') != -1) {
            if (explodedSlashes1.length - explodedSlashes2.length > 0 || explodedSlashes2.length - explodedSlashes1.length > 0) {
                this.valid_url = false;
                this.current_url_format = reviewSiteUrl;
                return;
            }
        }
        else {
            if (explodedSlashes1.length - explodedSlashes2.length > 1 || explodedSlashes2.length - explodedSlashes1.length > 1) {
                this.valid_url = false;
                this.current_url_format = reviewSiteUrl;
                return;
            }
        }

        let explodedQuestionMarks1 = reviewSiteUrl.split("?");
        let explodedQuestionMarks2 = this.source_form_url.split("?");

        if (explodedQuestionMarks1.length != explodedQuestionMarks2.length) {
          this.valid_url = false;
          this.current_url_format = reviewSiteUrl;
          return;
        }

        let explodedAmpersands1 = reviewSiteUrl.split("&");
        let explodedAmpersands2 = this.source_form_url.split("&");

        if (explodedAmpersands1.length != explodedAmpersands2.length) {
          this.valid_url = false;
          this.current_url_format = reviewSiteUrl;
          return;
        }
      }
      catch(e) {
        this.valid_url = false;
        return;
      }

      this.valid_url = true;
    },

    deleteSource(index, source) {
        this.selected_view = 1;

        let new_sources = [];
        for (var i in this.review_funnel.sources) {
            if (i != index) {
                new_sources.push(this.review_funnel.sources[i]);
            }
        }

        this.review_funnel.sources = [];

        for (var i in new_sources)
            this.review_funnel.sources.push(new_sources[i]);
    },

    getNpsColor(props) {
        if (props.isFilled) {
            if (props.index == 0)
                return "blue lighten-2";

            if (props.index == 1)
                return "blue lighten-1";

            if (props.index == 2)
                return "blue";

            if (props.index == 3)
                return "blue darken-1";

            if (props.index == 4)
                return "blue darken-2";

            if (props.index == 5)
                return "green lighten-2";

            if (props.index == 6)
                return "green lighten-1";

            if (props.index == 7)
                return "green";

            if (props.index == 8)
                return "green darken-1";

            if (props.index == 9)
                return "green darken-2";

            if (props.index == 10)
                return "green darken-3";
        }

        return '';
    },

    selectNpsScore(score) {
        this.rating = score + 1;

        if (score == 0)
            this.rating_selected = "Not At All";

        if (score <= 4)
            this.rating_selected = "Not Likely";

        if (score == 5)
            this.rating_selected = "Neutral";
        
        if (score == 6)
            this.rating_selected = "Likely";
        
        if (score == 7 || score == 8)
            this.rating_selected = "Very Likely";
        
        if (score == 9 || score == 10)
            this.rating_selected = "Extreemly Likely";
    }
  },
  created() {
    this.getReviewFunnel()
  },
	watch: {
		'review_funnel.custom_css': {
			handler() {
				this.setCustomCSS()
			}
		},
        "source_form_url": {
            handler () {
                this.checkUrlValid()
            }
        },
        "review_funnel.reviews_widget": {
            handler () {
                let self = this;
                try {
                    let exploded = this.review_funnel.reviews_widget.split('token=');
                    let exploded2 = exploded[1].split('"');
                    let exploded3 = exploded2[0].split('&');

                    let widget_token = exploded3[0];

                    let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + widget_token;

                    axios.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                        },
                    }).then(function(response) {
                        self.widget = response.data.widget_data.widget
                    });
                }
                catch(e) {
                    self.widget = null
                }
            }
        },
	}
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&family=Source+Sans+Pro&family=Roboto&family=Lato&family=PT+Sans&family=EB+Garamond&family=Raleway&family=Ubuntu&family=Montserrat&family=Courgette');
  
  a {
      text-decoration: none !important;
  }

  .rgrf-header {
      width: 100%;
      min-height: 80px;
      padding: 20px;
  }

  .rgrf-footer {
      /* margin-top: 30px; */
      width: 100%;
      min-height: 60px;
      background-color: #f5f5f5;
      padding: 20px;
  }

  .rgrf-footer-text {
      font-size: 15px;
  }

  .rgrf-business-name {
      font-size: 20px;
  }

  .rgrf-subtitle {
      padding-top: 10px;
      font-size: 14px;
  }

  .rgrf-body {
      /* background-color: #f5f5f5; */
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
  }

  .rgrf-body .rgrf-logo {
      padding-top: 20px;
      padding-bottom: 10px;
      text-align: center;
  }

  .rgrf-body .rgrf-logo img {
      display: initial;
  }

  .rgrf-review-process {
      width: 100%;
      max-width: 800px;
      margin: auto;
      padding-top: 40px;
  }

  .rgrf-review-process img.rgrf-face-image {
      height: 100px;
      margin: 20px;
  }
  
  .rgrf-icon-diret-link {
      margin-right: 10px;
      display: inline-block;
  }

  .rgrf-segmentation-thumbs {
      cursor: pointer;
      font-size: 70px;
      color: #727272;
      margin: 30px;
  }

  .rgrf-segmentation-heart, .rgrf-segmentation-star {
      cursor: pointer;
      font-size: 70px;
      color: grey;
      margin: 10px;
  }

  /* .rgrf-segmentation-heart:hover {
      color: red;
  }

  .rgrf-segmentation-star:hover {
      color: #FFCA28;
  } */

  .rgrf-rating-selected {
      padding-top: 10px;
      text-align: center;
      height: 20px;
  }

  div#rgrf-reviews_widget {
      padding-top: 40px;
      position: relative;
  }

  div.rgrf-google-compliant-link-wrapper {
      position: absolute;
      width: 100%;
      left: 0px;
      margin-top: -50px;
  }

  div.rgrf-google-compliant-link-wrapper a {
      color: #CCCCCC;
      font-size: 12px;
  }
</style>