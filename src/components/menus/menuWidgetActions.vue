<template>

  <div v-on-clickaway="hide" class="relative">
    <div @click="showMenu = !showMenu">
      <slot></slot>
    </div>

    <div v-show="showMenu" class="absolute right-0 z-20 bg-white shadow rounded" >
      <div @click="editWidget" class=" cursor-pointer text-sm no-underline block px-2 py-1 border-b hover:bg-gray-100 whitespace-no-wrap rounded">Edit</div>
      <div @click="deleteWidget" class=" cursor-pointer text-sm no-underline block px-2 py-1 border-b text-red-500 hover:bg-gray-100 whitespace-no-wrap rounded">Remove</div>
    </div>
  </div>

</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  props: ['widget', 'local_recon'],
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    async deleteWidget() {
      if (this.local_recon) {
        await this.$store.dispatch('local_recon_widgets/delete', this.widget.id)
        this.$store.dispatch('local_recon_widgets/fetch', { dashboard: false })
      }
      else {
        await this.$store.dispatch('widgets/delete', this.widget.id)
        this.$store.dispatch('widgets/fetch', { dashboard: false })
      }
    },
    editWidget() {
      if (this.local_recon) {
        this.$router.push('/local-recon/widgets/edit/' + this.widget.uuid);
      }
      else {
        this.$router.push('/widgets/edit/' + this.widget.token);
      }
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

