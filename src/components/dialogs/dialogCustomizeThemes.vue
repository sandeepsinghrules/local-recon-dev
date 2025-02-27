<template>

  <div v-if="showModal" class="fixed top-0 left-0 h-full w-full z-50 flex flex-col items-center justify-top px-4" style="background-color: rgba(0,0,0,.3);">
    <div class="w-full bg-white shadow rounded-lg mx-6 mt-24" style="max-width: 800px;">

    <div class="p-6">

      <h2 class="text-lg font-semibold text-gray-800 mb-3">Customize Themes</h2>
      
      Customize any of the themes (max 10) to be used with your social image.

      <br />

      <br />

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/4">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">Themes</h2>

          <br />

          <template v-if="me">
            <v-row class="pl-2 pt-3">
              <v-avatar v-for="theme in themes" :key="theme.id" :class="'mr-4 ml-4 mb-2 ' + ((selected_theme.id == theme.id) ? 'selected' : '')" v-bind:style="{ backgroundColor: theme.background_color, color: theme.text_color }" @click="selectTheme(theme)">
                <img
                  :src="theme.background_image"

                  class="social-share-circle"

                  v-if="theme.background_image"
                >
                <span class="headline" style="position: absolute;">Aa</span>
              </v-avatar>

              <v-avatar v-if="themes.length < 10" class="add-more ml-4" @click="addTheme()">
                <span class="headline"><i class="fa fa-plus"></i></span>
              </v-avatar>
            </v-row>
          </template>
        </div>

        <div class="w-full md:w-3/4 sm:pr-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">Background Options</h2>

          <br />

          <v-card class="mb-5"
              elevation="2"
          >
            <div style="position: relative; text-align: center; padding: 120px; overflow:hidden;" v-bind:style="{ backgroundColor: selected_theme.background_color, color: selected_theme.text_color }">
              <img :src="selected_theme.background_image" v-if="selected_theme.background_image" style="position: absolute; left: 0px; top: 0px; width: 100%; min-height: 100%;" />
              <div style="z-index: 3; position: relative;">This is an example of what the feedback text will look like over this background.</div>
              <button v-if="selected_theme.background_image" class="bg-orange-600 text-white inline-block rounded px-2 cursor-pointer" style="padding-top: 2px; position: absolute; z-index: 2; right: 10px; bottom: 10px;" @click="removeImage()"><i class="fa fa-times text-orange"></i> Remove Image</button>
              <div :class="'social-share-theme-modal-overlay js-modal-theme-overlay is-none ' + ((selected_theme.overlay_type == 'Dark') ? 'is-dark' : '') + ' ' + ((selected_theme.overlay_type == 'Light') ? 'is-light' : '')"></div>
            </div>
          </v-card>

          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 sm:pr-6 mb-8">

              Background:
              
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="selected_theme.background_color"
                    dark
                    v-on="on"
                  >
                  </v-btn>
                </template>
                <v-color-picker
                  v-model="selected_theme.background_color"
                  mode="hexa"
                  class="mx-auto"
                ></v-color-picker>
              </v-menu>

              <br /><br />

              <v-file-input
                accept="image/*"
                label="Upload Image"
                style="width: 200px;"
                v-model="file"
                @change="onUpload"
              ></v-file-input>

              <i v-if="uploading" class="fa fa-spin fa-spinner"></i>
            </div>

             <div class="w-full md:w-1/2 sm:pr-6 mb-8" style="text-align: right;">

              Text Color:
              <v-menu offset-y  :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="selected_theme.text_color"
                    dark
                    v-on="on"
                  >
                  </v-btn>
                </template>
                <v-color-picker
                  v-model="selected_theme.text_color"
                  mode="hexa"
                  class="mx-auto"
                ></v-color-picker>
              </v-menu>

              <br /><br />

              <v-select
                v-model="selected_theme.overlay_type"
                :items="overlay_items"
                label="Overlay"
                style="width: 200px; float: right;"
              ></v-select>

            </div>
          </div>
        </div>
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

export default {
  props: {
    plan: String,
    price: String
  },
  computed: {
    ...mapState({
      me: state => state.me.me
    }),
    swatchStyle() {
      const { color, menu } = this
      return {
        backgroundColor: color,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },
  data: function() {
    return {
      show_background_color: false,
      showModal: false,
      complete: false,
      subscribing: false,
      selected_theme: null,
      mask: '!#XXXXXXXX',
      menu: false,
      overlay_items: [
        'None',
        'Dark',
        'Light'
      ],
      themes: [],
      saving: false,
      file: null,
      uploading: false
    }
  },
  methods: {
    show() {
      var self = this;

      setThemes();

      function setThemes() {
        if (!self.me) {
          setTimeout(function() {
            setThemes();
          }, 1000);
          return;
        }

        self.themes = [];

        for (var i in self.me.social_posting_themes) {
          self.themes.push({
            id: self.me.social_posting_themes[i].id,
            background_color: self.me.social_posting_themes[i].background_color,
            background_image: self.me.social_posting_themes[i].background_image,
            overlay_type: self.me.social_posting_themes[i].overlay_type,
            text_color: self.me.social_posting_themes[i].text_color
          });
        }
        self.selected_theme = self.themes[0];
      }
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    async save() {
      this.saving = true

      try {
        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/save-posting-themes`, { themes: this.themes }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
        })

        this.hide()
        this.$store.dispatch('me/fetch')
        this.saving = false
      }catch(e){
        console.log(e)
      }
    },

    selectTheme(theme) {
      this.selected_theme = theme;
    },

    async onUpload() {
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

          this.selected_theme.background_image = response.data.url
        }catch(e){
          console.log(e)
        }

        this.file = null
        this.uploading = false
      }
    },

    removeImage() {
      this.selected_theme.background_image = ''
    },

    addTheme() {
      let new_theme = {
        background_color: "#FFFFFF",
        background_image: "",
        text_color: "#000000",
        overlay_type: "None",
        id: this.themes.length
      }

      this.themes.push(new_theme)
      this.selectTheme(new_theme)
    }

  },
  created() {
    
    // this.$store.dispatch('integrations/fetch')
  }
}
</script>

<style>
  .social-share-theme-modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .social-share-theme-modal-overlay.is-light {
    background-color: rgba(255, 255, 255, 0.6);
  }

  .social-share-theme-modal-overlay.is-dark {
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
