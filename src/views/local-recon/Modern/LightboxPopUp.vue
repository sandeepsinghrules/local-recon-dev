<template>
	<div :class="'lr-popup-widget-wrapper ' + widget.widget_style.replace(/ /g, '_')" :style="'background:' + widget.background + '; padding: 30px;' +
		'color: ' + widget.text_color + '; '
	">

		<div class="lr-popup-widget-close">
			<i class="fa fa-times" @click="closePopup()"></i>
		</div>
		
		<div class="lr-popup-widget-texts">
			<div class="lr-popup-widget-title">{{ texts[widget.report_type].title }}</div>

			<div v-if="texts[widget.report_type].description" class="lr-popup-widget-description">{{ texts[widget.report_type].description }}</div>

			<div class="lr-popup-widget-subtitle">{{ texts[widget.report_type].subtitle }}</div>
		</div>

		<div class="lr-popup-widget-form">
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
    methods: {
      closePopup() {
        parent.postMessage({
            event_id: 'closePopup_' + this.widget.id,
            data: {}
        },"*");  //  `*` on any domain
      }
    },
    mounted() {
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  	.lr-popup-widget-wrapper {
  		text-align: center;
  		position: relative;
  	}

  	.lr-popup-widget-close {
  		position: absolute;
  		top: 10px;
  		right: 10px;
  		cursor: pointer;
  	}

  	.lr-popup-widget-title {
  		font-weight: bold;
  		line-height: 30px;
  		padding-bottom: 10px;
  		font-size: 22px;
  	}

  	.lr-popup-widget-description {
  		line-height: 18px;
  		padding-bottom: 10px;
  		font-size: 12px;
  		opacity: 0.7;
  	}

  	.lr-popup-widget-subtitle {
  		line-height: 22px;
  		padding-bottom: 10px;
  		font-size: 13px;
  	}

  	.lr-popup-widget-wrapper.Wide {
  		max-width: 700px;
  		margin: auto;
  	}

  	.lr-popup-widget-wrapper.Narrow {
  		max-width: 440px;
  		margin: auto;
  	}

  	.lr-popup-widget-wrapper.Wide .lr-popup-widget-texts {
  		max-width: 400px;
  		margin: auto;
  	}

  	.lr-popup-widget-wrapper.Wide .lr-popup-widget-form {
  		max-width: 400px;
  		margin: auto;
  		padding: 10px;
  	}

  	.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-texts {
  		float: left; width: 50%;
  	}

  	.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-texts .lr-popup-widget-description {
  		display: none;
  	}

  	.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-form {
  		float: right; width: 45%;
  	}

  	@media screen and (max-width: 500px) {
  		.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-texts {
  			float: none; width: 100%;
	  	}

	  	.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-texts .lr-popup-widget-description {
	  		display: none;
	  	}

	  	.lr-popup-widget-wrapper.Left_Aligned .lr-popup-widget-form {
	  		float: none; width: 100%;
	  	}
  	}
  </style>