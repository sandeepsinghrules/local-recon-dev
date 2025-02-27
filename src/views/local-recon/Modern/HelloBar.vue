<template>
	<div :class="'lr-hello-bar-widget-wrapper ' + widget.widget_style.replace(/ /g, '_')" :style="'background:' + widget.background + '; padding: 15px;' +
		'color: ' + widget.text_color + ';'
	">
		<div :style="'max-width: ' + widget.container_width + 'px; margin: auto;'">
			<div class="lr-hello-bar-widget-texts">
				<div class="lr-hello-bar-widget-title">{{ texts[widget.report_type].title }}</div>

				<div v-if="texts[widget.report_type].description" class="lr-hello-bar-widget-description">{{ texts[widget.report_type].description }}</div>

				<div class="lr-hello-bar-widget-subtitle">{{ texts[widget.report_type].subtitle }}</div>
			</div>

			<div class="lr-hello-bar-widget-form">
				<WidgetForm :widget="widget" :texts="texts" />
			</div>

			<div style="clear: both;"></div>
		</div>

	</div>
  </template>
  
  <script>

  	import WidgetForm from '@/views/local-recon/Modern/Form.vue'

  export default {
    props: ['widget', 'texts'],
    components: {
    	WidgetForm
    },
    data() {
      return {
        
      };
    },
    mounted() {
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  	.lr-hello-bar-widget-wrapper {
  		box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.10);
  	}

  	.lr-hello-bar-widget-title {
  		font-weight: bold;
  		/*line-height: 24px;*/
  		padding-bottom: 5px;
  		font-size: 16px;
  	}

  	.lr-hello-bar-widget-description {
  		line-height: 18px;
  		padding-bottom: 10px;
  		font-size: 12px;
  		opacity: 0.7;
  	}

  	.lr-hello-bar-widget-subtitle {
  		line-height: 22px;
  		/*padding-bottom: 10px;*/
  		font-size: 13px;
  	}

  	.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-texts {
  		float: left; width: 40%;
  	}

  	.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-texts .lr-hello-bar-widget-description {
  		display: none;
  	}

  	.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-form {
  		float: right; width: 50%;
  		padding-top: 6px;
  	}

  	@media screen and (max-width: 500px) {
  		.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-texts {
  			float: none; width: 100%;
	  	}

	  	.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-texts .lr-hello-bar-widget-description {
	  		display: none;
	  	}

	  	.lr-hello-bar-widget-wrapper.Left_Aligned .lr-hello-bar-widget-form {
	  		float: none; width: 100%;
	  	}
  	}
  </style>