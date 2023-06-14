<script setup lang="ts">
import { computed } from 'vue';
import { Rule } from '../types';
import { createReg, rules } from '../composables/request';

const props = defineProps<{
  path: string
}>()

// todo: createReg is not robust
const pending = computed(() => rules.value.some(rule => rule.filter === props.path))

function toggleRule() {
  if(pending.value) {
    rules.value = rules.value.filter(rule => rule.filter !== props.path)
  } else {
    rules.value.push({ 
      id: Date.now(),
      filter: props.path,
      pendingType: 'forever',
      timeout: 0
    })
  }
}
</script>

<template>
  <button 
    :class="['flex items-center gap-1 p-2 rounded-full hover:bg-gray-700']"
    @click="toggleRule">
    <span :class="['inline-block rounded-full w-2 h-2', pending ? 'bg-blue-400' : 'bg-green-400']" />
  </button>
</template>