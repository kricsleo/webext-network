<script setup lang="ts">
import { computed } from 'vue'
import { useRequestTypeConfig } from '../composables/request'

const props = defineProps<{
  request: chrome.webRequest.WebRequestBodyDetails
}>()

const url = computed(() => new URL(props.request.url))
const type = useRequestTypeConfig(props.request)
</script>

<template>
  <div className='font-mono p-1 border-b border-gray-600 flex items-center'>
    <span :class="[type.icon, 'mr-1']" />
    {{ url.pathname }}
  </div>
</template>