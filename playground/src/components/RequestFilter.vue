<script setup lang="ts">
import { computed } from 'vue';
import { requestTypeConfigs, activeRequestType, toggleActiveRequestType, requestFilter } from '../composables/request'

const typeConfigs = computed(() => requestTypeConfigs.map(typeConfig => {
  const active = (!typeConfig.type.length && !activeRequestType.value.length)
    || (typeConfig.type.length && typeConfig.type.every(type => activeRequestType.value.includes(type)))
  return { ...typeConfig, active }
}))
</script>

<template>
  <div class="flex items-center gap-1 flex-wrap py-1 px-2">
    <div class="relative bg-black px-1">
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
      <div v-if="idx !== 0" class="bg-gray-400 w-[1px] h-3" />
      <button 
        :class="['flex items-center gap-[2px] hover:text-gray-50 px-1.5 rounded leading-5', { 'bg-[#454545] text-gray-50': type.active }]"
        @click="toggleActiveRequestType(type.type)">
        <span v-if="type.icon" :class="type.icon" />
        <span>{{ type.label }}</span>
      </button>
    </template>
  </div>
</template>