<template>
    <div class="embed-grid-wrapper pl-3 pr-3" :style="
        'background-color: ' + widget_data.widget.settings.background_color + ';' +
        'margin-left: -' + widget_data.widget.settings.padding_between_reviews + ';'
    ">
        <Header :widget_data="widget_data" />

        <masonry
            :cols="getColumns"
            :gutter="0"
            >
            <div v-for="item in widget_data.reviews" :key="item.id">
                <Review :widget_data="widget_data" :item="item" />
            </div>
        </masonry>
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
    },

    computed: {
        getColumns() {
            if (this.widget_data.widget.settings.feed_columns == "Dynamic")
                return ((this.fw) ? {default: 4, 1500: 3, 1200: 2, 700: 1} : {default: 4, 1000: 3, 700: 2, 400: 1} );

            return this.widget_data.widget.settings.feed_columns;
        }
    }
}
</script>

<style type="text/css" scoped>
    .embed-grid-wrapper {
        width: 100%;
        padding-bottom: 10px;
    }
</style>