<template>
    <div>
    	<div :class="'lr-modern-widget-form-wrapper ' + widget.widget_style.replace(/ /g, '_') + ' ' + widget.type.replace(/ /g, '_') + ' ' + widget.report_type.replace(/ /g, '_')">

    		<div class="lr-modern-widget-fields">
    			<div v-if="widget.report_type == 'Reputation' || widget.report_type == 'GBP Audit' || widget.report_type == 'Review Link Generator' || widget.report_type == 'Citation Audit'" style="position: relative;">
    				<!-- <input type="text" :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + '; width: 100%; padding: 10px; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'" placeholder="Business Name" /> -->

            <v-combobox
                placeholder="Business Name"
                v-model="autocompleteLocationModel"
                :items="locationFoundItemsNew"
                :search-input.sync="searchBusinessesText"
                item-text="value"
                item-value="id"
                hide-no-data
                return-object
                hide-details
                :filter="filterPlaces"
                :color="'#FFFFFF'"
                :base-color="'#FFFFFF'"
                @change="selectPlace()"
                :custom-filter="filterPlaces()"
                :dark="widget.color_scheme == 'Dark'"
                outlined
                flat
                :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + ' !important; width: 100%; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'"
            >
            </v-combobox>

            <div v-show="searchingBusinesses" style="clear: both; position: absolute; margin-top: -42px; right: 40px;">
                <i class="fa fa-spin fa-spinner"></i>
            </div>
    			</div>

    			<div v-if="widget.report_type == 'Grid Tracker'" style="position: relative;">
            <v-combobox
                placeholder="Your Location (e.g. Pizza Hut)"
                v-model="autocompleteLocationModel"
                :items="locationFoundItemsNew"
                :search-input.sync="searchBusinessesText"
                item-text="value"
                item-value="id"
                hide-no-data
                return-object
                hide-details
                :filter="filterPlaces"
                :color="'#FFFFFF'"
                :base-color="'#FFFFFF'"
                @change="selectPlace()"
                :custom-filter="filterPlaces()"
                :dark="widget.color_scheme == 'Dark'"
                outlined
                flat
                :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + ' !important; width: 100%; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'"
            >
            </v-combobox>

            <div v-show="searchingBusinesses" style="clear: both; position: absolute; margin-top: -42px; right: 40px;">
                <i class="fa fa-spin fa-spinner"></i>
            </div>

    				<!-- <input type="text" :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + '; width: 100%; padding: 10px; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'" placeholder="" /> -->

    				<input id="rg-grdtc-search-query-field" type="text" :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + '; width: 100%; padding: 10px; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'" placeholder="Search Query (e.g. Pizza)" />
    			</div>


    			<div v-if="widget.report_type == 'SEO'">
    				<input id="website_url" type="text" :style="'background: ' + widget.field_color + '; color: ' + widget.field_text_color + '; width: 100%; padding: 10px; border-radius: 2px; border: 0px; font-size: 12px; outline: none;'" placeholder="example.com" />
    			</div>
    		</div>

    		<button :style="'background: ' + widget.button_color + '; color: ' + widget.button_text_color + ';'" @click="runReport();"><i v-show="loading" class="fa fa-spin fa-spinner"></i> {{ texts[widget.report_type].button }}</button>
    	</div>
    </div>
  </template>
  
  <script>

  import axios from 'axios'
  import { GetSuggestions } from '@/utils/PlaceUtils'
  import $ from 'jquery'

  export default {
    props: ['widget', 'texts'],
    components: {
      
    },
    computed: {
        locationFoundItems () {
            return this.locationEntries
        }
    },
    data() {
    	return {
          loading: false,
          company_name: "",

          autocompleteLocationModel: null,
          locationSearchText: null,
          searchBusinessesText: null,
          locationEntries: [],
          locationFoundItemsNew: [],

          business_location: {},

          review_text: "",
          generatingResponses: false,
          generated_responses: [],

          searchingBusinesses: false,
          typingCounter: 0
      	};
    },
    methods: {
    	runReport() {
        if (this.loading)
          return;

        switch (this.widget.report_type) {
          case 'Reputation':
            this.submit();
          break;

          case 'SEO':
            this.submitSEOAudit();
          break;

          case 'Grid Tracker':
            this.submitGridTracker();
          break;

          case 'GBP Audit':
            this.submitGMBAudit();
          break;

          case 'Review Link Generator':
            this.submitReviewLinkGenerator();
          break;

          case 'Citation Audit':
            this.submitCitationAudit();
          break;
        }
    	},

      async submit() {
        let self = this;

        if (!self.company_name) return;

        $(".lr-input input").prop('disabled', true);

        this.loading = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-search', {
            company_name: self.company_name,
            widget_uuid: self.widget.uuid,
            place_id: self.autocompleteLocationModel.id,
            properties: self.business_location
        } , {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        })

        parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
    },
    async submitGridTracker() {
        let self = this;

        if (!this.business_location.place_id) {
            $("#rg-grdtc-place-search-field input").focus();
            return;
        }

        if (!$("#rg-grdtc-search-query-field").val()) {
            $("#rg-grdtc-search-query-field").focus();
            return;
        }

        console.log(this.business_location);

        this.loading = true;

        let gridTrackerBusinessObject = {
            name: this.business_location.name,
            lat: this.business_location.geometry.location.lat,
            lng: this.business_location.geometry.location.lng,
            place_id: this.business_location.place_id
        };

        // console.log('gridTrackerBusinessObject', gridTrackerBusinessObject)

        // let gridTrackerParameters = btoa(JSON.stringify(gridTrackerBusinessObject));

        window.top.location = window.location.origin + "/grid-tracker/app?w=" + self.widget.uuid + '&u=' + self.widget.user_uuid + '&g=' + btoa(JSON.stringify(gridTrackerBusinessObject)) + '&q=' + $("#rg-grdtc-search-query-field").val().trim();
    },
    async submitSEOAudit() {
        let self = this;

        console.log('submitting SEO Audit...')
        let website_url = document.querySelector("#website_url").value;

        website_url = website_url.replace("http://", "");
        website_url = website_url.replace("https://", "");
        // website_url = website_url.replace("www.", "");

        // console.log('website_url', website_url)

        if (!website_url) {
            document.querySelector("#website_url").focus();
            return;
        }
// console.log(this.validateDomain(website_url));
        if (!this.validateDomain(website_url)) {
            document.querySelector("#website_url").focus();
            return;
        }

        this.loading = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-seo-audit', {
            widget_uuid: self.widget.uuid,
            website_url: website_url
        } , {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
    },
    async submitGMBAudit() {
        let self = this;

        if (!this.business_location.place_id) {
            return;
        }

        this.loading = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-gmb-audit', {
            widget_uuid: self.widget.uuid,
            business_location: this.business_location
        } , {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
    },
    async submitCitationAudit() {
        let self = this;

        if (!this.business_location.place_id) {
            return;
        }

        this.loading = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-citation-audit', {
            widget_uuid: self.widget.uuid,
            business_location: this.business_location
        } , {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
    },
    async submitReviewLinkGenerator() {
        let self = this;

        if (!this.business_location.place_id) {
            return;
        }

        this.loading = true;

        let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-link-generator', {
            widget_uuid: self.widget.uuid,
            business_location: this.business_location
        } , {
            headers: {
                'Authorization': 'Bearer ' + this.$store.state.auth.jwt
            },
        });

        parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id + '&si=' + response.data.si;
    },

      getAddressObject(address_components) {
        var ShouldBeComponent = {
            street_number: ["street_number"],
            zip: ["postal_code"],
            address: ["street_address", "route"],
            state: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
            ],
            city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
            ],
            country: ["country"]
        };

        var address = {
            street_number: "",
            zip: "",
            address: "",
            state: "",
            city: "",
            country: ""
        };
        address_components.forEach(component => {
            for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                if (shouldBe === "country") {
                address[shouldBe] = component.short_name;
                } else {
                address[shouldBe] = component.long_name;
                }
            }
            }
        });
        return address;
        },
      filterPlaces (item, queryText, itemText) {
          return true
      },
      async selectPlace() {
          let that = this

          let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-place-details?place_id=' + that.autocompleteLocationModel.id + '&business_name=' + encodeURIComponent(that.autocompleteLocationModel.value), {
              headers: {
                  'Authorization': 'Bearer ' + this.$store.state.auth.jwt
              },
          })

          // console.log(response.data.result);

          that.company_name = response.data.result.name;
          that.business_location = response.data.result
      },
      validateDomain(domain) {
          domain = domain.replace("www.", "");
          var res = domain.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
          return (res !== null)
      },
    },
    mounted() {
    },
    watch: {
            searchBusinessesText (newVal) {
                // If less than 3 chars typed, do not search
                if (!newVal || newVal.length <= 3) return;

                if (newVal.split(",").length > 1)
                    return;

                let that = this

                var thisCounter = this.typingCounter;

                this.typingCounter++;
                
                that.searchingBusinesses = true;

                that.locationFoundItemsNew = []; 
                // [{id: 1, value: "Alex1"}, {id: 2, value: "Alex2"}, {id: 3, value: "Alex3"}];

                setTimeout(function() {
                    console.log('thisCounter', thisCounter)
                    console.log('this.typingCounter', that.typingCounter)
                    if (thisCounter == that.typingCounter - 1) {
                        axios.post(process.env.VUE_APP_API_ENDPOINT + '/search_place/autoComplete', {
                                keyword: newVal
                            }, {
                            headers: {
                                'Authorization': 'Bearer ' + that.$store.state.auth.jwt
                            },
                        }).then(function(response) {
                            console.log('response', response)

                            for (var i in response.data.suggestions) {
                                that.locationFoundItemsNew.push({
                                    id: response.data.suggestions[i].data_id,
                                    value: response.data.suggestions[i].title + ((response.data.suggestions[i].address) ? ", " + response.data.suggestions[i].address : "")
                                })
                            }

                            that.searchingBusinesses = false;
                        })
                    }
                }, 300);
            },

        locationSearchText (newVal) {
        var that = this;

        // If less than 3 chars typed, do not search
        if (!newVal || newVal.length <= 3) return

        // Call the method from the previous section here
        GetSuggestions(newVal)
            .then(function (res) {
            that.locationEntries = res;
            })
            .catch(function () {
            that.business = false;
            that.step = 1;
            })
        }
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  	.lr-modern-widget-form-wrapper button {
  		text-transform: uppercase;
  		font-size: 12px;
  		padding: 10px;
  		font-weight: bold;
  		border-radius: 2px;
  	}

  	.lr-modern-widget-form-wrapper button {
  		display: block;
  		width: 100%;
  	}

    .lr-modern-widget-form-wrapper .v-input, .lr-modern-widget-form-wrapper input {
      margin-bottom: 12px;
    }

    .lr-modern-widget-form-wrapper.HeaderBaner.Centered_Wide .lr-modern-widget-fields {
      width: 70% !important;
      position: relative;
    }

    .lr-modern-widget-form-wrapper.HeaderBaner.Centered_Wide button {
      width: 30% !important;
    }

    .lr-modern-widget-form-wrapper.HeaderBaner.Centered_Wide .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.HeaderBaner.Centered_Wide button {
      display: inline-block; margin: 0px;
    }


    .lr-modern-widget-form-wrapper.FloatingHeader.Left_Aligned .lr-modern-widget-fields {
      width: 60% !important;
    }

    .lr-modern-widget-form-wrapper.FloatingHeader.Left_Aligned button {
      width: 40% !important;
    }

    .lr-modern-widget-form-wrapper.FloatingHeader.Left_Aligned .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.FloatingHeader.Left_Aligned button {
      display: inline-block; margin: 0px;
    }


    .lr-modern-widget-form-wrapper.FloatingFooter.Left_Aligned .lr-modern-widget-fields {
      width: 60% !important;
    }

    .lr-modern-widget-form-wrapper.FloatingFooter.Left_Aligned button {
      width: 40% !important;
    }

    .lr-modern-widget-form-wrapper.FloatingFooter.Left_Aligned .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.FloatingFooter.Left_Aligned button {
      display: inline-block; margin: 0px;
    }


    .lr-modern-widget-form-wrapper.InLine.Wide .lr-modern-widget-fields {
      width: 60% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide button {
      width: 40% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.InLine.Wide button {
      display: inline-block; margin: 0px;
    }


    .lr-modern-widget-form-wrapper.InLine.Wide_No_Text .lr-modern-widget-fields {
      width: 60% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_No_Text button {
      width: 40% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_No_Text .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.InLine.Wide_No_Text button {
      display: inline-block; margin: 0px;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_No_Text .lr-modern-widget-fields .v-input, .lr-modern-widget-form-wrapper.InLine.Wide_No_Text .lr-modern-widget-fields input {
      margin-bottom: 0px;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_Centered .lr-modern-widget-fields {
      width: 65% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_Centered button {
      width: 35% !important;
    }

    .lr-modern-widget-form-wrapper.InLine.Wide_Centered .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.InLine.Wide_Centered button {
      display: inline-block; margin: 0px;
    }


    .lr-modern-widget-form-wrapper.HelloBar.Left_Aligned .lr-modern-widget-fields {
      width: 60% !important;
    }

    .lr-modern-widget-form-wrapper.HelloBar.Left_Aligned button {
      width: 40% !important;
    }

    .lr-modern-widget-form-wrapper.HelloBar.Left_Aligned .lr-modern-widget-fields, .lr-modern-widget-form-wrapper.HelloBar.Left_Aligned button {
      display: inline-block; margin: 0px;
    }
  </style>