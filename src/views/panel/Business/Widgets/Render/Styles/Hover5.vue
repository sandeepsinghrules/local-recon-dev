<template>
    <div class="hover-5-wrapper">
        <v-card
            elevation="2"
            class="reviews-badge"
            @click="$parent.showDialog()"
            :style="'background-color: ' + widget_data.widget.settings.background_color + '; color: ' + widget_data.widget.settings.text_color + ';'"
        >
            <div style="font-size: 13px;">
                <div style="display: inline-block; padding-left: 7px;">
                    {{ ((widget_data.widget.settings.hover_5_title) ? widget_data.widget.settings.hover_5_title.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : widget_data.average_rating + " Stars") }}
                </div>

                <div style="display: inline-block; padding-left: 7px;">
                    <v-rating
                        class="reviews-rating"
                        :value="parseFloat(widget_data.average_rating)"
                        :color="widget_data.widget.settings.star_color"
                        dense
                        half-increments
                        readonly
                        size="16"
                    ></v-rating>
                </div>

                <div style="display: inline-block; padding-left: 7px;">
                    <span style="text-decoration: underline;">{{ ((widget_data.widget.settings.hover_5_subtitle) ? widget_data.widget.settings.hover_5_subtitle.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : widget_data.total_reviews + " Reviews") }}</span>
                </div>
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
    .hover-5-wrapper {
        width: 242px;
        padding-bottom: 10px;
    }
</style>