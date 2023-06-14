<script setup lang="ts">
import { Rule } from '../types'

defineProps<{
  rule: Rule
}>()
</script>

<template>
  <p>{{ rule }}</p>
</template>
