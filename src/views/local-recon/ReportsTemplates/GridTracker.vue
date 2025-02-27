<template>
    <div style="height: 600px;">
    <div class="dashboard-box stats-box w-full px-2 mb-5" style="height: 100%;">
            <v-card
            class="pa-2"
            tile
            style="height: 100%;"
            >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')" style="height: 100%;">
                <div class="flex flex-row flex-wrap" style="height: 100%;">
                    <object :data="search.properties.report_pdf" type="application/pdf" width="100%" height="100%">
                        <p>It appears you don't have a PDF plugin for this browser.
                        No biggie... you can <a href="myfile.pdf">click here to
                        download the PDF file.</a></p>
                    </object>
                </div>
            </div>
            </v-card>
        </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'
  import moment from 'moment'
  import $ from 'jquery'
  import ApexCharts from 'apexcharts'
  import VueGauge from "@/views/local-recon/VueGauge";
  
  export default {
    props: ['search'],
    data () {
        return {
            faq_keywords: "",
            reviews_html: "",
            negative_reviews_html: "",
        
            sentiment_data: [],
        }
    },
    methods: {
    },
    created() {

    }
  }
  </script>