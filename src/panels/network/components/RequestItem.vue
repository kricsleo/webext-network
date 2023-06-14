<script setup lang="ts">
import { computed } from 'vue'
import { useRequestTypeConfig } from '../composables/request'
import type { RequestMeta } from '../types'
import PendingSelect from './PendingSelect.vue'

const props = defineProps<{
  request: RequestMeta
}>()

const path = computed(() => {
  const url = new URL(props.request.url)
  const lastPath = url.pathname.split('/').reverse()[0]
  return  '/' + lastPath + url.search + url.hash
})
const type = useRequestTypeConfig(props.request)
</script>

<template>
  <div class='font-mono p-1 flex items-center gap-1'>
    <span :class="[type.icon, 'mr-1']" />
    <PendingSelect />
    {{ path }}
  </div>
</template>