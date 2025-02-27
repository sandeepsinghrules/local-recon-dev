<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full bg-white rounded-lg mx-6" :class="((image.type == 'Custom') ? 'sm:w-3/3 lg:w-3/3' : 'sm:w-2/3 lg:w-2/3')">

      <div class="p-6">

        <h2 v-if="id" class="text-lg font-semibold text-gray-800 mb-3">Edit Template</h2>
        <h2 v-if="!id" class="text-lg font-semibold text-gray-800 mb-3">Create an Image Template</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div style="min-height: 500px;">
            <div class="float-left" :style="((image.type == 'Custom') ? 'width: 20%;' : 'width: 40%;')">
                <div class="mb-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Title
                    </label>
                    <input v-model="image.title" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text">
                </div>

                <div class="mb-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Type
                    </label>

                    <v-select
                        :items="type_items"
                        v-model="image.type"
                        solo
                    ></v-select>
                </div>

                <v-expansion-panels accordion v-show="image.type != 'Custom'">
                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Layout</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div style="height: 300px; overflow: auto;">
                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Background</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Competitor Background</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.competitor_background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.competitor_background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Business Background</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.business_background_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.business_background_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Borders</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.borders_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.borders_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Competitor Border</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.competitor_top_border_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.competitor_top_border_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Business Border</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.business_top_border_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.business_top_border_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Titles</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.titles_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.titles_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Subtitles</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.subtitles_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.subtitles_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Rating</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.rating_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.rating_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Stars</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.stars_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.stars_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Reviews</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.reviews_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.reviews_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Outline Text</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.outline_items_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.outline_items_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Outline Yes</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.outline_yes_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.outline_yes_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>

                                <div class="float-left has-color-picker pr-4 mb-3" style="width: 45%;">
                                    <label style="font-size: 13px;">Outline No</label>
                                    <br />

                                    <v-menu offset-y :close-on-content-click="false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn style="width: 100%;"
                                                :color="image.settings.outline_no_color"
                                                dark
                                                v-on="on"
                                            >
                                            </v-btn>
                                        </template>
                                        <v-color-picker
                                            v-model="image.settings.outline_no_color"
                                            mode="hexa"
                                            class="mx-auto"
                                            style="width: 200px"
                                        ></v-color-picker>
                                    </v-menu>
                                </div>
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Content</v-expansion-panel-header>
                        <v-expansion-panel-content>

                            <div style="height: 300px; overflow: auto;">
                                <label>Competition Title </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"
                                    v-model="image.settings.competition_title"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Business Title </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"
                                    v-model="image.settings.business_title"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Reviews Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 1"
                                    v-model="image.settings.reviews_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Using Quote Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;" @click="selected_view = 2"
                                    v-model="image.settings.using_quote_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Using Chat Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
                                    v-model="image.settings.using_chat_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Claimed Business Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
                                    v-model="image.settings.claimed_business_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Google Posts </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
                                    v-model="image.settings.google_posts_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">Yes Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
                                    v-model="image.settings.yes_text"
                                    label=""
                                ></v-text-field>

                                <label class="mt-5">No Text </label>

                                <v-text-field style="margin-top: -20px; margin-bottom: -20px;"  @click="selected_view = 2"
                                    v-model="image.settings.no_text"
                                    label=""
                                ></v-text-field>

                                <br />

                                <label>Alignment</label>

                                <br />

                                <v-btn-toggle
                                    v-model="image.settings.alignment"
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
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Fonts</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div style="height: 300px; overflow: auto;">
                                <label>Font Family</label>

                                <v-select
                                    v-model="image.settings.font_family"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="font_family_values"
                                    prepend-inner-icon="mdi-text"
                                ></v-select>
                                
                                <label class="mt-5">Titles Font Size</label>

                                <v-select
                                    v-model="image.settings.titles_font_size"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="title_font_sizes"
                                ></v-select>

                                <label class="mt-5">Subtitles Font Size</label>

                                <v-select
                                    v-model="image.settings.subtitles_font_size"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="title_font_sizes"
                                ></v-select>

                                <label class="mt-5">Ratings Font Size</label>

                                <v-select
                                    v-model="image.settings.rating_font_size"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="title_font_sizes"
                                ></v-select>

                                <label class="mt-5">Reviews Font Size</label>

                                <v-select
                                    v-model="image.settings.reviews_font_size"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="title_font_sizes"
                                ></v-select>

                                <label class="mt-5">Outlines Font Size</label>

                                <v-select
                                    v-model="image.settings.outlines_font_size"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="title_font_sizes"
                                ></v-select>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div v-show="image.type == 'Custom'">
                    <div class="mb-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Width
                        </label>
                        <input v-model="image.settings.width" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="number">
                    </div>

                    <div class="mb-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Height
                        </label>
                        <input v-model="image.settings.height" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="number">
                    </div>

                    <div class="mb-3">
                        <label style="font-size: 13px;">Background Color</label>
                        <br />

                        <v-menu offset-y :close-on-content-click="false">
                            <template v-slot:activator="{ on }">
                                <v-btn style="width: 100%;"
                                    :color="image.settings.background_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                            </template>
                            <v-color-picker
                                v-model="image.settings.background_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                            ></v-color-picker>
                        </v-menu>
                    </div>
                </div>
            </div>
            <div class="float-left ml-10">
                <div class="mb-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Design
                    </label>

                    <div v-show="image.type != 'Custom'" class="lfpr-pi-wrapper" :style="'background-color: ' + image.settings.background_color + '; border-color: ' + image.settings.borders_color + '; text-align: ' + image.settings.alignment.toLowerCase() + ';font-family: ' + image.settings.font_family.replace(' (Google)', '') + ';'">
                        <div class="lfpr-pi-title" id="competition_title" :style="'color: ' + image.settings.titles_color + '; font-size: ' + image.settings.titles_font_size + ';'">{{ image.settings.competition_title }}</div>

                        <div class="lfpr-pi-business-wrapper" :style="'background-color: ' + image.settings.competitor_background_color + '; border-color: ' + image.settings.borders_color + '; border-top-color: ' + image.settings.competitor_top_border_color + ';'">
                            <div class="lfpr-pi-business-title" :style="'color: ' + image.settings.subtitles_color + '; font-size: ' + image.settings.subtitles_font_size + ';'">Competitor Business Name</div>
                            <div v-if="image.type == 'Reputation'">
                                <div class="lfpr-pi-business-rating" :style="'color: ' + image.settings.rating_color + '; font-size: ' + image.settings.rating_font_size + ';'">4.9</div>
                                <div class="lfpr-pi-business-stars"><v-rating :value="4.9" :color="image.settings.stars_color" half-increments readonly></v-rating></div>
                                <div class="lfpr-pi-business-reviews_nr" :style="'color: ' + image.settings.reviews_color + '; font-size: ' + image.settings.reviews_font_size + ';'">275 {{ image.settings.reviews_text }}</div>
                            </div>

                            <div v-if="image.type == 'Outline'">
                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.using_quote_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-yes" :style="'color: ' + image.settings.outline_yes_color + ';'">{{ image.settings.yes_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.using_chat_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-yes" :style="'color: ' + image.settings.outline_yes_color + ';'">{{ image.settings.yes_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.claimed_business_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-yes" :style="'color: ' + image.settings.outline_yes_color + ';'">{{ image.settings.yes_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.google_posts_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-yes" :style="'color: ' + image.settings.outline_yes_color + ';'">{{ image.settings.yes_text }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="lfpr-pi-title" id="business_title" :style="'color: ' + image.settings.titles_color + '; font-size: ' + image.settings.titles_font_size + ';'">{{ image.settings.business_title }}</div>

                        <div class="lfpr-pi-business-wrapper-my-biz" :style="'background-color: ' + image.settings.business_background_color + '; border-color: ' + image.settings.borders_color + '; border-top-color: ' + image.settings.business_top_border_color + ';'">
                            <div class="lfpr-pi-business-title" :style="'color: ' + image.settings.subtitles_color + '; font-size: ' + image.settings.subtitles_font_size + ';'">Business Name</div>
                            <div v-if="image.type == 'Reputation'">
                                <div class="lfpr-pi-business-rating" :style="'color: ' + image.settings.rating_color + '; font-size: ' + image.settings.rating_font_size + ';'">4.6</div>
                                <div class="lfpr-pi-business-stars"><v-rating :value="4.6" :color="image.settings.stars_color" half-increments readonly></v-rating></div>
                                <div class="lfpr-pi-business-reviews_nr" :style="'color: ' + image.settings.reviews_color + '; font-size: ' + image.settings.reviews_font_size + ';'">197 {{ image.settings.reviews_text }}</div>
                            </div>

                            <div v-if="image.type == 'Outline'">
                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.using_quote_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-no" :style="'color: ' + image.settings.outline_no_color + ';'">{{ image.settings.no_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.using_chat_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-no" :style="'color: ' + image.settings.outline_no_color + ';'">{{ image.settings.no_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.claimed_business_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-no" :style="'color: ' + image.settings.outline_no_color + ';'">{{ image.settings.no_text }}</span>
                                    </span>
                                </div>

                                <div class="lfpr-pi-business-outline-item" :style="'font-size: ' + image.settings.outlines_font_size + ';'">
                                    <span class="lfpr-pi-business-outline-item-title" :style="'color: ' + image.settings.outline_items_color + ';'">{{ image.settings.google_posts_text }}: </span>
                                    <span class="lfpr-pi-business-outline-item-value">
                                        <span class="lfpr-pi-business-outline-item-no" :style="'color: ' + image.settings.outline_no_color + ';'">{{ image.settings.no_text }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="image.type == 'Custom'">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                class="mt-1 mb-2"
                                x-small
                                color="white"
                                v-bind="attrs"
                                v-on="on"
                                >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                                Add Element
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="addElement('text')">
                                <v-list-item-title>Text</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="addElement('image')">
                                <v-list-item-title>Image</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="addElement('website')">
                                <v-list-item-title>Website</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <add-image-canvas :image="image" :key="fabricCanvasKey"></add-image-canvas>
                    </div>
                </div>
            </div>

            <div v-show="image.type == 'Custom'" class="float-left">
                <div v-if="selected_element" class="pl-5">
                    <div v-if="selected_element.type == 'text'">
                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">
                                Text

                                <div class="float-right -mt-2">
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            class="mt-1 mb-2"
                                            x-small
                                            color="white"
                                            v-bind="attrs"
                                            v-on="on"
                                            >
                                            <v-icon dark>
                                                mdi-plus
                                            </v-icon>
                                            Add Token
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item @click="addToken('[business_name]')">
                                                <v-list-item-title>[business_name]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[rating]')">
                                                <v-list-item-title>[rating]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[reviews]')">
                                                <v-list-item-title>[reviews]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[formatted_phone_number]')">
                                                <v-list-item-title>[formatted_phone_number]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[international_phone_number]')">
                                                <v-list-item-title>[international_phone_number]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[phone_number_type]')">
                                                <v-list-item-title>[phone_number_type]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[carrier]')">
                                                <v-list-item-title>[carrier]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[address]')">
                                                <v-list-item-title>[address]</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="addToken('[business_name]')">
                                                <v-list-item-title>[website]</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </label>
                            <input v-model="image.settings.text_elements[selected_element_index].text" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" @keyup="changesMade()" />
                        </div>

                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">Text Color</label>

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                    <v-btn style="width: 100%;"
                                        :color="image.settings.text_elements[selected_element_index].color"
                                        dark
                                        v-on="on"
                                    >
                                    </v-btn>
                                </template>
                                <v-color-picker
                                    v-model="image.settings.text_elements[selected_element_index].color"
                                    mode="hexa"
                                    class="mx-auto"
                                    style="width: 200px"
                                    @input="changesMade()"
                                ></v-color-picker>
                            </v-menu>
                        </div>

                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">Font Family</label>

                            <v-select
                                v-model="image.settings.text_elements[selected_element_index].font_family"
                                flat
                                solo-inverted
                                hide-details
                                :items="font_family_values"
                                style="max-width: 300px;"
                                @change="changesMade()"
                            ></v-select>
                        </div>

                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">Font Style</label>

                            <v-select
                                v-model="image.settings.text_elements[selected_element_index].font_style"
                                flat
                                solo-inverted
                                hide-details
                                :items="font_style_values"
                                style="max-width: 300px;"
                                @change="changesMade()"
                            ></v-select>
                        </div>

                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">Font Weight</label>

                            <v-select
                                v-model="image.settings.text_elements[selected_element_index].font_weight"
                                flat
                                solo-inverted
                                hide-details
                                :items="font_weight_values"
                                style="max-width: 300px;"
                                @change="changesMade()"
                            ></v-select>
                        </div>

                        <div class="mb-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">
                                Font Size
                            </label>
                            <input v-model="image.settings.text_elements[selected_element_index].font_size" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="number" @keyup="changesMade()" @input="changesMade()">
                        </div>

                        <v-btn class="mt-2" color="error" @click="deleteTextElement(selected_element_index)">
                            <i class="fa fa-trash"></i> Delete
                        </v-btn>
                    </div>

                    <div v-if="selected_element.type == 'image'">
                        <div class="mb-1">
                            <label v-show="false" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-0">
                                Image URL
                            </label>
                            <input v-show="false" v-model="image.settings.image_elements[selected_element_index].url" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" @keyup="imageChanged(image.settings.image_elements[selected_element_index].url)" @input="imageChanged(image.settings.image_elements[selected_element_index].url)" style="min-width: 300px;" />

                            <v-file-input
                                accept="image/*"
                                label="Click here to change image"
                                style="min-width: 300px;"
                                v-model="file"
                                @change="onUpload"
                            ></v-file-input>

                            <v-btn class="mt-2" color="error" @click="deleteImageElement(selected_element_index)">
                                <i class="fa fa-trash"></i> Delete
                            </v-btn>
                        </div>
                    </div>

                    <div v-if="selected_element.type == 'website'">
                        <div class="mb-1">
                            <v-btn class="mt-2" color="error" @click="deleteWebsiteElement(selected_element_index)">
                                <i class="fa fa-trash"></i> Delete
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <br clear="all" />
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': saving}" @click="save">
            Save
        </button>

      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import vueFabricWrapper from "vue-fabric-wrapper";
import AddImageCanvas from '@/components/dialogs/images/addImageCanvas.vue'

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
      success: null,
      error: null,
      id: null,

      file: null,

      title_font_sizes: ['10px','11px','12px','13px','14px','15px','16px','17px','18px','19px','20px','21px','22px','23px','24px','25px','26px','27px','28px','29px','30px','31px','32px','33px','34px'],

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

      font_style_values: [
		  "Normal",
		  "Italic"
	  ],

      font_weight_values: [
		  "Normal",
          "Bold",
		  "200",
		  "400",
		  "600",
		  "800"
	  ],

      image: null,

      selected_type: "Rating",
      
      default_settings: {
        // texts
        competition_title: 'Your competition is getting ahead',
        business_title: 'Your business performance',
        reviews_text: 'reviews',
        using_quote_text: 'Using Quote',
        using_chat_text: 'Using Chat',
        claimed_business_text: 'Claimed Business',
        google_posts_text: 'Google Posts',
        yes_text: 'Yes',
        no_text: 'No',
        alignment: "Center",

        // colors
        background_color: '#FFFFFF',
        competitor_background_color: '#FFFFFF',
        business_background_color: '#FFFFFF',
        borders_color: '#e6e6e6',
        competitor_top_border_color: '#008000',
        business_top_border_color: '#FF0000',
        titles_color: '#000000de',
        subtitles_color: '#000000de',
        rating_color: '#797979',
        stars_color: '#ffc107',
        reviews_color: '#135bba',
        outline_items_color: '#000000de',
        outline_yes_color: '#008000',
        outline_no_color: '#FF0000',

        // fonts
        font_family: 'Open Sans (Google)',
        titles_font_size: '16px',
        subtitles_font_size: '14px',
        rating_font_size: '30px',
        reviews_font_size: '14px',
        outlines_font_size: '14px',

        // Custom
        width: 640,
        height: 400,
        background_color: '#FFFFFF',

        text_elements: [],
        image_elements: [],
        website_elements: []
      },

      selected_element_index: 0,
      selected_element: null,

      type_items: [
        'Reputation',
        // 'Reviews',
        'Outline',
        'Custom'
        // 'Using Chat',
        // 'Claimed/Unclaimed',
        // 'Google Posts'
      ],

      fabricCanvasKey: 0
    }
  },
  components: {
    FabricCanvas: vueFabricWrapper.FabricCanvas,
    FabricText: vueFabricWrapper.FabricText,
    FabricCircle: vueFabricWrapper.FabricCircle,
    FabricGroup: vueFabricWrapper.FabricGroup,
    FabricImage: vueFabricWrapper.FabricImageFromURL,
    AddImageCanvas
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.saving = false
    },
    async save() {
      this.saving = true
      this.error = null
      try {

        let formData = new FormData();
        // formData.append("name", this.name);
        if (this.id)
          formData.append("id", this.id);

        formData.append("title", this.image.title);
        formData.append("type", this.image.type);

        let settings = this.image.settings;

        formData.append("settings", JSON.stringify(settings));

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/personalization-images`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        this.hide()

    	this.$store.dispatch('personalization_images/fetch')
    	this.error = null

      } catch (e) {
        console.log(e);
        // this.error = e.response.data.message
      }
      this.saving = false
    },

    addImage() {
      let self = this;
      this.id = null;
      setTimeout(function() {
        try {
            self.image = {
                type: "Reputation",
                settings: self.default_settings
            }

            console.log('self.image', self.image)
        }
        catch (e) {
            console.log('error', e)
        }
      }, 10);
    },

    editImage(image) {
      let self = this;
      this.id = image.id;
      setTimeout(function() {
        self.image = image;
        self.image.settings = JSON.parse(image.settings);
      }, 10);
    },

    addElement(element_type) {
        let new_element = {
            type: element_type,
            scaleX: 1,
            scaleY: 1,
        };

        if (element_type == 'text') {
            new_element.text = 'Edit the text';
            new_element.color = "#000000";
            new_element.font_family = "Open Sans (Google)";
            new_element.font_style = "Normal";
            new_element.font_weight = "Normal";
            new_element.font_size = 34;
            new_element.top = 100;
            new_element.left = 100;
            new_element.scaleX = 0.5;
            new_element.scaleY = 0.5;
            this.image.settings.text_elements.push(new_element);
        }

        if (element_type == 'image') {
            new_element.url = 'https://regro-cdn.s3.amazonaws.com/images/change_image.png';
            new_element.url_base64 = 'data:image/png;base64,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QTOC6EvOSQjx66+/Nssvv7zVluacc05DqM61115rHn30UUtyP//8s/ntt9/sa4w11liW4GaccUaz2WabmZVXXtnew5P98MMPm08++cQSBFoYAimwzTTTTGa11VYzG220UX3B36gFgO+++27z5JNPWkL85ptvDGTN75Mfmg7kNfHEE5uppprKvvMuu+xixhlnHPtbUX8+++wzc/zxx1vi+vHHH80PP/xg83Npxx9/fDPGGGO409CevHfcccfQNYifct5+++2WsL/77jtL1rwb5aF+eDfKu/nmm5sllljCPp9X+4ZeLuKkv1k8EUUMXSq7vCLEUHNkP8mrwyQhREiDDoxAOPvvv78lRYiymcwzzzzm5JNPNg899JC58cYbTTA9QeAuINzlMd1005kTTjjBEllceSGRO+64w3R1dbnH7H6yySazRIap62SSSSYxBx10kNl7773dpdD+rbfeMkcddZS55557LJlyE+0NLROCRVuEJBuF35pgggksGW666ab125AhxH/ZZZeZ119/vX6dg6jyoiXutddeZsUVV5SGKA0xhJfUJ3EdJnVGKR8o+wtThskcJESqCw3nq6++MvPOO681Gaeffnoz+uijW/J4+umnranoqhXz+r333rOmLeb2OuusYyAUtK4//vjDmtC33XabS27NXGIhxxxzzMh/EQGBHXPMMdYsX3rppQ2aKBommhz5ffzxx+aaa64xaI8I5vu9995rZp555vpvcAAZr7feeub++++319HcdtttN6uxcQwhUsa77rrL3HffffVnef811ljDanp8JCiTk5dfftkSHO+ATDTRRFbjnXrqqS0h/vTTT1ZDvuWWW+ofA+rw8ssvN6SJ0ohd3nnt+xueW9VT2eWVhtiqhRLez+sDkFZDdK8LEaHNQYaYqGhAmK+MxR122GHm7bffdkntHlMbbQgTES2zra3NdHd3W4I466yzQgHhjzzyiEG7jCIIxg3RNhm7Y5zQkatzWDBeB+Hsscce9d+/4oorzNZbb10/5+DZZ581Sy65ZP0aM3QOPfRQO8bnnAyQJuXYddddrflL4pVWWskOF9Qf/P8BGuu2225rhxG4BFGinQ4aNMjmSfuRhvFOCPu8886rZ7HffvvZtFHlrSfK6aBsgvD9gW9VTWWXV4TYqoUS3h+eCBHyO+OMM8wGG2wwjNMCs/HKK680Bx54YKhk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';
            new_element.width = 324;
            new_element.height = 254;
            this.image.settings.image_elements.push(new_element);
        }

        if (element_type == 'website') {
            new_element.url = 'https://regro-cdn.s3.amazonaws.com/images/website_placeholder.png';
            new_element.url_base64 = 'data:image/png;base64,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';
            new_element.width = 254;
            new_element.height = 252;
            this.image.settings.website_elements.push(new_element);
        }

        this.changesMade();
        this.unselectElement();
    },

    addToken(token) {
        this.image.settings.text_elements[this.selected_element_index].text = this.image.settings.text_elements[this.selected_element_index].text + token;
        this.image.settings.text_elements[this.selected_element_index].text = this.image.settings.text_elements[this.selected_element_index].text.trim();
        this.changesMade()
    },

    elementMoved(item) {
        console.log('item', item);
    },

    selectElement(index, item) {
        this.selected_element_index = index;
        this.selected_element = item;
    },
    
    unselectElement() {
        this.selected_element_index = null;
        this.selected_element = null;
    },

    deleteTextElement(index) {
        this.unselectElement();

        for (var i in this.image.settings.text_elements) {
            if (i == index) {
                this.image.settings.text_elements[i].hidden = true;
            }
        }

        this.changesMade();
    },

    deleteImageElement(index) {
        this.unselectElement();

        for (var i in this.image.settings.image_elements) {
            if (i == index) {
                this.image.settings.image_elements[i].hidden = true;
            }
        }

        this.changesMade();
    },

    deleteWebsiteElement(index) {
        this.unselectElement();

        for (var i in this.image.settings.website_elements) {
            if (i == index) {
                this.image.settings.website_elements[i].hidden = true;
            }
        }

        this.changesMade();
    },

    changesMade() {
        console.log('chamges mageeee');
        this.fabricCanvasKey++;
    },

    imageChanged(url) {
        let self = this;
        const img = new Image();
        img.onload = function() {
            let self2 = this;
            setTimeout(function() {
                self.image.settings.image_elements[self.selected_element_index].width = self2.width;
                self.image.settings.image_elements[self.selected_element_index].height = self2.height;
                self.image.settings.image_elements[self.selected_element_index].scaleX = 0.5;
                self.image.settings.image_elements[self.selected_element_index].scaleY = 0.5;
            }, 300);
        }
        img.src = url;
    },

    async onUpload() {
        let self = this;
      // console.log(this.file);
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

          self.image.settings.image_elements[self.selected_element_index].url = response.data.url
          self.image.settings.image_elements[self.selected_element_index].url_base64 = response.data.url_base64

          self.imageChanged(self.image.settings.image_elements[self.selected_element_index].url);

        }catch(e){
          console.log(e)
        }

        this.file = null
        this.uploading = false
      }
    },
  },
  created() {
    this.addImage()
    let self = this;

    // setInterval(function() {
    //     console.log('self.image.settings.text_elements', self.image.settings.text_elements);
    //     console.log('self.image.settings.image_elements', self.image.settings.image_elements);
    // }, 1000);
  }
}
</script>

<style type="text/css">
    .lfpr-pi-wrapper {
        width: 360px;
        border: solid 1px #e6e6e6;
        padding: 20px;
        font-size: 14px;
        text-align: center;
    }

    .lfpr-pi-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 20px;
    }

    .lfpr-pi-business-wrapper {
        border: solid 1px #e6e6e6;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-top: solid 2px green;
    }

    .lfpr-pi-business-wrapper-my-biz {
        border: solid 1px #e6e6e6;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 5px;
        border-top: solid 2px red;
    }

    .lfpr-pi-business-title {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .lfpr-pi-business-rating {
        color: #797979;
        font-size: 30px;
        padding: 10px;
    }

    .lfpr-pi-business-stars {
        margin-bottom: 10px;
    }

    .lfpr-pi-business-reviews_nr {
        color: rgb(19, 91, 186);
    }

    .lfpr-pi-business-outline-item {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .lfpr-pi-business-outline-item-value {
        font-weight: bold;
    }

    .lfpr-pi-business-outline-item-yes {
        color: green;
    }

    .lfpr-pi-business-outline-item-no {
        color: red;
    }

    .v-menu__content, .v-menu__content {
        z-index: 99 !important;
    }
</style>