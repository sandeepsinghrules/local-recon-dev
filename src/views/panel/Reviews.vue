<template>

  <panel-navigation>
    
    <h1 class="text-lg font-semibold mb-4">Reviews</h1>

    <hr class="border-b border-gray-100">

    <br />
    <div class="reviews-section-wrapper">
      <ReviewsTable dashboard="false" social_posting="false" />
    </div>

  </panel-navigation>

</template>

<script>
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import ReviewsTable from '@/components/ReviewsTable.vue'

export default {
  metaInfo () {
    return {
      title: "Reviews | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    ReviewsTable
  }
}
</script>

<style>
  .reviews-section-wrapper .pa-2.v-card {
    border: 0px;
  }
</style>