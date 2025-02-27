<template>
    <div v-if="widget_data" :style="((fw) ? '' : 'padding-top: 25px;')">
        <div :class="'widgets-wrapper ' + widget_data.widget.settings.align"
                :style="
                    'font-family: ' + widget_data.widget.settings.font_family.replace(' (Google)', '') + ';' +
                    'color: ' + widget_data.widget.settings.text_color + ';' + 
                    
                    (
                        widget_data.widget.template == 'embed-grid' || 
                        widget_data.widget.template == 'embed-column' || 
                        widget_data.widget.template == 'embed-page' || 
                        widget_data.widget.template == 'embed-table' || 
                        widget_data.widget.template == 'embed-slider' || 
                        widget_data.widget.template == 'embed-carousel'
                    ) ? ' position: relative !important;' : ''
            "
        >
            <EmbedGrid v-if="widget_data.widget.template == 'embed-grid'" :widget_data="widget_data" :fw="fw" />
            <EmbedColumn v-if="widget_data.widget.template == 'embed-column'" :widget_data="widget_data" :fw="fw" />
            <EmbedPage v-if="widget_data.widget.template == 'embed-page'" :widget_data="widget_data" :fw="fw" />
            <EmbedTable v-if="widget_data.widget.template == 'embed-table'" :widget_data="widget_data" :fw="fw" />
            <EmbedSlider v-if="widget_data.widget.template == 'embed-slider'" :widget_data="widget_data" :fw="fw" />
            <EmbedCarousel v-if="widget_data.widget.template == 'embed-carousel'" :widget_data="widget_data" :fw="fw" />

            <Hover1 v-if="widget_data.widget.template == 'hover-1'" :widget_data="widget_data" :fw="fw" />
            <Hover2 v-if="widget_data.widget.template == 'hover-2'" :widget_data="widget_data" :fw="fw" />
            <Hover3 v-if="widget_data.widget.template == 'hover-3'" :widget_data="widget_data" :fw="fw" />
            <Hover4 v-if="widget_data.widget.template == 'hover-4'" :widget_data="widget_data" :fw="fw" />
            <Hover5 v-if="widget_data.widget.template == 'hover-5'" :widget_data="widget_data" :fw="fw" />
            <Hover6 v-if="widget_data.widget.template == 'hover-6'" :widget_data="widget_data" :fw="fw" />

            <div v-if="
                    widget_data.widget.template == 'embed-grid' || 
                    widget_data.widget.template == 'embed-column' || 
                    widget_data.widget.template == 'embed-page' || 
                    widget_data.widget.template == 'embed-table'
            " :style="'background-color: ' + widget_data.widget.settings.background_color + '; padding-bottom: 20px;'">
                <Pagination
                    :widget_data="widget_data"
                    :fw="fw"
                    :page="page"
                    :count="count"
                />
            </div>

            <div v-if="
                widget_data && (
                    widget_data.widget.subscription.stripe_id == 'starter' &&
                    (
                        widget_data.widget.template == 'embed-grid' || 
                        widget_data.widget.template == 'embed-column' || 
                        widget_data.widget.template == 'embed-page' || 
                        widget_data.widget.template == 'embed-table' || 
                        widget_data.widget.template == 'embed-slider' || 
                        widget_data.widget.template == 'embed-carousel'
                    )
                )
            " class="reviews-footer" :style="'color: ' + widget_data.widget.settings.footer_text_color + '; text-align: center;'">
                Powered by <a href="https://Lead Finder.com/" target="review-grower-external" :style="'color: ' + widget_data.widget.settings.footer_link_color + ';'">Review Grower</a>
            </div>

            <v-dialog
            v-model="dialog"
            transition="slide-x-transition"
            persistent
            :width="getWidth()"
            :content-class="widget_data.widget.settings.align"
            hide-overlay
            v-if="widget_data.widget.template != 'embed-column' && widget_data.widget.template != 'embed-page' && widget_data.widget.template != 'embed-table' && widget_data.widget.template != 'embed-slider' && widget_data.widget.template != 'embed-grid' && widget_data.widget.template != 'embed-carousel'"
            >

            <v-card class="main-card">
                <v-btn
                    fab
                    dark
                    small
                    color="blue-grey"
                    @click="closeDialog()"
                    class="dialog-close-btn"
                    style="z-index: 99; margin-top: 10px;"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                
                <div class="scrollable-reviews-list">
                    <Header :widget_data="widget_data" />
                    <HeaderAggregate :widget_data="widget_data" />

                    <div v-for="item in widget_data.reviews" :key="item.id">
                        <Review :widget_data="widget_data" :item="item" />
                    </div>

                    <Pagination
                        :widget_data="widget_data"
                        :fw="fw"
                        :page="page"
                        :count="count"
                    />
                </div>
            </v-card>

            </v-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

// Embed Styles
import EmbedGrid from '@/views/panel/Business/Widgets/Render/Styles/EmbedGrid.vue'
import EmbedColumn from '@/views/panel/Business/Widgets/Render/Styles/EmbedColumn.vue'
import EmbedPage from '@/views/panel/Business/Widgets/Render/Styles/EmbedPage.vue'
import EmbedTable from '@/views/panel/Business/Widgets/Render/Styles/EmbedTable.vue'
import EmbedSlider from '@/views/panel/Business/Widgets/Render/Styles/EmbedSlider.vue'
import EmbedCarousel from '@/views/panel/Business/Widgets/Render/Styles/EmbedCarousel.vue'

// Hover Styles
import Hover1 from '@/views/panel/Business/Widgets/Render/Styles/Hover1.vue'
import Hover2 from '@/views/panel/Business/Widgets/Render/Styles/Hover2.vue'
import Hover3 from '@/views/panel/Business/Widgets/Render/Styles/Hover3.vue'
import Hover4 from '@/views/panel/Business/Widgets/Render/Styles/Hover4.vue'
import Hover5 from '@/views/panel/Business/Widgets/Render/Styles/Hover5.vue'
import Hover6 from '@/views/panel/Business/Widgets/Render/Styles/Hover6.vue'

import Header from '@/views/panel/Business/Widgets/Render/Header.vue';
import HeaderAggregate from '@/views/panel/Business/Widgets/Render/HeaderAggregate.vue';
import Review from '@/views/panel/Business/Widgets/Render/Review.vue';
import Pagination from '@/views/panel/Business/Widgets/Render/Pagination.vue'

export default {
    props: ["preview_widget", "fw"],

    components: {
        EmbedGrid,
        EmbedColumn,
        EmbedPage,
        EmbedTable,
        EmbedSlider,
        EmbedCarousel,
        Hover1,
        Hover2,
        Hover3,
        Hover4,
        Hover5,
        Hover6,
        Header,
        HeaderAggregate,
        Review,
        Pagination
    },

    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        widget_data: false,
        scroll_working: false,
        current_visible: 0,
        show_rating: false,
        reviews_start: 0,
        finishedLoadingReviews: false,
        limit: 20,
        page: 1,
        count: 3,
        isPreview: false,

        me: null,

        slider: [
            "red", 
            "green", 
            "orange", 
            "blue", 
            "pink", 
            "purple", 
            "indigo", 
            "cyan", 
            "deep-purple", 
            "light-green", 
            "deep-orange", 
            "blue-grey"
        ]
      }
    },
    computed: {
        visibleReviews () {
            return this.widget_data.reviews.filter(p=>p.isActive).length
        }
    },
    methods: {
        showDialog: function() {
            let self = this
            this.dialog = true
            setTimeout(function() {
                self.show_rating = true
            }, 100);

            parent.postMessage("showReviews","*");  //  `*` on any domain  
        },
        closeDialog: function() {
            this.dialog = false, this.show_rating = false, parent.postMessage('closeReviews','*')
        },
        getWidgetData: async function() {
            let self = this

            let thistoken = ((this.$route.params.token) ? this.$route.params.token : this.preview_widget.token);

            try {
                let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + thistoken;

                // Preview
                let exploded = window.location.href.split("?fw");
                if (self.fw) {
                    url = url + "?fw=" + self.fw;
                    self.isPreview = true;
                }
                else if (exploded.length > 1) {
                    url = url + "?fw=" + exploded[1];
                }
                // END Preview
                
                let response = await axios.get(url, {

                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })
                
                this.widget_data = response.data.widget_data

                this.count = Math.ceil(this.widget_data.total_reviews/this.limit);

                // Resize full width for embed widgets
                if (this.widget_data.widget.template == 'embed-column' || this.widget_data.widget.template == 'embed-page' || this.widget_data.widget.template == 'embed-table' || this.widget_data.widget.template == 'embed-slider' || this.widget_data.widget.template == 'embed-grid' || this.widget_data.widget.template == 'embed-carousel') {
                    setTimeout(function() {
                        try {
                            let thisInterval = setInterval(function() {
                                if (document.querySelector(".widgets-wrapper") === null) {
                                    clearInterval(thisInterval);
                                    thisInterval = null;
                                    console.log('closing interval...');
                                    return;
                                }

                                let new_height = document.querySelector(".widgets-wrapper").offsetHeight + 70;

                                parent.postMessage({
                                    event_id: 'resizeWidgetIframe_' + self.widget_data.widget.id,
                                    data: {
                                        new_height: new_height
                                    }
                                },"*");  //  `*` on any domain
                            }, 100);
                        }
                        catch (e) {}
                    }, 100);
                }
                // END Resize full width for embed widgets
                
                // Apply custom CSS
                if (this.widget_data.widget.settings.custom_css) {
                    if (document.getElementById("rg-widget-custom-css-sheet") === null) {
                        var styleSheet = document.createElement("style")
                        styleSheet.type = "text/css"
                        styleSheet.innerText = this.widget_data.widget.settings.custom_css.replace(/\n/g, " ")
                        styleSheet.id = 'rg-widget-custom-css-sheet';
                        document.body.appendChild(styleSheet);
                    }
                    else {
                        document.getElementById("rg-widget-custom-css-sheet").innerText = this.widget_data.widget.settings.custom_css.replace(/\n/g, " ");
                    }
                }
                else {
                    if (document.getElementById("rg-widget-custom-css-sheet") === null) {
                        var styleSheet = document.createElement("style")
                        styleSheet.type = "text/css"
                        styleSheet.innerText = ""
                        styleSheet.id = 'rg-widget-custom-css-sheet';
                        document.body.appendChild(styleSheet);
                    }
                    else {
                        document.getElementById("rg-widget-custom-css-sheet").innerText = '';
                    }
                }
                // END Apply custom CSS
            }catch(e){
                console.log(e)
            }
        },
        fetchMoreReviews: async function(new_start = false) {
            let self = this

            // console.log('new_start2: ', new_start)

            if (new_start !== false)
                self.reviews_start = new_start
            else
                self.reviews_start = self.reviews_start + this.limit;
            
            console.log('self.reviews_start', self.reviews_start)

            let thistoken = ((this.$route.params.token) ? this.$route.params.token : this.preview_widget.token);

            try {
                let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + thistoken + "?start=" + self.reviews_start;

                // Preview
                let exploded = window.location.href.split("?fw");
                if (self.fw) {
                    url = url + "&fw=" + self.fw;
                    self.isPreview = true;
                }
                else if (exploded.length > 1) {
                    url = url + "&fw=" + exploded[1];
                }
                // END Preview
                
                let response = await axios.get(url, {

                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })
                
                if (response.data.widget_data.reviews.length == 0) {
                    self.finishedLoadingReviews = true;
                }
                else {
                    for (var i in response.data.widget_data.reviews) {
                        this.widget_data.reviews.push(response.data.widget_data.reviews[i]);
                    }
                }
            }catch(e){
                console.log(e)
            }
        },
        paginate(val, oldVal) {

            console.log('clicked page: ' + val)

            this.widget_data.reviews = [];

            let new_start = (val - 1) * this.limit;

            console.log('new_start: ' + new_start)

            this.fetchMoreReviews(new_start);
        },

        getWidth() {
            if (window.innerWidth > 450)
                return 450;
            
            return window.innerWidth;
        }
    },
    created() {
        this.getWidgetData();
    }
}
</script>

<style type="text/css">
    body, html, .theme--light.v-application {
        background: none transparent !important;
    }

    .widgets-wrapper {
        position: absolute;
        bottom: 10px;
    }

    .widgets-wrapper.Left {
        left: 15px;
    }

    .widgets-wrapper.Right {
        right: 15px;
    }

    .widgets-wrapper.Full {
        position: relative;
    }

    .hover-1-wrapper *, .hover-3-wrapper *, .hover-4-wrapper * {
        text-align: center;
        line-height: 24px;
    }

    .reviews-badge {
        margin-top: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .reviews-title {
        font-size: 18px;
    }

    .reviews-average {
        font-size: 36px;
        font-weight: bold;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .hover-3-wrapper .reviews-average {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }

    .reviews-read-link a {
        text-decoration: underline;
        font-size: 12px;
    }

    .hover-3-wrapper .reviews-read-link a {
        font-size: 14px;
    }

    .v-dialog {
        position: absolute !important;
        top: 0px !important;
        margin: 0px !important;
        bottom: 0px !important;
    }

    .v-dialog.Left {
        left: 0px !important;
        border-right: solid 1px #CCCCCC;
    }

    .v-dialog.Right {
        right: 0px !important;
        border-left: solid 1px #CCCCCC;
    }

    .v-dialog:not(.v-dialog--fullscreen) {
        max-height: inherit !important;
    }

    .v-dialog > .main-card {
        height: 100%;
    }

    .reviews-footer {
        font-size: 12px;
    }

   .hover-2-wrapper .reviews-footer, .hover-3-wrapper .reviews-footer {
        margin-top: 5px;
        text-align: center;
    }

    #drift-frame-controller {
        display: none;
    }

    .dialog-close-btn {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .scrollable-reviews-list {
        padding-left: 20px;
        padding-right: 20px;
        height: 100%;
        overflow: auto;
    }

    .widget-source-logo {
        float: right;
        width: 22px;
        height: 22px;
        opacity: 0.8;
        margin-right: 0px;
        margin-top: 8px;
    }

    .widget-source-logo-embed-column {
        float: left;
        width: 22px;
        height: 22px;
        opacity: 0.8;
        margin-right: 10px;
        margin-top: 8px;
    }

    .hover-3-variant-item {
        margin-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .v-dialog, .v-sheet.v-card {
        border-radius: 0px !important;
    }

    .v-rating .v-icon {
        padding: 0px !important;
    }

    .v-window__prev, .v-window__next {
        margin: 0px !important;
    }

    .embed-carousel-wrapper .v-window__prev, .embed-carousel-wrapper .v-window__next {
        display: none;
    }

    .embed-carousel-wrapper .v-carousel__controls {
        background: transparent;
        position: relative;
        margin-top: -30px;
    }

    .embed-carousel-wrapper .theme--dark.v-btn.v-btn--icon {
        color: gray;
    }

    .embed-slider-wrapper .v-carousel__controls {
        display: none;
    }
</style>