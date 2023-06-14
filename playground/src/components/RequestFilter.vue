<script setup lang="ts">
import { computed } from 'vue';
import { requestTypeConfigs, activeRequestTypes, toggleActiveRequestTypes, requestFilter } from '../composables/request'

const typeConfigs = computed(() => requestTypeConfigs.map(t => {
  const active = Boolean(!t.types.length && !activeRequestTypes.value.length)
    || Boolean(t.types.length && t.types.every(type => activeRequestTypes.value.includes(type)))
  return { ...t, active }
}))
</script>

<template>
  <div class="flex items-center gap-1 flex-wrap py-1 px-2">
    <div class="relative bg-black px-1 rounded-[2px]">
      <input 
        v-model="requestFilter" 
        class="bg-transparent outline-none pr-5" 
        placeholder="Filter" />
      <button 
        v-if="requestFilter" 
        class="icon-[carbon--close-filled] absolute right-1 top-[50%] translate-y-[-50%]" 
        @click="requestFilter = ''" />
    </div>
    <template v-for="(type, idx) in typeConfigs" :key="type.label">
      <div v-if="idx !== 0" class="bg-gray-500 w-[1px] h-3" />
      <button 
        :class="['flex items-center gap-[2px] hover:text-gray-50 px-1.5 rounded leading-5', { 'bg-gray-600 text-gray-50': type.active }]"
        @click="toggleActiveRequestTypes(type.types, $event)">
        <span v-if="type.icon" :class="type.icon" />
        <span>{{ type.label }}</span>
      </button>
    </template>
  </div>
</template>