<template>
  <div class="flex-1 flex flex-col border-2 rounded items-center mx-1 mb-2 justify-between" :class="{'border-green-500': active}">

    <div class="text-lg uppercase w-full px-8 py-2 text-center" :class="{'bg-green-500 text-green-100': active, 'bg-gray-300 text-gray-800': !active}">{{ name }}</div>
    
    <slot></slot>

    <button v-if="!active" @click="$emit('subscribe', {plan, price})" class="whitespace-no-wrap py-2 px-3 rounded border border-green-500 text-green-500 mb-4 hover:bg-gray-100">{{ buttonText }}</button>
    <div v-else class="py-2 px-3 rounded text-gray-600 mb-4">Current plan</div>

  </div>
</template>

<script>
export default {
  props: {
    name: String,
    plan: String,
    price: String,
    active: Boolean,
    buttonText: String
  }
}
</script>

