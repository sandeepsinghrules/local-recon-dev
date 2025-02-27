<template>
    <div class="embed-slider-wrapper pl-3 pr-3" :style="
        'background-color: ' + widget_data.widget.settings.background_color + ';' +
        'margin-left: -' + widget_data.widget.settings.padding_between_reviews + ';'
    ">
        <Header :widget_data="widget_data" />

        <v-carousel height="auto">
            <template v-for="(item, index) in widget_data.reviews"> 
            <v-carousel-item v-if="(index + 1) % slider_columns === 1 || slider_columns === 1" 
                            :key="index"
            > 
                <v-row class="flex-nowrap" style="height:100%"> 
                <template v-for="(n,i) in slider_columns"> 
                    <template v-if="(+index + i) < widget_data.reviews.length"> 
                    <v-col :key="i">
                        <v-sheet v-if="(+index + i) < widget_data.reviews.length" 
                                height="100%"
                                color="transparent"
                        >
                            <Review :widget_data="widget_data" :item="widget_data.reviews[+index + i]" />
                        </v-sheet>
                    </v-col> 
                    </template> 
                </template> 
                </v-row> 
            </v-carousel-item> 
            </template> 
        </v-carousel>
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
    },

    computed: {
        slider_columns() {
            // return 3;

            if (this.$vuetify.breakpoint.xl) {
                return 4;
            }

            if (this.$vuetify.breakpoint.lg) {
                return 3;
            }

            if (this.$vuetify.breakpoint.md) {
                return 2;
            }

            return 1;
        }
    },

    mounted() {
        console.log('mountddddd');
    }
}
</script>

<style type="text/css" scoped>
    .embed-slider-wrapper {
        width: 100%;
        padding-bottom: 10px;
    }

    .v-carousel__controls {
        display: none !important;
    }

    .embed-slider-wrapper .v-window-item {
        padding-left: 50px;
        padding-right: 50px;
    }
</style>