<template>

  <div>
    <dialog-add-template ref="dialogAddTemplate"></dialog-add-template>

      <v-skeleton-loader v-if="fetchingTemplates" type="article, article, article"></v-skeleton-loader>

      <div class="dashboard-box" v-if="!fetchingTemplates && templates.length == 0">
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
                <strong>No SMS Templates Yet</strong>
              </div>

              <div class="text-sm mb-4 text-gray-600">
                You have no templates yet. Use our tools to add templates.
              </div>

              <br />

              <div class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" @click="addTemplate()" style="margin-top: -5px;"><i class="fa fa-plus mr-2"></i> ADD SMS TEMPLATE</div>
            </div>
            
            <br /><br /><br /><br /><br />
          </div>
        </v-card>
      </div>

      <template v-if="!fetchingTemplates && templates.length > 0">

        <div class="dashboard-box">
          <v-card
            class="pa-2"
            tile
          >
            <div class="p-3">

              <div class="float-left pt-3">
                <a href="javascript: void(0);" @click="addTemplate()" style="font-size: 12px;">+ Add Template</a>
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
                    <th></th>
                    <th>Title</th>
                    <th style="width: 65%;">Preview</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="w-full" style="">
                  <tr v-for="template in templates" :key="template.id" class="hover:bg-gray-100">
                    <td>
                      <v-checkbox
                        :id="template.id+'-checkbox'"
                        :value="template.id"
                        v-model="selectedIds"
                        hide-details
                         :ripple="false"
                      >
                      </v-checkbox>
                    </td>
                    <td>{{ template.title }}</td>
                    <td v-if="!$vuetify.breakpoint.xs">{{ getPreview(template.content) }}</td>
                    <td style="width: 200px;">
                      <a href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer mr-6" @click="copyTemplate(template)">
                        <i class="fa fa-copy mr-2 text-blue"></i>
                        <span class="whitespace-no-wrap text-blue">Duplicate</span>
                      </a>

                      <a v-if="template.user_id != 1" href="javascript: void(0);" class="text-xs font-semibold rounded cursor-pointer" @click="editTemplate(template)">
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
import MenuTemplateActions from '@/components/menus/menuTemplateActions.vue'
import DialogAddTemplate from '@/components/dialogs/templates/addTemplate.vue'
import moment from 'moment-timezone'

export default {
  metaInfo () {
    return {
      title: "Templates | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuTemplateActions,
    DialogAddTemplate
  },
  data() {
    return {
      selectedIds: []
    }
  },
  computed: {
    ...mapState({
      me: state => state.me.me,
      templates: state => state.templates.templates,
      fetchingTemplates: state => state.templates.fetchingTemplates
    })
  },
  methods: {
    async bulkDelete() {
      await this.$store.dispatch('templates/bulkDelete', {ids: this.selectedIds})
      this.$store.dispatch('templates/fetch')
      this.selectedIds = []
    },

    getPreview(content) {
        return content;
        // return (content.length > 100) ? content.substring(0, 100) + "..." : content;
    },

    addTemplate() {
        this.$refs.dialogAddTemplate.addTemplate();
        this.$refs.dialogAddTemplate.show();
    },

    editTemplate(template) {
        this.$refs.dialogAddTemplate.editTemplate(template);
        this.$refs.dialogAddTemplate.show();
    },

    async copyTemplate(template) {
      let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/templates/copy`, {
        id: template.id
      }, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          }
      })

      await this.$store.dispatch('templates/fetch');

      let copiedTemplate = response.data.template;
      this.editTemplate(copiedTemplate);
    }
  },
  created() {
    this.$store.state.templates.fetchingTemplates = true
    this.$store.dispatch('templates/fetch')
  },
}
</script>

<style lang="scss" scoped>

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
