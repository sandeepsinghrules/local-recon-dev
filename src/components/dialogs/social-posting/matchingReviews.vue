<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-4/5 bg-white rounded-lg mx-6" style="max-height: 100%;">

      <div class="p-6" style="height: calc(100% - 70px); overflow: hidden;">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">View {{ this.$parent.matching_reviews_count }} Matching Reviews</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div style="height: calc(100% - 70px); overflow: auto;">
            <ReviewsTable dashboard="false" social_posting="true" />
        </div>
      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Close
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ReviewsTable from '@/components/ReviewsTable.vue'

export default {
  data: function() {
    return {
      showModal: false
    }
  },
  components: {
      ReviewsTable
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    }
  },
  created() {

  }
}
</script>
