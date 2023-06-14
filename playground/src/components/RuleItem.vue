<script setup lang="ts">
import { defineProps } from 'vue'
import { Rule } from '../types'

defineProps<{
  rule: Rule
}>()
</script>

<template>
  <p>{{ rule }}</p>
</template>
