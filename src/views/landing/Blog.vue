<template>
  <div>
    <landing-navigation />
    <div class="container mx-auto px-6 py-12">

      <h1 class="text-xl mb-8 text-gray-800">Our blog</h1>
      
      <div style="max-width: 700px;">
        <router-link to="/blog/should-you-buy-online-reviews"><h2 class="text-xl text-green-600 font-semibold mb-1">Should you buy online reviews</h2></router-link>
        <div class="text-gray-600 text-xs mb-2">June 07, 2019 by Jascha Burmeister</div>
        <div>The rapid growth and popularity of websites like Google, Amazon, and Yelp, have led to the growth in the significance of consumer opinions and online reviews. The online reviews can lead to the success or failure of businesses. <router-link to="/blog/should-you-buy-online-reviews" class="text-green-600">[read more]</router-link></div>
      </div>
      
    </div>
    <landing-footer></landing-footer>
  </div>
</template>

<script>
import LandingNavigation from '@/components/LandingNavigation.vue'
import LandingFooter from '@/components/LandingFooter.vue'

export default {
  components: {
    LandingNavigation,
    LandingFooter
  },
  metaInfo () {
    return {
      title: "Blog | " + this.$appName
    }
  }
};
</script>

<style lang="postcss" scoped>


</style>
