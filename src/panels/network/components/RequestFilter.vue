<script setup lang="ts">
import { computed } from 'vue';
import { requestTypeConfigs, activeRequestTypes, toggleActiveRequestTypes, requestFilter, requests } from '../composables/request'

const typeConfigs = computed(() => requestTypeConfigs.map(t => {
  const active = Boolean(!t.types.length && !activeRequestTypes.value.length)
    || Boolean(t.types.length && t.types.every(type => activeRequestTypes.value.includes(type)))
  const count = requests.filter(request => !t.types.length || t.types.includes(request.type)).length
  return { ...t, active, count }
}))
</script>

<template>
  <div class="flex items-center flex-wrap gap-1 py-1 px-2">
    <button 
      class="icon-[carbon--error] px-1 text-base" 
      @click="requests.length = 0" 
      title="clean requests" />
    <div class="relative bg-black px-1 rounded-sm">
      <input 
        v-model="requestFilter" 
        class="pr-5" 
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
        <span v-if="type.count" class="text-xs opacity-65">({{ type.count }})</span>
      </button>
    </template>
  </div>
</template>