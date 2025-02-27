<template>
    <div 
        :style="
            'text-align: ' + widget_data.widget.settings.header_alignment + ';' +
            'margin-bottom: ' + widget_data.widget.settings.space_between_header_and_feed + ';'
        "
    >
        <div v-if="widget_data.widget.settings.show_title" class="reviews-list-title"
            :style="
                'font-size: ' + widget_data.widget.settings.title_font_size + ';' +
                'color: ' + widget_data.widget.settings.title_color + ';'
            ">
            {{ widget_data.widget.settings.title }}
        </div>

        <div v-if="widget_data.widget.settings.show_subtitle" class="reviews-list-subtitle"
            :style="
                'font-size: ' + widget_data.widget.settings.subtitle_font_size + ';' +
                'color: ' + widget_data.widget.settings.subtitle_color + ';'
            ">
            <strong>{{ widget_data.average_rating }}</strong> rating out of <strong>{{ widget_data.total_reviews }}</strong> reviews
        </div>
    </div>
</template>

<script>
export default {
    props: ["widget_data"],
}
</script>

<style type="text/css" scoped>
    .reviews-list-title {
        font-weight: bold;
        padding-bottom: 10px;
        padding-top: 20px;
    }
</style>