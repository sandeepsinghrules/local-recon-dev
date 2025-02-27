<template>
    <span>
        <v-menu offset-y :close-on-content-click="false" content-class="color-picker-menu">
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="content"
                    outlined
                    dense
                    v-on="on"
                    hide-details
                ></v-text-field>
                <div class="color-picker-color-circle" :style="'background: ' + content + '; ' + ((content == '#FFFFFF') ? 'border: solid 1px #CCCCCC;' : '')"></div>
            </template>
            <v-color-picker
                v-model="content"
                mode="hexa"
                class="mx-auto"
                hide-details
            ></v-color-picker>
        </v-menu>
    </span>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            content: this.value
        }
    },
    methods: {
        handleInput (e) {
            this.$emit('input', this.content)
        }
    },
     watch: {
      content: function(val, oldVal) {
        this.$emit('input', this.content)
      },
     }
}
</script>