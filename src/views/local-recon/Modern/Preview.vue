<template>
    <div class="lr-preview-comp" style="height: calc(100% - 20px); position: relative;">
    	<div 
    		:style='getPreviewStyles()'
    	>
    		<Render :widget="widget" />
    	</div>
    </div>
  </template>
  
  <script>

  import Render from '@/views/local-recon/Modern/Render.vue'

  export default {
    props: ['widget'],
    components: {
      Render
    },
    data() {
      return {
      };
    },
    methods: {
    	getPreviewStyles() {
    		if (this.widget.type == 'Embed') {
          return 'width: 100%; max-width: 80%; margin: auto; padding-top: 30%;';
        }

        if (this.widget.type == 'LightboxPopUp') {
          return 'width: 100%; margin: auto; padding-top: 30%; height: 100%; background: #f7f7f7';
        }

        if (this.widget.type == 'HeaderBaner' || this.widget.type == 'HelloBar') {
          return 'width: calc(100% + 50px); margin-left: -25px;';
        }

        if (this.widget.type == 'FloatingHeader') {
          return 'width: calc(100% + 50px); margin-left: -25px;';
        }

        if (this.widget.type == 'FloatingFooter') {
          return 'position: absolute; bottom: 0px; width: calc(100% + 50px); margin-left: -25px;';
        }

        if (this.widget.type == 'InLine') {
          return 'width: calc(100% + 50px); padding-top: 30%; margin-left: -25px;';
        }

        if (this.widget.type == 'FullPage') {
          return 'position: absolute; width: calc(100% + 50px); margin-left: -25px; height: 100%;';
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