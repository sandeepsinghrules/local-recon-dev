<template>

  <div v-on-clickaway="hide" class="relative">
    <div @click="showMenu = !showMenu">
      <slot></slot>
    </div>

    <div v-show="showMenu" class="absolute left-0 z-20 bg-white shadow rounded" >

      <ul class="list-reset" style="padding-left: 0px;">
        <li><div @click="hide(); $emit('delete')" class="cursor-pointer px-4 py-2 block hover:bg-gray-300 text-red-700 font-medium whitespace-no-wrap pb-2 rounded-b">Delete</div></li>
      </ul>
                  
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
    show() {
      this.showMenu = true
    },
    hide() {
      this.showMenu = false
    }
  }
}
</script>

