<script setup lang="ts">
import { computed } from 'vue'
import { useRequestTypeConfig } from '../composables/request'
import { RequestMeta } from '../types'
import PendingSelect from './PendingSelect.vue'
import PendingSwitch from './PendingSwitch.vue'

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
    <span :class="[type.icon, 'shrink-0 mr-1']" />
    <!-- <PendingSelect class="shrink-0"  /> -->
    <PendingSwitch :path="request.url" />
    <span style="word-break: break-word;">{{ path }}</span>
  </div>
</template>