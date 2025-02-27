<template>
    <div style="height: 100%;">
    	<LightboxPopUp v-if="widget.type == 'LightboxPopUp'" :widget="widget" :texts="texts" />

      <HeaderBanner v-if="widget.type == 'HeaderBaner'" :widget="widget" :texts="texts" />

      <FloatingHeader v-if="widget.type == 'FloatingHeader'" :widget="widget" :texts="texts" />

      <FloatingFooter v-if="widget.type == 'FloatingFooter'" :widget="widget" :texts="texts" />

      <InLine v-if="widget.type == 'InLine'" :widget="widget" :texts="texts" />

      <HelloBar v-if="widget.type == 'HelloBar'" :widget="widget" :texts="texts" />

    	<Embed v-if="widget.type == 'Embed'" :widget="widget" :texts="texts" />

      <FullPage v-if="widget.type == 'FullPage'" :widget="widget" :texts="texts" />
    </div>
  </template>
  
  <script>

  import LightboxPopUp from '@/views/local-recon/Modern/LightboxPopUp.vue'
  import HeaderBanner from '@/views/local-recon/Modern/HeaderBanner.vue'
  import FloatingHeader from '@/views/local-recon/Modern/FloatingHeader.vue'
  import FloatingFooter from '@/views/local-recon/Modern/FloatingFooter.vue'
  import InLine from '@/views/local-recon/Modern/InLine.vue'
  import HelloBar from '@/views/local-recon/Modern/HelloBar.vue'
  import Embed from '@/views/local-recon/Modern/Embed.vue'
  import FullPage from '@/views/local-recon/Modern/FullPage.vue'

  export default {
    props: ['widget'],
    components: {
      LightboxPopUp,
      HeaderBanner,
      FloatingHeader,
      FloatingFooter,
      InLine,
      HelloBar,
      Embed,
      FullPage
    },
    data() {
      return {
        texts: {
        	'Reputation': {
        		title: "What Customers See About Your Business Online?",
        		subtitle: "Enter your business name and we’ll do the rest!",
        		description: "The information you provide on this form will be used to be in touch with you and to provide updates and marketing.",
        		button: "Get Your Business Audit"
        	},
        	'SEO': {
        		title: "Enter your website URL address and get a Free Website Analysis!",
        		subtitle: "We scan your website for technical and SEO mistakes.",
        		description: "Additionally we provide a clear, actionable, prioritised list of recommendations to help improve.",
        		button: "Get Your SEO Audit"
        	},
        	'Grid Tracker': {
        		title: "The Quickest Way To Discover Your Local Visibility",
        		subtitle: "Track your local SEO practice accurately and beat your competitors down the local search ranking.",
        		description: "",
        		button: "Run Scan"
        	},
        	// 'Review Responses': {
        	// 	title: "The Quickest Way To Generate Review Responses",
        	// 	subtitle: "We help automate generation of review responses. Use our tool to generate responses for all your customers.",
        	// 	description: "",
        	// 	button: "Generate Responses"
        	// },
        	'GBP Audit': {
        		title: "Improve Your Google Business Profile",
        		subtitle: "Take control of your GMB profile, see why your competitors rank better and improve your Google Business Profile.",
        		description: "",
        		button: "Get Started"
        	},
        	'Review Link Generator': {
        		title: "Google Review Link & Place ID Generator",
        		subtitle: "With our free tool, you can generate a Google review link for customers, also find the Place ID, Ludocid, and FID codes.",
        		description: "",
        		button: "Fetch Links And Ids"
        	},
        	'Citation Audit': {
        		title: "Scan Your Business",
        		subtitle: "Citation Tracker looks for your business information on the most important sites, listing your details and inaccuracies.",
        		description: "",
        		button: "Find Citations"
        	},
        }
      }
    },
    mounted() {
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
