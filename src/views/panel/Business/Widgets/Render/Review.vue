<template>
    <div class="rg-widget-review-item"
        :style="
            'height: 100%; margin-left: ' + widget_data.widget.settings.padding_between_reviews + ';' +
            'margin-bottom: ' + widget_data.widget.settings.padding_between_reviews + ';'
        "
    >
        <v-card flat outlined color="transparent" style="height: 100%;">
            <v-card-text :style="'color: ' + widget_data.widget.settings.text_color" style="height: 100%;">
                <span class="ml-2" :style="((widget_data.widget.settings.show_profile_pic == false) ? 'display: none;' : '')">
                    <img class="profile-pic" referrerPolicy="no-referrer" :src="item.profile_picture" v-if="item.profile_picture" />
                    <v-avatar color="blue" size="30" v-if="!item.profile_picture"><v-icon small color="white">mdi-account</v-icon></v-avatar>
                </span>
                <h3 class="reviewer-title" v-if="widget_data.widget.settings.reviewer_name != 'Hide name'">
                    <span v-if="widget_data.widget.settings.reviewer_name == 'Show name'">{{ item.name }}</span>
                    <span v-if="widget_data.widget.settings.reviewer_name == 'Show first name'">{{ getFirstName(item.name) }}</span>
                </h3>

                <v-rating
                :style="((widget_data.widget.settings.show_stars == false) ? 'display: none;' : '')"
                :value="item.rating_value"
                :color="widget_data.widget.settings.star_color"
                dense
                half-increments
                readonly
                size="20"
                ></v-rating>

                <div :style="'clear: both;' + ((widget_data.widget.template == 'embed-column') ? 'min-height: 110px;' : ((widget_data.widget.template == 'embed-slider') ? 'min-height: calc(100% - 90px);' : ''))" class="mt-5">
                    <div v-if="item.review_text" class="review-description">
                        <div v-if="widget_data.widget.settings.feed_review_text == 'full-text'">
                            {{ item.review_text }}
                        </div>
                        <div v-if="widget_data.widget.settings.feed_review_text == 'short-text'" :id="'item_text_' + item.id">
                            <div v-show="!item.show_all" v-html='((item.review_text.toString().length > 150) ? item.review_text.substring(0, 150) + "..." : item.review_text)' />
                            <a v-if="widget_data.widget.settings.show_text_toggle && !item.show_all && item.review_text.toString().length > 150" href="javascript: void(0);" @click="showFullText(item);">{{ widget_data.widget.settings.text_toggle }}</a>
                        </div>
                    </div>
                </div>

                <div style="clear: both;"></div>

                <img 
                    class="widget-source-logo-embed-column"
                    :src="require('@/assets/images/review-services/www.' + getHostname(item) + '.png')"
                    :style="((widget_data.widget.settings.show_review_site == false) ? 'display: none;' : '')"
                />

                <v-chip
                    class="ma-2"
                    filter
                    small
                    :style="((widget_data.widget.settings.show_date == false) ? 'display: none;' : '')"
                    >
                    {{ formatDate(item.date) }}
                </v-chip>

                <div style="clear: both;"></div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ["widget_data", "item"],

    methods: {
        getHostname: function(item) {
            return new URL(item.listing.url).hostname.replace("www.", "");
        },
        formatDate: function(date) {
            return moment(String(date)).format('MM/DD/YYYY')
        },
        showFullText: function(item) {
            document.getElementById("item_text_" + item.id).innerHTML = item.review_text;
        },
        getFirstName(name) {
            let names = name.split(' ');

            if (names.length == 1)
                return names[0];

            return names[0] + ' ' + names[1].substring(0, 1) + '.';
        }
    }
}
</script>

<style scoped>
    .rg-widget-review-item {
        background: rgb(250, 250, 250);
        line-height: 26px;
        border-radius: 10px;
    }

    .rg-widget-review-item.in-content {
        float: left;
        width: 33%;
        display: inline-block;
    }

    .rg-widget-review-item .v-rating {
        display: inline-block;
        margin-left: 0px;
        margin-top: -1px;
    }

    .rg-widget-review-item h3 {
        display: inline-block;
        /* padding-left: 8px; */
        padding-top: 3px;
        font-weight: bold;
        margin-right: 10px;
    }

    .rg-widget-review-item .v-chip {
        float: right;
    }
</style>