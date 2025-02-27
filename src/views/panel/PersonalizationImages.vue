<template>

  <div>
      <div v-if="showPreviewImage" @click.self="showPreviewImage = false;" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
          <div class="bg-white rounded-lg mx-6">

              <div class="">

                  <v-btn
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

      <v-skeleton-loader v-if="fetchingImages" type="article, article, article"></v-skeleton-loader>

      <div class="dashboard-box" v-if="!fetchingImages && images.length == 0">
        <v-card
          class="pa-2"
          tile
        >
          <div class="p-3">

            <br /><br /><br /><br />

            <div class="dashboard-box-iconsquare">
              <div class="dashboard-box-icon-background"></div>
              <div class="dashboard-box-icon">
                <i class="mdi mdi-file-document-multiple-outline"></i>
              </div>
            </div>

            <div style="text-align: center;">
              <div class="pt-2 pb-2">
                <strong>No Personalization Images Yet</strong>
              </div>

              <div class="text-sm mb-4 text-gray-600">
                You have no images yet. Use our tools to add images.
              </div>

              <br />

              <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="addImage()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"></i> CREATE IMAGE</div>
            </div>
            
            <br /><br /><br /><br /><br />
          </div>
        </v-card>
      </div>

      <template v-if="!fetchingImages && images.length > 0">

        <div class="dashboard-box">
          <v-card
            class="pa-2"
            tile
          >
            <div class="p-3">

              <div class="float-left pt-3">
                <a href="javascript: void(0);" @click="addImage()" style="font-size: 12px;">+ Add Image</a>
              </div>

              <div class="justify-between items-start mb-3 float-right">
                <v-menu
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="flex flex-row items-center px-4 py-2 rounded border-1 border-gray-500 text-xs text-gray-600 cursor-pointer">
                      <span class="mr-2">Actions</span>
                      <span class="text-xs" style="padding-top: 3px;">
                        <font-awesome-icon icon="chevron-down"  />
                      </span>
                    </div>
                  </template>

                  <v-list class="table-menu-actions">
                    <v-list-item class="hover:bg-gray-200"><v-list-item-title><a href="javascript: void(0);" @click="bulkDelete()"><span class="table-menu-action-icon"><i class="fa fa-trash"></i></span> Delete</a></v-list-item-title></v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <br clear="all" />

              <div class="">
              <table class="w-full rg-datatable">
                <thead class="border-b border-gray-100 w-full">
                  <tr v-if="!$vuetify.breakpoint.xs">
                    <th style="width: 30px;"></th>
                    <th>Title</th>
                    <th>Preview</th>
                    <th style="width: 200px;"></th>
                  </tr>
                </thead>
                <tbody class="w-full" style="">
                  <tr v-for="image in images" :key="image.id" class="hover:bg-gray-100">
                    <td>
                      <v-checkbox
                        :id="image.id+'-checkbox'"
                        :value="image.id"
                        v-model="selectedIds"
                        hide-details
                         :ripple="false"
                      >
                      </v-checkbox>
                    </td>
                    <td>{{ image.title }}</td>
                    <td v-if="!$vuetify.breakpoint.xs">
                      <img :src="image.preview_url" style="height: 120px; cursor: pointer; border: solid 1px #dee0e0;" @click="previewImage(image.preview_url)" />
                    </td>
                    <td>
                      <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer mr-6" @click="copyTemplate(image)">
                        <i class="fa fa-copy mr-2 text-blue"></i>
                        <span class="whitespace-no-wrap text-blue">Duplicate</span>
                      </a>

                      <a v-if="image.locked == 0" href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="editImage(image);">
                        <i class="fa fa-pen mr-2 text-blue"></i>
                        <span class="whitespace-no-wrap text-blue">Edit</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </v-card>
        </div>
      </template>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuImageActions from '@/components/menus/menuImageActions.vue'
import DialogAddImage from '@/components/dialogs/images/addImage.vue'
import moment from 'moment-timezone'

export default {
  metaInfo () {
    return {
      title: "Personalization Images | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuImageActions,
    DialogAddImage
  },
  data() {
    return {
      selectedIds: [],
      showPreviewImage: false,
      previewImageUrl: null
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      images: state => state.personalization_images.images,
      fetchingImages: state => state.personalization_images.fetchingImages
    })
  },
  methods: {
    async bulkDelete() {
      await this.$store.dispatch('personalization_images/bulkDelete', {ids: this.selectedIds})
      this.$store.dispatch('personalization_images/fetch')
      this.selectedIds = []
    },

    getPreview(content) {
        return (content.length > 100) ? content.substring(0, 100) + "..." : content;
    },

    addImage() {
      window.location = '/image-editor/';
    },

    editImage(image) {
      window.location = '/image-editor/' + image.id;
    },

    async copyTemplate(image) {
      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/personalization-images/copy`, {
        id: image.id
      }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
      })

      window.location = '/image-editor/' + response.data.template.id;
    },

    previewImage(url) {
        this.showPreviewImage = true;
        this.previewImageUrl = url;
    },
  },
  created() {
    this.$store.state.personalization_images.fetchingImages = true
    this.$store.dispatch('personalization_images/fetch')
  },
}
</script>

<style lang="scss" scoped>

.styled-checkbox {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: 0px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: rgb(228, 228, 228);
  }

  // Box hover
  /*&:hover + label:before {
    background: #f35429;
  }*/
  
  // Box focus
  &:focus + label:before {
    
    border-width: 0;
  }

  // Box checked
  &:checked + label:before {
    background: #48bb78;
  }
  
  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
}

.btn-invite {
  background-color: #00ad9e;
}

table tbody tr {
  transition: all 0.1s linear;
}

table tbody tr:hover {
  background-color: rgb(245, 245, 245);
}

.v-list-item {
  min-height: 27px;
  font-size: 13px;
}
</style>
