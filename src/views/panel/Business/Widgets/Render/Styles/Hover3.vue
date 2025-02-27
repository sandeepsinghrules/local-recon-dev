<template>
    <div class="hover-3-wrapper">
        <v-card
            elevation="2"
            class="reviews-badge"
            @click="$parent.showDialog()"
            :style="'background-color: ' + widget_data.widget.settings.background_color + '; color: ' + widget_data.widget.settings.text_color + ';'"
        >
            <div class="reviews-title">
                {{ ((widget_data.widget.settings.hover_3_title) ? widget_data.widget.settings.hover_3_title.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : "Our Rating") }}
            </div>
            <div class="reviews-average">
                {{ widget_data.average_rating }} <i class="fa fa-star" :style="'color: ' + widget_data.widget.settings.star_color + ';'"></i>
            </div>

            <div class="reviews-read-link">
                <a href="javascript: void(0);" :style="'color: ' + widget_data.widget.settings.text_color + '; text-decoration: none;'">{{ ((widget_data.widget.settings.hover_3_subtitle ) ? widget_data.widget.settings.hover_3_subtitle.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : "Based on " + widget_data.total_reviews + " reviews") }}</a>
            </div>

            <v-divider style="margin: 10px; margin-left: 20px; margin-right: 20px;"></v-divider>

            <div class="hover-3-variant-item">
                <div style="float: left; width: 20%; font-size: 13px;">
                    5 <i class="fa fa-star" :style="'color:' + widget_data.widget.settings.star_color"></i>
                </div>

                <div style="float: left; width: 60%; padding-top: 10px;">
                    <v-progress-linear :value="widget_data.reviews_rating_5_percentage" background-color="grey lighten-2" :color="widget_data.widget.settings.star_color"></v-progress-linear>
                </div>
                <div style="float: left; width: 20%; font-size: 13px;">
                    {{ widget_data.reviews_rating_5 }}
                </div>
                
                <div style="clear: both;"></div>
            </div>

            <div class="hover-3-variant-item">
                <div style="float: left; width: 20%; font-size: 13px;">
                    4 <i class="fa fa-star" :style="'color:' + widget_data.widget.settings.star_color"></i>
                </div>

                <div style="float: left; width: 60%; padding-top: 10px;">
                    <v-progress-linear :value="widget_data.reviews_rating_4_percentage" background-color="grey lighten-2" :color="widget_data.widget.settings.star_color"></v-progress-linear>
                </div>
                <div style="float: left; width: 20%; font-size: 13px;">
                    {{ widget_data.reviews_rating_4 }}
                </div>
                
                <div style="clear: both;"></div>
            </div>

            <div class="hover-3-variant-item">
                <div style="float: left; width: 20%; font-size: 13px;">
                    3 <i class="fa fa-star" :style="'color:' + widget_data.widget.settings.star_color"></i>
                </div>

                <div style="float: left; width: 60%; padding-top: 10px;">
                    <v-progress-linear :value="widget_data.reviews_rating_3_percentage" background-color="grey lighten-2" :color="widget_data.widget.settings.star_color"></v-progress-linear>
                </div>
                <div style="float: left; width: 20%; font-size: 13px;">
                    {{ widget_data.reviews_rating_3 }}
                </div>
                
                <div style="clear: both;"></div>
            </div>

            <div class="hover-3-variant-item">
                <div style="float: left; width: 20%; font-size: 13px;">
                    2 <i class="fa fa-star" :style="'color:' + widget_data.widget.settings.star_color"></i>
                </div>

                <div style="float: left; width: 60%; padding-top: 10px;">
                    <v-progress-linear :value="widget_data.reviews_rating_2_percentage" background-color="grey lighten-2" :color="widget_data.widget.settings.star_color"></v-progress-linear>
                </div>
                <div style="float: left; width: 20%; font-size: 13px;">
                    {{ widget_data.reviews_rating_2 }}
                </div>
                
                <div style="clear: both;"></div>
            </div>

            <div class="hover-3-variant-item">
                <div style="float: left; width: 20%; font-size: 13px;">
                    1 <i class="fa fa-star" :style="'color:' + widget_data.widget.settings.star_color"></i>
                </div>

                <div style="float: left; width: 60%; padding-top: 10px;">
                    <v-progress-linear :value="widget_data.reviews_rating_1" background-color="grey lighten-2" :color="widget_data.widget.settings.star_color"></v-progress-linear>
                </div>
                <div style="float: left; width: 20%; font-size: 13px;">
                    {{ widget_data.reviews_rating_1 }}
                </div>
                
                <div style="clear: both;"></div>
            </div>
        </v-card>

        <div v-if="widget_data.widget.subscription.stripe_id == 'starter'" class="reviews-footer" :style="'color: ' + widget_data.widget.settings.footer_text_color + '; text-align: center;'">
            Powered by <a href="https://Lead Finder.com/" target="review-grower-external" :style="'color: ' + widget_data.widget.settings.footer_link_color + ';'">Review Grower</a>
        </div>
    </div>
</template>

<script>
import Header from '@/views/panel/Business/Widgets/Render/Header.vue';
import Review from '@/views/panel/Business/Widgets/Render/Review.vue';

export default {
    props: ["widget_data", "fw"],

    components: {
        Header,
        Review
    }
}
</script>

<style type="text/css" scoped>
    .hover-3-wrapper {
        width: 250px;
        padding-bottom: 10px;
    }
</style>