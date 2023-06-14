<script setup lang="ts">
import { Rule } from '../types'

defineProps<{
  rule: Rule
}>()
</script>

<template>
  <p style="word-break: break-all;">{{ rule }}</p>
</template>
