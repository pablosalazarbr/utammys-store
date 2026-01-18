<script setup>
defineProps({
  count: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'card' // 'card', 'line', 'product'
  }
})
</script>

<template>
  <div v-if="type === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="aspect-[4/5] bg-neutral-200 rounded-sm mb-4"></div>
      <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div class="h-3 bg-neutral-200 rounded w-1/2"></div>
    </div>
  </div>

  <div v-else-if="type === 'line'" class="space-y-3">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="h-4 bg-neutral-200 rounded w-full mb-2"></div>
      <div class="h-3 bg-neutral-200 rounded w-4/5"></div>
    </div>
  </div>

  <div v-else-if="type === 'product'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="aspect-[3/4] bg-neutral-200 rounded-sm mb-6"></div>
      <div class="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div class="h-3 bg-neutral-200 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-neutral-200 rounded w-20"></div>
    </div>
  </div>
</template>
