<template>
    <div>
        <v-pagination
            v-if="widget_data.widget.settings.feed_pagination == 'pagination'"

            class=""
            v-model="localPage"
            :length="localCount"
            total-visible="7"
            circle
        ></v-pagination>

        <div style="text-align: center; margin-bottom: 15px;">
            <v-btn
                v-if="widget_data.widget.settings.feed_pagination == 'button' && !$parent.finishedLoadingReviews"

                rounded
                color="gray lighten-2"
                @click="fetchMoreReviews();"
                >
                Load More
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ["widget_data", "page", "count"],

    data () {
        return {
            localPage: 0,
            localCount: 0
        };
    },

    mounted() {
        this.localPage = this.page
        this.localCount = this.count
    },

    methods: {
        fetchMoreReviews: function() {
            try {
                this.$parent.fetchMoreReviews()
            }
            catch (e) {
                this.$parent.$parent.$parent.$parent.fetchMoreReviews()
            }
        }
    },

    watch: {
        localPage: function(val, oldVal) {
            try {
                this.$parent.paginate(val, oldVal);
            }
            catch (e) {
                this.$parent.$parent.$parent.$parent.paginate(val, oldVal);
            }
        }
    }
}
</script>

<style type="text/css" scoped>

</style>