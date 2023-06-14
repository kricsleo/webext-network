<script setup lang="ts">
import { computed } from 'vue'
import { useRequestTypeConfig } from '../composables/request'
import type { RequestMeta } from '../types'
import PendingSelect from './PendingSelect.vue'

const props = defineProps<{
  request: RequestMeta
}>()

const url = computed(() => new URL(props.request.url))
const type = useRequestTypeConfig(props.request)
</script>

<template>
  <div class='font-mono p-1 flex items-center gap-1'>
    <span :class="[type.icon, 'mr-1']" />
    <PendingSelect />
    {{ url.pathname }}
  </div>
</template>