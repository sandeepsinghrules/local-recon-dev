<template>
    <div class="embed-page-wrapper pl-3 pr-3" :style="
        'background-color: ' + widget_data.widget.settings.background_color + ';' +
        'margin-left: -' + widget_data.widget.settings.padding_between_reviews + ';'
    ">
        <Header :widget_data="widget_data" />
        <HeaderAggregate :widget_data="widget_data" />

        <div v-for="item in widget_data.reviews" :key="item.id">
            <Review :widget_data="widget_data" :item="item" />
        </div>
    </div>
</template>

<script>
import Header from '@/views/panel/Business/Widgets/Render/Header.vue';
import HeaderAggregate from '@/views/panel/Business/Widgets/Render/HeaderAggregate.vue';
import Review from '@/views/panel/Business/Widgets/Render/Review.vue';

export default {
    props: ["widget_data", "fw"],

    components: {
        Header,
        HeaderAggregate,
        Review
    }
}
</script>

<style type="text/css" scoped>
    .embed-page-wrapper {
        width: 100%;
        padding-bottom: 10px;
    }
</style>