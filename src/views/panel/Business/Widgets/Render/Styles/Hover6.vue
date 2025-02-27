<template>
    <div class="hover-6-wrapper">
        <v-card
            elevation="2"
            class="reviews-badge"
            @click="$parent.showDialog()"
            :style="'background-color: ' + widget_data.widget.settings.background_color + '; color: ' + widget_data.widget.settings.text_color + ';'"
        >
            <div style="font-size: 16px; padding-left: 34px;">
                {{ ((widget_data.widget.settings.hover_6_title) ? widget_data.widget.settings.hover_6_title.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : "Our Reviews") }}

                <div style="clear: both; margin-bottom: -8px;"></div>

                <div style="float: left; font-size: 36px; font-weight: bold;">
                    {{ widget_data.average_rating }}
                </div>

                <div style="float: left; padding-left: 5px; padding-top: 3px;">
                    <v-rating
                        class="reviews-rating"
                        :value="parseFloat(widget_data.average_rating)"
                        :color="widget_data.widget.settings.star_color"
                        dense
                        half-increments
                        readonly
                        size="14"
                    ></v-rating>

                    <div class="-mt-1" style="font-size: 13px;">
                        {{ ((widget_data.widget.settings.hover_6_subtitle) ? widget_data.widget.settings.hover_6_subtitle.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : widget_data.total_reviews + " reviews") }}
                    </div>
                </div>
                <div style="clear: both;" class="-mb-2"></div>
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
    .hover-6-wrapper {
        width: 200px;
        padding-bottom: 10px;
    }
</style>