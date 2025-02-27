<template>
    <div class="hover-4-wrapper">
        <v-card
            elevation="2"
            class="reviews-badge"
            @click="$parent.showDialog()"
            :style="'background-color: ' + widget_data.widget.settings.background_color + '; color: ' + widget_data.widget.settings.text_color + ';'"
        >
            <div class="reviews-title">
                {{ ((widget_data.widget.settings.hover_4_title) ? widget_data.widget.settings.hover_4_title.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : "Our Reviews") }}
            </div>

            <v-rating
                class="reviews-rating"
                :value="parseFloat(widget_data.average_rating)"
                :color="widget_data.widget.settings.star_color"
                dense
                half-increments
                readonly
                size="30"
            ></v-rating>

            <div style="font-weight: bold; font-size: 12px;">
                {{ ((widget_data.widget.settings.hover_4_subtitle) ? widget_data.widget.settings.hover_4_subtitle.replace('[reviews_nr]', widget_data.total_reviews).replace('[rating_nr]', widget_data.average_rating) : widget_data.average_rating + " Stars | " + widget_data.total_reviews + " Reviews") }}
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
    .hover-4-wrapper {
        width: 210px;
        padding-bottom: 10px;
    }
</style>