<script setup lang="ts">
import { ref } from 'vue';
import { rules } from '../composables/request';
import { Rule } from '../types'

const props = defineProps<{
  rule: Rule
}>()

const initialFilter = props.rule.filter
const editing = ref(false)
function editRule() {
  editing.value = true
}
function deleteRule() {
  rules.value.splice(rules.value.findIndex(rule => rule.id === props.rule.id), 1)
}
function restoreRule() {
  props.rule.filter = initialFilter
  editing.value = false
}
</script>

<template>
  <div class="flex items-center gap-2 p-1 px-2">
    <template v-if="editing">
      <input 
        class="w-full mr-auto bg-black rounded-sm" 
        v-model="rule.filter" 
        @keydown.enter="editing = false"
        @keydown.esc="restoreRule" />
      <button class="icon-[carbon--edit-off]" @click="restoreRule" />
    </template>
    <p v-else style="word-break: break-all;" class="mr-auto">{{ rule.filter }}</p>
    <button class="icon-[carbon--edit] shrink-0" @click="editRule" />
    <button class="icon-[carbon--trash-can] shrink-0" @click="deleteRule" />
  </div>
</template>
