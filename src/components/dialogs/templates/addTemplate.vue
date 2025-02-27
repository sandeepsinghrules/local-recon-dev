<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-1/2 bg-white rounded-lg mx-6">

      <div class="rg-modal-header">
        <span v-if="id">Edit Template</span>
        <span v-if="!id">Add a Template</span>

        <a href="javascript: void(0);" class="rg-modal-close-btn" @click="hide"><i class="fa fa-times"></i></a>
      </div>

      <div class="p-6">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mb-3">
          <p class="mb-1 text-xs mb-2"><strong>
            Title
          </strong></p>
          <input name="title" ref="title" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" type="text">
        </div>

        <div class="mb-3">
          <p class="mb-1 text-xs mb-2"><strong>
            Content
          </strong></p>
          <textarea name="content" ref="content" class="rg-text-field block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white hover:border-grey px-2 py-2 rounded" style="height: 150px;"></textarea>

          <div class="bg-gray-100 rounded mt-3">
            <div class="bg-gray-100 text-xs p-3 mb-3 rounded">
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[business_name]</span> will be replaced by the actual business name</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[rating]</span> will be replaced with the average rating</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[reviews]</span> will be replaced with the number of total reviews</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[formatted_phone_number]</span> will be replaced with the number formatted locally (e.g. (813) 123-4567)</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[international_phone_number]</span> will be replaced with the number with international format (e.g. +18131234567)</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[phone_number_type]</span> will be replaced with the number's type</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[carrier]</span> will be replaced with the number's carrier</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[address]</span> will be replaced with the business's address</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[city]</span> will be replaced with the business's city</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[state]</span> will be replaced with the business's state</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[street]</span> will be replaced with the business's street</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[zip]</span> will be replaced with the business's zip or postal code</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[country]</span> will be replaced with the business's country</div>
              <div class="mb-2" style="color: #19233A !important;"><span class="font-semibold p-1">[website]</span> will be replaced with the business's website URL</div>
            </div>
          </div>
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rg-dialog-button-save rounded text-white text-xs text-bold focus:outline-none py-2 px-4 float-right" :class="{'spinner': saving}" @click="save">
            SAVE
        </button>

        <button class="rounded text-blue text-xs text-bold border border-blue focus:outline-none py-2 px-4 mr-2 float-right" @click="hide">
            CANCEL
        </button>

        <div class="clearfix"></div>

      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
      success: null,
      error: null,
      id: null
    }
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

        formData.append("title", this.$refs.title.value);
        formData.append("content", this.$refs.content.value);

        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/me/templates`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        this.hide()

    	this.$store.dispatch('templates/fetch')
    	this.error = null

      } catch (e) {
        this.error = e.response.data.message
      }
      this.saving = false
    },

    addTemplate() {
      let self = this;
      this.id = null;
      setTimeout(function() {
        try {
          this.$refs.title.value = "";
          this.$refs.content.value = "";
        }
        catch (e) {}
      }, 10);
    },

    editTemplate(template) {
      let self = this;
      this.id = template.id;
      setTimeout(function() {
        self.$refs.title.value = template.title;
        self.$refs.content.value = template.content;
      }, 10);
    }
  },
  created() {

  }
}
</script>
