<template>
    <div style="width: 100%; height: 100%;">
        <iframe v-if="loaded" :src="'/grid-tracker/app.html'" style="width: 100%; height: 100%;"></iframe>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'
    import moment from 'moment'
    
    export default {
      metaInfo () {
        return {
          title: "Grid Tracker App | " + this.$appName
        }
      },
      computed: {
        ...mapState({

        })
    },
      components: {
        
      },
      data() {
        return {
          loaded: false
        }
      },
      methods: {
        async runCreated() {
            let myUUid;

            if (this.$route.query.u) {
              myUUid = this.$route.query.u;
            }
            else {
              await this.$store.dispatch('me/fetch');

              if (this.$store.state.me) {
                myUUid = this.$store.state.me.me.uuid;
              }
            }

            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/agency/get-agency-details?uuid=' + myUUid, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            let agency = response.data.agency;

            let logo = "https://reviewgrower.com/wp-content/uploads/2021/09/reviewgrower-blue-green-middle-e1652210601332.png";

            // if (agency.logo)
            //   logo = agency.logo;
            
            let companyName = agency.company_name;

            let self = this
            window.RG_GRID_CONFIG = {
                API_URL: process.env.VUE_APP_API_ENDPOINT,
                USER: {
                    uuid: myUUid
                },
                LOGO: logo,
                COMPANY_NAME: companyName,
                GOOGLE_MAPS_KEY: agency.integrations.google_maps.settings.api_key,
                VALUE_SERP_KEY: agency.integrations.value_serp.settings.api_key,
                SAB_ENABLED: (agency.settings.grid_sab_enabled == 1)
            }

            console.log('window.RG_GRID_CONFIG.COMPANY_NAME', window.RG_GRID_CONFIG.COMPANY_NAME)

            this.loaded = true;
        }
      },
      
      created() {
        this.runCreated();

        if (this.$route.query.action) {
            window.RG_GRID_ACTION = {
                ACTION: this.$route.query.action,
                SCAN_ID: this.$route.query.r
            }
        }

        if (this.$route.query.w) {
            window.RG_GRID_ACTION = {
                ACTION: "scan_lr",
                w: this.$route.query.w,
                u: this.$route.query.u,
                g: this.$route.query.g,
                q: this.$route.query.q
            }
        }
      }
    }
</script>