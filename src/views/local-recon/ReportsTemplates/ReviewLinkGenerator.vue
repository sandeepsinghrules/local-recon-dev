<template>
    <div>
    <div class="dashboard-box stats-box w-full px-2 mb-5">
            <v-card
            class="pa-2"
            tile

             v-if="!ignore_header"
            >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                <div class="flex flex-row flex-wrap">
                <div class="w-full lg:w-2/3" style="position: relative;">
                    <strong class="mt-2 text-lg">{{ this_search.keyword }}</strong>

                    <div v-if="this_search.properties.business.website" class="website mt-1 text-sm"><a href="this_search.properties.business.website" target="lr-website-link" style="color: #2477F6 !important;">{{ this_search.properties.business.website }}</a></div>

                    <div class="clearfix pt-4"></div>

                    <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Address</div>

                        {{ this_search.properties.business.formatted_address }}
                    </div>

                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Phone</div>

                        {{ this_search.properties.business.formatted_phone_number }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Primary Category</div>
                        {{ this_search.properties.business.custom_keyword ? ucwords(this_search.properties.business.custom_keyword.replace(/\_/g, ' ')) : ucwords(this_search.properties.business.types[0].replace(/\_/g, ' '))  }}

                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Sub Category</div>

                        {{ ((this_search.properties.business.types[1]) ? ucwords(this_search.properties.business.types[1].replace(/\_/g, ' ')) : '-') }}
                    </div>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <div class="lr-seo-audit-photo w-full lg:w-1/3">
                    <div v-if="this_search.properties.business.photos">
                        <img :src="'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + this_search.properties.business.photos[0].photo_reference + '&maxheight=200&key='+AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs" />
                    </div>
                </div>
                </div>

                <br clear="all" />
            </div>
            </v-card>

            <div class="pt-4">
                <strong class="text-lg">Useful Google My Business Links for:</strong> {{ this_search.properties.business.name }}, {{ this_search.properties.business.formatted_address }}
            </div>

            <div class="pt-4">
                <v-card
                    class="pa-4"
                    tile
                >
                    <GmapMap
                        :center='center'
                        :zoom='12'
                        style='width:100%;  height: 400px; opacity: 0.7;'
                        map-type-id="roadmap"
                    />
                </v-card>
                    
            </div>

            <div v-if="this_search.properties.success">
                <div class="flex flex-row flex-wrap pt-4">
                    <div class="w-full lg:w-1/3 pr-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>View Google My Business Reviews</strong>
                                <br />
                                Use this link to share your reviews with customers
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy Link</div>

                                <input
                                    :value="this_search.properties.result.result.review_url"
                                type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 30px;" />

                                <div style="position: absolute; margin-top: -30px; margin-left: 10px;">
                                    <a :href="this_search.properties.result.result.review_url" target="this_search.properties.result.result.review_url"><i class="fa fa-link"></i></a>
                                </div>

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.review_url" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>

                            <div class="mt-3">
                                <div class="mb-2">Scan QR Code</div>

                                <div style="background: #f4f4f4; padding: 40px; text-align: center;">
                                    <div id="qrcode1" class="mb-3"></div>

                                    <a href="javascript: void(0);" @click="downloadQrCode('qrcode1');" class="mt-3" style="font-size: 13px;">Download JPEG</a>
                                </div>
                            </div>
                        </v-card>
                    </div>

                    <div class="w-full lg:w-1/3 pl-2 pr-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>Get More Reviews</strong>
                                <br />
                                Direct customers to leave a review for this business
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy Link</div>

                                <input
                                    :value="this_search.properties.result.result.get_reviews"
                                type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 30px;" />

                                <div style="position: absolute; margin-top: -30px; margin-left: 10px;">
                                    <a :href="this_search.properties.result.result.get_reviews" target="this_search.properties.result.result.get_reviews"><i class="fa fa-link"></i></a>
                                </div>

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.get_reviews" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>

                            <div class="mt-3">
                                <div class="mb-2">Scan QR Code</div>

                                <div style="background: #f4f4f4; padding: 40px; text-align: center;">
                                    <div id="qrcode2" class="mb-3"></div>

                                    <a href="javascript: void(0);" @click="downloadQrCode('qrcode2');" class="mt-3" style="font-size: 13px;">Download JPEG</a>
                                </div>
                            </div>
                        </v-card>
                    </div>

                    <div class="w-full lg:w-1/3 pl-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>See Your Google My Business in the SERP</strong>
                                <br />
                                Use this link to share your reviews with customers
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy Link</div>

                                <input
                                    :value="this_search.properties.result.result.serp_url"
                                type="text" placeholder="Business Name" style="padding-left: 10px; height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 30px;" />

                                <div style="position: absolute; margin-top: -30px; margin-left: 10px;">
                                    <a :href="this_search.properties.result.result.serp_url" target="this_search.properties.result.result.serp_url"><i class="fa fa-link"></i></a>
                                </div>

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.serp_url" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>

                            <div class="mt-3">
                                <div class="mb-2">Scan QR Code</div>

                                <div style="background: #f4f4f4; padding: 40px; text-align: center;">
                                    <div id="qrcode3" class="mb-3"></div>

                                    <a href="javascript: void(0);" @click="downloadQrCode('qrcode3');" class="mt-3" style="font-size: 13px;">Download JPEG</a>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>

                <div class="pt-4">
                    <strong class="text-lg">Google ID Information for: </strong> {{ this_search.properties.business.name }}, {{ this_search.properties.business.formatted_address }}
                </div>

                <div class="flex flex-row flex-wrap pt-4">

                    <div class="w-full lg:w-1/3 pr-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>Ludocid</strong>
                                <br />
                                Unique ID Google assigned to your business location
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy</div>

                                <input
                                    :value="this_search.properties.result.result.ludo_cid"
                                type="text" placeholder="Business Name" style="height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 10px;" />

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.ludo_cid" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>
                        </v-card>
                    </div>

                    <div class="w-full lg:w-1/3 pl-2 pr-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>Place ID</strong>
                                <br />
                                Another unique ID that Google uses to identify a specific business
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy</div>

                                <input
                                    :value="this_search.properties.result.result.place_id"
                                type="text" placeholder="Business Name" style="height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 10px;" />

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.place_id" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>
                        </v-card>
                    </div>

                    <div class="w-full lg:w-1/3 pl-2" style="position: relative;">
                        <v-card
                            class="pa-4"
                            tile
                        >
                            <div style="line-height: 22px;">
                                <strong>FID</strong>
                                <br />
                                The FID is a unique ID that relates to reviews
                            </div>

                            <hr class="mt-3 mb-3" />

                            <div style="position: relative;">
                                <div class="mb-2">Copy</div>

                                <input
                                    :value="this_search.properties.result.result.fid"
                                type="text" placeholder="Business Name" style="height: 43px; width: 100%; outline: none; background: #f4f4f4; padding-right: 30px; padding-left: 10px;" />

                                <div style="position: absolute; margin-top: -30px; right: 10px;">
                                    <a href="javascript: void(0);" v-clipboard:copy="this_search.properties.result.result.fid" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-copy"></i></a>
                                </div>

                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
            <div v-else>
                <v-skeleton-loader type="article, article, article, article, article, article"></v-skeleton-loader>
            </div>
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
    props: ['search', 'ignore_header'],

    components: {
        ApexCharts,
    },

    data () {
        return {
            loaded: false,
            center: { lat: this.search.properties.business.geometry.location.lat, lng: this.search.properties.business.geometry.location.lng },
            qrc1: null,
            qrc2: null,
            qrc3: null,
            this_search: null
        }
    },
    methods: {
        ucwords (str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        },

        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.search.properties.business.geometry.location.lat,
                    lng: this.search.properties.business.geometry.location.lng,
                };
                this.markers.push({ position: marker });
                // this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },

        onCopy: function (e) {
            this.$swal({
                title: "Copied",
                text: "Link copied successfully!",
                showCancelButton: false,
            });
        },
        onError: function (e) {
            alert('Failed to copy the link to the clipboard')
            console.log(e);
        },

        downloadQrCode(divid) {
            let img = document.querySelector("#" + divid + " img");
            let imgSrc = img.src;

            // window.location.href = 'data:application/octet-stream;base64,' + img;
            window.location.href = imgSrc;

            var a = document.createElement("a"); //Create <a>
            // a.href = "data:image/png;base64," + ImageBase64; //Image Base64 Goes here
            a.href = imgSrc //Image Base64 Goes here
            a.download = "QrCode.jpeg"; //File name Here
            a.click(); //Downloaded file
        },

        runCreated() {
            let self = this;

            if (this.this_search.properties.success) {
                try {
                    setTimeout(function() {
                        this.qrc1 = new QRCode(document.getElementById("qrcode1"), self.this_search.properties.result.result.review_url);
                        this.qrc2 = new QRCode(document.getElementById("qrcode2"), self.this_search.properties.result.result.get_reviews);
                        this.qrc3 = new QRCode(document.getElementById("qrcode3"), self.this_search.properties.result.result.serp_url);
                    }, 200);
                }
                catch (e) {

                }
            }
            else {
                setTimeout(function() {
                  let url = process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-report?s=' + self.$route.query.s + '&p=' + self.this_search.place_id + '&si=' + self.this_search.id + '&loads=' + this.loads;
          
                  axios.get(url, {

                  }).then(function(response) {
                    self.this_search = response.data.search;
                    self.runCreated();
                  });
                }, 1000);
            }
        }
    },
    created() {
        let self = this

        this.this_search = this.search;

        this.runCreated();

        this.addMarker();

        
    }
  }
  </script>

<style type="text/css">
    #qrcode1 canvas, #qrcode2 canvas, #qrcode3 canvas, #qrcode4 canvas, #qrcode5 canvas, #qrcode6 canvas {
        display: none !important;
    }

    #qrcode1 img, #qrcode2 img, #qrcode3 img, #qrcode4 img, #qrcode5 img, #qrcode6 img {
        width: 100px;
    }
</style>