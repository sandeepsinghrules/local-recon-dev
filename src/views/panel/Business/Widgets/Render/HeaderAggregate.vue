<template>
    <div
        class="header-aggregate"
            :style="
                'margin-left: ' + widget_data.widget.settings.padding_between_reviews + ';' +
                'margin-bottom: ' + widget_data.widget.settings.padding_between_reviews + ';'
        "
    >
        <v-card flat outlined color="transparent">
            <v-card-text :style="'color: ' + widget_data.widget.settings.text_color">
                <div class="reviews-average">
                    {{ widget_data.average_rating }}
                    <span style="font-size: 14px; font-weight: normal;">
                        {{ widget_data.total_reviews }} reviews
                    </span>
                </div>

                <v-rating
                    class="reviews-rating"
                    :value="parseFloat(widget_data.average_rating)"
                    :color="widget_data.widget.settings.star_color"
                    dense
                    half-increments
                    readonly
                    size="25"
                ></v-rating>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ["widget_data"],
}
</script>

<style type="text/css" scoped>
    .header-aggregate {
        background: rgb(250, 250, 250);
        line-height: 26px;
        border-radius: 10px;
    }
</style>