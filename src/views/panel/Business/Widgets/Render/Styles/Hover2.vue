<template>
    <div class="hover-2-wrapper">
        <v-card
            elevation="2"
            class="reviews-badge"
            @click="$parent.showDialog()"
            :style="'background-color: ' + widget_data.widget.settings.background_color + '; color: ' + widget_data.widget.settings.text_color + ';'"
        >
            <div style="float: left; border-right: solid 1px #CCCCCC; padding-left: 10px; padding-right: 10px; margin-right: 10px; padding-top: 5px; height: 70px;">
                <div class="reviews-average">
                    {{ widget_data.average_rating }}
                </div>
            </div>
            
            <div style="float: left;">
                <div class="reviews-title">
                    {{ ((widget_data.widget.settings.hover_2_title) ? widget_data.widget.settings.hover_2_title.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : "Our Rating") }}
                </div>

                <v-rating
                    class="reviews-rating"
                    :value="parseFloat(widget_data.average_rating)"
                    :color="widget_data.widget.settings.star_color"
                    dense
                    half-increments
                    readonly
                    size="20"
                ></v-rating>

                <div class="reviews-read-link">
                    <a href="javascript: void(0);" :style="'color: ' + widget_data.widget.settings.text_color + ';'">{{ ((widget_data.widget.settings.hover_2_subtitle) ? widget_data.widget.settings.hover_2_subtitle.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : widget_data.total_reviews + " reviews") }}</a>
                </div>
            </div>

            <div style="clear: both;"></div>
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
    .hover-2-wrapper {
        width: 210px;
        padding-bottom: 10px;
    }
</style>