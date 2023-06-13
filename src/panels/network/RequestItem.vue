<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  request: chrome.webRequest.WebRequestBodyDetails
}>()
const url = computed(() => new URL(props.request.url))
</script>

<template>
  <div className='font-mono p-2 border-b border-gray'>
    {{ url.pathname }}
  </div>
</template>