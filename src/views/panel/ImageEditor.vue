<template>

    <panel-navigation>
  
      <v-app-bar app color="" class="header-top px-5" elevation="0" height="80">
          <a href="javascript: void(0);" @click="$router.push('/settings')" class="mr-6"><i class="mdi mdi-chevron-left text-gray-700" style="font-size: 40px;"></i></a>
  
          <img :src="'/favicon.png'" alt="" class="mr-6" style="width: 30px; heigh: 30px;" />

          <div style="width: 300px; display: flex;">
            <h1 v-show="!edit_name && !loadingImage" class="text-lg font-semibold" style="min-width: 300px;">{{ image.title }}</h1>

            <i  v-show="!edit_name && !loadingImage" class="mdi mdi-pencil-outline cursor-pointer ml-4" @click="edit_name = true;" style="font-size: 20px;"></i>

            <v-text-field
              v-show="edit_name"
              placeholder="Image name..."
              hide-details="true"
              v-model="image.title"
              outlined
              dense
              style="width: 300px !important;"
              :append-icon="'mdi-check'"
              @click:append="edit_name = false"
          ></v-text-field>
        </div>

        <v-tabs class="ml-40">
          <v-tab @click="showEditor()">Editor</v-tab>
          <v-tab @click="showPreview()">Preview</v-tab>
        </v-tabs>
  
        <div v-show="!preview" class="bg-blue text-white text-bold text-xs inline-block rounded py-2 px-3 cursor-pointer float-right" :class="{'spinner': savingEditor}" @click="saveImageTemplate()" style="margin-left: auto;">SAVE</div>
      </v-app-bar>

        <div v-if="loadingImage" style="padding: 100px; text-align: center;">
          <i class="fa fa-spinner fa-spin" style="font-size: 20px;"></i>
        </div>

        <div v-if="!preview" style="height: 100%;">
          <div v-show="!loadingImage" class="flex flex-row flex-wrap" style="height: 100%;">
              <iframe id="imageEditorIframe" :src="getEditorUrl()" style="width: 100%; height: 100%;"></iframe>
          </div>
        </div>
        <div v-else style="height: 100%;">
          <div class="float-left" style="width: 30%; height: 100%; border-top: solid 1px #F2F2F2; border-right: solid 1px #F2F2F2; background: #FFFFFF;">
            <div class="p-3">

              <div class="mb-3">
                  <p class="mb-1 text-xs mb-2"><strong>
                      Search
                  </strong></p>
                  
                  <v-select
                    :items="searches"
                    item-value="id"
                    v-model="selectedSearchId"
                    @change="selectSearch()"
                    outlined
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

              <div v-if="selectedSearchId" class="mb-3">
                  <p class="mb-1 text-xs mb-2"><strong>
                      Business
                  </strong></p>
                  
                  <v-select
                    :items="search_results"
                    item-value="id"
                    v-model="selectedBusinessId"
                    @change="chooseBusiness()"
                    outlined
                  >
                    <template slot="selection" slot-scope="data">
                      <!-- HTML that describe how select should render selected items -->
                      {{ data.item.name }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <!-- HTML that describe how select should render items when the select is open -->
                      {{ data.item.name }}
                    </template>
                </v-select>
              </div>

              <div v-if="selectedSearchId" class="mb-3">
                  <p class="mb-1 text-xs mb-2"><strong>
                      Competitor
                  </strong></p>
                  
                  <v-select
                    :items="search_results"
                    item-value="id"
                    v-model="selectedCompetitorId"
                    @change="chooseCompetitor()"
                    outlined
                  >
                    <template slot="selection" slot-scope="data">
                      <!-- HTML that describe how select should render selected items -->
                      {{ data.item.name }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <!-- HTML that describe how select should render items when the select is open -->
                      {{ data.item.name }}
                    </template>
                  </v-select>
              </div>

            </div>
          </div>
          <div class="float-left" style="width: 70%; height: 100%;">
            <iframe id="imageEditorIframe" :src="getEditorPreviewUrl()" style="width: 100%; height: 100%;"></iframe>
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
  
  export default {
    metaInfo () {
      return {
        title: "Design Editor | " + this.$appName
      }
    },
    components: {
      PanelNavigation
    },
    data () {
      return {
        savingEditor: false,
        loadingImage: true,
        edit_name: false,

        preview: false,

        selectedSearchId: null,
        selectedBusinessId: null,
        selectedCompetitorId: null,
        selectedBusiness: null,
        selectedCompetitor: null,
        search_results: [],

        image: {
          id: null,
          title: "Edit Title",
          type: "Custom",
          settings: '{}'
        }
      }
    },
    computed: {
      ...mapState({
        me: state => state.me.me,
        searches: state => state.searches.searches,
      })
    },
    methods: {
      saveImageTemplate() {
        document.getElementById('imageEditorIframe').contentWindow.saveImage();
      },

      async finishSavingImage(storeJson) {
        this.savingEditor = true;

        let dataURL = await document.getElementById('imageEditorIframe').contentWindow.store.toDataURL();

        let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/personalization-images`, {
          id: this.image.id,
          title: this.image.title,
          type: "Custom",
          settings: JSON.stringify(storeJson),
          dataURL: dataURL
        }, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            }
        })

        this.$store.dispatch('personalization_images/fetch')
        this.error = null
        this.savingEditor = false;

        this.image.id = response.data.id;
      },
      showEditor() {
        this.preview = false;
      },
      showPreview() {
        // this.saveImageTemplate();

        this.preview = true;
      },

      async selectSearch() {
        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/searches/get-search?id=' + this.selectedSearchId, {
            filters: this.filters
        }, {
            headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        this.search_results = response.data.search.search_results;
      },

      chooseBusiness() {
        for (var i in this.search_results) {
          if (this.search_results[i].id == this.selectedBusinessId)
            this.selectedBusiness = this.search_results[i];
        }
        console.log(this.selectedBusiness)
        this.pushPreview();
      },

      chooseCompetitor() {
        for (var i in this.search_results) {
          if (this.search_results[i].id == this.selectedCompetitorId)
            this.selectedCompetitor = this.search_results[i];
        }
        console.log(this.selectedCompetitor)
        this.pushPreview();
      },

      pushPreview() {
        window.selectedBusiness = this.selectedBusiness;
        window.selectedCompetitor = this.selectedCompetitor;
        // new_preview_url += '&competitor=' + btoa(JSON.stringify(this.selectedCompetitor));

        // document.getElementById("imageEditorIframe").src = new_preview_url;

        document.getElementById('imageEditorIframe').contentWindow.applyStoreJson(this.image.settings);
      },

      getEditorUrl() {
        return ((process.env.NODE_ENV == 'development') ?
                  'http://localhost:3000/' :
                  'https://editor.localleadsniper.com/');
      },

      getEditorPreviewUrl() {
        return ((process.env.NODE_ENV == 'development') ?
                  'http://localhost:3000/?preview=1' :
                  'https://editor.localleadsniper.com/?preview=1');
      }
    },
    mounted() {
      this.$store.dispatch('searches/fetch', {
          page: 1,
          itemsPerPage: 100
      })
      
      let self = this;
      if (typeof finishSavingImage == "undefined") { 
        window.finishSavingImage = function(storeJson) {
          // console.log('finishssssszzzzzzzzzz savingzzzzzz', storeJson);
          self.finishSavingImage(storeJson);
        };
      }

      delete window.imageEditorLoaded;

      // if (typeof imageEditorLoaded == "undefined") { 
        window.imageEditorLoaded = function() {
          console.log('self.$route.params.id', self.$route.params.id)
          if (self.$route.params.id) {
            self.loadingImage = true;
            console.log('hohere1');
            axios.get(`${process.env.VUE_APP_API_ENDPOINT}/me/personalization-images/${self.$route.params.id}`, {
                headers: {
                  'Authorization': 'Bearer ' + self.$store.state.auth.jwt
                }
            }).then(function(response) {
              self.image = response.data.image;

              console.log('self.image', self.image)

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
                document.getElementById('imageEditorIframe').contentWindow.applyStoreJson(self.image.settings);
              };

              self.loadingImage = false;
            });
          }
          else {
            console.log('hohere2');
            self.image.id = null;
            self.loadingImage = false;
          }
        };
      // }
    }
  }
  </script>
  
  <style scoped>

  </style>