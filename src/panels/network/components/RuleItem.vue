<script setup lang="ts">
import { rules } from '../composables/request';
import { Rule } from '../types'

const props = defineProps<{
  rule: Rule
}>()

function deleteRule() {
  rules.value.splice(rules.value.findIndex(rule => rule.id === props.rule.id), 1)
}
</script>

<template>
  <div class="flex items-center gap-2 p-1 px-2">
    <p style="word-break: break-all;">{{ rule.filter }}</p>
    <button class="icon-[carbon--trash-can] ml-auto shrink-0" @click="deleteRule" />
  </div>
</template>
