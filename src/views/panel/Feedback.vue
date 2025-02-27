<template>

  <panel-navigation>
    
    <h1 class="text-lg font-semibold mb-4">Feedback</h1>

    <hr class="border-b border-gray-100">


    <div v-if="fetchingFeedback">
      <br /><br />
      <v-skeleton-loader type="article, article, article"></v-skeleton-loader>
    </div>

    <div v-if="!fetchingFeedback">
	    <div v-if="sortedFeedback.length == 0" class="bg-gray-100 flex flex-col justify-center items-center">
	      <div class="text-gray-300">
	        <img src="@/assets/images/icons/empty.svg" alt="" class="mt-12" style="max-width: 200px;">
	      </div>
	      <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No direct feedback yet. Check back later :)</div>
	    </div>

	    <div v-else>
	        <div v-for="fb in sortedFeedback" :key="fb.id" class="border-b border-gray-200 text-sm p-3 text-gray-800 bg-white mb-2">
	          <div class="absolute text-gray-400"><svg width="20" height="20"  class="fill-current" viewBox="0 0 1941 1941" xmlns="http://www.w3.org/2000/svg"><path d="M906.667 1088v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136zm896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V768q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136z"/></svg></div>
	          <div class="ml-8">
                {{ fb.text }}
                <em v-if="fb.contact.first_name || fb.contact.last_name">({{ fb.contact.first_name }} {{ fb.contact.last_name }})</em>
                -
                {{ formatDate(fb.created_at) }}
              </div>
	        </div>
	    </div>
	</div>

  </panel-navigation>

</template>

<script>
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import moment from 'moment'

export default {
  metaInfo () {
    return {
      title: "Feedback | " + this.$appName
    }
  },
  components: {
    PanelNavigation
  },
  computed: {
    ...mapState({
      feedback: state => state.feedback.feedback,
      fetchingFeedback: state => state.feedback.fetchingFeedback
    }),
    sortedFeedback() {
      return this.feedback
    },
  },
  methods: {
  	formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY')
    }
  },
  created() {
    this.$store.state.feedback.fetchingFeedback = true
    this.$store.dispatch('feedback/fetch')
  }
}
</script>

