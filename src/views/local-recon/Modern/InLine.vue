<template>
	<div :class="'lr-in-line-widget-wrapper ' + widget.widget_style.replace(/ /g, '_')" :style="'background:' + widget.background + '; padding: 30px;' +
		'color: ' + widget.text_color + ';'
	">
		<div :style="'max-width: ' + widget.container_width + 'px; margin: auto;'">
			<div class="lr-in-line-widget-texts">
				<div class="lr-in-line-widget-title">{{ texts[widget.report_type].title }}</div>

				<div v-if="texts[widget.report_type].description" class="lr-in-line-widget-description">{{ texts[widget.report_type].description }}</div>

				<div class="lr-in-line-widget-subtitle">{{ texts[widget.report_type].subtitle }}</div>
			</div>

			<div class="lr-in-line-widget-form">
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
  	.lr-in-line-widget-title {
  		font-weight: bold;
  		/*line-height: 24px;*/
  		padding-bottom: 5px;
  		font-size: 16px;
  	}

  	.lr-in-line-widget-description {
  		line-height: 18px;
  		padding-bottom: 10px;
  		font-size: 12px;
  		opacity: 0.7;
  	}

  	.lr-in-line-widget-subtitle {
  		line-height: 22px;
  		/*padding-bottom: 10px;*/
  		font-size: 13px;
  	}

  	.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-texts {
  		float: left; width: 40%;
  		/*padding-top: 15px;*/
  	}

  	.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-texts .lr-in-line-widget-description {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-form {
  		float: right; width: 50%;
  		padding-top: 6px;
  	}

  	.lr-in-line-widget-wrapper.Wide_No_Text .lr-in-line-widget-texts {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Wide_No_Text .lr-in-line-widget-form {
  		max-width: 500px;
  		margin: auto;
  	}

  	.lr-in-line-widget-wrapper.Wide_Centered .lr-in-line-widget-texts {
  		max-width: 550px;
  		margin: auto;
  		text-align: center;
  	}

  	.lr-in-line-widget-wrapper.Wide_Centered .lr-in-line-widget-form {
  		max-width: 550px;
  		margin: auto;
  		padding: 10px;
  	}

  	.lr-in-line-widget-wrapper.Wide_Centered .lr-in-line-widget-description {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered {
  		max-width: 450px;
  		margin: auto;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered .lr-in-line-widget-form {
  		padding-top: 15px;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered .lr-in-line-widget-description {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered_Left_Aligned {
  		max-width: 650px;
  		margin: auto;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered_Left_Aligned .lr-in-line-widget-description {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered_Left_Aligned .lr-in-line-widget-texts {
  		float: left; width: 50%;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered_Left_Aligned .lr-in-line-widget-texts .lr-in-line-widget-description {
  		display: none;
  	}

  	.lr-in-line-widget-wrapper.Narrow_Centered_Left_Aligned .lr-in-line-widget-form {
  		float: right; width: 45%;
  	}

  	@media screen and (max-width: 500px) {
  		.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-texts {
  			float: none; width: 100%;
	  	}

	  	.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-texts .lr-in-line-widget-description {
	  		display: none;
	  	}

	  	.lr-in-line-widget-wrapper.Wide .lr-in-line-widget-form {
	  		float: none; width: 100%;
	  	}
  	}
  </style>