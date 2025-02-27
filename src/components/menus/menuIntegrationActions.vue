<template>

  <div v-on-clickaway="hide" class="relative">
    <div @click="showMenu = !showMenu">
      <slot></slot>
    </div>

    <div v-show="showMenu" class="absolute right-0 z-20 bg-white shadow rounded" >
      <div @click="deleteIntegration" class="cursor-pointer text-sm no-underline block px-2 py-1 text-red-500 hover:bg-gray-100 whitespace-no-wrap rounded">Remove</div>
    </div>
  </div>

</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  props: {
    integration: Object
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    async deleteIntegration() {
      await this.$store.dispatch('integrations/delete', this.integration.id)
      this.$store.dispatch('integrations/fetch')
    },
    show() {
      this.showMenu = true
    },
    hide() {
      this.showMenu = false
    }
  }
}
</script>

