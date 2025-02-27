<template>
	<div :class="'lr-embed-widget-wrapper ' + widget.widget_style.replace(/ /g, '_')" :style="'background:' + widget.background + '; padding: 30px;' +
		'color: ' + widget.text_color + '; '
	">
		
		<div class="lr-embed-widget-texts">
			<div class="lr-embed-widget-title">{{ texts[widget.report_type].title }}</div>

			<div v-if="texts[widget.report_type].description" class="lr-embed-widget-description">{{ texts[widget.report_type].description }}</div>

			<div class="lr-embed-widget-subtitle">{{ texts[widget.report_type].subtitle }}</div>
		</div>

		<div class="lr-embed-widget-form">
			<WidgetForm :widget="widget" :texts="texts" />
		</div>

		<div style="clear: both;"></div>

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
  	.lr-embed-widget-wrapper.Centered {
  		text-align: center;
  	}

  	.lr-embed-widget-title {
  		font-weight: bold;
  		line-height: 30px;
  		padding-bottom: 10px;
  		font-size: 22px;
  	}

  	.lr-embed-widget-description {
  		line-height: 18px;
  		padding-bottom: 10px;
  		font-size: 12px;
  		opacity: 0.7;
  	}

  	.lr-embed-widget-subtitle {
  		line-height: 22px;
  		padding-bottom: 10px;
  		font-size: 13px;
  	}

  	.lr-embed-widget-wrapper.Centered .lr-embed-widget-texts {
  		max-width: 400px;
  		margin: auto;
  	}

  	.lr-embed-widget-wrapper.Centered .lr-embed-widget-form {
  		max-width: 400px;
  		margin: auto;
  		padding: 10px;
  	}

  	.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-texts {
  		float: left; width: 50%;
  	}

  	.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-texts .lr-embed-widget-description {
  		display: none;
  	}

  	.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-form {
  		float: right; width: 45%;
  	}

  	@media screen and (max-width: 500px) {
  		.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-texts {
  			float: none; width: 100%;
	  	}

	  	.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-texts .lr-embed-widget-description {
	  		display: none;
	  	}

	  	.lr-embed-widget-wrapper.Left_Aligned .lr-embed-widget-form {
	  		float: none; width: 100%;
	  	}
  	}
  </style>