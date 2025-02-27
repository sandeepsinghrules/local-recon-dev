<template>
    <div>
    	<div v-if="CalculatorStyle == 'Style1'">
    		<v-card>
              <div class="float-left" style="width: 70%; height: 350px; color: #7F7F7F;">
                  <div style="padding: 20px;">
                      <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                          <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Negative reviews per year</span>
                      </v-subheader>
                      <v-slider
                          v-model="widget.properties.negative_reviews_per_year"
                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
                          :thumb-size="36"
                          thumb-label="always"
                          :color="widget.properties.sliders_color"
                          track-color="blue-grey lighten-4"
                          :track-fill-color="widget.properties.sliders_color"
                          min="1"
                          max="100"
                          hide-details
                      ></v-slider>

                      <v-subheader class="pl-0 mb-6">
                          <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">% of complaints resolved via review response</span>
                      </v-subheader>
                      <v-slider
                          v-model="widget.properties.percentage_of_complaints"
                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
                          :thumb-size="36"
                          thumb-label="always"
                          :color="widget.properties.sliders_color"
                          track-color="blue-grey lighten-4"
                          :track-fill-color="widget.properties.sliders_color"
                          min="1"
                          max="100"
                          hide-details
                      ></v-slider>

                      <v-subheader class="pl-0 mb-11">
                          <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Customer lifetime value ({{ widget.properties.currency }})</span>
                      </v-subheader>
                      <v-slider
                          v-model="widget.properties.customer_lifetime_value"
                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
                          :thumb-size="50"
                          thumb-label="always"
                          :color="widget.properties.sliders_color"
                          track-color="blue-grey lighten-4"
                          :track-fill-color="widget.properties.sliders_color"
                          min="50"
                          max="100000"
                          hide-details
                      ></v-slider>
                  </div>
              </div>
              <div class="float-right text-center" :style="'width: 30%; height: 350px; padding-top: 100px; font-size: 24px; background-color: ' + widget.properties.result_background_color + '; color: ' + widget.properties.result_text_color + '; font-weight: bold;'">
                  <h3 style="line-height: 52px;">Revenue</h3>
                  <h3 class="lr_calculated_revenue" style="line-height: 52px;">{{ widget.properties.calculated_revenue }}</h3>
                  <!-- <h3>&nbsp;</h3> -->
              </div>

              <div class="clearfix"></div>
          </v-card>
    	</div>

    	<div v-if="CalculatorStyle == 'Style2'">
    		<div class="dashboard-box">
    			<v-card
                    class="pa-2"
                    tile
                >
                    <div class="p-2">
                		<div class="flex flex-row flex-wrap">
                			<div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3 pt-6">
                				<div style="width: 220px; margin: auto; text-align: center;">
									<svg width="220" height="110" viewBox="100 0 20 110" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 110C1.26286e-06 95.5546 2.84524 81.2506 8.37326 67.9048C13.9013 54.559 22.0038 42.4327 32.2183 32.2182C42.4327 22.0038 54.559 13.9013 67.9048 8.37325C81.2506 2.84523 95.5546 -1.89429e-06 110 0C124.445 1.89429e-06 138.749 2.84524 152.095 8.37326C165.441 13.9013 177.567 22.0038 187.782 32.2183C197.996 42.4327 206.099 54.559 211.627 67.9048C217.155 81.2507 220 95.5546 220 110L192.45 110C192.45 99.1725 190.317 88.451 186.174 78.4477C182.03 68.4444 175.957 59.3552 168.301 51.699C160.645 44.0428 151.556 37.9696 141.552 33.8261C131.549 29.6826 120.828 27.5499 110 27.5499C99.1725 27.5499 88.451 29.6826 78.4477 33.8261C68.4444 37.9696 59.3552 44.0428 51.699 51.699C44.0428 59.3552 37.9696 68.4444 33.8261 78.4477C29.6826 88.451 27.5499 99.1725 27.5499 110H0Z" fill="#2477F6" fill-opacity="0.2"/>
									<path d="M0 110C1.54001e-06 92.3843 4.23068 75.0263 12.3361 59.3861C20.4416 43.746 32.1847 30.2812 46.5776 20.1246L62.462 42.6342C51.6738 50.2471 42.8718 60.3395 36.7964 72.0626C30.721 83.7856 27.5499 96.7962 27.5499 110L0 110Z" fill="#19233A"/>
									<path d="M48.4418 18.8376C61.7861 9.82671 76.946 3.8553 92.8509 1.34501L97.1459 28.5581C85.2245 30.4397 73.8615 34.9155 63.8593 41.6696L48.4418 18.8376Z" fill="#2477F6"/>
									<path d="M94.6388 1.07786C118.697 -2.3151 143.202 2.35274 164.329 14.3528L150.722 38.308C134.887 29.3134 116.519 25.8147 98.4861 28.3578L94.6388 1.07786Z" fill="#FFB443"/>
									<path d="M166.457 15.5935C182.782 25.3561 196.296 39.185 205.681 55.7301C215.065 72.2752 219.999 90.971 220 109.992L192.45 109.994C192.449 95.7369 188.751 81.7235 181.717 69.3222C174.683 56.9209 164.553 46.5555 152.317 39.238L166.457 15.5935Z" fill="#3EBB80"/>
									</svg>
									<br />
									<div style="color: #CCCCCC; margin-top: -60px;">Revenue</div>

									<div class="lr_calculated_revenue" style="color: #000000; font-size: 22px; font-weight: bold;">{{ widget.properties.calculated_revenue }}</div>

									<div style="color: #000000; font-weight: bold; padding-top: 50px;">Customer Retention</div>
                				</div>
                			</div>

                			<div class="dashboard-box stats-box w-full px-2 md:w-2/3 lg:w-2/3 pt-1 pb-1" style="font-size: 14px;">
                				<div class="flex flex-row flex-wrap">
                					<div class="w-full px-2 md:w-1/2 lg:w-1/2">
                						<div style="background: rgba(25, 35, 58, 0.05); padding: 20px;">
                							<div class="mb-3" :style="'color: ' + widget.properties.titles_color">Negative reviews per year: <strong>{{ widget.properties.negative_reviews_per_year }}</strong></div>

                							<v-slider
						                          v-model="widget.properties.negative_reviews_per_year"
						                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
						                          :color="widget.properties.sliders_color"
						                          track-color="blue-grey lighten-4"
						                          :track-fill-color="widget.properties.sliders_color"
                          min="1"
                          max="100"
						                          hide-details
						                      >
						                      </v-slider>
                						</div>
                					</div>

                					<div class="w-full px-2 md:w-1/2 lg:w-1/2">
                						<div style="background: rgba(25, 35, 58, 0.05); padding: 20px;">
                							<div class="mb-3" :style="'color: ' + widget.properties.titles_color">% of complaints resolved via review response: <strong>{{ widget.properties.percentage_of_complaints }}</strong></div>

                							<v-slider
						                          v-model="widget.properties.percentage_of_complaints"
						                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
						                          :color="widget.properties.sliders_color"
						                          track-color="blue-grey lighten-4"
						                          :track-fill-color="widget.properties.sliders_color"
						                          min="1"
						                          max="100"
						                          hide-details
						                    ></v-slider>
                						</div>
                					</div>

                					<div class="w-full px-2 mt-3">
                						<div style="background: rgba(25, 35, 58, 0.05); padding: 20px;">
                							<div class="mb-3" :style="'color: ' + widget.properties.titles_color">Customer lifetime value ({{ widget.properties.currency }}): <strong>{{ widget.properties.customer_lifetime_value }}</strong></div>

                							<v-slider
					                          v-model="widget.properties.customer_lifetime_value"
					                          @change="widget.properties.calculated_revenue = calculatedRevenue();"
					                          :color="widget.properties.sliders_color"
					                          track-color="blue-grey lighten-4"
					                          :track-fill-color="widget.properties.sliders_color"
                          min="50"
                          max="100000"
					                          hide-details
					                      ></v-slider>
                						</div>
                					</div>
                				</div>
                			</div>
                		</div>
                    </div>
                </v-card>
    		</div>
    	</div>

    	<div v-if="CalculatorStyle == 'Style3'">
    		<div class="dashboard-box" style="max-width: 500px;">
    			<v-card
                    class="pa-2"
                    tile
                >
                    <div class="p-3">
                		<div class="flex flex-row flex-wrap">
                			<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pt-6">
                				<div style="width: 220px; margin: auto; line-height: 50px;">
									<div style="color: #CCCCCC; margin-top: 0px;">Revenue</div>

									<div class="lr_calculated_revenue" style="color: #000000; font-size: 22px; font-weight: bold;">{{ widget.properties.calculated_revenue }}</div>

									<div style="color: #000000; font-weight: bold; padding-top: 0px;">Customer Retention</div>
                				</div>
                			</div>

                			<div class="dashboard-box stats-box w-full px-2 md:w-1/2 lg:w-1/2 pt-6">
                				<div style="width: 220px; margin: auto; text-align: center; margin-top: -20px;">
									<svg width="192" height="190" viewBox="0 0 192 190" fill="none" xmlns="http://www.w3.org/2000/svg">
									<ellipse cx="95.6507" cy="95" rx="95.6507" ry="95" fill="white"/>
									<path opacity="0.6" d="M140.082 179.128C127.797 185.529 114.258 189.198 100.403 189.883C86.5475 190.567 72.7082 188.25 59.8445 183.093C46.9809 177.935 35.4007 170.06 25.9071 160.014C16.4135 149.968 9.23367 137.991 4.86557 124.913L43.4851 112.188C45.9951 119.703 50.1206 126.585 55.5757 132.357C61.0308 138.13 67.6848 142.655 75.0763 145.618C82.4678 148.582 90.42 149.913 98.3812 149.52C106.342 149.127 114.122 147.018 121.181 143.341L140.082 179.128Z" fill="#FFB443"/>
									<path opacity="0.6" d="M2.55577 116.814C-0.328502 104.672 -0.776563 92.0842 1.23717 79.77C3.25091 67.4557 7.687 55.656 14.2922 45.0446L48.9017 66.2954C45.1064 72.3928 42.5574 79.173 41.4003 86.2488C40.2432 93.3246 40.5006 100.557 42.1579 107.534L2.55577 116.814Z" fill="#2477F6"/>
									<path opacity="0.6" d="M19.8791 37.0215C30.3574 23.5131 44.3035 13.0549 60.2537 6.74443C76.204 0.433949 93.5704 -1.49619 110.531 1.15656C127.491 3.80931 143.419 10.9471 156.645 21.821C169.87 32.6949 179.905 46.904 185.696 62.9571L147.391 76.588C144.064 67.3638 138.298 59.1992 130.698 52.951C123.099 46.7029 113.946 42.6014 104.201 41.0771C94.4554 39.5529 84.4765 40.6619 75.3114 44.288C66.1463 47.914 58.1329 53.9233 52.112 61.6853L19.8791 37.0215Z" fill="#19233A"/>
									<path opacity="0.6" d="M188.794 73.3901C193.316 92.6184 191.694 112.769 184.152 131.039C176.61 149.309 163.523 164.79 146.712 175.331L124.991 141.159C134.65 135.102 142.17 126.206 146.504 115.708C150.837 105.21 151.77 93.6315 149.171 82.5829L188.794 73.3901Z" fill="#3EBB80"/>
									</svg>

									<div class="lr_calculated_revenue" style="color: #000000; font-size: 16px; font-weight: bold; margin-top: -125px;">{{ widget.properties.calculated_revenue }}</div>

									<div style="color: #CCCCCC; font-weight: bold; padding-top: 0px;">Reviews</div>

                				</div>
                			</div>
                		</div>

                		<div style="margin-top: 40px; font-size: 14px; padding: 6px;">

                			<div style="clear: both; border-bottom: solid 1px rgba(0, 0, 0, 0.10); padding-bottom: 18px; margin-bottom: 18px;">
                				<div style="float: left; padding-top: 12px;" :style="'color: ' + widget.properties.titles_color">
                					Negative reviews per year:
                				</div>

                				<div style="float: right;">
                					<input type="number"
                						v-model="widget.properties.negative_reviews_per_year"
                						@change="widget.properties.calculated_revenue = calculatedRevenue();"
                						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
                						style="width: 100px; padding: 10px; height: 50px; border: solid 1px #CCCCCC; border-radius: 5px; text-align: center;"
                          min="1"
                          max="100"
                					/>
                				</div>

                				<div style="clear: both;"></div>
                			</div>

                			<div style="clear: both; border-bottom: solid 1px rgba(0, 0, 0, 0.10); padding-bottom: 18px; margin-bottom: 18px;">
                				<div style="float: left; padding-top: 12px;" :style="'color: ' + widget.properties.titles_color">
                					% of complaints resolved via review response:
                				</div>

                				<div style="float: right;">
                					<input type="number"
                						v-model="widget.properties.percentage_of_complaints"
                						@change="widget.properties.calculated_revenue = calculatedRevenue();"
                						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
                						style="width: 100px; padding: 10px; height: 50px; border: solid 1px #CCCCCC; border-radius: 5px; text-align: center;"
						                          min="1"
						                          max="100"
                					/>
                				</div>

                				<div style="clear: both;"></div>
                			</div>

                			<div style="clear: both; padding-bottom: 18px; margin-bottom: 18px;">
                				<div style="float: left; padding-top: 12px;" :style="'color: ' + widget.properties.titles_color">
                					Customer lifetime value ({{ widget.properties.currency }}):
                				</div>

                				<div style="float: right;">
                					<input type="number"
                						v-model="widget.properties.customer_lifetime_value"
                						@change="widget.properties.calculated_revenue = calculatedRevenue();"
                						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
                						style="width: 100px; padding: 10px; height: 50px; border: solid 1px #CCCCCC; border-radius: 5px; text-align: center;"
                          min="50"
                          max="100000"
                					/>
                				</div>

                				<div style="clear: both;"></div>
                			</div>
                		</div>
                    </div>
                </v-card>
    		</div>
    	</div>

    	<div v-if="CalculatorStyle == 'Style4'">
    		<div class="dashboard-box">
    			<v-card
                    class="p-4"
                    style="text-align: center; font-size: 26px; line-height: 40px;"
                    tile
                >
                	<div style="color: #000000; font-size: 18px;">You Need</div>

					<div class="lr_calculated_revenue" style="color: #2477F6; font-weight: bold;">{{ widget.properties.calculated_revenue }}</div>

					<div style="color: #000000; font-size: 18px;">More 5 Star Reviews</div>
	            </v-card>

	        </div>

	        <div class="flex flex-row flex-wrap" style="font-size: 16px;">
                <div class="dashboard-box stats-box w-full md:w-1/2 lg:w-1/2 pt-4 pr-2">
                	<v-card
	                    class="p-4"
	                    tile
	                    
	                >
	                	<div style="margin-bottom: 10px;" :style="'color: ' + widget.properties.titles_color">Negative reviews per year:</div>

	                	<input type="number"
    						v-model="widget.properties.negative_reviews_per_year"
    						@change="widget.properties.calculated_revenue = calculatedRevenue();"
    						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
    						style="width: 50%; max-width: 120px; font-weight: bold; font-size: 22px !important; padding: 10px; padding-left: 0px; height: 50px; border-radius: 5px;"
                          min="1"
                          max="100"
    					/>
	            	</v-card>
                </div>

                <div class="dashboard-box stats-box w-full md:w-1/2 lg:w-1/2 pt-4 pl-2">
                	<v-card
	                    class="p-4"
	                    tile
	                    
	                >
	                	<div style="margin-bottom: 10px;" :style="'color: ' + widget.properties.titles_color">% of complaints resolved via review response<:</div>

	                	<input type="number"
    						v-model="widget.properties.percentage_of_complaints"
    						@change="widget.properties.calculated_revenue = calculatedRevenue();"
    						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
    						style="width: 50%; max-width: 120px; font-weight: bold; font-size: 22px !important; padding: 10px; padding-left: 0px; height: 50px; border-radius: 5px;"
    						min="1"
	                          max="100"
    					/>
	            	</v-card>
                </div>

                <div class="dashboard-box stats-box w-full pt-4">
                	<v-card
	                    class="p-4"
	                    tile
	                    
	                >
	                	<div style="margin-bottom: 10px;" :style="'color: ' + widget.properties.titles_color">Customer lifetime value ({{ widget.properties.currency }}):</div>

	                	<input type="number"
    						v-model="widget.properties.customer_lifetime_value"
    						@change="widget.properties.calculated_revenue = calculatedRevenue();"
    						@keyup="widget.properties.calculated_revenue = calculatedRevenue();"
    						style="width: 50%; max-width: 120px; font-weight: bold; font-size: 22px !important; padding: 10px; padding-left: 0px; height: 50px; border-radius: 5px;"
                          min="50"
                          max="100000"
    					/>
	            	</v-card>
                </div>
            </div>
    	</div>
    </div>
  </template>
  

  <script>
  import { GetSuggestions } from '@/utils/PlaceUtilsCities'
  import axios from 'axios'
  import moment from 'moment'
  import VueGauge from "@/views/local-recon/VueGauge";
  
  export default {
    props: ['widget', 'CalculatorStyle'],
    components: {
        VueGauge,
    },
    data () {
        return {
        }
    },
    methods: {
      calculatedRevenue_delayed() {
          let self = this;
          setTimeout(function() {
              self.calculatedRevenue();
          }, 30);
      },
      calculatedRevenue() {
          let self = this
          let revenue = (this.widget.properties.negative_reviews_per_year * this.widget.properties.percentage_of_complaints) * (this.widget.properties.customer_lifetime_value/100);
          revenue = Math.ceil(revenue);
  
          console.log('revenue', revenue)
  
          // revenue = this.widget.properties.currency + ' ' + revenue;
  
          revenue = ((self.widget.properties.currency_display_position == "Before Amount") ? self.widget.properties.currency + ' ' : '') + revenue + ((self.widget.properties.currency_display_position == "After Amount") ? ' ' + self.widget.properties.currency : '');
          
          try {
              for (var i in document.querySelectorAll(".lr_calculated_revenue")) {
              	let el = document.querySelectorAll(".lr_calculated_revenue")[i];
              	el.innerHTML = this.numberWithCommas(revenue);
              }
          }
          catch (e) {
          	console.log('e', e)
          }
  
          return revenue;
      },
      numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    created() {
        
    }
  }
  </script>

  <style type="text/css">
  	.v-slider--horizontal .v-slider__track-container {
  		height: 5px !important;
  		cursor: pointer !important;
  	}
  </style>